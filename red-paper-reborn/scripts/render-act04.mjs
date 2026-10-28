import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs/promises';
const root=path.resolve(import.meta.dirname,'..');process.chdir(root);
const mode=process.argv[2]??'frames';const out=path.join(root,'out/act04');
await fs.mkdir(path.join(out,'keyframes'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(out,'render-bundle'),rspack:true});
const browser=await openBrowser('chrome');
try{
 const composition=await selectComposition({serveUrl,id:'Act04Demo',puppeteerInstance:browser,port:3107});
 if(mode==='frames'){
  const frames=[0,150,299,300,480,659,660,870,1079,1080,1290,1499,345,390,435,525,570,615,840,930,990,1350,1440];
  for(const frame of frames){await renderStill({serveUrl,composition,frame,output:path.join(out,`keyframes/frame-${String(frame).padStart(4,'0')}.png`),imageFormat:'png',puppeteerInstance:browser,port:3107});console.log(`Keyframe ${frame}`);}
 }else if(mode==='video'){
  let last=-1;
  await renderMedia({serveUrl,composition,codec:'h264',pixelFormat:'yuv420p',crf:18,imageFormat:'png',outputLocation:path.join(root,'out/Act04Demo-Alternate.mp4'),puppeteerInstance:browser,port:3107,concurrency:4,onProgress:({progress})=>{const p=Math.floor(progress*10);if(p>last){last=p;console.log(`Export ${p*10}%`);}}});
  console.log('Act04Demo-Alternate.mp4 exported (alternate version): 1920x1080, 30fps, 50s, 1500 frames');
 }else throw new Error(`Unknown mode: ${mode}`);
}finally{await browser.close({silent:true});}
