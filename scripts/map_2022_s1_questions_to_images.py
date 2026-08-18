import pymupdf
import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2022 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

# Let's map each page's text and images
# In TCS iON response sheet, each question begins with:
# "Question Number : N Question Id : XXXXX Question Type : MCQ/MSQ ..."
# followed by image(s) for the question prompt and images for the options.
# Also, next to the correct option ID (e.g. 733235817), there is a green tick icon (xref with size 528 bytes or 16x16).

question_map = {}

current_subject = "Biology"
current_q_num = None
current_q_id = None
current_q_type = None

for page_num in range(len(doc)):
    page = doc[page_num]
    text = page.get_text()
    
    # Check subject headers
    if "Section Number : 1" in text or "Biology" in text:
        current_subject = "Biology"
    if "Section Number : 2" in text or "Chemistry" in text:
        current_subject = "Chemistry"
    if "Section Number : 3" in text or "Mathematics" in text:
        current_subject = "Mathematics"
    if "Section Number : 4" in text or "Physics" in text:
        current_subject = "Physics"
        
    # Get image list on this page
    img_list = page.get_images(full=True)
    
    # Search for question starts on this page
    q_matches = list(re.finditer(r'Question Number\s*:\s*(\d+)\s+Question Id\s*:\s*(\d+)\s+Question Type\s*:\s*(MCQ|MSQ)', text))
    
    print(f"--- Page {page_num+1} ({current_subject}) --- Images: {len(img_list)} --- Questions found: {[m.group(1) for m in q_matches]}")
    for img_idx, img in enumerate(img_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        w, h = base_image.get("width"), base_image.get("height")
        size = len(base_image["image"])
        print(f"    Img {img_idx+1}: xref {xref} ({w}x{h}, {size} bytes)")
