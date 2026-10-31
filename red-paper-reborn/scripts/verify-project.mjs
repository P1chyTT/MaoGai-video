import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const app=path.resolve(import.meta.dirname,'..');const repo=path.resolve(app,'..');
const scripts=path.join(repo,'docs/视频脚本');
const record=JSON.parse(fs.readFileSync(path.join(scripts,'来源记录.json'),'utf8'));
const word=fs.readFileSync(path.join(scripts,record.word));
assert.equal(crypto.createHash('sha256').update(word).digest('hex'),record.word_sha256,'Primary Word script differs from provenance');
const shots=JSON.parse(fs.readFileSync(path.join(scripts,'源码/shots.json'),'utf8'));
assert.equal(shots.length,24);let seconds=0;const acts=[0,0,0,0,0,0];
for(const [i,shot] of shots.entries()){
 assert.equal(shot.n,i+1);assert.equal(shot.start,seconds);assert.equal(shot.end,seconds+shot.dur);assert.ok(Number.isInteger(shot.dur)&&shot.dur>0);
 assert.equal(shot.act,Math.floor(i/4)+1);acts[shot.act-1]+=shot.dur;seconds=shot.end;
 for(const cue of shot.cues)assert.ok(cue[0]>=0&&cue[1]>cue[0]&&cue[1]<=shot.dur);
}
assert.equal(seconds,300);assert.deepEqual(acts,[40,50,50,50,60,50]);
function scan(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())scan(file);else if(/\.(tsx?|json)$/.test(file)){const text=fs.readFileSync(file,'utf8');for(const old of ['grandma.png','xiaolin.png','merchant.png','youth.png','Act01Demo','红纸新生'])assert.ok(!text.includes(old),`Former story reference in ${path.relative(app,file)}`);}}}
scan(path.join(app,'src'));
for(let i=1;i<=6;i++)assert.ok(fs.existsSync(path.join(app,`src/scenes/act0${i}/README.md`)));
for(const who of ['laozhou','xiaohe','crowd'])assert.ok(fs.existsSync(path.join(app,`public/assets/characters/${who}/README.md`)));
console.log('Project integrity passed: primary script hash, 24 planned shots / 300s / 9000 frames, no former story references. Formal shots remain unimplemented.');
