"""Technical checks for the 20-second finale; voiceover timing remains unapproved."""
from pathlib import Path
from fractions import Fraction
import hashlib
import io
import json
import re
import shutil
import struct
import subprocess
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFont, ImageStat

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'out/act06'
VIDEO = ROOT / 'out/Act06Demo.mp4'
SCENES = [('scene21',120,[0,60,119]),('scene22',90,[120,165,209]),
          ('scene23',150,[210,285,359]),('scene24',240,[360,480,599])]
EXTRA = [30,90,150,195,240,300,390,420,450,510,540,570]
EXPECTED = {
 'scene21':'这一次，她没有把剪纸拍成热闹段子，而是拍下了手、时间、心意和文化。',
 'scene22':'原来剪纸不是老古董，是有温度的。',
 'scene23':'传承不是原封不动，也不是为了流量随便改。是把老祖宗的心意，用新时代的方式讲清楚。',
 'scene24':'中华优秀传统文化，是我们最深厚的文化自信。非遗传承，既要守住根，也要打开路。让传统在新时代焕发生机，让文化在创新中走向未来。'}
TOPICS = {'scene21':'真正的破圈，从尊重开始','scene22':'非遗进入年轻人的生活',
 'scene23':'创造性转化，创新性发展','scene24':'坚定文化自信，推动中华优秀传统文化传承发展'}

def require(value, message):
 if not value: raise ValueError(message)

def digest(path):
 return hashlib.sha256(path.read_bytes()).hexdigest()

def executable(name):
 bundled=ROOT/'node_modules/@remotion/compositor-win32-x64-msvc'/(name+'.exe')
 result=str(bundled) if sys.platform=='win32' and bundled.exists() else shutil.which(name)
 require(result,'Missing '+name); return result

