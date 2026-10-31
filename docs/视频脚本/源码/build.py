from content import *
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT

# Keep the final theoretical line comfortable at the same conservative speaking rate.
shots[22]['cues']=[(0.7,12.0,'旁白','推进生态文明建设，让生态、经济、社会效益相统一，建设人与自然和谐共生的现代化。')]

def tc(v):
    return f'{int(v)//60:02d}:{int(v)%60:02d}'
def stamp(v):
    m=int(v)//60; sec=v-m*60
    return f'{m:02d}:{sec:04.1f}'
def spoken(t):
    return len(re.sub(r'[\W_]+','',t))
def estimate(t):
    return spoken(t)/3.5+len(re.findall('[，。！？：；、]',t))*.18

doc=Document()
sec=doc.sections[0]
sec.page_width=Cm(21); sec.page_height=Cm(29.7)
sec.top_margin=Cm(1.7); sec.bottom_margin=Cm(1.65)
sec.left_margin=Cm(1.9); sec.right_margin=Cm(1.9)
sec.header_distance=Cm(.7); sec.footer_distance=Cm(.7)
styles=doc.styles
for name in ['Normal','Title','Subtitle','Heading 1','Heading 2','Heading 3','Caption']:
    st=styles[name]; st.font.name='宋体'; st.font.color.rgb=RGBColor(0,0,0); st.font.italic=False
    st.element.get_or_add_rPr().get_or_add_rFonts().set(qn('w:eastAsia'),'宋体')
styles['Normal'].font.size=Pt(11)
styles['Normal'].paragraph_format.line_spacing=1.18
styles['Normal'].paragraph_format.space_after=Pt(6)
for name,size in [('Title',27),('Subtitle',15),('Heading 1',17),('Heading 2',13),('Heading 3',11.5)]:
    st=styles[name]; st.font.name='黑体'; st.font.size=Pt(size)
    st.element.get_or_add_rPr().get_or_add_rFonts().set(qn('w:eastAsia'),'黑体')
    st.paragraph_format.space_before=Pt(10 if name.startswith('Heading') else 0)
    st.paragraph_format.space_after=Pt(8)
    st.paragraph_format.keep_with_next=True
styles['Caption'].font.size=Pt(9)
styles['Caption'].paragraph_format.space_after=Pt(5)
# Continuous page number fields and a restrained running label.
h=sec.header.paragraphs[0]; h.text='推进生态文明建设  余村故事线视频脚本'
h.runs[0].font.size=Pt(8); h.runs[0].font.color.rgb=RGBColor(0,0,0)
f=sec.footer.paragraphs[0]; f.alignment=WD_ALIGN_PARAGRAPH.CENTER
f.add_run('第 ')
fld=OxmlElement('w:fldSimple'); fld.set(qn('w:instr'),'PAGE'); f._p.append(fld)
f.add_run(' 页')
for r in f.runs:r.font.size=Pt(9)
# Disable automatic hyphenation; preserve editable native paragraphs and tables.
settings=doc.settings.element
update=OxmlElement('w:updateFields'); update.set(qn('w:val'),'true'); settings.append(update)
lang=OxmlElement('w:themeFontLang'); lang.set(qn('w:val'),'zh-CN'); lang.set(qn('w:eastAsia'),'zh-CN'); settings.append(lang)

def p(text='',style=None,bold=False,size=None,after=None):
    x=doc.add_paragraph(style=style)
    r=x.add_run(text); r.bold=bold
    if size:r.font.size=Pt(size)
    if after is not None:x.paragraph_format.space_after=Pt(after)
    return x

def head(text,level=1):return doc.add_heading(text,level)
def page():
    x=doc.add_paragraph(); x.paragraph_format.space_before=Pt(0); x.paragraph_format.space_after=Pt(0); x.paragraph_format.line_spacing=Pt(1)
    r=x.add_run(); r.font.size=Pt(1); r.add_break(WD_BREAK.PAGE)
