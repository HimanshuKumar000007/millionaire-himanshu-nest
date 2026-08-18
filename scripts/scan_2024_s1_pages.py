import os
import sys
import pymupdf
import json

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2024 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

# Let's inspect page by page from Page 1 to 84
pages_data = []
for p in range(84):
    page = doc[p]
    txt = page.get_text().strip()
    img_list = page.get_images()
    drawings = page.get_drawings()
    pages_data.append({
        "page": p + 1,
        "text": txt,
        "images_count": len(img_list),
        "drawings_count": len(drawings)
    })

print(f"Scanned {len(pages_data)} pages.")

# Let's identify image questions
image_pages = []
for pd in pages_data:
    if pd["images_count"] > 0 or pd["drawings_count"] > 10:
        image_pages.append(pd["page"])

print(f"Pages with images/drawings ({len(image_pages)} pages): {image_pages}")

# Print question numbers and snippets from Page 1 to 84
for p in range(84):
    txt = doc[p].get_text().strip()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    header = lines[0] if lines else "[EMPTY]"
    has_img = len(doc[p].get_images()) > 0
    print(f"Page {p+1:02d} (Img: {has_img}): {header[:90]}")
