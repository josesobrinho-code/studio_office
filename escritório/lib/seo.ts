// URL canônica pública do site. O app também roda na Vercel como preview;
// manter estas URLs absolutas garante que todo canonical/OG aponte para cá,
// evitando conteúdo duplicado entre os dois endereços.
export const SITE_URL = "https://studioeoffice.com.br/escritorio";

export const SITE_NAME = "Studio Office";

// Número publicado no site (WhatsApp de atendimento), em formato E.164.
export const TELEFONE = "+556260002345";

export function absoluteUrl(path = "/"): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${suffix === "/" ? "/" : suffix}`;
}

export const OG_IMAGE = {
  url: absoluteUrl("/studio-office-showroom.jpeg"),
  width: 1448,
  height: 1086,
  alt: "Showroom da Studio Office, em Anápolis-GO",
};

/**
 * Dados estruturados do negócio.
 *
 * Contém apenas informação já publicada e verificável no site. Endereço
 * completo, horário de funcionamento, CNPJ e razão social seguem como TODO no
 * código do cliente e por isso ficam de fora: dado inventado em structured data
 * é penalizado pelo Google.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${SITE_URL}/#negocio`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo-studio-office.webp"),
    image: OG_IMAGE.url,
    telephone: TELEFONE,
    description:
      "Venda de cadeiras de escritório Cavaletti para empresas em Anápolis e região, com orçamento por lote e acompanhamento da garantia de fábrica.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Anápolis",
      addressRegion: "GO",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Anápolis" },
      { "@type": "State", name: "Goiás" },
    ],
    knowsAbout: [
      "cadeiras de escritório",
      "cadeiras ergonômicas",
      "mobiliário corporativo",
      "Cavaletti",
    ],
  };
}

export function breadcrumbJsonLd(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
