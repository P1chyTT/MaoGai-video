import {cancelRender, continueRender, delayRender, staticFile} from 'remotion';
if (typeof document !== 'undefined') {
  const handle=delayRender('Loading local Chinese FangSong');
  const font=new FontFace('FangSong', `url("${staticFile('assets/fonts/fangsong.ttf')}"), url("${staticFile('assets/fonts/SourceHanSerifSC-Regular.otf')}")`);
  font.load().then(loaded=>{document.fonts.add(loaded);continueRender(handle);}).catch(cancelRender);
}
