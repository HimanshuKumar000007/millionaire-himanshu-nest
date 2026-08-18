import os
import sys
import glob
import json
import time
import cloudinary
import cloudinary.uploader
import fitz # PyMuPDF
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

# Configure Cloudinary
cloudinary.config(
    cloud_name='dhb8qmnxt',
    api_key='765898971433311',
    api_secret='G2VwK8LpxSzAimI95EaebadJXwk'
)

print("Starting Cloudinary batch upload of 2025 PYQ images...")

# 1. Gather all extracted images in public/images/pyqs/2025
img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2025")
png_files = sorted(glob.glob(os.path.join(img_dir, "*.png")))

print(f"Found {len(png_files)} images to process and upload.")

uploaded_url_map = {}

for idx, file_path in enumerate(png_files):
    filename = os.path.basename(file_path)
    # e.g., page_5_img_1.png -> public_id: page_5_img_1
    public_id = os.path.splitext(filename)[0]
    rel_path = f"/images/pyqs/2025/{filename}"
    
    try:
        res = cloudinary.uploader.upload(
            file_path,
            folder="nest_pyqs/2025",
            public_id=public_id,
            overwrite=True,
            resource_type="image"
        )
        secure_url = res.get("secure_url")
        uploaded_url_map[rel_path] = secure_url
        print(f"[{idx+1}/{len(png_files)}] Uploaded {filename} -> {secure_url}")
    except Exception as e:
        print(f"Error uploading {filename}: {e}")
        time.sleep(1)

# Save the URL mapping to scratch
mapping_file = os.path.join(os.getcwd(), "scripts", "cloudinary_2025_urls.json")
with open(mapping_file, "w", encoding="utf-8") as f:
    json.dump(uploaded_url_map, f, indent=2)

print(f"\nAll uploads completed! Uploaded {len(uploaded_url_map)} images.")
print(f"Saved URL map to: {mapping_file}")

# 2. Update all JSON files with the Cloudinary URLs
json_files_to_update = [
    r"d:\nest-pyq\jsons\2025\nest_2025_full_paper.json",
    r"d:\nest-pyq\jsons\2025\biology.json",
    r"d:\nest-pyq\jsons\2025\chemistry.json",
    r"d:\nest-pyq\jsons\2025\mathematics.json",
    r"d:\nest-pyq\jsons\2025\physics.json",
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "nest_2025_full_paper.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "biology.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "chemistry.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "mathematics.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "physics.json"),
    os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2025.json"),
    os.path.join(os.getcwd(), "content", "nest", "biology", "pyqs", "nest-2025-bio.json"),
    os.path.join(os.getcwd(), "content", "nest", "chemistry", "pyqs", "nest-2025-chem.json"),
    os.path.join(os.getcwd(), "content", "nest", "mathematics", "pyqs", "nest-2025-math.json"),
    os.path.join(os.getcwd(), "content", "nest", "physics", "pyqs", "nest-2025-phy.json"),
]

def replace_urls_in_question(q):
    # imageSrc
    if q.get("imageSrc") in uploaded_url_map:
        q["imageSrc"] = uploaded_url_map[q["imageSrc"]]
    
    # images array
    if q.get("images"):
        q["images"] = [uploaded_url_map.get(img, img) for img in q["images"]]
        
    # questionText markdown
    q_text = q.get("questionText", "")
    for local_url, cld_url in uploaded_url_map.items():
        if local_url in q_text:
            q_text = q_text.replace(local_url, cld_url)
    q["questionText"] = q_text

    # options
    if q.get("options"):
        for opt in q["options"]:
            if opt.get("imageSrc") in uploaded_url_map:
                opt["imageSrc"] = uploaded_url_map[opt["imageSrc"]]
            opt_text = opt.get("text", "")
            for local_url, cld_url in uploaded_url_map.items():
                if local_url in opt_text:
                    opt_text = opt_text.replace(local_url, cld_url)
            opt["text"] = opt_text

for jf in json_files_to_update:
    if os.path.exists(jf):
        with open(jf, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        if isinstance(data, dict):
            if "questions" in data:
                for q in data["questions"]:
                    replace_urls_in_question(q)
            elif "id" in data and "questionText" in data:
                replace_urls_in_question(data)
        elif isinstance(data, list):
            for q in data:
                replace_urls_in_question(q)

        with open(jf, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Updated Cloudinary URLs in: {jf}")

print("\nAll JSON files successfully updated with live Cloudinary URLs!")
