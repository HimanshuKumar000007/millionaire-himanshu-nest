import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

base_dir = r"d:\nest-pyq"
if os.path.exists(base_dir):
    print("Files in d:\\nest-pyq:")
    for root, dirs, files in os.walk(base_dir):
        for f in files:
            p = os.path.join(root, f)
            print(f"  {p} ({os.path.getsize(p)} bytes)")
else:
    print("d:\\nest-pyq does not exist")
