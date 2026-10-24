# 队友接手指南

## 1. 先确认当前基线

先看仓库首页的第一幕36秒样片、第二幕55秒动作增强版、第三幕60秒样片及对应关键帧，再读 [项目进度](../PROGRESS.md)、[美术规范](../red-paper-reborn/STYLE_GUIDE.md)、[第二幕指南](../red-paper-reborn/ACT02_GUIDE.md)、[第三幕指南](../red-paper-reborn/ACT03_GUIDE.md) 和 [第四幕备选版指南](../red-paper-reborn/ACT04_GUIDE.md)。Scene01–12已有无声视觉Demo；本地Scene13–16的50秒、1500帧代码动画、23张关键帧和视频也已完成，现按“第四幕（备选版）”单独上传，不替代队友的第四幕交付。

本次核对发现两个第四幕版本，接手时请并列审阅：

|版本|来源和入口|已确认范围|
|---|---|---|
|队友第四幕|[`act04`分支](https://github.com/P1chyTT/MaoGai-video/tree/act04)、[PR #1](https://github.com/P1chyTT/MaoGai-video/pull/1)|作者september-5，提交[`85afac95449fef9dfe8b212fd1949d18d3957424`](https://github.com/P1chyTT/MaoGai-video/commit/85afac95449fef9dfe8b212fd1949d18d3957424)；本次核对时PR开放、未合并，变更仅新增仓库根目录`Act04Demo.mp4`，19,558,330字节；内容、声音和可复用源码交接待审阅确认|
|第四幕（备选版）|本地代码工程，本次上传目标为`master`；视频路径`red-paper-reborn/out/Act04Demo-Alternate.mp4`|50秒、1500帧，含字幕、无音轨；`src/act04/`、Scene13–16、23张关键帧和制作指南一并交接，导出及完整解码检查已完成，团队审片待确认|

两个版本尚未选为整片定稿；此次不合并PR #1，也不改动队友分支或覆盖其根目录视频。完整入口和核查记录见[第四幕版本关系](ACT04_VERSIONS.md)。另已发现[`act05`分支](https://github.com/P1chyTT/MaoGai-video/tree/act05)和[PR #2](https://github.com/P1chyTT/MaoGai-video/pull/2)的视频交付，待审片并确认源码、声音与衔接，不能再将第五幕整体标为“尚未制作”。

前三幕151秒加本地第四幕备选版50秒，顺接参考为201秒；这不是全片定稿时长，也不包含对队友版本时长的推断。不要为下一镜另绘一套看似相同的老屋。

## 2. 安装和预览

安装 Node.js 22.13+ 或24+。克隆仓库后进入 `red-paper-reborn`：

```sh
npm install
npm run dev
```

也可用锁定版本的 pnpm 安装：

```sh
pnpm install --frozen-lockfile --config.node-linker=hoisted
pnpm run dev
```

在Studio选择Act01Demo、Act02Demo、Act03Demo或独立Scene01–Scene12；第四幕备选版放在`Act04Alternate`文件夹，技术合成ID仍为`Act04Demo`，并保留独立Scene13–Scene16，以兼容既有预览链接和导出命令。技术ID不表示已选为第四幕定稿。Studio通常在3000端口，若被占用以终端显示地址为准；确认画面和时间线可播放。

字体已提供可分发的思源宋体后备，无需访问原作者电脑；本机可选仿宋不上传。不要把自己的绝对路径、账号、缓存或系统字体提交到仓库。

## 3. 从哪改起

|工作|主要文件|接手要求|
|---|---|---|
|整体色彩与缓动|`src/shared/styleTokens.ts`|改动会影响所有镜头，应作为统一美术变更审片|
|宣纸与边框|`ShadowStage.tsx`|保持16:9、安全区与细纹理|
|房间、桌窗、光源|`OldHouseStage.tsx`|沿用世界坐标，光从右上进入|
|人物|`PuppetCharacter.tsx`|原图等比、原铆钉转轴；不拉伸整图模拟弯臂|
|小林头部、前臂与手机动作|`src/act02/characterMotion.ts`、`XiaolinPuppet.tsx`|局部帧驱动，手机使用同一转轴计算随手位移|
|第三幕三人场景与商业道具|`src/act03/Act03Stage.tsx`、`ComputerDesk.tsx`、`MerchantPuppet.tsx`、`BusinessProps.tsx`|复用同屋坐标和原图；第三幕可选角色／道具参数不改变前两幕默认行为|
|第四幕备选版工作桌、蒙太奇与反馈|`src/act04/WorkDesk.tsx`、`Act04Stage.tsx`、`Montage.tsx`、`FeedbackScreen.tsx`、`ProductProps.tsx`、`HandmadeVsPrinted.tsx`|与队友版本并列保留；原PNG关节动作、真实中文评论、同色印花与精细镂空对照，详见ACT04_GUIDE|
|剪刀|`ScissorAnimation.tsx`|保留克制的开合与停顿|
|凤凰图案|`PhoenixMotif.tsx`|实体与负形分离，检查纸张连接|
|展开时序|`PaperReveal.tsx`|按局部帧改变遮罩，不拆成粒子|
|字幕文案与时间|`captions.json`|台词以定稿脚本为准，录音后微调|
|新镜头|`src/scenes/`|一个镜头一个组件，并在Root独立注册|
|总时间线|`Act01Demo.tsx`–`Act04Demo.tsx`、`Root.tsx`|保留36秒、55秒、60秒及备选版50秒独立里程碑；前三幕加第四幕备选版参考201秒，整片另行定稿合成|

## 4. 新镜头最小骨架

```tsx
import {useCurrentFrame} from 'remotion';
import {ShadowStage} from '../shared/ShadowStage';
import {OldHouseStage} from '../shared/OldHouseStage';

export const Scene17 = () => {
  const frame = useCurrentFrame();
  return (
    <ShadowStage>
      <OldHouseStage
        frame={frame}
        scale={1.045}
      />
      {/* 按第五幕已确认分镜增加人物、递剪刀动作和字幕；均由局部帧驱动。 */}
    </ShadowStage>
  );
};
```

这只是后续Scene17开发的空舞台示例，不是已实现的Scene17源码，也不代表第五幕尚无产出；开始前先审阅`act05`／PR #2并确认可接手的工程，避免重复制作。示例的`frame`是局部帧，环境连续时间和总片时码由已定稿分镜另行指定，不直接套用原稿时间。将后续镜头以1920×1080／30fps独立注册，再加入对应幕或总片合成，不覆盖已有Scene01–16或队友分支内容。保留Act01Demo的1080帧、Act02Demo的1650帧、Act03Demo的1800帧以及第四幕备选版1500帧基准。

## 5. 做完如何交接

1. 运行 `npm run lint`。
2. 在Studio播放新镜头及其前后衔接。
3. 输出首、中、末帧；涉及动作时再输出关键动作帧。
4. 新镜头需通过独立合成的导出检查；改变前三镜时运行 `npm run keyframes` 与 `npm run render`。
5. 修改共享组件会影响旧镜头，必须重看第一幕0／239／240／689／690／1079帧及第二、三幕、第四幕备选版各镜首／中／末帧，确认无遮挡和素材跳变。第三幕当前只对第一幕465帧和第二幕1425帧做过逐像素回归，不代表旧幕全部逐帧检查。第四幕备选版没有修改此前Scene01–12和共享组件，也未声称重新渲染全部旧幕。
6. 更新PROGRESS中的完成项、待办、负责人和已知限制；视觉规则有变化时同步STYLE_GUIDE。
7. 提交时附预览图、帧数、检查结果和待确认点；有并列版本时明确分支、PR、资产路径和版本用途，不自行覆盖、合并或判定优先级。详见CONTRIBUTING。

## 6. 输出与自动检查

`npm run keyframes` 和 `npm run render` 导出第一幕；`npm run keyframes:act02` 和 `npm run render:act02` 导出第二幕；`npm run keyframes:act03` 和 `npm run render:act03` 导出第三幕。第四幕备选版继续使用`npm run keyframes:act04`、`npm run render:act04`，命令名与技术ID保持兼容。交付视频为`red-paper-reborn/out/Act04Demo-Alternate.mp4`；代码在`red-paper-reborn/src/act04/`，23张关键帧及总览在`red-paper-reborn/out/act04/`。这些路径与队友`act04`分支根目录的`Act04Demo.mp4`分开。

第二、三幕细节见 [ACT02_GUIDE](../red-paper-reborn/ACT02_GUIDE.md) 和 [ACT03_GUIDE](../red-paper-reborn/ACT03_GUIDE.md)，第四幕备选版见 [ACT04_GUIDE](../red-paper-reborn/ACT04_GUIDE.md)。首次导出会下载Remotion使用的浏览器，不依赖付费视频／语音API。

第三幕导出后运行 `python scripts/verify-act03.py`：检查1920×1080、30fps、60秒、1800帧全解码、黑白候选帧、逐镜台词、字幕时间及奶奶／小林／商家素材哈希，并生成 `out/act03/verification.json` 和15帧 `storyboard.jpg`。该脚本使用已有Pillow；Windows可用Remotion自带解码工具，其他系统需ffmpeg／ffprobe。现有第三幕记录为通过，重新导出后必须重新检查；机器检查不能替代人工审片。

第四幕备选版导出后运行`python scripts/verify-act04.py`，检查1920×1080、30fps、50秒、1500帧全解码、黑白候选帧、台词与字幕区间、三条评论和原PNG哈希；报告在`out/act04/verification.json`。已按`Act04Demo-Alternate.mp4`新文件名重跑并通过，23张关键帧包含12张首／中／末帧和11张附加动作帧。此结果只适用于本地备选版，不代表队友视频或整片已经通过审片。

当前第一至三幕和第四幕备选版均为含字幕的无声视觉Demo，第四幕备选版无音轨，尚无正式配音、音效和音乐。队友第四、第五幕视频的声音状态尚待核验，不能据备选版状态推断。正式声音与跨版本衔接应在团队选片后统一制作。

GitHub Actions默认做代码检查和后备字体的单帧渲染，不自动生成整段视频。需要重新渲染时，在Actions页面手动运行制作检查流程并勾选视频输出；结果作为Actions artifact提供，不自动覆盖仓库里程碑文件。

可运行 `npm run check:portable`，它仅在临时渲染包中移除可选仿宋，以分发的思源宋体渲染第一幕465帧、第二幕1425帧、第三幕210／660／1710帧、第四幕备选版525／930／1440帧，并检查合成规格。上述代表帧本地检查已通过；它们验证字体后备和入口，不等同于全部镜头逐帧回归。

`verify_output.py`、`contact_sheet.py` 是可选Python辅助工具，需要Pillow；前者在Windows使用Remotion自带解码器，其他系统需先安装ffmpeg／ffprobe，后者读取工程内字体。两者不是安装、预览和渲染的必要依赖。