def check_video():
 ffprobe,ffmpeg=executable('ffprobe'),executable('ffmpeg')
 probe=subprocess.run([ffprobe,'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(VIDEO)],capture_output=True,check=True)
 require(not probe.stderr.strip(),'ffprobe errors'); data=json.loads(probe.stdout)
 streams=[s for s in data['streams'] if s['codec_type']=='video']; require(len(streams)==1,'Expected one video stream')
 v=streams[0]
 require((v['width'],v['height'])==(1920,1080),'Wrong dimensions')
 require(Fraction(v['r_frame_rate'])==30 and Fraction(v['avg_frame_rate'])==30,'Wrong fps')
 require(int(v['nb_read_frames'])==600,'Wrong decoded frame count')
 require(abs(float(data['format']['duration'])-20)<.001,'Wrong duration')
 decoded=subprocess.run([ffmpeg,'-v','error','-xerror','-i',str(VIDEO),'-map','0:v:0','-an','-vf','scale=64:36,format=gray','-fps_mode','passthrough','-c:v','png','-f','image2pipe','pipe:1'],capture_output=True,check=True)
 require(not decoded.stderr.strip(),'Full decode reported errors')
 raw=decoded.stdout; pos=0; means=[]
 while pos<len(raw):
  start=pos; require(raw[pos:pos+8]==b'\x89PNG\r\n\x1a\n','Invalid PNG frame');pos+=8
  while True:
   require(pos+8<=len(raw),'Truncated chunk')
   n=struct.unpack('>I',raw[pos:pos+4])[0];kind=raw[pos+4:pos+8];pos+=12+n
   require(pos<=len(raw),'Truncated frame')
   if kind==b'IEND':break
  with Image.open(io.BytesIO(raw[start:pos])) as im: means.append(ImageStat.Stat(im.convert('L')).mean[0])
 require(len(means)==600,'Full decode not 600 frames')
 black=[i for i,x in enumerate(means) if x<=8];white=[i for i,x in enumerate(means) if x>=247]
 require(not black and not white,'Black/white candidate frames need review')
 return {'width':v['width'],'height':v['height'],'fps':30,'frames':600,'decoded_frames':len(means),
  'duration_seconds':float(data['format']['duration']),'codec':v['codec_name'],'pixel_format':v['pix_fmt'],
  'audio_streams':sum(s['codec_type']=='audio' for s in data['streams']),
  'black_frames':black,'white_frames':white,'frame_mean_luma_range':[min(means),max(means)]}

def check_captions():
 captions=json.loads((ROOT/'src/act06/captions.json').read_text(encoding='utf-8-sig'))
 topics=json.loads((ROOT/'src/act06/topics.json').read_text(encoding='utf-8-sig'));require(topics==TOPICS,'Theme text mismatch')
 require(set(captions)==set(EXPECTED),'Wrong scene caption keys')
 checks={}; warnings=[]
 for name,frames,_ in SCENES:
  lines=captions[name];require(''.join(c['text'] for c in lines)==EXPECTED[name],name+' wording mismatch')
  end=0;rates=[]
  for c in lines:
   require(isinstance(c['text'],str) and c['text'],name+' empty text')
   require(isinstance(c['startMs'],(int,float)) and isinstance(c['endMs'],(int,float)),name+' invalid timestamps')
   require(end<=c['startMs']<c['endMs']<=frames/30*1000,name+' invalid caption interval')
   require('timestampMs' in c and 'confidence' in c,name+' missing Caption fields')
   end=c['endMs']; count=len(re.findall('[\u4e00-\u9fff]',c['text']))
   rates.append(round(count/((c['endMs']-c['startMs'])/1000),2))
  checks[name]={'frames':frames,'dialogue_matches_request':True,'segments':len(lines),'cjk_characters_per_second':rates,
    'last_end_ms':end,'times_in_range_and_nonoverlapping':True}
  if max(rates)>6: warnings.append(name+': dense subtitle reading; do not record natural voiceover to this timing without review.')
 return checks,warnings

def check_sources():
 source=json.loads((ROOT/'public/assets/characters/SOURCES.json').read_text(encoding='utf-8-sig')); hashes={}
 for name in ['grandma','xiaolin','youth']:
  hashes[name]=digest(ROOT/'public/assets/characters'/(name+'.png'))
  require(hashes[name]==source[name]['sha256'],name+' original changed')
 return hashes

def keyframe(frame):
 p=OUT/'keyframes'/('frame-%04d.png'%frame);require(p.exists(),'Missing '+str(p));return p

def sheets():
 font=ImageFont.truetype(str(ROOT/'public/assets/fonts/SourceHanSerifSC-Regular.otf'),23)
 main=Image.new('RGB',(1920,1608),'#F2E5CB');detail=Image.new('RGB',(1920,1608),'#F2E5CB')
 items=[]
 for row,(name,_,frames) in enumerate(SCENES):
  for col,(position,f) in enumerate(zip(['first','middle','last'],frames)):
   with Image.open(keyframe(f)) as im:
    require(im.size==(1920,1080),'Wrong keyframe size');main.paste(im.convert('RGB').resize((640,360),Image.Resampling.LANCZOS),(640*col,402*row))
   ImageDraw.Draw(main).text((640*col+16,402*row+365),'%s | %s | frame %04d'%(name,position,f),font=font,fill='#2D1E1B')
   items.append({'scene':name,'position':position,'frame':f,'path':keyframe(f).relative_to(ROOT).as_posix()})
 for i,f in enumerate(EXTRA):
  with Image.open(keyframe(f)) as im:
   require(im.size==(1920,1080),'Wrong extra frame size');detail.paste(im.convert('RGB').resize((640,360),Image.Resampling.LANCZOS),(640*(i%3),402*(i//3)))
  ImageDraw.Draw(detail).text((640*(i%3)+16,402*(i//3)+365),'motion | frame %04d'%f,font=font,fill='#2D1E1B')
 main.save(OUT/'storyboard.jpg',quality=95,subsampling=0);detail.save(OUT/'motion-details.jpg',quality=95,subsampling=0)
 with Image.open(keyframe(570)) as a,Image.open(keyframe(599)) as b:
  stable=ImageChops.difference(a.convert('RGB'),b.convert('RGB')).getbbox() is None
 require(stable,'Final 7-8 second hold is not pixel-stable in rendered source frames')
 return items,stable

def main():
 require(VIDEO.exists(),'Render Act06Demo.mp4 first')
 report=check_video();captions,warnings=check_captions();hashes=check_sources();frames,stable=sheets()
 report.update({'status':'passed','scope':'technical export, exact wording, original assets and final hold; not voiceover approval',
  'video':VIDEO.relative_to(ROOT).as_posix(),'bytes':VIDEO.stat().st_size,'video_sha256':digest(VIDEO),
  'caption_checks':captions,'themes_match_request':True,'original_character_hashes_match':True,'character_sha256':hashes,
  'keyframes':frames,'extra_keyframes':[{'frame':f,'path':keyframe(f).relative_to(ROOT).as_posix()} for f in EXTRA],
  'final_second_source_frames_pixel_identical':stable,'warnings':warnings,
  'voiceover_timing_approved':False,'checks_not_performed':['Natural-speed recorded voiceover and sound mixing','Whole-film continuity and final editorial approval','Earlier-act full pixel regression']})
 (OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print(json.dumps({k:report[k] for k in ['status','video','duration_seconds','frames','bytes','video_sha256','final_second_source_frames_pixel_identical','warnings']},ensure_ascii=False,indent=2))

if __name__=='__main__':
 try: main()
 except (ValueError,OSError,KeyError,subprocess.SubprocessError) as error: raise SystemExit('Act06 verification failed: '+str(error))
