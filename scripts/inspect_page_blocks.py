import pymupdf
import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2022 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

# Let's inspect the exact layout of text and images on Page 2 and Page 3
page2 = doc[1]
page2_text = page2.get_text("blocks")
print("Page 2 blocks:")
for b in page2_text:
    print(b)

page2_imgs = page2.get_images()
print("\nPage 2 images:")
for im in page2_imgs:
    print(im)
