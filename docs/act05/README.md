# 第五幕《新时代的接力》制作报告

更新：2026-10-31。依据正式[Word视频脚本](../视频脚本/推进生态文明建设_余村故事线视频脚本.docx)第五幕四镜和第六部分声音定稿制作，逐项核对[shots.json](../视频脚本/源码/shots.json)。Scene17–Scene20均已完成代码、Studio实际播放、关键帧检查及独立MP4导出。本次仅本地制作，未提交、推送或合并；第六幕尚未制作。

当前为准确原文字幕＋原创非人声环境音版本。老周、小禾、旁白的正式录音、自然轻笑及最终混音待后续录制，未用TTS或旧项目配音代替。

## 成片与时间轴

- 视频：[Act05Demo.mp4](../../red-paper-reborn/out/act05/Act05Demo.mp4)，1920×1080、30fps、1800帧、H.264／yuv420p／BT.709，约11.11MiB。
- 视频轨恰好60.000秒；AAC音轨及容器为60.011秒，末尾为正常编码填充，不增加视频帧。
- [本幕字幕](../../red-paper-reborn/out/act05/Act05Demo.srt)／[全片时间字幕](../../red-paper-reborn/out/act05/Act05Demo-global.srt)。
- [12帧总览](overview.jpg)／[原尺寸关键帧](keyframes/)／[实际媒体验证](verification.json)。
- [Studio预览](http://localhost:3000/Act05Demo)，四个独立Scene也已注册。

|镜头|名称|本幕帧区间|全片帧区间|时长|
|---|---|---|---|---:|
|Scene17|把计划改成行动|[0,450)|[5700,6150)|15秒|
|Scene18|镜头对准劳动|[450,900)|[6150,6600)|15秒|
|Scene19|热度之外的分寸|[900,1350)|[6600,7050)|15秒|
|Scene20|两代人一起拍|[1350,1800)|[7050,7500)|15秒|

幕内从0秒开始，镜头使用局部秒数。全片拼接时仅在Act05整幕外加190秒／5700帧，不在各镜重复偏移；所有转场计入四镜规定时长。本地前五幕分别40／50／50／50／60秒，共250秒／7500帧，本次未导出新的250秒合片。GitHub目前仍只发布前三幕140秒。

## 镜头完成情况

**Scene17已完成。** 开场冻结复用Scene16第389帧，使手机路线接入宣纸笔记俯拍；“热门打卡”实际划线，再显出“山水与生活”。三条清单使用独立SVG遮罩书写并依次打勾，路线沿SVG路径绘制；“绿色出游步行路线”和“课程创作示意”采用真正中文文本。拉远后小禾由长凳起身、合本再展开示意，老周点头并递旧图。手机随后转为横向取景并放大至下一镜。

**Scene18已完成。** 三个固定取景各5秒，依次表现溪岸保洁、整理客房布品、核对货架产地标签。每段先有小禾示意和村民点头，再进行一次主要手部动作；没有新增采访对白或具名村民。收集袋只接少量纸屑，没有污染堆积。使用同一取景四角、小型红色录制点及“课程拍摄”标记，左上持续说明“小禾的课程拍摄｜虚构情节”。末段缩为农产品素材缩略图。

**Scene19已完成。** 斜侧电脑及爷孙中景轻推，标题从“最火打卡”清空再输入“山水与生活”。自绘三轨界面展示山水、劳动和经营缩略图；鼠标移动并拖动提示卡，老周指向屏幕后补齐最后一项。“沿既有步道行走”“垃圾随身带走”“不进入养护区域”分别在约4.7／6.55／8.4秒完全出现，至14秒转场至少保留5.6秒阅读时间。点击“预览”后山水、劳动与提示并置；没有真实平台标志、上传成功、播放量或点赞数字。最后用预览山形匹配下一镜。

**Scene20已完成。** 老周先持倒置旧图，1.3–3.4秒围绕抓握点转正，小禾伸手相助并微笑。图纸独立成层，转动中心为左手点`(548,562)`，不脱离手部；人物绘于纸前方，转动时不遮脸。转正后的旧图内部按世界坐标裁取原`MountainScene`，与今日山脊使用同一条`RIDGE`及`translate(-18,130)`，纸边两侧轮廓对应。小禾退半步、微抬手机录制；三名路人按2＋1分两批经过。10秒后移近回看、点头微笑与微转头望山；镜头拉远6%，13秒后保持构图，纸张末尾仅有不超过0.5度轻摆。

“爷孙”关系、职业示意、对白和屏幕用语与正式稿一致。路线是课程创作，人物拍摄与合作情节为虚构，不冒充官方导览或真实采访。

## 人物与视觉规范

沿用前四幕`Puppet`的小禾、现实老周和`Villager`三类匿名成人。脸型、马尾和红发饰、帽子和须发、绿色／棕色服装、皮革纹理、镂空装饰、铆钉及头身比例保持。职业通过围裙、布品、袋与标签区分，没有新设计具名人物。不同景别通过整个人物等比缩放变化。

小禾起身将既有SVG腿部区域裁取后绕髋、膝旋转，身体与四肢仍取自同一人物组件；不是拉伸PNG。Scene20老周前臂角度固定，小禾上臂变化8度、前臂变化10度，均在12度内。手持物复用`armTo`与`handPoint`坐标约定。

三张原始PNG完整保留；现用人物仍是前期SVG衍生实现，未声称已完成原PNG的精细骨骼拆层。真人配音和人物纹样精修仍需小组审定。

舞台、纸纹、阴影与底部`Dialogue formal`字幕直接复用前四幕：44px宋体、左右120px、底部78px、160px宣纸渐变承托。配色沿用森林绿`#315D45`、山水青`#6A9B8B`、天空蓝`#A8C9C2`、大地棕`#8A6849`、宣纸米黄`#F2E5CB`、金`#C79540`、墨褐`#2D1E1B`。没有全屏色调滤镜或随机粒子。

## 新增代码与复用接口

工程继续位于`red-paper-reborn/`，依赖及锁文件不升级。

|文件|职责与接口|
|---|---|
|[Act05Demo.tsx](../../red-paper-reborn/src/compositions/Act05Demo.tsx)|四个独立`Series.Sequence`，各`15*fps`，同一组件注册独立Scene|
|[Scene17.tsx](../../red-paper-reborn/src/scenes/act05/Scene17.tsx)、[Scene18.tsx](../../red-paper-reborn/src/scenes/act05/Scene18.tsx)、[Scene19.tsx](../../red-paper-reborn/src/scenes/act05/Scene19.tsx)、[Scene20.tsx](../../red-paper-reborn/src/scenes/act05/Scene20.tsx)|四镜动作、镜头与转场的局部时间控制|
|[Act05Frame.tsx](../../red-paper-reborn/src/components/act05/Act05Frame.tsx)|`scene/label/labelOpacity`；共享舞台、虚构标记、字幕和分镜音轨裁切|
|[Props.tsx](../../red-paper-reborn/src/components/act05/Props.tsx)|`PlanBook(time,open)`、`RouteSketch(progress)`、`FilmingPhone(x,y,scale,view)`、`Viewfinder(recording)`、`GreenTips(time)`、`CollectionBag`、`MousePointer`、`AlignedLandscape(time)`、`MatchedOldPrint(angle)`|
|[Labor.tsx](../../red-paper-reborn/src/components/act05/Labor.tsx)|`LaborView(kind=0/1/2,time,frame)`三类固定机位劳动，可复用于剪辑缩略图|
|[Editor.tsx](../../red-paper-reborn/src/components/act05/Editor.tsx)|`Editor(time)`自绘三轨、标题修改、拖卡和预览|
|[captions.json](../../red-paper-reborn/src/scenes/act05/captions.json)|16条Caption结构JSON，保持正式原文、标点和录音窗口|
|[render-act05.mjs](../../red-paper-reborn/scripts/render-act05.mjs)|`frames/extras/video`；独立3116端口，H.264 CRF19导出|
|[verify-act05.mjs](../../red-paper-reborn/scripts/verify-act05.mjs)|正式稿台词、帧数、音轨、162项前四幕保护及两种SRT|
|[inspect-act05-media.py](../../red-paper-reborn/scripts/inspect-act05-media.py)|实际MP4完整解码、规格、黑白帧扫描、音量、衔接图像和SHA-256|
|[create-act05-foley.py](../../red-paper-reborn/scripts/create-act05-foley.py)|固定种子生成原创非人声音轨|

复用组件包括`ShadowStage`、`Dialogue`、`Puppet/Hand`、`Villager/handPoint`、`armTo/Pen`、`Phone/PhoneView`、`Bench`、`OldHouseStage/OldPrint`、`ValleyBackground`、`SalesShelf/ApronVillager`及`ArtDefs/MountainScene/RIDGE`。镜头和动作由`useCurrentFrame()`、fps及共享`tween`控制。新SVG主要为笔记清单、路线、横向手机取景、收集袋、客房床与布品、提示卡和简化电脑界面。

## 配音窗口与声音状态

以下为本幕秒数，全片时间加190秒。字幕按完整原文分成16句，未新增台词。

|镜头|说话者|本幕窗口|原文|
|---|---|---|---|
|17|小禾|0.8–13.8|我想换个拍法：拍风景，也拍守护它的人。再做条步行路线，让来的人懂得珍惜。|
|18|旁白|15.8–28.9|她把镜头对准普通人的双手。有人守护溪岸，有人接待游客，也有人把农产品送到顾客手中。|
|19|小禾|30.7–43.8|热闹也得有分寸。沿步道走，垃圾带走，不打扰生活。让大家喜欢这里，也一起护好这里。|
|20|老周|45.8–51.3|你们肯接着干，这山水就有人惦记。|
|20|小禾|52.0–58.8|爷爷，您留下的故事，我接着拍，也接着做。|

`public/assets/audio/act05-foley.wav`为60秒／48kHz／16bit双声道原创程序合成音轨，固定种子20261104。含风、水、鸟鸣、纸笔与布品摩擦、轻木鱼和按键／确认音及少量原创旋律；溪边计划、溪岸劳动和最后合作场景均保留流水底声。没有下载采样、商业音乐、人声模仿或付费API。源峰值约−23.63dBFS，播放音量0.8；编码后音量见验证记录，待正式录音时统一混音。

## 运行、检查与验收

在`red-paper-reborn/`执行：

```sh
pnpm run dev
pnpm run lint
pnpm run check:project
pnpm run check:act05
pnpm run keyframes:act05
pnpm run render:act05
python scripts/inspect-act05-media.py
```

Studio实际点击播放后由第300帧推进至第510帧，检查无错误覆盖层，并定位第1485帧审看转正后的旧图。关键帧检查和修正包含重复手臂、手机取景透明底、纸张旋转遮脸、动作目标可达范围以及包装／提示文字。最终视频1800帧及完整音轨解码通过；160×90灰度扫描未检出整帧黑屏或白闪。此扫描不代替小组最终艺术审片。

Scene16末帧与Scene17首帧复用相同源码和坐标，RGB平均差约0.0695／255；约0.2243%的像素差超过8，包含嵌套舞台边缘抗锯齿差异，不能称为逐像素一致。完整测量、文件哈希及音轨规格见[验证记录](verification.json)。

|镜头|首帧|中间帧|末帧|
|---|---|---|---|
|17|[0](keyframes/Scene17-first.png)|[225](keyframes/Scene17-middle.png)|[449](keyframes/Scene17-last.png)|
|18|[450](keyframes/Scene18-first.png)|[675](keyframes/Scene18-middle.png)|[899](keyframes/Scene18-last.png)|
|19|[900](keyframes/Scene19-first.png)|[1125](keyframes/Scene19-middle.png)|[1349](keyframes/Scene19-last.png)|
|20|[1350](keyframes/Scene20-first.png)|[1575](keyframes/Scene20-middle.png)|[1799](keyframes/Scene20-last.png)|

最终MP4动作参考：[旧图交接](details/Scene17-handoff.png)、[保洁](details/Scene18-cleanup.png)、[布品](details/Scene18-linen.png)、[标签](details/Scene18-labels.png)、[完整提示](details/Scene19-tips.png)、[拿反](details/Scene20-upside-down.png)、[转动](details/Scene20-turning.png)、[转正](details/Scene20-corrected.png)、[最后构图](details/Scene20-final.png)。

## 第六幕交接

第五幕具备与前四幕视觉拼接的条件。前四幕源码、原图、环境音、视频、字幕、关键帧及已发布`videos/`共162项在本次制作前建立SHA-256基线，结束后全部不变。当前分支仍为`project/shanhe-youyue`，没有操作旧归档、主分支或其他成员提交。

Scene17从第四幕手机路线切入；Scene17→18的横向屏幕为169×95.0625，放至`1920/169`后对应全画幅；18→19共用`translate(1160,672) scale(.18)`素材缩略图；19→20复用`AlignedLandscape`。

Scene21应从Scene20相同纸边与山脊进入：旧图`PRINT={x:510,y:400,width:500,height:260}`，世界抓握点`(548,562)`；结束镜头围绕`(960,550)`缩至0.94，最后纸角为`sin(t*1.3)*0.5`度。继续使用同一`MatchedOldPrint`，再展开为新旧山水并置。不要重新生成山形或人物。

进入第六幕前需小组审看人物动作和纹样，准备正式旁白及爷孙录音，统一五幕音量与音乐并复查接镜。Scene21–24共50秒仍待制作，完整300秒成片、正式配音和最终混音尚未完成。
