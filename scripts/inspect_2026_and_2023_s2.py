import os
import sys
import glob
import json

sys.stdout.reconfigure(encoding='utf-8')

mock_files = glob.glob("content/nest/mocks/nest/*.json")
for m in sorted(mock_files):
    with open(m, "r", encoding="utf-8") as f:
        data = json.load(f)
        print(f"File: {os.path.basename(m):25} | ID: {data.get('id'):20} | Title: {data.get('title')}")
