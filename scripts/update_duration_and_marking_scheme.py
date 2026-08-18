import os
import sys
import json
import glob

sys.stdout.reconfigure(encoding='utf-8')

# Target files for 2023 S1
target_files = [
    os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2023-s1.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2023_s1", "nest_2023_session_1_full_paper.json"),
    os.path.join(r"d:\nest-pyq\jsons\2023_s1\nest_2023_session_1_full_paper.json"),
]

# Also update individual subject JSONs
sub_files = glob.glob("content/nest/jsons/2023_s1/*.json") + glob.glob("content/nest/*/pyqs/nest-2023-s1-*.json") + glob.glob(r"d:\nest-pyq\jsons\2023_s1\*.json")

all_files = list(set(target_files + sub_files))

for fpath in all_files:
    if not os.path.exists(fpath):
        continue
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        # Update full paper attributes if present
        if "durationMinutes" in data:
            data["durationMinutes"] = 180
        
        if "instructions" in data:
            data["instructions"] = [
                "Duration: 3 hours (180 minutes).",
                "Total questions: 68 (17 Biology, 17 Chemistry, 17 Mathematics, 17 Physics).",
                "Marking Scheme: MCQs (+3, -1), MSQs (+4, 0). Best 3 of 4 subjects evaluated."
            ]
        
        # Calculate total marks if questions are present
        qs = data.get("questions", [])
        for q in qs:
            if q.get("questionType") == "MCQ":
                q["marks"] = 3.0
                q["negativeMarks"] = 1.0
            elif q.get("questionType") == "MSQ":
                q["marks"] = 4.0
                q["negativeMarks"] = 0.0

        if "totalMarks" in data and len(qs) == 68:
            # 12 MCQs * 3 = 36, 5 MSQs * 4 = 20 => 56 marks per subject * 4 = 224
            data["totalMarks"] = 224
            data["evalMarks"] = 168

        with open(fpath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"Updated {fpath}")
    except Exception as e:
        print(f"Error updating {fpath}: {e}")

print("\nSuccessfully updated duration to 3 hours (180 mins) and MCQ marking scheme to +3 / -1!")