def label(k,v):
    x=doc.add_paragraph();x.add_run(k+'  ').bold=True;x.add_run(v);return x

def no_split(row):
    pr=row._tr.get_or_add_trPr();pr.append(OxmlElement('w:cantSplit'))
def shade(cell,color):
    el=OxmlElement('w:shd');el.set(qn('w:fill'),color);cell._tc.get_or_add_tcPr().append(el)
def grid(headers,rows,widths,size=10.5):
    table=doc.add_table(rows=1, cols=len(headers));table.alignment=WD_TABLE_ALIGNMENT.CENTER;table.autofit=False
    pr=table._tbl.tblPr
    borders=OxmlElement('w:tblBorders')
    for ed in ['top','left','bottom','right','insideH','insideV']:
        x=OxmlElement('w:'+ed);x.set(qn('w:val'),'single');x.set(qn('w:sz'),'4');x.set(qn('w:color'),'D9D9D9');borders.append(x)
    pr.append(borders)
    margins=OxmlElement('w:tblCellMar')
    for k,val in [('top',65),('left',100),('bottom',65),('right',100)]:
        x=OxmlElement('w:'+k);x.set(qn('w:w'),str(val));x.set(qn('w:type'),'dxa');margins.append(x)
    pr.append(margins)
    for i,w in enumerate(widths):table.columns[i].width=Cm(w)
    for i,t in enumerate(headers):table.rows[0].cells[i].text=t;shade(table.rows[0].cells[i],'E7EDF0')
    repeat=OxmlElement('w:tblHeader');table.rows[0]._tr.get_or_add_trPr().append(repeat)
    for data in rows:
        cells=table.add_row().cells
        for i,t in enumerate(data):cells[i].text=str(t)
    for ri,row in enumerate(table.rows):
        no_split(row)
        for ci,c in enumerate(row.cells):
            c.width=Cm(widths[ci]);c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
            for para in c.paragraphs:
                para.paragraph_format.space_after=Pt(1)
                para.paragraph_format.space_before=Pt(1)
                para.paragraph_format.line_spacing=1.12
                if ci==0 and widths[ci]<3.3:para.alignment=WD_ALIGN_PARAGRAPH.CENTER
                for run in para.runs:
                    run.font.size=Pt(size);run.bold=(ri==0)
                    run.font.name='宋体';run._element.get_or_add_rPr().get_or_add_rFonts().set(qn('w:eastAsia'),'宋体')
    p('',size=2,after=2)
    return table

def link(url):
    para=doc.add_paragraph();para.paragraph_format.space_after=Pt(5)
    hyp=OxmlElement('w:hyperlink');hyp.set(qn('r:id'),para.part.relate_to(url,RT.HYPERLINK,is_external=True))
    run=OxmlElement('w:r');pr=OxmlElement('w:rPr');sz=OxmlElement('w:sz');sz.set(qn('w:val'),'17');pr.append(sz)
    col=OxmlElement('w:color');col.set(qn('w:val'),'245D73');pr.append(col);run.append(pr)
    txt=OxmlElement('w:t');txt.text=url;run.append(txt);hyp.append(run);para._p.append(hyp)

