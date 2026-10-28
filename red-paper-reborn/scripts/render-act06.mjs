import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs/promises';
const root=path.resolve(import.meta.dirname,'..');process.chdir(root);
const mode=process.argv[2]??'frames';const out=path.join(root,'out/act06');
await fs.mkdir(path.join(out,'keyframes'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(out,'render-bundle'),rspack:true});
const browser=await openBrowser('chrome');
try{
 const composition=await selectComposition({serveUrl,id:'Act06Demo',puppeteerInstance:browser,port:3108});
 if(mode==='frames'){
  const frames=process.argv[3]?process.argv[3].split(',').map(Number):[0,60,119,120,165,209,210,285,359,360,480,599,30,90,150,195,240,300,390,420,450,510,540,570];
  for(const frame of frames){await renderStill({serveUrl,composition,frame,output:path.join(out,`keyframes/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser,port:3108});console.log(`Keyframe ${frame}`);}
 }else if(mode==='video'){
  let last=-1;
  await renderMedia({serveUrl,composition,codec:'h264',pixelFormat:'yuv420p',crf:18,imageFormat:'png',outputLocation:path.join(root,'out/Act06Demo.mp4'),puppeteerInstance:browser,port:3108,concurrency:4,onProgress:({progress})=>{const p=Math.floor(progress*10);if(p>last){last=p;console.log(`Export ${p*10}%`);}}});
  console.log('Act06Demo.mp4 exported: 1920x1080, 30fps, 20s, 600 frames');
 }else throw new Error(`Unknown mode: ${mode}`);
}finally{await browser.close({silent:true});}
