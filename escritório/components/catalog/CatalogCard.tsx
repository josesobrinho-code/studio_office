"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog";
import { catalogCopy } from "@/lib/catalog";

type CatalogCardProps = {
  product: CatalogProduct;
};

export function CatalogCard({ product }: CatalogCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="catalog-card"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="catalog-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.imageAlt}
          height={product.imageHeight}
          loading="lazy"
          src={product.image}
          width={product.imageWidth}
        />
      </div>
      <div className="catalog-card__body">
        <h3 className="catalog-card__name">{product.name}</h3>
        {product.tagline ? (
          <p className="catalog-card__tagline">{product.tagline}</p>
        ) : null}
        <Link className="catalog-card__cta" href="/#formulario">
          {catalogCopy.cta}
        </Link>
      </div>
    </motion.article>
  );
}