# Page 1 — descriptive purpose and usable navigation.
p('推进生态文明建设',style='Title')
p('余村故事线 MG 动画视频脚本',style='Subtitle')
p('山河有约',size=23,bold=True,after=4)
p('——从绿水青山到金山银山',size=14,after=18)
head('第一部分 项目基本信息')
p('一位返乡大学生想把家乡拍成热门，一位经历产业转型的爷爷带她重看山水与生活。故事通过关停的阵痛、持续的生态修复和新的经营实践，回答生态保护与经济发展如何相互促进，并让青年的理解落到参与行动上。')
grid(['项目','制作约定'],[
('课程选题','推进生态文明建设'),('目标时长','300秒整；六幕24镜；1920×1080；30fps；9000帧'),('故事背景','浙江省湖州市安吉县天荒坪镇余村；当下返乡与历史回望交织'),('主要人物','老周与孙女小禾；三套可复用村民群像，无新增有名支线人物'),('核心立意','在保护好生态的前提下转变发展方式，让生态优势转化为可持续的发展优势，促进生态效益、经济效益、社会效益相统一。'),('制作方式','传统皮影与剪纸视觉；SVG、遮罩、图层视差和逐帧关键帧；不使用文生视频服务。')],[2.5,14.7],10.5)
p('创作边界  老周、小禾及其家庭经历、对白、拍摄计划均为艺术虚构，不对应真实历史人物；历史节点由独立旁白与资料卡交代。绘制旧图必须标注“历史场景示意”。',bold=True)
head('阅读与使用',2)
p('第二部分核对事实；第三、四部分了解人物与结构；第五部分逐镜制作；第六部分直接用于录音与字幕拆分；第七部分统一美术和动画规范；第八部分核对教材；第九部分追溯来源与验收。')
p('默认片名保留《山河有约》。备选片名一《青山有回声》，突出两代人相互回应；备选片名二《把青山留给明天》，突出长远选择。',size=10.5)
p('编制日期  2026年10月31日     文档版本  1.0',size=9)

# Page 2 — facts before invention.
page();head('第二部分 理论依据与史实资料')
head('理论主线',2)
p('影片围绕人与自然和谐共生、绿水青山就是金山银山、绿色发展、推进生态文明建设四个方向展开。以党的二十大有关绿色发展和生态文明建设的权威发布作理论校验依据[S7]，以余村公开实践作案例依据，不能据此声称完成课程指定教材原文核对。')
p('叙事中的转化逻辑是：控制污染与修复生态，改善环境与生活条件；结合本地条件发展适宜的经营活动，创造就业与收入；依靠治理、经营和共同参与，持续维护生态基础。保护本身具有公共价值，不能将生态价值简化为旅游收入。',bold=True)
head('关键历史节点',2)
grid(['时间','已核实的事实','依据'],[
('20世纪八九十年代','余村曾依赖石矿开采、水泥生产等发展，获得收入的同时承受粉尘、水污染等代价。','S1、S4'),('2003—2005年','在浙江建设生态省、安吉生态立县背景下，余村陆续关停矿山和水泥厂，探索转型，经历就业和收入压力。','S2、S3'),('2005年8月15日','时任浙江省委书记习近平在余村考察，肯定关停矿山、探索转型的做法，首次提出“绿水青山就是金山银山”理念。','S3、S5'),('此后多年','开展复绿复垦、治水等工作，发展农家乐、民宿和乡村旅游，带动农产品销售。','S2、S4、S6'),('2021年12月2日','余村入选首批联合国世界旅游组织“最佳旅游乡村”。按当时机构名称表述。','S5'),('2022年7月及以后','“余村全球合伙人”计划启动，青年和新业态参与绿色发展；小禾并非真实计划成员。','S3、S2')],[3.0,11.7,2.5],10.3)
head('史实使用规则',2)
p('关停写作一个过程，不写成2005年考察后才开始，也不把关停与转型成功安排在同一天。不同报道对单个厂矿停产、拆除、整治的时间口径有差异，全片采用可交叉核验的“2003—2005年陆续关停”，不另造精确日期。')
p('全片不使用旅游收入、人均收入、游客数量、碳减排量等统计值，避免跨年份、跨“余村”与“大余村”口径混用。代表性成果用有明确发布依据的2021年荣誉、经营与生活变化表现。')

