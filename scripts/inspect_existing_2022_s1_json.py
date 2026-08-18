import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

json_path = os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2022-s1.json")
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Title: {data.get('title')}")
print(f"Duration: {data.get('durationMinutes')}")
print(f"Total Questions: {len(data.get('questions', []))}")

qs = data.get("questions", [])
for i, q in enumerate(qs[:17]):
    print(f"\n--- Q{i+1:02d} [{q.get('subject')} - {q.get('topic')} ({q.get('questionType')})] ---")
    print(f"Text: {q.get('questionText')[:120]}...")
    if q.get('imageSrc'):
        print(f"Image: {q.get('imageSrc')}")
    print("Options:")
    for opt in q.get('options', []):
        mark = "✓" if opt.get('isCorrect') else " "
        print(f"  [{mark}] [{opt['id'].upper()}] {opt['text'][:70]}")
