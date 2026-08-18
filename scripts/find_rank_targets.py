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
                    if "< 200" in content or "< 50" in content or "AIR <" in content or "Target NISER Rank" in content or "200 AIR" in content:
                        for line_num, line in enumerate(content.splitlines(), 1):
                            if any(k in line for k in ["< 200", "< 50", "AIR <", "Target NISER", "200 AIR"]):
                                print(f"{path}:{line_num}: {line.strip()}")
            except Exception:
                pass
