"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

// TODO: preencher no formato 55DDDNUMERO, sem espaços ou símbolos.
const NUMERO_VENDEDOR = "";

// TODO: preencher com a URL do webhook n8n do cliente.
const WEBHOOK_URL = "";

// TODO: confirmar se o projeto usará Meta Pixel, GTM ou ambos e preencher os eventos.
const TRACKING: { metaPixelEvent: string; gtmEvent: string } = {
  metaPixelEvent: "",
  gtmEvent: "",
};

// TODO: adicionar empresa ou e-mail somente se o cliente solicitar.

// TODO: revisar o texto de privacidade com o cliente antes da publicação.
const TEXTO_LGPD =
  "Usaremos seus dados somente para responder ao pedido de orçamento e continuar este atendimento.";

const TITULO_FECHAMENTO = "Vamos equipar seu escritório do jeito certo.";

const trustPoints = [
  "Atendimento humano e consultivo.",
  "Garantia de fábrica Cavaletti.",
  "Projeto e instalação inclusos.",
];

const sectionCopy = {
  eyebrow: "Próximo passo",
  subheadline:
    "Conte o tamanho do seu projeto. Um especialista vai entender sua necessidade e continuar a conversa pelo WhatsApp.",
  formTitle: "Solicite seu orçamento",
  formDescription: "Leva menos de um minuto.",
  nameLabel: "Nome",
  namePlaceholder: "Como podemos chamar você?",
  whatsappLabel: "WhatsApp",
  whatsappPlaceholder: "(00) 00000-0000",
  quantityLabel: "Quantidade estimada de cadeiras",
  quantityPlaceholder: "Selecione uma faixa",
  submit: "Falar com um especialista",
  submitting: "Enviando...",
  configurationError:
    "O WhatsApp do vendedor ainda precisa ser configurado para concluir o envio.",
};

const quantityOptions = ["1–4", "5–15", "16–30", "31–50", "50+"] as const;

type Quantity = (typeof quantityOptions)[number];
type FieldName = "nome" | "whatsapp" | "quantidade";
type FormErrors = Partial<Record<FieldName, string>>;

type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

type LeadPayload = {
  nome: string;
  whatsapp: string;
  quantidade: Quantity;
  origem: string;
  utms: UtmParams;
};

type TrackingWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  fbq?: (...args: unknown[]) => void;
};

const UTM_STORAGE_KEY = "studio-office-utms";

const emptyUtms: UtmParams = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function readStoredUtms() {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return emptyUtms;

    const parsed = JSON.parse(stored) as Partial<Record<keyof UtmParams, unknown>>;
    const getValue = (key: keyof UtmParams) =>
      typeof parsed[key] === "string" ? parsed[key] : "";

    return {
      utm_source: getValue("utm_source"),
      utm_medium: getValue("utm_medium"),
      utm_campaign: getValue("utm_campaign"),
      utm_content: getValue("utm_content"),
      utm_term: getValue("utm_term"),
    };
  } catch {
    return emptyUtms;
  }
}

function captureUtms() {
  const stored = readStoredUtms();
  const params = new URLSearchParams(window.location.search);
  const utms: UtmParams = {
    utm_source: params.get("utm_source") || stored.utm_source,
    utm_medium: params.get("utm_medium") || stored.utm_medium,
    utm_campaign: params.get("utm_campaign") || stored.utm_campaign,
    utm_content: params.get("utm_content") || stored.utm_content,
    utm_term: params.get("utm_term") || stored.utm_term,
  };

  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
  return utms;
}

function dispararConversao(payload: LeadPayload) {
  const trackingWindow = window as TrackingWindow;

  if (TRACKING.metaPixelEvent && trackingWindow.fbq) {
    trackingWindow.fbq("track", TRACKING.metaPixelEvent);
  }

  if (TRACKING.gtmEvent && trackingWindow.dataLayer) {
    trackingWindow.dataLayer.push({
      event: TRACKING.gtmEvent,
      quantidade: payload.quantidade,
      origem: payload.origem,
      utms: payload.utms,
    });
  }
}

async function persistirLead(payload: LeadPayload) {
  if (!WEBHOOK_URL) return;

  try {
    const body = JSON.stringify(payload);

    if (typeof navigator.sendBeacon === "function") {
      const sent = navigator.sendBeacon(
        WEBHOOK_URL,
        new Blob([body], { type: "application/json" }),
      );
      if (sent) return;
    }

    await fetch(WEBHOOK_URL, {
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      method: "POST",
    });
  } catch {
    return;
  }
}

function isQuantity(value: string): value is Quantity {
  return quantityOptions.some((option) => option === value);
}

