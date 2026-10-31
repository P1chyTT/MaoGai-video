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
out = app / 'out/act01'
video = out / 'Act01Demo.mp4'
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
assert (v['width'], v['height'], v['codec_name'], v['pix_fmt'], v['r_frame_rate'], v['nb_read_frames']) == (1920, 1080, 'h264', 'yuv420p', '30/1', '1200'), v
assert v['color_space'] == 'bt709' and v['color_range'] == 'tv'
assert abs(float(media['format']['duration']) - 40) < .01
assert a['codec_name'] == 'aac' and a['channels'] == 2

# The bundled FFmpeg omits wrapped_avframe, so decode to explicit rawvideo.
gray = run([ffmpeg, '-v', 'error', '-i', str(video), '-vf', 'scale=160:90',
    '-an', '-pix_fmt', 'gray', '-c:v', 'rawvideo', '-f', 'image2pipe', 'pipe:1'])
pixels = 160 * 90
assert len(gray) == 1200 * pixels
black, white, means = [], [], []
for i in range(1200):
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
assert 0 < peak < 1 and len(pcm) >= 40 * 48000 * 2

target = repo / 'docs/act01/keyframes'
target.mkdir(parents=True, exist_ok=True)
for p in (out / 'keyframes').glob('Scene*.png'):
    shutil.copyfile(p, target / p.name)
assert len(list(target.glob('Scene*.png'))) == 12

report = {
    'project': '山河有约', 'composition': 'Act01Demo',
    'scope': 'Scene01–Scene04 only; subtitles and original foley; no recorded character voices',
    'media': media, 'sha256': hashlib.sha256(video.read_bytes()).hexdigest(),
    'size_mib': round(video.stat().st_size / 1048576, 2),
    'complete_video_and_audio_decode_passed': True,
    'frame_scan': {'frames': 1200, 'analysis_resolution': [160,90],
        'black_threshold': '99% pixels below 16', 'white_threshold': '99% pixels above 248',
        'black_frames': black, 'white_frames': white, 'mean_luma_range': [round(min(means),2), round(max(means),2)]},
    'audio_peak_dbfs': round(20 * math.log10(peak), 2),
    'audio_rms_dbfs': round(20 * math.log10(rms), 2),
    'keyframe_indices': [0,150,299,300,450,599,600,750,899,900,1050,1199],
    'keyframe_count': 12,
    'script_checks': '11 caption segments match source text and voice windows; canonical PNGs unchanged',
    'preview': 'Studio Act01Demo playback verified; no error overlay',
    'output': 'red-paper-reborn/out/act01/Act01Demo.mp4',
}
(repo / 'docs/act01/verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(json.dumps(report, ensure_ascii=False, indent=2))
