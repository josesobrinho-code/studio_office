from pathlib import Path
import argparse
import re
import subprocess
import tempfile

import pdfplumber
from PIL import Image

SOURCE = Path(r"C:\Users\joaoc\Desktop\Catalogo-produtos\Catalogos")
DESTINATION = Path("assets/catalogo-cavaletti/modelos")
PDFTOPPM = Path(r"C:\Users\joaoc\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe")
CODE = re.compile(r"^\d{1,2}\.\d{3}$")

parser = argparse.ArgumentParser()
parser.add_argument("--only", help="Part of the PDF file name to process")
parser.add_argument("--force", action="store_true", help="Replace existing model crops")
args = parser.parse_args()

DESTINATION.mkdir(parents=True, exist_ok=True)

for pdf in sorted(SOURCE.glob("*.pdf")):
    if args.only and args.only.lower() not in pdf.name.lower():
        continue

    found = {}
    with pdfplumber.open(pdf) as document:
        for page_number, page in enumerate(document.pages, 1):
            for word in page.extract_words():
                code = word["text"]
                if CODE.fullmatch(code) and code not in found:
                    found[code] = (page_number, page.width, page.height, word)

    pages = {}
    for code, record in found.items():
        if args.force or not (DESTINATION / f"{code}.jpg").exists():
            pages.setdefault(record[0], []).append((code, record))

    with tempfile.TemporaryDirectory() as temp:
        for page_number, models in pages.items():
            prefix = Path(temp) / f"page-{page_number}"
            subprocess.run([
                str(PDFTOPPM), "-f", str(page_number), "-l", str(page_number),
                "-scale-to-x", "1200", "-scale-to-y", "-1", "-jpeg", "-jpegopt", "quality=88",
                str(pdf), str(prefix),
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            rendered = next(Path(temp).glob(f"page-{page_number}-*.jpg"))
            image = Image.open(rendered)
            for code, (_, page_width, page_height, word) in models:
                output = DESTINATION / f"{code}.jpg"
                scale_x = image.width / page_width
                scale_y = image.height / page_height
                # Product renders are usually positioned directly above and left of their code label.
                left = max(0, int((word["x0"] - 115) * scale_x))
                top = max(0, int((word["top"] - 105) * scale_y))
                right = min(image.width, int((word["x0"] + 65) * scale_x))
                bottom = min(image.height, int((word["top"] + 48) * scale_y))
                crop = image.crop((left, top, right, bottom))
                crop.thumbnail((520, 450), Image.Resampling.LANCZOS)
                canvas = Image.new("RGB", (520, 450), "white")
                canvas.paste(crop, ((520 - crop.width) // 2, (450 - crop.height) // 2))
                canvas.save(output, "JPEG", quality=86, optimize=True)
                print(f"Rendered {code} from {pdf.name}")
