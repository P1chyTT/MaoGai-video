import {cancelRender,continueRender,delayRender,staticFile} from 'remotion';
if(typeof document!=='undefined'){
 const handle=delayRender('Loading licensed Source Han Serif');
 const font=new FontFace('ShanheSerif',`url("${staticFile('assets/fonts/SourceHanSerifSC-Regular.otf')}")`);
 font.load().then(loaded=>{document.fonts.add(loaded);continueRender(handle);}).catch(cancelRender);
}
