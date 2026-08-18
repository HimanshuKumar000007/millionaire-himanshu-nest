import os
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

src_dir = r"d:\nest-pyq\extracted_images\2023_s1"
dst_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2023_s1")

os.makedirs(dst_dir, exist_ok=True)

if os.path.exists(src_dir):
    files = os.listdir(src_dir)
    print(f"Found {len(files)} extracted images in {src_dir}")
    for f in files:
        src_path = os.path.join(src_dir, f)
        dst_path = os.path.join(dst_dir, f)
        shutil.copy2(src_path, dst_path)
    print(f"Copied {len(files)} images to {dst_dir}")
else:
    print(f"Directory {src_dir} not found, checking local extracted images...")
