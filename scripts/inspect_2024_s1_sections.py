import os
import sys
import pymupdf
import json

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2024 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

# Let's inspect page ranges for English section (Pages 1 to 88)
# Find section header pages
sections = {}
for i in range(88):
    page = doc[i]
    txt = page.get_text().strip()
    first_few = txt[:150]
    if "Bio" in first_few and "2024" in first_few:
        sections["Biology"] = i + 1
    elif "Chem" in first_few and ("Set" in first_few or "2024" in first_few):
        sections["Chemistry"] = i + 1
    elif "Math" in first_few and ("Set" in first_few or "2024" in first_few):
        sections["Mathematics"] = i + 1
    elif "Phy" in first_few and ("Set" in first_few or "2024" in first_few):
        sections["Physics"] = i + 1

print("Detected sections starting pages:", sections)

for sname, spage in sections.items():
    print(f"\n==================== {sname} (Page {spage}) ====================")
    for p in range(spage - 1, min(spage + 22, 88)):
        txt = doc[p].get_text().strip()
        lines = [l.strip() for l in txt.split('\n') if l.strip()]
        first_line = lines[0] if lines else ""
        print(f"Page {p+1}: {first_line[:80]}")
