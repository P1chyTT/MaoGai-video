# 第三幕《理念的转变》制作报告与交接

更新：2026-10-31。范围为Scene09–Scene12，独立50秒／1500帧／1920×1080／30fps，H.264 MP4。正式依据为[Word脚本](../视频脚本/推进生态文明建设_余村故事线视频脚本.docx)第三幕四镜及第六部分声音定稿，完整读取了对应分镜与声音文字，没有改写旁白、对白或历史事件。

本次完成四镜代码、独立合成、Studio预览、MP4导出、12张首中末帧与媒体验证。版本为完整原文字幕＋原创非人声环境音，尚无真人配音。未制作第四幕，也未进行Git提交、推送或合并。

## 镜头与时间

|镜头|名称|本幕帧区间|全片帧区间|状态|
|---|---|---|---|---|
|09|把时间说清楚|[0,360)|[2700,3060)|12秒视觉Demo完成|
|10|一句话指明方向|[360,750)|[3060,3450)|13秒视觉Demo完成|
|11|小禾改了一个词|[750,1110)|[3450,3810)|12秒视觉Demo完成|
|12|理念要落在行动里|[1110,1500)|[3810,4200)|13秒视觉Demo完成|

`Act03Demo`内部使用局部0–50秒，各镜从自身0秒计时。全片组装时将整幕放在第2700帧／90秒处，不能在各镜内部再次加全局偏移。镜间转场均包含在既定时长中，没有增加镜头外帧数。

- 成片：`red-paper-reborn/out/act03/Act03Demo.mp4`。
- 本幕字幕：`red-paper-reborn/out/act03/Act03Demo.srt`。
- 全片时间字幕：`red-paper-reborn/out/act03/Act03Demo-global.srt`。
- [12帧总览](overview.jpg)及[原尺寸关键帧](keyframes/)。
- [实际媒体验证记录](verification.json)：编码、时长、逐帧解码、黑白帧扫描、音量、SHA-256与前两幕保护数量。

视频轨应为恰好50.000秒／1500帧；AAC容器可能带毫秒级填充，不能将填充解释为额外视频帧。`out/`继续被Git忽略，制作缓存与本机成片没有自动上传。

## 四镜实际制作

**Scene09**：从第二幕农家乐木牌相同位置与尺寸的矩形开始，展开为宣纸资料层。浙江概括轮廓与浙江／湖州／安吉／余村标签依次出现，三级定位圈缩小；地图标明定位示意，不作为精确行政边界。时间线先呈现“2003—2005年：关停与探索”，再推进至“2005年8月15日”。日期卡与村会议室外观并列，爷孙只在左下角观看资料，小禾持笔记录。外观明确标“非历史现场复原”。

**Scene10**：日期卡留在左上；前4秒呈现已关停矿山与探索经营的简图，缓推3%。中央“绿水青山就是金山银山”整体淡入12帧，然后稳定；两条路径分别连接“保护生态”和“转变发展方式”，汇成绿色山体，金色仅勾勒山脊。图标在核心文字出现后退场，避免竞争。没有金币、收益曲线或领导人形象。末尾山形线变为下一镜笔记本上的山水线。

**Scene11**：同一老屋、窗、桌及人物。笔记本从合页展开，原题“家乡如何出圈”先保持清晰，再保留红棕划线，并用遮罩逐步显出“家乡如何走远”。小禾完成书写后抬笔让开文字，老周不说话，将杯子轻推到她手边。7秒后拉远，笔记本逐渐回到桌面的平面透视，树与民宿门落在同一山水线上。杯中涟漪扩张为下一镜的水面。

**Scene12**：圆形遮罩展开溪岸与裸露坡面。三组村民分别清理杂物、栽植树苗、巡护设施；坡面采用三块遮罩先覆土、再植草，局部保留裸露与养护状态。三次季节页签翻动表示多年，不编具体年数。水纹逐渐清晰、苗木只增加少量叶片。爷孙只在前景慢行观察，不代替全部治理者。远山总左移18px，右侧仍保留小树、工具和“仍需养护”提示。

## 历史事实与人物层

正式脚本与任务要求一致，没有发现本幕对白、历史日期或核心理念的文字差异。历史信息的出处沿用脚本编号，不新增来源编号：

