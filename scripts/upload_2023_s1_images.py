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

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2023_s1")
os.makedirs(output_img_dir, exist_ok=True)

# Question boundaries by page and question number (1 to 68)
# Extract all raw text by page
pages_text = [page.get_text() for page in doc]
full_doc_text = "\n".join(pages_text)

# Let's upload all extracted images from public/images/pyqs/2023_s1 to Cloudinary
cld_uploaded = {}
for fname in os.listdir(output_img_dir):
    if fname.endswith(".png"):
        local_path = os.path.join(output_img_dir, fname)
        pub_id = f"nest_2023_s1_{os.path.splitext(fname)[0]}"
        try:
            res = cloudinary.uploader.upload(
                local_path,
                folder="nest_pyqs/2023_s1",
                public_id=pub_id,
                overwrite=True,
                resource_type="image"
            )
            cld_uploaded[fname] = res.get("secure_url")
            print(f"Uploaded {fname} -> {res.get('secure_url')}")
            sys.stdout.flush()
        except Exception as e:
            print(f"Upload error {fname}: {e}")

with open(os.path.join(os.getcwd(), "scripts", "cloudinary_2023_s1_mapping.json"), "w", encoding="utf-8") as f:
    json.dump(cld_uploaded, f, indent=2)

print(f"\nUploaded {len(cld_uploaded)} images to Cloudinary!")
