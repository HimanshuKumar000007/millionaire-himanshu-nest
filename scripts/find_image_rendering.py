import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

for root, dirs, files in os.walk(os.path.join(os.getcwd(), "components")):
    for f in files:
        if f.endswith((".tsx", ".ts")):
            fpath = os.path.join(root, f)
            with open(fpath, "r", encoding="utf-8") as fp:
                txt = fp.read()
                if "imageSrc" in txt or "image" in txt or "Option" in txt:
                    print(f"File: {fpath}")
                    for i, line in enumerate(txt.split('\n')):
                        if "imageSrc" in line or "image" in line and ("img" in line or "src" in line):
                            print(f"  L{i+1}: {line.strip()[:100]}")
