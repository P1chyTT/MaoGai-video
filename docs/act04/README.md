# 第四幕《绿水青山变成金山银山》制作报告

更新：2026-10-31。本次仅在本地制作Scene13–Scene16，独立50秒／1500帧／1920×1080／30fps，H.264 MP4。依据为[正式Word](../视频脚本/推进生态文明建设_余村故事线视频脚本.docx)第四幕四镜与第六部分声音定稿，已完整阅读并核对[分镜数据](../视频脚本/源码/shots.json)。前三幕及其已发布视频保留，未创建第五幕镜头，也未提交或推送第四幕。

已完成四镜代码、Studio预览、视频导出与关键帧检查。当前是完整原文字幕＋原创非人声环境音版本，真人老周、小禾与旁白录音、最终混音和小组美术审片仍待完成。

## 镜头完成与时间

|镜头|内容|本幕帧区间|全片帧区间|时长|
|---|---|---|---|---:|
|Scene13|同一座山的今天|[0,360)|[4200,4560)|12秒|
|Scene14|换一种忙碌|[360,750)|[4560,4950)|13秒|
|Scene15|田里的价值|[750,1110)|[4950,5310)|12秒|
|Scene16|一条相互支撑的路|[1110,1500)|[5310,5700)|13秒|

`Act04Demo`内部从0秒开始，各镜在`Series`内使用局部时间。全片组装时整幕从140秒／第4200帧进入，不在各镜重复加140秒。转场计入规定镜长，未额外增加片头、黑场或叠化时长。视频轨恰好50秒；AAC容器可能有毫秒级填充，不增加视频帧。

- 成片：`red-paper-reborn/out/act04/Act04Demo.mp4`。
- 本幕SRT：`red-paper-reborn/out/act04/Act04Demo.srt`。
- 全片时间SRT：`red-paper-reborn/out/act04/Act04Demo-global.srt`。
- [12帧总览](overview.jpg)、[原尺寸关键帧](keyframes/)、[实际媒体验证](verification.json)。

`out/`继续被Git忽略，第四幕视频未加入此前只发布前三幕的`videos/`目录。当前本地已完成16／24镜、190秒；GitHub发布范围仍为前三幕140秒。

## 四镜实际实现

**Scene13：同一座山的今天。** 首帧直接复用第三幕`Restoration`及`SeasonTab`，固定在`time=389/30`，保留相同山脊、溪岸、人物、工具与养护状态。随后同一`RIDGE/CREEK`坐标逐步呈现今日竹林、房屋、倒影、前景溪岸与两条错相水纹；用具体图形更新场景。4–10秒横移90px。小禾先抬眼再举手机，手机画面含山、水、村庄；老周等待，维护人员通过现有腿部关节深蹲整理步道边缘，一位成人带儿童沿路线行走。末尾将手机画面中的门放大为下一镜的同一门框。

**Scene14：换一种忙碌。** 双扇木门采用平面横向缩放打开，显出木桌、接待台与房卡；旧工人模板加围裙后接待游客，另一人端菜、放到桌边，第三人将路线单交给游客。房卡、菜盘、路线单各完成一次交接。小禾拍摄忙碌的双手，老周向左让开通道。窗外青山持续可见；室内人物与餐桌按前后层次排列。末尾菜盘圆形放大并收束到宣纸舞台中央。

**Scene15：田里的价值。** 同一圆盘转换为竹编篮纹，笋干、茶叶、稻米依次入篮；拉至茶园、田块与小店并置画面，一条宣纸带承接种植、展示、消费，三种包装沿带移动。7秒后进入小店，经营者递出“余村农产品”纸袋，游客接袋，小禾持笔记录产地信息，老周扶篮。包装和田块明确为产业示意，没有价格、产量、订单数、认证或具体经营户名称。末尾纸袋叶形纹样放大接入下一镜。

**Scene16：一条相互支撑的路。** 叶形收为生态图景，山水、门店、村道及公共空间依次连接；金色细线回到生态端形成机制循环，沿线出现护林、保洁和设施维护。小禾转动手机拍摄劳动，老周与经营者招手，家庭沿安全步道行走。荣誉卡保持三行普通宣纸信息卡，主体仍是生活与劳动。末尾循环线收成手机中的路线草图，为第五幕Scene17预留入口。

## 人物、美术与复用

继续使用既有`Puppet`的现实老周与小禾，以及`Villager`三类成人。人物脸型、发型、服装基础色、肩肘铆钉与骨架比例保持；通过位置、朝向、关节角度、围裙和手持物表现职业与动作。游客复用同一风格的匿名成人，不对应真实村民。

