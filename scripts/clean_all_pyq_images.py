import os
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

modified_files = 0
total_fixed_questions = 0

def extract_image_key(url):
    clean = url.split("?")[0].split("#")[0]
    parts = clean.split("/")
    return parts[-1].lower() if parts else url.lower()

for root, dirs, files in os.walk("content"):
    for f in files:
        if f.endswith(".json"):
            path = os.path.join(root, f)
            try:
                with open(path, "r", encoding="utf-8") as jf:
                    data = json.load(jf)
                
                is_dict = isinstance(data, dict)
                qs = data.get("questions", []) if is_dict else (data if isinstance(data, list) else [])
                file_changed = False
                
                for q in qs:
                    if not isinstance(q, dict):
                        continue
                    
                    changed = False
                    q_text = str(q.get("questionText", "") or q.get("text", "") or "")
                    
                    # Deduplicate images array
                    raw_images = q.get("images", [])
                    if isinstance(raw_images, list) and len(raw_images) > 0:
                        seen_keys = set()
                        unique_imgs = []
                        for img in raw_images:
                            if not img or not isinstance(img, str):
                                continue
                            k = extract_image_key(img)
                            if k not in seen_keys:
                                seen_keys.add(k)
                                unique_imgs.append(img)
                        
                        if len(unique_imgs) != len(raw_images):
                            q["images"] = unique_imgs
                            changed = True
                    
                    # Check if questionText has markdown image
                    md_matches = re.findall(r'!\[.*?\]\((.*?)\)', q_text)
                    if md_matches:
                        # If imageSrc or images is already present, remove the markdown image from questionText
                        # to prevent double/triple rendering!
                        cleaned_text = re.sub(r'!\[.*?\]\(.*?\)', '', q_text).strip()
                        # Clean up any leftover double newlines
                        cleaned_text = re.sub(r'\n{3,}', '\n\n', cleaned_text)
                        
                        if cleaned_text != q_text:
                            q["questionText"] = cleaned_text
                            changed = True
                            
                        # If q does not have imageSrc, add the first markdown image as imageSrc
                        if not q.get("imageSrc") and (not q.get("images") or len(q.get("images")) == 0):
                            q["imageSrc"] = md_matches[0]
                            q["images"] = [md_matches[0]]
                            q["isImageBased"] = True
                            changed = True

                    if changed:
                        total_fixed_questions += 1
                        file_changed = True
                
                if file_changed:
                    with open(path, "w", encoding="utf-8") as jf:
                        json.dump(data, jf, indent=2, ensure_ascii=False)
                    modified_files += 1
                    print(f"Fixed duplicate images in: {path}")

            except Exception as e:
                print(f"Error processing {path}: {e}")

print(f"\nCompleted! Fixed {total_fixed_questions} questions across {modified_files} files.")
