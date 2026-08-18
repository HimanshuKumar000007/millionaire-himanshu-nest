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

pdf_path = r"d:\nest-pyq\2024 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2024_s1")
os.makedirs(output_img_dir, exist_ok=True)

def trim_white(im, pad=12):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    if bbox:
        return im.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(im.width, bbox[2] + pad), min(im.height, bbox[3] + pad)))
    return im

zoom = 3.5
mat = pymupdf.Matrix(zoom, zoom)

# Crop definitions (page is 0-indexed in pymupdf)
# Option A: Page 7 (idx 6), y 305 to 425
# Option B: Page 7 (idx 6), y 428 to 548
# Option C: Page 7 (idx 6), y 550 to 670
# Option D: Page 8 (idx 7), y 80 to 200

crops = [
    {"id": "opt_a", "page_idx": 6, "rect": (255, 305, 410, 425)},
    {"id": "opt_b", "page_idx": 6, "rect": (255, 428, 410, 548)},
    {"id": "opt_c", "page_idx": 6, "rect": (255, 550, 410, 670)},
    {"id": "opt_d", "page_idx": 7, "rect": (255, 80, 410, 200)},
]

uploaded_urls = {}

print("Cropping and uploading Q6 options A, B, C, D...")
sys.stdout.flush()

for c in crops:
    cid = c["id"]
    page = doc[c["page_idx"]]
    rect = pymupdf.Rect(*c["rect"])
    pix = page.get_pixmap(matrix=mat, clip=rect, alpha=False)
    
    fname = f"nest_2024_s1_bio_q06_{cid}.png"
    local_path = os.path.join(output_img_dir, fname)
    pix.save(local_path)
    
    # Trim
    im = Image.open(local_path)
    trimmed = trim_white(im, pad=10)
    trimmed.save(local_path)
    
    # Upload to Cloudinary
    public_id = f"nest_2024_s1_bio_q06_{cid}"
    res = cloudinary.uploader.upload(
        local_path,
        folder="nest_pyqs/2024_s1",
        public_id=public_id,
        overwrite=True,
        resource_type="image"
    )
    cld_url = res.get("secure_url")
    uploaded_urls[cid] = cld_url
    print(f"{cid} -> {cld_url}")
    sys.stdout.flush()

# Now construct the exact official Question 6
q6_prompt = """An unknown organism that can utilise $\\text{NH}_4\\text{Cl}$ as nitrogen source was grown for several generations under four different conditions as given below:

(i) medium containing $^{15}\\text{NH}_4\\text{Cl}$
(ii) medium containing $^{14}\\text{NH}_4\\text{Cl}$
(iii) medium containing $^{15}\\text{NH}_4\\text{Cl}$ followed by culturing in medium containing $^{14}\\text{NH}_4\\text{Cl}$ for one generation
(iv) medium containing $^{15}\\text{NH}_4\\text{Cl}$ followed by culturing in medium containing $^{14}\\text{NH}_4\\text{Cl}$ for two generations

DNA isolated from the organism grown under the above listed conditions was independently analysed by density gradient centrifugation. Assuming that the mode of DNA replication in this organism is **dispersive**, the option representing the correct band pattern is:"""

q6_obj = {
    "id": "bio-2024-s1-q06",
    "exam": "NEST",
    "year": 2024,
    "session": 1,
    "shift": "Shift 1 (Morning)",
    "subject": "Biology",
    "topic": "Molecular Genetics",
    "subtopic": "Dispersive DNA Replication & Density Gradient Centrifugation",
    "difficulty": "High-Yield",
    "status": "published",
    "questionType": "MCQ",
    "isImageBased": True,
    "imageSrc": uploaded_urls["opt_a"],
    "images": [uploaded_urls["opt_a"], uploaded_urls["opt_b"], uploaded_urls["opt_c"], uploaded_urls["opt_d"]],
    "questionText": q6_prompt,
    "options": [
        {
            "id": "a",
            "text": f"![Option A Band Pattern]({uploaded_urls['opt_a']})",
            "isCorrect": True,
            "explanation": "Correct answer verified by official NEST 2024 Session 1 master answer key. In dispersive replication, all DNA molecules after Gen 1 have 50% 15N/14N hybrid density, and after Gen 2 all molecules have 25% 15N and 75% 14N intermediate density (a single band shifting progressively towards light position)."
        },
        {
            "id": "b",
            "text": f"![Option B Band Pattern]({uploaded_urls['opt_b']})",
            "isCorrect": False,
            "explanation": "Incorrect option."
        },
        {
            "id": "c",
            "text": f"![Option C Band Pattern]({uploaded_urls['opt_c']})",
            "isCorrect": False,
            "explanation": "Incorrect option."
        },
        {
            "id": "d",
            "text": f"![Option D Band Pattern]({uploaded_urls['opt_d']})",
            "isCorrect": False,
            "explanation": "Incorrect option."
        }
    ],
    "marks": 3.0,
    "negativeMarks": 1.0,
    "solutionExplanation": "**Official NEST 2024 Master Answer Key:** Option (A) is correct.\n\n**Dispersive Replication Mechanism:**\n- **(i) $^{15}\\text{N}$ only:** 100% heavy band at the bottom.\n- **(ii) $^{14}\\text{N}$ only:** 100% light band near the top.\n- **(iii) 1 Generation in $^{14}\\text{N}$:** Semiconservative and dispersive both yield a single hybrid (intermediate) band at 50% density.\n- **(iv) 2 Generations in $^{14}\\text{N}$:** In dispersive replication, parental DNA is fragmented and dispersed across all 4 daughter duplexes. Hence, 100% of DNA forms a **single uniform band** at $\\frac{1}{4}$ $^{15}\\text{N} + \\frac{3}{4}$ $^{14}\\text{N}$ intermediate position (unlike semiconservative which yields two separate bands).",
    "keyFormulae": [
        "Dispersive replication: Single hybrid band at density = (1/2^n) * rho_heavy + (1 - 1/2^n) * rho_light"
    ],
    "hints": [
        "Recall that in dispersive replication, no separate light band forms; rather, all duplexes shift continuously upward as a single band."
    ]
}

# Update all JSON files
targets = [
    os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2024-s1.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2024_s1", "nest_2024_session_1_full_paper.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2024_s1", "biology.json"),
    os.path.join(os.getcwd(), "content", "nest", "biology", "pyqs", "nest-2024-s1-bio.json"),
    r"d:\nest-pyq\jsons\2024_s1\nest_2024_session_1_full_paper.json",
    r"d:\nest-pyq\jsons\2024_s1\biology.json"
]

for t in targets:
    if os.path.exists(t):
        with open(t, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        def update_q6(qs):
            for idx, q in enumerate(qs):
                if q.get("id") == "bio-2024-s1-q06":
                    qs[idx] = q6_obj
                    return True
            return False
            
        if isinstance(data, dict) and "questions" in data:
            update_q6(data["questions"])
        elif isinstance(data, list):
            update_q6(data)
            
        with open(t, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Updated Q6 in: {t}")

print("\nQuestion 6 with authentic multi-page options A, B, C, D uploaded and integrated successfully!")
