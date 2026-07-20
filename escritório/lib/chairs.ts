export type Chair = {
  id: "aura" | "leef" | "yon";
  name: string;
  tagline: string;
  description: string;
  detailCta: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  theme: {
    bg: string;
    text: string;
    textMuted: string;
    dot: string;
    ring: string;
  };
};

export const productsCopy = {
  eyebrow: "Cavaletti",
  interactionHint: "Cavaletti para ambientes corporativos",
  ctaPrefix: "Quero um orçamento da",
};

export const chairs: Chair[] = [
  {
    id: "aura",
    name: "Aura",
    tagline: "Ergonomia para equipes que passam o dia sentadas.",
    description:
      "Uma cadeira pensada para compor estações de trabalho com conforto e presença. Seu desenho se integra com facilidade a escritórios executivos, salas de reunião e ambientes compartilhados, mantendo uma aparência leve e profissional.",
    detailCta: "Conhecer a Aura",
    image: "/products/aura.webp",
    imageAlt: "Detalhe da cadeira Cavaletti Aura em acabamento branco e cinza",
    imageWidth: 1280,
    imageHeight: 853,
    theme: {
      bg: "#0A0A0A",
      text: "#FFFFFF",
      textMuted: "rgba(255,255,255,.62)",
      dot: "#FFFFFF",
      ring: "rgba(255,255,255,.28)",
    },
  },
  {
    id: "leef",
    name: "Leef",
    tagline: "Postos de trabalho leves, ajustáveis e consistentes.",
    description:
      "Visual leve e acabamento marcante para ambientes corporativos contemporâneos. A Leef ajuda a criar espaços mais acolhedores e organizados, acompanhando diferentes composições, cores e estilos de projeto.",
    detailCta: "Conhecer a Leef",
    image: "/products/leef.webp",
    imageAlt: "Detalhe da cadeira Cavaletti Leef em acabamento coral e preto",
    imageWidth: 1280,
    imageHeight: 990,
    theme: {
      bg: "#FAFAF8",
      text: "#0A0A0A",
      textMuted: "rgba(10,10,10,.60)",
      dot: "#0A0A0A",
      ring: "rgba(10,10,10,.22)",
    },
  },
  {
    id: "yon",
    name: "Yon",
    tagline: "Presença visual para escritórios com rotina intensa.",
    description:
      "Uma solução versátil para diferentes rotinas e configurações de escritório. A Yon combina uma presença visual sólida com linhas equilibradas, funcionando bem em equipes que precisam manter unidade entre vários postos de trabalho.",
    detailCta: "Conhecer a Yon",
    image: "/products/yon.webp",
    imageAlt: "Detalhe da cadeira Cavaletti Yon em acabamento cinza",
    imageWidth: 1280,
    imageHeight: 990,
    theme: {
      bg: "#B01B12",
      text: "#FFFFFF",
      textMuted: "rgba(255,255,255,.70)",
      dot: "#FFFFFF",
      ring: "rgba(255,255,255,.32)",
    },
  },
];
