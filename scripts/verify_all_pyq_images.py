import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

mocks_dir = os.path.join(os.getcwd(), "content", "nest", "mocks", "nest")

print(f"Auditing all mock papers in: {mocks_dir}")

for f in sorted(os.listdir(mocks_dir)):
    if f.endswith(".json"):
        fpath = os.path.join(mocks_dir, f)
        with open(fpath, "r", encoding="utf-8") as fp:
            data = json.load(fp)
        
        mid = data.get("id")
        qs = data.get("questions", [])
        total_qs = len(qs)
        img_qs = 0
        opt_imgs = 0
        
        for q in qs:
            has_q_img = bool(q.get("imageSrc") or q.get("images"))
            if has_q_img:
                img_qs += 1
            for opt in q.get("options", []):
                if "![" in opt.get("text", "") or "http" in opt.get("text", ""):
                    opt_imgs += 1
        
        print(f"Paper: {mid:25} | Total Qs: {total_qs:3} | Qs with Diagrams: {img_qs:2} | Option Diagrams: {opt_imgs:2}")
