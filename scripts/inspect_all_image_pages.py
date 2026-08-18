import os
import sys
import pymupdf

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2025 pyq.pdf"
doc = pymupdf.open(pdf_path)

image_pages = [
    (5, "bio-2025-q04", "Bio Q4 - Oxygen Dissociation Curve"),
    (9, "bio-2025-q08", "Bio Q8 - Cell Cycle Checkpoints"),
    (13, "bio-2025-q12", "Bio Q12 - Dicot Stem Tissue Pattern"),
    (14, "bio-2025-q13", "Bio Q13 - Pedigree Analysis Charts"),
    (17, "bio-2025-q16", "Bio Q16 - Phylogenetic Cladograms Matrix"),
    (18, "bio-2025-q17", "Bio Q17 - Bristle Distribution Curve"),
    (23, "chem-2025-q02", "Chem Q2 - IUPAC Alcohol Structure"),
    (29, "chem-2025-q08", "Chem Q8 - Aromatic Substitution Products"),
    (30, "chem-2025-q09", "Chem Q9 - Reaction Condensation Scheme"),
    (31, "chem-2025-q10", "Chem Q10 - Cumene Hydroperoxide Products"),
    (37, "chem-2025-q16", "Chem Q16 - Photoelectric Vmax Graphs"),
    (38, "chem-2025-q17", "Chem Q17 - Molecular Orbital Level Diagram"),
    (40, "chem-2025-q19", "Chem Q19 - Gibbs Free Energy Surface Plots"),
    (47, "math-2025-q06", "Math Q6 - Internally Tangent Circles Diagram"),
    (66, "phy-2025-q05", "Phy Q5 - Snell Law Ray Interface"),
    (71, "phy-2025-q10", "Phy Q10 - Capacitor Circuit Diagram"),
    (73, "phy-2025-q12", "Phy Q12 - Square Current Loop in B Field"),
    (74, "phy-2025-q13", "Phy Q13 - Qualitative Phase Diagram"),
    (80, "phy-2025-q19", "Phy Q19 - Multilayer Glass Refraction Stack"),
]

for page_num, qid, desc in image_pages:
    page = doc[page_num - 1]
    blocks = page.get_text("blocks")
    print(f"\n=== Page {page_num} ({qid}: {desc}) ===")
    print(f"Page size: {page.rect}")
    for idx, b in enumerate(blocks):
        # b = (x0, y0, x1, y1, text, block_no, block_type)
        txt = b[4].strip().replace('\n', ' ')
        if len(txt) > 60:
            txt = txt[:60] + "..."
        print(f"  [{idx}] rect=({b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}) -> {txt!r}")
