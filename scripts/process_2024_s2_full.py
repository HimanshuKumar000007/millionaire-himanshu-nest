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

pdf_path = r"d:\nest-pyq\2024 pyq session 2.pdf"
doc = pymupdf.open(pdf_path)

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2024_s2")
os.makedirs(output_img_dir, exist_ok=True)

print("Starting NEST 2024 Session 2 Processing...")
sys.stdout.flush()

# Diagram definitions (page numbers are 1-indexed in PDF)
image_specs = [
    {"qid": "bio-2024-s2-q03", "page": 4, "rect": (60, 100, 535, 430), "desc": "Pedigree Analysis Chart"},
    {"qid": "bio-2024-s2-q04", "page": 5, "rect": (60, 100, 535, 430), "desc": "Plant Genetics Leaf Colour & Height Cross"},
    {"qid": "bio-2024-s2-q11", "page": 12, "rect": (60, 100, 535, 440), "desc": "Enzyme Competitive vs Allosteric Inhibition"},
    {"qid": "bio-2024-s2-q12", "page": 13, "rect": (60, 100, 535, 450), "desc": "Plasmid Vector Map TetR AmpR Selection"},
    {"qid": "bio-2024-s2-q15", "page": 16, "rect": (60, 240, 535, 680), "desc": "Endosymbiosis Cladogram Trees"},
    {"qid": "bio-2024-s2-q17", "page": 19, "rect": (60, 100, 535, 430), "desc": "Camel Heavy Chain Antibodies"},
    {"qid": "chem-2024-s2-q01", "page": 23, "rect": (60, 100, 535, 420), "desc": "Organic Reactant Transformation"},
    {"qid": "chem-2024-s2-q02", "page": 24, "rect": (60, 90, 535, 460), "desc": "Cyclohexene Free Radical Chlorination"},
    {"qid": "chem-2024-s2-q03", "page": 25, "rect": (60, 90, 535, 460), "desc": "NaBH4 Reduction and Lactonization"},
    {"qid": "chem-2024-s2-q04", "page": 26, "rect": (60, 90, 535, 460), "desc": "Phenol Nitration Ortho Para Products"},
    {"qid": "chem-2024-s2-q05", "page": 27, "rect": (60, 90, 535, 460), "desc": "Hofmann Bromamide Degradation Scheme"},
    {"qid": "chem-2024-s2-q06", "page": 28, "rect": (60, 90, 535, 460), "desc": "Non-Benzenoid Aromatic Annulenes"},
    {"qid": "chem-2024-s2-q07", "page": 29, "rect": (60, 90, 535, 460), "desc": "Basic Amino Acid Structures"},
    {"qid": "chem-2024-s2-q14", "page": 36, "rect": (60, 100, 535, 450), "desc": "Thermodynamic Cyclic Process PV Diagram"},
    {"qid": "chem-2024-s2-q15", "page": 37, "rect": (60, 90, 535, 450), "desc": "Wheatstone Bridge Conductivity Circuit"},
    {"qid": "chem-2024-s2-q16", "page": 38, "rect": (60, 90, 535, 450), "desc": "First Order Reaction Rate Plots"},
    {"qid": "math-2024-s2-q09", "page": 52, "rect": (60, 100, 535, 430), "desc": "Continuous Function Integral Region"},
    {"qid": "math-2024-s2-q14", "page": 57, "rect": (60, 100, 535, 430), "desc": "Square Inscribed in Circle Geometry"},
    {"qid": "math-2024-s2-q15", "page": 58, "rect": (60, 100, 535, 430), "desc": "Nested Tangent Circles in Unit Square"},
    {"qid": "math-2024-s2-q20", "page": 63, "rect": (60, 100, 535, 430), "desc": "Equilateral Triangle Segment Ratios"},
    {"qid": "phy-2024-s2-q08", "page": 72, "rect": (60, 100, 535, 430), "desc": "Bar Magnet Falling Through Induction Coil"},
]

def trim_white(im, pad=12):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    if bbox:
        return im.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(im.width, bbox[2] + pad), min(im.height, bbox[3] + pad)))
    return im

zoom = 3.0
mat = pymupdf.Matrix(zoom, zoom)

cld_map = {}

print(f"Extracting and uploading {len(image_specs)} diagram questions for NEST 2024 Session 2...")
sys.stdout.flush()

for idx, item in enumerate(image_specs):
    qid = item["qid"]
    page_num = item["page"]
    rect = pymupdf.Rect(*item["rect"])
    desc = item["desc"]
    
    page = doc[page_num - 1]
    pix = page.get_pixmap(matrix=mat, clip=rect, alpha=False)
    
    fname = f"nest_2024_s2_{qid.replace('-', '_')}.png"
    local_fpath = os.path.join(output_img_dir, fname)
    pix.save(local_fpath)
    
    try:
        im = Image.open(local_fpath)
        trimmed = trim_white(im, pad=12)
        trimmed.save(local_fpath)
    except Exception as e:
        print(f"Trim error {fname}: {e}")

    public_id = f"nest_2024_s2_{qid.replace('-', '_')}"
    try:
        res = cloudinary.uploader.upload(
            local_fpath,
            folder="nest_pyqs/2024_s2",
            public_id=public_id,
            overwrite=True,
            resource_type="image"
        )
        cld_url = res.get("secure_url")
        cld_map[qid] = {
            "local_path": f"/images/pyqs/2024_s2/{fname}",
            "cloudinary_url": cld_url,
            "desc": desc
        }
        print(f"[{idx+1}/{len(image_specs)}] {qid} -> {cld_url}")
        sys.stdout.flush()
    except Exception as e:
        print(f"Upload error {qid}: {e}")
        sys.stdout.flush()

with open(os.path.join(os.getcwd(), "scripts", "cloudinary_2024_s2_mapping.json"), "w", encoding="utf-8") as f:
    json.dump(cld_map, f, indent=2)

print("\nAll 2024 Session 2 diagrams uploaded successfully!")
