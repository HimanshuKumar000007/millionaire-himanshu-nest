import pymupdf
import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2022 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

out_img_dir = r"d:\millionaire-at-22-nest-smartprep\public\images\pyqs\2022_s1"
os.makedirs(out_img_dir, exist_ok=True)

img_records = []
total_images = 0

for page_idx in range(len(doc)):
    page = doc[page_idx]
    image_list = page.get_images(full=True)
    
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        total_images += 1
        img_name = f"nest_2022_s1_page_{page_idx+1}_img_{img_idx+1}_{xref}.{image_ext}"
        img_path = os.path.join(out_img_dir, img_name)
        
        with open(img_path, "wb") as f:
            f.write(image_bytes)
            
        img_records.append({
            "page": page_idx + 1,
            "xref": xref,
            "filename": img_name,
            "size": len(image_bytes),
            "width": base_image.get("width"),
            "height": base_image.get("height")
        })

print(f"Extracted {total_images} images from 2022 Session 1 PDF into {out_img_dir}!")
print(f"First 20 extracted image records:")
for rec in img_records[:20]:
    print(f"  Page {rec['page']:02d} | {rec['filename']:40} | {rec['width']}x{rec['height']} ({rec['size']} bytes)")
