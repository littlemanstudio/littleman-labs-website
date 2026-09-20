import type { Metadata } from "next";
import { SITE, localize, toEn, type LangCode } from "./site";

export type PageKey = "home" | "services" | "websites" | "ads" | "work" | "about" | "contact" | "privacy" | "terms";

export const PATH: Record<PageKey, string> = {
  home: "/",
  services: "/services",
  websites: "/services/websites",
  ads: "/services/ads",
  work: "/work",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
};

const OG: Record<PageKey, string> = {
  home: "home", services: "services", websites: "websites", ads: "ads", work: "work", about: "about", contact: "contact", privacy: "legal", terms: "legal",
};

/* Titles 50-60 characters, descriptions 150-160, one voice per language. */
const META: Record<PageKey, Record<LangCode, { title: string; description: string }>> = {
  home: {
    es: { title: "Littleman Labs: Diseño web y anuncios en Ponce, Puerto Rico", description: "Diseñamos sitios web bilingües y manejamos los anuncios y el seguimiento que los llenan de clientes. Ponce, Puerto Rico. Llamada gratis de 20 minutos." },
    en: { title: "Littleman Labs: Web design and ads in Ponce, Puerto Rico", description: "We design bilingual websites and run the ads and follow-up that fill them with customers. Based in Ponce, Puerto Rico. Book a free 20-minute intro call." },
  },
  services: {
    es: { title: "Servicios: diseño web y anuncios en PR | Littleman Labs", description: "Sitios web bilingües a la medida y un sistema de crecimiento con anuncios en Meta, CRM y seguimiento a cada lead. Empiece con un sitio web y crezca a su ritmo." },
    en: { title: "Services: web design and ads in PR | Littleman Labs", description: "Custom bilingual websites and a growth system with Meta ads, a CRM and follow-up on every lead. Start with a website and grow at your own pace. Clear pricing." },
  },
  websites: {
    es: { title: "Diseño web bilingüe en Ponce, Puerto Rico | Littleman Labs", description: "Sitios web bilingües a la medida para negocios en Puerto Rico. En línea en 3 a 7 días laborables, hechos para convertir visitas en llamadas, mensajes y citas." },
    en: { title: "Bilingual web design in Ponce, Puerto Rico | Littleman Labs", description: "Custom bilingual websites for businesses in Puerto Rico. Live in 3 to 7 business days, built to turn visitors into calls, messages and bookings. One payment." },
  },
  ads: {
    es: { title: "Anuncios en Meta y sistema de crecimiento | Littleman Labs", description: "Sistema de crecimiento: anuncios en Meta cada semana, un CRM con seguimiento a cada lead y un plan de estrategia para hacer crecer su clientela en Puerto Rico." },
    en: { title: "Meta ads and growth system in Puerto Rico | Littleman Labs", description: "A growth system: Meta ads managed every week, a CRM with follow-up on every lead and a strategy plan to grow your clientele in Puerto Rico. Monthly reports." },
  },
  work: {
    es: { title: "Trabajo reciente: sitios web en Puerto Rico | Littleman Labs", description: "Proyectos recientes de Littleman Labs: la tienda en línea de Xstatic Fit y el sitio de AGAVE Landscaping PR, diseño de jardines en Ponce, Puerto Rico." },
    en: { title: "Recent work: websites in Puerto Rico | Littleman Labs", description: "Recent Littleman Labs projects: the Xstatic Fit online store and the AGAVE Landscaping PR site, a landscape design business in Ponce, Puerto Rico. See them." },
  },
  about: {
    es: { title: "Sobre Allan y Littleman Labs | Diseño web en Ponce", description: "Conozca a Allan Gianni Rosario Bobet, fundador de Littleman Labs en Ponce, Puerto Rico, y cómo trabaja: sitio web, anuncios y seguimiento en un sistema." },
    en: { title: "About Allan and Littleman Labs | Web design in Ponce", description: "Meet Allan Gianni Rosario Bobet, founder of Littleman Labs in Ponce, Puerto Rico, and how he works: website, ads and follow-up built as one system. Free call." },
  },
  contact: {
    es: { title: "Contacto: llamada gratis de 20 minutos | Littleman Labs", description: "Escríbanos por el formulario o WhatsApp, o llámenos. Una llamada gratis de 20 minutos para hablar de su sitio web y cómo conseguir más clientes en Puerto Rico." },
    en: { title: "Contact: free 20-minute call | Littleman Labs, Ponce PR", description: "Write through the form or WhatsApp, or call us. A free 20-minute call to talk about your website and how to win more customers in Puerto Rico. Bilingual." },
  },
  privacy: {
    es: { title: "Política de privacidad | Littleman Labs, Ponce, Puerto Rico", description: "Cómo Littleman Labs recopila, usa y protege su información de contacto, incluyendo formularios, llamadas, WhatsApp y el uso de Meta Pixel en este sitio." },
    en: { title: "Privacy policy | Littleman Labs, Ponce, Puerto Rico", description: "How Littleman Labs collects, uses and protects your contact information, including forms, calls, WhatsApp and the use of Meta Pixel on this site. Updated 2026." },
  },
  terms: {
    es: { title: "Términos y condiciones | Littleman Labs, Ponce, Puerto Rico", description: "Las condiciones que rigen trabajar con Littleman Labs en Puerto Rico: precios, planes mensuales, cancelación, alcance del proyecto y propiedad de su sitio web." },
    en: { title: "Terms and conditions | Littleman Labs, Ponce, Puerto Rico", description: "The terms for working with Littleman Labs: pricing, the monthly plan, cancellation, project scope and ownership of your website. In effect since August 8, 2026." },
  },
};

/* Next replaces (not merges) a page's openGraph, so each page states its full set. hreflang comes from
   alternates.languages, and every page canonicalises to itself. */
export function pageMeta(key: PageKey, lang: LangCode): Metadata {
  const { title, description } = META[key][lang];
  const path = PATH[key];
  const self = localize(lang, path);
  const img = `/og/${lang === "en" ? "en-" : ""}${OG[key]}.jpg`;
  return {
    title,
    description,
    alternates: { canonical: self, languages: { es: path, en: toEn(path), "x-default": path } },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: lang === "en" ? "en_US" : "es_PR",
      alternateLocale: lang === "en" ? "es_PR" : "en_US",
      title,
      description,
      url: self,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

export const metaDescription = (key: PageKey, lang: LangCode) => META[key][lang].description;

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE.url}${it.path}` })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${SITE.url}${path}`,
  serviceType: name,
  areaServed: { "@type": "State", name: "Puerto Rico" },
  provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
});

export const baseMetadata = (lang: LangCode): Metadata => ({
  metadataBase: new URL(SITE.url),
  title: META.home[lang].title,
  description: META.home[lang].description,
});

/* Real content dates, updated by hand when a page's content changes (a build date would be a false signal). */
export const LASTMOD: Record<PageKey, string> = {
  home: "2026-09-19",
  services: "2026-09-19",
  websites: "2026-09-19",
  ads: "2026-09-19",
  work: "2026-09-19",
  about: "2026-09-19",
  contact: "2026-09-19",
  privacy: "2026-09-19",
  terms: "2026-09-19",
};
