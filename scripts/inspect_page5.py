import os
import sys
import pymupdf

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2025 pyq.pdf"
doc = pymupdf.open(pdf_path)

# Let's inspect Page 5 (bio Q4)
page5 = doc[4] # 0-indexed page 5
print("Page 5 Rect:", page5.rect)

# Inspect all image blocks and text blocks on page 5
blocks = page5.get_text("blocks")
for b in blocks:
    print(f"Block rect: {b[:4]} -> Text: {b[4][:50]!r}")

# Inspect image instances
img_list = page5.get_images()
print("Images on page 5:", img_list)
for img in img_list:
    xref = img[0]
    bbox = page5.get_image_bbox(img)
    print(f"Image xref {xref} bbox: {bbox}")
