import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

root_dir = r"d:\millionaire-at-22-nest-smartprep"

matches = []
for dirpath, dirnames, filenames in os.walk(root_dir):
    if any(ignore in dirpath for ignore in [".git", ".next", "node_modules"]):
        continue
    for fname in filenames:
        if fname.endswith((".ts", ".tsx", ".js", ".jsx")):
            fpath = os.path.join(dirpath, fname)
            try:
                with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    if "pyq_attempts" in content.lower() or "pyqattempt" in content.lower():
                        rel = os.path.relpath(fpath, root_dir)
                        matches.append(rel)
            except Exception:
                pass

print("Files using PYQ attempts:")
for m in matches:
    print(f"- {m}")
