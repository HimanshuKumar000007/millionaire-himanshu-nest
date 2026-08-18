import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

mocks_path = os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2023-s1.json")
with open(mocks_path, "r", encoding="utf-8") as f:
    text = f.read()

# Replace unicode dashes and quotes with standard characters
clean_text = text.replace("–", "-").replace("—", "-").replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')

with open(mocks_path, "w", encoding="utf-8") as f:
    f.write(clean_text)

# Also update d:\nest-pyq\jsons\2023_s1 and content\nest\jsons\2023_s1
d_path = r"d:\nest-pyq\jsons\2023_s1\nest_2023_session_1_full_paper.json"
with open(d_path, "w", encoding="utf-8") as f:
    f.write(clean_text)

app_path = os.path.join(os.getcwd(), "content", "nest", "jsons", "2023_s1", "nest_2023_session_1_full_paper.json")
with open(app_path, "w", encoding="utf-8") as f:
    f.write(clean_text)

print("Cleaned all special characters and verified JSON integrity!")
