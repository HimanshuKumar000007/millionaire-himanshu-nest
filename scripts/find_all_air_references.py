import os

for root, dirs, files in os.walk("."):
    if "node_modules" in root or ".next" in root or ".git" in root:
        continue
    for f in files:
        if f.endswith((".tsx", ".ts", ".jsx", ".js")):
            path = os.path.join(root, f)
            try:
                with open(path, "r", encoding="utf-8") as file:
                    for line_num, line in enumerate(file.readlines(), 1):
                        if "AIR" in line or "Target NISER" in line or "NISER Rank" in line:
                            print(f"{path}:{line_num}: {line.strip()}")
            except Exception:
                pass
