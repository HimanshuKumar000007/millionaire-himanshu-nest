import pymupdf
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2024 pyq session 2.pdf"
doc = pymupdf.open(pdf_path)

print("Scanning English pages (1 to 84)...")

pages_info = []
for i in range(84):
    page = doc[i]
    txt = page.get_text().strip()
    img_list = page.get_images()
    drawings = page.get_drawings()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    first_line = lines[0] if lines else "[EMPTY]"
    has_img = len(img_list) > 0 or len(drawings) > 8
    pages_info.append({
        "page": i + 1,
        "first_line": first_line[:90],
        "has_img": has_img,
        "drawings_len": len(drawings),
        "images_len": len(img_list)
    })
    print(f"Page {i+1:02d} (Img: {has_img}, Draw: {len(drawings)}): {first_line[:80]}")

# Print pages with diagrams
diagram_pages = [p["page"] for p in pages_info if p["has_img"]]
print(f"\nDiagram pages count: {len(diagram_pages)}, pages: {diagram_pages}")