`FamilyWalk`新增一位短身比例、侧脸、相同皮革与铆钉材质的儿童SVG，用于匿名家庭群像；没有把成人PNG缩小充当儿童。三张原始PNG均保留，未重绘、裁切或去背景。现用主要角色仍为前期SVG衍生实现，不声称已完成原PNG精细拆层。

配色沿用森林绿`#315D45`、山水青`#6A9B8B`、天空蓝`#A8C9C2`、大地棕`#8A6849`、宣纸米黄`#F2E5CB`、传统金`#C79540`、墨褐`#2D1E1B`。竹林、农舍、木桌、篮纹和包装均为二维SVG。金色用于线条与装饰，没有金币或财富统计图。

舞台、纸纹、宋体、细框与字幕直接复用前三幕。底部对白使用`Dialogue formal`：44px、左右120px、底部78px、160px宣纸渐变承托。主题条28px，荣誉卡29px三行。文字均为真实中文文本，包装文字显式取消货架继承描边，保证小字清楚。

## 代码与组件接口

工程继续位于`red-paper-reborn/`，依赖版本和锁文件未升级。

|新增文件|职责／接口|
|---|---|
|[Act04Demo.tsx](../../red-paper-reborn/src/compositions/Act04Demo.tsx)|四条`Series.Sequence`，360／390／360／390帧，均预挂载1秒|
|[Scene13–Scene16](../../red-paper-reborn/src/scenes/act04/)|四镜局部帧驱动动画及`captions.json`|
|[Act04Frame.tsx](../../red-paper-reborn/src/components/act04/Act04Frame.tsx)|`scene`必填，`label/labelOpacity`可选；正式舞台、统一字幕和按镜头裁切的环境音|
|[Valley.tsx](../../red-paper-reborn/src/components/act04/Valley.tsx)|`ValleyBackground(time)`继承同一山脊与溪岸，增加竹林、房屋、倒影和前景溪岸|
|[Props.tsx](../../red-paper-reborn/src/components/act04/Props.tsx)|`PhoneView(view,route)`、`ApronVillager`、`FamilyWalk`、`DoorPanel(open)`、房卡、路线单、菜盘、`Product(kind)`、`Basket`、`PaperBag`及货架|
|[render-act04.mjs](../../red-paper-reborn/scripts/render-act04.mjs)|视频、12张标准关键帧或`extras`动作帧导出，独立使用3115渲染端口|
|[verify-act04.mjs](../../red-paper-reborn/scripts/verify-act04.mjs)|12条字幕原文、配音窗口、时长、音轨长度和123项原有文件保护，生成两种时间轴SRT|
|[inspect-act04-media.py](../../red-paper-reborn/scripts/inspect-act04-media.py)|读取实际MP4并完整解码视频及音轨，记录规格、黑白帧、音量、哈希，复制12帧归档|
|[create-act04-foley.py](../../red-paper-reborn/scripts/create-act04-foley.py)|固定种子、Python标准库生成原创声音|

直接复用`ShadowStage`、`Dialogue`、`Puppet`、`Villager/handPoint`、`armTo`、`ArtDefs`、`Bamboo`、`Cloud`、`RIDGE`、`CREEK`、`Restoration/SeasonTab`、`OldHouseStage/OldTable`、`FarmHouse`、`Phone`、`Broom/Sapling`与`Pen`。镜头沿用共享`tween`缓动，本幕平移与道具匹配在SVG分组内控制。`Root.tsx`只新增本幕及四个独立Scene入口，包脚本只新增第四幕命令。

肩肘手部绑定沿用既有104／113单位臂骨；道具目标点交给`armTo`，`handPoint`返回世界坐标。运动由`useCurrentFrame()`、fps、缓动与确定性数学控制，没有CSS循环或渲染期随机数。

## 原文与声音

没有对应正式录音，保留声音定稿时间窗。下表为本幕秒数，全片时间加140秒。

|镜头|说话者|本幕窗口|原文|
|---|---|---|---|
|13|老周|0.6–11.4秒|如今能开窗、能看山。留住这些好风景，生活才有长久的底气。|
|14|旁白|12.6–24.3秒|山水留住游客，农家乐和民宿接起新的生意。村民的忙碌，也换了模样。|
|15|旁白|25.5–36.4秒|旅游还带动笋干、茶叶和稻米等农产品销售，让田间的收获接上新的需求。|
|16|小禾|37.4–49.4秒|原来，好生态要靠人守护；产业要用心经营，大家才能一起受益。|

