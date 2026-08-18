import os
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

dup_count = 0
for root, dirs, files in os.walk("content"):
    for f in files:
        if f.endswith(".json"):
            path = os.path.join(root, f)
            try:
                with open(path, "r", encoding="utf-8") as jf:
                    data = json.load(jf)
                    
                qs = data.get("questions", []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
                for q in qs:
                    if not isinstance(q, dict):
                        continue
                    q_text = str(q.get("questionText", "") or q.get("text", ""))
                    has_md_img = bool(re.search(r'!\[.*?\]\(.*?\)', q_text))
                    images = q.get("images", []) or []
                    imageSrc = q.get("imageSrc")
                    
                    # Check duplicate in images array
                    if len(images) > 1:
                        print(f"[{path}] Q: {q.get('id')} has {len(images)} images in array: {images}")
                        dup_count += 1
                    elif has_md_img and (imageSrc or images):
                        print(f"[{path}] Q: {q.get('id')} has both markdown img in questionText AND imageSrc/images!")
                        dup_count += 1
            except Exception as e:
                pass

print(f"\nTotal potential duplicate image occurrences found: {dup_count}")
