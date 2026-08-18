import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("content/nest/mocks/nest/nest-pyq-2024-s1.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for q in data["questions"]:
    if q.get("id") == "bio-2024-s1-q02" or "grassland" in str(q).lower():
        print(json.dumps(q, indent=2))
