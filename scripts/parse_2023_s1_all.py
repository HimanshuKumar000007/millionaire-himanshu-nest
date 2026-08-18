import re
import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

txt_path = os.path.join(os.getcwd(), "scripts", "2023_s1_full_extracted_text.txt")

with open(txt_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's inspect sections
sections = re.split(r'={30}\s*PAGE \d+\s*={30}', content)
print(f"Total pages split: {len(sections)}")

# Let's write a comprehensive inspection script to locate all questions 1 to 17 in Bio, Chem, Math, Phy