# Page 3 — characters and narrative.
page();head('第三部分 人物设定')
grid(['人物','身份与性格','外观与动作识别','叙事变化'],[
('老周','艺术化虚构综合人物；曾参与矿山或相关工业生产。朴实、沉稳，关心后代。','现实约六十多岁；棕色上衣，工作帽为回忆道具；中年版沿用侧脸和帽形。抬手、按帽、指山，动作节制。','从亲历收入与污染矛盾，到认可关停、探索新路，再支持孙女接力。不是对全部历史知情的权威讲解员。'),
('小禾','虚构大学生；返乡完成课程拍摄。活泼、独立，关注产业、收入和传播。','绿色衣装、帆布包、手机与纸质清单；初期滑屏快，后期观察与落笔慢。','想拍热门→追问生计→理解保护与转型→记录劳动、制作步行路线和绿色出游提示。'),
('村民群像','综合性群像，不对应实名人物。体现集体决策、治理、经营与日常生活。','三套基础外形，以帽子、围裙、工具和背包变体复用；不加复杂口型。','从旧产业劳动者转为管护者、经营者等，呈现多主体持续参与。')],[1.8,5.1,5.1,5.2],10.2)
head('第四部分 完整故事梗概')
p('小禾回余村做课程视频，想找到能带来热度的家乡故事。爷爷老周翻出一张旧图：曾经的矿山带来收入，也让灰尘落进屋里。小禾不解，能挣钱的产业为什么要关？老周讲起工作停下、收入减少的焦虑，村民开始治水、复绿和尝试农家乐，既没有现成答案，也没有立刻成功。')
p('一张历史资料卡将叙事带到2005年8月15日。习近平同志在余村考察时首次提出“绿水青山就是金山银山”理念，进一步坚定了转型方向。小禾把笔记中的“出圈”改成“走远”：山水要保护，发展方式也要改变。')
p('爷孙沿溪而行，看到修复后的山坡、忙碌的农家乐、销售农产品的小店。小禾明白，生态优势需要经过持续保护、产业选择、认真经营和共同参与，才能变成稳固的生活基础。她修改拍摄方案，把镜头对准维护溪岸、接待游客和经营农产品的双手，设计一条课程创作中的步行路线，并加入不打扰居民、不进入养护区域等提示。')
p('爷爷举着旧图，小禾将它与今天的山脊对齐。两代人一起完成拍摄，片尾回到山水中的约定。镜头从余村展开为人与自然共同生活的画卷，落到推进生态文明建设、建设人与自然和谐共生的现代化。')

page();head('第四部分 全片时间轴与叙事推进')
grid(['幕次','起止时间','时长','镜头','叙事任务'],[(a[0],tc(a[2])+'—'+tc(a[3]),str(a[3]-a[2])+'秒',a[4],a[5]) for a in acts],[1.6,3.3,1.5,1.6,9.2],10.3)
p('合计  00:00—05:00，严格300秒；24个镜头首尾相接，均不重叠扣时。转场在各镜头给定时长内完成，不额外添加片头、片尾或黑场。',bold=True)
head('逐镜时长与全局帧',2)
grid(['镜头','时间段','秒','镜头','时间段','秒'],[[f'{shots[i]["n"]:02d}',tc(shots[i]['start'])+'—'+tc(shots[i]['end']),shots[i]['dur'],f'{shots[i+12]["n"]:02d}',tc(shots[i+12]['start'])+'—'+tc(shots[i+12]['end']),shots[i+12]['dur']] for i in range(12)],[1.3,5.8,1.5,1.3,5.8,1.5],10.2)
p('帧计算约定  全局区间为[startFrame,endFrame)，startFrame=起始秒×30，endFrame=结束秒×30，durationInFrames=时长×30。第一镜为[0,300)，最后一镜为[8610,9000)，最后可见帧为8999。')


