import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

raw_txt_file = os.path.join(os.getcwd(), "scripts", "raw_pdf_text_annotated.txt")
with open(raw_txt_file, "r", encoding="utf-8") as f:
    text = f.read()

pages = text.split("============================== PAGE ")

for p in pages[1:]:
    p_num = p.split(" ==============================")[0]
    p_content = p.split(" ==============================\n")[1]
    print(f"\n{'#'*40} PAGE {p_num} {'#'*40}\n")
    print(p_content)
