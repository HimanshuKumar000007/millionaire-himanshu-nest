import json
import re
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/nest_2025_raw_dump.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

print("Verifying mathematics questions from pages 42 to 61...")
for p_num in range(42, 62):
    p = pages[p_num - 1]
    q_num = p_num - 41
    print(f"=== Math Q{q_num:02d} (Page {p_num}) ===")
    print(p["text"][:300])
    if p["images"]:
        print("Images:", [img["src"] for img in p["images"]])
    print()
