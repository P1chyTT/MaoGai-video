import os
from content import OUT
import sys, os, importlib.util
from pathlib import Path
base=Path(__file__).resolve().parent
runtime=Path(os.environ['CODEX_DOC_RUNTIME'])
os.environ['PATH']=str(runtime/'native/poppler/Library/bin')+os.pathsep+os.environ['PATH']
source=Path(os.environ['DOCX_RENDER_HELPER'])
spec=importlib.util.spec_from_file_location('docx_renderer',source)
r=importlib.util.module_from_spec(spec);spec.loader.exec_module(r)
def word_pdf(doc_path,user_profile,out_dir,stem,verbose=False):
    pdf=base/'word-proof.pdf'
    if not pdf.exists():raise FileNotFoundError(pdf)
    return str(pdf),'Native Microsoft Word PDF export; packaged Poppler rasterization'
r.convert_to_pdf=word_pdf
sys.argv=[str(source),str(OUT),'--output_dir',str(base/'render'),'--dpi','110']
r.main()
