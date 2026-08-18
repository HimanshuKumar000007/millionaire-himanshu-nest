import pymupdf
import sys
import os
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

print(f"Opened PDF: {pdf_path}")
print(f"Total Pages: {len(doc)}")

output_txt_path = os.path.join(os.getcwd(), "scripts", "2023_s1_full_extracted_text.txt")

with open(output_txt_path, "w", encoding="utf-8") as f:
    for i, page in enumerate(doc):
        text = page.get_text()
        f.write(f"\n\n{'='*30} PAGE {i+1} {'='*30}\n\n")
        f.write(text)

print(f"Saved full extracted text to {output_txt_path}")

# Also let's print the first 5 pages to inspect format
with open(output_txt_path, "r", encoding="utf-8") as f:
    lines = f.readlines()
    for l in lines[:100]:
        print(l, end='')
