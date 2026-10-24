import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs/promises';

const root=path.resolve(import.meta.dirname,'..');
process.chdir(root);
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(root,'out/portable-check-bundle'),rspack:true});
// Only remove the optional font from this throwaway bundle, never from source assets.
const copiedFont=path.join(serveUrl,'public/assets/fonts/fangsong.ttf');
await fs.rm(copiedFont,{force:true});
const browser=await openBrowser('chrome');
try {
  const composition=await selectComposition({serveUrl,id:'Act01Demo',puppeteerInstance:browser,port:3102});
  if(composition.durationInFrames!==1080||composition.fps!==30||composition.width!==1920||composition.height!==1080) throw new Error('Composition metadata changed');
  await renderStill({serveUrl,composition,frame:465,output:path.join(root,'out/portable-font-check.png'),imageFormat:'png',puppeteerInstance:browser,port:3102});
  console.log('Portable render passed: Scene02 frame 465, using the distributed Source Han Serif font.');
  const act02=await selectComposition({serveUrl,id:'Act02Demo',puppeteerInstance:browser,port:3102});
  if(act02.durationInFrames!==1650||act02.fps!==30||act02.width!==1920||act02.height!==1080) throw new Error('Act II composition metadata changed');
  await renderStill({serveUrl,composition:act02,frame:1425,output:path.join(root,'out/portable-font-act02-check.png'),imageFormat:'png',puppeteerInstance:browser,port:3102});
  console.log('Portable render passed: Scene07 frame 1425, using the distributed Source Han Serif font.');
  const act03=await selectComposition({serveUrl,id:'Act03Demo',puppeteerInstance:browser,port:3102});
  if(act03.durationInFrames!==1800||act03.fps!==30||act03.width!==1920||act03.height!==1080) throw new Error('Act III composition metadata changed');
  for(const frame of [210,660,1710]){
    await renderStill({serveUrl,composition:act03,frame,output:path.join(root,`out/portable-font-act03-${frame}-check.png`),imageFormat:'png',puppeteerInstance:browser,port:3102});
  }
  console.log('Portable render passed: Act III invitation, price and three-character shots, using the distributed Source Han Serif font.');
} finally {await browser.close({silent:true});}
