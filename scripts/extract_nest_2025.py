import os
import sys
import json
import re

def main():
    pdf_path = r"d:\nest-pyq\2025 pyq.pdf"
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        return

    output_img_dir = os.path.join(os.getcwd(), "public", "images", "pyqs", "2025")
    os.makedirs(output_img_dir, exist_ok=True)

    print(f"Opening PDF: {pdf_path}")
    import fitz  # PyMuPDF
    doc = fitz.open(pdf_path)
    print(f"Total Pages: {len(doc)}")

    # Extract all text and images
    extracted_data = []
    image_count = 0

    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text("text")
        
        # Extract images on this page
        image_list = page.get_images(full=True)
        page_images = []
        for img_idx, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            image_filename = f"page_{page_num+1}_img_{img_idx+1}.{image_ext}"
            image_filepath = os.path.join(output_img_dir, image_filename)
            with open(image_filepath, "wb") as f:
                f.write(image_bytes)
            image_count += 1
            rel_path = f"/images/pyqs/2025/{image_filename}"
            page_images.append({
                "filename": image_filename,
                "src": rel_path,
                "width": base_image.get("width"),
                "height": base_image.get("height")
            })

        extracted_data.append({
            "page": page_num + 1,
            "text": text,
            "images": page_images
        })

    print(f"Extraction complete. Total images extracted: {image_count}")
    
    # Save raw extracted dump to scratch
    scratch_dump = os.path.join(os.getcwd(), "scripts", "nest_2025_raw_dump.json")
    with open(scratch_dump, "w", encoding="utf-8") as f:
        json.dump(extracted_data, f, indent=2, ensure_ascii=False)
    print(f"Raw dump written to: {scratch_dump}")

if __name__ == "__main__":
    main()
