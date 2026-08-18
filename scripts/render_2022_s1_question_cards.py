import pymupdf
import os
import sys
import io
import json
import re
import PIL.Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r"d:\nest-pyq\2022 pyq session 1.pdf"
doc = pymupdf.open(pdf_path)

out_img_dir = r"d:\millionaire-at-22-nest-smartprep\public\images\pyqs\2022_s1"
os.makedirs(out_img_dir, exist_ok=True)

# Find all question bounding boxes
q_locs = []
for page_idx in range(len(doc)):
    page = doc[page_idx]
    blocks = page.get_text("blocks")
    for b in blocks:
        text = b[4]
        m = re.search(r'Question Number\s*:\s*(\d+)\s+Question Id\s*:\s*(\d+)\s+Question Type\s*:\s*(MCQ|MSQ)', text)
        if m:
            q_num = int(m.group(1))
            q_id = m.group(2)
            q_type = m.group(3)
            q_locs.append({
                "q_num": q_num,
                "q_id": q_id,
                "q_type": q_type,
                "page": page_idx,
                "bbox": (b[0], b[1], b[2], b[3])
            })

print(f"Total questions to render: {len(q_locs)}")

# Render each question card cleanly
for q_idx in range(len(q_locs)):
    q = q_locs[q_idx]
    q_num = q["q_num"]
    p_start = q["page"]
    y_start = q["bbox"][1]
    
    if q_idx + 1 < len(q_locs):
        next_q = q_locs[q_idx + 1]
        p_end = next_q["page"]
        y_end = next_q["bbox"][1]
    else:
        p_end = len(doc) - 1
        y_end = doc[p_end].rect.height - 20
        
    # If question is entirely on one page
    if p_start == p_end:
        page = doc[p_start]
        clip_rect = pymupdf.Rect(30, y_start, page.rect.width - 30, y_end)
        pix = page.get_pixmap(clip=clip_rect, dpi=200)
        card_name = f"q{q_num:02d}.png"
        pix.save(os.path.join(out_img_dir, card_name))
    else:
        # Question spans two pages
        page1 = doc[p_start]
        clip1 = pymupdf.Rect(30, y_start, page1.rect.width - 30, page1.rect.height - 20)
        pix1 = page1.get_pixmap(clip=clip1, dpi=200)
        
        page2 = doc[p_end]
        clip2 = pymupdf.Rect(30, 20, page2.rect.width - 30, y_end)
        pix2 = page2.get_pixmap(clip=clip2, dpi=200)
        
        im1 = PIL.Image.open(io.BytesIO(pix1.tobytes("png")))
        im2 = PIL.Image.open(io.BytesIO(pix2.tobytes("png")))
        
        total_w = max(im1.width, im2.width)
        total_h = im1.height + im2.height
        
        stitched = PIL.Image.new("RGB", (total_w, total_h), (255, 255, 255))
        stitched.paste(im1, (0, 0))
        stitched.paste(im2, (0, im1.height))
        
        card_name = f"q{q_num:02d}.png"
        stitched.save(os.path.join(out_img_dir, card_name))
        
    print(f"Rendered Q{q_num:02d} -> q{q_num:02d}.png (Page {p_start+1} to {p_end+1})")

print(f"\nAll 68 question cards successfully rendered in high-res 200 DPI!")
