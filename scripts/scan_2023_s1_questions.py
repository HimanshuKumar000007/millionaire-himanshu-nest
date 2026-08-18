import pymupdf
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

all_text = ""
for i, page in enumerate(doc):
    all_text += f"\n\n--- PAGE {i+1} ---\n\n" + page.get_text()

# Find all occurrences of Question numbers like "1.", "2.", "3.", etc. or subject headings
lines = all_text.split('\n')
q_headers = []
for idx, line in enumerate(lines):
    l = line.strip()
    if re.match(r'^(?:BIOLOGY|CHEMISTRY|MATHEMATICS|PHYSICS)\b', l, re.IGNORECASE):
        print(f"\n>>> SECTION HEADER: {l} (line {idx})")
    elif re.match(r'^\d+[\.\)]\s+', l):
        print(f"Question candidate: {l[:70]}")
