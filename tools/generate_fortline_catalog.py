from pathlib import Path
import json
import re
import subprocess
import unicodedata

SOURCE = Path(r"C:\Users\joaoc\Desktop\Catalogo-produtos\Fortline")
DESTINATION = Path("assets/catalogo-fortline")
OUTPUT = Path("catalog-fortline-data.js")
PDFTOPPM = Path(r"C:\Users\joaoc\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe")

DESTINATION.mkdir(parents=True, exist_ok=True)

def name_for(stem: str) -> str:
    value = stem.replace("_", " ")
    value = re.sub(r"(?i)catálogo|catalogo|fortline", "", value)
    value = re.sub(r"(?i)\b2025\b", "", value)
    value = re.sub(r"\s+", " ", value).strip(" - ")
    return value.title()

def slug(value: str) -> str:
    normalized = "".join(char for char in unicodedata.normalize("NFD", value) if not unicodedata.combining(char))
    return re.sub(r"[^a-z0-9]+", "-", normalized.lower()).strip("-")

items = []
for pdf in sorted(SOURCE.glob("*.pdf")):
    name = name_for(pdf.stem)
    target = DESTINATION / slug(name)
    image = next(DESTINATION.glob(f"{slug(name)}-*.jpg"), None)
    try:
        if image is None:
            subprocess.run([
                str(PDFTOPPM), "-f", "1", "-l", "1", "-scale-to-x", "700", "-scale-to-y", "-1",
                "-jpeg", "-jpegopt", "quality=84", str(pdf), str(target)
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            image = next(DESTINATION.glob(f"{slug(name)}-*.jpg"), None)
        if image is not None:
            items.append({
                "name": name,
                "image": f"assets/catalogo-fortline/{image.name}",
                "description": f"Produto {name} da Fortline para compor ambientes corporativos com funcionalidade e design.",
            })
    except subprocess.CalledProcessError:
        print(f"Skipped invalid PDF: {pdf.name}")

OUTPUT.write_text("window.FORTLINE_CATALOG = " + json.dumps(items, ensure_ascii=False) + ";\n", encoding="utf-8")
print(f"Generated {len(items)} Fortline lines")
