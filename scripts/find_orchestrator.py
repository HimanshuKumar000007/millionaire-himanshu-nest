import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

root_dir = r"d:\millionaire-at-22-nest-smartprep"

matches = []
for dirpath, dirnames, filenames in os.walk(root_dir):
    if any(ignore in dirpath for ignore in [".git", ".next", "node_modules", ".gemini"]):
        continue
    for fname in filenames:
        if fname.endswith((".ts", ".tsx", ".js", ".jsx", ".json", ".md")):
            fpath = os.path.join(dirpath, fname)
            try:
                with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    if "orchestrat" in content.lower() or "orchestr" in content.lower() or "agent" in content.lower():
                        rel = os.path.relpath(fpath, root_dir)
                        # Count occurrences
                        c_orch = content.lower().count("orchestr")
                        matches.append((rel, c_orch))
            except Exception:
                pass

print(f"Found {len(matches)} files mentioning orchestration/agents:")
for m in sorted(matches, key=lambda x: x[1], reverse=True)[:25]:
    print(f"{m[0]}: {m[1]} matches")
