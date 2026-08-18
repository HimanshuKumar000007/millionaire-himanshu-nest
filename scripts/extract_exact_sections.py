import pymupdf
import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

# Let's extract each question block cleanly
pages_text = [page.get_text() for page in doc]
full_text = "\n".join(pages_text)

# Let's inspect Chemistry Q23 to Q34, Math Q35 to Q51, and Physics Q52 to Q68 from PDF
for q_num in range(23, 35):
    patt = rf'(?:^|\n)\s*{q_num}\.\s+([\s\S]*?)(?=(?:\n\s*{q_num+1}\.\s+)|\Z)'
    match = re.search(patt, full_text)
    if match:
        print(f"\n{'='*20} CHEM Q{q_num} {'='*20}\n")
        print(match.group(1).strip())

for q_num in range(35, 52):
    patt = rf'(?:^|\n)\s*{q_num}\.\s+([\s\S]*?)(?=(?:\n\s*{q_num+1}\.\s+)|\Z)'
    match = re.search(patt, full_text)
    if match:
        print(f"\n{'='*20} MATH Q{q_num} {'='*20}\n")
        print(match.group(1).strip())

for q_num in range(52, 69):
    patt = rf'(?:^|\n)\s*{q_num}\.\s+([\s\S]*?)(?=(?:\n\s*{q_num+1}\.\s+)|\Z)'
    match = re.search(patt, full_text)
    if match:
        print(f"\n{'='*20} PHY Q{q_num} {'='*20}\n")
        print(match.group(1).strip())
