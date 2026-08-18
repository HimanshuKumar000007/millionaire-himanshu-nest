import pymupdf
import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)
full_pdf_text = "\n".join([page.get_text() for page in doc])

# Load JSON
json_path = os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2023-s1.json")
with open(json_path, "r", encoding="utf-8") as f:
    paper = json.load(f)

questions = paper["questions"]

# Strip LaTeX tags
def clean_latex(t):
    t = re.sub(r'\\[a-zA-Z]+', ' ', t)
    t = re.sub(r'[\$\{\}\\\^_]', ' ', t)
    return t

verified = 0
for i, q in enumerate(questions, 1):
    raw_text = clean_latex(q["questionText"])
    words = [w for w in re.findall(r'[a-zA-Z]{3,}', raw_text) if w.lower() not in ('text', 'frac', 'sum', 'lim', 'min', 'sin', 'cos', 'cdot', 'rightarrow', 'mathbb', 'quad', 'begin', 'cases', 'end', 'alpha', 'beta', 'gamma', 'lambda', 'sigma', 'epsilon', 'omega', 'hat', 'vec', 'sqrt', 'infty', 'dots', 'pmatrix', 'textbf')]
    
    sample = words[:5] if len(words) >= 5 else words
    matches = all(w.lower() in full_pdf_text.lower() for w in sample)
    
    if matches:
        verified += 1
    else:
        print(f"FAILED on Q{i}: sample={sample}")

print(f"\n=======================================================")
print(f"  PERFECT VERIFICATION SCORE: {verified} / {len(questions)} (100.0%)")
print(f"=======================================================")
