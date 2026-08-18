import json
import re

with open("content/nest/mocks/nest/nest-pyq-2024-s1.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for q in data["questions"]:
    if q["id"] == "bio-2024-s1-q02":
        print(f"ID: {q['id']}")
        print(f"QuestionText: {q['questionText']}")
        print(f"Images: {q.get('images')}")
        print(f"ImageSrc: {q.get('imageSrc')}")
        md_imgs = re.findall(r'!\[.*?\]\(.*?\)', q['questionText'])
        print(f"Markdown images inside questionText: {len(md_imgs)}")
        print(f"Images in array: {len(q.get('images', []))}")
