import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

json_targets = [
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

def clean_option_text(text):
    if not text:
        return ""
    # Remove leading stray letters like "B.\nC.\nD.\n\n", "C.\nD.\n\n", "D.\n\n", "(b)\n(c)\n", etc.
    cleaned = re.sub(r'^(?:[A-Da-d]\.\s*|\([a-da-d]\)\s*)+', '', text.strip()).strip()
    return cleaned

def process_question(q):
    if "options" in q and q["options"]:
        for opt in q["options"]:
            if "text" in opt:
                opt["text"] = clean_option_text(opt["text"])

for target in json_targets:
    if os.path.exists(target):
        with open(target, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        if isinstance(data, dict) and "questions" in data:
            for q in data["questions"]:
                process_question(q)
        elif isinstance(data, list):
            for q in data:
                process_question(q)
                
        with open(target, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Cleaned options in: {target}")

print("Option text cleaned up successfully!")
