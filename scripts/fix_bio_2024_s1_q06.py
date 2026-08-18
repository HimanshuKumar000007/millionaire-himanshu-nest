import os
import json

for root, dirs, files in os.walk("content"):
    for f in files:
        if f.endswith(".json"):
            p = os.path.join(root, f)
            try:
                with open(p, "r", encoding="utf-8") as jf:
                    data = json.load(jf)
                qs = data.get("questions", []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
                changed = False
                for q in qs:
                    if q.get("id") == "bio-2024-s1-q06":
                        if q.get("images"):
                            q["images"] = []
                            q["imageSrc"] = None
                            q["isImageBased"] = True
                            changed = True
                if changed:
                    with open(p, "w", encoding="utf-8") as jf:
                        json.dump(data, jf, indent=2, ensure_ascii=False)
                    print(f"Cleaned bio-2024-s1-q06 in {p}")
            except Exception as e:
                pass
