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
                    if "Assessment" in content and ("orange" in content or "bg-orange" in content or "amber" in content):
                        print(f"Found match in {path}")
                    elif "Assessment" in content:
                        for line_num, line in enumerate(content.splitlines(), 1):
                            if "Assessment" in line and ("button" in line.lower() or "tab" in line.lower() or "nav" in line.lower() or "icon" in line.lower() or "label" in line.lower()):
                                print(f"{path}:{line_num}: {line.strip()}")
            except Exception:
                pass
