"""Verify the exported third act and build its 15-frame contact sheet.

Run from any directory with the project's existing Python/Pillow environment.
Windows uses Remotion's bundled ffmpeg/ffprobe; other systems may use PATH.
This checks export data, captions and source assets. It does not replace visual
review, motion review or pixel comparisons against earlier-act reference frames.
"""

from pathlib import Path
from fractions import Fraction
import hashlib
import io
import json
import math
import shutil
import struct
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont, ImageStat


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "out/act03"
VIDEO = ROOT / "out/Act03Demo.mp4"
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
SCENES = (
    ("scene08", 270, (0, 135, 269)),
    ("scene09", 450, (270, 495, 719)),
    ("scene10", 360, (720, 900, 1079)),
    ("scene11", 300, (1080, 1230, 1379)),
    ("scene12", 420, (1380, 1590, 1799)),
)
EXPECTED_DIALOGUE = {
    "scene08": "小林以为，只要把剪纸做成爆款，就能证明它的价值。",
    "scene09": "这剪纸挺好包装的。我们给它加滤镜、加配乐、加网红话术，卖9.9元包邮，量大了肯定赚钱。",
    "scene10": "一张红纸，一把剪刀，要静心剪出来。9.9包邮，那不是把手艺当便宜货吗？",
    "scene11": "您能不能别总说这些？有了销量，才有更多人知道剪纸！",
    "scene12": "为了火，把剪纸变成贴纸、变成挂件、变成一句顺口溜，那传下去的还是剪纸吗？",
}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def executable(name):
    bundled = ROOT / "node_modules/@remotion/compositor-win32-x64-msvc" / (name + ".exe")
    if sys.platform == "win32" and bundled.is_file():
        return str(bundled)
    resolved = shutil.which(name)
    require(resolved is not None, "Cannot find %s; install ffmpeg/ffprobe or the project dependencies." % name)
    return resolved


def probe_video(ffprobe):
    result = subprocess.run(
        [ffprobe, "-v", "error", "-count_frames", "-show_streams", "-show_format", "-of", "json", str(VIDEO)],
        capture_output=True, text=True, encoding="utf-8", check=True,
    )
    require(not result.stderr.strip(), "ffprobe reported errors: " + result.stderr)
    metadata = json.loads(result.stdout)
    streams = [item for item in metadata["streams"] if item.get("codec_type") == "video"]
    require(len(streams) == 1, "Expected exactly one video stream.")
    stream = streams[0]
    require((stream.get("width"), stream.get("height")) == (1920, 1080), "Expected 1920x1080 video.")
    require(Fraction(stream["r_frame_rate"]) == 30, "Nominal frame rate must be exactly 30fps.")
    require(Fraction(stream["avg_frame_rate"]) == 30, "Average frame rate must be exactly 30fps.")
    require(int(stream["nb_read_frames"]) == 1800, "ffprobe did not count exactly 1800 frames.")
    duration = float(metadata["format"]["duration"])
    require(abs(duration - 60) < 0.001, "Container duration must be 60.000 seconds.")
    if "duration" in stream:
        require(abs(float(stream["duration"]) - 60) < 0.001, "Video stream duration must be 60.000 seconds.")
    if "nb_frames" in stream:
        require(int(stream["nb_frames"]) == 1800, "Declared video frame count must be 1800.")
    return metadata, stream, duration


def decode_luma(ffmpeg):
    decoded = subprocess.run(
        [ffmpeg, "-v", "error", "-xerror", "-i", str(VIDEO), "-map", "0:v:0", "-an",
         "-vf", "scale=64:36,format=gray", "-fps_mode", "passthrough", "-c:v", "png", "-f", "image2pipe", "pipe:1"],
        capture_output=True, check=True,
    )
    require(not decoded.stderr.strip(), "ffmpeg reported errors: " + decoded.stderr.decode("utf-8", errors="replace"))
    data, position, means = decoded.stdout, 0, []
    while position < len(data):
        start = position
        require(data[position:position + 8] == PNG_SIGNATURE, "Invalid PNG stream at decoded frame %d." % len(means))
        position += 8
        while True:
            require(position + 8 <= len(data), "Truncated PNG chunk header.")
            length = struct.unpack(">I", data[position:position + 4])[0]
            kind = data[position + 4:position + 8]
            require(position + 12 + length <= len(data), "Truncated PNG chunk payload.")
            position += 12 + length
            if kind == b"IEND":
                break
        with Image.open(io.BytesIO(data[start:position])) as image:
            require(image.size == (64, 36), "Unexpected decoded thumbnail dimensions.")
            gray = image.convert("L")
            means.append(ImageStat.Stat(gray).mean[0])
    require(len(means) == 1800, "Full decode produced %d frames; expected 1800." % len(means))
    black = [frame for frame, mean in enumerate(means) if mean <= 8]
    white = [frame for frame, mean in enumerate(means) if mean >= 247]
    return means, black, white