export function LeadFormSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [quantidade, setQuantidade] = useState<Quantity | "">("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const nomeRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const quantidadeRef = useRef<HTMLSelectElement>(null);
  const utmsRef = useRef<UtmParams>(emptyUtms);

  useEffect(() => {
    utmsRef.current = captureUtms();
  }, []);

  const validate = () => {
    const nextErrors: FormErrors = {};
    const whatsappDigits = whatsapp.replace(/\D/g, "");

    if (!nome.trim()) nextErrors.nome = "Informe seu nome.";
    if (whatsappDigits.length < 10) {
      nextErrors.whatsapp = "Informe um WhatsApp com DDD.";
    }
    if (!quantidade) nextErrors.quantidade = "Selecione uma faixa.";

    setErrors(nextErrors);

    const firstInvalid = (["nome", "whatsapp", "quantidade"] as const).find(
      (field) => nextErrors[field],
    );

    if (firstInvalid) {
      const refs = {
        nome: nomeRef,
        whatsapp: whatsappRef,
        quantidade: quantidadeRef,
      };
      requestAnimationFrame(() => refs[firstInvalid].current?.focus());
      return false;
    }

    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!validate() || !quantidade) return;

    setIsSubmitting(true);

    const payload: LeadPayload = {
      nome: nome.trim(),
      whatsapp: whatsapp.replace(/\D/g, ""),
      quantidade,
      origem: `${window.location.origin}${window.location.pathname}`,
      utms: utmsRef.current,
    };

    dispararConversao(payload);
    void persistirLead(payload);

    if (!NUMERO_VENDEDOR) {
      setSubmitError(sectionCopy.configurationError);
      setIsSubmitting(false);
      return;
    }

    const message = `Olá! Sou ${payload.nome}, quero um orçamento para ${payload.quantidade} cadeiras.`;
    window.location.href = `https://wa.me/${NUMERO_VENDEDOR}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      aria-labelledby="lead-form-title"
      className="relative overflow-hidden bg-[#0a0a0a] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      id="formulario"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)]"
      />
      <motion.div
        className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-semibold text-white/55">
            {sectionCopy.eyebrow}
          </p>
          <h2
            className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl"
            id="lead-form-title"
          >
            {TITULO_FECHAMENTO}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/62">
            {sectionCopy.subheadline}
          </p>

          <ul className="mt-10 grid gap-3 border-t border-white/15 pt-6 text-sm text-white/60">
            {trustPoints.map((point) => (
              <li className="flex items-center gap-3" key={point}>
                <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-white/80" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="rounded-lg border border-white/12 bg-white p-5 text-neutral-950 sm:p-8 lg:p-10"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="border-b border-neutral-200 pb-7">
            <h3 className="text-2xl font-semibold tracking-normal">
              {sectionCopy.formTitle}
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              {sectionCopy.formDescription}
            </p>
          </div>

          <div className="mt-7 grid gap-6">
            <div>
              <label className="text-sm font-semibold" htmlFor="lead-nome">
                {sectionCopy.nameLabel}
              </label>
              <input
                aria-describedby={errors.nome ? "lead-nome-error" : undefined}
                aria-invalid={Boolean(errors.nome)}
                autoComplete="name"
                className="mt-2 min-h-12 w-full rounded-md border border-neutral-300 bg-white px-4 text-base outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                id="lead-nome"
                name="nome"
                onChange={(event) => {
                  setNome(event.target.value);
                  if (errors.nome) setErrors((current) => ({ ...current, nome: undefined }));
                }}
                placeholder={sectionCopy.namePlaceholder}
                ref={nomeRef}
                type="text"
                value={nome}
              />
              {errors.nome ? (
                <p className="mt-2 text-sm text-red-700" id="lead-nome-error">
                  {errors.nome}
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-semibold" htmlFor="lead-whatsapp">
                {sectionCopy.whatsappLabel}
              </label>
              <input
                aria-describedby={
                  errors.whatsapp ? "lead-whatsapp-error" : undefined
                }
                aria-invalid={Boolean(errors.whatsapp)}
                autoComplete="tel"
                className="mt-2 min-h-12 w-full rounded-md border border-neutral-300 bg-white px-4 text-base outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                id="lead-whatsapp"
                inputMode="tel"
                name="whatsapp"
                onChange={(event) => {
                  setWhatsapp(formatWhatsapp(event.target.value));
                  if (errors.whatsapp) {
                    setErrors((current) => ({ ...current, whatsapp: undefined }));
                  }
                }}
                placeholder={sectionCopy.whatsappPlaceholder}
                ref={whatsappRef}
                type="tel"
                value={whatsapp}
              />
              {errors.whatsapp ? (
                <p className="mt-2 text-sm text-red-700" id="lead-whatsapp-error">
                  {errors.whatsapp}
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-semibold" htmlFor="lead-quantidade">
                {sectionCopy.quantityLabel}
              </label>
              <select
                aria-describedby={
                  errors.quantidade ? "lead-quantidade-error" : undefined
                }
                aria-invalid={Boolean(errors.quantidade)}
                className="mt-2 min-h-12 w-full rounded-md border border-neutral-300 bg-white px-4 text-base outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
                id="lead-quantidade"
                name="quantidade"
                onChange={(event) => {
                  const value = event.target.value;
                  setQuantidade(isQuantity(value) ? value : "");
                  if (errors.quantidade) {
                    setErrors((current) => ({ ...current, quantidade: undefined }));
                  }
                }}
                ref={quantidadeRef}
                value={quantidade}
              >
                <option value="">{sectionCopy.quantityPlaceholder}</option>
                {quantityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.quantidade ? (
                <p
                  className="mt-2 text-sm text-red-700"
                  id="lead-quantidade-error"
                >
                  {errors.quantidade}
                </p>
              ) : null}
            </div>
          </div>

          <button
            className="group mt-8 inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-neutral-950 px-6 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 disabled:cursor-wait disabled:opacity-70"
            disabled={isSubmitting}
            type="submit"
          >
            <span>{isSubmitting ? sectionCopy.submitting : sectionCopy.submit}</span>
            <ArrowRight
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <p className="mt-4 text-xs leading-5 text-neutral-500">
            {TEXTO_LGPD}
          </p>

          <div aria-live="polite">
            {submitError ? (
              <p className="mt-4 text-sm font-medium text-red-700">
                {submitError}
              </p>
            ) : null}
          </div>
        </form>
      </motion.div>
    </section>
  );
}
