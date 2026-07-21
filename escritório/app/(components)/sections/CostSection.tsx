"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  RefreshCw,
  UserMinus,
  type LucideProps,
} from "lucide-react";

const sectionCopy = {
  title: "É só uma cadeira.",
  support:
    "Foi o que pensaram na hora de economizar R$ 300 por posto. Dois anos depois: mecanismo travado, encosto que não volta e o time trocando de mesa pra pegar a cadeira que ainda funciona.",
  turn:
    "Uma Cavaletti Aura dura 8 anos de uso pesado. No fim, sai menos por dia do que o café que o escritório serve de graça.",
  cta: "Equipar o meu escritório",
};

type CostCard = {
  icon: ComponentType<LucideProps>;
  value:
    | { kind: "number"; end: number; suffix: string }
    | { kind: "text"; text: string };
  label: string;
  description: string;
};

const cards: CostCard[] = [
  {
    icon: RefreshCw,
    value: { kind: "number", end: 4, suffix: "x" },
    label: "trocas em 6 anos",
    description:
      "Uma cadeira de R$ 400 dura uns 18 meses. Em 6 anos você compra ela 4 vezes, paga 4 fretes e para o administrativo 4 vezes. A Cavaletti você compra uma vez, com garantia de fábrica.",
  },
  {
    icon: UserMinus,
    value: { kind: "number", end: 15, suffix: " dias" },
    label: "saem do seu bolso",
    description:
      "Quando alguém se afasta por dor nas costas, os primeiros 15 dias de salário quem paga é a empresa, não o INSS. E problema de coluna é um dos que mais tiram gente do trabalho no Brasil.",
  },
  {
    icon: AlertTriangle,
    value: { kind: "text", text: "Por lei" },
    label: "cadeira boa é obrigação",
    description:
      "A lei do trabalho obriga a empresa a dar cadeira ajustável pra quem passa o dia sentado. Se o fiscal aparece e não está em ordem, é multa. E numa ação trabalhista, vira prova contra você.",
  },
  {
    icon: Clock,
    value: { kind: "number", end: 8, suffix: "h" },
    label: "por dia, todo dia",
    description:
      "Quem levanta a cada 40 minutos pra aliviar as costas não está rendendo. E isso se repete todo dia, o ano inteiro.",
  },
];

function CountUpNumber({
  end,
  suffix,
}: {
  end: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element || shouldReduceMotion) {
      setDisplayValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        const controls = animate(motionValue, end, {
          duration: 0.8,
          ease: "easeOut",
          onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        });

        observer.disconnect();

        return () => controls.stop();
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      motionValue.stop();
    };
  }, [end, motionValue, shouldReduceMotion]);

  useEffect(() => {
    return motionValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [motionValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

function CardValue({ value }: { value: CostCard["value"] }) {
  if (value.kind === "text") {
    const isPlaceholder = value.text.includes("{{");

    return (
      <span className={isPlaceholder ? "text-[1.65rem] leading-none" : ""}>
        {isPlaceholder ? "A preencher" : value.text}
      </span>
    );
  }

  return <CountUpNumber end={value.end} suffix={value.suffix} />;
}

function CardDescription({ description }: { description: string }) {
  if (description.includes("{{")) {
    return <span>A preencher com dado oficial.</span>;
  }

  return <span>{description}</span>;
}

export function CostSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="cost-section-title"
      className="bg-[#f7f5f1] px-5 pb-12 pt-16 text-neutral-950 sm:px-8 sm:pb-14 sm:pt-20 lg:px-12 lg:pb-12 lg:pt-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:gap-7">
        <div className="max-w-2xl">
          <h2
            className="text-3xl font-semibold leading-tight tracking-normal text-neutral-950 sm:text-4xl md:text-5xl"
            id="cost-section-title"
          >
            {sectionCopy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            {sectionCopy.support}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.li
                className="rounded-lg border border-neutral-200 bg-white/78 p-5 shadow-[0_18px_60px_rgba(15,15,15,0.06)] sm:min-h-[252px]"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                key={card.label}
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
                <p className="mt-6 flex min-h-14 items-end overflow-hidden font-mono text-4xl font-semibold tracking-normal text-neutral-950 sm:min-h-[4.25rem] sm:text-5xl lg:text-[3.1rem]">
                  <CardValue value={card.value} />
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-normal text-neutral-950">
                  {card.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  <CardDescription description={card.description} />
                </p>
              </motion.li>
            );
          })}
        </ul>

        <div className="flex flex-col items-start gap-5 border-t border-neutral-200 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-3xl text-lg leading-8 text-neutral-800 sm:text-xl">
            {sectionCopy.turn}
          </p>
          <a
            className="cost-section__secondary-cta inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-full border border-neutral-950 px-5 py-3 text-center text-sm font-semibold tracking-normal transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:w-auto"
            href="#formulario"
          >
            <span>{sectionCopy.cta}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