全部原文分为12条字幕，保留标点。没有新增人物对白、模仿声音或TTS。

`public/assets/audio/act04-foley.wav`为本项目原创程序合成的50秒／48kHz／16bit／双声道环境音，固定种子20261103。含溪水、风、鸟鸣、门响、房卡和杯盘轻响、篮子与纸袋摩擦，以及少量原创音符组成的短句；没有拍照快门连响、下载采样、商业音乐或未经授权的人声交谈。源峰值约−21.51dBFS，场景音量0.8，成片测量见验证记录。正式录音与混音待后续完成。

## 荣誉信息与采用时间

荣誉卡内容沿用正式稿：“2021年12月｜余村入选联合国世界旅游组织首批‘最佳旅游乡村’。”采用当时机构名称，分三行排字；不仿造奖状、奖章或奖杯。

Word画面描述写9–13秒收束到荣誉卡，同时屏幕字段、声音定稿和MG规范明确要求5–13秒显示并保留8秒阅读。本实现按后者：4.6–5秒展开，5–13秒完整停留，9秒后继续保持人物和生活场景为主体。

本次重新核对[S5：文化和旅游部2021年12月2日公告](https://www.mct.gov.cn/whzx/whyw/202112/t20211202_929544.htm)及[S6：国家发展改革委余村农旅商品资料](https://www.ndrc.gov.cn/fggz/nyncjj/xczx/202112/t20211224_1309189.html)。脚本与任务的对白、日期和荣誉名称一致；完整来源及边界继续见[史实与参考资料](../史实与参考资料.md)。

## 运行、检查和导出

```sh
pnpm run dev
pnpm run lint
pnpm run check:project
pnpm run check:act04
pnpm run keyframes:act04
pnpm run render:act04
python scripts/inspect-act04-media.py
```

在工程根`red-paper-reborn/`执行，Studio选择[Act04Demo](http://localhost:3000/Act04Demo)；Scene13–16也可独立预览。重建环境音用`python scripts/create-act04-foley.py`。视频校验使用Remotion自带或系统FFmpeg／FFprobe。

|镜头|首帧|中间帧|末帧|
|---|---|---|---|
|13|[0](keyframes/Scene13-first.png)|[180](keyframes/Scene13-middle.png)|[359](keyframes/Scene13-last.png)|
|14|[360](keyframes/Scene14-first.png)|[555](keyframes/Scene14-middle.png)|[749](keyframes/Scene14-last.png)|
|15|[750](keyframes/Scene15-first.png)|[930](keyframes/Scene15-middle.png)|[1109](keyframes/Scene15-last.png)|
|16|[1110](keyframes/Scene16-first.png)|[1305](keyframes/Scene16-middle.png)|[1499](keyframes/Scene16-last.png)|

首中末图和额外动作帧用于核查道具遮挡、人物脚下位置、转场、中文与荣誉卡。本次修正了溪岸前景、端盘与路线单层次、包装继承描边和货架遮挡；实际视频完整解码结果见验证记录，低分辨率黑白帧扫描不能代替最终艺术审片。

动作参考：[步道维护](details/Scene13-maintenance.png)、[接待与经营](details/Scene14-reception.png)、[农旅纸带](details/Scene15-ribbon.png)、[纸袋交接](details/Scene15-handoff.png)、[荣誉卡及生活场景](details/Scene16-honor.png)、[第五幕路线入口](details/Scene16-route.png)。

## 拼接与下一步

Scene12→13首帧复用第三幕末帧原组件和`389/30`时间，山脊、溪岸、季节页签、人物与工具坐标对齐。13→14共用闭合`DoorPanel`；14→15共用圆盘中心`(960,550)`、半径270；15→16共用袋上叶形中心约`(1185,640)`及最大40倍尺寸。16末尾路线图收进手机，终态约`(960,650)`、1.8比例，可供Scene17继续。

前三幕源码、素材、成片、字幕、关键帧及已经发布的`videos/`文件共123项建立制作前SHA-256基线，完成后核对不变。前三幕仍为已发布140秒，本地加第四幕后具备190秒／5700帧视觉粗剪条件；本次未导出新的190秒合片。

第五幕制作前应先审看本幕并统筹真人录音、最终混音和人物纹样精修。继续使用正式Word及角色库；手机路线草图、同源山水和经营道具可复用。第五幕Scene17–20与第六幕Scene21–24仍待制作，共110秒。