# Pages 5–28: one editable record per shot.
for s in shots:
    page()
    if s['n']==1:head('第五部分 六幕分镜脚本')
    a=acts[s['act']-1]
    if (s['n']-1)%4==0:
        head(a[0]+' '+a[1],2)
        p('本幕任务  '+a[5],size=10,after=5)
    head(f'镜头{s["n"]:02d} {s["title"]}',2)
    p(f'{a[0]}  |  {tc(s["start"])}—{tc(s["end"])}  |  {s["dur"]}秒  |  全局帧 [{s["start"]*30},{s["end"]*30})',size=10,bold=True,after=6)
    dial=[];narr=[]
    for x,y,r,t in s['cues']:
        line=f'局部{x:g}—{y:g}秒  {r}：“{t}”'
        (narr if r in ['旁白','老周画外音'] else dial).append(line)
    rows=[('画面内容',s['picture']),('人物动作与表情',s['action']),('人物对白','\n'.join(dial) if dial else '无。'),('旁白与画外音','\n'.join(narr) if narr else '无。'),('屏幕字幕',s['screen']+'\n底部对白字幕逐字使用本镜全部声音文本，按第六部分分句显示。'),('镜头运动',s['camera']),('MG动画设计',s['mg']),('前后转场',s['transition']),('声音设计',s['sound']),('史实与虚构边界',s['refs'])]
    grid(['制作字段','执行内容'],rows,[2.6,14.6],10.5)
    p('执行提示  局部秒数从本镜0秒起算；图形和主题文字避开底部对白字幕区。声音以本页及第六部分的同一文本为准，禁止新增“人物原话”或未经核验的数据。',size=9,after=0)

# Six recording pages. Exact text is generated from the same cues as the storyboard.
for ai,a in enumerate(acts,1):
    page()
    if ai==1:head('第六部分 完整旁白与字幕文本')
    head(a[0]+' 配音与字幕',2)
    if ai==1:
        p('以下为全部声音定稿；说话人名称与时间只用于制作，不读出。对白字幕与声音逐字一致，按标点与语义断句；每镜另列画面文字，制作指令不作为字幕显示。全局时间保留0.1秒，可换算为毫秒。估时按每秒3.5个有效字、每个标点加0.18秒停顿，仅为文字计时，不是实录验收。',size=10)
    for s in [z for z in shots if z['act']==ai]:
        head(f'镜头{s["n"]:02d} {tc(s["start"])}—{tc(s["end"])}',3)
        for x,y,r,t in s['cues']:
            st=s['start']+x;ed=s['start']+y
            p(f'{r}  {stamp(st)}—{stamp(ed)}  录音窗口{y-x:.1f}秒  估读{estimate(t):.1f}秒',size=9.5,after=2)
            p(t,bold=True,size=11,after=3)
        p('画面文字  '+s['screen'],size=9.5,after=5)
    sub=[z for z in shots if z['act']==ai]
    grid(['镜头','声音有效字','估读合计','声音窗口','静默与画面余量'],[(f'{s["n"]:02d}',sum(spoken(t) for _,_,_,t in s['cues']),f'{sum(estimate(t) for _,_,_,t in s["cues"]):.1f}秒',f'{sum(y-x for x,y,_,_ in s["cues"]):.1f}秒',f'{s["dur"]-sum(y-x for x,y,_,_ in s["cues"]):.1f}秒') for s in sub],[1.5,3.1,3.0,3.1,6.5],10)
    p('配音处理  老周温和沉稳；小禾前段轻快、后段认真；旁白客观自然。镜内声音不重叠，句末保留呼吸。实录后在给定窗口内做分句与停顿微调，超时优先重录或精简，不靠大幅加速挤入镜头。',size=10)

