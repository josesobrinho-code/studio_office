import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "@/components/layout/Footer";
import { CatalogCard } from "@/components/catalog/CatalogCard";
import {
  catalogCategories,
  catalogCopy,
  catalogProducts,
  type CatalogCategory,
} from "@/lib/catalog";
import { OG_IMAGE, SITE_NAME, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Catálogo de Cadeiras de Escritório Cavaletti",
  description:
    "Catálogo de cadeiras Cavaletti para escritório: presidente, diretor, operacional, poltronas, fixas e banquetas. Consulte preço e prazo de entrega em Anápolis-GO.",
  alternates: {
    canonical: absoluteUrl("/catalogo/"),
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    url: absoluteUrl("/catalogo/"),
    title: "Catálogo de Cadeiras de Escritório Cavaletti | Studio Office",
    description:
      "Conheça as cadeiras Cavaletti disponíveis e peça orçamento por lote para sua empresa.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de Cadeiras de Escritório Cavaletti | Studio Office",
    description:
      "Conheça as cadeiras Cavaletti disponíveis e peça orçamento por lote para sua empresa.",
    images: [OG_IMAGE.url],
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Início", path: "/" },
  { name: "Catálogo", path: "/catalogo/" },
]);

const categoryOrder: CatalogCategory[] = [
  "escritorio",
  "poltronas",
  "fixas",
  "banquetas",
];

export default function CatalogoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main className="page-shell catalog-page">
        <Header />

        <section className="catalog-hero">
          <p className="catalog-hero__eyebrow">{catalogCopy.eyebrow}</p>
          <h1 className="catalog-hero__title">{catalogCopy.title}</h1>
          <p className="catalog-hero__subtitle">{catalogCopy.subtitle}</p>
        </section>

        {categoryOrder.map((category) => {
          const products = catalogProducts.filter(
            (product) => product.category === category,
          );

          if (products.length === 0) {
            return null;
          }

          return (
            <section
              aria-label={catalogCategories[category]}
              className="catalog-category"
              key={category}
            >
              <h2 className="catalog-category__title">
                {catalogCategories[category]}
              </h2>
              <div className="catalog-grid">
                {products.map((product) => (
                  <CatalogCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}

      </main>
      <Footer />
    </>
  );
}
