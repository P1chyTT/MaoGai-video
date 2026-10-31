# 《山河有约》

——从绿水青山到金山银山

以浙江省湖州市安吉县余村的发展转型为背景，讲述老村民老周与返乡青年小禾通过交流、观察和实践理解生态保护与绿色发展的故事。老周、小禾及其家庭经历为艺术化虚构的综合创作，不冒充真实历史人物或亲历史料。

项目主题：推进生态文明建设。核心观点包括绿水青山就是金山银山、人与自然和谐共生、生态保护与经济发展协同、推动绿色发展，让绿色成为高质量发展的鲜明底色。

**当前为工程迁移与初始化阶段：24镜尚未制作。** Word脚本已收录；预览仅为5秒技术检查。计划成片约5分钟、六幕／24镜、1920×1080、16:9、30fps、9000帧。不要把短预览当作正式样片或完整影片。

## 项目资料

- [主Word视频脚本](docs/视频脚本/推进生态文明建设_余村故事线视频脚本.docx) · [创作源码与分镜数据](docs/视频脚本/源码/README.md) · [来源哈希](docs/视频脚本/来源记录.json)
- [项目背景与制作规范](docs/项目背景与制作规范.md) · [史实与参考资料](docs/史实与参考资料.md)
- [24镜分工与进度](docs/分镜与制作进度.md) · [迁移报告](docs/migration/迁移报告.md) · [清理清单](docs/migration/清理清单.md)
- [团队接手](docs/HANDOFF.md) · [美术规范](red-paper-reborn/STYLE_GUIDE.md) · [进度](PROGRESS.md)

## 旧项目与分支

旧《红纸新生》已在[归档分支](https://github.com/P1chyTT/MaoGai-video/tree/archive/hongzhi-xinsheng)及[版本标签](https://github.com/P1chyTT/MaoGai-video/tree/hongzhi-xinsheng-final)保存；队友后续配音和第五幕工程另见[协作快照](https://github.com/P1chyTT/MaoGai-video/tree/archive/hongzhi-xinsheng-collaboration)。第四、第五幕还有各自归档，详见迁移报告。

新项目开发分支为 `project/shanhe-youyue`。原默认分支 `master` 保持原样，只有经用户确认合并迁移PR后才切换项目首页。本次不删除历史、不强推、不合并旧成员分支。

## 技术与目录

沿用React 19.2.3、TypeScript 5.9.3、Remotion 4.0.537、SVG与透明PNG技术。保留锁定依赖，不新增付费生成接口。`red-paper-reborn/`是保留的历史工程路径，包名与所有当前入口已经改为山河有约，保留路径是为了减少CI和渲染脚本的迁移风险。

```text
docs/
  视频脚本/                 # 主稿、已确认收录的创作文件及来源
  项目背景与制作规范.md
  史实与参考资料.md
  分镜与制作进度.md
  migration/               # 备份、清理清单、迁移记录
red-paper-reborn/
  src/shared/              # 宣纸舞台、帧缓动、字体、字幕
  src/components/          # 镜头、分层山水、独立主题条
  src/scenes/act01–act06/   # 正式镜头目录，目前待制作
  src/compositions/        # 仅TechnicalPreview初始化合成
  public/assets/           # 新角色、矿山/村庄/山水、竹林/河流等目录
  scripts/                 # 导出和完整性检查
  out/                     # 本机生成，全部忽略
```

## 安装、预览和导出检查

Node.js 22.13+或24+。在新电脑上：

```sh
git clone --branch project/shanhe-youyue https://github.com/P1chyTT/MaoGai-video.git
cd MaoGai-video/red-paper-reborn
pnpm install --frozen-lockfile --config.node-linker=hoisted
pnpm run dev
```

也可使用 `npm install`；仓库CI使用已锁定的pnpm流程。首次下载浏览器需要联网。

```sh
pnpm run lint
pnpm run check:project
pnpm run check:portable
pnpm run keyframes
pnpm run render
```

Studio选择 `TechnicalPreview`：5秒／150帧，验证新配色、宣纸、中文与镜头运动。输出 `out/initialization/TechnicalPreview.mp4`，三个关键帧在 `out/initialization/keyframes/`。Windows可用工程内 `preview.cmd`、`render-demo.cmd`；后者现在只导出初始化检查。正式六幕入口将随制作逐个添加，当前不会输出虚构的五分钟影片。

参考资料以[核验清单](docs/史实与参考资料.md)中列出的国家发展改革委、国家林草局、文化和旅游部、生态环境部及央视等权威页面为准；发布年份与事件年份分别记录，不将虚构家庭故事当作史实。不引用未经核验的收入、游客或碳排放统计。

最终视频尚未制作。后续成片不超过50MiB时再决定是否收录；超过时先核对Git LFS配额／权限或使用GitHub Releases，并在本页记录可访问位置，不提交渲染缓存。
