import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Load Cloudinary map
mapping_path = os.path.join(os.getcwd(), "scripts", "cloudinary_2023_s1_mapping.json")
with open(mapping_path, "r", encoding="utf-8") as f:
    cld_map = json.load(f)

# Helper to find image
def get_img(page_num, img_num=1):
    for k, v in cld_map.items():
        if f"page_{page_num}_img_{img_num}" in k:
            return v
    for k, v in cld_map.items():
        if f"page_{page_num}_" in k:
            return v
    return None

print(f"Loaded {len(cld_map)} Cloudinary images for 2023 S1.")

# Let's inspect the Chemistry, Math, and Physics questions from extracted text
txt_path = os.path.join(os.getcwd(), "scripts", "2023_s1_full_extracted_text.txt")
with open(txt_path, "r", encoding="utf-8") as f:
    full_text = f.read()

# Let's write the comprehensive compilation script for all 68 questions
