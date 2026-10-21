# 第一幕里程碑输出

- `Act01Demo.mp4`：36秒、1920×1080、30fps、1080帧，H.264／yuv420p，无声，含对白字幕。
- `storyboard.jpg`：三个镜头的首／中／末帧总览。
- `verification.json`：完整解码与输出参数的本地检查记录。
- `keyframes/`：下表所列原尺寸PNG。

|镜头|首帧|中间帧|末帧|
|---|---|---|---|
|01|scene01-first：0|scene01-mid：120|scene01-last：239|
|02|scene02-first：240|scene02-mid：465|scene02-last：689|
|03|scene03-first：690|scene03-mid：885|scene03-last：1079|

另外 `scene03-complete.png` 是全局1020帧的凤凰完成状态。仓库保留本次里程碑；后续修改后请重新导出并在PROGRESS说明变化。临时 `render-bundle` 不提交。
