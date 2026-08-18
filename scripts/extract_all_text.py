import pymupdf
import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

# Let's extract full text with page numbers
full_pdf_pages = []
for p_idx, page in enumerate(doc):
    full_pdf_pages.append({
        "page_num": p_idx + 1,
        "text": page.get_text()
    })

print(f"Loaded {len(full_pdf_pages)} pages from PDF.")

# Let's inspect questions 1 to 68 precisely
all_extracted_text = "\n".join([f"\n--- PAGE {p['page_num']} ---\n" + p['text'] for p in full_pdf_pages])

with open(os.path.join(os.getcwd(), "scripts", "all_extracted_text_annotated.txt"), "w", encoding="utf-8") as f:
    f.write(all_extracted_text)

print("Saved annotated text to scripts/all_extracted_text_annotated.txt")
