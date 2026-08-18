import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Load the current 2023 s1 JSON
json_path = os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2023-s1.json")
with open(json_path, "r", encoding="utf-8") as f:
    paper = json.load(f)

# Cloudinary mapping
mapping_path = os.path.join(os.getcwd(), "scripts", "cloudinary_2023_s1_mapping.json")
with open(mapping_path, "r", encoding="utf-8") as f:
    cld = json.load(f)

img_urls = {
    # Biology
    "q1": cld["page_2_img_1_2.png"],
    "q5": cld["page_4_img_1_8.png"],
    "q6": cld["page_4_img_2_9.png"],
    "q9": cld["page_6_img_1_16.png"],
    "q13": cld["page_8_img_1_22.png"],
    "q15_1": cld["page_9_img_1_26.png"],
    "q15_2": cld["page_9_img_2_27.png"],
    "q16": cld["page_10_img_1_32.png"],
    "q17": cld["page_11_img_1_36.png"],
    
    # Chemistry
    "q19": cld["page_12_img_1_40.png"],
    "q21_opt_a": cld["page_13_img_1_44.png"],
    "q21_opt_b": cld["page_13_img_2_45.png"],
    "q21_opt_c": cld["page_13_img_3_46.png"],
    
    "q26_opt_a": cld["page_15_img_1_54.png"],
    "q26_opt_b": cld["page_15_img_2_55.png"],
    "q26_opt_c": cld["page_15_img_3_56.png"],
    
    "q28_scheme": cld["page_16_img_3_64.png"],
    "q28_opt_a": cld["page_16_img_1_62.png"],
    "q28_opt_b": cld["page_16_img_2_63.png"],
    
    "q29_scheme": cld["page_17_img_1_70.png"],
    "q29_opt_a": cld["page_17_img_2_71.png"],
    "q29_opt_b": cld["page_17_img_3_72.png"],
    "q29_opt_c": cld["page_17_img_4_73.png"],
    "q29_opt_d": cld["page_17_img_5_74.png"],
    
    "q33": cld["page_19_img_1_84.png"],
    
    # Mathematics
    "q43": cld["page_22_img_1_92.png"],
    "q44": cld["page_23_img_1_96.png"],
    
    # Physics
    "q53": cld["page_26_img_1_104.png"],
    "q55": cld["page_27_img_1_108.png"],
    "q60": cld["page_29_img_1_116.png"],
    "q63": cld["page_30_img_1_120.png"],
    "q64": cld["page_31_img_1_124.png"],
    "q67": cld["page_32_img_1_128.png"]
}

questions = paper["questions"]

