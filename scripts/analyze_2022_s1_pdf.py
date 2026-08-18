import pymupdf
import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2022 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

print(f"Total pages in 2022 Session 1 PDF: {len(doc)}")

# Save all text
annotated_lines = []
for p_idx, page in enumerate(doc):
    text = page.get_text()
    annotated_lines.append(f"\n--- PAGE {p_idx + 1} ---\n")
    annotated_lines.append(text)

annotated_text = "".join(annotated_lines)
with open("scripts/2022_s1_extracted_text.txt", "w", encoding="utf-8") as f:
    f.write(annotated_text)

# Check extracted question numbers
questions_in_pdf = {}
pattern = r'(?:^|\n)\s*(\d{1,2})\.\s+'
parts = re.split(pattern, annotated_text)

for i in range(1, len(parts), 2):
    q_num = int(parts[i])
    q_body = parts[i+1].strip()
    questions_in_pdf[q_num] = q_body

print(f"Total distinct question blocks detected: {len(questions_in_pdf)}")
for q_num in sorted(questions_in_pdf.keys()):
    snippet = questions_in_pdf[q_num][:100].replace('\n', ' // ')
    print(f"Q{q_num:02d}: {snippet}")
