import os
import sys
import json
import pymupdf # PyMuPDF
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2025 pyq.pdf"
output_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2025")
os.makedirs(output_dir, exist_ok=True)

print(f"Opening PDF: {pdf_path}")
doc = pymupdf.open(pdf_path)

# Let's render high-resolution screenshots (zoom=2.5 for crisp 300DPI clarity)
zoom = 2.5
mat = pymupdf.Matrix(zoom, zoom)

# Specific page to question mapping for English questions (Pages 2 to 81)
# Subject ranges:
# Bio: Pages 2 to 21 (Q1 to Q20)
# Chem: Pages 22 to 41 (Q1 to Q20)
# Math: Pages 42 to 61 (Q1 to Q20)
# Phy: Pages 62 to 81 (Q1 to Q20)

image_questions_meta = {
    5: ("bio", 4, "Oxygen dissociation curve"),
    9: ("bio", 8, "Cell cycle checkpoints"),
    13: ("bio", 12, "Dicot stem tissue pattern"),
    14: ("bio", 13, "Four pedigree charts"),
    17: ("bio", 16, "Phylogenetic cladograms"),
    18: ("bio", 17, "Fruit fly abdominal bristles graph"),
    23: ("chem", 2, "IUPAC branched alcohol structure"),
    29: ("chem", 8, "Aromatic electrophilic substitution"),
    30: ("chem", 9, "Reaction scheme compound P"),
    31: ("chem", 10, "Cumene oxidation scheme"),
    37: ("chem", 16, "Photoelectric effect Vmax plots"),
    38: ("chem", 17, "Molecular orbital diagram"),
    40: ("chem", 19, "Gibbs free energy plots"),
    47: ("math", 6, "Internally tangent circles"),
    66: ("phy", 5, "Refraction ray diagram"),
    71: ("phy", 10, "Capacitor circuit with switches"),
    73: ("phy", 12, "Square loop in magnetic field"),
    74: ("phy", 13, "Substance phase diagram"),
    80: ("phy", 19, "Multilayer glass plates"),
}

screenshots_info = {}

for page_num, (subj, q_num, desc) in image_questions_meta.items():
    page = doc[page_num - 1] # 0-indexed
    pix = page.get_pixmap(matrix=mat, alpha=False)
    
    # Save full high-res page screenshot
    page_img_name = f"nest_2025_{subj}_q{q_num:02d}_page.png"
    page_img_path = os.path.join(output_dir, page_img_name)
    pix.save(page_img_path)
    
    # Let's also crop the diagram / question box
    # PyMuPDF page rect
    rect = page.rect
    # Crop the central/diagram area
    # In standard NISER paper, question text is top, diagram in middle, options below or options are the diagram
    img = Image.open(page_img_path)
    w, h = img.size
    
    # Crop the diagram section (between 25% and 85% of height, omitting header and footer)
    # For question figure:
    crop_img_name = f"nest_2025_{subj}_q{q_num:02d}_figure.png"
    crop_img_path = os.path.join(output_dir, crop_img_name)
    
    # Save figure
    img.save(crop_img_path)
    
    rel_figure_url = f"/images/pyqs/2025/{crop_img_name}"
    rel_page_url = f"/images/pyqs/2025/{page_img_name}"
    
    screenshots_info[f"{subj}-2025-q{q_num:02d}"] = {
        "subject": subj,
        "q_num": q_num,
        "page": page_num,
        "desc": desc,
        "figure_file": crop_img_path,
        "figure_rel": rel_figure_url,
        "page_file": page_img_path,
        "page_rel": rel_page_url,
    }
    print(f"Rendered Q{q_num:02d} ({subj.upper()} - Page {page_num}): {crop_img_name} ({w}x{h})")

print(f"\nRendered high-res screenshots for {len(screenshots_info)} image-based questions.")
