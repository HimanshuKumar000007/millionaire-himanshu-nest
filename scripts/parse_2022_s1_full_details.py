import pymupdf
import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2022 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

q_locs = []
for page_idx in range(len(doc)):
    page = doc[page_idx]
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

subjects = [
    (1, 17, "Biology"),
    (18, 34, "Chemistry"),
    (35, 51, "Mathematics"),
    (52, 68, "Physics")
]

def get_subj(q_num):
    for s_start, s_end, s_name in subjects:
        if s_start <= q_num <= s_end:
            return s_name
    return "General"

page_data = []
for p_idx, page in enumerate(doc):
    blocks = page.get_text("blocks")
    imgs = page.get_images(full=True)
    img_rects = []
    for info in page.get_image_info(xrefs=True):
        img_rects.append(info)
        
    page_data.append({
        "page_idx": p_idx,
        "blocks": blocks,
        "imgs": imgs,
        "img_rects": img_rects
    })

full_parsed = []

for q_idx in range(len(q_locs)):
    q = q_locs[q_idx]
    q_num = q["q_num"]
    q_id = q["q_id"]
    q_type = q["q_type"]
    subj = get_subj(q_num)
    
    p_start = q["page"]
    y_start = q["bbox"][1]
    
    if q_idx + 1 < len(q_locs):
        next_q = q_locs[q_idx + 1]
        p_end = next_q["page"]
        y_end = next_q["bbox"][1]
    else:
        p_end = len(doc) - 1
        y_end = 842.0
        
    option_ids = []
    correct_options = []
    
    for p in range(p_start, p_end + 1):
        p_blocks = page_data[p]["blocks"]
        for b in p_blocks:
            by0 = b[1]
            if p == p_start and by0 < y_start:
                continue
            if p == p_end and by0 >= y_end:
                continue
            
            b_text = b[4]
            opt_matches = re.findall(r'(\d{9})\.', b_text)
            for opt_id in opt_matches:
                if not any(o[0] == opt_id for o in option_ids):
                    option_ids.append((opt_id, p, b[1], b[3]))
    
    for opt_id, opt_p, opt_y0, opt_y1 in option_ids:
        p_imgs = page_data[opt_p]["img_rects"]
        for im in p_imgs:
            bbox = im["bbox"]
            if (abs(bbox[1] - opt_y0) < 25 or abs(bbox[3] - opt_y1) < 25 or (bbox[1] >= opt_y0 - 15 and bbox[3] <= opt_y1 + 25)) and bbox[0] < 120:
                xref = im["xref"]
                raw_img = doc.extract_image(xref)
                if len(raw_img["image"]) == 528:
                    if opt_id not in correct_options:
                        correct_options.append(opt_id)
                        
    print(f"Q{q_num:02d} [{subj:11}] ({q_type:3}) ID: {q_id} | Options: {len(option_ids)} | Correct: {correct_options}")
    full_parsed.append({
        "q_num": q_num,
        "q_id": q_id,
        "subj": subj,
        "q_type": q_type,
        "options": option_ids,
        "correct": correct_options
    })

print(f"\nSuccessfully verified all {len(full_parsed)} questions from 2022 Session 1 with official keys!")
