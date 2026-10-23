from pathlib import Path
import subprocess,json,struct,io,hashlib,shutil,sys
from PIL import Image,ImageStat
root=Path(__file__).resolve().parents[1]
binary=root/'node_modules/@remotion/compositor-win32-x64-msvc'
ffprobe=str(binary/'ffprobe.exe') if sys.platform=='win32' else shutil.which('ffprobe')
ffmpeg=str(binary/'ffmpeg.exe') if sys.platform=='win32' else shutil.which('ffmpeg')
if not ffprobe or not ffmpeg: raise SystemExit('Install ffmpeg and ffprobe to run this optional output verification.')
video=root/'out/Act02Demo.mp4'
meta=json.loads(subprocess.check_output([ffprobe,'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(video)]))
s=next(s for s in meta['streams'] if s['codec_type']=='video')
assert (s['width'],s['height'],s['r_frame_rate'],int(s['nb_read_frames']))==(1920,1080,'30/1',1650)
assert abs(float(meta['format']['duration'])-55)<.001
decoded=subprocess.run([ffmpeg,'-v','error','-i',str(video),'-vf','scale=64:36,format=gray','-c:v','png','-f','image2pipe','pipe:1'],capture_output=True,check=True)
assert not decoded.stderr,decoded.stderr
data=decoded.stdout;pos=0;means=[]
while pos<len(data):
 start=pos;assert data[pos:pos+8]==b'\x89PNG\r\n\x1a\n';pos+=8
 while True:
  length=struct.unpack('>I',data[pos:pos+4])[0];kind=data[pos+4:pos+8];pos+=12+length
  if kind==b'IEND':break
 means.append(ImageStat.Stat(Image.open(io.BytesIO(data[start:pos])).convert('L')).mean[0])
assert len(means)==1650 and min(means)>8 and max(means)<247
captions=json.loads((root/'src/act02/captions.json').read_text(encoding='utf-8'))
expected=['奶奶，您这手艺这么好，怎么没人看啊？','我可以帮您拍短视频，做直播，还能卖货！只要包装一下，肯定能火。','拍视频可以，但别把剪纸拍成热闹幌子。手艺人靠的是心，不是花架子。','您那是老观念！现在酒香也怕巷子深。没人看，没人买，再好的手艺也传不下去！']
for lines,text in zip(captions.values(),expected):assert ''.join(c['text'] for c in lines)==text
assets=json.loads((root/'public/assets/characters/SOURCES.json').read_text(encoding='utf-8'))
for name in ['grandma','xiaolin']:assert hashlib.sha256((root/f'public/assets/characters/{name}.png').read_bytes()).hexdigest()==assets[name]['sha256']
report={'width':1920,'height':1080,'fps':30,'duration_seconds':55,'frames':1650,'decoded_frames':len(means),'codec':s['codec_name'],'pixel_format':s['pix_fmt'],'audio_streams':sum(x['codec_type']=='audio' for x in meta['streams']),'frame_mean_range':[min(means),max(means)],'black_or_white_frames':False,'dialogue_matches_request':True,'original_character_hashes_match':True,'bytes':video.stat().st_size}
(root/'out/act02/verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
