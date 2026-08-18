import re

with open("components/dashboard/DashboardShell.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "assessment" in line.lower() or "orange" in line.lower() or "check" in line.lower():
        print(f"Line {i+1}: {line.strip()}")
