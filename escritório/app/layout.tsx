import type { Metadata } from "next";
import Script from "next/script";
import {
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  organizationJsonLd,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cadeiras de Escritório Cavaletti em Anápolis | Studio Office",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Cadeiras de escritório Cavaletti para empresas em Anápolis e região, com 6 anos de garantia de fábrica. Orçamento por lote e atendimento direto com quem vende.",
  applicationName: SITE_NAME,
  keywords: [
    "cadeira de escritório",
    "cadeiras Cavaletti",
    "cadeira ergonômica",
    "móveis para escritório",
    "Anápolis",
    "Goiás",
    "mobiliário corporativo",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    url: absoluteUrl("/"),
    title: "Cadeiras de Escritório Cavaletti em Anápolis | Studio Office",
    description:
      "Cadeiras Cavaletti para empresas em Anápolis e região, com 6 anos de garantia. Peça seu orçamento por lote.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cadeiras de Escritório Cavaletti em Anápolis | Studio Office",
    description:
      "Cadeiras Cavaletti para empresas em Anápolis e região, com 6 anos de garantia. Peça seu orçamento por lote.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Os icones vem da convencao de arquivo do Next (app/favicon.ico, app/icon.png,
  // app/apple-icon.png). Declarar `icons` aqui sobrescreveria essa convencao e,
  // com caminho absoluto, o basePath do build do cPanel nao seria aplicado.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TD7HWT3C');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Dados estruturados do negócio (schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TD7HWT3C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
