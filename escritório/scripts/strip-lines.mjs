import { NodeIO, Primitive } from "@gltf-transform/core";
import {
  KHRMaterialsIOR,
  KHRMaterialsSpecular,
  KHRMaterialsVolume,
} from "@gltf-transform/extensions";

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  console.error("Usage: node scripts/strip-lines.mjs <input.glb> <output.glb>");
  process.exit(1);
}

const io = new NodeIO().registerExtensions([
  KHRMaterialsIOR,
  KHRMaterialsSpecular,
  KHRMaterialsVolume,
]);
const document = await io.read(input);
const root = document.getRoot();

for (const mesh of root.listMeshes()) {
  for (const primitive of [...mesh.listPrimitives()]) {
    if (primitive.getMode() !== Primitive.Mode.TRIANGLES) {
      primitive.dispose();
    }
  }
}

await io.write(output, document);
