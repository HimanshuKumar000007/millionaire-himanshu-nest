import pymupdf
import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2023_s1")
os.makedirs(output_img_dir, exist_ok=True)

# List all extracted images embedded in the PDF
extracted = []
for p_idx, page in enumerate(doc):
    image_list = page.get_images()
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_name = f"page_{p_idx+1}_img_{img_idx+1}_{xref}.{image_ext}"
        image_path = os.path.join(output_img_dir, image_name)
        with open(image_path, "wb") as f:
            f.write(image_bytes)
        extracted.append({
            "page": p_idx + 1,
            "xref": xref,
            "filename": image_name,
            "width": base_image["width"],
            "height": base_image["height"]
        })

print(f"Extracted {len(extracted)} embedded images:")
for e in extracted:
    print(f"Page {e['page']}: {e['filename']} ({e['width']}x{e['height']})")
