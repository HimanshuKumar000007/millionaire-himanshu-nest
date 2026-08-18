import pymupdf
import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2022 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

out_dir = r"d:\millionaire-at-22-nest-smartprep\public\images\pyqs\2022_s1"
os.makedirs(out_dir, exist_ok=True)

# Let's find each Question Number : N across all pages
# Each question starts at some y-coordinate on some page, and ends either before the next Question Number or at the end of its options.
q_locs = []

for page_idx in range(len(doc)):
    page = doc[page_idx]
    text_page = page.get_text("words") # (x0, y0, x1, y1, word, block_no, line_no, word_no)
    
    # Also search text blocks
    blocks = page.get_text("blocks")
    for b in blocks:
        text = b[4]
        m = re.search(r'Question Number\s*:\s*(\d+)\s+Question Id\s*:\s*(\d+)\s+Question Type\s*:\s*(MCQ|MSQ)', text)
        if m:
            q_num = int(m.group(1))
            q_id = m.group(2)
            q_type = m.group(3)
            q_locs.append({
                "q_num": q_num,
                "q_id": q_id,
                "q_type": q_type,
                "page": page_idx,
                "bbox": (b[0], b[1], b[2], b[3])
            })

print(f"Detected {len(q_locs)} questions across {len(doc)} pages!")
for q in q_locs[:10]:
    print(f"Q{q['q_num']:02d} (ID: {q['q_id']}, {q['q_type']}) on Page {q['page']+1} at y={q['bbox'][1]:.1f}")
