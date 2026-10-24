# 第四幕版本关系与交接

核查日期：2026-10-24。按用户要求：队友已经上传第四幕，因此本次本地制作的版本列为**第四幕（备选版）**上传。此标记表示可供审片比较，不代表团队已决定最终采用哪个版本。

## 队友已上传版

- 作者：september-5；远程分支：`act04`。
- 核查提交：[85afac95449fef9dfe8b212fd1949d18d3957424](https://github.com/P1chyTT/MaoGai-video/commit/85afac95449fef9dfe8b212fd1949d18d3957424)。该提交新增根目录 `Act04Demo.mp4`，19,558,330字节，没有新增第四幕源码。
- [查看／下载队友视频](https://github.com/P1chyTT/MaoGai-video/blob/85afac95449fef9dfe8b212fd1949d18d3957424/Act04Demo.mp4)。Git对象：`a0537d522043f60de227269104fad09a86f0cee9`。
- [合并请求 #1](https://github.com/P1chyTT/MaoGai-video/pull/1)在本次核查时为开放状态，尚未合入master。已上传到分支即满足本次“队友已上传”的判定，不以是否合并作为判断依据。

本次没有改动、合并或关闭该分支和PR，也没有替换该视频。未对队友视频进行声画验收，不能将下面的备选版核验结果套用到队友版本。

## 你的版本（备选版）

- [备选版MP4](../red-paper-reborn/out/Act04Demo-Alternate.mp4)：50.000秒、1500帧、1920×1080、30fps，H.264／yuv420p，含字幕、无音轨；14,577,778字节。
- 视频SHA-256：`22dbfc50057b07933b01a863d04c54504672548764846498b299e0e12354fd44`。标记备选版时视频画面没有改变。
- [完整制作指南与实际接口](../red-paper-reborn/ACT04_GUIDE.md)、[源码入口](../red-paper-reborn/src/Act04Demo.tsx)、[23张关键帧](../red-paper-reborn/out/act04/keyframes)、[首中末总览](../red-paper-reborn/out/act04/storyboard.jpg)、[动作总览](../red-paper-reborn/out/act04/motion-details.jpg)、[检查记录](../red-paper-reborn/out/act04/verification.json)。
- Studio文件夹为 `Act04Alternate`。为兼容既有链接和脚本，技术ID仍为 `Act04Demo` 和Scene13–16，源码目录仍为 `src/act04/`。这些ID不表示该版本已成为正式第四幕。
- 工程内 `npm run render:act04` 输出 `out/Act04Demo-Alternate.mp4`；`npm run keyframes:act04` 输出 `out/act04/keyframes/`；`python scripts/verify-act04.py` 验证备选版。导出不会写入队友的根目录视频。

自动检查覆盖备选版的完整解码、规格、台词、评论、字幕时限及原人物素材；人工审查范围与已知限制见指南。当前未将两版接入正式全片，也未改动Scene01–12的镜头源码或共享组件。

## 队友继续制作时

1. 审片时通过上面的两个视频入口比较，记录选择与需调整的镜头，避免单凭文件名判断已定稿。
2. 若采用队友版，先确认其源工程、分镜帧数、人物素材和声音文件，再安排代码整合；不要直接用备选版的Scene13–16冒充其源码。
3. 若采用备选版，可复用 `src/act04/` 的工作桌、蒙太奇、反馈屏幕与工艺对比组件，依照指南继续校时、配音和第五幕衔接。
4. 另已发现 `act05` 分支的视频与[PR #2](https://github.com/P1chyTT/MaoGai-video/pull/2)；本次只记录存在，未合并或审片。后续先核对已有第五幕产出再认领制作，避免重复。

前三幕独立Demo合计151秒，加上本备选版为201秒／6030帧；这是参考组合时长，最终全片需在版本选择和声音校时后重排。
