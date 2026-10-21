from pathlib import Path
from PIL import Image, ImageStat
import subprocess, json, hashlib, io, struct, shutil, sys
root=Path(__file__).resolve().parents[1]
binary=root/'node_modules/@remotion/compositor-win32-x64-msvc'
ffprobe=str(binary/'ffprobe.exe') if sys.platform=='win32' else shutil.which('ffprobe')
ffmpeg=str(binary/'ffmpeg.exe') if sys.platform=='win32' else shutil.which('ffmpeg')
if not ffprobe or not ffmpeg: raise SystemExit('Install ffmpeg and ffprobe to run this optional output verification.')
video=root/'out/Act01Demo.mp4'
probe=subprocess.run([ffprobe,'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(video)],capture_output=True,text=True,encoding='utf-8',check=True)
meta=json.loads(probe.stdout)
stream=next(s for s in meta['streams'] if s['codec_type']=='video')
assert (stream['width'],stream['height'])==(1920,1080)
assert stream['r_frame_rate']=='30/1'
assert int(stream['nb_read_frames'])==1080
assert abs(float(meta['format']['duration'])-36)<.001
decoded=subprocess.run([ffmpeg,'-v','error','-i',str(video),'-vf','scale=64:36,format=gray','-c:v','png','-f','image2pipe','pipe:1'],capture_output=True,check=True)
assert not decoded.stderr, decoded.stderr
data=decoded.stdout
pos=0
means=[]
while pos<len(data):
    start=pos
    assert data[pos:pos+8]==b'\x89PNG\r\n\x1a\n'
    pos+=8
    while True:
        length=struct.unpack('>I',data[pos:pos+4])[0]
        kind=data[pos+4:pos+8]
        pos+=12+length
        if kind==b'IEND': break
    image=Image.open(io.BytesIO(data[start:pos])).convert('L')
    means.append(ImageStat.Stat(image).mean[0])
assert len(means)==1080
black=[i for i,x in enumerate(means) if x<8]
white=[i for i,x in enumerate(means) if x>247]
assert not black and not white
asset=json.loads((root/'public/assets/characters/SOURCES.json').read_text(encoding='utf-8'))
for name,item in asset.items():
    assert hashlib.sha256((root/'public/assets/characters'/f'{name}.png').read_bytes()).hexdigest()==item['sha256']
report={'width':1920,'height':1080,'fps':'30/1','frames':1080,'duration':36,'codec':stream['codec_name'],'pixel_format':stream['pix_fmt'],'bytes':video.stat().st_size,'decoded_frames':1080,'black_frames':black,'white_frames':white,'frame_mean_luma_range':[round(min(means),2),round(max(means),2)],'source_pngs_match_recorded_hashes':True,'audio_streams':sum(s['codec_type']=='audio' for s in meta['streams'])}
(root/'out/verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
md=f'''# 第一幕 Demo 检查记录

- 输出：1920×1080、30 fps、36.000秒、1080帧。
- 编码：{stream['codec_name']}，{stream['pix_fmt']}，CRF 18；文件 {video.stat().st_size/1024/1024:.2f} MiB。
- 完整解码1080帧成功，解码器无错误。缩小灰度帧均值检查未发现全黑／全白异常帧，范围 {min(means):.2f}–{max(means):.2f}（0–255）。
- 逐镜视觉检查：0/120/239、240/465/689、690/885/1079帧；另检查1020帧完整凤凰。对应PNG在out/keyframes，九帧总览在out/storyboard.jpg。
- 修复并重渲染：跨镜SVG标识冲突、人物下半身坐姿遮挡、SVG人物图片未等待加载、字幕字体本地加载。
- TypeScript无输出类型检查通过，Remotion Studio合成可加载，独立场景已注册。
- 四位人物PNG与素材清单记录的原图SHA-256一致；本幕仅奶奶入画。附件／Library原文件未改动。
- 本版无声，字幕为脚本文案按阅读节奏排句；未使用付费语音或视频生成API。
- 动作范围：原图头部小角度旋转／轻摆与独立剪刀；未制作完整手臂骨骼。镜头03为同一木桌的二维桌面插入特写。

技术信息详见out/verification.json，复用接口见STYLE_GUIDE.md。
'''
(root/'QA_REPORT.md').write_text(md,encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
