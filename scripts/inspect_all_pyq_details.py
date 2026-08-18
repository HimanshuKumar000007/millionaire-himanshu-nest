import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

years = [
    ("2018", r"d:\nest-pyq\jsons\2018\nest_2018_full_paper.json"),
    ("2019", r"d:\nest-pyq\jsons\2019\nest_2019_full_paper.json"),
    ("2020_s1", r"d:\nest-pyq\jsons\2020_s1\nest_2020_session_1_full_paper.json"),
    ("2020_s2", r"d:\nest-pyq\jsons\2020_s2\nest_2020_session_2_full_paper.json"),
]

for y, p in years:
    with open(p, "r", encoding="utf-8") as f:
        data = json.load(f)
        qs = data.get("questions", [])
        print(f"=== {y} ({len(qs)} questions) ===")
        print(f"Title: {data.get('title')}")
        print(f"Total marks: {data.get('totalMarks')}, Eval marks: {data.get('evalMarks')}")
        # sample question
        sample = qs[0]
        print(f"Sample Q1 ({sample.get('subject')}): {sample.get('questionText')[:100]}...")
        print(f"Options count: {len(sample.get('options', []))}")
        print(f"Correct option: {[opt['id'] for opt in sample.get('options', []) if opt.get('isCorrect')]}")
        print()
