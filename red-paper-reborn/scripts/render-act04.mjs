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
const out = path.join(root, "out/act04");
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
    id: "Act04Demo",
    puppeteerInstance: browser,
    port: 3115,
  });
  if (
    composition.durationInFrames !== 1500 ||
    composition.fps !== 30 ||
    composition.width !== 1920 ||
    composition.height !== 1080
  )
    throw new Error("Act04 must be 50s / 1500 frames / 1080p30");
  if (mode === "frames") {
    for (const [name, frame] of [
      ["Scene13-first", 0],
      ["Scene13-middle", 180],
      ["Scene13-last", 359],
      ["Scene14-first", 360],
      ["Scene14-middle", 555],
      ["Scene14-last", 749],
      ["Scene15-first", 750],
      ["Scene15-middle", 930],
      ["Scene15-last", 1109],
      ["Scene16-first", 1110],
      ["Scene16-middle", 1305],
      ["Scene16-last", 1499],
    ]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", name + ".png"),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3115,
      });
      console.log(`${name}: ${frame}`);
    }
  } else if (mode === "extras") {
    for (const frame of [
      60, 150, 260, 335, 390, 450, 510, 600, 680, 735, 790, 860, 920, 1010,
      1080, 1140, 1260, 1335, 1410, 1480,
    ]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", `detail-${frame}.png`),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3115,
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
      outputLocation: path.join(out, "Act04Demo.mp4"),
      puppeteerInstance: browser,
      port: 3115,
      metadata: {
        title: "山河有约 · 第四幕：绿水青山变成金山银山",
        comment:
          "50 seconds / 1500 frames / original non-vocal foley; recorded dialogue pending",
      },
      onProgress: ({ progress }) => {
        const p = Math.floor(progress * 20);
        if (p > last) {
          last = p;
          console.log(`Act04 export ${p * 5}%`);
        }
      },
    });
    console.log("Exported out/act04/Act04Demo.mp4");
  }
} finally {
  await browser.close({ silent: true });
}
