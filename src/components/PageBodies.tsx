import Hero from "./Hero";
import BabyGlass from "./BabyGlassLazy";
import JsonLd from "./JsonLd";
import SiteLd from "./SiteLd";
import { ServicePage, ServicesHub, LegalPage, ContactFaq } from "./InnerPages";
import { Reveals, Film, Statement, Services, About, AboutMore, Work, Finale, Contact, Frame } from "./Sections";
import { breadcrumb, faqLd, serviceLd, metaDescription } from "@/lib/seo";
import { copy } from "@/lib/i18n";
import { SITE, localize, type LangCode } from "@/lib/site";

type P = { lang: LangCode };
const crumbs = (lang: LangCode, ...rest: { name: string; path: string }[]) => [
  { name: lang === "en" ? "Home" : "Inicio", path: localize(lang, "/") },
  ...rest.map((r) => ({ name: r.name, path: localize(lang, r.path) })),
];

export function HomeBody({ lang }: P) {
  return (
    <>
      <SiteLd lang={lang} />
      <Frame />
      <Hero />
      <BabyGlass />
      <Reveals>
        <Film />
        <Statement />
        <Services />
        <About teaser />
        <Work teaser />
        <Finale />
      </Reveals>
    </>
  );
}

export function AboutBody({ lang }: P) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Allan Gianni Rosario Bobet",
    jobTitle: lang === "en" ? "Founder" : "Fundador",
    worksFor: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
    url: `${SITE.url}${localize(lang, "/about")}`,
    image: `${SITE.url}/brand/allan.jpg`,
    address: { "@type": "PostalAddress", addressLocality: "Ponce", addressRegion: "PR", addressCountry: "US" },
    sameAs: [SITE.instagram, SITE.tiktok, SITE.facebook],
  };
  return (
    <>
      <SiteLd lang={lang} />
      <JsonLd data={[person, breadcrumb(crumbs(lang, { name: copy[lang].nav.about, path: "/about" }))]} />
      <Reveals>
        <About first />
        <AboutMore />
        <Film />
      </Reveals>
      <BabyGlass page />
    </>
  );
}

export function WorkBody({ lang }: P) {
  return (
    <>
      <SiteLd lang={lang} />
      <JsonLd data={breadcrumb(crumbs(lang, { name: copy[lang].nav.work, path: "/work" }))} />
      <Reveals>
        <Work first />
      </Reveals>
      <BabyGlass page />
    </>
  );
}

export function ContactBody({ lang }: P) {
  const c = copy[lang];
  return (
    <>
      <SiteLd lang={lang} />
      <JsonLd data={[faqLd([...c.svc.web.faq, ...c.svc.ads.faq]), breadcrumb(crumbs(lang, { name: c.nav.contact, path: "/contact" }))]} />
      <Reveals>
        <Contact first />
        <ContactFaq />
      </Reveals>
    </>
  );
}

export function ServicesBody({ lang }: P) {
  return (
    <>
      <SiteLd lang={lang} />
      <JsonLd data={breadcrumb(crumbs(lang, { name: copy[lang].nav.services, path: "/services" }))} />
      <ServicesHub />
    </>
  );
}

export function WebsitesBody({ lang }: P) {
  const c = copy[lang];
  return (
    <>
      <SiteLd lang={lang} />
      <JsonLd
        data={[
          serviceLd(c.services.items[0].title, metaDescription("websites", lang), localize(lang, "/services/websites")),
          faqLd(c.svc.web.faq),
          breadcrumb(crumbs(lang, { name: c.nav.services, path: "/services" }, { name: c.services.items[0].title, path: "/services/websites" })),
        ]}
      />
      <ServicePage kind="web" />
    </>
  );
}

export function AdsBody({ lang }: P) {
  const c = copy[lang];
  return (
    <>
      <SiteLd lang={lang} />
      <JsonLd
        data={[
          serviceLd(c.services.items[1].title, metaDescription("ads", lang), localize(lang, "/services/ads")),
          faqLd(c.svc.ads.faq),
          breadcrumb(crumbs(lang, { name: c.nav.services, path: "/services" }, { name: c.services.items[1].title, path: "/services/ads" })),
        ]}
      />
      <ServicePage kind="ads" />
    </>
  );
}

export const PrivacyBody = ({ lang }: P) => (
  <>
    <SiteLd lang={lang} />
    <LegalPage kind="privacy" />
  </>
);
export const TermsBody = ({ lang }: P) => (
  <>
    <SiteLd lang={lang} />
    <LegalPage kind="terms" />
  </>
);
