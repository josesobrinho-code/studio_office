"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Box,
  Gamepad2,
  KeyRound,
  Store,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const CLIENT_NAME = "Studio Office";

const sectionCopy = {
  title: "Você não comprou errado antes. Comprou no lugar errado.",
  recommendedBadge: "A escolha certa",
  closing:
    "Todas as outras economizam na compra e cobram na troca. A Cavaletti é a única que sai mais barata no dia a dia.",
  cta: "Quero equipar meu escritório do jeito certo",
};

type ComparisonRow = {
  icon: ComponentType<LucideProps>;
  alternative: string;
  promise: string;
  limitation: string;
};

// TODO: confirmar faixa de preço, garantia e ciclo médio de troca.
const ALT_1: ComparisonRow = {
  icon: Store,
  alternative: "Cadeira de marketplace",
  promise: "O que promete: preço baixo",
  limitation:
    "Barata na compra. Sem garantia de verdade e trocando a cada 18 meses.",
};

const ALT_2: ComparisonRow = {
  icon: Gamepad2,
  alternative: "Cadeira gamer ou de design",
  promise: "O que promete: visual",
  limitation:
    "Bonita, mas confortável só na aparência. Não foi feita pra aguentar 8 horas por dia sentado.",
};

const ALT_3: ComparisonRow = {
  icon: Box,
  alternative: "Compra avulsa, sem instalação",
  promise: "O que promete: resolver rápido",
  limitation: "Chega em caixa. Você monta, ajusta e assume o risco sozinho.",
};

const ALT_4: ComparisonRow = {
  icon: KeyRound,
  alternative: "Locação de mobiliário",
  promise: "O que promete: gastar pouco no começo",
  limitation: "Você paga todo mês pra sempre e a cadeira nunca vira sua.",
};

const alternatives: ComparisonRow[] = [ALT_1, ALT_2, ALT_3, ALT_4];

// TODO: confirmar certificações, garantia, projeto e instalação com o cliente.
const CAVALETTI: ComparisonRow = {
  icon: Award,
  alternative: `Cavaletti via ${CLIENT_NAME}`,
  promise: "Solução completa",
  limitation:
    "Aqui você compra a cadeira uma vez e esquece o assunto. A gente entende seu escritório, indica o modelo certo pra cada pessoa, entrega montado e ainda responde por qualquer defeito com garantia de fábrica. Sem troca todo ano, sem risco no seu colo.",
};

export function ComparisonSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="comparison-section-title"
      className="bg-[#f7f5f1] px-5 py-16 text-neutral-950 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2
            className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-5xl"
            id="comparison-section-title"
          >
            {sectionCopy.title}
          </h2>
        </motion.header>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {alternatives.map((row, index) => {
            const Icon = row.icon;

            return (
              <motion.div
                className="rounded-xl border border-neutral-200 bg-white/70 p-5 transition-colors duration-200 hover:bg-white sm:p-6"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                key={row.alternative}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  duration: shouldReduceMotion ? 0 : 0.4,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-semibold leading-tight text-neutral-800">
                      {row.alternative}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      {row.promise}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-neutral-500">
                  {row.limitation}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="relative mt-6 overflow-hidden rounded-2xl bg-[#173a25] p-8 text-white shadow-[0_32px_90px_rgba(23,58,37,0.32)] sm:p-10 lg:p-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.28,
            duration: shouldReduceMotion ? 0 : 0.5,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_70%)]"
          />

          <div className="relative flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#173a25]">
              <Award aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <div>
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {sectionCopy.recommendedBadge}
              </span>
              <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
                {CAVALETTI.alternative}
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white/55">
                {CAVALETTI.promise}
              </p>
            </div>
          </div>

          <p className="relative mt-6 max-w-3xl text-lg leading-8 text-white/85 lg:text-xl">
            {CAVALETTI.limitation}
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 flex w-full max-w-5xl flex-col items-start gap-6 border-t border-neutral-200 pt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.4,
            duration: shouldReduceMotion ? 0 : 0.4,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="max-w-3xl text-lg leading-8 text-neutral-800 sm:text-xl">
            {sectionCopy.closing}
          </p>
          <a
            className="comparison-section__primary-cta inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-full px-6 py-3.5 text-center text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:w-auto"
            href="#formulario"
          >
            <span>{sectionCopy.cta}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
