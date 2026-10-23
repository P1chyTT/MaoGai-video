# 红纸新生 · 第一幕

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
