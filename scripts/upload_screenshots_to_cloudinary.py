import os
import sys
import json
import time
import cloudinary
import cloudinary.uploader

sys.stdout.reconfigure(encoding='utf-8')

# Configure Cloudinary with user credentials
cloudinary.config(
    cloud_name='dhb8qmnxt',
    api_key='765898971433311',
    api_secret='G2VwK8LpxSzAimI95EaebadJXwk'
)

print("Starting Cloudinary upload for 19 NEST 2025 image-based questions...")
sys.stdout.flush()

image_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2025")

# 19 image questions
image_questions = [
    ("bio-2025-q04", "nest_2025_bio_q04_figure.png", "Oxygen Dissociation Curve"),
    ("bio-2025-q08", "nest_2025_bio_q08_figure.png", "Cell Cycle Checkpoints"),
    ("bio-2025-q12", "nest_2025_bio_q12_figure.png", "Dicot Stem Tissue Pattern"),
    ("bio-2025-q13", "nest_2025_bio_q13_figure.png", "Pedigree Analysis Charts"),
    ("bio-2025-q16", "nest_2025_bio_q16_figure.png", "Phylogenetic Cladograms Matrix"),
    ("bio-2025-q17", "nest_2025_bio_q17_figure.png", "Bristle Distribution Curve"),
    ("chem-2025-q02", "nest_2025_chem_q02_figure.png", "IUPAC Alcohol Structure"),
    ("chem-2025-q08", "nest_2025_chem_q08_figure.png", "Aromatic Substitution Products"),
    ("chem-2025-q09", "nest_2025_chem_q09_figure.png", "Reaction Condensation Scheme"),
    ("chem-2025-q10", "nest_2025_chem_q10_figure.png", "Cumene Hydroperoxide Products"),
    ("chem-2025-q16", "nest_2025_chem_q16_figure.png", "Photoelectric Vmax Graphs"),
    ("chem-2025-q17", "nest_2025_chem_q17_figure.png", "Molecular Orbital Level Diagram"),
    ("chem-2025-q19", "nest_2025_chem_q19_figure.png", "Gibbs Free Energy Surface Plots"),
    ("math-2025-q06", "nest_2025_math_q06_figure.png", "Internally Tangent Circles Diagram"),
    ("phy-2025-q05", "nest_2025_phy_q05_figure.png", "Snell Law Ray Interface"),
    ("phy-2025-q10", "nest_2025_phy_q10_figure.png", "Capacitor Circuit Diagram"),
    ("phy-2025-q12", "nest_2025_phy_q12_figure.png", "Square Current Loop in B Field"),
    ("phy-2025-q13", "nest_2025_phy_q13_figure.png", "Qualitative Phase Diagram"),
    ("phy-2025-q19", "nest_2025_phy_q19_figure.png", "Multilayer Glass Refraction Stack"),
]

q_to_cloudinary_url = {}

for idx, (q_id, filename, desc) in enumerate(image_questions):
    file_path = os.path.join(image_dir, filename)
    public_id = f"nest_2025_{q_id.replace('-', '_')}"
    
    if not os.path.exists(file_path):
        print(f"Warning: File {file_path} not found.")
        continue
        
    try:
        res = cloudinary.uploader.upload(
            file_path,
            folder="nest_pyqs/2025",
            public_id=public_id,
            overwrite=True,
            resource_type="image"
        )
        sec_url = res.get("secure_url")
        q_to_cloudinary_url[q_id] = {
            "local_path": f"/images/pyqs/2025/{filename}",
            "cloudinary_url": sec_url,
            "desc": desc
        }
        print(f"[{idx+1}/{len(image_questions)}] Uploaded {q_id} ({desc}) -> {sec_url}")
        sys.stdout.flush()
    except Exception as e:
        print(f"Error uploading {q_id}: {e}")
        sys.stdout.flush()

# Save mapping
mapping_path = os.path.join(os.getcwd(), "scripts", "cloudinary_pyq_2025_mapping.json")
with open(mapping_path, "w", encoding="utf-8") as f:
    json.dump(q_to_cloudinary_url, f, indent=2)

print(f"\nUploaded {len(q_to_cloudinary_url)} image questions to Cloudinary.")
print(f"Saved mapping to: {mapping_path}")
sys.stdout.flush()

# Now update all JSON files
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

def update_question_node(q):
    qid = q.get("id")
    if qid in q_to_cloudinary_url:
        info = q_to_cloudinary_url[qid]
        cld_url = info["cloudinary_url"]
        loc_url = info["local_path"]
        
        q["isImageBased"] = True
        q["imageSrc"] = cld_url
        q["images"] = [cld_url, loc_url]
        
        # Replace image URLs in questionText
        q_text = q.get("questionText", "")
        # Remove any previous local image tags and append the Cloudinary figure
        import re
        q_text_clean = re.sub(r"!\[.*?\]\(.*?\)", "", q_text).strip()
        q["questionText"] = f"{q_text_clean}\n\n![{info['desc']}]({cld_url})"

for target in json_targets:
    if os.path.exists(target):
        with open(target, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        if isinstance(data, dict) and "questions" in data:
            for q in data["questions"]:
                update_question_node(q)
        elif isinstance(data, list):
            for q in data:
                update_question_node(q)
                
        with open(target, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Updated: {target}")

print("All JSON files successfully linked with Cloudinary image URLs!")
