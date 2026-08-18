import os

for root, dirs, files in os.walk(os.path.join(os.getcwd(), "components")):
    for f in files:
        if f.endswith((".tsx", ".ts")):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8") as fp:
                content = fp.read()
                if "Mark for Review & Next" in content or "Clear Response" in content or "Save & Next" in content:
                    print(f"Match: {p}")
                    for i, l in enumerate(content.split('\n')):
                        if "Mark for Review" in l or "Clear Response" in l:
                            print(f"  L{i+1}: {l.strip()[:100]}")
