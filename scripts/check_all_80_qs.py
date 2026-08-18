import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/nest_2025_raw_dump.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

# Page 2 to 21 -> Biology 1 to 20
# Page 22 to 41 -> Chemistry 1 to 20
# Page 42 to 61 -> Mathematics 1 to 20
# Page 62 to 81 -> Physics 1 to 20

subject_ranges = [
    ("Biology", 2, 21),
    ("Chemistry", 22, 41),
    ("Mathematics", 42, 61),
    ("Physics", 62, 81),
]

for subject, start_p, end_p in subject_ranges:
    print(f"\n==================== {subject} (Pages {start_p} to {end_p}) ====================")
    for p_num in range(start_p, end_p + 1):
        page = pages[p_num - 1]
        q_idx = p_num - start_p + 1
        has_imgs = [img["src"] for img in page["images"]]
        img_str = f" | Images: {has_imgs}" if has_imgs else ""
        
        # first line
        lines = [l.strip() for l in page["text"].split("\n") if l.strip()]
        first_few = " ".join(lines[:2])
        print(f"Q{q_idx:02d} (Pg {p_num:2d}): {first_few[:80]}...{img_str}")
