import os
import sys
import glob

sys.stdout.reconfigure(encoding='utf-8')

pdf_paths = glob.glob("d:/nest-pyq/**/*.pdf", recursive=True) + glob.glob("d:/*.pdf") + glob.glob("./**/*.pdf", recursive=True)
for p in set(pdf_paths):
    print(f"Found PDF: {p} ({os.path.getsize(p)} bytes)")
