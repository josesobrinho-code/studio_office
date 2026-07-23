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

export const metadata: Metadata = {
  title: "Catálogo | Studio Office",
  description: catalogCopy.subtitle,
};

const categoryOrder: CatalogCategory[] = [
  "escritorio",
  "poltronas",
  "fixas",
  "banquetas",
];

export default function CatalogoPage() {
  return (
    <>
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
