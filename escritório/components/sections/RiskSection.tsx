"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Headphones,
  RefreshCcw,
  ShieldCheck,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

type GuaranteeContent = {
  title: string;
  description: string;
};

// TODO: confirmar vínculo com o cliente.
const STATUS_REVENDA =
  "Trabalhamos exclusivamente com Cavaletti, fabricante nacional com décadas de mercado.";

// TODO: confirmar quais certificações citar.
const CERTIFICACOES: string[] = [];

// TODO: confirmar prazo e condições da garantia de fábrica.
const GARANTIA_ANOS: GuaranteeContent | null = {
  title: "Garantia de fábrica",
  description: "Condições conforme a política vigente da fabricante.",
};

// TODO: confirmar se a instalação está inclusa.
const INSTALACAO: GuaranteeContent | null = null;

// TODO: confirmar disponibilidade e abrangência da assistência local.
const ASSISTENCIA: GuaranteeContent | null = null;

// TODO: confirmar a política de troca.
const TROCA: GuaranteeContent | null = null;

const sectionCopy = {
  eyebrow: "Confiança antes da escolha",
  title: "Você não está comprando de um desconhecido.",
  factoryLabel: "Cavaletti",
  guaranteesEyebrow: "O que reduz o risco",
  guaranteesTitle: "Garantia concreta, sem promessa vaga.",
  bridge:
    "Antes de comprar, você fala com um especialista que entende de escritório.",
  cta: "Falar com um especialista",
};

type GuaranteeItem = GuaranteeContent & {
  icon: ComponentType<LucideProps>;
};

const guaranteeCandidates: Array<GuaranteeItem | null> = [
  GARANTIA_ANOS ? { ...GARANTIA_ANOS, icon: ShieldCheck } : null,
  INSTALACAO ? { ...INSTALACAO, icon: Wrench } : null,
  ASSISTENCIA ? { ...ASSISTENCIA, icon: Headphones } : null,
  TROCA ? { ...TROCA, icon: RefreshCcw } : null,
];

const guaranteeItems = guaranteeCandidates.filter(
  (item): item is GuaranteeItem => item !== null,
);

export function RiskSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="risk-section-title"
      className="bg-[#f7f5f1] px-5 py-20 text-neutral-950 sm:px-8 lg:min-h-screen lg:px-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-center">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-semibold text-neutral-500">
              {sectionCopy.eyebrow}
            </p>
            <h2
              className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-normal md:text-5xl"
              id="risk-section-title"
            >
              {sectionCopy.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              {STATUS_REVENDA}
            </p>
          </motion.div>

          <motion.div
            className="border-y border-neutral-300 py-7"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.06,
              duration: shouldReduceMotion ? 0 : 0.4,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <p className="font-display text-3xl font-semibold tracking-normal">
                {sectionCopy.factoryLabel}
              </p>
              {CERTIFICACOES.map((certification) => (
                <span
                  className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700"
                  key={certification}
                >
                  {certification}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {guaranteeItems.length > 0 ? (
          <div className="mt-14 border-t border-neutral-200 pt-9">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-500">
                  {sectionCopy.guaranteesEyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-normal text-neutral-950 md:text-3xl">
                  {sectionCopy.guaranteesTitle}
                </h3>
              </div>
            </div>

            <ul className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-4">
              {guaranteeItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.li
                    className="min-h-44 rounded-lg border border-neutral-200 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,15,15,0.05)]"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 16 }
                    }
                    key={item.title}
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * 0.06,
                      duration: shouldReduceMotion ? 0 : 0.4,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileInView={{ opacity: 1, y: 0 }}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-6 w-6 text-neutral-500"
                      strokeWidth={1.7}
                    />
                    <h4 className="mt-7 text-xl font-semibold tracking-normal">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {item.description}
                    </p>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <motion.div
          className="mt-14 flex flex-col items-start gap-6 border-t border-neutral-200 pt-8 lg:flex-row lg:items-center lg:justify-between"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="max-w-3xl text-xl leading-8 text-neutral-800 md:text-2xl md:leading-9">
            {sectionCopy.bridge}
          </p>
          <a
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
            href="#formulario"
          >
            {sectionCopy.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
