import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

app_mocks_dir = os.path.join(os.getcwd(), "content", "nest", "mocks", "nest")
os.makedirs(app_mocks_dir, exist_ok=True)

pyq_sources = [
    {
        "id": "nest-pyq-2018",
        "year": 2018,
        "session": 1,
        "shift": "Official Full Paper",
        "title": "NEST 2018 Official Previous Year Paper",
        "src": r"d:\nest-pyq\jsons\2018\nest_2018_full_paper.json",
        "duration": 210,
        "badge": "Official 2018 PYQ"
    },
    {
        "id": "nest-pyq-2019-s1",
        "year": 2019,
        "session": 1,
        "shift": "Session 1 • Shift 1 (Morning)",
        "title": "NEST 2019 (Session 1) Official Previous Year Paper",
        "src": r"d:\nest-pyq\jsons\2019\nest_2019_full_paper.json",
        "duration": 210,
        "badge": "2019 Session 1"
    },
    {
        "id": "nest-pyq-2020-s1",
        "year": 2020,
        "session": 1,
        "shift": "Session 1 • Shift 1 (Morning)",
        "title": "NEST 2020 (Session 1) Official Previous Year Paper",
        "src": r"d:\nest-pyq\jsons\2020_s1\nest_2020_session_1_full_paper.json",
        "duration": 210,
        "badge": "2020 Session 1"
    },
    {
        "id": "nest-pyq-2020-s2",
        "year": 2020,
        "session": 2,
        "shift": "Session 2 • Shift 2 (Afternoon)",
        "title": "NEST 2020 (Session 2) Official Previous Year Paper",
        "src": r"d:\nest-pyq\jsons\2020_s2\nest_2020_session_2_full_paper.json",
        "duration": 210,
        "badge": "2020 Session 2"
    }
]

for item in pyq_sources:
    if os.path.exists(item["src"]):
        with open(item["src"], "r", encoding="utf-8") as f:
            data = json.load(f)
            
        data["id"] = item["id"]
        data["title"] = item["title"]
        data["category"] = "Previous Year Paper"
        data["source"] = "official-pyq"
        data["status"] = "published"
        data["durationMinutes"] = item["duration"]
        data["totalMarks"] = 230
        data["evalMarks"] = 180
        data["instructions"] = [
            f"Duration: {item['duration']} minutes.",
            "General Section: 10 Questions (Mandatory, 30 Marks).",
            "Subject Sections: 15 Questions each for Physics, Chemistry, Mathematics, Biology (50 Marks each).",
            "Evaluation: General (30 Marks) + Best 3 of 4 Subjects (150 Marks) = 180 Marks Total Merit Score."
        ]
        
        # Save into content/nest/mocks/nest/
        dest_path = os.path.join(app_mocks_dir, f"{item['id']}.json")
        with open(dest_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            
        print(f"Compiled {item['id']} -> {len(data['questions'])} questions saved to {dest_path}")

print("\nSuccessfully prepared authentic 2018-2020 PYQ datasets!")
