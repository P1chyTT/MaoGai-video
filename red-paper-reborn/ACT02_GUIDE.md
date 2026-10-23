# 第二幕：小林的“金点子”

2026-10-23。本幕为独立55秒／1650帧合成，1920×1080、30fps。原始全片时码为00:45–01:40；本工程第一幕Demo是36秒，本次不擅自补9秒或改第一幕。

## 预览与输出

Studio选择 `Act02Demo` 连续播放，或独立选择 `Scene04`、`Scene05`、`Scene06`、`Scene07`。入口仍为原 `src/index.ts`。

```sh
node scripts/render-act02.mjs frames
node scripts/render-act02.mjs video
```

视频保存为 `out/Act02Demo.mp4`。关键帧在 `out/act02/keyframes/`，十二帧总览为 `out/act02/storyboard.jpg`。渲染使用3103端口；预览通常为3000端口，以终端显示为准。

本里程碑的 `out/Act02Demo-Motion.mp4` 是动作增强版的明确命名副本，与 `Act02Demo.mp4` 内容一致；渲染脚本会同步更新二者。前版 `out/act02/Act02Demo-before-motion.mp4` 保留用于对照，不是当前交付版本。可直接通过 `npm run keyframes:act02`、`npm run render:act02` 运行上述命令。

|镜头|第二幕全局帧|帧数|原稿时码|
|---|---|---|---|
|Scene04|0–359|360|00:45–00:57|
|Scene05|360–779|420|00:57–01:11|
|Scene06|780–1199|420|01:11–01:25|
|Scene07|1200–1649|450|01:25–01:40|

## 新增代码

- `src/Act02Demo.tsx`：四个相邻的Series.Sequence，不重叠消耗帧数。
- `src/scenes/Scene04.tsx` 至 `Scene07.tsx`：各镜头入口、主题字幕及对白。
- `src/act02/Act02Stage.tsx`：复用房间、人物和手机的同一世界坐标，组织特写与双人中景。
- `src/act02/XiaolinPuppet.tsx`：原始小林PNG等比600×900，面向左，与奶奶对位；入场、轻倾身与小幅姿态变化。
- `src/act02/PhoneFrame.tsx`：墨褐／金色手机边框、可裁切滚动卡片、灯笼／凤凰／衣饰缩略图及无品牌浏览量符号。SVG标识按实例唯一。
- `src/act02/captions.json`：四镜完整对白，采用现有Caption数据结构；时间为无配音情况下的阅读预排。
- `scripts/render-act02.mjs`：批量关键帧和整幕导出。

## 复用与保护

继续复用 `ShadowStage`、`OldHouseStage`、`PuppetCharacter`、`ScissorAnimation`、`PhoenixMotif`、`Dialogue`、字体加载与styleTokens。不新增美术色系、不替换PNG、不升级依赖。

OldHouseStage新增可选 `puppetFrame`、`toolFrame`、`puppetHeadAngle`、`puppetBodyAngle` 参数，将头部、身体和剪刀控制分开。前两个默认等于原grandmaFrame，后两个未传时沿用原人物动作，保持第一幕调用行为。Scene01–03源文件未改动，Act01Demo注册与1080帧基准保留。

手机和人物共同置于镜头变换中；Scene04末帧和Scene05首帧衔接同一手机坐标。Scene05回到双人中景后接Scene06；Scene07最后轻微拉远，不加黑屏或片尾。主题字幕位于上方宣纸条，对白继续使用底部36px仿宋。

## 本次验证

ESLint和TypeScript通过。已审查四镜首、中、末帧及5个额外动作帧；整段MP4完整解码1650帧，55.000秒，无全黑／全白异常帧。四镜对白拼接后与需求原句完全一致，奶奶与小林PNG匹配原素材SHA-256。第一幕Scene01–03源文件保持原样，第一幕全局465帧重新渲染后与既有PNG逐像素一致。数据见 `out/act02/verification.json`。

重新核验：安装Python和Pillow后运行 `python scripts/verify-act02.py`。Windows读取Remotion自带ffmpeg／ffprobe，macOS／Linux需在PATH中提供ffmpeg／ffprobe。该检查核对默认MP4、台词和素材校验值；第一幕逐像素回归为另行进行的检查。自动CI会做代码检查及第一、二幕的后备字体单帧渲染，整段视频的本次解码结果随仓库提供。

## 动作范围与后续工作

动作增强版在同一小林PNG上新增互补头部、左右前臂裁切：以原铆钉附近 `(309,540)` 和 `(678,540)` 为前臂旋转中心，头部转轴 `(475,300)`。原图仍未改绘或拉伸，没有全身骨骼、逐指握持或口型。

镜头04有入场停步、疑问点头、抬手机；镜头05有抬头和展示手机；镜头06收回手势与放低手机；镜头07有前倾、两次强调手势、轻微摇头及末尾收势。手机位置用同一肘部／身体变换计算，跟随手掌，而非独立漂浮。运动参数集中在 `src/act02/characterMotion.ts`。

奶奶增加停剪后的微抬头、轻倾身和回应点头，保持温和坚定。共享组件新增可选headAngle／bodyAngle参数，未传时仍采用第一幕原来的动作。上一版视频保留在 `out/act02/Act02Demo-before-motion.mp4`。

开头用凤凰完成状态的同场景拉远与短叠化回到老屋；由于第一幕桌面采用二维插入特写，本版不是单一三维摄影机从俯视连续旋转回中景。

手机浏览数字为叙事示意，非真实数据。本地没有配音、音效与背景音乐，本版无声；声音可下一阶段接入，不调用付费生成API。
