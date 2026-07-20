"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

// TODO: confirmar prazo real com o cliente.
const PRAZO_ENTREGA =
  "O prazo é confirmado no orçamento conforme o volume e a disponibilidade do lote.";

// TODO: confirmar emissão de nota fiscal e condições para CNPJ.
const NOTA_FISCAL =
  "A emissão de nota fiscal e as condições para CNPJ serão confirmadas antes do fechamento.";

// TODO: confirmar prazo e cobertura da garantia.
const GARANTIA =
  "O prazo, a cobertura e o processo de acionamento da garantia serão detalhados no orçamento.";

// TODO: confirmar condições de montagem e instalação.
const INSTALACAO =
  "A condição de montagem e instalação é confirmada conforme o local e o volume do pedido.";

// TODO: confirmar disponibilidade de showroom ou unidade para avaliação.
const SHOWROOM_OU_AMOSTRA =
  "A possibilidade de showroom ou unidade para avaliação será confirmada conforme a região e o volume.";

const sectionCopy = {
  eyebrow: "Antes de decidir",
  title: "As perguntas que travam a compra.",
  closing:
    "Ficou uma dúvida que não está aqui? Fala direto com o especialista.",
  cta: "Tirar minha dúvida no WhatsApp",
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    id: "perfil-do-time",
    question: "E se a cadeira não servir para o perfil do meu time?",
    answer:
      "Por isso a escolha é consultiva. Antes de fechar, um especialista entende o uso — horas sentadas, biotipo e tarefa — e recomenda o modelo certo. Você não compra às cegas.",
  },
  {
    id: "prazo-do-lote",
    question: "Quanto tempo para entregar um lote de 20, 30 ou 50 cadeiras?",
    answer: PRAZO_ENTREGA,
  },
  {
    id: "nota-fiscal",
    question: "Vocês emitem nota fiscal e vendem para empresa com CNPJ?",
    answer: NOTA_FISCAL,
  },
  {
    id: "garantia",
    question: "Qual é a garantia? E se der defeito depois?",
    answer: GARANTIA,
  },
  {
    id: "instalacao",
    question: "A cadeira vem montada? Quem instala?",
    answer: INSTALACAO,
  },
  {
    id: "diferenca-da-compra",
    question: "Por que comprar de vocês e não direto ou em um marketplace?",
    answer:
      "Direto ou no marketplace você recebe uma caixa e assume o risco sozinho: escolha, montagem, ajuste e pós-venda. Aqui você tem projeto, especialista e um responsável do começo ao fim — pelo mesmo produto Cavaletti.",
  },
  {
    id: "ver-antes",
    question: "E se eu quiser ver antes de comprar?",
    answer: SHOWROOM_OU_AMOSTRA,
  },
];

function AnswerRegion({
  item,
  shouldReduceMotion,
}: {
  item: FaqItem;
  shouldReduceMotion: boolean;
}) {
  const content = (
    <div
      aria-labelledby={`faq-question-${item.id}`}
      id={`faq-answer-${item.id}`}
      role="region"
    >
      <p className="max-w-3xl pb-6 pr-0 text-base leading-7 text-neutral-600 sm:pr-12 md:text-lg md:leading-8">
        {item.answer}
      </p>
    </div>
  );

  if (shouldReduceMotion) {
    return content;
  }

  return (
    <motion.div
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      initial={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  );
}

export function FaqSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [openItem, setOpenItem] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section
      aria-labelledby="faq-section-title"
      className="border-t border-neutral-200 bg-[#f7f5f1] px-5 py-16 text-neutral-950 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-5xl">
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
            className="mt-4 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-5xl"
            id="faq-section-title"
          >
            {sectionCopy.title}
          </h2>
        </motion.header>

        <ul className="mt-10 border-y border-neutral-300">
          {faqItems.map((item, index) => {
            const isOpen = openItem === item.id;

            return (
              <motion.li
                className="border-b border-neutral-200 last:border-b-0"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                key={item.id}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                  duration: shouldReduceMotion ? 0 : 0.4,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3>
                  <button
                    aria-controls={`faq-answer-${item.id}`}
                    aria-expanded={isOpen}
                    className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-semibold leading-7 transition-colors hover:text-neutral-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:gap-6 sm:text-lg md:text-xl"
                    id={`faq-question-${item.id}`}
                    onClick={() => setOpenItem(isOpen ? null : item.id)}
                    type="button"
                  >
                    <span>{item.question}</span>
                    <motion.span
                      animate={
                        shouldReduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }
                      }
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-300"
                      transition={{ duration: 0.24, ease: "easeOut" }}
                    >
                      {isOpen ? (
                        <Minus className="h-5 w-5" strokeWidth={1.7} />
                      ) : (
                        <Plus className="h-5 w-5" strokeWidth={1.7} />
                      )}
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <AnswerRegion
                      item={item}
                      key={item.id}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  ) : null}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          className="mt-10 flex flex-col items-start gap-6 border-t border-neutral-200 pt-8 lg:flex-row lg:items-center lg:justify-between"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{
            delay: shouldReduceMotion ? 0 : faqItems.length * 0.06,
            duration: shouldReduceMotion ? 0 : 0.4,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="max-w-2xl text-lg leading-8 text-neutral-800 sm:text-xl">
            {sectionCopy.closing}
          </p>
          <a
            className="faq-section__primary-cta inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-full px-6 py-3.5 text-center text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:w-auto"
            href="#formulario"
          >
            <span>{sectionCopy.cta}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
