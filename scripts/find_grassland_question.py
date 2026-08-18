import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

for root, dirs, files in os.walk("content"):
    for f in files:
        if f.endswith(".json"):
            path = os.path.join(root, f)
            try:
                with open(path, "r", encoding="utf-8") as jf:
                    text = jf.read()
                    if "grassland" in text.lower() or "biomass" in text.lower():
                        print(f"Found match in: {path}")
                        data = json.loads(text)
                        # Check questions
                        qs = data.get("questions", []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
                        for q in qs:
                            q_text = str(q.get("questionText", "") or q.get("text", "") or q.get("question", ""))
                            if "grassland" in q_text.lower() or "biomass" in q_text.lower():
                                print(f"  Q ID: {q.get('id')}")
                                print(f"  imageUrl: {q.get('imageUrl')}")
                                print(f"  diagramUrl: {q.get('diagramUrl')}")
                                print(f"  images: {q.get('images')}")
                                print(f"  cardImageUrl: {q.get('cardImageUrl')}")
                                print(f"  questionText: {q_text[:150]}")
            except Exception as e:
                pass
