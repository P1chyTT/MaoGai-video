# 《山河有约》

——从绿水青山到金山银山

以浙江省湖州市安吉县余村的发展转型为背景，讲述老村民老周与返乡大学生、孙女小禾通过交流、观察和实践理解生态保护与绿色发展的故事。老周、小禾及其家庭经历为艺术化虚构的综合创作，不冒充真实历史人物或亲历史料。制作方向为中国传统皮影戏、剪纸艺术与代码驱动的现代MG动画。

项目主题：推进生态文明建设。核心观点包括绿水青山就是金山银山、人与自然和谐共生、生态保护与经济发展协同、推动绿色发展，让绿色成为高质量发展的鲜明底色。

**当前为工程初始化与人物视觉参考归档阶段：24镜尚未制作。** Word脚本及三张人物模板已收录；预览仅为5秒技术检查。正式脚本规定成片300秒、六幕／24镜、1920×1080、16:9、30fps、9000帧。不要把短预览当作正式样片或完整影片。

## 项目资料

- [主Word视频脚本](docs/视频脚本/推进生态文明建设_余村故事线视频脚本.docx) · [创作源码与分镜数据](docs/视频脚本/源码/README.md) · [来源哈希](docs/视频脚本/来源记录.json)
- [人物设定与视觉规范](docs/人物设定与视觉规范.md) · [人物素材清单、来源及校验](red-paper-reborn/public/assets/characters/README.md)
- [项目背景与制作规范](docs/项目背景与制作规范.md) · [史实与参考资料](docs/史实与参考资料.md)
- [24镜分工与进度](docs/分镜与制作进度.md) · [迁移报告](docs/migration/迁移报告.md) · [清理清单](docs/migration/清理清单.md)
- [团队接手](docs/HANDOFF.md) · [美术规范](red-paper-reborn/STYLE_GUIDE.md) · [进度](PROGRESS.md)

## 人物素材库与后续动画制作规范

2026-10-31已完整阅读正式Word的九部分、六幕24镜及全部声音定稿，并将三张用户提供的原始PNG按字节复制入库。三图均1086×1448，RGB无透明通道；保留宣纸背景、装饰、人物名称、原始纹理和比例，没有重绘、裁切、去背景或拆骨骼。

| 小禾 | 老周 | 余村村民群像 |
| --- | --- | --- |
| <img src="red-paper-reborn/public/assets/characters/xiaohe.png" alt="小禾完整人物模板" width="240"> | <img src="red-paper-reborn/public/assets/characters/laozhou.png" alt="老周完整人物模板" width="240"> | <img src="red-paper-reborn/public/assets/characters/yucun_villagers_group.png" alt="余村村民群像完整模板" width="240"> |
| [xiaohe.png](red-paper-reborn/public/assets/characters/xiaohe.png) · 2.72 MiB | [laozhou.png](red-paper-reborn/public/assets/characters/laozhou.png) · 2.65 MiB | [yucun_villagers_group.png](red-paper-reborn/public/assets/characters/yucun_villagers_group.png) · 2.90 MiB |

以上文件均位于 `red-paper-reborn/public/assets/characters/`，不在仓库根部重复建库。群像保留三位成人的整体参考属性，没有拆成三个独立角色。**当前版本为人物视觉设定模板，正式骨骼动画使用前可能需要进一步分层。**

后续所有镜头必须先检查[人物设定与视觉规范](docs/人物设定与视觉规范.md)、素材库和对应Word分镜，统一引用此库，禁止为了某个镜头重新设计小禾或老周。原图不可覆盖；动作、朝向、脚本需要的道具和原风格内表情应在后续衍生文件中处理，不能拉伸整张PNG假装弯臂。

脚本与模板的差异已列明：小禾在剧情中使用手机、帆布包，原图是相机、棕色双肩包；老周现图戴帽扶拐杖，但各镜帽子状态按脚本，不能据拐杖编造经历。老周中年版、儿童、独立关节和职业动作仍待准备。早期初始化文档的“人物待设计”是当时状态，当前人物参考进度以本节及人物规范为准；正式字幕与安全区以Word第七部分为准。

本次仅完成剧本核对、人物参考归档和规范说明，没有新增正式分镜或启动动画渲染。正式Word此前已入库，本次与桌面原稿哈希核对一致，不重复复制。

## 旧项目与分支

旧《红纸新生》已在[归档分支](https://github.com/P1chyTT/MaoGai-video/tree/archive/hongzhi-xinsheng)及[版本标签](https://github.com/P1chyTT/MaoGai-video/tree/hongzhi-xinsheng-final)保存；队友后续配音和第五幕工程另见[协作快照](https://github.com/P1chyTT/MaoGai-video/tree/archive/hongzhi-xinsheng-collaboration)。第四、第五幕还有各自归档，详见迁移报告。

新项目开发分支为 [project/shanhe-youyue](https://github.com/P1chyTT/MaoGai-video/tree/project/shanhe-youyue)，迁移审阅见 [PR #3](https://github.com/P1chyTT/MaoGai-video/pull/3)。原默认分支 `master` 保持原样，只有经用户确认合并迁移PR后才切换项目首页。本次不删除历史、不强推、不合并旧成员分支。

## 技术与目录

沿用React 19.2.3、TypeScript 5.9.3、Remotion 4.0.537、SVG与透明PNG技术。保留锁定依赖，不新增付费生成接口。`red-paper-reborn/`是保留的历史工程路径，包名与所有当前入口已经改为山河有约，保留路径是为了减少CI和渲染脚本的迁移风险。

```text
docs/
  视频脚本/                 # 主稿、已确认收录的创作文件及来源
  人物设定与视觉规范.md      # 爷孙关系、24镜人物需求、模板差异及引用约束
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
    characters/            # xiaohe.png、laozhou.png、yucun_villagers_group.png
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
