import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/nest_2025_raw_dump.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

# English pages: 1 to 81
image_questions = []
for p_num in range(2, 82):
    page = pages[p_num - 1]
    if page["images"]:
        # determine subject and q_num
        if p_num <= 21:
            subj = "Biology"
            q_num = p_num - 1
            prefix = "bio"
        elif p_num <= 41:
            subj = "Chemistry"
            q_num = p_num - 21
            prefix = "chem"
        elif p_num <= 61:
            subj = "Mathematics"
            q_num = p_num - 41
            prefix = "math"
        else:
            subj = "Physics"
            q_num = p_num - 61
            prefix = "phy"

        image_questions.append({
            "id": f"{prefix}-2025-q{q_num:02d}",
            "subject": subj,
            "q_num": q_num,
            "page": p_num,
            "images": page["images"],
            "text": page["text"][:300]
        })

print(f"Total Image-Based Questions in English: {len(image_questions)}")
for iq in image_questions:
    print(f"[{iq['id']}] ({iq['subject']} Q{iq['q_num']}) - Page {iq['page']}")
    for img in iq["images"]:
        print(f"   -> {img['src']} ({img['width']}x{img['height']})")
    print(f"   Text: {iq['text'][:120]}...")
    print()
