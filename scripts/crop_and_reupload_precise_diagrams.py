import os
import sys
import json
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

pdf_path = r"d:\nest-pyq\2025 pyq.pdf"
doc = pymupdf.open(pdf_path)
output_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2025")
os.makedirs(output_dir, exist_ok=True)

# Precise diagram bounding boxes in PDF points (x0, y0, x1, y1)
diagram_specs = [
    {
        "qid": "bio-2025-q04",
        "page": 5,
        "rect": (60, 100, 535, 455),
        "desc": "Oxygen Dissociation Curve"
    },
    {
        "qid": "bio-2025-q08",
        "page": 9,
        "rect": (60, 86, 535, 438),
        "desc": "Cell Cycle Checkpoints"
    },
    {
        "qid": "bio-2025-q12",
        "page": 13,
        "rect": (60, 86, 535, 334),
        "desc": "Dicot Stem Tissue Pattern"
    },
    {
        "qid": "bio-2025-q13",
        "page": 14,
        "rect": (60, 86, 535, 540),
        "desc": "Pedigree Analysis Charts"
    },
    {
        "qid": "bio-2025-q16",
        "page": 17,
        "rect": (60, 86, 535, 554),
        "desc": "Phylogenetic Cladograms Matrix"
    },
    {
        "qid": "bio-2025-q17",
        "page": 18,
        "rect": (60, 114, 535, 456),
        "desc": "Bristle Distribution Curve"
    },
    {
        "qid": "chem-2025-q02",
        "page": 23,
        "rect": (60, 86, 535, 183),
        "desc": "IUPAC Alcohol Structure"
    },
    {
        "qid": "chem-2025-q08",
        "page": 29,
        "rect": (60, 86, 535, 545),
        "desc": "Aromatic Substitution Products"
    },
    {
        "qid": "chem-2025-q09",
        "page": 30,
        "rect": (60, 86, 535, 378),
        "desc": "Reaction Condensation Scheme"
    },
    {
        "qid": "chem-2025-q10",
        "page": 31,
        "rect": (60, 114, 535, 380),
        "desc": "Cumene Hydroperoxide Products"
    },
    {
        "qid": "chem-2025-q16",
        "page": 37,
        "rect": (60, 114, 535, 544),
        "desc": "Photoelectric Vmax Graphs"
    },
    {
        "qid": "chem-2025-q17",
        "page": 38,
        "rect": (60, 86, 535, 317),
        "desc": "Molecular Orbital Level Diagram"
    },
    {
        "qid": "chem-2025-q19",
        "page": 40,
        "rect": (60, 143, 535, 496),
        "desc": "Gibbs Free Energy Surface Plots"
    },
    {
        "qid": "math-2025-q06",
        "page": 47,
        "rect": (380, 100, 545, 235),
        "desc": "Internally Tangent Circles Diagram"
    },
    {
        "qid": "phy-2025-q05",
        "page": 66,
        "rect": (60, 102, 535, 312),
        "desc": "Snell Law Ray Interface"
    },
    {
        "qid": "phy-2025-q10",
        "page": 71,
        "rect": (60, 116, 535, 272),
        "desc": "Capacitor Circuit Diagram"
    },
    {
        "qid": "phy-2025-q12",
        "page": 73,
        "rect": (60, 114, 535, 293),
        "desc": "Square Current Loop in B Field"
    },
    {
        "qid": "phy-2025-q13",
        "page": 74,
        "rect": (60, 100, 535, 313),
        "desc": "Qualitative Phase Diagram"
    },
    {
        "qid": "phy-2025-q19",
        "page": 80,
        "rect": (60, 129, 535, 298),
        "desc": "Multilayer Glass Refraction Stack"
    }
]

def trim_white_border(im, padding=12):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    if bbox:
        x0 = max(0, bbox[0] - padding)
        y0 = max(0, bbox[1] - padding)
        x1 = min(im.width, bbox[2] + padding)
        y1 = min(im.height, bbox[3] + padding)
        return im.crop((x0, y0, x1, y1))
    return im

print("Rendering high-res crops and uploading to Cloudinary...")
sys.stdout.flush()

zoom = 3.0 # 300+ DPI
mat = pymupdf.Matrix(zoom, zoom)

results = {}

for idx, spec in enumerate(diagram_specs):
    qid = spec["qid"]
    page_num = spec["page"]
    rect = pymupdf.Rect(*spec["rect"])
    desc = spec["desc"]
    
    page = doc[page_num - 1]
    # Render exact crop
    pix = page.get_pixmap(matrix=mat, clip=rect, alpha=False)
    
    filename = f"nest_2025_{qid.replace('-', '_')}.png"
    local_path = os.path.join(output_dir, filename)
    pix.save(local_path)
    
    # Auto trim excess white space while keeping padding
    try:
        im = Image.open(local_path)
        trimmed = trim_white_border(im, padding=16)
        trimmed.save(local_path)
    except Exception as e:
        print(f"Trimming error on {filename}: {e}")

    public_id = f"nest_2025_{qid.replace('-', '_')}"
    try:
        res = cloudinary.uploader.upload(
            local_path,
            folder="nest_pyqs/2025",
            public_id=public_id,
            overwrite=True,
            resource_type="image"
        )
        cld_url = res.get("secure_url")
        results[qid] = {
            "local_path": f"/images/pyqs/2025/{filename}",
            "cloudinary_url": cld_url,
            "desc": desc
        }
        print(f"[{idx+1}/{len(diagram_specs)}] {qid} -> {cld_url}")
        sys.stdout.flush()
    except Exception as e:
        print(f"Upload error {qid}: {e}")
        sys.stdout.flush()

# Update all JSON files
json_targets = [
    r"d:\nest-pyq\jsons\2025\nest_2025_full_paper.json",
    r"d:\nest-pyq\jsons\2025\biology.json",
    r"d:\nest-pyq\jsons\2025\chemistry.json",
    r"d:\nest-pyq\jsons\2025\mathematics.json",
    r"d:\nest-pyq\jsons\2025\physics.json",
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "nest_2025_full_paper.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "biology.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "chemistry.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "mathematics.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "physics.json"),
    os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2025.json"),
    os.path.join(os.getcwd(), "content", "nest", "biology", "pyqs", "nest-2025-bio.json"),
    os.path.join(os.getcwd(), "content", "nest", "chemistry", "pyqs", "nest-2025-chem.json"),
    os.path.join(os.getcwd(), "content", "nest", "mathematics", "pyqs", "nest-2025-math.json"),
    os.path.join(os.getcwd(), "content", "nest", "physics", "pyqs", "nest-2025-phy.json"),
]

import re

def update_q(q):
    qid = q.get("id")
    if qid in results:
        info = results[qid]
        cld_url = info["cloudinary_url"]
        loc_path = info["local_path"]
        
        q["isImageBased"] = True
        q["imageSrc"] = cld_url
        q["images"] = [cld_url, loc_path]
        
        q_text = q.get("questionText", "")
        # Remove any previous image markdown
        q_text_clean = re.sub(r"!\[.*?\]\(.*?\)", "", q_text).strip()
        q["questionText"] = f"{q_text_clean}\n\n![{info['desc']}]({cld_url})"

for target in json_targets:
    if os.path.exists(target):
        with open(target, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, dict) and "questions" in data:
            for q in data["questions"]:
                update_q(q)
        elif isinstance(data, list):
            for q in data:
                update_q(q)
        with open(target, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Updated JSON: {target}")

print("All precise diagrams re-rendered, uploaded to Cloudinary, and JSONs updated!")
