import os
import sys
import pymupdf

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2024 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

print(f"Opened PDF: {pdf_path}")
print(f"Total Pages: {len(doc)}")

# Check first few pages
for i in range(min(5, len(doc))):
    page = doc[i]
    print(f"\n--- Page {i+1} ---")
    txt = page.get_text()
    print(txt[:400] if txt else "[No text or scanned]")

# Scan all pages for section headers and question numbers
pages_meta = []
for i, page in enumerate(doc):
    txt = page.get_text()
    first_line = txt.strip().split('\n')[0] if txt.strip() else ""
    pages_meta.append((i+1, first_line, len(txt)))

print("\nPage outline sample:")
for p in pages_meta[:25]:
    print(f"Page {p[0]}: length={p[2]}, first_line={p[1]!r}")
