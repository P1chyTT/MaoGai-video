# 队友接手指南

## 1. 先确认当前基线

先看仓库首页的第一幕36秒样片、第二幕55秒动作增强版、第三幕60秒样片和对应关键帧，再读 [项目进度](../PROGRESS.md)、[美术规范](../red-paper-reborn/STYLE_GUIDE.md)、[第二幕指南](../red-paper-reborn/ACT02_GUIDE.md) 和 [第三幕指南](../red-paper-reborn/ACT03_GUIDE.md)。当前Scene01–12已完成无声视觉Demo，第三幕为1800帧且完整解码检查通过；团队审片与声音制作仍待完成，第四幕Scene13–16待制作。不要把待办当作已完成，也不要为下一镜另绘一套看似相同的老屋。

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

在Studio选择Act01Demo、Act02Demo、Act03Demo或独立Scene01–Scene12。Studio通常在3000端口，若被占用以终端显示地址为准。不要在浏览器只看到编辑器界面就认为视频已经加载，确认画面和时间线可播放。

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
|剪刀|`ScissorAnimation.tsx`|保留克制的开合与停顿|
|凤凰图案|`PhoenixMotif.tsx`|实体与负形分离，检查纸张连接|
|展开时序|`PaperReveal.tsx`|按局部帧改变遮罩，不拆成粒子|
|字幕文案与时间|`captions.json`|台词以定稿脚本为准，录音后微调|
|新镜头|`src/scenes/`|一个镜头一个组件，并在Root独立注册|
|总时间线|`Act01Demo.tsx`、`Act02Demo.tsx`、`Act03Demo.tsx`、`Root.tsx`|保留36秒、55秒及60秒独立里程碑，另建后续总片合成|

## 4. 新镜头最小骨架

```tsx
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {ShadowStage} from '../shared/ShadowStage';
import {OldHouseStage} from '../shared/OldHouseStage';

export const Scene13 = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <ShadowStage>
      <OldHouseStage
        frame={160 * fps + frame}
        scale={1.045}
      />
      {/* 按第四幕分镜增加电脑、小林、屏幕内容与字幕；均由局部帧驱动。 */}
    </ShadowStage>
  );
};
```

这是尚未实现的Scene13空舞台骨架，不能作为第四幕已完成的证明。示例中的160秒是原稿第四幕开始时的环境时间，正式制作仍需按新分镜调整；实际全片也需重新排时（第一幕Demo36秒与原稿45秒不同）。第四幕可复用 `src/act03/ComputerDesk.tsx` 的材质和构图，但电脑屏幕合作信息及角色动作应按新剧情单独扩展。将新镜头以1920×1080／30fps独立注册，再加入第四幕或后续总片合成，不覆盖已有Scene01–12。保留Act01Demo的1080帧、Act02Demo的1650帧和Act03Demo的1800帧基准。

## 5. 做完如何交接

1. 运行 `npm run lint`。
2. 在Studio播放新镜头及其前后衔接。
3. 输出首、中、末帧；涉及动作时再输出关键动作帧。
4. 新镜头需通过独立合成的导出检查；改变前三镜时运行 `npm run keyframes` 与 `npm run render`。
5. 修改共享组件会影响旧镜头，必须重看第一幕0／239／240／689／690／1079帧及第二、三幕各镜首／中／末帧，确认无遮挡和素材跳变。第三幕当前只对第一幕465帧和第二幕1425帧做过逐像素回归，不代表旧幕全部逐帧检查。
6. 更新PROGRESS中的完成项、待办、负责人和已知限制；视觉规则有变化时同步STYLE_GUIDE。
7. 提交时附预览图、帧数、检查结果和待确认点。详见CONTRIBUTING。

## 6. 输出与自动检查

`npm run keyframes` 和 `npm run render` 导出第一幕；`npm run keyframes:act02` 和 `npm run render:act02` 导出第二幕；`npm run keyframes:act03` 和 `npm run render:act03` 导出第三幕，均可跨平台运行。第二、三幕细节见 [ACT02_GUIDE](../red-paper-reborn/ACT02_GUIDE.md) 和 [ACT03_GUIDE](../red-paper-reborn/ACT03_GUIDE.md)。首次导出会下载Remotion使用的浏览器，不依赖付费视频／语音API。

第三幕导出后运行 `python scripts/verify-act03.py`：检查1920×1080、30fps、60秒、1800帧全解码、黑白候选帧、逐镜台词、字幕时间及奶奶／小林／商家素材哈希，并生成 `out/act03/verification.json` 和15帧 `storyboard.jpg`。该脚本使用已有Pillow；Windows可用Remotion自带解码工具，其他系统需ffmpeg／ffprobe。现有第三幕记录为通过，重新导出后必须重新检查；机器检查不能替代人工审片。

GitHub Actions默认做代码检查和后备字体的单帧渲染，不自动生成整段视频。需要重新渲染时，在Actions页面手动运行制作检查流程并勾选视频输出；结果作为Actions artifact提供，不自动覆盖仓库里程碑文件。

可运行 `npm run check:portable`，它仅在临时渲染包中移除可选仿宋，用思源宋体分别渲染第一幕奶奶中景和第二幕争论动作帧，验证新电脑的字体后备与两幕合成入口。

`verify_output.py`、`contact_sheet.py` 是可选Python辅助工具，需要Pillow；前者在Windows使用Remotion自带解码器，其他系统需先安装ffmpeg／ffprobe，后者读取工程内字体。两者不是安装、预览和渲染的必要依赖。
