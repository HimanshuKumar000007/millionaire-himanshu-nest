import os
import json
import re

for mock_file in [
    "content/nest/mocks/nest/nest-pyq-2025.json",
    "content/nest/mocks/nest/nest-pyq-2024-s1.json",
    "content/nest/mocks/nest/nest-pyq-2024-s2.json",
    "content/nest/mocks/nest/nest-pyq-2023-s1.json",
    "content/nest/mocks/nest/nest-pyq-2022-s1.json",
    "content/nest/mocks/nest/nest-pyq-2022-s2.json",
]:
    with open(mock_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    issues = 0
    for q in data["questions"]:
        q_text = q.get("questionText", "") or ""
        md_imgs = re.findall(r'!\[.*?\]\(.*?\)', q_text)
        imgs = q.get("images") or []
        if len(imgs) > 1 or (len(md_imgs) > 0 and len(imgs) > 0):
            print(f"[{mock_file}] Question {q.get('id')} has {len(imgs)} imgs and {len(md_imgs)} md_imgs")
            issues += 1
            
    print(f"{mock_file}: {issues} duplicate issues found.")
