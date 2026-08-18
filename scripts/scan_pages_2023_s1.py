import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

txt_path = os.path.join(os.getcwd(), "scripts", "2023_s1_full_extracted_text.txt")
with open(txt_path, "r", encoding="utf-8") as f:
    text = f.read()

pages = re.split(r'={30}\s*PAGE \d+\s*={30}', text)

for p_num, page_text in enumerate(pages[1:], 1):
    lines = [l.strip() for l in page_text.split('\n') if l.strip()]
    header = lines[0] if lines else "[EMPTY]"
    # print headers or question numbers
    q_matches = re.findall(r'(?:^|\n)\s*(\d+)\.\s+', page_text)
    print(f"Page {p_num:02d}: Header='{header[:50]}' | Qs={q_matches}")
