import {
  ExternalLink,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const BRAND_NAME = "Studio Office";
const LOGO_SRC = "/logo-studio-office.webp";

// TODO: usar o mesmo número confirmado no formulário, no formato 55DDDNUMERO.
const NUMERO_VENDEDOR = "";

// TODO: preencher somente com o endereço comercial resumido.
const ENDERECO_CURTO = "";

// TODO: preencher somente com a razão social registrada do cliente.
const RAZAO_SOCIAL = "";

// TODO: preencher somente com o CNPJ real do cliente.
const CNPJ = "";

// TODO: preencher com a URL publicada da política de privacidade.
const LINK_PRIVACIDADE = "";

// TODO: preencher somente se o cliente aprovar o crédito de desenvolvimento.
const CREDITO_DESENVOLVIMENTO = "";

type SocialLink = {
  label: string;
  url: string;
};

// TODO: adicionar somente redes sociais com URL real e pública.
const SOCIAIS: SocialLink[] = [];

const navigation = [
  { href: "/catalogo", label: "Produtos" },
  { href: "/#quem-somos", label: "Quem somos" },
  { href: "/#localizacao", label: "Localização" },
  { href: "/#formulario", label: "Fale conosco" },
];

const footerCopy = {
  navigationLabel: "Navegação do rodapé",
  contactLabel: "Contato rápido",
  whatsapp: "WhatsApp",
  privacy: "Política de privacidade",
  rights: "Todos os direitos reservados",
};

function formatWhatsappNumber(number: string) {
  const digits = number.replace(/\D/g, "");

  if (digits.length === 13 && digits.startsWith("55")) {
    return `+55 (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  }

  if (digits.length === 12 && digits.startsWith("55")) {
    return `+55 (${digits.slice(2, 4)}) ${digits.slice(4, 8)}-${digits.slice(8)}`;
  }

  return number;
}

export function Footer() {
  const hasContact = Boolean(
    NUMERO_VENDEDOR || ENDERECO_CURTO || SOCIAIS.length,
  );
  const legalIdentity = [RAZAO_SOCIAL, CNPJ ? `CNPJ ${CNPJ}` : ""]
    .filter(Boolean)
    .join(" · ");

  return (
    <footer className="bg-[#050505] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 text-white sm:px-8 sm:pt-16 lg:px-12 lg:pb-10 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-9 md:flex-row md:justify-between">
          <Link
            aria-label={`${BRAND_NAME}, voltar ao início`}
            className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="/"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={BRAND_NAME}
              className="h-auto w-[142px] object-contain"
              height="65"
              src={LOGO_SRC}
              width="170"
            />
          </Link>

          <nav
            aria-label={footerCopy.navigationLabel}
            className="flex flex-wrap justify-center gap-x-7 gap-y-4 md:justify-end"
          >
            {navigation.map((item) => (
              <Link
                className="text-sm font-medium opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {hasContact ? (
          <div
            aria-label={footerCopy.contactLabel}
            className="mt-10 flex flex-col items-center gap-5 pt-8 text-sm text-white/70 md:flex-row md:justify-between"
          >
            <div className="flex flex-col items-center gap-5 md:flex-row md:gap-7">
              {NUMERO_VENDEDOR ? (
                <a
                  className="inline-flex items-center gap-2 transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  href={`https://wa.me/${NUMERO_VENDEDOR}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  <span>
                    {footerCopy.whatsapp}: {formatWhatsappNumber(NUMERO_VENDEDOR)}
                  </span>
                </a>
              ) : null}

              {ENDERECO_CURTO ? (
                <span className="inline-flex items-center gap-2 text-center">
                  <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {ENDERECO_CURTO}
                </span>
              ) : null}
            </div>

            {SOCIAIS.length ? (
              <ul className="flex items-center gap-3">
                {SOCIAIS.map((social) => {
                  return (
                    <li key={social.url}>
                      <a
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 opacity-70 transition hover:border-white/50 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        href={social.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <ExternalLink aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div className="mt-10 flex flex-col items-center gap-4 pt-7 text-center text-xs leading-5 text-white/45 md:flex-row md:flex-wrap md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-2 md:items-start">
            {legalIdentity ? <p>{legalIdentity}</p> : null}
            <p>
              © 2026 {BRAND_NAME} · {footerCopy.rights}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            {LINK_PRIVACIDADE ? (
              <a
                className="transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                href={LINK_PRIVACIDADE}
              >
                {footerCopy.privacy}
              </a>
            ) : null}
            {CREDITO_DESENVOLVIMENTO ? (
              <span>{CREDITO_DESENVOLVIMENTO}</span>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
