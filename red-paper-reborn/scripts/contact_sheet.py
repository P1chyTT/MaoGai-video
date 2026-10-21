from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[1]
sheet=Image.new('RGB',(1920,1206),'#f2e5cb')
draw=ImageDraw.Draw(sheet)
font_path=root/'public/assets/fonts/fangsong.ttf'
if not font_path.exists(): font_path=root/'public/assets/fonts/SourceHanSerifSC-Regular.otf'
font=ImageFont.truetype(str(font_path),25)
for row,scene in enumerate(['scene01','scene02','scene03']):
    for col,(part,zh) in enumerate([('first','首帧'),('mid','中间帧'),('last','末帧')]):
        name=f'{scene}-{part}'
        img=Image.open(root/'out/keyframes'/f'{name}.png').convert('RGB').resize((640,360),Image.Resampling.LANCZOS)
        x,y=col*640,row*402
        sheet.paste(img,(x,y))
        draw.text((x+22,y+367),f'镜头 0{row+1} · {zh}',font=font,fill='#2d1e1b')
sheet.save(root/'out/storyboard.jpg',quality=95)
print(root/'out/storyboard.jpg')
