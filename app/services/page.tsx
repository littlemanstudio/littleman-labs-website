"use client";

import { useLang } from "@/components/LangProvider";
import { NavLink } from "@/components/NavLink";
import { Reveal } from "@/components/Reveal";
import { PhotoFrame } from "@/components/PhotoFrame";
import { CtaMascot } from "@/components/CtaMascot";

const PLANS = [
  {
    key: "svcpage.p1",
    featured: false,
    photo: "/photos/service-website.webp",
    alt: "Laptop en un escritorio oscuro mostrando la maqueta de una página de inicio, iluminado por una lámpara de escritorio",
  },
  {
    key: "svcpage.p2",
    featured: true,
    photo: "/photos/service-crm.webp",
    alt: "Monitor en un escritorio oscuro mostrando un panel de CRM con íconos de llamada, formulario y mensaje",
  },
  {
    key: "svcpage.p3",
    featured: false,
    photo: "/photos/service-ads.webp",
    alt: "Monitor y teléfono en un escritorio oscuro mostrando un panel de análisis de campaña y una vista previa de anuncio",
  },
] as const;

export default function Services() {
  const { t } = useLang();

  return (
    <>
      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-[length:var(--fs-h2)] font-extrabold text-bone">{t("svcpage.h1")}</h1>
          <p className="mt-6 max-w-2xl text-[length:var(--fs-lead)] text-bone-dim">{t("svcpage.lede")}</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <Reveal>
          <h2 className="mx-auto max-w-6xl font-display text-xl font-semibold text-bone">{t("svcpage.plans.h2")}</h2>
        </Reveal>
      </section>

      {/* Native scroll-snap slider, same as the live site: no pin/scrub
          math to fight on short viewports, cards scroll-snap into place. */}
      <section className="pb-28">
        <Reveal>
          <div
            className="flex gap-5 overflow-x-auto px-6 py-1 pb-2 md:gap-9"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {PLANS.map(({ key, featured, photo, alt }, i) => (
              <article
                key={key}
                className={
                  "flex flex-none flex-col " +
                  (featured ? "border border-bronze p-5" : "")
                }
                style={{
                  flexBasis: featured ? "min(620px, 90vw)" : "min(520px, 84vw)",
                  scrollSnapAlign: "start",
                  background: featured
                    ? "linear-gradient(180deg, rgba(184,135,74,0.07), transparent 45%)"
                    : undefined,
                }}
              >
                <div className={featured ? "order-2 mt-6" : "mb-6"}>
                  <PhotoFrame src={photo} alt={alt} aspect="aspect-[4/3]" />
                </div>
                <div className={featured ? "order-1" : ""}>
                  <span className="inline-flex flex-wrap items-center gap-2.5 font-mono text-[0.78rem] tracking-[0.1em] text-bronze-bright">
                    {t(`${key}.label`)}
                    {featured && (
                      <span className="rounded-full bg-bronze-bright px-2.5 py-[3px] font-mono text-[0.64rem] tracking-[0.1em] text-graphite-deep">
                        {t("svcpage.badge")}
                      </span>
                    )}
                  </span>
                  <h3 className="mt-3.5 max-w-[16ch] font-display text-[length:var(--fs-h3)] font-bold text-bone">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="mt-4 max-w-[42ch] text-bone-dim">{t(`${key}.tag`)}</p>
                  <ul className="mt-4.5 flex flex-col gap-2.5">
                    {(["f1", "f2", "f3"] as const).map((f) => (
                      <li key={f} className="flex gap-2.5 text-[0.92rem] text-bone-dim">
                        <span className="text-bronze-bright">&bull;</span>
                        {t(`${key}.${f}`)}
                      </li>
                    ))}
                  </ul>
                  <NavLink
                    href="/contact"
                    className="mt-6 inline-block rounded-md border border-bronze/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.06em] text-bronze-bright transition-colors hover:bg-bronze-bright hover:text-graphite-deep"
                  >
                    {t(`${key}.cta`)}
                  </NavLink>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-t border-bone/10 px-6 py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <Reveal>
            <PhotoFrame
              src="/photos/allan-services.webp"
              alt="Allan, construyendo el sistema de un cliente"
              aspect="aspect-[4/3]"
            />
          </Reveal>
          <div>
            <Reveal delay={0.05}>
              <p className="text-bone-dim">{t("svcpage.piece.p1")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-bone-dim">{t("svcpage.piece.p2")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-t border-bone/10 px-6 py-28">
        <CtaMascot src="/brand/mascot-magnifier.png" />
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-10">
          <h2 className="max-w-[18ch] font-display text-[length:var(--fs-h3)] font-extrabold leading-[0.94] text-bone">
            {t("svcpage.cta.h2")}
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
