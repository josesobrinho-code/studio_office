from pathlib import Path
import json
import re
import pdfplumber

SOURCE = Path(r"C:\Users\joaoc\Desktop\Catalogo-produtos\Catalogos")
OUTPUT = Path("catalog-cavaletti-data.js")

def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()

def description(name: str, text: str) -> str:
    text = clean(text)
    parts = re.split(r"(?<=[.!?])\s+", text)
    usable = [p for p in parts if len(p) > 80 and not re.search(r"\b\d{1,2}\.\d{3}\b", p)]
    if usable:
        candidate = usable[0]
        if candidate.lower().startswith(name.lower() + " "):
            candidate = candidate[len(name):].strip()
        return candidate[:330].rstrip(" ,;:") + "."
    return f"Linha {name} da Cavaletti, desenvolvida para ambientes corporativos."

items = []
for pdf in sorted(SOURCE.glob("*.pdf")):
    name = re.sub(r"^Cavaletti\s+", "", pdf.stem).replace("Caveleti ", "")
    with pdfplumber.open(pdf) as document:
        pages = document.pages
        cover_text = "\n".join((page.extract_text() or "") for page in pages[:2])
        full_text = "\n".join((page.extract_text() or "") for page in pages)
    codes = []
    for code in re.findall(r"(?<!\d)(\d{1,2}\.\d{3})(?!\d)", full_text):
        if code not in codes:
            codes.append(code)
    items.append({"name": name, "description": description(name, cover_text), "codes": codes})

OUTPUT.write_text("window.CAVALLETTI_CATALOG = " + json.dumps(items, ensure_ascii=False) + ";\n", encoding="utf-8")
print(f"Generated {len(items)} collections in {OUTPUT}")
