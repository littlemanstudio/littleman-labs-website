import JsonLd from "./JsonLd";
import { metaDescription } from "@/lib/seo";
import { copy } from "@/lib/i18n";
import { SITE, localize, type LangCode } from "@/lib/site";

/* Site-wide business schema, written in the language of the page it appears on. */
export default function SiteLd({ lang }: { lang: LangCode }) {
  const c = copy[lang];
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: `${SITE.url}${localize(lang, "/") === "/" ? "" : localize(lang, "/")}`,
    logo: `${SITE.url}/brand/logo-640.png`,
    image: `${SITE.url}/og/${lang === "en" ? "en-" : ""}home.jpg`,
    telephone: "+1-787-901-9020",
    email: SITE.email,
    description: metaDescription("home", lang),
    knowsLanguage: ["es", "en"],
    address: { "@type": "PostalAddress", addressLocality: "Ponce", addressRegion: "PR", addressCountry: "US" },
    areaServed: { "@type": "State", name: "Puerto Rico" },
    founder: { "@type": "Person", name: "Allan Gianni Rosario Bobet" },
    sameAs: [SITE.instagram, SITE.tiktok, SITE.facebook, ...(SITE.gbp ? [SITE.gbp] : [])],
    ...(SITE.gbp ? { hasMap: SITE.gbp } : {}),
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: c.services.items[0].title, url: `${SITE.url}${localize(lang, "/services/websites")}` } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: c.services.items[1].title, url: `${SITE.url}${localize(lang, "/services/ads")}` } },
    ],
  };
  return <JsonLd data={data} />;
}
