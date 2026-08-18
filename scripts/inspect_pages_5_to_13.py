import pymupdf
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2023 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

out_file = os.path.join(os.getcwd(), "scripts", "raw_pdf_text_annotated.txt")

with open(out_file, "w", encoding="utf-8") as f:
    for page_idx in range(len(doc)):
        page_num = page_idx + 1
        page = doc[page_idx]
        text = page.get_text()
        f.write(f"\n{'='*30} PAGE {page_num} {'='*30}\n")
        f.write(text)

print(f"Written all pages to {out_file}")

# Print pages 5 to 12 specifically (Biology questions 8 to 17 and Chemistry start)
for page_idx in range(4, 13):
    page_num = page_idx + 1
    page = doc[page_idx]
    text = page.get_text()
    print(f"\n--- PAGE {page_num} ---")
    print(text)
