import os

for root, dirs, files in os.walk(os.path.join(os.getcwd(), "lib")):
    for f in files:
        if f.endswith((".ts", ".tsx")):
            p = os.path.join(root, f)
            with open(p, "r", encoding="utf-8") as fp:
                txt = fp.read()
                if "interface ContentQuestion" in txt or "type ContentQuestion" in txt:
                    print(f"Found in {p}")
                    for i, l in enumerate(txt.split('\n')):
                        if "ContentQuestion" in l:
                            print(f"  L{i+1}: {l.strip()}")
