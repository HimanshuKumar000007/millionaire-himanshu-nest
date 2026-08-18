import pymupdf
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

print(f"Total Pages in {pdf_path}: {len(doc)}")

for page_idx in range(len(doc)):
    page_num = page_idx + 1
    page = doc[page_idx]
    text = page.get_text()
    print(f"\n{'='*30} PAGE {page_num} {'='*30}\n")
    print(text)
