import pymupdf
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def find_questions_in_pdf(pdf_path):
    doc = pymupdf.open(pdf_path)
    q_locs = []
    
    for p_idx, page in enumerate(doc):
        text = page.get_text("text")
        blocks = page.get_text("blocks")
        
        for b in blocks:
            b_text = b[4]
            # Pattern 1: Question Number : 1 Question Id : ...
            m1 = re.search(r'Question Number\s*:\s*(\d+)', b_text)
            # Pattern 2: Q.1 or Q. 1 or Question 1
            m2 = re.search(r'Q\s*\.\s*(\d+)', b_text)
            
            if m1:
                q_num = int(m1.group(1))
                if not any(q['q_num'] == q_num for q in q_locs):
                    q_locs.append({"q_num": q_num, "page": p_idx, "y0": b[1], "y1": b[3]})
            elif m2 and b[1] < 150: # near top of page or section
                q_num = int(m2.group(1))
                if not any(q['q_num'] == q_num for q in q_locs):
                    q_locs.append({"q_num": q_num, "page": p_idx, "y0": b[1], "y1": b[3]})
                    
    q_locs.sort(key=lambda x: x["q_num"])
    return q_locs, len(doc)

for name, path in [
    ("2018", r"d:\nest-pyq\2018.pdf"),
    ("2019", r"d:\nest-pyq\2019.pdf"),
    ("2020_s1", r"d:\nest-pyq\2020 session 1.pdf"),
    ("2020_s2", r"d:\nest-pyq\2020 session 2.pdf"),
]:
    if os.path.exists(path):
        q_locs, page_count = find_questions_in_pdf(path)
        print(f"{name}: Found {len(q_locs)} questions across {page_count} pages.")
        if q_locs:
            print(f"  First 3: {[q['q_num'] for q in q_locs[:3]]}, Last 3: {[q['q_num'] for q in q_locs[-3:]]}")