# Production standards.
page();head('第七部分 全片视觉风格与动画制作规范')
head('皮影与剪纸的统一语言',2)
p('延续《红纸新生》已建立的宣纸幕布、侧面皮影、关节铆钉、平面建筑和帧驱动动画方法。本片新建老周与小禾造型；可复用宣纸纹理、舞台、文字、安全区和动作设计思路，不直接把上一片奶奶等人物当作本片人物。')
grid(['颜色','色值','具体用途'],[
('森林绿','#315D45','近处竹林、稳定植被、主要生态图形'),('山水青','#6A9B8B','中景山体、溪岸与植物层'),('天空蓝','#A8C9C2','远山、天空和清水高光'),('大地棕','#8A6849','旧矿山、土地、工具与老周衣装'),('宣纸米黄','#F2E5CB','底幕、字幕承托、纸质道具'),('传统金色','#C79540','人物铆钉、山脊细边、机制连接线')],[3.0,3.5,10.7],10.5)
p('第一幕以棕土、灰尘和裸露坡面为主；第二幕保留灰褐背景，让少量苗木和清理动作先出现；第三幕用宣纸资料层稳住历史信息；第四幕逐块补入竹林、清水和生活空间；第五、六幕以青绿为主，暖金只作点缀。环境改善必须由具体对象变化呈现。')
head('人物与布景资产',2)
grid(['资产组','拆分与复用要求'],[
('人物','老周现实版／中年版，小禾，三套村民模板。拆头、躯干、上臂、前臂、手、腿；脸部只需平静、疑问、专注、微笑四种替换。'),('场景','屋内窗桌、旧矿山水泥厂、厂门、溪岸修复、农家经营、农产品小店、村路长凳、片尾山水长卷。旧今场景共享山脊与溪岸路径，局部结构不同。'),('道具','旧图、工具包、工作帽、手机、清单、笔、接待台、钥匙、竹篮、三种农产品包装、保洁工具。旧图不伪装真实档案。'),('文字与资料','年份轴、定位示意、理论文字卡、荣誉卡、绿色出游提示、片尾说明。全部用可编辑文字，不烘焙在背景图里。')],[3.0,14.2],10.2)
p('纸纹固定不闪烁，建议透明度6%—8%；主体描边3—5像素，细纹1—2像素；人物轻影向右下偏移约5像素。光由同一侧斜照，采用暖色局部透光，不用粒子烟花或写实三维。',size=10)

page();head('第七部分 动画与声音执行标准')
head('时间与合成',2)
p('全片采用1920×1080、30fps，六幕分别为1200、1500、1500、1500、1800、1500帧；所有镜头合计9000帧。建议以Scene01—Scene24独立合成，再按全局起点拼接。只把本脚本作为新片制作依据，既有《红纸新生》成片时长和镜头编号不沿用。')
p('动画由帧号、固定插值和关键帧驱动；固定随机种子，不使用运行时随机、计时器或无法复现的CSS动画。物件用SVG分组和遮罩；山水用分层视差，单镜推进一般3%—8%；手臂围绕实际关节旋转，避免整个人物左右晃动替代动作。')
p('每镜先做首、中、末三个关键帧，再预览手势、道具接触和转场连续性。硬切与匹配切换使用相邻镜头；遮罩和淡入在镜内完成。总时长不得因叠化重叠而缩短，也不能多加结束黑场。')
head('字幕与资料层',2)
p('底部保留约160像素字幕区，内容安全边距左右各120像素、上下各70像素。对白字幕建议思源宋体或宋体，字号40—44像素，两行以内，每行尽量不超过22个汉字；按语义分句，不能一次铺满整段。人物标签可省略，但声音角色必须分轨。')
p('历史日期和理论主字放在画面上半部，资料编号放右上或资料卡下缘；普通说明字号不低于28像素，片尾来源可用24—26像素并保留足够停留。片尾对白在04:53.5前结束，最终主题在04:54起保留6秒；片名、主题、来源分层，防止互相挤占。')
p('第六部分的每条声音窗口换算成毫秒后录入字幕数据。可采用shotId、speaker、startMs、endMs、text字段，再按录音分句生成SRT；主时间轴保持不变。所有数字日期在口播中读为中文，屏幕日期保留阿拉伯数字。')
head('声音与交接',2)
p('老周、小禾、旁白各一条人声轨；配乐以笛箫、弦乐和轻打击为主。对白出现时配乐下降约8—12dB，再据听感调整；确保无削波，环境声不遮字。矿山机械声只服务历史段，后续由流水、竹叶、脚步和经营声逐渐接替。领导人相关内容采用普通旁白，不模仿本人声音。')
p('每镜交接包含时长、资产列表、关键帧、字幕数据、声音文件与待办；文件名建议Scene01等统一两位数。六幕交接后检查缺字、字体替换、图层遮挡、道具漂移、字幕阅读和镜头衔接。实录、音乐授权与动画成片验收在制作阶段完成，本次不将文字计时视为最终音画验证。')

