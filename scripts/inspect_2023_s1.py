import pymupdf
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

print(f"Opened PDF: {pdf_path}")
print(f"Total Pages: {len(doc)}")

# Inspect first 100 pages
for i in range(min(len(doc), 100)):
    page = doc[i]
    txt = page.get_text().strip()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    first_line = lines[0] if lines else "[EMPTY]"
    has_img = len(page.get_images()) > 0 or len(page.get_drawings()) > 8
    print(f"Page {i+1:02d} (Img/Draw: {has_img}, Draw: {len(page.get_drawings())}, Img: {len(page.get_images())}): {first_line[:85]}")
