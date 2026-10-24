# 红纸新生 · Remotion 工程

**最新交付：第六幕“真正的破圈”，20秒／600帧。** [视频](out/Act06Demo.mp4) · [关键帧](out/act06/storyboard.jpg) · [ACT06_GUIDE](ACT06_GUIDE.md) · [核验记录](out/act06/verification.json)。Studio选择 `Act06Demo` 或Scene21–24；运行 `npm run keyframes:act06`、`npm run render:act06`、`python scripts/verify-act06.py`。渲染端口3108，输出 `out/Act06Demo.mp4`。

第六幕沿用原人物、宣纸、剪刀和凤凰，新增市集体验、双凤城市新剪纸与片尾青绿画卷。含准确字幕、无音轨；20秒台词密度较高，声音阶段需复核节奏。现有各幕仍为独立输出，第四幕选版、第五幕源工程和音频分支整合待团队确认。

**第四幕（备选版）已收录：50秒／1500帧，1920×1080、30fps，含字幕、无音轨。** [备选版视频](out/Act04Demo-Alternate.mp4) · [23张关键帧](out/act04/keyframes) · [指南](ACT04_GUIDE.md) · [核验记录](out/act04/verification.json)。Studio选择 `Act04Alternate → Act04Demo` 或Scene13–16；运行 `npm run keyframes:act04`、`npm run render:act04`，后者输出带 `-Alternate` 的文件名，渲染端口3107。

已确认队友在 `act04` 分支上传另一份第四幕视频，并提交[PR #1](https://github.com/P1chyTT/MaoGai-video/pull/1)，尚未合并。这里的第四幕源码与输出明确为备选版；[版本关系](../docs/ACT04_VERSIONS.md)记录两版入口，原队友版本保持原样。以下为此前里程碑说明。

最新交付为第三幕 Scene08–12（60秒／1800帧，1920×1080、30fps），含电脑合作邀请、商家入场、商业价格对照、小林劝说和奶奶放下剪刀。原始人物素材、老屋、凤凰和字幕标准沿用前两幕。第三幕仍为带字幕的无声视觉Demo。

[第三幕完整视频](out/Act03Demo.mp4) · [关键帧总览](out/act03/storyboard.jpg) · [第三幕制作与复用说明](ACT03_GUIDE.md) · [核验记录](out/act03/verification.json)

Studio选择 `Act03Demo` 或 `Scene08`–`Scene12`；运行 `npm run keyframes:act03`、`npm run render:act03` 导出。第三幕使用3106渲染端口。以下保留前两幕基线说明。

现已新增第二幕 Scene04–07 动作增强版（55秒／1650帧）。[第二幕制作与复用说明](ACT02_GUIDE.md) · [最新视频](out/Act02Demo-Motion.mp4) · [关键帧总览](out/act02/storyboard.jpg)。Studio选择Act02Demo，运行 `npm run keyframes:act02` 和 `npm run render:act02` 导出第二幕。下文为第一幕基线说明。

React + TypeScript + Remotion 4.0.537 制作的彩色皮影／剪纸风格样片。1920×1080，30 fps，36秒，1080帧。无声，含完整对白字幕。

## 交付

- `out/Act01Demo.mp4`：完整视频。
- `out/keyframes/`：三个镜头首／中／末帧及凤凰完成帧。
- `out/storyboard.jpg`：九帧总览。
- `STYLE_GUIDE.md`：本次实际采用的规范、比例、组件接口。
- `QA_REPORT.md`：输出检查记录。

## 运行

需要 Node.js 20.19+（或22.13+ / 24+）；本机已安装依赖。

Windows 双击 `preview.cmd`，打开终端显示的地址，选择 `Act01Demo`。本次地址为 http://localhost:3000/Act01Demo。Studio 内可单独打开 Scene01、Scene02、Scene03。

其他环境使用：

```sh
npm install
npm run dev
npm run typecheck
npm run keyframes
npm run render
```

本机无 npm 命令，可直接用 `preview.cmd` 和 `render-demo.cmd`。重新渲染会更新项目内的 MP4。渲染器使用3101端口，避免与Studio的3000端口冲突。

## 结构与继续制作

`src/Act01Demo.tsx` 串联240、450、390帧的镜头。`src/Root.tsx` 注册总片和独立镜头。镜头在 `src/scenes/`，舞台、房间、人物、剪刀、凤凰、字幕在 `src/shared/`。

后续新增镜头：新建场景组件，用 `ShadowStage` 包裹 `OldHouseStage`，以局部帧驱动。房间机位通过 scale/shiftX/shiftY 调整；grandmaFrame 接入奶奶。将同一组件在 Root 独立注册，再加入总时间线。

四位人物PNG均为原字节副本，位于 `public/assets/characters/`。本幕只使用奶奶。此版有头部互补裁切和微旋转，没有完整手臂骨骼。未重绘、未非等比拉伸原图。

`PhoenixMotif.tsx` 保存凤凰实体和负形，`PaperReveal.tsx` 负责展开时序。改纹样后检查花枝、羽毛与外圈的连接。字幕修改 `captions.json`；后续随实际配音调整区间。

`scripts/render.mjs` 可重复输出关键帧和视频。`scripts/prepare_assets.py` 仅是首次素材准备记录，正常运行无需Python；原图、纹理和字体已保存在工程内。
