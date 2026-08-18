import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/all_extracted_text_annotated.txt", "r", encoding="utf-8") as f:
    full_text = f.read()

# Let's extract each question block from the PDF text using regex for "N. "
# Questions in PDF are numbered "1. ", "2. ", ..., "68. "
questions_in_pdf = {}

# Split by question numbers
pattern = r'(?:^|\n)\s*(\d{1,2})\.\s+'
parts = re.split(pattern, full_text)

# parts[0] is header/intro
for i in range(1, len(parts), 2):
    q_num = int(parts[i])
    q_body = parts[i+1].strip()
    questions_in_pdf[q_num] = q_body

print(f"Extracted {len(questions_in_pdf)} question blocks directly from PDF text!")
for q_num in sorted(questions_in_pdf.keys()):
    snippet = questions_in_pdf[q_num][:120].replace('\n', ' // ')
    print(f"PDF Q{q_num:02d}: {snippet}")
