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
const out = path.join(root, "out/act03");
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
    id: "Act03Demo",
    puppeteerInstance: browser,
    port: 3114,
  });
  if (
    composition.durationInFrames !== 1500 ||
    composition.fps !== 30 ||
    composition.width !== 1920 ||
    composition.height !== 1080
  )
    throw new Error("Act03 must be 50s / 1500 frames / 1080p30");
  if (mode === "frames") {
    for (const [name, frame] of [
      ["Scene09-first", 0],
      ["Scene09-middle", 180],
      ["Scene09-last", 359],
      ["Scene10-first", 360],
      ["Scene10-middle", 555],
      ["Scene10-last", 749],
      ["Scene11-first", 750],
      ["Scene11-middle", 930],
      ["Scene11-last", 1109],
      ["Scene12-first", 1110],
      ["Scene12-middle", 1305],
      ["Scene12-last", 1499],
    ]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", name + ".png"),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3114,
      });
      console.log(`${name}: ${frame}`);
    }
  } else if (mode === "extras") {
    for (const frame of [
      60, 145, 260, 395, 510, 680, 740, 805, 860, 920, 1020, 1090, 1160, 1240,
      1360, 1460,
    ]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", `detail-${frame}.png`),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3114,
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
      outputLocation: path.join(out, "Act03Demo.mp4"),
      puppeteerInstance: browser,
      port: 3114,
      metadata: {
        title: "山河有约 · 第三幕：理念的转变",
        comment:
          "50 seconds / 1500 frames / original non-vocal foley; recorded dialogue pending",
      },
      onProgress: ({ progress }) => {
        const p = Math.floor(progress * 20);
        if (p > last) {
          last = p;
          console.log(`Act03 export ${p * 5}%`);
        }
      },
    });
    console.log("Exported out/act03/Act03Demo.mp4");
  }
} finally {
  await browser.close({ silent: true });
}
