from pathlib import Path
p=Path('.codex-yucun-script/build.py');s=p.read_text(encoding='utf-8')
s=s.replace('from docx.enum.text import WD_ALIGN_PARAGRAPH','from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK')
s=s.replace('def page():doc.add_page_break()',"def page():\n    x=doc.add_paragraph(); x.paragraph_format.space_before=Pt(0); x.paragraph_format.space_after=Pt(0); x.paragraph_format.line_spacing=Pt(1)\n    r=x.add_run(); r.font.size=Pt(1); r.add_break(WD_BREAK.PAGE)")
p.write_text(s,encoding='utf-8')
