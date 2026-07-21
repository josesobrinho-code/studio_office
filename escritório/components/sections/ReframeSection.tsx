"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, X } from "lucide-react";

const sectionCopy = {
  titleLineOne: "Você não compra uma cadeira.",
  titleLineTwo: "Compra 8 horas por dia de quem trabalha pra você.",
  support:
    "Uma cadeira ruim não custa o preço dela. Custa a hora do profissional que levanta com dor, perde o foco e rende menos. Todo dia, o ano inteiro. O gasto não aparece na etiqueta. Aparece no quanto ela tira de quem senta.",
  oldDecision: {
    label: "O jeito antigo de decidir",
    statement: "Escolher pela cadeira mais barata na hora de comprar.",
  },
  rightDecision: {
    label: "O jeito certo de decidir",
    statement: "Escolher pela cadeira que sai mais barata no dia a dia.",
  },
  bridge:
    "Agora olha pros produtos pelo custo do uso, não pelo preço da etiqueta.",
};

export function ReframeSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="reframe-section-title"
      className="border-t border-neutral-200 bg-[#efede8] px-5 py-16 text-neutral-950 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-[2.6rem]"
            id="reframe-section-title"
          >
            {sectionCopy.titleLineOne} {sectionCopy.titleLineTwo}
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">
            {sectionCopy.support}
          </p>
          <p className="mt-7 max-w-xl text-base font-medium leading-7 text-neutral-500">
            {sectionCopy.bridge}
          </p>
        </motion.div>

        <div className="mx-auto flex w-full max-w-md flex-col items-center">
          <motion.div
            className="w-full rounded-xl border border-neutral-300/80 bg-white/50 px-6 py-5"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.06,
              duration: shouldReduceMotion ? 0 : 0.4,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
                <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {sectionCopy.oldDecision.label}
              </p>
            </div>
            <p className="mt-3 text-lg leading-7 text-neutral-500 line-through decoration-neutral-300 decoration-2">
              {sectionCopy.oldDecision.statement}
            </p>
          </motion.div>

          <motion.span
            aria-hidden="true"
            className="my-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-[#efede8] text-neutral-400"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.16, duration: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1 }}
          >
            <ArrowDown className="h-4 w-4" strokeWidth={2} />
          </motion.span>

          <motion.div
            className="relative w-full overflow-hidden rounded-2xl bg-[#173a25] px-7 py-8 text-white shadow-[0_28px_80px_rgba(23,58,37,0.3)] sm:px-9 sm:py-9"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.24,
              duration: shouldReduceMotion ? 0 : 0.45,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_70%)]"
            />
            <div className="relative flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#173a25]">
                <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.6} />
              </span>
              <p className="text-xs font-bold uppercase tracking-wide text-white/60">
                {sectionCopy.rightDecision.label}
              </p>
            </div>
            <p className="relative mt-4 text-2xl font-semibold leading-tight sm:text-[1.75rem]">
              {sectionCopy.rightDecision.statement}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
