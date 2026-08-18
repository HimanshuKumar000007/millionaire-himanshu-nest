import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Table for Biology 2024 S1 Q3
bio_2024_q3_table = """In a given plant, the flower colour is governed by a single gene locus. The flower can be either white, red, blue or purple colour. However, a single flower will never have different coloured petals.

Multiple crosses were carried out between plants with different flower colours (white, red, blue or purple) and the observations on the progeny phenotype are tabulated:

| Cross | Progeny Phenotypes |
| :--- | :--- |
| **White $\\times$ White** | All flowers are white |
| **Red $\\times$ Red** | All flowers are red or some are red and some are white (number of red $\\gg$ number of white) |
| **Blue $\\times$ Blue** | All flowers are blue or some are blue and some are white (number of blue $\\gg$ number of white) |
| **Purple $\\times$ Purple** | A mix of red, blue and purple flowers (number of purple flowers $>$ numbers of red and blue flowers and equal number of red and blue flowers) |
| **White $\\times$ Red** | All flowers are red or some are red and some are white (equal number of red and white flowers) |
| **White $\\times$ Blue** | All flowers are blue or some are blue and some are white (equal number of blue and white flowers) |
| **White $\\times$ Purple** | Blue and red flowers (equal number of red and blue flowers) |
| **Red $\\times$ Blue** | All flowers are purple or some are red, some are blue and some are white |
| **Red $\\times$ Purple** | Mostly red and purple flowers and some are blue |
| **Blue $\\times$ Purple** | Mostly blue and purple flowers and some are red |

Based on this information, the correct option is:"""

# Table for Biology 2025 Q16
bio_2025_q16_table = """The table depicts list of characters (I-V) in five species (M-Q) where 1 represents presence and 0 represents absence of the character.

| Species | Character I | Character II | Character III | Character IV | Character V |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Species M** | 0 | 1 | 1 | 0 | 0 |
| **Species N** | 0 | 0 | 1 | 0 | 0 |
| **Species O** | 0 | 1 | 1 | 1 | 1 |
| **Species P** | 1 | 1 | 1 | 1 | 1 |
| **Species Q** | 0 | 1 | 1 | 1 | 0 |

The tree that correctly represents the evolutionary relationship between the species M, N, O, P and Q is:

![Phylogenetic Cladograms Matrix](https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786974148/nest_pyqs/2025/nest_2025_bio_2025_q16.png)"""

json_files = [
    r"d:\nest-pyq\jsons\2024_s1\nest_2024_session_1_full_paper.json",
    r"d:\nest-pyq\jsons\2024_s1\biology.json",
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2024_s1", "nest_2024_session_1_full_paper.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2024_s1", "biology.json"),
    os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2024-s1.json"),
    os.path.join(os.getcwd(), "content", "nest", "biology", "pyqs", "nest-2024-s1-bio.json"),
    r"d:\nest-pyq\jsons\2025\nest_2025_full_paper.json",
    r"d:\nest-pyq\jsons\2025\biology.json",
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "nest_2025_full_paper.json"),
    os.path.join(os.getcwd(), "content", "nest", "jsons", "2025", "biology.json"),
    os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2025.json"),
    os.path.join(os.getcwd(), "content", "nest", "biology", "pyqs", "nest-2025-bio.json"),
]

for jf in json_files:
    if os.path.exists(jf):
        with open(jf, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        def update_node(q):
            if q.get("id") == "bio-2024-s1-q03":
                q["questionText"] = bio_2024_q3_table
            elif q.get("id") == "bio-2025-q16":
                q["questionText"] = bio_2025_q16_table

        if isinstance(data, dict) and "questions" in data:
            for q in data["questions"]:
                update_node(q)
        elif isinstance(data, list):
            for q in data:
                update_node(q)
                
        with open(jf, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Updated table formatting in: {jf}")

print("Table-based questions formatted successfully!")
