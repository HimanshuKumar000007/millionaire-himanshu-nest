import json
import re
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/nest_2025_raw_dump.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

def clean_latex(t):
    # Fix broken characters
    t = t.replace("!ecting", "affecting").replace("e!ect", "effect").replace("inﬂuencing", "influencing")
    t = t.replace("ﬁrst", "first").replace("ﬁve", "five").replace("ﬁgure", "figure").replace("ﬂask", "flask")
    t = t.replace("solidiﬁed", "solidified").replace("deﬁned", "defined").replace("di!erent", "different")
    t = t.replace("selﬂng", "selfing").replace("e$ciently", "efficiently")
    t = t.replace("ΓåÆ", " \\times ").replace("ΓÇÖ", "'").replace("ΓÇ¥G", "\\Delta G").replace("╧ë-", "\\beta-")
    t = t.replace("–", "-").replace("—", "-")
    t = t.replace("mmol/L", " \\text{mmol/L}")
    return t.strip()

# Subject mappings
# Page 2-21: Biology
# Page 22-41: Chemistry
# Page 42-61: Mathematics
# Page 62-81: Physics

sections = [
    ("Biology", 2, 21, "bio"),
    ("Chemistry", 22, 41, "chem"),
    ("Mathematics", 42, 61, "math"),
    ("Physics", 62, 81, "phy"),
]

questions_list = []

for subject, start_p, end_p, prefix in sections:
    for p_num in range(start_p, end_p + 1):
        page = pages[p_num - 1]
        q_num = p_num - start_p + 1
        q_id = f"{prefix}-2025-q{q_num:02d}"
        
        raw_text = clean_latex(page["text"])
        images = [img["src"] for img in page["images"]]
        
        # Split into question text and options A, B, C, D
        # Look for pattern A., B., C., D.
        # Remove trailing "Page X"
        raw_text = re.sub(r"Page\s+\d+\s*$", "", raw_text, flags=re.MULTILINE)
        
        # Extract Option A, B, C, D
        opt_a_match = re.search(r"\nA\.\s*(.*?)(?=\nB\.|\Z)", raw_text, re.DOTALL)
        opt_b_match = re.search(r"\nB\.\s*(.*?)(?=\nC\.|\Z)", raw_text, re.DOTALL)
        opt_c_match = re.search(r"\nC\.\s*(.*?)(?=\nD\.|\Z)", raw_text, re.DOTALL)
        opt_d_match = re.search(r"\nD\.\s*(.*?)(?=\nPage|\Z)", raw_text, re.DOTALL)
        
        if opt_a_match and opt_b_match and opt_c_match and opt_d_match:
            # Question text is everything before A.
            q_text_end = opt_a_match.start()
            q_text = raw_text[:q_text_end].strip()
            # Remove leading "1. ", "2. ", etc.
            q_text = re.sub(r"^\d+\.\s*", "", q_text).strip()
            
            opt_a = opt_a_match.group(1).strip()
            opt_b = opt_b_match.group(1).strip()
            opt_c = opt_c_match.group(1).strip()
            opt_d = opt_d_match.group(1).strip()
        else:
            q_text = raw_text
            opt_a = "Option A"
            opt_b = "Option B"
            opt_c = "Option C"
            opt_d = "Option D"

        questions_list.append({
            "id": q_id,
            "q_num": q_num,
            "subject": subject,
            "page": p_num,
            "q_text": q_text,
            "images": images,
            "options": [
                {"id": "a", "text": opt_a, "isCorrect": True},
                {"id": "b", "text": opt_b, "isCorrect": False},
                {"id": "c", "text": opt_c, "isCorrect": False},
                {"id": "d", "text": opt_d, "isCorrect": False}
            ]
        })

print(f"Parsed {len(questions_list)} questions.")
for q in questions_list[:5]:
    print(f"[{q['id']}] ({q['subject']}) Images: {len(q['images'])}")
    print(f"Text: {q['q_text'][:60]}...")
    print(f"A (Correct): {q['options'][0]['text'][:40]}...")
    print()
