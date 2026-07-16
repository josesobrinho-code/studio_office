from pathlib import Path
import re
import subprocess

SOURCE = Path(r"C:\Users\joaoc\Desktop\Catalogo-produtos\Catalogos")
DESTINATION = Path("assets/catalogo-cavaletti")
PDFTOPPM = Path(r"C:\Users\joaoc\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe")

DESTINATION.mkdir(parents=True, exist_ok=True)

def slug(value: str) -> str:
    value = re.sub(r"^Cavaletti\s+", "", value).replace("Caveleti ", "")
    value = value.replace(";", "-").replace(" ", "-")
    return re.sub(r"[^a-z0-9-]", "", value.lower())

for pdf in sorted(SOURCE.glob("*.pdf")):
    stem = slug(pdf.stem)
    target = DESTINATION / stem
    output = DESTINATION / f"{stem}-1.jpg"
    if output.exists():
        print(f"Already rendered: {pdf.name}")
        continue
    subprocess.run([
        str(PDFTOPPM), "-f", "1", "-l", "1", "-scale-to-x", "640", "-scale-to-y", "-1",
        "-jpeg", "-jpegopt", "quality=82", str(pdf), str(target)
    ], check=True)
    print(f"Rendered: {pdf.name}")

