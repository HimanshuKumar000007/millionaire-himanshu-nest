import pymupdf
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

pdfs = [
    ("2018", r"d:\nest-pyq\2018.pdf"),
    ("2019", r"d:\nest-pyq\2019.pdf"),
    ("2020_s1", r"d:\nest-pyq\2020 session 1.pdf"),
    ("2020_s2", r"d:\nest-pyq\2020 session 2.pdf"),
]

for name, p in pdfs:
    if os.path.exists(p):
        doc = pymupdf.open(p)
        print(f"\n=== {name} PDF ({len(doc)} pages) ===")
        # inspect first 3 pages text
        for i in range(min(3, len(doc))):
            page_text = doc[i].get_text().strip()
            first_lines = "\n".join(page_text.splitlines()[:10])
            print(f"--- Page {i+1} ---")
            print(first_lines)
