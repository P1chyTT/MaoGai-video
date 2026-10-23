# 队友接手指南

## 1. 先确认当前基线

先看仓库首页的第一幕36秒样片、第二幕55秒动作增强版和对应关键帧，再读 `PROGRESS.md`、`STYLE_GUIDE.md`、`ACT02_GUIDE.md`。当前Scene01–07已完成视觉Demo，仍待团队审片与声音制作。不要把待办当作已完成，也不要为下一镜另绘一套看似相同的老屋。

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

在Studio选择Act01Demo、Act02Demo或独立Scene01–Scene07。Studio通常在3000端口，若被占用以终端显示地址为准。不要在浏览器只看到编辑器界面就认为视频已经加载，确认画面和时间线可播放。

字体已提供可分发的思源宋体后备，无需访问原作者电脑；本机可选仿宋不上传。不要把自己的绝对路径、账号、缓存或系统字体提交到仓库。

## 3. 从哪改起

|工作|主要文件|接手要求|
|---|---|---|
|整体色彩与缓动|`src/shared/styleTokens.ts`|改动会影响所有镜头，应作为统一美术变更审片|
|宣纸与边框|`ShadowStage.tsx`|保持16:9、安全区与细纹理|
|房间、桌窗、光源|`OldHouseStage.tsx`|沿用世界坐标，光从右上进入|
|人物|`PuppetCharacter.tsx`|原图等比、原铆钉转轴；不拉伸整图模拟弯臂|
|小林头部、前臂与手机动作|`src/act02/characterMotion.ts`、`XiaolinPuppet.tsx`|局部帧驱动，手机使用同一转轴计算随手位移|
|剪刀|`ScissorAnimation.tsx`|保留克制的开合与停顿|
|凤凰图案|`PhoenixMotif.tsx`|实体与负形分离，检查纸张连接|
|展开时序|`PaperReveal.tsx`|按局部帧改变遮罩，不拆成粒子|
|字幕文案与时间|`captions.json`|台词以定稿脚本为准，录音后微调|
|新镜头|`src/scenes/`|一个镜头一个组件，并在Root独立注册|
|总时间线|`Act01Demo.tsx`、`Act02Demo.tsx`、`Root.tsx`|保留36秒及55秒独立里程碑，另建后续总片合成|

## 4. 新镜头最小骨架

```tsx
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {ShadowStage} from '../shared/ShadowStage';
import {OldHouseStage} from '../shared/OldHouseStage';

export const Scene08 = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <ShadowStage>
      <OldHouseStage
        frame={100 * fps + frame}
        grandmaFrame={frame}
        scale={1.045}
      />
      {/* 增加小林、道具与本镜字幕；对位与动作从本镜局部帧计算。 */}
    </ShadowStage>
  );
};
```

示例中的100秒承接原稿第二幕结束的环境时间，仅供后续Scene08搭建机位；实际全片仍需按定稿分镜排时（第一幕Demo36秒与原稿45秒不同）。将Scene08以1920×1080／30fps独立注册，再放入新总片合成，不覆盖已有Scene04–07。不要改动Act01Demo的1080帧和Act02Demo的1650帧基准。

## 5. 做完如何交接

1. 运行 `npm run lint`。
2. 在Studio播放新镜头及其前后衔接。
3. 输出首、中、末帧；涉及动作时再输出关键动作帧。
4. 新镜头需通过独立合成的导出检查；改变前三镜时运行 `npm run keyframes` 与 `npm run render`。
5. 修改共享组件会影响旧镜头，必须重看0／239／240／689／690／1079帧，确认无遮挡和素材跳变。
6. 更新PROGRESS中的完成项、待办、负责人和已知限制；视觉规则有变化时同步STYLE_GUIDE。
7. 提交时附预览图、帧数、检查结果和待确认点。详见CONTRIBUTING。

## 6. 输出与自动检查

`npm run keyframes` 和 `npm run render` 导出第一幕；`npm run keyframes:act02` 和 `npm run render:act02` 导出第二幕，均可跨平台运行。第二幕制作细节见ACT02_GUIDE。首次导出会下载Remotion使用的浏览器，不依赖付费视频／语音API。

GitHub Actions默认做代码检查和后备字体的单帧渲染，不自动生成整段视频。需要重新渲染时，在Actions页面手动运行制作检查流程并勾选视频输出；结果作为Actions artifact提供，不自动覆盖仓库里程碑文件。

可运行 `npm run check:portable`，它仅在临时渲染包中移除可选仿宋，用思源宋体分别渲染第一幕奶奶中景和第二幕争论动作帧，验证新电脑的字体后备与两幕合成入口。

`verify_output.py`、`contact_sheet.py` 是可选Python辅助工具，需要Pillow；前者在Windows使用Remotion自带解码器，其他系统需先安装ffmpeg／ffprobe，后者读取工程内字体。两者不是安装、预览和渲染的必要依赖。
