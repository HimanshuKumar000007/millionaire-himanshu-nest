import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/nest_2025_raw_dump.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

# English pages: 0 to 80 (page 1 to 81)
for i in range(1, 82):
    p = pages[i - 1]
    print(f"==================== PAGE {p['page']} ====================")
    if p["images"]:
        for img in p["images"]:
            print(f"IMAGE: {img['src']} ({img['width']}x{img['height']})")
    print(p["text"])
    print()
