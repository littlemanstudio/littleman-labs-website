"use client";

import { useLang } from "@/components/LangProvider";
import { NavLink } from "@/components/NavLink";
import { Reveal } from "@/components/Reveal";
import { PhotoFrame } from "@/components/PhotoFrame";
import { CtaMascot } from "@/components/CtaMascot";

export default function About() {
  const { t } = useLang();

  return (
    <>
      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-[length:var(--fs-h2)] font-extrabold text-bone">{t("about.h1")}</h1>
          <p className="mt-6 text-[length:var(--fs-lead)] text-bone-dim">{t("about.lede")}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-28 md:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-5 text-bone-dim md:order-1">
          <Reveal delay={0.05}>
            <p>{t("about.story1")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{t("about.story2")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>{t("about.story3")}</p>
          </Reveal>
        </div>
        <Reveal className="md:order-2">
          <PhotoFrame
            src="/photos/developer-monitor-glow.webp"
            alt="Sesión de trabajo nocturna, dos monitores, editor de código abierto"
            aspect="aspect-[4/5]"
          />
        </Reveal>
      </section>

      <section className="border-t border-bone/10 px-6 py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <Reveal>
            <PhotoFrame src="/photos/keyboard-hands.webp" alt={t("about.photoCaption")} aspect="aspect-[4/3]" />
            <p className="mt-3 font-mono text-xs text-bone-faint">{t("about.photoCaption")}</p>
          </Reveal>
          <div>
            <Reveal delay={0.05}>
              <h2 className="font-display text-2xl font-bold text-bone">{t("about.howItWorks.h2")}</h2>
            </Reveal>
            <div className="mt-6 flex flex-col gap-5 text-bone-dim">
              <Reveal delay={0.1}>
                <p>{t("about.howItWorks.p1")}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>{t("about.howItWorks.p2")}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>{t("about.howItWorks.p3")}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-bone/10 px-6 py-28">
        <CtaMascot src="/brand/mascot-wrench.png" />
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-10">
          <h2 className="max-w-[18ch] font-display text-[length:var(--fs-h3)] font-extrabold leading-[0.94] text-bone">
            {t("about.cta.h2")}
          </h2>
          <NavLink
            href="/contact"
            className="inline-block rounded-md border border-bronze/70 px-6 py-3 font-mono text-sm uppercase tracking-[0.06em] text-bronze-bright transition-colors hover:bg-bronze-bright hover:text-graphite-deep"
          >
            {t("about.cta.link")}
          </NavLink>
        </Reveal>
      </section>
    </>
  );
}
