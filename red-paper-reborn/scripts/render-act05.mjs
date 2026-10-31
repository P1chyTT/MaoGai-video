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
const out = path.join(root, "out/act05");
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
    id: "Act05Demo",
    puppeteerInstance: browser,
    port: 3116,
  });
  if (
    composition.durationInFrames !== 1800 ||
    composition.fps !== 30 ||
    composition.width !== 1920 ||
    composition.height !== 1080
  )
    throw new Error("Act05 must be 60s / 1800 frames / 1080p30");
  if (mode === "frames") {
    for (const [name, frame] of [
      ["Scene17-first", 0],
      ["Scene17-middle", 225],
      ["Scene17-last", 449],
      ["Scene18-first", 450],
      ["Scene18-middle", 675],
      ["Scene18-last", 899],
      ["Scene19-first", 900],
      ["Scene19-middle", 1125],
      ["Scene19-last", 1349],
      ["Scene20-first", 1350],
      ["Scene20-middle", 1575],
      ["Scene20-last", 1799],
    ]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", name + ".png"),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3116,
      });
      console.log(`${name}: ${frame}`);
    }
  } else if (mode === "extras") {
    for (const frame of [
      90,210,300,360,408,470,540,645,705,795,870,960,1020,1110,1170,1245,1305,1380,1410,1446,1485,1545,1665,1755,
    ]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", `detail-${frame}.png`),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3116,
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
      outputLocation: path.join(out, "Act05Demo.mp4"),
      puppeteerInstance: browser,
      port: 3116,
      metadata: {
        title: "山河有约 · 第五幕：新时代的接力",
        comment:
          "60 seconds / 1800 frames / original non-vocal foley; recorded dialogue pending",
      },
      onProgress: ({ progress }) => {
        const p = Math.floor(progress * 20);
        if (p > last) {
          last = p;
          console.log(`Act05 export ${p * 5}%`);
        }
      },
    });
    console.log("Exported out/act05/Act05Demo.mp4");
  }
} finally {
  await browser.close({ silent: true });
}
