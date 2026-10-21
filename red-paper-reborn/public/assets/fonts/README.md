# 字体

- `SourceHanSerifSC-Regular.otf`：Adobe 思源宋体简体中文 Regular，作为跨平台宋体后备；SIL Open Font License 1.1，许可随文件保存在 `SourceHanSerif-LICENSE.txt`。
- 官方来源：https://github.com/adobe-fonts/source-han-serif/tree/release/OTF/SimplifiedChinese
- `fangsong.ttf`：本机可选仿宋，不纳入 Git；本地样片使用此文件。不要把系统字体自动打包上传。需要完全一致的字幕字形时，在有相应使用许可的环境中自行准备该可选文件。

`src/shared/font.ts` 会先尝试可选仿宋，再使用仓库内的思源宋体；导出会等待字体加载完成。新检出在首选字体不存在时可能有一次本地404请求，随后会正常使用思源宋体。
