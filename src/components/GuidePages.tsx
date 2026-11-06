import Link from "next/link";
import BabyGlass from "./BabyGlassLazy";
import JsonLd from "./JsonLd";
import SiteLd from "./SiteLd";
import { Reveals } from "./Sections";
import { breadcrumb, faqLd } from "@/lib/seo";
import { GUIDES, GUIDES_LASTMOD, UI, getGuide } from "@/lib/guides";
import { SITE, localize, type LangCode } from "@/lib/site";

const CtaLink = ({ lang, label }: { lang: LangCode; label: string }) => (
  <Link className="cta label" href={localize(lang, "/contact")}>
    <span className="ring" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
    {label}
  </Link>
);

export function GuideHubBody({ lang }: { lang: LangCode }) {
  const ui = UI[lang];
  const hub = localize(lang, "/reddit");
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: ui.hubTitle,
    description: ui.hubDescription,
    url: `${SITE.url}${hub}`,
    inLanguage: lang,
    hasPart: GUIDES.map((g) => ({
      "@type": "Article",
      headline: g[lang].h1,
      url: `${SITE.url}${localize(lang, `/reddit/${g.slug}`)}`,
    })),
  };
  return (
    <>
      <SiteLd lang={lang} />
      <JsonLd data={[collection, breadcrumb([{ name: ui.home, path: localize(lang, "/") }, { name: ui.hubCrumb, path: hub }])]} />
      <Reveals>
        <main id="main" className="inner inner-split legal guide">
          <div className="inner-col">
            <p className="eyebrow label">{ui.hubEyebrow}</p>
            <h1 className="display">{ui.hubTitle}</h1>
            <p className="lead">{ui.hubLead}</p>
            <ul className="guide-list">
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link href={localize(lang, `/reddit/${g.slug}`)}>
                    <span className="label">{g[lang].kicker}</span>
                    <strong>{g[lang].h1}</strong>
                    <span className="guide-desc">{g[lang].description}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="guide-note">{ui.note}</p>
          </div>
          <div className="page-slot" aria-hidden="true" />
        </main>
      </Reveals>
      <BabyGlass page />
    </>
  );
}

export function GuideBody({ lang, slug }: { lang: LangCode; slug: string }) {
  const g = getGuide(slug);
  if (!g) return null;
  const c = g[lang];
  const ui = UI[lang];
  const path = localize(lang, `/reddit/${slug}`);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: c.description,
    inLanguage: lang,
    mainEntityOfPage: `${SITE.url}${path}`,
    dateModified: GUIDES_LASTMOD,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
  const related = g.related.map((s) => getGuide(s)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  return (
    <>
      <SiteLd lang={lang} />
      <JsonLd
        data={[
          article,
          faqLd(c.qa.map((x) => ({ q: x.q, a: x.a.join(" ") }))),
          breadcrumb([
            { name: ui.home, path: localize(lang, "/") },
            { name: ui.hubCrumb, path: localize(lang, "/reddit") },
            { name: c.kicker, path },
          ]),
        ]}
      />
      <Reveals>
        <main id="main" className="inner inner-split legal guide">
          <article className="inner-col">
            <Link className="crumb label" href={localize(lang, "/reddit")}>
              ← {ui.hubCrumb}
            </Link>
            <p className="eyebrow label">{c.kicker}</p>
            <h1 className="display">{c.h1}</h1>
            {c.intro.map((p) => (
              <p className="lead" key={p}>
                {p}
              </p>
            ))}
            <p className="guide-updated label">
              {ui.updated} {GUIDES_LASTMOD}
            </p>
            {c.qa.map((x) => (
              <section key={x.q}>
                <h2>{x.q}</h2>
                {x.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
            <section className="guide-us">
              <h2>{c.us.h2}</h2>
              {c.us.p.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <CtaLink lang={lang} label={ui.cta} />
            </section>
            <section>
              <h2 className="label sub">{ui.related}</h2>
              <ul className="guide-list guide-related">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={localize(lang, `/reddit/${r.slug}`)}>
                      <strong>{r[lang].h1}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <p className="guide-note">{ui.note}</p>
          </article>
          <div className="page-slot" aria-hidden="true" />
        </main>
      </Reveals>
      <BabyGlass page />
    </>
  );
}
