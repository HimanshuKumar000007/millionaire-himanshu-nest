import pymupdf
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2020 session 1.pdf"
doc = pymupdf.open(pdf_path)

all_text = ""
for i, page in enumerate(doc):
    all_text += f"\n\n--- PAGE {i+1} ---\n\n" + page.get_text()

# Find section names
sections = re.findall(r'Section\s*:\s*([^\n]+)', all_text)
print("Sections found:", set(sections))

# Find all Question headers like "Q.1", "Q.2", "Question ID :"
q_ids = re.findall(r'Question ID\s*:\s*(\d+)', all_text)
print(f"Total Question IDs found: {len(q_ids)}")

for p in [1, 10, 19, 28, 35]:
    if p <= len(doc):
        print(f"\n--- Snippet Page {p} ---")
        print(doc[p-1].get_text()[:400])