def check_captions():
    captions = json.loads((ROOT / "src/act03/captions.json").read_text(encoding="utf-8-sig"))
    require(isinstance(captions, dict) and set(captions) == set(EXPECTED_DIALOGUE), "Expected exactly scene08-scene12 caption keys.")
    checks = {}
    for scene, frames, _ in SCENES:
        lines = captions[scene]
        require(isinstance(lines, list) and lines, scene + " must contain caption segments.")
        previous_end = 0
        texts = []
        for index, line in enumerate(lines):
            prefix = "%s caption %d" % (scene, index)
            require(isinstance(line, dict), prefix + " must be an object.")
            text = line.get("text")
            require(isinstance(text, str) and bool(text.strip()), prefix + " must have nonempty text.")
            texts.append(text)
            start, end = line.get("startMs"), line.get("endMs")
            for field, value in (("startMs", start), ("endMs", end)):
                require(isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value), prefix + " has invalid " + field)
            require(0 <= start < end <= frames / 30 * 1000, prefix + " is outside its scene duration.")
            require(start >= previous_end, prefix + " overlaps the preceding caption or is out of order.")
            previous_end = end
        combined = "".join(texts)
        require(combined == EXPECTED_DIALOGUE[scene], scene + " dialogue does not exactly match the task text.")
        checks[scene] = {"frames": frames, "duration_ms": frames / 30 * 1000,
                         "segments": len(lines), "last_end_ms": previous_end,
                         "dialogue_matches_request": True, "times_in_range_and_nonoverlapping": True}
    return checks


def check_character_hashes():
    manifest = json.loads((ROOT / "public/assets/characters/SOURCES.json").read_text(encoding="utf-8-sig"))
    hashes = {}
    for name in ("grandma", "xiaolin", "merchant"):
        actual = sha256(ROOT / "public/assets/characters" / (name + ".png"))
        require(actual == manifest[name]["sha256"].lower(), name + ".png differs from the recorded source hash.")
        hashes[name] = actual
    return hashes


def contact_sheet():
    font = None
    for filename in ("SourceHanSerifSC-Regular.otf", "fangsong.ttf"):
        path = ROOT / "public/assets/fonts" / filename
        if path.is_file():
            try:
                font = ImageFont.truetype(str(path), 24)
                break
            except OSError:
                pass
    if font is None:
        font = ImageFont.load_default()
    sheet = Image.new("RGB", (1920, 2010), "#F2E5CB")
    draw = ImageDraw.Draw(sheet)
    included = []
    for row, (scene, _, frames) in enumerate(SCENES):
        for column, (label, frame) in enumerate(zip(("first", "middle", "last"), frames)):
            path = OUTPUT / "keyframes" / ("frame-%04d.png" % frame)
            require(path.is_file(), "Missing keyframe: " + str(path))
            with Image.open(path) as image:
                require(image.size == (1920, 1080), "Keyframe must be 1920x1080: " + path.name)
                thumbnail = image.convert("RGB").resize((640, 360), Image.Resampling.LANCZOS)
            x, y = column * 640, row * 402
            sheet.paste(thumbnail, (x, y))
            text = "%s | %s | frame %04d" % (scene.capitalize(), label, frame)
            draw.text((x + 18, y + 365), text, font=font, fill="#2D1E1B")
            included.append({"scene": scene, "position": label, "frame": frame,
                             "path": path.relative_to(ROOT).as_posix()})
    sheet.save(OUTPUT / "storyboard.jpg", quality=95, subsampling=0)
    return included


def main():
    require(VIDEO.is_file(), "Render out/Act03Demo.mp4 before running this verifier.")
    ffprobe, ffmpeg = executable("ffprobe"), executable("ffmpeg")
    metadata, stream, duration = probe_video(ffprobe)
    means, black, white = decode_luma(ffmpeg)
    captions = check_captions()
    hashes = check_character_hashes()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    included = contact_sheet()
    passed = not black and not white
    report = {
        "status": "passed" if passed else "failed",
        "video": VIDEO.relative_to(ROOT).as_posix(),
        "video_sha256": sha256(VIDEO),
        "width": stream["width"], "height": stream["height"], "fps": 30,
        "nominal_frame_rate": stream["r_frame_rate"], "average_frame_rate": stream["avg_frame_rate"],
        "duration_seconds": duration, "frames": int(stream["nb_read_frames"]),
        "decoded_frames": len(means), "codec": stream["codec_name"], "pixel_format": stream["pix_fmt"],
        "audio_streams": sum(item.get("codec_type") == "audio" for item in metadata["streams"]),
        "bytes": VIDEO.stat().st_size,
        "frame_mean_luma_range": [min(means), max(means)],
        "black_frame_threshold_luma": 8, "white_frame_threshold_luma": 247,
        "black_frames": black, "white_frames": white, "black_or_white_frames": not passed,
        "dialogue_matches_request": True, "caption_checks": captions,
        "original_character_hashes_match": True, "character_sha256": hashes,
        "storyboard": "out/act03/storyboard.jpg", "keyframes": included,
        "checks_not_performed": ["Manual visual and motion review", "Earlier-act pixel regression comparisons"],
    }
    (OUTPUT / "verification.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    require(passed, "Found black or white candidate frames; inspect verification.json and the video.")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, KeyError, OSError, subprocess.SubprocessError) as error:
        raise SystemExit("Act03 verification failed: %s" % error) from error
