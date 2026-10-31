# 山河有约 · 动画工程

本目录保留历史路径名以减少配置迁移风险，当前包名、入口、配色和正式素材规划已经切换到新项目。旧角色/对白/镜头/视频只在归档历史中保留，不参与当前打包。

React 19.2.3、TypeScript 5.9.3、Remotion 4.0.537；1920×1080、30fps。唯一现有合成为TechnicalPreview，5秒150帧，明确标注工程初始化，不代表24镜正式影片。

```sh
pnpm install --frozen-lockfile --config.node-linker=hoisted
pnpm run dev
pnpm run lint
pnpm run check:project
pnpm run check:portable
pnpm run keyframes
pnpm run render
```

输出out/initialization/TechnicalPreview.mp4和keyframes三张图。视频及缓存默认不进Git，CI手动渲染可提供检查artifact。镜头目录src/scenes/act01–act06和public/assets新角色/场景位置已建，正式素材待制作。完整说明、脚本及迁移报告见仓库首页。
