import pymupdf
import sys
import os
import json
import re
import cloudinary
import cloudinary.uploader

sys.stdout.reconfigure(encoding='utf-8')

# Configure Cloudinary
cloudinary.config(
    cloud_name='dhb8qmnxt',
    api_key='765898971433311',
    api_secret='G2VwK8LpxSzAimI95EaebadJXwk'
)

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2018")
os.makedirs(output_img_dir, exist_ok=True)

cld_uploaded = {}

for fname in os.listdir(output_img_dir):
    if fname.endswith((".png", ".jpeg", ".jpg")):
        fpath = os.path.join(output_img_dir, fname)
        pub_id = f"nest_2018_{os.path.splitext(fname)[0]}"
        try:
            res = cloudinary.uploader.upload(
                fpath,
                folder="nest_pyqs/2018",
                public_id=pub_id,
                overwrite=True,
                resource_type="image"
            )
            cld_uploaded[fname] = res.get("secure_url")
            print(f"{fname} -> {res.get('secure_url')}")
            sys.stdout.flush()
        except Exception as e:
            print(f"Upload error {fname}: {e}")

with open(os.path.join(os.getcwd(), "scripts", "cloudinary_2018_mapping.json"), "w", encoding="utf-8") as f:
    json.dump(cld_uploaded, f, indent=2)

print(f"\nUploaded {len(cld_uploaded)} diagrams to Cloudinary for NEST 2018!")