for q in questions:
    qid = q["id"]
    
    # Biology Q1
    if qid == "bio-2023-s1-q01":
        q["imageSrc"] = img_urls["q1"]
        q["images"] = [img_urls["q1"]]
        q["isImageBased"] = True
    
    # Biology Q5
    elif qid == "bio-2023-s1-q05":
        q["imageSrc"] = img_urls["q5"]
        q["images"] = [img_urls["q5"]]
        q["isImageBased"] = True
        
    # Biology Q6
    elif qid == "bio-2023-s1-q06":
        q["imageSrc"] = img_urls["q6"]
        q["images"] = [img_urls["q6"]]
        q["isImageBased"] = True
        
    # Biology Q9
    elif qid == "bio-2023-s1-q09":
        q["imageSrc"] = img_urls["q9"]
        q["images"] = [img_urls["q9"]]
        q["isImageBased"] = True
        
    # Biology Q13
    elif qid == "bio-2023-s1-q13":
        q["imageSrc"] = img_urls["q13"]
        q["images"] = [img_urls["q13"]]
        q["isImageBased"] = True
        
    # Biology Q15
    elif qid == "bio-2023-s1-q15":
        q["imageSrc"] = img_urls["q15_1"]
        q["images"] = [img_urls["q15_1"], img_urls["q15_2"]]
        q["isImageBased"] = True
        
    # Biology Q16
    elif qid == "bio-2023-s1-q16":
        q["imageSrc"] = img_urls["q16"]
        q["images"] = [img_urls["q16"]]
        q["isImageBased"] = True
        
    # Biology Q17
    elif qid == "bio-2023-s1-q17":
        q["imageSrc"] = img_urls["q17"]
        q["images"] = [img_urls["q17"]]
        q["isImageBased"] = True
        
    # Chemistry Q19
    elif qid == "chem-2023-s1-q19":
        q["imageSrc"] = img_urls["q19"]
        q["images"] = [img_urls["q19"]]
        q["isImageBased"] = True
        
    # Chemistry Q21 (Reagent Options)
    elif qid == "chem-2023-s1-q21":
        q["options"][0]["text"] = "(i) $\\text{Mg / dry ether} \\rightarrow$ (ii) $\\text{CO}_2 \\rightarrow$ (iii) $\\text{H}_3\\text{O}^+$\n\n![Option A Scheme](" + img_urls["q21_opt_a"] + ")"
        q["options"][1]["text"] = "(i) $\\text{NaOH} \\rightarrow$ (ii) $\\text{KMnO}_4$\n\n![Option B Scheme](" + img_urls["q21_opt_b"] + ")"
        q["options"][2]["text"] = "(i) $\\text{CH}_3\\text{Cl / AlCl}_3 \\rightarrow$ (ii) $\\text{H}_2\\text{O}$\n\n![Option C Scheme](" + img_urls["q21_opt_c"] + ")"
        q["options"][3]["text"] = "(i) $\\text{KCN / ethanol} \\rightarrow$ (ii) $\\text{H}_2\\text{SO}_4$"

    # Chemistry Q26 (Coordination structures)
    elif qid == "chem-2023-s1-q26":
        q["imageSrc"] = img_urls["q26_opt_a"]
        q["images"] = [img_urls["q26_opt_a"], img_urls["q26_opt_b"], img_urls["q26_opt_c"]]
        q["isImageBased"] = True
        q["options"][0]["text"] = "$3$ ($1\\text{ trans} + 2\\text{ enantiomers of cis}$)\n\n![Isomer Structure A](" + img_urls["q26_opt_a"] + ")"
        q["options"][1]["text"] = "$2$ ($1\\text{ trans} + 1\\text{ cis}$)\n\n![Isomer Structure B](" + img_urls["q26_opt_b"] + ")"
        q["options"][2]["text"] = "$4$ ($2\\text{ trans} + 2\\text{ cis}$)\n\n![Isomer Structure C](" + img_urls["q26_opt_c"] + ")"
        q["options"][3]["text"] = "$6$"

    # Chemistry Q28 (Carbene product structures)
    elif qid == "chem-2023-s1-q28":
        q["imageSrc"] = img_urls["q28_scheme"]
        q["images"] = [img_urls["q28_scheme"], img_urls["q28_opt_a"], img_urls["q28_opt_b"]]
        q["isImageBased"] = True
        q["options"][0]["text"] = "*cis*-1,2-dimethylcyclopropane exclusively.\n\n![cis-Structure A](" + img_urls["q28_opt_a"] + ")"
        q["options"][1]["text"] = "*trans*-1,2-dimethylcyclopropane exclusively.\n\n![trans-Structure B](" + img_urls["q28_opt_b"] + ")"
        
    # Chemistry Q29 (Reaction and Product structures)
    elif qid == "chem-2023-s1-q29":
        q["imageSrc"] = img_urls["q29_scheme"]
        q["images"] = [img_urls["q29_scheme"], img_urls["q29_opt_a"], img_urls["q29_opt_b"], img_urls["q29_opt_c"], img_urls["q29_opt_d"]]
        q["isImageBased"] = True
        q["options"][0]["text"] = "Propiophenone (1-phenylpropan-1-one)\n\n![Product (1)](" + img_urls["q29_opt_a"] + ")"
        q["options"][1]["text"] = "Acetophenone\n\n![Product (2)](" + img_urls["q29_opt_b"] + ")"
        q["options"][2]["text"] = "Benzoic acid\n\n![Product (3)](" + img_urls["q29_opt_c"] + ")"
        q["options"][3]["text"] = "Benzyl alcohol\n\n![Product (4)](" + img_urls["q29_opt_d"] + ")"

    # Chemistry Q33
    elif qid == "chem-2023-s1-q33":
        q["imageSrc"] = img_urls["q33"]
        q["images"] = [img_urls["q33"]]
        q["isImageBased"] = True

    # Mathematics Q43
    elif qid == "math-2023-s1-q43":
        q["imageSrc"] = img_urls["q43"]
        q["images"] = [img_urls["q43"]]
        q["isImageBased"] = True

    # Mathematics Q44
    elif qid == "math-2023-s1-q44":
        q["imageSrc"] = img_urls["q44"]
        q["images"] = [img_urls["q44"]]
        q["isImageBased"] = True

    # Physics Q53
    elif qid == "phy-2023-s1-q53":
        q["imageSrc"] = img_urls["q53"]
        q["images"] = [img_urls["q53"]]
        q["isImageBased"] = True

    # Physics Q55
    elif qid == "phy-2023-s1-q55":
        q["imageSrc"] = img_urls["q55"]
        q["images"] = [img_urls["q55"]]
        q["isImageBased"] = True

    # Physics Q60
    elif qid == "phy-2023-s1-q60":
        q["imageSrc"] = img_urls["q60"]
        q["images"] = [img_urls["q60"]]
        q["isImageBased"] = True

    # Physics Q63
    elif qid == "phy-2023-s1-q63":
        q["imageSrc"] = img_urls["q63"]
        q["images"] = [img_urls["q63"]]
        q["isImageBased"] = True

    # Physics Q64
    elif qid == "phy-2023-s1-q64":
        q["imageSrc"] = img_urls["q64"]
        q["images"] = [img_urls["q64"]]
        q["isImageBased"] = True

    # Physics Q67
    elif qid == "phy-2023-s1-q67":
        q["imageSrc"] = img_urls["q67"]
        q["images"] = [img_urls["q67"]]
        q["isImageBased"] = True

