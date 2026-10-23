import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs/promises';
const root=path.resolve(import.meta.dirname,'..');process.chdir(root);
const mode=process.argv[2]??'frames';
const out=path.join(root,'out/act02');await fs.mkdir(path.join(out,'keyframes'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(out,'render-bundle'),rspack:true});
const browser=await openBrowser('chrome');
try{
 const composition=await selectComposition({serveUrl,id:'Act02Demo',puppeteerInstance:browser,port:3103});
 if(mode==='frames'){
  const frames=[0,180,359,360,570,779,780,990,1199,1200,1425,1649,60,270,690,855,1530];
  for(const frame of frames){await renderStill({serveUrl,composition,frame,output:path.join(out,`keyframes/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser,port:3103});console.log(`Keyframe ${frame}`);}
 }else{
  let last=-1;await renderMedia({serveUrl,composition,codec:'h264',pixelFormat:'yuv420p',crf:18,imageFormat:'png',outputLocation:path.join(root,'out/Act02Demo.mp4'),puppeteerInstance:browser,port:3103,concurrency:4,onProgress:({progress})=>{const p=Math.floor(progress*10);if(p>last){last=p;console.log(`Export ${p*10}%`);}}});
  await fs.copyFile(path.join(root,'out/Act02Demo.mp4'),path.join(root,'out/Act02Demo-Motion.mp4'));
  console.log('Act02Demo.mp4 and Act02Demo-Motion.mp4 exported');
 }
}finally{await browser.close({silent:true});}