- S3：[国家发展改革委《幸福就在绿水青山间——习近平总书记和安吉县余村的故事》](https://www.ndrc.gov.cn/xwdt/ztzl/NEW_srxxgcjjpjjsx/jjsxyjqk/sxzj/dt/202401/t20240116_1363305_ext.html)。本次重新访问，支持2005年8月15日考察、当时职务、肯定关停与探索及理念提出的历史节点。
- S5：[文化和旅游部余村入选“最佳旅游乡村”公告](https://www.mct.gov.cn/whzx/whyw/202112/t20211202_929544.htm)。本次重新访问，交叉核对上述日期、职务与理念表述。

完整资料边界见[史实与参考资料](../史实与参考资料.md)。Scene09、10由资料卡和旁白承担历史事实；没有绘制习近平同志皮影或肖像，没有模仿声音、复原讲话、掌声或新闻录音。Scene09的爷孙位于独立观看层；Scene10完全不出现爷孙。Scene11、12保留人物与家庭故事为艺术虚构的标记。

## 新增代码与复用

工程根仍是`red-paper-reborn/`，没有初始化新项目，也没有升级锁定依赖。

|新增文件|内容／关键接口|
|---|---|
|[Act03Demo.tsx](../../red-paper-reborn/src/compositions/Act03Demo.tsx)|四条独立`Series.Sequence`，360／390／360／390帧，预挂载1秒|
|[Scene09.tsx](../../red-paper-reborn/src/scenes/act03/Scene09.tsx)|位置示意、时间线、日期卡与观看人物层|
|[Scene10.tsx](../../red-paper-reborn/src/scenes/act03/Scene10.tsx)|核心理念、路径汇合、山形到笔记线匹配|
|[Scene11.tsx](../../red-paper-reborn/src/scenes/act03/Scene11.tsx)|笔记修改、关节写字、推杯、拉远与涟漪|
|[Scene12.tsx](../../red-paper-reborn/src/scenes/act03/Scene12.tsx)|水面遮罩、持续治理场景|
|[Act03Frame.tsx](../../red-paper-reborn/src/components/act03/Act03Frame.tsx)|`scene`必填；`label/labelOpacity/fiction`可选；复用正式舞台、字幕并裁取本幕音轨|
|[History.tsx](../../red-paper-reborn/src/components/act03/History.tsx)|`ZhejiangLocator(time)`、`DateCard(x,y,compact,opacity)`、`MeetingExterior(x,y,scale)`|
|[Notebook.tsx](../../red-paper-reborn/src/components/act03/Notebook.tsx)|`Notebook(open,strike,rewrite,icons,line)`、`Pen`、`Cup`、`ridgePath(progress)`；`armTo()`将目标点换算为现有104／113单位臂骨角度，复用原人物，不修改其骨架|
|[Restoration.tsx](../../red-paper-reborn/src/components/act03/Restoration.tsx)|`Restoration(time)`、`SeasonTab(time)`及可供Scene13匹配的`CREEK`路径|
|[captions.json](../../red-paper-reborn/src/scenes/act03/captions.json)|13段原文字幕，保留正式配音窗口|
|[create-act03-foley.py](../../red-paper-reborn/scripts/create-act03-foley.py)|仅标准库生成的原创音效与克制音符|
|[render-act03.mjs](../../red-paper-reborn/scripts/render-act03.mjs)|视频、12帧与额外动作帧导出|
|[verify-act03.mjs](../../red-paper-reborn/scripts/verify-act03.mjs)|对白、时间、音轨长度、原有文件保护、两份SRT|
|[inspect-act03-media.py](../../red-paper-reborn/scripts/inspect-act03-media.py)|核验实际MP4并写入验证记录|

`Root.tsx`仅新增Act03Demo与四个独立镜头入口；包脚本新增`render:act03`、`keyframes:act03`、`check:act03`。没有改动前两幕的镜头与组件源码。

直接复用`Puppet`、`OldHouseStage`、`OldTable`、`ArtDefs`、`MountainScene`、`RIDGE/SCAR`、`Cloud`、`FarmSign/FarmHouse/FactoryGate`、`Sapling/Spade/Broom`、`Villager/handPoint`、`CameraLayer`、`ShadowStage formal`和`Dialogue formal`。所有新图形均为本地SVG，没有生成新的角色图片。三张原始PNG保留，仍作为视觉标准；现用SVG人物是前两幕建立的衍生实现，不声称已完成原PNG精细拆层。

## 实际美术规范

沿用森林绿`#315D45`、山水青`#6A9B8B`、天空蓝`#A8C9C2`、大地棕`#8A6849`、宣纸米黄`#F2E5CB`、传统金`#C79540`及墨褐`#2D1E1B`。纸纹、木纹、镂空纹、铆钉和阴影直接使用前两幕实现。人物基准骨架比例保持不变；资料观看者使用0.27比例作为独立前景层，治理村民0.35–0.39，前景爷孙0.47–0.49。

核心理念是88px真实中文文本，整体淡入，不弹跳、不变形；金脊线与山体共用镜头变换。底部对白继续为44px宋体、左右120px、底部78px、160px宣纸渐变承托，13条分句完整覆盖原文。字幕沿用整句淡入机制，没有更换前两幕字幕组件。

Notebook文字为真实SVG文本与遮罩，不是图片文字。为了读清原词与新词，书写阶段采用较平展的展示角度；双人拉远时逐渐压回桌面平面。全部运动由当前帧、`interpolate`封装缓动和确定性数学控制，不依赖CSS循环或渲染时随机数。

## 声音与配音窗口

没有找到对应正式录音，保留以下窗口。独立幕时间加90秒即全片时间；两份SRT已生成。

|镜头|人物|本幕时间|正式原文|
|---|---|---|---|
|09|旁白|0.4–11.6秒|二〇〇五年八月十五日，时任浙江省委书记习近平来到余村考察。|
|10|旁白|12.5–24.4秒|他肯定余村关停矿山、探索转型的做法，并首次提出：绿水青山就是金山银山。|
|11|小禾|25.6–36.3秒|我懂了，保护好山水，还要找到合适的产业，日子才能越过越稳。|
|12|旁白|37.6–49.4秒|方向有了，功夫还要下在每天。治理污染、修复生态，让山水一点点恢复生机。|

`act03-foley.wav`为50秒／48kHz／16bit／双声道原创程序合成音轨，固定种子20261102，包含纸响、落笔划线、杯子轻响、流水、铲土、逐渐增加的鸟鸣以及少量由低音转为木管音色的原创音符。源音轨峰值约−21.25dBFS，场景音量0.8；实际成片音量见验证记录。没有TTS、下载采样、商业音乐或历史录音。最终录音和混音仍需人工完成。

## 预览、导出与验收

在工程目录中执行：

```sh
pnpm run dev
pnpm run lint
pnpm run check:project
pnpm run check:act03
pnpm run keyframes:act03
pnpm run render:act03
python scripts/inspect-act03-media.py
```

Studio选择[Act03Demo](http://localhost:3000/Act03Demo)；四个镜头也分别注册，可独立审看。音轨若需再生成，执行`python scripts/create-act03-foley.py`。检查脚本会读取正式分镜数据核对字幕，并在当前制作机上核对前两幕保护基线。新电脑没有该本地基线时会明确输出缺失，不会假称完成哈希保护检查。

|镜头|首帧|中间帧|末帧|
|---|---|---|---|
|09|[0](keyframes/Scene09-first.png)|[180](keyframes/Scene09-middle.png)|[359](keyframes/Scene09-last.png)|
|10|[360](keyframes/Scene10-first.png)|[555](keyframes/Scene10-middle.png)|[749](keyframes/Scene10-last.png)|
|11|[750](keyframes/Scene11-first.png)|[930](keyframes/Scene11-middle.png)|[1109](keyframes/Scene11-last.png)|
|12|[1110](keyframes/Scene12-first.png)|[1305](keyframes/Scene12-middle.png)|[1499](keyframes/Scene12-last.png)|

关键帧与额外动作帧已用于检查定位、日期、笔记前后文字和分区修复。实际视频验收以验证记录为准；黑白帧低分辨率扫描不能代替艺术审片。

补充动作图：[地理定位](details/Scene09-location.png)、[历史资料与观看层](details/Scene09-history.png)、[完整理念山形](details/Scene10-mountain.png)、[笔记原稿](details/Scene11-original.png)、[修改后拉远](details/Scene11-revised.png)。

## 拼接与第四幕接手

前两幕的源码、原始PNG、声音、视频、字幕及交接文件共74项建立制作前SHA-256基线，完成后核对不变。第一、二、三幕规格一致，已具备按40＋50＋50秒顺序进行视觉粗剪的条件；本次没有输出新的140秒合片，也没有覆盖原视频。

08→09以同一`FarmSign`中心`(1248,490)`、1.02比例和矩形轮廓匹配，背景切换到资料纸面。09→10共用日期卡终态`(160,185)`与620×100矩形。10→11共用Notebook封面、位置和`NOTE_POINTS`路径。11→12共用水面色及涟漪中心`(1195,606)`。这些是构图匹配，不声称每个边界逐像素完全一致。

12→13保留第一幕的`RIDGE`及本幕`CREEK`路径，末帧背景整体左移约18px；前景人物、右侧小树和工具仍在场。第四幕制作时可从`Restoration time={389/30}`的地形终态继续增加竹林和生活空间，继承同一山脊与溪岸位置，再按正式脚本切入今日余村；不要擅自重画山脊或提前删掉养护状态。

进入第四幕前需要小组审片、真人录音及最终混音，角色花纹与笔记动作可在统一美术范围内精修。原始人物板图仍未做精细PNG骨骼分层，现有SVG可继续制作。第四幕正式镜头与全片声音验收仍待后续任务。
