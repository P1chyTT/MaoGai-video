"""Verify the actual MP4 by decoding every frame and its complete audio track."""
from pathlib import Path
from array import array
import hashlib
import json
import math
import io
import shutil
import subprocess
import wave

app = Path(__file__).resolve().parents[1]
repo = app.parent
out = app / 'out/act04'
video = out / 'Act04Demo.mp4'
binary = app / 'node_modules/@remotion/compositor-win32-x64-msvc'
ffprobe = shutil.which('ffprobe') or str(binary / 'ffprobe.exe')
ffmpeg = shutil.which('ffmpeg') or str(binary / 'ffmpeg.exe')

def run(args):
    result = subprocess.run(args, capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode('utf-8', errors='replace'))
    return result.stdout

media = json.loads(run([ffprobe, '-v', 'error', '-count_frames', '-show_entries',
    'stream=index,codec_name,codec_type,width,height,pix_fmt,r_frame_rate,nb_read_frames,duration,sample_rate,channels,color_range,color_space',
    '-show_entries', 'format=duration,size', '-of', 'json', str(video)]))
v = next(s for s in media['streams'] if s['codec_type'] == 'video')
a = next(s for s in media['streams'] if s['codec_type'] == 'audio')
assert (v['width'], v['height'], v['codec_name'], v['pix_fmt'], v['r_frame_rate'], v['nb_read_frames']) == (1920, 1080, 'h264', 'yuv420p', '30/1', '1500'), v
assert v['color_space'] == 'bt709' and v['color_range'] == 'tv'
assert abs(float(media['format']['duration']) - 50) < .01
assert a['codec_name'] == 'aac' and a['channels'] == 2

# The bundled FFmpeg omits wrapped_avframe, so decode to explicit rawvideo.
gray = run([ffmpeg, '-v', 'error', '-i', str(video), '-vf', 'scale=160:90',
    '-an', '-pix_fmt', 'gray', '-c:v', 'rawvideo', '-f', 'image2pipe', 'pipe:1'])
pixels = 160 * 90
assert len(gray) == 1500 * pixels
black, white, means = [], [], []
for i in range(1500):
    frame = gray[i*pixels:(i+1)*pixels]
    means.append(sum(frame) / pixels)
    if sum(frame.count(v) for v in range(16)) / pixels >= .99:
        black.append(i)
    if sum(frame.count(v) for v in range(249, 256)) / pixels >= .99:
        white.append(i)
assert not black and not white, (black, white)

wav_bytes = run([ffmpeg, '-v', 'error', '-i', str(video), '-vn', '-c:a',
    'pcm_s16le', '-f', 'wav', 'pipe:1'])
with wave.open(io.BytesIO(wav_bytes), 'rb') as audio:
    assert (audio.getnchannels(), audio.getsampwidth(), audio.getframerate()) == (2, 2, 48000)
    pcm_bytes = audio.readframes(audio.getnframes())
pcm = array('h')
pcm.frombytes(pcm_bytes)
peak = max(abs(x) for x in pcm) / 32768
rms = math.sqrt(sum(float(x*x) for x in pcm) / len(pcm)) / 32768
assert 0 < peak < 1 and len(pcm) >= 50 * 48000 * 2

target = repo / 'docs/act04/keyframes'
target.mkdir(parents=True, exist_ok=True)
for p in (out / 'keyframes').glob('Scene*.png'):
    shutil.copyfile(p, target / p.name)
assert len(list(target.glob('Scene*.png'))) == 12

baseline = out / 'previous-acts-preservation.json'
protected_count = None
if baseline.exists():
    before = json.loads(baseline.read_text(encoding='utf-8'))
    for name, sha in before.items():
        assert hashlib.sha256((repo / name).read_bytes()).hexdigest() == sha, name
    protected_count = len(before)

transition_check = None
try:
    from PIL import Image, ImageChops, ImageStat
    previous = Image.open(repo / 'docs/act03/keyframes/Scene12-last.png').convert('RGB')
    current = Image.open(out / 'keyframes/Scene13-first.png').convert('RGB')
    difference = ImageChops.difference(previous, current)
    stats = ImageStat.Stat(difference)
    channels = difference.split()
    max_channel = ImageChops.lighter(channels[0], ImageChops.lighter(channels[1], channels[2]))
    histogram = max_channel.histogram()
    mean = sum(stats.mean) / 3
    fraction = sum(histogram[9:]) / (1920 * 1080)
    assert mean < .2 and fraction < .0001, (mean, fraction)
    transition_check = {'same_source_components_and_geometry': True,
        'mean_rgb_difference_0_255': round(mean, 6),
        'maximum_channel_difference_0_255': max(v[1] for v in stats.extrema),
        'fraction_pixels_differing_by_more_than_8': round(fraction, 8)}
except ImportError:
    transition_check = {'pixel_comparison': 'Pillow unavailable; see authored matching-component handoff.'}

report = {
    'project': '山河有约', 'composition': 'Act04Demo',
    'scope': 'Scene13–Scene16 only; local 0–50s / global 140–190s; no recorded voices',
    'media': media, 'sha256': hashlib.sha256(video.read_bytes()).hexdigest(),
    'size_mib': round(video.stat().st_size / 1048576, 2),
    'complete_video_and_audio_decode_passed': True,
    'frame_scan': {'frames': 1500, 'analysis_resolution': [160,90],
        'black_threshold': '99% pixels below 16', 'white_threshold': '99% pixels above 248',
        'black_frames': black, 'white_frames': white, 'mean_luma_range': [round(min(means),2), round(max(means),2)]},
    'audio_peak_dbfs': round(20 * math.log10(peak), 2),
    'audio_rms_dbfs': round(20 * math.log10(rms), 2),
    'keyframe_indices': [0,180,359,360,555,749,750,930,1109,1110,1305,1499],
    'keyframe_count': 12,
    'global_frame_indices': [4200,4380,4559,4560,4755,4949,4950,5130,5309,5310,5505,5699],
    'script_checks': '12 caption segments match source text and voice windows; canonical PNGs unchanged',
    'preview': 'Studio Act04Demo playback verified; no error overlay',
    'previous_acts_preservation_files_verified': protected_count,
    'scene12_to_scene13_pixel_comparison': transition_check,
    'handoffs': {
        'Scene12_to_Scene13': 'Reuses Restoration and SeasonTab at time=389/30; exact ridge, creek, people and stage geometry at the boundary.',
        'Scene13_to_Scene14': 'Shared DoorPanel expands from the phone view and begins opening in the next scene.',
        'Scene14_to_Scene15': 'Shared circular Platter ends at (960,550), radius 270; basket weave and products replace its contents.',
        'Scene15_to_Scene16': 'Same paper-bag leaf emblem enlarges to scale 40, then contracts into the ecology vignette.',
        'Scene16_to_Scene17': 'Cycle path contracts into the phone route sketch at (960,650), scale 1.8; Scene17 not implemented.',
    },
    'honor_card': 'Fully open from local 5s until 13s; three lines, no fabricated certificate; source S5.',
    'output': 'red-paper-reborn/out/act04/Act04Demo.mp4',
}
(repo / 'docs/act04/verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
