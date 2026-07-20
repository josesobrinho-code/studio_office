import { NodeIO } from "@gltf-transform/core";
import {
  KHRMaterialsIOR,
  KHRMaterialsSpecular,
  KHRMaterialsVolume,
} from "@gltf-transform/extensions";

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  console.error("Usage: node scripts/compact-materials.mjs <input.glb> <output.glb>");
  process.exit(1);
}

const io = new NodeIO().registerExtensions([
  KHRMaterialsIOR,
  KHRMaterialsSpecular,
  KHRMaterialsVolume,
]);
const document = await io.read(input);

const grid = document
  .createMaterial("Grid vermelho")
  .setBaseColorFactor([0.55, 0.08, 0.06, 1])
  .setRoughnessFactor(0.72)
  .setMetallicFactor(0);
const black = document
  .createMaterial("Preto")
  .setBaseColorFactor([0.015, 0.014, 0.013, 1])
  .setRoughnessFactor(0.62)
  .setMetallicFactor(0);
const gray = document
  .createMaterial("Cinza")
  .setBaseColorFactor([0.42, 0.42, 0.38, 1])
  .setRoughnessFactor(0.55)
  .setMetallicFactor(0);
const metal = document
  .createMaterial("Metal")
  .setBaseColorFactor([0.72, 0.7, 0.66, 1])
  .setRoughnessFactor(0.28)
  .setMetallicFactor(0.55);

const pickMaterial = (name = "") => {
  const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  if (normalized.includes("cromado") || normalized.includes("metal")) return metal;
  if (normalized.includes("cinza")) return gray;
  if (
    normalized.includes("grid") ||
    normalized.includes("vermelho") ||
    normalized.includes("aurora") ||
    normalized.includes("tela")
  ) {
    return grid;
  }

  return black;
};

for (const mesh of document.getRoot().listMeshes()) {
  for (const primitive of mesh.listPrimitives()) {
    primitive.setMaterial(pickMaterial(primitive.getMaterial()?.getName()));
  }
}

await io.write(output, document);
