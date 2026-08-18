import re
import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

txt_path = os.path.join(os.getcwd(), "scripts", "2023_s1_full_extracted_text.txt")
with open(txt_path, "r", encoding="utf-8") as f:
    text = f.read()

# Only keep text from BIOLOGY onwards
content = text[605:]

# Clean page numbers and headers like "============================== PAGE X =============================="
cleaned_text = re.sub(r'={30}\s*PAGE \d+\s*={30}', '', content)
# Also clean standalone page numbers at bottom of pages
cleaned_text = re.sub(r'\n\s*\d+\s*\n', '\n', cleaned_text)

# Let's find each question starting with `\n<number>. `
q_matches = list(re.finditer(r'(?:^|\n)(\d+)\.\s+(.*?)(?=(?:\n\d+\.\s+)|\Z)', cleaned_text, re.DOTALL))

print(f"Total question regex matches: {len(q_matches)}")

for i, m in enumerate(q_matches):
    q_num = int(m.group(1))
    q_body = m.group(2).strip()
    first_few_lines = [l.strip() for l in q_body.split('\n') if l.strip()][:3]
    print(f"Q{q_num:02d} ({len(q_body)} chars): {' // '.join(first_few_lines)}")
