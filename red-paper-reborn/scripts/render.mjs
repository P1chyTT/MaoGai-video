import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs/promises';
const root=path.resolve(import.meta.dirname,'..');
process.chdir(root);
const mode=process.argv[2]??'frames';
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(root,'out/render-bundle'),rspack:true});
const browser=await openBrowser('chrome');
try {
  const composition=await selectComposition({serveUrl,id:'Act01Demo',puppeteerInstance:browser,port:3101});
  if(mode==='frames') {
    const frames=[['scene01-first',0],['scene01-mid',120],['scene01-last',239],['scene02-first',240],['scene02-mid',465],['scene02-last',689],['scene03-first',690],['scene03-mid',885],['scene03-last',1079],['scene03-complete',1020]];
    await fs.mkdir(path.join(root,'out/keyframes'),{recursive:true});
    for(const [name,frame] of frames){await renderStill({serveUrl,composition,frame,output:path.join(root,`out/keyframes/${name}.png`),imageFormat:'png',puppeteerInstance:browser,port:3101});console.log(`Checked frame ${frame}: ${name}`);}
  } else {
    let last=-1;
    await renderMedia({serveUrl,composition,codec:'h264',pixelFormat:'yuv420p',crf:18,imageFormat:'png',outputLocation:path.join(root,'out/Act01Demo.mp4'),puppeteerInstance:browser,port:3101,concurrency:4,metadata:{title:'红纸新生 · 第一幕',comment:'1920x1080 · 30fps · 1080 frames · Remotion visual demo'},onProgress:({progress})=>{const n=Math.floor(progress*10);if(n>last){last=n;console.log(`Export ${n*10}%`);}}});
    console.log('MP4 exported: out/Act01Demo.mp4');
  }
} finally {await browser.close({silent:true});}