# Textbook matrix.
page();head('第八部分 教材对应性检查表')
p('检查结论  理论方向已与权威公开表述校验；指定教材的书名、版本、章节、原文及页码均待老师指定版本确认。以下“理论方向”是主题归纳，不冒充教材原句。',bold=True)
grid(['教材理论方向','幕次与镜头','具体人物情节','对应画面','核对状态'],[
('人与自然和谐共生','一、四、六\n02、13、22—24','爷孙从污染记忆走向共同生活与守护。','窗台灰尘、溪岸管护、山水生活长卷。','方向已校验S7；教材原文待核。'),('绿水青山就是金山银山','三、四\n09—16','小禾由问“靠什么生活”转为理解保护与经营的联系。','2005年资料卡、旅游经营、农产品销售。','历史表述已核S3、S5；教材章节页码待核。'),('生态保护与经济发展的关系','二、四\n05—08、14—16','呈现收入压力，也呈现新生计与持续保护。','停下的设备、空工具包、经营与管护循环线。','方向校验S3、S7；循环图为教学概括。'),('推动绿色发展','四、五\n14—19','由旧资源依赖转向适宜经营，小禾主动调整传播方式。','农家乐、小店、农旅产品和出游提示。','案例核验S2、S4、S6；教材原文待核。'),('推进生态文明建设','全片\n重点12、23','村民持续治理，小禾从理解走向参与。','分区复绿、多主体劳动、结尾主题。','主题方向已核S7；教材具体表述待核。'),('三种效益相统一','四、六\n16、23','看见生态、经营与生活改善相互联系。','三类生活节点与保护循环，不用无来源收益值。','公开实践依据S1、S3；教材原文待核。'),('绿色生活与青年担当','五\n17—20','拍劳动、做步行路线、加入文明出游提示。','课程清单、保洁、剪辑与爷孙协作。','绿色生活方向S7；青年行动为创作情节。')],[3.0,2.0,4.5,4.1,3.6],9.8)
head('交给任课老师确认的三项内容',2)
p('一是课程指定教材全名、出版年份或修订版；二是“推进生态文明建设”所在章节及老师要求使用的原句；三是片尾“建设人与自然和谐共生的现代化”等表述与本课程教学进度是否衔接。确认后在本表补入原文和页码，必要时只调整理论字幕及旁白，保留已核验史实。')
p('未提供教材前，不写“教材第某章某页指出”，也不推定课程简称所对应的教材版本。教材核对不影响按本脚本先行开展人物设计、场景搭建、关键帧和静音动画制作。',size=10.5)

# Human-readable sources, actual original/republishing links clearly attributed.
for ri,group in enumerate([refs[:4],refs[4:]]):
    page()
    head('第九部分 参考资料与事实核验清单' if ri==0 else '第九部分 参考资料续')
    if ri==0:p('资料核验日期  2026年10月31日。以下列明实际查阅网页及原发布／转载关系；网页发布时间与历史事件发生时间分别记录。参考编号对应分镜中的事实依据，不是画面素材授权。',size=10)
    for sid,title,org,date,url,use in group:
        head(sid+' '+title,3)
        label('发布机构',org);label('发布时间',date)
        link(url)
        p('对应内容  '+use,size=10.5)
    if ri==1:
        head('事实核验结论',2)
        p('矿山与水泥产业、关停过程、2005年考察及理念、此后生态治理、乡村旅游与农产品转化、青年参与和2021年代表性成果，均已找到上述权威网页依据。正文未引用未核实的经济统计值；未把周边“大余村”项目移作余村本村实绩。')
        p('史实与人物分开：真实历史用资料卡和旁白；老周的工作帽、工具包、家庭记忆与小禾课程拍摄属于艺术虚构。未借用真实村民姓名为虚构对白背书，也未制作领导人的虚构现场对白或配音。')

