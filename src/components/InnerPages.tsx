"use client";
import Link from "next/link";
import { useLang } from "./LangProvider";
import { Split, plain } from "./Split";
import { PRIVACY, TERMS } from "@/lib/legal";
import { Reveals, Tracking, Approach, Related } from "./Sections";
import BabyGlass from "./BabyGlassLazy";

export function ServicePage({ kind }: { kind: "web" | "ads" }) {
  const { t, href } = useLang();
  const c = t.svc[kind];
  return (
    <>
    <Reveals>
      <div className="inner inner-split">
        <div className="inner-col">
        <Link className="crumb label" href={href("/services")}>← {t.svc.back}</Link>
        <p className="eyebrow label">{c.eyebrow}</p>
        <h1 className="display" aria-label={plain(c.title)}>
          <Split text={c.title} />
        </h1>
        <p className="lead">{c.lead}</p>
        <div className="inner-grid">
          <section>
            <h2 className="label sub">{t.svc.includesLabel}</h2>
            <ul className="ticks">
              {c.includes.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="label sub">{t.svc.faqLabel}</h2>
            {c.faq.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>
        </div>
        <details className="disclose">
          <summary>{t.svc.processTitle}</summary>
          <ol className="process">
            {t.approach.steps.map((st) => (
              <li key={st.t}>
                <strong>{st.t}</strong>
                <span>{st.d}</span>
              </li>
            ))}
          </ol>
        </details>
        <Related page={kind} />
        <Link className="cta label" href={href("/contact")}>
          <span className="ring" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="1" /></svg>
          </span>
          {t.svc.cta}
        </Link>
        </div>
        <div className="page-slot" aria-hidden="true" />
      </div>
      {kind === "ads" && <Tracking />}
    </Reveals>
    <BabyGlass page />
    </>
  );
}

export function ServicesHub() {
  const { t, href } = useLang();
  const h = t.svc.hub;
  return (
    <>
      <Reveals>
        <div className="inner inner-split hub">
          <div className="inner-col">
            <p className="eyebrow label">{h.eyebrow}</p>
            <h1 className="display" aria-label={plain(h.title)}>
              <Split text={h.title} />
            </h1>
            <p className="lead">{h.lead}</p>
            <div className="hub-cards">
              {t.services.items.map((it) => (
                <article className="card" key={it.k}>
                  <h2>{it.title}</h2>
                  <p>{it.body}</p>
                  <ul>
                    {it.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <Link className="more label" href={href(it.href)}>{t.services.more} →</Link>
                </article>
              ))}
            </div>
          </div>
          <div className="page-slot" aria-hidden="true" />
        </div>
        <Approach flat />
        <Related page="hub" />
      </Reveals>
      <BabyGlass page />
    </>
  );
}

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { t, lang } = useLang();
  const sections = (kind === "privacy" ? PRIVACY : TERMS)[lang];
  return (
    <>
      <main id="main" className="inner inner-split legal">
        <div className="inner-col">
          <p className="eyebrow label">{t.legal.updated}</p>
          <h1 className="display">{kind === "privacy" ? t.legal.privacyTitle : t.legal.termsTitle}</h1>
          {sections.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              <p>{s.body}</p>
            </section>
          ))}
        </div>
        <div className="page-slot" aria-hidden="true" />
      </main>
      <BabyGlass page />
    </>
  );
}

export function ContactFaq() {
  const { t } = useLang();
  const faqs = [...t.svc.web.faq, ...t.svc.ads.faq];
  return (
    <section className="contact-faq">
      <h2 className="label sub">{t.svc.faqLabel}</h2>
      <div>
        {faqs.map((f) => (
          <details key={f.q} className="faq">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
