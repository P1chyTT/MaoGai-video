# 《红纸新生》｜皮影戏 MG 动画协作仓库

**进度(2026年10月23日23点54分)**：添加scenes I语音。——EH.

**进度（2026-10-23）：第二幕 Scene04–07 动作增强版已完成，55秒／1650帧。** 小林增加点头、前倾、前臂手势和随手移动的手机，奶奶增加停剪后的抬头与回应。当前仍为无声视觉Demo，待团队审片；第一幕基线继续保留。

[观看／下载第二幕动作增强版](red-paper-reborn/out/Act02Demo-Motion.mp4) · [第二幕制作与复用说明](red-paper-reborn/ACT02_GUIDE.md) · [前一版视频对照](red-paper-reborn/out/act02/Act02Demo-before-motion.mp4)

![第二幕动作增强版关键帧](red-paper-reborn/out/act02/storyboard.jpg)

以传统彩色皮影、剪纸和宣纸幕布为视觉标准，使用 React + TypeScript + Remotion 制作非遗剪纸文化传承短片。

**第一幕基线（2026-10-21）：前三镜视觉 Demo 已完成；全片尚未完成。** 第一幕样片长36秒、1920×1080、30 fps、1080帧，含对白字幕，暂无配音、音效和配乐。该版本可供分镜、美术、动画和声音成员接续制作，视觉规范待团队审阅确认。

![第一幕九帧总览](red-paper-reborn/out/storyboard.jpg)

## 先看这些

|内容|位置|
|---|---|
|55秒第二幕动作增强版|[观看／下载 Act02Demo-Motion.mp4](red-paper-reborn/out/Act02Demo-Motion.mp4)|
|第二幕关键帧与参数核验|[关键帧](red-paper-reborn/out/act02/keyframes) · [检查记录](red-paper-reborn/out/act02/verification.json)|
|36秒 MP4 样片|[观看／下载 Act01Demo.mp4](red-paper-reborn/out/Act01Demo.mp4)|
|三个镜头首、中、末帧|[关键帧目录](red-paper-reborn/out/keyframes)|
|实际输出与检查结果|[QA_REPORT](red-paper-reborn/QA_REPORT.md) · [参数记录](red-paper-reborn/out/verification.json)|
|项目进度、已知限制、待办|[PROGRESS](PROGRESS.md)|
|配色、比例、纹理、阴影、机位、组件接口|[STYLE_GUIDE](red-paper-reborn/STYLE_GUIDE.md)|
|队友安装、预览、导出、接手流程|[接手指南](docs/HANDOFF.md)|
|分镜范围与后续任务|[制作分工建议](docs/PRODUCTION_PLAN.md)|
|完整故事脚本原稿|[在线阅读](docs/script/SCRIPT.md) · [Word原稿](docs/script/视频脚本_原稿.docx)|
|提交与验收规范|[CONTRIBUTING](CONTRIBUTING.md)|

## 在新电脑上运行

需要 Node.js 20.19+、22.13+ 或24+，首次安装和首次下载渲染浏览器需要联网。

```sh
git clone https://github.com/P1chyTT/MaoGai-video.git
cd MaoGai-video/red-paper-reborn
npm install
npm run dev
```

打开终端显示的本地地址，选择 **Act01Demo** 或 **Act02Demo**；也可独立打开 Scene01–Scene07。

```sh
npm run lint       # 代码规范 + TypeScript
npm run keyframes  # 首／中／末帧与凤凰完成帧
npm run render     # 输出 out/Act01Demo.mp4
npm run keyframes:act02  # 第二幕关键帧
npm run render:act02     # 输出 out/Act02Demo.mp4
```

已有依赖的 Windows 电脑也可运行工程内 `preview.cmd`、`render-demo.cmd`（后者导出第一幕）。第一幕渲染使用3101端口，第二幕使用3103端口，与Studio分开；运行前保证相应端口可用。

## 工程结构

```text
red-paper-reborn/
  src/
    Act01Demo.tsx           # 240 + 450 + 390 帧的连续时间线
    Act02Demo.tsx           # 360 + 420 + 420 + 450 帧的第二幕
    Root.tsx                # 总片及独立镜头注册
    scenes/                 # 七个镜头
    act02/                  # 第二幕动作参数、小林、手机和字幕
    shared/                 # 舞台、房间、原图人物、剪刀、凤凰、字幕
  public/assets/
    characters/             # 四位原始角色PNG及校验清单
    backgrounds/            # 固定宣纸纹理
    fonts/                  # 可分发宋体与许可
  scripts/                  # 渲染、关键帧、输出核验
  out/                      # 本里程碑样片、关键帧、检查数据
docs/                       # 接手与分工说明
```

第一幕只使用奶奶，四位角色素材已保留。人物未重画；本版为轻微头部动作、坐姿裁切和独立剪刀，没有完整手臂骨骼。凤凰为代码编写的SVG，纹样和展开时序可分别修改。

请先阅读美术规范再制作下一镜。后续镜头复用共享房间和世界坐标；所有动作按帧驱动。原始脚本中的整幕时长与本次36秒样片范围不完全相同，后续总片时间线需在分镜定稿后确认，不直接沿用旧时码。

## 仓库收录范围

保留源代码、依赖锁定文件、角色／纹理、字体许可、MP4、关键帧和协作说明。依赖目录、浏览器缓存、临时渲染包、本机路径和本地交付ZIP不提交。工程及用户提供的角色素材未另行授予开源使用许可；字体按其随附许可使用。
