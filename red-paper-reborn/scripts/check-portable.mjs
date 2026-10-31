import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');process.chdir(root);
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(root,'out/portable-check-bundle'),rspack:true});
const browser=await openBrowser('chrome');
try{
 const composition=await selectComposition({serveUrl,id:'TechnicalPreview',puppeteerInstance:browser,port:3112});
 if(composition.width!==1920||composition.height!==1080||composition.fps!==30||composition.durationInFrames!==150)throw new Error('Initialization preview metadata mismatch');
 for(const frame of [0,75,149])await renderStill({serveUrl,composition,frame,output:path.join(root,`out/portable-check-${frame}.png`),imageFormat:'png',puppeteerInstance:browser,port:3112});
 console.log('Initialization render passed: three frames with distributed Source Han Serif; no formal scene is claimed complete.');
}finally{await browser.close({silent:true});}
