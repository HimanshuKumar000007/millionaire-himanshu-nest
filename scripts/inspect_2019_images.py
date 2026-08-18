import pymupdf
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2019.pdf"
doc = pymupdf.open(pdf_path)

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2019")
os.makedirs(output_img_dir, exist_ok=True)

extracted = []
for p_idx, page in enumerate(doc):
    img_list = page.get_images()
    for img_idx, img in enumerate(img_list):
        xref = img[0]
        base_img = doc.extract_image(xref)
        w = base_img["width"]
        h = base_img["height"]
        if w > 60 and h > 40:
            ext = base_img["ext"]
            fname = f"p{p_idx+1}_img{img_idx+1}_{xref}.{ext}"
            fpath = os.path.join(output_img_dir, fname)
            with open(fpath, "wb") as f:
                f.write(base_img["image"])
            extracted.append({"page": p_idx + 1, "filename": fname, "width": w, "height": h})

print(f"Total extracted diagram images from 2019.pdf: {len(extracted)}")
for e in extracted[:20]:
    print(f"Page {e['page']}: {e['filename']} ({e['width']}x{e['height']})")
