import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

txt_path = os.path.join(os.getcwd(), "scripts", "2023_s1_full_extracted_text.txt")
with open(txt_path, "r", encoding="utf-8") as f:
    text = f.read()

# Find subject headers
for match in re.finditer(r'(BIOLOGY|CHEMISTRY|MATHEMATICS|PHYSICS)', text):
    pos = match.start()
    line_start = text.rfind('\n', 0, pos)
    line_end = text.find('\n', pos)
    print(f"Found {match.group(1)} at index {pos}: {text[line_start:line_end].strip()}")
