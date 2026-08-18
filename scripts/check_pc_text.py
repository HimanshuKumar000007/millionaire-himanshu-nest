import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/nest_2025_raw_dump.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

print("Verifying Physics and Chemistry questions...")
print("=== CHEMISTRY ===")
for p_num in range(22, 42):
    p = pages[p_num - 1]
    q_num = p_num - 21
    print(f"Chem Q{q_num:02d} (Pg {p_num}): {p['text'][:120]}... Images: {len(p['images'])}")

print("\n=== PHYSICS ===")
for p_num in range(62, 82):
    p = pages[p_num - 1]
    q_num = p_num - 61
    print(f"Phy Q{q_num:02d} (Pg {p_num}): {p['text'][:120]}... Images: {len(p['images'])}")
