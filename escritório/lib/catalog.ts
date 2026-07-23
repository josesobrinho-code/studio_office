export type CatalogCategory =
  | "escritorio"
  | "poltronas"
  | "fixas"
  | "banquetas";

export type CatalogProduct = {
  id: string;
  name: string;
  category: CatalogCategory;
  tagline?: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export const catalogCopy = {
  eyebrow: "Catálogo",
  title: "Nossos produtos",
  subtitle:
    "Conheça as cadeiras disponíveis. Fale com a gente para saber preço e prazo de entrega.",
  cta: "Solicitar orçamento",
};

export const catalogCategories: Record<CatalogCategory, string> = {
  escritorio: "Cadeiras de escritório",
  poltronas: "Poltronas",
  fixas: "Cadeiras fixas",
  banquetas: "Banquetas",
};

const IMAGE_WIDTH = 798;
const IMAGE_HEIGHT = 1118;

function chair(
  slug: string,
  name: string,
  category: CatalogCategory,
): CatalogProduct {
  return {
    id: slug,
    name,
    category,
    image: `/catalogo/${slug}.webp`,
    imageAlt: `Cadeira ${name}`,
    imageWidth: IMAGE_WIDTH,
    imageHeight: IMAGE_HEIGHT,
  };
}

export const catalogProducts: CatalogProduct[] = [
  // Cadeiras de escritório (giratórias, com rodízio)
  chair("air", "Air", "escritorio"),
  chair("artis", "Artis", "escritorio"),
  chair("aura", "Aura", "escritorio"),
  chair("c3", "C3", "escritorio"),
  chair("c4", "C4", "escritorio"),
  chair("essence", "Essence", "escritorio"),
  chair("fun", "Fun", "escritorio"),
  chair("go", "GO", "escritorio"),
  chair("joy", "Joy", "escritorio"),
  chair("leef", "Leef", "escritorio"),
  chair("mais", "Mais", "escritorio"),
  chair("newnet", "NewNet", "escritorio"),
  chair("prime", "Prime", "escritorio"),
  chair("pro", "Pro", "escritorio"),
  chair("slim", "Slim", "escritorio"),
  chair("start", "Start", "escritorio"),
  chair("start-plus", "Start Plus", "escritorio"),
  chair("velo", "Vélo", "escritorio"),
  chair("way", "Way", "escritorio"),
  chair("yon", "Yon", "escritorio"),

  // Poltronas (braço fixo, sem rodízio)
  chair("bee", "Bee", "poltronas"),
  chair("box", "Box", "poltronas"),
  chair("connect", "Connect", "poltronas"),
  chair("duo", "Duo", "poltronas"),
  chair("idea", "Idea", "poltronas"),
  chair("raya", "Raya", "poltronas"),
  chair("rimeva", "Rimeva", "poltronas"),
  chair("solo", "Solo", "poltronas"),
  chair("spot", "Spot", "poltronas"),
  chair("stretch", "Stretch", "poltronas"),
  chair("talk", "Talk", "poltronas"),

  // Cadeiras fixas (empilháveis, auditório, espera)
  chair("coletiva", "Coletiva", "fixas"),
  chair("match", "Match", "fixas"),
  chair("stilo", "Stilo", "fixas"),
  chair("viva", "Viva", "fixas"),
  chair("viva-long", "Viva Long", "fixas"),

  // Banquetas
  chair("float", "Float", "banquetas"),
  chair("inaut", "Inaut", "banquetas"),
  chair("nuna", "Nuna", "banquetas"),
];
