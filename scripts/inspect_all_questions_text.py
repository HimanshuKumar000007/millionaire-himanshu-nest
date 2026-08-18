import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

txt_path = os.path.join(os.getcwd(), "scripts", "2023_s1_full_extracted_text.txt")
with open(txt_path, "r", encoding="utf-8") as f:
    text = f.read()

# Let's split by Question Number: e.g. "\n1. ", "\n2. ", ... "\n68. "
# Note: Page 1 has "1. Conducting Bodies:", which is in the general instructions.
# Biology starts on Page 2 with "1. A cladogram..."

bio_start = text.find("BIOLOGY")
chem_start = text.find("CHEMISTRY")
if chem_start == -1:
    # let's find where Q18 starts
    chem_start = text.find("\n18. ")
math_start = text.find("MATHEMATICS")
if math_start == -1:
    # let's find where Q35/36 starts
    math_start = text.find("\n36. ")
phy_start = text.find("PHYSICS")
if phy_start == -1:
    phy_start = text.find("\n53. ")

print(f"Bio start: {bio_start}")
print(f"Chem start: {chem_start}")
print(f"Math start: {math_start}")
print(f"Phy start: {phy_start}")
