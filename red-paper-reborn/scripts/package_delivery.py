from pathlib import Path
import zipfile
root=Path(__file__).resolve().parents[1]
delivery=root.parent/'delivery'
delivery.mkdir(exist_ok=True)
target=delivery/'RedPaperReborn-Act01.zip'
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as archive:
    for item in sorted(root.rglob('*')):
        if not item.is_file(): continue
        rel=item.relative_to(root)
        if rel.as_posix() in ['public/assets/fonts/fangsong.ttf','out/keyframes/scene03-end.png']: continue
        if any(p in ['node_modules','.git','.cache','__pycache__','.remotion'] for p in rel.parts): continue
        if rel.parts[0]=='out' and (len(rel.parts)<2 or rel.parts[1] not in ['keyframes','Act01Demo.mp4','storyboard.jpg','verification.json']): continue
        if item.suffix in ['.log','.tmp','.raw']: continue
        archive.write(item,Path('red-paper-reborn')/rel)
print(str(target))
print(f'{target.stat().st_size/1024/1024:.2f} MiB')
