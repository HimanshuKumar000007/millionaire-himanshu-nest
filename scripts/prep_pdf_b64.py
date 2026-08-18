import base64
import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\millionaire-at-22-nest-smartprep\public\pdfs\pyqs\nest_2018.pdf"
with open(pdf_path, "rb") as f:
    b64_data = base64.b64encode(f.read()).decode('utf-8')

data_uri = f"data:application/pdf;base64,{b64_data}"
print(f"Base64 data URI created, length: {len(data_uri)}")

# Save to scratch for uploading
scratch_file = r"d:\millionaire-at-22-nest-smartprep\scripts\nest_2018_b64.txt"
with open(scratch_file, "w", encoding="utf-8") as f:
    f.write(data_uri)
