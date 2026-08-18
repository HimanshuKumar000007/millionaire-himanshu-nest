import shutil
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

src_dir = r"d:\nest-pyq"
dest_dir = os.path.join(os.getcwd(), "public", "pdfs", "pyqs")
os.makedirs(dest_dir, exist_ok=True)

pdf_mappings = [
    ("2018.pdf", "nest_2018.pdf"),
    ("2019.pdf", "nest_2019.pdf"),
    ("2020 session 1.pdf", "nest_2020_s1.pdf"),
    ("2020 session 2.pdf", "nest_2020_s2.pdf"),
    ("2022 pyq session 1.pdf", "nest_2022_s1.pdf"),
    ("2022 pyq session 2.pdf", "nest_2022_s2.pdf"),
    ("2023 pyq session 1.pdf", "nest_2023_s1.pdf"),
    ("2024 pyq session 1.pdf", "nest_2024_s1.pdf"),
    ("2024 pyq session 2.pdf", "nest_2024_s2.pdf"),
    ("2025 pyq.pdf", "nest_2025.pdf"),
]

for src_name, dest_name in pdf_mappings:
    src_file = os.path.join(src_dir, src_name)
    dest_file = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_file):
        shutil.copy2(src_file, dest_file)
        print(f"Copied: {src_name} -> /pdfs/pyqs/{dest_name} ({os.path.getsize(dest_file)} bytes)")
    else:
        print(f"Source not found: {src_file}")

print("\nPDFs copied to public/pdfs/pyqs/ successfully!")
