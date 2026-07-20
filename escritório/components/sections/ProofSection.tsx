"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  Factory,
  MapPinned,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

// TODO: confirmar a redação antes da publicação.
const FABRICANTE_NACIONAL =
  "Fabricante de assentos profissionais com trajetória iniciada em 1974.";

// TODO: confirmar quais certificações podem ser citadas para estes produtos.
const CERTIFICACOES = "";

// TODO: confirmar a redação antes da publicação.
const PRESENCA =
  "Rede de representantes e revendedores distribuída pelo Brasil e exterior.";

// TODO: confirmar a redação antes da publicação.
const AREAS_ATUACAO =
  "Soluções para projetos corporativos, colaborativos e de saúde.";

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

type ClientLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// TODO: adicionar somente depoimentos reais e autorizados.
const DEPOIMENTOS: Testimonial[] = [];

// TODO: adicionar somente logos de clientes reais e autorizados.
const LOGOS_CLIENTES: ClientLogo[] = [];

// TODO: preencher somente com um número real e verificável.
const NUMERO_ESCRITORIOS: number | null = null;

// TODO: adicionar somente fotos de projetos reais e autorizadas.
const FOTOS_PROJETOS: ProjectPhoto[] = [];

const sectionCopy = {
  eyebrow: "A marca por trás das cadeiras",
  title:
    "Você não está comprando de uma loja qualquer. Está levando Cavaletti.",
  socialEyebrow: "Projetos e experiências reais",
  officesLabel: "escritórios equipados",
  cta: "Quero equipar meu escritório",
};

type CredibilityPoint = {
  text: string;
  icon: ComponentType<LucideProps>;
};

const credibilityCandidates: Array<CredibilityPoint | null> = [
  FABRICANTE_NACIONAL
    ? { text: FABRICANTE_NACIONAL, icon: Factory }
    : null,
  CERTIFICACOES ? { text: CERTIFICACOES, icon: BriefcaseBusiness } : null,
  PRESENCA ? { text: PRESENCA, icon: MapPinned } : null,
  AREAS_ATUACAO ? { text: AREAS_ATUACAO, icon: BriefcaseBusiness } : null,
];

const credibilityPoints = credibilityCandidates.filter(
  (point): point is CredibilityPoint => point !== null,
);

const hasSocialProof =
  DEPOIMENTOS.length > 0 ||
  LOGOS_CLIENTES.length > 0 ||
  NUMERO_ESCRITORIOS !== null ||
  FOTOS_PROJETOS.length > 0;

export function ProofSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="proof-section-title"
      className="border-t border-neutral-200 bg-[#efede8] px-5 py-16 text-neutral-950 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-semibold text-neutral-500">
            {sectionCopy.eyebrow}
          </p>
          <h2
            className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-5xl"
            id="proof-section-title"
          >
            {sectionCopy.title}
          </h2>
        </motion.header>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {credibilityPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.li
                className="rounded-lg border border-neutral-200 bg-white/75 p-5 shadow-[0_18px_60px_rgba(15,15,15,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_24px_70px_rgba(15,15,15,0.09)] sm:min-h-44"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                key={point.text}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  duration: shouldReduceMotion ? 0 : 0.4,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <p className="mt-6 text-lg font-semibold leading-7 text-neutral-800">
                  {point.text}
                </p>
              </motion.li>
            );
          })}
        </ul>

        {hasSocialProof ? (
          <motion.div
            className="mt-14 border-t border-neutral-300 pt-10"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-semibold text-neutral-500">
              {sectionCopy.socialEyebrow}
            </p>

            {NUMERO_ESCRITORIOS !== null ? (
              <p className="mt-6 font-mono text-5xl font-semibold tracking-normal text-neutral-950">
                {NUMERO_ESCRITORIOS}
                <span className="ml-3 font-sans text-lg font-medium text-neutral-600">
                  {sectionCopy.officesLabel}
                </span>
              </p>
            ) : null}

            {DEPOIMENTOS.length > 0 ? (
              <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {DEPOIMENTOS.map((testimonial) => (
                  <li
                    className="rounded-lg border border-neutral-200 bg-white/75 p-6"
                    key={`${testimonial.author}-${testimonial.quote}`}
                  >
                    <blockquote className="text-lg leading-8 text-neutral-700">
                      {testimonial.quote}
                    </blockquote>
                    <p className="mt-5 font-semibold text-neutral-950">
                      {testimonial.author}
                    </p>
                    {testimonial.role ? (
                      <p className="mt-1 text-sm text-neutral-500">
                        {testimonial.role}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}

            {LOGOS_CLIENTES.length > 0 ? (
              <ul className="mt-8 flex flex-wrap items-center gap-8 border-y border-neutral-300 py-6">
                {LOGOS_CLIENTES.map((logo) => (
                  <li key={logo.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={logo.alt}
                      className="max-h-10 w-auto object-contain"
                      height={logo.height}
                      loading="lazy"
                      src={logo.src}
                      width={logo.width}
                    />
                  </li>
                ))}
              </ul>
            ) : null}

            {FOTOS_PROJETOS.length > 0 ? (
              <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {FOTOS_PROJETOS.map((photo) => (
                  <li
                    className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200"
                    key={photo.src}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={photo.alt}
                      className="h-full w-full object-cover"
                      height={photo.height}
                      loading="lazy"
                      src={photo.src}
                      width={photo.width}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        ) : null}

        <motion.div
          className="mt-10 border-t border-neutral-300 pt-8"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{
            delay: shouldReduceMotion ? 0 : credibilityPoints.length * 0.06,
            duration: shouldReduceMotion ? 0 : 0.4,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <a
            className="proof-section__primary-cta inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-3.5 text-center text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:w-auto"
            href="#formulario"
          >
            <span>{sectionCopy.cta}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
