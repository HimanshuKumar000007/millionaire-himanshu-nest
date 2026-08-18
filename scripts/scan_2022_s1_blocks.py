import pymupdf
import sys
import os
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2022 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2022_s1")
os.makedirs(output_img_dir, exist_ok=True)

# Extract text and analyze question markers
full_text = ""
for i, page in enumerate(doc):
    full_text += f"\n\n--- PAGE {i+1} ---\n\n" + page.get_text()

# Find question blocks
# In TCS iON PDFs, questions are marked by "Question Number : X"
q_blocks = list(re.finditer(r'Question Number\s*:\s*(\d+).*?(?=Question Number\s*:\s*\d+|\Z)', full_text, re.DOTALL))

print(f"Total Question blocks found: {len(q_blocks)}")

for qb in q_blocks[:15]:
    txt = qb.group(0)
    q_num = re.search(r'Question Number\s*:\s*(\d+)', txt).group(1)
    q_type = re.search(r'Question Type\s*:\s*(\w+)', txt)
    q_type_str = q_type.group(1) if q_type else "MCQ"
    # Find question body
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    print(f"Q{q_num} ({q_type_str}): {lines[1] if len(lines)>1 else ''} | {lines[2] if len(lines)>2 else ''}")
