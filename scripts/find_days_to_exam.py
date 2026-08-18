import os
import re

for root, dirs, files in os.walk("."):
    if "node_modules" in root or ".next" in root or ".git" in root:
        continue
    for f in files:
        if f.endswith((".tsx", ".ts", ".jsx", ".js", ".json")):
            path = os.path.join(root, f)
            try:
                with open(path, "r", encoding="utf-8") as file:
                    content = file.read()
                    if "DAYS TO EXAM" in content or "daysToExam" in content or "daysRemaining" in content or "112" in content or "2027" in content or "June" in content:
                        for line_num, line in enumerate(content.splitlines(), 1):
                            if any(k in line for k in ["DAYS TO EXAM", "daysToExam", "daysRemaining", "daysToTarget", "daysLeft", "112"]):
                                print(f"{path}:{line_num}: {line.strip()}")
            except Exception:
                pass
