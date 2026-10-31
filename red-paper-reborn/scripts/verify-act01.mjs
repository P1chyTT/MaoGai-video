import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import crypto from "node:crypto";
const app = path.resolve(import.meta.dirname, "..");
const repo = path.resolve(app, "..");
const shots = JSON.parse(
  fs.readFileSync(path.join(repo, "docs/视频脚本/源码/shots.json"), "utf8"),
).slice(0, 4);
const captions = JSON.parse(
  fs.readFileSync(path.join(app, "src/scenes/act01/captions.json"), "utf8"),
);
let count = 0;
const blocks = [];
const time = (ms) =>
  `${String(Math.floor(ms / 3600000)).padStart(2, "0")}:${String(Math.floor(ms / 60000) % 60).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`;
for (const shot of shots) {
  const name = `Scene${String(shot.n).padStart(2, "0")}`;
  const lines = captions[name];
  assert.equal(
    lines.map((c) => c.text).join(""),
    shot.cues.map((c) => c[3]).join(""),
    `${name}: dialogue must match formal script including punctuation`,
  );
  let previous = 0;
  for (const line of lines) {
    assert.ok(
      line.startMs >= previous && line.endMs > line.startMs,
      "Captions may not overlap",
    );
    assert.ok(
      shot.cues.some(
        (c) => line.startMs >= c[0] * 1000 && line.endMs <= c[1] * 1000,
      ),
      "Caption outside original voice window",
    );
    assert.ok(
      Array.from(line.text).length <= 22,
      "Caption exceeds formal single-line reading limit",
    );
    previous = line.endMs;
    blocks.push(
      `${++count}\n${time(line.startMs + shot.start * 1000)} --> ${time(line.endMs + shot.start * 1000)}\n${line.text}\n`,
    );
  }
  assert.equal(shot.dur, 10);
}
assert.equal(
  shots.reduce((a, s) => a + s.dur, 0),
  40,
);
const originals = {
  "xiaohe.png":
    "44be9dcf471b507ea56d06cc9d59b0a9db5489752d22b21aea04a858b1e51e35",
  "laozhou.png":
    "862d7f9ede3039f3079dd1ffc4c8018921b31164b55f6f68010d072219a1bbc8",
  "yucun_villagers_group.png":
    "c18f83a53bcc9bc95ee6a68a7475871ab79aec1af8266af710db682eb895a55a",
};
for (const [name, sha] of Object.entries(originals))
  assert.equal(
    crypto
      .createHash("sha256")
      .update(fs.readFileSync(path.join(app, "public/assets/characters", name)))
      .digest("hex"),
    sha,
    "Original PNG changed",
  );
const wav = fs.readFileSync(
  path.join(app, "public/assets/audio/act01-foley.wav"),
);
assert.equal(wav.toString("ascii", 0, 4), "RIFF");
assert.equal(wav.readUInt32LE(24), 48000);
assert.equal(wav.readUInt16LE(22), 2);
assert.equal(wav.readUInt32LE(40), 40 * 48000 * 2 * 2);
if (process.argv.includes("--write-srt")) {
  const out = path.join(app, "out/act01");
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, "Act01Demo.srt"), blocks.join("\n"));
}
console.log(
  `Act01 script check passed: four 10s scenes / 1200 planned frames; ${count} exact-caption segments within original voice windows; three original PNGs unchanged; 40s original non-vocal foley.`,
);
