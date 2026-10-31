import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
  renderMedia,
} from "@remotion/renderer";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
process.chdir(root);
const mode = process.argv[2] ?? "frames";
const out = path.join(root, "out/act01");
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
    id: "Act01Demo",
    puppeteerInstance: browser,
    port: 3112,
  });
  if (
    composition.durationInFrames !== 1200 ||
    composition.width !== 1920 ||
    composition.height !== 1080 ||
    composition.fps !== 30
  )
    throw new Error("Act01 metadata mismatch");
  if (mode === "frames") {
    const frames = [
      ["Scene01-first", 0],
      ["Scene01-middle", 150],
      ["Scene01-last", 299],
      ["Scene02-first", 300],
      ["Scene02-middle", 450],
      ["Scene02-last", 599],
      ["Scene03-first", 600],
      ["Scene03-middle", 750],
      ["Scene03-last", 899],
      ["Scene04-first", 900],
      ["Scene04-middle", 1050],
      ["Scene04-last", 1199],
    ];
    for (const [name, frame] of frames) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", name + ".png"),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3112,
      });
      console.log(`${name}: ${frame}`);
    }
  } else if (mode === "extras") {
    for (const frame of [30, 225, 390, 555, 690, 810, 990, 1110, 1140, 1160]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", `detail-${frame}.png`),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3112,
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
      crf: 19,
      imageFormat: "png",
      colorSpace: "bt709",
      outputLocation: path.join(out, "Act01Demo.mp4"),
      puppeteerInstance: browser,
      port: 3112,
      concurrency: 4,
      audioCodec: "aac",
      audioBitrate: "192k",
      metadata: {
        title: "山河有约 · 第一幕：山河旧貌",
        comment:
          "40 seconds / 1200 frames / original synthetic foley / subtitles; no recorded dialogue",
      },
      onProgress: ({ progress }) => {
        const p = Math.floor(progress * 20);
        if (p > last) {
          last = p;
          console.log(`Act01 export ${p * 5}%`);
        }
      },
    });
    console.log("Exported out/act01/Act01Demo.mp4");
  }
} finally {
  await browser.close({ silent: true });
}
