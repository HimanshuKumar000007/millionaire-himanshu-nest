import pymupdf
import sys
import os
import json
import re
import cloudinary
import cloudinary.uploader
from PIL import Image, ImageChops

sys.stdout.reconfigure(encoding='utf-8')

# Configure Cloudinary
cloudinary.config(
    cloud_name='dhb8qmnxt',
    api_key='765898971433311',
    api_secret='G2VwK8LpxSzAimI95EaebadJXwk'
)

pdf_path = r"d:\nest-pyq\2020 session 1.pdf"
doc = pymupdf.open(pdf_path)

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2020_s1")
os.makedirs(output_img_dir, exist_ok=True)

# Extract embedded images and filter out small UI icons (like radio buttons / checkmarks)
extracted = []
cld_uploaded = {}

for p_idx, page in enumerate(doc):
    image_list = page.get_images()
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        w = base_image["width"]
        h = base_image["height"]
        
        # Only keep meaningful diagram images (skip tiny checkmark icons < 40px)
        if w > 60 and h > 40:
            image_bytes = base_image["image"]
            ext = base_image["ext"]
            fname = f"p{p_idx+1}_img{img_idx+1}_{xref}.{ext}"
            fpath = os.path.join(output_img_dir, fname)
            with open(fpath, "wb") as f:
                f.write(image_bytes)
            
            pub_id = f"nest_2020_s1_{os.path.splitext(fname)[0]}"
            try:
                res = cloudinary.uploader.upload(
                    fpath,
                    folder="nest_pyqs/2020_s1",
                    public_id=pub_id,
                    overwrite=True,
                    resource_type="image"
                )
                cld_uploaded[fname] = res.get("secure_url")
                print(f"Page {p_idx+1} ({w}x{h}): {fname} -> {res.get('secure_url')}")
                sys.stdout.flush()
            except Exception as e:
                print(f"Upload error {fname}: {e}")

with open(os.path.join(os.getcwd(), "scripts", "cloudinary_2020_s1_mapping.json"), "w", encoding="utf-8") as f:
    json.dump(cld_uploaded, f, indent=2)

print(f"\nUploaded {len(cld_uploaded)} diagrams to Cloudinary for NEST 2020 Session 1!")
