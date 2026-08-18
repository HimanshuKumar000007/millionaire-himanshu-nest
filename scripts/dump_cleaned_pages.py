import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/nest_2025_raw_dump.json", "r", encoding="utf-8") as f:
    pages = json.load(f)

def clean_text(t):
    # Fix encoding glitches from PDF
    t = t.replace("!ecting", "affecting").replace("e!ect", "effect").replace("inﬂuencing", "influencing")
    t = t.replace("ﬁrst", "first").replace("ﬁve", "five").replace("ﬁgure", "figure").replace("ﬂask", "flask")
    t = t.replace("solidiﬁed", "solidified").replace("deﬁned", "defined").replace("di!erent", "different")
    t = t.replace("ΓåÆ", "×").replace("ΓÇÖ", "'").replace("ΓÇ¥G", "ΔG").replace("╧ë-", "β-")
    t = t.replace("–", "-").replace("—", "-")
    return t

# Dump each page text cleaned
for i in range(1, 82):
    p = pages[i - 1]
    cleaned = clean_text(p["text"])
    imgs = [img["src"] for img in p["images"]]
    print(f"--- PAGE {p['page']} ---")
    if imgs:
        print(f"IMAGES: {imgs}")
    print(cleaned)
    print()
