import pymupdf
import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

print(f"Opened PDF: {pdf_path}")
print(f"Total Pages: {len(doc)}")

output_audit = []

for p_idx, page in enumerate(doc):
    page_num = p_idx + 1
    text = page.get_text()
    img_list = page.get_images()
    drawings = page.get_drawings()
    
    # Extract questions on this page
    q_matches = re.findall(r'(?:^|\n)\s*(\d+)\.\s+', text)
    
    # Details of images on this page
    imgs_info = []
    for img_idx, img in enumerate(img_list):
        xref = img[0]
        base_img = doc.extract_image(xref)
        w = base_img["width"]
        h = base_img["height"]
        imgs_info.append({"idx": img_idx + 1, "xref": xref, "w": w, "h": h, "ext": base_img["ext"]})
        
    output_audit.append({
        "page": page_num,
        "questions_mentioned": q_matches,
        "images_count": len(img_list),
        "drawings_count": len(drawings),
        "images": imgs_info,
        "text_snippet": text.strip()[:200].replace('\n', ' // ')
    })

print(json.dumps(output_audit, indent=2))
