import os
import sys
import json
import glob

sys.stdout.reconfigure(encoding='utf-8')

mocks = glob.glob("content/nest/mocks/**/*.json", recursive=True)
for m in mocks:
    try:
        with open(m, "r", encoding="utf-8") as f:
            data = json.load(f)
            qs = data.get("questions", [])
            dur = data.get("durationMinutes")
            mcq_marks = set((q.get("marks"), q.get("negativeMarks")) for q in qs if q.get("questionType") == "MCQ")
            msq_marks = set((q.get("marks"), q.get("negativeMarks")) for q in qs if q.get("questionType") == "MSQ")
            print(f"{os.path.basename(m):30} | Duration: {dur} min | MCQ: {mcq_marks} | MSQ: {msq_marks}")
    except Exception as e:
        print(f"Error {m}: {e}")
