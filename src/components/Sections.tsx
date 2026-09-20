"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { Split, plain } from "./Split";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import Link from "next/link";
import ContactForm from "./ContactForm";

/* One place for scroll-triggered reveals across the page sections. */
export function Reveals({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((h) => {
        gsap.from(h.querySelectorAll(".wi"), {
          yPercent: 115,
          duration: 1.2,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: h, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((n) => {
        gsap.from(n, {
          autoAlpha: 0,
          y: 44,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: n, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((svg) => {
        const paths = svg.querySelectorAll<SVGGeometryElement>(".draw");
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 2.2,
          stagger: 0.18,
          ease: "expo.inOut",
          scrollTrigger: { trigger: svg, start: "top 85%", once: true },
        });
        gsap.from(svg.querySelectorAll(".pt"), {
          scale: 0,
          transformOrigin: "center",
          duration: 0.9,
          stagger: 0.12,
          delay: 0.9,
          ease: "back.out(2.4)",
          scrollTrigger: { trigger: svg, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((n) => {
        gsap.to(n, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: n, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      const pier = document.querySelector<HTMLElement>(".pier");
      const kid = document.querySelector<HTMLElement>(".pier img");
      if (pier && kid) {
        gsap.fromTo(
          kid,
          { x: 0 },
          {
            x: () => pier.clientWidth - kid.clientWidth,
            ease: "none",
            scrollTrigger: { trigger: pier, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
          },
        );
      }
      gsap.utils.toArray<HTMLElement>("[data-exit]").forEach((n) => {
        gsap.fromTo(
          n,
          { autoAlpha: 1, y: 0, filter: "blur(0px)" },
          {
            autoAlpha: 0,
            y: -56,
            filter: "blur(8px)",
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: n, start: "top 18%", end: "top -8%", scrub: true },
          },
        );
      });
      ScrollTrigger.refresh();
    }, el);
    return () => ctx.revert();
  }, []);

  return <main id="main" ref={root}>{children}</main>;
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="eyebrow label" data-reveal data-exit>{children}</p>
);

export function Related({ page }: { page: "web" | "ads" | "about" | "work" | "hub" | "home" }) {
  const { t, href } = useLang();
  const r = t.related[page];
  return (
    <p className="related" data-reveal>
      {r.t}{" "}
      <Link href={href(r.to)}>{r.l} →</Link>
    </p>
  );
}

export function Film() {
  const { t } = useLang();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const start = () => {
    const v = ref.current;
    if (!v) return;
    v.controls = true;
    void v.play();
  };
  return (
    <section className="section split split-l film" id="film">
      <div className="film-frame" data-reveal>
        <div className="phone">
          <video
            ref={ref}
            poster="/video/about-poster.jpg"
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onEnded={() => setPlaying(false)}
            aria-label={plain(t.film.title)}
          >
            <source src="/video/about.webm" type="video/webm" />
            <source src="/video/about.mp4" type="video/mp4" />
          </video>
          {!playing && (
            <button className="play" onClick={start} aria-label={t.film.play}>
              <span className="ring" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
                  <path d="M7 4.5v13l11-6.5z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="col">
        <Label>{t.film.label}</Label>
        <h2 className="display" data-split data-exit aria-label={plain(t.film.title)}>
          <Split text={t.film.title} />
        </h2>
        <p className="body" data-reveal>{t.film.body}</p>
        <p className="note label" data-reveal>{t.film.note}</p>
      </div>
    </section>
  );
}

export function Statement() {
  const { t } = useLang();
  return (
    <section className="section split split-r statement" id="idea">
      <div className="col">
      <Label>{t.statement.label}</Label>
      <h2 className="display" data-split data-exit aria-label={plain(t.statement.title)}>
        <Split text={t.statement.title} />
      </h2>
      <p className="body" data-reveal data-exit>{t.statement.body}</p>
      <Related page="home" />
      <div className="stats-row">
        {t.stats.map((st) => (
          <div className="stat-item" key={st.l} data-reveal>
            <span className="n">{st.n}</span>
            <span className="lead" aria-hidden="true" />
            <span className="l">{st.l}</span>
          </div>
        ))}
      </div>
      </div>
      <div className="slot" aria-hidden="true" />
    </section>
  );
}

function WebDiagram() {
  return (
    <svg viewBox="0 0 200 150" data-draw aria-hidden="true">
      <rect className="draw" pathLength={1} x="2" y="2" width="196" height="146" rx="10" />
      <path className="draw" pathLength={1} d="M2 26h196" />
      <circle className="pt" cx="16" cy="14" r="2.5" />
      <circle className="pt" cx="26" cy="14" r="2.5" />
      <circle className="pt" cx="36" cy="14" r="2.5" />
      <path className="faint" d="M18 48h92M18 62h64M18 76h80" />
      <rect className="draw" pathLength={1} x="18" y="98" width="52" height="20" rx="10" />
      <rect className="draw" pathLength={1} x="126" y="42" width="56" height="76" rx="6" />
      <path className="draw" pathLength={1} d="m150 118 0 18 5-5 5 9 4-2-5-9h7z" />
    </svg>
  );
}

function AdsDiagram() {
  return (
    <svg viewBox="0 0 200 150" data-draw aria-hidden="true">
      <path className="faint" d="M2 148h196M2 110h196M2 72h196M2 34h196" />
      <path className="draw" pathLength={1} d="M2 128C30 124 44 104 68 108s38 20 62-14 42-52 68-62" />
      <path className="draw" pathLength={1} d="M2 140C34 136 52 128 78 126s46 2 70-16 34-20 50-24" />
      <circle className="pt" cx="68" cy="108" r="3.2" />
      <circle className="pt" cx="130" cy="94" r="3.2" />
      <circle className="pt" cx="198" cy="32" r="3.2" />
    </svg>
  );
}

export function Services() {
  const { t, href } = useLang();
  return (
    <section className="section split split-r services" id="services">
      <div className="col">
      <Label>{t.services.label}</Label>
      <h2 className="display" data-split data-exit aria-label={plain(t.services.title)}>
        <Split text={t.services.title} />
      </h2>
      <div className="cards">
        {t.services.items.map((it) => (
          <article className="card" key={it.k} data-reveal>
            <div className="diagram">{it.k === "web" ? <WebDiagram /> : <AdsDiagram />}</div>
            <div style={{ height: "clamp(120px, 14vw, 200px)" }} />
            <div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
              <ul>
                {it.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <Link className="more label" href={href(it.href)}>{t.services.more} →</Link>
            </div>
          </article>
        ))}
      </div>
      </div>
      <div className="slot" aria-hidden="true" />
    </section>
  );
}

export function Tracking() {
  const { t } = useLang();
  const c = t.tracking;
  const bars = [38, 52, 44, 61, 57, 72, 66, 84, 78, 92, 88, 100];
  return (
    <section className="section tracking" id="tracking">
      <div className="tracking-grid">
        <div className="col">
          <Label>{c.label}</Label>
          <h2 className="display" data-split data-exit aria-label={plain(c.title)}>
            <Split text={c.title} />
          </h2>
          <p className="body" data-reveal>{c.body}</p>
          <ol className="t-steps">
            {c.steps.map((st) => (
              <li key={st.t} data-reveal>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="report" data-reveal aria-label={c.card.title}>
          <div className="report-head">
            <span className="label">{c.card.title}</span>
            <span className="tag">{c.card.sample}</span>
          </div>
          <div className="report-metrics">
            {c.card.metrics.map((m) => (
              <div key={m}>
                <span className="label">{m}</span>
                <i aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="report-chart">
            <span className="label">{c.card.chart}</span>
            <svg viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden="true">
              {bars.map((h, i) => {
                const H = h * 0.85;
                const a = H * 0.5, b = H * 0.28, c2 = H - a - b;
                const x = i * 20 + 2;
                return (
                  <g key={i}>
                    <rect x={x} y={90 - a} width="14" height={a} rx="2" fill="var(--sand)" opacity="0.85" />
                    <rect x={x} y={90 - a - b} width="14" height={b} rx="2" fill="var(--slate)" />
                    <rect x={x} y={90 - H} width="14" height={c2} rx="2" fill="var(--mauve)" />
                  </g>
                );
              })}
            </svg>
            <div className="legend">
              {c.card.sources.map((x) => <span key={x}>{x}</span>)}
            </div>
          </div>
          <div className="report-next">
            <span className="label">{c.card.next}</span>
            <ul>
              {c.card.nextItems.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Approach({ flat = false }: { flat?: boolean }) {
  const { t } = useLang();
  return (
    <section className={`section approach ${flat ? "" : "split split-l"}`} id="approach">
      {!flat && <div className="slot" aria-hidden="true" />}
      <div className="col">
      <Label>{t.approach.label}</Label>
      <h2 className="display" data-split data-exit aria-label={plain(t.approach.title)}>
        <Split text={t.approach.title} />
      </h2>
      <div className="steps">
        {t.approach.steps.map((s) => (
          <div className="step" key={s.t} data-reveal>
            <span className="tick" />
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

export function About({ first = false, teaser = false }: { first?: boolean; teaser?: boolean }) {
  const { t, href } = useLang();
  const c = t.about;
  return (
    <section className={`section about ${first ? "page-top" : ""}`} id="about">
      <div className="about-grid">
        <figure className="portrait" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <span className="vitrine"><img src="/brand/allan.jpg" alt={c.alt} width={720} height={900} loading="lazy" /></span>
          <figcaption>{c.role}</figcaption>
        </figure>
        <div className="col">
          <Label>{c.label}</Label>
          {first ? (
            <h1 className="display" data-split aria-label={plain(c.title)}>
              <Split text={c.title} />
            </h1>
          ) : (
            <h2 className="display" data-split data-exit aria-label={plain(c.title)}>
              <Split text={c.title} />
            </h2>
          )}
          <p className="body" data-reveal>{c.body}</p>
          {!teaser && <p className="body" data-reveal>{c.body2}</p>}
          {!teaser && <p className="body" data-reveal>{c.body3}</p>}
          <Link className="cta label" href={teaser ? href("/about") : href("/contact")} data-reveal>
            <span className="ring" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="1" /></svg>
            </span>
            {teaser ? c.more : c.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutMore() {
  const { t } = useLang();
  const c = t.aboutMore;
  return (
    <section className="section about-more">
      <div className="about-more-grid">
        <div className="about-more-text">
          <div data-reveal>
            <h2 className="label sub">{c.whoTitle}</h2>
            <p className="body">{c.who}</p>
          </div>
          <div data-reveal>
            <h2 className="label sub">{c.howTitle}</h2>
            <ul className="ticks">
              {c.how.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
        <div className="page-slot flow" aria-hidden="true" />
      </div>
          <Related page="about" />
    </section>
  );
}

export function Work({ first = false, teaser = false }: { first?: boolean; teaser?: boolean }) {
  const { t, href } = useLang();
  return (
    <section className={`section work ${first ? "page-top" : ""}`} id="work">
      <div className={first ? "work-head" : undefined}>
        <div className="work-head-text">
          <Label>{t.work.label}</Label>
          {first ? (
            <h1 className="display" data-split aria-label={plain(t.work.title)}>
              <Split text={t.work.title} />
            </h1>
          ) : (
            <h2 className="display" data-split data-exit aria-label={plain(t.work.title)}>
              <Split text={t.work.title} />
            </h2>
          )}
          {first && <p className="work-intro" data-reveal>{t.work.intro}</p>}
        </div>
        {first && <div className="page-slot flow" aria-hidden="true" />}
      </div>
      <div className="frames">
        {t.work.items.map((it, i) => (
          <figure className="frame" key={it.n} data-reveal>
            <a
              className="frame-link"
              href={i === 0 ? "https://xstaticfit.com" : "https://agavelandscapingpr.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${it.n}: ${i === 0 ? "xstaticfit.com" : "agavelandscapingpr.com"}`}
            >
              <div className="browser">
                <div className="bar" aria-hidden="true">
                  <i /><i /><i />
                  <span>{i === 0 ? "xstaticfit.com" : "agavelandscapingpr.com"}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i === 0 ? "/work/xstatic.webp" : "/work/agave.webp"} alt={`${it.n} website`} width={1800} height={1025} loading="lazy" />
              </div>
              <figcaption>
                {first ? <h2>{it.n}</h2> : <h3>{it.n}</h3>}
                <p>{it.k}<span className="arrow" aria-hidden="true"> ↗</span></p>
              </figcaption>
            </a>
          {first && (
            <details className="disclose">
              <summary>{t.work.builtTitle}</summary>
              <ul className="case">
                {it.detail.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </details>
          )}
          </figure>
        ))}
      </div>
      {first && (
        <div className="work-approach">
          <div className="work-approach-text">
            <h2 className="label sub">{t.work.approachTitle}</h2>
            <ul className="ticks">
              {t.work.approach.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="page-slot flow" aria-hidden="true" />
        </div>
      )}
      {first && <Related page="work" />}
      {teaser && (
        <Link className="more label all-work" href={href("/work")}>{t.work.all} →</Link>
      )}
    </section>
  );
}

export function Finale() {
  const { t, href } = useLang();
  return (
    <section className="finale split split-r" id="finale">
      <div className="col">
        <h2 className="display" data-split aria-label={plain(t.finale.title)}>
          <Split text={t.finale.title} />
        </h2>
        <div className="finale-cols">
          <p data-reveal>{t.finale.a}</p>
          <p data-reveal>{t.finale.b}</p>
        </div>
        <Link className="cta label" href={href("/contact")} data-reveal>
          <span className="ring" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="1" /></svg>
          </span>
          {t.finale.cta}
        </Link>
      </div>
      <div className="slot" aria-hidden="true" />
    </section>
  );
}

const railIds = ["top", "film", "idea", "services", "about", "work", "finale"];

/* Vertical hairline columns + the small progress rail from the reference. */
export function Frame() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    railIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <>
      <div className="lines" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => <i key={i} />)}
      </div>
      <div className="rail" aria-hidden="true">
        {railIds.map((id) => <span key={id} data-on={active === id} />)}
      </div>
    </>
  );
}

export function Contact({ first = false }: { first?: boolean }) {
  const { t } = useLang();
  return (
    <section className={`contact ${first ? "first" : ""}`} id="contact">
      <div className="contact-grid">
        <div>
          <p className="eyebrow label" data-reveal>{t.contact.label}</p>
          {first ? (
            <h1 data-split aria-label={plain(t.contact.title)}>
              <Split text={t.contact.title} />
            </h1>
          ) : (
            <h2 data-split aria-label={plain(t.contact.title)}>
              <Split text={t.contact.title} />
            </h2>
          )}
          <p className="lead" data-reveal>{t.contact.body}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-big" src="/brand/logo-640.png" alt="Littleman Labs" width={640} height={572} data-reveal />
        </div>
        <div data-reveal><ContactForm /></div>
      </div>
    </section>
  );
}
