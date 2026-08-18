import os
import sys
import json
import re
import pymupdf
from PIL import Image, ImageChops
import cloudinary
import cloudinary.uploader

sys.stdout.reconfigure(encoding='utf-8')

# Configure Cloudinary
cloudinary.config(
    cloud_name='dhb8qmnxt',
    api_key='765898971433311',
    api_secret='G2VwK8LpxSzAimI95EaebadJXwk'
)

pdf_path = r"d:\nest-pyq\2024 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2024_s1")
os.makedirs(output_img_dir, exist_ok=True)

print("Starting NEST 2024 Session 1 Processing...")
sys.stdout.flush()

# Define image questions with exact diagram rects
# Page numbers (1-indexed in PDF)
image_specs = [
    {"qid": "bio-2024-s1-q01", "page": 2, "rect": (60, 100, 535, 380), "desc": "DNA Protein Antibody Structures"},
    {"qid": "bio-2024-s1-q02", "page": 3, "rect": (60, 100, 535, 460), "desc": "Biomass vs CO2 Legume Graph"},
    {"qid": "bio-2024-s1-q04", "page": 5, "rect": (60, 100, 535, 440), "desc": "Pedigree Analysis Chart"},
    {"qid": "bio-2024-s1-q06", "page": 7, "rect": (60, 100, 535, 480), "desc": "Isotope Density Gradient Centrifugation"},
    {"qid": "bio-2024-s1-q11", "page": 13, "rect": (60, 100, 535, 450), "desc": "GFP TetR Vector Map"},
    {"qid": "bio-2024-s1-q18", "page": 20, "rect": (60, 80, 535, 480), "desc": "Disaccharide Chemical Structures"},
    {"qid": "bio-2024-s1-q20", "page": 22, "rect": (60, 100, 535, 450), "desc": "Reaction Coordinate Potential Energy"},
    {"qid": "chem-2024-s1-q01", "page": 23, "rect": (60, 100, 535, 420), "desc": "Organic Reactant Transformation"},
    {"qid": "chem-2024-s1-q02", "page": 24, "rect": (60, 100, 535, 480), "desc": "Kolbe Electrolysis Products"},
    {"qid": "chem-2024-s1-q03", "page": 25, "rect": (60, 90, 535, 460), "desc": "Diazonium Coupling Scheme"},
    {"qid": "chem-2024-s1-q04", "page": 26, "rect": (60, 90, 535, 450), "desc": "Glucose Bromine Water Oxidation"},
    {"qid": "chem-2024-s1-q05", "page": 27, "rect": (60, 90, 535, 460), "desc": "Intramolecular Aldol Reaction Scheme"},
    {"qid": "chem-2024-s1-q06", "page": 28, "rect": (60, 90, 535, 460), "desc": "Annulene Aromaticity Compounds"},
    {"qid": "chem-2024-s1-q07", "page": 29, "rect": (60, 90, 535, 460), "desc": "Ether Acid Cleavage Structures"},
    {"qid": "chem-2024-s1-q08", "page": 30, "rect": (60, 90, 535, 460), "desc": "Hydroboration Oxidation Scheme"},
    {"qid": "chem-2024-s1-q16", "page": 38, "rect": (60, 100, 535, 460), "desc": "Degree of Dissociation Equilibrium Graph"},
    {"qid": "chem-2024-s1-q18", "page": 40, "rect": (60, 90, 535, 460), "desc": "Lateral Pi Molecular Orbitals"},
    {"qid": "math-2024-s1-q04", "page": 47, "rect": (60, 100, 535, 420), "desc": "Cantor Ternary Set Division"},
    {"qid": "math-2024-s1-q09", "page": 52, "rect": (60, 100, 535, 420), "desc": "Unit Square Triangle Geometry"},
    {"qid": "math-2024-s1-q10", "page": 53, "rect": (60, 100, 535, 420), "desc": "Semicircle Chord Tangent Geometry"},
    {"qid": "math-2024-s1-q16", "page": 59, "rect": (60, 100, 535, 420), "desc": "Triangle Vector Segment Division"},
    {"qid": "phy-2024-s1-q11", "page": 75, "rect": (60, 100, 535, 420), "desc": "Conducting Slab Charge Redistribution"},
    {"qid": "phy-2024-s1-q12", "page": 76, "rect": (60, 100, 535, 420), "desc": "Quarter Circular Loop Dipole"},
    {"qid": "phy-2024-s1-q20", "page": 84, "rect": (60, 100, 535, 420), "desc": "Orthogonal Semi-Infinite Current Wires"},
]

def trim_white(im, pad=16):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    if bbox:
        return im.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(im.width, bbox[2] + pad), min(im.height, bbox[3] + pad)))
    return im

zoom = 3.0
mat = pymupdf.Matrix(zoom, zoom)

cld_map = {}

print(f"Extracting and uploading {len(image_specs)} diagram questions...")
sys.stdout.flush()

for idx, item in enumerate(image_specs):
    qid = item["qid"]
    page_num = item["page"]
    rect = pymupdf.Rect(*item["rect"])
    desc = item["desc"]
    
    page = doc[page_num - 1]
    pix = page.get_pixmap(matrix=mat, clip=rect, alpha=False)
    
    fname = f"nest_2024_s1_{qid.replace('-', '_')}.png"
    local_fpath = os.path.join(output_img_dir, fname)
    pix.save(local_fpath)
    
    try:
        im = Image.open(local_fpath)
        trimmed = trim_white(im, pad=14)
        trimmed.save(local_fpath)
    except Exception as e:
        print(f"Trim error {fname}: {e}")

    public_id = f"nest_2024_s1_{qid.replace('-', '_')}"
    try:
        res = cloudinary.uploader.upload(
            local_fpath,
            folder="nest_pyqs/2024_s1",
            public_id=public_id,
            overwrite=True,
            resource_type="image"
        )
        cld_url = res.get("secure_url")
        cld_map[qid] = {
            "local_path": f"/images/pyqs/2024_s1/{fname}",
            "cloudinary_url": cld_url,
            "desc": desc
        }
        print(f"[{idx+1}/{len(image_specs)}] {qid} -> {cld_url}")
        sys.stdout.flush()
    except Exception as e:
        print(f"Upload error {qid}: {e}")
        sys.stdout.flush()

# Save mapping
with open(os.path.join(os.getcwd(), "scripts", "cloudinary_2024_s1_mapping.json"), "w", encoding="utf-8") as f:
    json.dump(cld_map, f, indent=2)

print(f"\nAll {len(cld_map)} diagrams successfully rendered and uploaded to Cloudinary!")
