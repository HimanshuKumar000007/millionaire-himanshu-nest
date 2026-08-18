import pymupdf
import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

# Extract raw text per page
pages_text = []
for p_idx, page in enumerate(doc):
    pages_text.append(page.get_text())

full_pdf_text = "\n".join(pages_text)

# Let's write a script that dumps each question from 1 to 68 in clean text format
out_path = os.path.join(os.getcwd(), "scripts", "all_68_questions_verbatim_dump.txt")

with open(out_path, "w", encoding="utf-8") as f:
    f.write(full_pdf_text)

print(f"Dumped complete text to {out_path}")
