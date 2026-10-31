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
const out = path.join(root, "out/act02");
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
    id: "Act02Demo",
    puppeteerInstance: browser,
    port: 3113,
  });
  if (
    composition.durationInFrames !== 1500 ||
    composition.fps !== 30 ||
    composition.width !== 1920 ||
    composition.height !== 1080
  )
    throw new Error("Act02 must be 50s / 1500 frames / 1080p30");
  if (mode === "frames") {
    for (const [name, frame] of [
      ["Scene05-first", 0],
      ["Scene05-middle", 180],
      ["Scene05-last", 359],
      ["Scene06-first", 360],
      ["Scene06-middle", 540],
      ["Scene06-last", 719],
      ["Scene07-first", 720],
      ["Scene07-middle", 915],
      ["Scene07-last", 1109],
      ["Scene08-first", 1110],
      ["Scene08-middle", 1305],
      ["Scene08-last", 1499],
    ]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", name + ".png"),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3113,
      });
      console.log(`${name}: ${frame}`);
    }
  } else if (mode === "extras") {
    for (const frame of [
      50, 285, 380, 625, 785, 975, 1035, 1155, 1215, 1275, 1365, 1410, 1465,
    ]) {
      await renderStill({
        serveUrl,
        composition,
        frame,
        output: path.join(out, "keyframes", `detail-${frame}.png`),
        imageFormat: "png",
        puppeteerInstance: browser,
        port: 3113,
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
      outputLocation: path.join(out, "Act02Demo.mp4"),
      puppeteerInstance: browser,
      port: 3113,
      metadata: {
        title: "山河有约 · 第二幕：发展的抉择",
        comment:
          "50 seconds / 1500 frames / original non-vocal foley; recorded dialogue pending",
      },
      onProgress: ({ progress }) => {
        const p = Math.floor(progress * 20);
        if (p > last) {
          last = p;
          console.log(`Act02 export ${p * 5}%`);
        }
      },
    });
    console.log("Exported out/act02/Act02Demo.mp4");
  }
} finally {
  await browser.close({ silent: true });
}
