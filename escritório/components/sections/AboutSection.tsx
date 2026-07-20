"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2 } from "lucide-react";

// TODO: preencher com o caminho público da foto do dono.
const FOTO_DONO = "";

const FOTO_DONO_ALT = "Retrato do responsável pela Studio Office";

// TODO: revisar o título com o cliente.
const TITULO = "QUEM SOMOS";

// TODO: revisar a apresentação com o cliente.
const SUBTITULO =
  "Tem gente de verdade por trás de cada escritório que a gente equipa.";

// TODO: preencher quem é o dono, o que faz e há quanto tempo atua.
const PARAGRAFO_1 = "";

// TODO: preencher a trajetória e por que entende de escritórios.
const PARAGRAFO_2 = "";

// TODO: preencher como essa experiência se traduz no atendimento.
const PARAGRAFO_3 = "";

// TODO: preencher o nome real do dono.
const NOME_DONO = "";

// TODO: preencher o cargo real do dono.
const CARGO = "";

// TODO: preencher somente se o dado for verdadeiro.
const ANOS_EXPERIENCIA = "";

// TODO: preencher somente se o dado for verdadeiro.
const ESCRITORIOS_EQUIPADOS = "";

// TODO: preencher somente se o dado for verdadeiro.
const VINCULO_CAVALETTI = "";

const biographyParagraphs: string[] = [
  PARAGRAFO_1,
  PARAGRAFO_2,
  PARAGRAFO_3,
].filter((paragraph) => paragraph.length > 0);

const credibilityItems: string[] = [
  ANOS_EXPERIENCIA,
  ESCRITORIOS_EQUIPADOS,
  VINCULO_CAVALETTI,
].filter((item) => item.length > 0);

export function AboutSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const hasPhoto = FOTO_DONO.length > 0;
  const hasSignature = NOME_DONO.length > 0 || CARGO.length > 0;

  return (
    <section
      aria-labelledby="about-section-title"
      className="border-t border-neutral-200 bg-[#f7f5f1] px-5 py-16 text-neutral-950 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="quem-somos"
    >
      <div className="mx-auto grid max-w-7xl gap-10 sm:gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
        <motion.div
          className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg border border-neutral-200 lg:max-w-none"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {hasPhoto ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              alt={FOTO_DONO_ALT}
              className="h-full w-full object-cover"
              decoding="async"
              height={1500}
              loading="lazy"
              src={FOTO_DONO}
              width={1200}
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,#efede8,#e4e0d6)] bg-[radial-gradient(circle_at_1px_1px,rgba(10,10,10,0.08)_1px,transparent_0)] bg-[length:22px_22px]"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-neutral-950/10 bg-white/70 text-neutral-500 shadow-[0_12px_32px_rgba(15,15,15,0.08)]">
                <Building2 className="h-9 w-9" strokeWidth={1.5} />
              </span>
              <span className="rounded-full border border-neutral-950/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Studio Office
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.08,
            duration: shouldReduceMotion ? 0 : 0.4,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-5xl"
            id="about-section-title"
          >
            {TITULO}
          </h2>
          <h3 className="mt-5 max-w-xl text-lg font-medium leading-8 text-neutral-600 sm:text-xl md:text-2xl md:leading-9">
            {SUBTITULO}
          </h3>

          {biographyParagraphs.length > 0 ? (
            <div className="mt-7 grid max-w-xl gap-5 text-lg leading-8 text-neutral-600">
              {biographyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          {hasSignature ? (
            <div className="mt-8 border-l-2 border-neutral-950 pl-4">
              {NOME_DONO ? (
                <p className="text-lg font-semibold text-neutral-950">
                  {NOME_DONO}
                </p>
              ) : null}
              {CARGO ? (
                <p className="mt-1 text-sm text-neutral-600">{CARGO}</p>
              ) : null}
            </div>
          ) : null}

          {credibilityItems.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-neutral-200 py-5 text-sm font-semibold text-neutral-700">
              {credibilityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
