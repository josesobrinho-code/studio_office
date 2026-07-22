"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock3, MapPin } from "lucide-react";

// TODO: confirmar e publicar somente o endereço comercial de atendimento.
const ENDERECO = "";

// TODO: confirmar se a cobertura inclui apenas Anápolis, Goiânia ou outras regiões de Goiás.
const CIDADE_REGIAO =
  "Anápolis, GO. Condomínio Gênesis Office, na Av. Juscelino Kubitscheck.";

// TODO: confirmar o horário de funcionamento e as condições para visita.
const HORARIO = "";

const MAPA_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3828.7672174285044!2d-48.95169797462959!3d-16.334834236495364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ea5ea339a5f6d%3A0xf18934954c7e9e2f!2sCondom%C3%ADnio%20Comercial%20G%C3%AAnesis%20Office!5e0!3m2!1spt-BR!2sbr!4v1784572218625!5m2!1spt-BR!2sbr";

const sectionCopy = {
  eyebrow: "Onde estamos",
  title: "Um negócio local, com endereço de verdade.",
  support:
    "Se precisar, você sabe onde nos achar e com quem falar. Nada de comprar de loja fantasma na internet.",
  addressLabel: "Endereço de atendimento",
  regionLabel: "Cidade e região",
  scheduleLabel: "Horário de funcionamento",
  mapPending: "Endereço comercial em confirmação.",
  mapTitle: "Mapa do endereço comercial",
  directionsCta: "Como chegar",
  primaryCta: "Falar com um especialista",
};

const directionsUrl = ENDERECO
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`
  : "";

export function LocationSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="location-section-title"
      className="bg-[#f7f5f1] px-5 py-16 text-neutral-950 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="localizacao"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch lg:gap-16">
        <motion.div
          className="flex flex-col justify-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-semibold text-neutral-500">
            {sectionCopy.eyebrow}
          </p>
          <h2
            className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-5xl"
            id="location-section-title"
          >
            {sectionCopy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            {sectionCopy.support}
          </p>

          <dl className="mt-9">
            {ENDERECO ? (
              <div className="flex items-start gap-4 py-5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-sm font-semibold text-neutral-500">
                    {sectionCopy.addressLabel}
                  </dt>
                  <dd className="mt-1 text-lg leading-7 text-neutral-800">
                    {ENDERECO}
                  </dd>
                </div>
              </div>
            ) : null}

            {CIDADE_REGIAO ? (
              <div className="flex items-start gap-4 py-5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-sm font-semibold text-neutral-500">
                    {sectionCopy.regionLabel}
                  </dt>
                  <dd className="mt-1 text-lg leading-7 text-neutral-800">
                    {CIDADE_REGIAO}
                  </dd>
                </div>
              </div>
            ) : null}

            {HORARIO ? (
              <div className="flex items-start gap-4 py-5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                  <Clock3 aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-sm font-semibold text-neutral-500">
                    {sectionCopy.scheduleLabel}
                  </dt>
                  <dd className="mt-1 text-lg leading-7 text-neutral-800">
                    {HORARIO}
                  </dd>
                </div>
              </div>
            ) : null}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {directionsUrl ? (
              <a
                className="location-section__secondary-cta inline-flex min-h-12 w-full items-center justify-center rounded-full border border-neutral-950 px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:w-auto"
                href={directionsUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span>{sectionCopy.directionsCta}</span>
              </a>
            ) : null}
            <a
              className="location-section__primary-cta inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 sm:w-auto"
              href="#formulario"
            >
              <span>{sectionCopy.primaryCta}</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="h-[340px] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200 shadow-[0_24px_70px_rgba(15,15,15,0.07)] sm:h-[420px] lg:h-[520px]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.08,
            duration: shouldReduceMotion ? 0 : 0.4,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {MAPA_EMBED_URL ? (
            <iframe
              allowFullScreen
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={MAPA_EMBED_URL}
              title={sectionCopy.mapTitle}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center text-sm font-medium text-neutral-500">
              {sectionCopy.mapPending}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
