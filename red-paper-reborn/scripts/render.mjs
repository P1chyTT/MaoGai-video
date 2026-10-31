import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs/promises';
const root=path.resolve(import.meta.dirname,'..');
process.chdir(root);
const mode=process.argv[2]??'frames';
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(root,'out/initialization/render-bundle'),rspack:true});
const browser=await openBrowser('chrome');
try {
  const composition=await selectComposition({serveUrl,id:'TechnicalPreview',puppeteerInstance:browser,port:3111});
  if(mode==='frames') {
    const frames=[['first',0],['middle',75],['last',149]];
    await fs.mkdir(path.join(root,'out/initialization/keyframes'),{recursive:true});
    for(const [name,frame] of frames){await renderStill({serveUrl,composition,frame,output:path.join(root,`out/initialization/keyframes/${name}.png`),imageFormat:'png',puppeteerInstance:browser,port:3111});console.log(`Checked frame ${frame}: ${name}`);}
  } else {
    let last=-1;
    await renderMedia({serveUrl,composition,codec:'h264',pixelFormat:'yuv420p',crf:18,imageFormat:'png',outputLocation:path.join(root,'out/initialization/TechnicalPreview.mp4'),puppeteerInstance:browser,port:3111,concurrency:4,metadata:{title:'山河有约 · 工程初始化预览',comment:'1920x1080 · 30fps · 150 frames · technical initialization only'},onProgress:({progress})=>{const n=Math.floor(progress*10);if(n>last){last=n;console.log(`Export ${n*10}%`);}}});
    console.log('Technical initialization exported: out/initialization/TechnicalPreview.mp4; this is not the planned 5-minute film.');
  }
} finally {await browser.close({silent:true});}
