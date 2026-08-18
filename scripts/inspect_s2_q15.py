import pymupdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2024 pyq session 2.pdf"
doc = pymupdf.open(pdf_path)

print("=== Page 16 (Q15 part 1) ===")
print(doc[15].get_text())

print("=== Page 17 (Q15 part 2) ===")
print(doc[16].get_text())
