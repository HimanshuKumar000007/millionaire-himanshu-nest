import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/nest_2025_raw_dump.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

print(f"Total Pages: {len(pages)}")

# Let's inspect page headers and identify sections
for idx, page in enumerate(pages):
    text = page["text"]
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    if not lines:
        continue
    first_line = lines[0]
    
    # Check if section header or question start
    # e.g., Biology, Chemistry, Mathematics, Physics or question number like "1.", "2."
    q_match = re.match(r"^(\d+)\.\s*(.*)", first_line)
    if q_match or "Section" in text or "Biology" in text or "Physics" in text or "Chemistry" in text or "Mathematics" in text or "NEST" in text:
        has_imgs = len(page["images"])
        img_info = f" [Images: {has_imgs}]" if has_imgs else ""
        print(f"Page {page['page']:3d}: {first_line[:70]}{img_info}")
