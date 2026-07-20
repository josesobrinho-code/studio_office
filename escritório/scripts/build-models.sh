#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="${TMPDIR:-/tmp}/studio-office-models"
OUT_DIR="$ROOT_DIR/public/models"
PLACEHOLDER_TEXTURE_PNG="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII="

mkdir -p "$TMP_DIR" "$OUT_DIR"

write_placeholder_texture() {
  local target="$1"
  local placeholder_png="$TMP_DIR/placeholder.png"
  local placeholder_jpg="$TMP_DIR/placeholder.jpg"
  local ext="${target##*.}"

  mkdir -p "$(dirname "$target")"
  if [[ ! -f "$placeholder_png" ]]; then
    printf "%s" "$PLACEHOLDER_TEXTURE_PNG" | base64 --decode > "$placeholder_png" 2>/dev/null || \
      printf "%s" "$PLACEHOLDER_TEXTURE_PNG" | base64 -D > "$placeholder_png"
  fi

  if [[ "$ext" == "jpg" || "$ext" == "jpeg" ]]; then
    if [[ ! -f "$placeholder_jpg" ]]; then
      sips -s format jpeg "$placeholder_png" --out "$placeholder_jpg" >/dev/null
    fi
    cp "$placeholder_jpg" "$target"
  else
    cp "$placeholder_png" "$target"
  fi
}

ensure_referenced_assets() {
  local dae="$1"
  local dae_dir
  local asset_list

  dae_dir="$(dirname "$dae")"
  asset_list="$TMP_DIR/$(basename "$dae").assets"
  grep -Eo "<init_from>[^<]+\\.(jpg|jpeg|png)</init_from>" "$dae" | sed -E "s#</?init_from>##g" | sort -u > "$asset_list" || true

  while IFS= read -r asset; do
    if [[ -n "$asset" && ! -f "$dae_dir/$asset" ]]; then
      case "$asset" in
        *.[jJ][pP][gG]|*.[jJ][pP][eE][gG])
          local png_asset="${asset%.*}.png"

          write_placeholder_texture "$dae_dir/$png_asset"
          LC_ALL=C LANG=C ASSET="$asset" PNG_ASSET="$png_asset" perl -0pi -e 's/\Q$ENV{ASSET}\E/$ENV{PNG_ASSET}/g' "$dae"
          ;;
        *)
          write_placeholder_texture "$dae_dir/$asset"
          ;;
      esac
    fi
  done < "$asset_list"
}

prepare_source() {
  local id="$1"
  local source="$2"
  local source_path="$ROOT_DIR/$source"
  local work_dir="$TMP_DIR/$id-src"

  rm -rf "$work_dir"
  mkdir -p "$work_dir"

  if file "$source_path" | grep -q "Zip archive"; then
    unzip -q "$source_path" -d "$work_dir"
    find "$work_dir" -name "*.dae" -print -quit
  else
    cp "$source_path" "$work_dir/"
    printf "%s\n" "$work_dir/$(basename "$source_path")"
  fi
}

convert_model() {
  local id="$1"
  local source="$2"
  local ratio="$3"
  local texture_size="$4"
  local texture_quality="$5"
  local simplify_error="${6:-0.001}"
  local compact_materials="${7:-false}"

  local out="$OUT_DIR/$id.glb"
  local prepared_source
  local prepared_dir
  local prepared_file

  prepared_source="$(prepare_source "$id" "$source")"
  ensure_referenced_assets "$prepared_source"
  prepared_dir="$(dirname "$prepared_source")"
  prepared_file="$(basename "$prepared_source")"

  local raw="$prepared_dir/$id-raw.glb"
  local a="$prepared_dir/$id-a.glb"
  local b="$prepared_dir/$id-b.glb"
  local c="$prepared_dir/$id-c.glb"
  local d="$prepared_dir/$id-d.glb"
  local e="$prepared_dir/$id-e.glb"
  local f="$prepared_dir/$id-f.glb"
  local g="$prepared_dir/$id-g.glb"
  local h="$prepared_dir/$id-h.glb"
  local i="$prepared_dir/$id-i.glb"
  local j="$prepared_dir/$id-j.glb"
  local material_source

  (cd "$prepared_dir" && assimp export "$prepared_file" "$raw")
  npx --yes @gltf-transform/cli dedup "$raw" "$a"
  npx --yes @gltf-transform/cli weld "$a" "$b"
  npx --yes @gltf-transform/cli simplify "$b" "$c" --ratio "$ratio" --error "$simplify_error"
  node "$ROOT_DIR/scripts/strip-lines.mjs" "$c" "$d"
  npx --yes @gltf-transform/cli prune "$d" "$e" --keep-solid-textures false
  material_source="$e"
  if [[ "$compact_materials" == "true" ]]; then
    node "$ROOT_DIR/scripts/compact-materials.mjs" "$e" "$h"
    npx --yes @gltf-transform/cli prune "$h" "$i" --keep-solid-textures false
    npx --yes @gltf-transform/cli simplify "$i" "$j" --ratio 0.12 --error 1 --lock-border false
    material_source="$j"
  fi
  npx --yes @gltf-transform/cli resize "$material_source" "$f" --width "$texture_size" --height "$texture_size"
  npx --yes @gltf-transform/cli webp "$f" "$g" --quality "$texture_quality" --effort 80
  npx --yes @gltf-transform/cli draco "$g" "$out"
}

convert_model "aura" "animacoes_3d/Aura-44101-Cinza (1).dae" "0.35" "1024" "80"
convert_model "leef" "animacoes_3d/model.dae" "0.35" "512" "70"
convert_model "yon" "animacoes_3d/Yon-47301-Syn-MC-UP-Vermelho.dae" "0.03" "512" "55" "0.1" "true"

npx --yes @gltf-transform/cli inspect "$OUT_DIR/aura.glb"
npx --yes @gltf-transform/cli inspect "$OUT_DIR/leef.glb"
npx --yes @gltf-transform/cli inspect "$OUT_DIR/yon.glb"
