import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/2022_s1_extracted_text.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
print("First 150 lines:\n")
print("".join(lines[:150]))
