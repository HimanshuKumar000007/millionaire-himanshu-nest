import pymupdf
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2018.pdf"
doc = pymupdf.open(pdf_path)

print(f"Opened PDF: {pdf_path}")
print(f"Total Pages: {len(doc)}")

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2018")
os.makedirs(output_img_dir, exist_ok=True)

extracted = []
for p_idx, page in enumerate(doc):
    txt = page.get_text().strip()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    first_line = lines[0] if lines else "[EMPTY]"
    img_list = page.get_images()
    print(f"Page {p_idx+1:02d} ({len(img_list)} imgs): {first_line[:80]}")
    
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

print(f"\nTotal extracted diagram images from 2018.pdf: {len(extracted)}")
