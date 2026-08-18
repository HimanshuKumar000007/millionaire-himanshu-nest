import pymupdf
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2024 pyq session 2.pdf"
doc = pymupdf.open(pdf_path)

print(f"Opened PDF: {pdf_path}")
print(f"Total Pages: {len(doc)}")

# Check pages
for i in range(min(len(doc), 100)):
    page = doc[i]
    txt = page.get_text().strip()
    first_line = txt.split('\n')[0] if txt else "[EMPTY]"
    has_img = len(page.get_images()) > 0 or len(page.get_drawings()) > 10
    print(f"Page {i+1:02d} (Img/Draw: {has_img}): {first_line[:90]}")
