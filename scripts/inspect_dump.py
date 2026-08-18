import json

with open("scripts/nest_2025_raw_dump.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print("Total pages:", len(data))
for i in range(min(20, len(data))):
    p = data[i]
    print(f"=== PAGE {p['page']} (Images: {len(p['images'])}) ===")
    lines = [l.strip() for l in p["text"].split("\n") if l.strip()]
    for line in lines[:8]:
        print("  ", line)
    if len(lines) > 8:
        print(f"   ... ({len(lines)} lines total)")
    if p["images"]:
        for img in p["images"]:
            print(f"   [IMG]: {img['src']} ({img['width']}x{img['height']})")
    print()
