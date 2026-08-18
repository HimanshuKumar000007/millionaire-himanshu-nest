import pymupdf
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
dst_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2023_s1")
os.makedirs(dst_dir, exist_ok=True)

doc = pymupdf.open(pdf_path)
extracted = 0

for p_idx, page in enumerate(doc):
    page_num = p_idx + 1
    for img_idx, img in enumerate(page.get_images()):
        xref = img[0]
        base_img = doc.extract_image(xref)
        img_bytes = base_img["image"]
        ext = base_img["ext"]
        
        # Consistent naming
        fname = f"nest_2023_s1_page_{page_num}_img_{img_idx+1}_{xref}.{ext}"
        fpath = os.path.join(dst_dir, fname)
        with open(fpath, "wb") as fp:
            fp.write(img_bytes)
        extracted += 1
        print(f"Extracted: {fname} ({base_img['width']}x{base_img['height']})")

print(f"\nExtracted {extracted} images directly to {dst_dir}")