# Save full paper JSON
d_dir = r"d:\nest-pyq\jsons\2023_s1"
app_jsons_dir = os.path.join(os.getcwd(), "content", "nest", "jsons", "2023_s1")
mocks_dir = os.path.join(os.getcwd(), "content", "nest", "mocks", "nest")

with open(os.path.join(d_dir, "nest_2023_session_1_full_paper.json"), "w", encoding="utf-8") as f:
    json.dump(paper, f, indent=2, ensure_ascii=False)

with open(os.path.join(app_jsons_dir, "nest_2023_session_1_full_paper.json"), "w", encoding="utf-8") as f:
    json.dump(paper, f, indent=2, ensure_ascii=False)

with open(os.path.join(mocks_dir, "nest-pyq-2023-s1.json"), "w", encoding="utf-8") as f:
    json.dump(paper, f, indent=2, ensure_ascii=False)

# Update individual subject files
subjects_map = {"Biology": [], "Chemistry": [], "Mathematics": [], "Physics": []}
for q in questions:
    subjects_map[q["subject"]].append(q)

sub_files = {"Biology": "biology.json", "Chemistry": "chemistry.json", "Mathematics": "mathematics.json", "Physics": "physics.json"}
sub_codes = {"Biology": "bio", "Chemistry": "chem", "Mathematics": "math", "Physics": "phy"}

for sname, sqs in subjects_map.items():
    fname = sub_files[sname]
    sub_payload = {
        "exam": "NEST",
        "year": 2023,
        "session": 1,
        "subject": sname,
        "totalQuestions": len(sqs),
        "questions": sqs
    }
    with open(os.path.join(d_dir, fname), "w", encoding="utf-8") as f:
        json.dump(sub_payload, f, indent=2, ensure_ascii=False)
    with open(os.path.join(app_jsons_dir, fname), "w", encoding="utf-8") as f:
        json.dump(sub_payload, f, indent=2, ensure_ascii=False)
    
    sub_app_dir = os.path.join(os.getcwd(), "content", "nest", sname.lower(), "pyqs")
    with open(os.path.join(sub_app_dir, f"nest-2023-s1-{sub_codes[sname]}.json"), "w", encoding="utf-8") as f:
        json.dump(sub_payload, f, indent=2, ensure_ascii=False)

print("Successfully injected all question diagrams and option-specific images!")
