import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

for folder in ["2018", "2019", "2020_s1", "2020_s2"]:
    json_path = f"d:/nest-pyq/jsons/{folder}/nest_{folder.replace('_session_', '_session_').lower()}_full_paper.json"
    if not os.path.exists(json_path):
        # find matching file
        files = [f for f in os.listdir(f"d:/nest-pyq/jsons/{folder}") if "full_paper" in f]
        if files:
            json_path = f"d:/nest-pyq/jsons/{folder}/{files[0]}"
    
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            qs = data.get("questions", [])
            print(f"\n--- {folder} Full Paper ---")
            print(f"Title: {data.get('title')}")
            print(f"ID: {data.get('id')}")
            print(f"Total Questions: {len(qs)}")
            print(f"Duration: {data.get('durationMinutes')} mins")
            # Check image links in first 3 questions
            for q in qs[:3]:
                print(f"  Q: id={q.get('id')} | subject={q.get('subject')} | imageSrc={q.get('imageSrc')} | images={q.get('images')}")