page();head('第九部分 制作前验收与待确认事项')
checks=[
('结构','六幕完整，每幕4镜，镜头01—24连续，无重复或遗漏。'),('时长','40＋50＋50＋50＋60＋50＝300秒；24镜相接；30fps时总计9000帧。'),('内容','每镜含画面、动作表情、对白、旁白、屏幕字幕、运镜、MG设计、前后转场、声音及来源边界。'),('声音','全部声音文本与分镜一致；逐条提供录音窗口、字数和保守估时，未出现估读超出窗口的条目。实际录音仍需试听复核。'),('历史','2003—2005年关停过程与2005年8月15日考察先后正确；关键事实可按S1—S7追溯。'),('虚构','人物、家庭记忆与课程拍摄均显式标记虚构；绘制旧图标注示意。'),('理论','从生态代价、转型选择、绿色经营到青年参与形成主线，片尾明确回扣生态文明建设。'),('教材','完成方向对应，未编造教材原句、章次或页码；具体版本仍待确认。'),('可制作性','两名主角与复用群像；以二维SVG、遮罩、视差、关键帧实现，资产和声音规范明确。'),('文档','原生可编辑文字与表格；页码连续；分镜一镜一页；表头重复、行内禁止跨页拆分。')]
grid(['检查项','本稿状态'],checks,[2.2,15.0],10.5)
head('进入制作时需要确认',2)
p('教学确认  由老师或小组提供指定教材版本及对应原文，补齐第八部分。')
p('声音确认  选定配音人员、录制最终人声；按窗口调整停顿与字幕分句，再做整片300秒音画试听。')
p('美术确认  先审老周、小禾及新旧同景关键帧；若使用真实历史照片或新闻视频，核实出处、署名与使用权限。现稿可全部以自行绘制示意图完成。')
p('成片验收  最终动画检查字体、对白、历史文字、来源、末帧停留和声音混合；本次交付是可直接进入逐镜制作的脚本文档，不包含动画或实录配音。')

# Semantic validation before saving.
assert len(shots)==24 and [s['n'] for s in shots]==list(range(1,25))
assert sum(s['dur'] for s in shots)==300
for ai,a in enumerate(acts,1):assert sum(s['dur'] for s in shots if s['act']==ai)==a[3]-a[2]
for s in shots:
    prev=0
    for x,y,r,t in s['cues']:
        assert 0<=x<y<=s['dur'] and x>=prev
        assert estimate(t)<=y-x,(s['n'],estimate(t),y-x)
        prev=y
assert shots[-1]['end']==300
props=doc.core_properties
props.title='推进生态文明建设 余村故事线 MG 动画视频脚本'
props.subject='山河有约 从绿水青山到金山银山'
props.author='课程视频制作小组';props.keywords='余村 生态文明 MG 分镜 六幕 24镜'
props.comments=''
# Remove template paragraph borders including the inherited title rule.
for root in (doc.element, doc.styles.element):
    for border in list(root.iter(qn('w:pBdr'))):
        border.getparent().remove(border)
doc.save(OUT)
# Native re-open verifies a readable OOXML document, not just an existing ZIP.
check=Document(OUT)
assert len(check.tables)>=32
summary={'path':str(OUT),'shots':len(shots),'seconds':300,'frames':9000,'speakingCharacters':sum(spoken(t) for s in shots for _,_,_,t in s['cues']),'estimatedSpeechSeconds':round(sum(estimate(t) for s in shots for _,_,_,t in s['cues']),1),'tables':len(check.tables),'references':len(refs),'voiceCues':sum(len(s['cues']) for s in shots)}
(BASE/'verification.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
(BASE/'shots.json').write_text(json.dumps(shots,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=True))
