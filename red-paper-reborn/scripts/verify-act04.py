"""Verify the fourth-act export and build its 12-frame contact sheet.

Uses the project's existing Pillow environment and ffmpeg/ffprobe. The checks
cover export data, exact caption/comment text and unchanged character sources;
they do not replace visual review or earlier-act pixel regression comparisons.
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
OUTPUT = ROOT / "out/act04"
VIDEO = ROOT / "out/Act04Demo-Alternate.mp4"
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
SCENES = (
    ("scene13", 300, (0, 150, 299)),
    ("scene14", 360, (300, 480, 659)),
    ("scene15", 420, (660, 870, 1079)),
    ("scene16", 420, (1080, 1290, 1499)),
)
EXTRA_KEYFRAMES = (345, 390, 435, 525, 570, 615, 840, 930, 990, 1350, 1440)
EXPECTED_DIALOGUE = {
    "scene13": "我偏要证明给您看，传统手艺也能上新时代的桌。",
    "scene14": "她把剪纸做成了表情包、贴纸、钥匙扣，甚至配上搞笑段子。",
    "scene15": "",
    "scene16": "流量来了，可手艺的魂没了。",
}
EXPECTED_COMMENTS = ["这剪纸也太敷衍了", "奶奶看了会心疼", "不如直接买打印贴"]


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
    require(int(stream["nb_read_frames"]) == 1500, "ffprobe did not count exactly 1500 frames.")
    duration = float(metadata["format"]["duration"])
    require(abs(duration - 50) < 0.001, "Container duration must be 50.000 seconds.")
    if "duration" in stream:
        require(abs(float(stream["duration"]) - 50) < 0.001, "Video stream duration must be 50.000 seconds.")
    if "nb_frames" in stream:
        require(int(stream["nb_frames"]) == 1500, "Declared video frame count must be 1500.")
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
            means.append(ImageStat.Stat(image.convert("L")).mean[0])
    require(len(means) == 1500, "Full decode produced %d frames; expected 1500." % len(means))
    black = [frame for frame, mean in enumerate(means) if mean <= 8]
    white = [frame for frame, mean in enumerate(means) if mean >= 247]
    return means, black, white


def check_captions():
    captions = json.loads((ROOT / "src/act04/captions.json").read_text(encoding="utf-8-sig"))
    require(isinstance(captions, dict) and set(captions) == set(EXPECTED_DIALOGUE), "Expected exactly scene13-scene16 caption keys.")
    checks = {}
    for scene, frames, _ in SCENES:
        lines = captions[scene]
        require(isinstance(lines, list), scene + " captions must be a list.")
        if scene == "scene15":
            require(lines == [], "Scene15 must have no bottom dialogue captions; use the separate screen comments.")
        else:
            require(bool(lines), scene + " must contain caption segments.")
        previous_end, texts = 0, []
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
        require("".join(texts) == EXPECTED_DIALOGUE[scene], scene + " dialogue does not exactly match the task text.")
        checks[scene] = {"frames": frames, "duration_ms": frames / 30 * 1000,
                         "segments": len(lines), "last_end_ms": previous_end,
                         "dialogue_matches_request": True, "times_in_range_and_nonoverlapping": True}
    return checks


def check_comments():
    comments = json.loads((ROOT / "src/act04/comments.json").read_text(encoding="utf-8-sig"))
    require(isinstance(comments, list) and all(isinstance(item, str) for item in comments), "Screen comments must be a string array.")
    require(comments == EXPECTED_COMMENTS, "Scene15's three screen comments do not exactly match the task text and order.")
    return comments


def check_character_hashes():
    manifest = json.loads((ROOT / "public/assets/characters/SOURCES.json").read_text(encoding="utf-8-sig"))
    hashes = {}
    for name in ("grandma", "xiaolin", "merchant"):
        actual = sha256(ROOT / "public/assets/characters" / (name + ".png"))
        require(actual == manifest[name]["sha256"].lower(), name + ".png differs from the recorded source hash.")
        hashes[name] = actual
    return hashes


def keyframe_path(frame):
    path = OUTPUT / "keyframes" / ("frame-%04d.png" % frame)
    require(path.is_file(), "Missing keyframe: " + str(path))
    return path


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
    sheet = Image.new("RGB", (1920, 1608), "#F2E5CB")
    draw = ImageDraw.Draw(sheet)
    included = []
    for row, (scene, _, frames) in enumerate(SCENES):
        for column, (label, frame) in enumerate(zip(("first", "middle", "last"), frames)):
            path = keyframe_path(frame)
            with Image.open(path) as image:
                require(image.size == (1920, 1080), "Keyframe must be 1920x1080: " + path.name)
                thumbnail = image.convert("RGB").resize((640, 360), Image.Resampling.LANCZOS)
            x, y = column * 640, row * 402
            sheet.paste(thumbnail, (x, y))
            draw.text((x + 18, y + 365), "%s | %s | frame %04d" % (scene.capitalize(), label, frame), font=font, fill="#2D1E1B")
            included.append({"scene": scene, "position": label, "frame": frame,
                             "path": path.relative_to(ROOT).as_posix()})
    extra = []
    for frame in EXTRA_KEYFRAMES:
        path = keyframe_path(frame)
        with Image.open(path) as image:
            require(image.size == (1920, 1080), "Extra keyframe must be 1920x1080: " + path.name)
            image.load()
        extra.append({"frame": frame, "path": path.relative_to(ROOT).as_posix()})
    sheet.save(OUTPUT / "storyboard.jpg", quality=95, subsampling=0)
    return included, extra


def main():
    require(VIDEO.is_file(), "Render out/Act04Demo-Alternate.mp4 before running this verifier.")
    ffprobe, ffmpeg = executable("ffprobe"), executable("ffmpeg")
    metadata, stream, duration = probe_video(ffprobe)
    means, black, white = decode_luma(ffmpeg)
    captions = check_captions()
    comments = check_comments()
    hashes = check_character_hashes()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    included, extra = contact_sheet()
    passed = not black and not white
    report = {
        "status": "passed" if passed else "failed",
        "version_role": "alternate",
        "video": VIDEO.relative_to(ROOT).as_posix(), "video_sha256": sha256(VIDEO),
        "width": stream["width"], "height": stream["height"], "fps": 30,
        "nominal_frame_rate": stream["r_frame_rate"], "average_frame_rate": stream["avg_frame_rate"],
        "duration_seconds": duration, "frames": int(stream["nb_read_frames"]),
        "decoded_frames": len(means), "codec": stream["codec_name"], "pixel_format": stream["pix_fmt"],
        "audio_streams": sum(item.get("codec_type") == "audio" for item in metadata["streams"]),
        "bytes": VIDEO.stat().st_size, "frame_mean_luma_range": [min(means), max(means)],
        "black_frame_threshold_luma": 8, "white_frame_threshold_luma": 247,
        "black_frames": black, "white_frames": white, "black_or_white_frames": not passed,
        "dialogue_matches_request": True, "caption_checks": captions,
        "scene15_bottom_dialogue_absent": True, "screen_comments_match_request": True,
        "screen_comments": comments,
        "original_character_hashes_match": True, "character_sha256": hashes,
        "storyboard": "out/act04/storyboard.jpg", "keyframes": included, "extra_keyframes": extra,
        "checks_not_performed": ["Manual visual, text-readability and motion review", "Earlier-act pixel regression comparisons"],
    }
    (OUTPUT / "verification.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    require(passed, "Found black or white candidate frames; inspect verification.json and the video.")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, KeyError, OSError, subprocess.SubprocessError) as error:
        raise SystemExit("Act04 verification failed: %s" % error) from error
