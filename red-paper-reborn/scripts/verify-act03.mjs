import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
const app = path.resolve(import.meta.dirname, "..");
const repo = path.resolve(app, "..");
const shots = JSON.parse(
  fs.readFileSync(path.join(repo, "docs/视频脚本/源码/shots.json"), "utf8"),
).slice(8, 12);
const captions = JSON.parse(
  fs.readFileSync(path.join(app, "src/scenes/act03/captions.json"), "utf8"),
);
assert.deepEqual(
  shots.map((s) => s.dur),
  [12, 13, 12, 13],
);
assert.deepEqual(
  shots.map((s) => s.start * 30),
  [2700, 3060, 3450, 3810],
);
assert.deepEqual(
  shots.map((s) => (s.start - 90) * 30),
  [0, 360, 750, 1110],
);
let count = 0;
const local = [],
  global = [];
const time = (ms) =>
  `${String(Math.floor(ms / 3600000)).padStart(2, "0")}:${String(Math.floor(ms / 60000) % 60).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`;
for (const shot of shots) {
  const name = `Scene${String(shot.n).padStart(2, "0")}`;
  const rows = captions[name];
  assert.equal(
    rows.map((c) => c.text).join(""),
    shot.cues.map((c) => c[3]).join(""),
    `${name}: original dialogue differs`,
  );
  let last = 0;
  for (const c of rows) {
    assert.ok(
      c.startMs >= last && c.endMs > c.startMs,
      "Overlapping subtitle timing",
    );
    assert.ok(
      shot.cues.some((q) => c.startMs >= q[0] * 1000 && c.endMs <= q[1] * 1000),
      "Outside original voice window",
    );
    assert.ok(Array.from(c.text).length <= 22, "Subtitle too long");
    last = c.endMs;
    count++;
    local.push(
      `${count}\n${time(c.startMs + (shot.start - 90) * 1000)} --> ${time(c.endMs + (shot.start - 90) * 1000)}\n${c.text}\n`,
    );
    global.push(
      `${count}\n${time(c.startMs + shot.start * 1000)} --> ${time(c.endMs + shot.start * 1000)}\n${c.text}\n`,
    );
  }
}
const wav = fs.readFileSync(
  path.join(app, "public/assets/audio/act03-foley.wav"),
);
assert.equal(wav.toString("ascii", 0, 4), "RIFF");
assert.equal(wav.readUInt32LE(24), 48000);
assert.equal(wav.readUInt16LE(22), 2);
assert.equal(wav.readUInt32LE(40), 50 * 48000 * 2 * 2);
const preservation = path.join(
  app,
  "out/act03/previous-acts-preservation.json",
);
let protectedFiles = null;
if (fs.existsSync(preservation)) {
  const before = JSON.parse(fs.readFileSync(preservation, "utf8"));
  for (const [file, sha] of Object.entries(before))
    assert.equal(
      crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.join(repo, file)))
        .digest("hex"),
      sha,
      `Previous act changed: ${file}`,
    );
  protectedFiles = Object.keys(before).length;
}
if (process.argv.includes("--write-srt")) {
  const out = path.join(app, "out/act03");
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, "Act03Demo.srt"), local.join("\n"));
  fs.writeFileSync(path.join(out, "Act03Demo-global.srt"), global.join("\n"));
}
console.log(
  `Act03 verified: [12,13,12,13] seconds / 1500 frames; ${count} exact-caption segments within original voice windows; 50s non-vocal foley; protected previous-act files unchanged: ${protectedFiles ?? "baseline not present in this checkout"}.`,
);
