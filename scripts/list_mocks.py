import os
import sys
import glob

sys.stdout.reconfigure(encoding='utf-8')

mock_files = glob.glob("content/nest/mocks/nest/*.json")
for m in sorted(mock_files):
    print(f"Mock file: {m}")
