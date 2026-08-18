import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/all_extracted_text_annotated.txt", "r", encoding="utf-8") as f:
    full_text = f.read()

for q_num in range(23, 31):
    patt = rf'(?:^|\n)\s*{q_num}\.\s+([\s\S]*?)(?=(?:\n\s*{q_num+1}\.\s+)|\Z)'
    match = re.search(patt, full_text)
    if match:
        print(f"\n{'='*20} CHEM Q{q_num} {'='*20}\n")
        print(match.group(1).strip())
