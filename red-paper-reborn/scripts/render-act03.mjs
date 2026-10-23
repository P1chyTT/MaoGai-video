import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs/promises';

const root=path.resolve(import.meta.dirname,'..');process.chdir(root);
const mode=process.argv[2]??'frames';
const out=path.join(root,'out/act03');await fs.mkdir(path.join(out,'keyframes'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(out,'render-bundle'),rspack:true});
const browser=await openBrowser('chrome');
try{
 const composition=await selectComposition({serveUrl,id:'Act03Demo',puppeteerInstance:browser,port:3106});
 if(mode==='frames'){
  // Every shot: first, midpoint and last. Extra frames inspect staging and prop timing.
  const frames=[0,135,269,270,495,719,720,900,1079,1080,1230,1379,1380,1590,1799,90,210,390,600,660,1140,1290,1425,1470,1710];
  for(const frame of frames){await renderStill({serveUrl,composition,frame,output:path.join(out,`keyframes/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser,port:3106});console.log(`Keyframe ${frame}`);}
 }else if(mode==='regression'){
  for(const [id,frame,reference] of [['Act01Demo',465,'out/keyframes/scene02-mid.png'],['Act02Demo',1425,'out/act02/keyframes/frame-1425.png']]){
   const old=await selectComposition({serveUrl,id,puppeteerInstance:browser,port:3106});
   await renderStill({serveUrl,composition:old,frame,output:path.join(out,`${id}-regression.png`),imageFormat:'png',puppeteerInstance:browser,port:3106});
   console.log(`Regression ${id} ${frame}; compare with ${reference}`);
  }
 }else if(mode==='video'){
  let last=-1;
  await renderMedia({serveUrl,composition,codec:'h264',pixelFormat:'yuv420p',crf:18,imageFormat:'png',outputLocation:path.join(root,'out/Act03Demo.mp4'),puppeteerInstance:browser,port:3106,concurrency:4,onProgress:({progress})=>{const p=Math.floor(progress*10);if(p>last){last=p;console.log(`Export ${p*10}%`);}}});
  console.log('Act03Demo.mp4 exported: 1920x1080, 30fps, 60s, 1800 frames');
 }else throw new Error(`Unknown mode: ${mode}`);
}finally{await browser.close({silent:true});}
