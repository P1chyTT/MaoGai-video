from pathlib import Path
import argparse, shutil, json, hashlib, random

parser=argparse.ArgumentParser(description='Prepare optional local assets without depending on the original computer.')
parser.add_argument('--characters-dir',type=Path,help='Directory containing the four original PNG files. Omit to validate bundled assets.')
parser.add_argument('--font',type=Path,help='Optional locally licensed FangSong font; never committed to Git.')
args=parser.parse_args()

ROOT=Path(__file__).resolve().parents[1]
asset=ROOT/'public/assets'
for name in ['characters','backgrounds','props','motifs','audio','fonts']:
    (asset/name).mkdir(parents=True,exist_ok=True)
manifest_path=asset/'characters/SOURCES.json'
manifest=json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else {}
for name in ['grandma','youth','xiaolin','merchant']:
    target=asset/'characters'/(name+'.png')
    if args.characters_dir:
        shutil.copyfile(args.characters_dir/(name+'.png'),target)
    digest=hashlib.sha256(target.read_bytes()).hexdigest()
    if name in manifest and not args.characters_dir:
        assert digest==manifest[name]['sha256'], f'Asset changed: {name}'
    manifest[name]={'source':f'user-provided/{name}.png','sha256':digest,'modified':False}
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
rng=random.Random(43)
fibers=[]
for i in range(1100):
    x,y=rng.uniform(0,960),rng.uniform(0,540)
    fibers.append(f'<path d="M{x:.1f} {y:.1f}l{rng.uniform(1,9):.1f} {rng.uniform(-2,2):.1f}"/>')
grain='<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540"><g stroke="#71553c" stroke-width=".45" opacity=".6">'+''.join(fibers)+'</g></svg>'
(asset/'backgrounds/paper-grain.svg').write_text(grain,encoding='utf-8')
if args.font:
    shutil.copyfile(args.font,asset/'fonts/fangsong.ttf')
(ROOT/'out/keyframes').mkdir(parents=True,exist_ok=True)
print('Bundled character hashes checked; deterministic grain prepared; optional font imported if supplied.')
