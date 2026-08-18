import pymupdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Inspect 2019.pdf pages 1-10
doc2019 = pymupdf.open(r"d:\nest-pyq\2019.pdf")
print("=== 2019.pdf Page Samples ===")
for p in range(min(5, len(doc2019))):
    page = doc2019[p]
    imgs = page.get_images()
    print(f"Page {p+1}: {len(imgs)} images, Text length: {len(page.get_text())}")
    print(f"  First 150 chars: {repr(page.get_text()[:150])}")

# Inspect 2020 session 1 sections
doc2020_1 = pymupdf.open(r"d:\nest-pyq\2020 session 1.pdf")
print("\n=== 2020 Session 1 Section Headers ===")
for p in range(len(doc2020_1)):
    t = doc2020_1[p].get_text()
    for line in t.splitlines():
        if "Section" in line or "Subject" in line or "Q." in line:
            print(f"Page {p+1}: {line.strip()}")
