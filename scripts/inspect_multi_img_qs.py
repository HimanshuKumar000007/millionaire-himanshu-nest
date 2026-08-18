import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for path, qid in [
    ("content/nest/mocks/nest/nest-pyq-2024-s1.json", "bio-2024-s1-q06"),
    ("content/nest/mocks/nest/nest-pyq-2023-s1.json", "bio-2023-s1-q15"),
]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    for q in data["questions"]:
        if q.get("id") == qid:
            print(f"=== {qid} in {path} ===")
            print(f"Question text: {q.get('questionText')[:100]}")
            print(f"Images: {q.get('images')}")
            for opt in q.get("options", []):
                print(f"  Option {opt.get('id')}: {opt.get('text')}")
