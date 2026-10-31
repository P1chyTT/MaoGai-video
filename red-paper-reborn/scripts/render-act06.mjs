import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
  renderMedia,
} from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs/promises";
const root = path.resolve(import.meta.dirname, "..");
process.chdir(root);
const out = path.join(root, "out/act06");
const mode = process.argv[2] ?? "frames";
await fs.mkdir(path.join(out, "keyframes"), { recursive: true });
const serveUrl = await bundle({
  entryPoint: path.join(root, "src/index.ts"),
  outDir: path.join(out, "render-bundle"),
  rspack: true,
});
const browser = await openBrowser("chrome");
try {
  const composition = await selectComposition({
    serveUrl,
    id: mode === "full-check" ? "FullFilmPreview" : "Act06Demo",
    puppeteerInstance: browser,
    port: 3117,
  });
  if (
    composition.durationInFrames !== (mode === "full-check" ? 9000 : 1500) ||
    composition.fps !== 30 ||
    composition.width !== 1920 ||
    composition.height !== 1080
  )
    throw new Error("Act06 must be 50s / 1500 frames / 1080p30");
  if (mode === "full-check") {
    await fs.mkdir(path.join(out,"full-check"), {recursive:true});
    for (const frame of (process.argv[3]?.split(",").map(Number) ?? [0,1199,1200,2699,2700,4199,4200,5699,5700,7499,7500,8939,8940,8999])) {
      await renderStill({serveUrl,composition,frame,output:path.join(out,"full-check",`frame-${frame}.png`),imageFormat:"png",puppeteerInstance:browser,port:3117});
      console.log(`FullFilmPreview frame ${frame}`);
    }
    await fs.writeFile(path.join(out,"full-timeline.json"),JSON.stringify({id:"FullFilmPreview",width:composition.width,height:composition.height,fps:composition.fps,durationInFrames:composition.durationInFrames,seconds:composition.durationInFrames/composition.fps,actStarts:[0,1200,2700,4200,5700,7500],lastFrame:8999,fullVideoExported:false},null,2));
  } else if (mode === "frames") {
    for (const [name, frame] of [
      ["Scene21-first", 0],
      ["Scene21-middle", 180],
      ["Scene21-last", 359],
      ["Scene22-first", 360],
      ["Scene22-middle", 540],
      ["Scene22-last", 719],
      ["Scene23-first", 720],
      ["Scene23-middle", 915],
      ["Scene23-last", 1109],
      ["Scene24-first", 1110],
      ["Scene24-middle", 1305],
      ["Scene24-last", 1499],
    ]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", name + ".png"),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3117,
      });
      console.log(`${name}: ${frame}`);
    }
  } else if (mode === "extras") {
    for (const frame of (process.argv[3]?.split(",").map(Number) ?? [
      90,165,225,285,335,410,510,630,705,765,855,945,1035,1095,1140,1200,1260,1320,1409,1440,1470,1499,
    ])) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", `detail-${frame}.png`),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3117,
      });
      console.log(`detail-${frame}`);
    }
  } else {
    let last = -1;
    await renderMedia({
      serveUrl,
      composition,
      codec: "h264",
      pixelFormat: "yuv420p",
      colorSpace: "bt709",
      crf: 19,
      imageFormat: "png",
      audioCodec: "aac",
      audioBitrate: "192k",
      concurrency: 4,
      outputLocation: path.join(out, "Act06Demo.mp4"),
      puppeteerInstance: browser,
      port: 3117,
      metadata: {
        title: "山河有约 · 第六幕：山河有约",
        comment:
          "50 seconds / 1500 frames / original non-vocal foley; recorded dialogue pending",
      },
      onProgress: ({ progress }) => {
        const p = Math.floor(progress * 20);
        if (p > last) {
          last = p;
          console.log(`Act06 export ${p * 5}%`);
        }
      },
    });
    console.log("Exported out/act06/Act06Demo.mp4");
  }
} finally {
  await browser.close({ silent: true });
}
