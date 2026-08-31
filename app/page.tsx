"use client";

import { useLang } from "@/components/LangProvider";
import { NavLink } from "@/components/NavLink";
import { Reveal } from "@/components/Reveal";
import { HeroScene } from "@/components/HeroScene";
import { PhotoFrame } from "@/components/PhotoFrame";
import { CodeScroll } from "@/components/CodeScroll";
import { CtaMascot } from "@/components/CtaMascot";

export default function Home() {
  const { t } = useLang();

  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-32 pb-10 md:pt-24">
        {/* The specimen: a small, precisely framed vitrine, not a full-bleed
            backdrop, same proportions as the live site's .hero-specimen. */}
        <div
          className="absolute z-[3] hidden overflow-hidden border md:block"
          style={{
            borderColor: "var(--line-strong)",
            right: "clamp(0px, 4vw, 90px)",
            bottom: "clamp(24px, 5vh, 56px)",
            width: "clamp(140px, 13vw, 195px)",
            aspectRatio: "3/4",
          }}
        >
          <span
            aria-hidden
            className="absolute left-[-1px] top-[-1px] z-10 h-3.5 w-3.5 border-t border-l"
            style={{ borderColor: "var(--bronze-bright)" }}
          />
          <span
            aria-hidden
            className="absolute bottom-[-1px] right-[-1px] z-10 h-3.5 w-3.5 border-b border-r"
            style={{ borderColor: "var(--bronze-bright)" }}
          />
          <HeroScene />
        </div>

        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-4 flex justify-end">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-bone-faint">
              {t("hero.kicker")}
            </span>
          </div>
          <h1 className="mt-6 max-w-[15ch] font-display text-[length:var(--fs-h1)] font-extrabold tracking-tight text-bone">
            {t("hero.title1")} <span className="accent">{t("hero.title2")}</span> {t("hero.title3")}
          </h1>
          <p className="relative z-[4] mt-8 max-w-xl text-[length:var(--fs-lead)] text-bone-dim">{t("hero.sub")}</p>
          <NavLink
            href="/services"
            className="relative z-[4] mt-10 inline-block rounded-md border border-bronze/70 px-6 py-3 font-mono text-sm uppercase tracking-[0.06em] text-bronze-bright transition-colors hover:bg-bronze-bright hover:text-graphite-deep"
          >
            {t("hero.seeServices")}
          </NavLink>

          <div
            className="relative mt-10 aspect-[3/4] w-[min(70vw,340px)] overflow-hidden border md:hidden"
            style={{ borderColor: "var(--line-strong)" }}
          >
            <span
              aria-hidden
              className="absolute left-[-1px] top-[-1px] z-10 h-3.5 w-3.5 border-t border-l"
              style={{ borderColor: "var(--bronze-bright)" }}
            />
            <span
              aria-hidden
              className="absolute bottom-[-1px] right-[-1px] z-10 h-3.5 w-3.5 border-b border-r"
              style={{ borderColor: "var(--bronze-bright)" }}
            />
            <HeroScene />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <Reveal>
              <h2 className="font-display text-[length:var(--fs-h2)] font-bold text-bone">{t("home.why.h2")}</h2>
            </Reveal>
            <div className="mt-8 flex max-w-xl flex-col gap-5 text-[length:var(--fs-lead)] text-bone-dim">
              <Reveal delay={0.05}>
                <p>{t("home.why.p1")}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>{t("home.why.p2")}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>{t("home.why.p3")}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>{t("home.why.p4")}</p>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.1}>
            <PhotoFrame
              src="/photos/workspace-desk.webp"
              alt="Un proyecto en curso, interfaz de un panel en un monitor del estudio"
              aspect="aspect-[4/5]"
            />
          </Reveal>
        </div>
      </section>

      <CodeScroll />

      <section className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="max-w-xl font-display text-2xl font-semibold text-bone">{t("home.process.lede")}</p>
          </Reveal>
          <div className="mt-8 border-t" style={{ borderColor: "var(--line)" }}>
            {(["1", "2", "3"] as const).map((n, i) => (
              <Reveal key={n} delay={i * 0.06}>
                <div
                  className="group grid grid-cols-[60px_1fr] items-center gap-6 border-b py-8 transition-colors duration-300 hover:bg-bronze/[0.04] sm:grid-cols-[120px_1fr_40ch] sm:gap-8"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span className="font-mono text-sm text-bone-faint transition-colors duration-300 group-hover:text-bronze-bright">
                    0{n}
                  </span>
                  <h2 className="col-start-2 font-display text-[clamp(1.8rem,1.3rem+2.4vw,3.4rem)] font-bold text-bone transition-all duration-300 group-hover:translate-x-3.5 group-hover:text-bronze-bright sm:col-start-auto">
                    {t(`home.process.step${n}.title`)}
                  </h2>
                  <p className="col-span-2 mt-1 max-w-[56ch] text-bone-dim sm:col-span-1 sm:mt-0">
                    {t(`home.process.step${n}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-bone/10 px-6 py-28">
        <CtaMascot src="/brand/mascot-wrench.png" />
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-10">
          <h2 className="max-w-[18ch] font-display text-[length:var(--fs-h3)] font-extrabold leading-[0.94] text-bone">
            {t("home.cta.h2")}
          </h2>
          <NavLink
            href="/contact"
            className="inline-block rounded-md border border-bronze/70 px-6 py-3 font-mono text-sm uppercase tracking-[0.06em] text-bronze-bright transition-colors hover:bg-bronze-bright hover:text-graphite-deep"
          >
            {t("cta.getInTouch")}
          </NavLink>
        </Reveal>
      </section>
    </>
  );
}
