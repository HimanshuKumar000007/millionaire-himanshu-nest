import pymupdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2024 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

# Inspect Page 7 and Page 8
page7 = doc[6] # 0-indexed Page 7
page8 = doc[7] # 0-indexed Page 8

print("=== Page 7 Text ===")
print(page7.get_text())

print("\n=== Page 7 Drawings & Rects ===")
for d in page7.get_drawings():
    print(d.get("rect"))

print("\n=== Page 8 Text ===")
print(page8.get_text())

print("\n=== Page 8 Drawings & Rects ===")
for d in page8.get_drawings():
    print(d.get("rect"))
