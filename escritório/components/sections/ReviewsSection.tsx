"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";

type Review = {
  texto: string;
  nome: string;
  empresa?: string;
  nota?: number;
};

// TODO: colar somente depoimentos reais e autorizados antes de desativar o preview.
const DEPOIMENTOS: Review[] = [];

const EXIBIR_PREVIEW_DE_DESIGN = true;
const QUANTIDADE_CARDS_PREVIEW = 3;

// TODO: preencher somente com a nota real e atual do Google Meu Negócio.
const NOTA_GOOGLE: number | null = null;

// TODO: preencher somente com a quantidade real e atual de avaliações.
const QTD_AVALIACOES: number | null = null;

// TODO: preencher com o link público real das avaliações no Google.
const LINK_AVALIACOES_GOOGLE = "";

const sectionCopy = {
  eyebrow: "Avaliações",
  title: "A experiência de quem escolheu a Studio Office.",
  description:
    "Um espaço reservado para relatos reais de empresas que equiparam seus ambientes com a gente.",
  cta: "Falar com um especialista",
  googleLabel: "avaliações no Google",
};

function ReviewStars({ rating }: { rating: number }) {
  const normalizedRating = Math.min(5, Math.max(1, Math.round(rating)));

  return (
    <div
      aria-label={`${normalizedRating} de 5 estrelas`}
      className="flex items-center gap-1"
      role="img"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          aria-hidden="true"
          className="h-4 w-4"
          fill={index < normalizedRating ? "currentColor" : "none"}
          key={index}
          strokeWidth={1.6}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  if (DEPOIMENTOS.length === 0 && !EXIBIR_PREVIEW_DE_DESIGN) return null;

  const hasGoogleRating =
    NOTA_GOOGLE !== null &&
    QTD_AVALIACOES !== null &&
    Boolean(LINK_AVALIACOES_GOOGLE);

  return (
    <section
      aria-labelledby="reviews-section-title"
      className="bg-[#f7f5f1] px-5 py-16 text-neutral-950 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="avaliacoes"
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          className="flex flex-col gap-7 border-b border-neutral-300 pb-10 md:flex-row md:items-end md:justify-between"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-sm font-semibold text-neutral-500">
              {sectionCopy.eyebrow}
            </p>
            <h2
              className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-5xl"
              id="reviews-section-title"
            >
              {sectionCopy.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              {sectionCopy.description}
            </p>
          </div>

          {hasGoogleRating ? (
            <a
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold transition hover:border-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
              href={LINK_AVALIACOES_GOOGLE}
              rel="noreferrer"
              target="_blank"
            >
              <Star aria-hidden="true" className="h-4 w-4" fill="currentColor" />
              <span>
                {NOTA_GOOGLE.toLocaleString("pt-BR", {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1,
                })}{" "}
                · {QTD_AVALIACOES} {sectionCopy.googleLabel}
              </span>
            </a>
          ) : null}
        </motion.header>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {DEPOIMENTOS.length === 0
            ? Array.from({ length: QUANTIDADE_CARDS_PREVIEW }, (_, index) => (
                <motion.li
                  aria-hidden="true"
                  className="flex min-h-[220px] flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-[0_16px_45px_rgba(10,10,10,0.06)] sm:min-h-[280px] sm:p-7"
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 16 }
                  }
                  key={`review-preview-${index}`}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                    duration: shouldReduceMotion ? 0 : 0.4,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Quote
                    className="h-5 w-5 text-neutral-400"
                    strokeWidth={1.5}
                  />
                  <div className="mt-8 grid gap-3">
                    <span className="h-3 w-full rounded-full bg-neutral-100" />
                    <span className="h-3 w-[92%] rounded-full bg-neutral-100" />
                    <span className="h-3 w-[72%] rounded-full bg-neutral-100" />
                  </div>
                  <div className="mt-auto border-t border-neutral-200 pt-5">
                    <span className="block h-3 w-28 rounded-full bg-neutral-200" />
                    <span className="mt-3 block h-2.5 w-20 rounded-full bg-neutral-100" />
                  </div>
                </motion.li>
              ))
            : DEPOIMENTOS.map((review, index) => (
                <motion.li
                  className="flex min-h-[220px] flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-[0_16px_45px_rgba(10,10,10,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(10,10,10,0.1)] sm:min-h-[280px] sm:p-7"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  key={`${review.nome}-${index}`}
                  transition={{
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                    duration: shouldReduceMotion ? 0 : 0.4,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex min-h-6 items-center justify-between gap-4 text-neutral-500">
                    <Quote
                      aria-hidden="true"
                      className="h-5 w-5"
                      strokeWidth={1.5}
                    />
                    {typeof review.nota === "number" ? (
                      <ReviewStars rating={review.nota} />
                    ) : null}
                  </div>

                  <blockquote className="mt-7 flex-1 text-lg leading-8 text-neutral-800">
                    <p>{review.texto}</p>
                  </blockquote>

                  <div className="mt-8 border-t border-neutral-200 pt-5">
                    <p className="font-semibold text-neutral-950">
                      {review.nome}
                    </p>
                    {review.empresa ? (
                      <p className="mt-1 text-sm text-neutral-500">
                        {review.empresa}
                      </p>
                    ) : null}
                  </div>
                </motion.li>
              ))}
        </ul>

        <motion.div
          className="mt-10 flex justify-start"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          transition={{
            delay: shouldReduceMotion ? 0 : DEPOIMENTOS.length * 0.06,
            duration: shouldReduceMotion ? 0 : 0.4,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <a
            className="reviews-section__cta inline-flex min-h-12 w-full items-center justify-center rounded-full border border-neutral-950 px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:w-auto"
            href="#formulario"
          >
            <span>{sectionCopy.cta}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
