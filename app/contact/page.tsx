"use client";

import { useLang } from "@/components/LangProvider";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { PhotoFrame } from "@/components/PhotoFrame";
import { FAQ_KEYS } from "@/lib/i18n";

export default function Contact() {
  const { t } = useLang();

  return (
    <>
      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-[length:var(--fs-h2)] font-extrabold text-bone">{t("contact.h1")}</h1>
          <p className="mt-6 max-w-xl text-[length:var(--fs-lead)] text-bone-dim">{t("contact.lede")}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.06em] text-bone-faint">
            {t("contact.islandNote")}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-28 md:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-4">
          <a
            href="https://wa.me/19392335269"
            className="rounded-lg border border-bone/20 bg-graphite-deep/90 p-6 backdrop-blur-sm transition-colors hover:border-bronze-bright"
          >
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-bronze-bright">
              {t("contact.label.whatsapp")}
            </span>
            <p className="mt-2 text-sm text-bone">+1 939-233-5269</p>
          </a>
          <a
            href="tel:+17879019020"
            className="rounded-lg border border-bone/20 bg-graphite-deep/90 p-6 backdrop-blur-sm transition-colors hover:border-bronze-bright"
          >
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-bronze-bright">
              {t("contact.label.call")}
            </span>
            <p className="mt-2 text-sm text-bone">+1 787-901-9020</p>
          </a>
          <a
            href="mailto:info@littlemanlabs.com"
            className="rounded-lg border border-bone/20 bg-graphite-deep/90 p-6 backdrop-blur-sm transition-colors hover:border-bronze-bright"
          >
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-bronze-bright">
              {t("contact.label.email")}
            </span>
            <p className="mt-2 text-sm text-bone">info@littlemanlabs.com</p>
          </a>
          <div className="mt-2">
            <PhotoFrame
              src="/photos/desk-silhouette.webp"
              alt="Trabajando hasta tarde en el proyecto de un cliente"
              aspect="aspect-[16/10]"
            />
          </div>
        </Reveal>
      </section>

      <section className="border-t border-bone/10 px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-display text-[length:var(--fs-h3)] font-bold text-bone">{t("contact.faq.h2")}</h2>
          </Reveal>
          <div className="mt-10 flex flex-col divide-y divide-bone/10">
            {FAQ_KEYS.map((n, i) => (
              <Reveal key={n} delay={i * 0.04} className="py-6">
                <h3 className="font-display text-lg font-semibold text-bone">
                  <em className="not-italic accent">{t(`contact.faq.q${n}`)}</em>
                </h3>
                <p className="mt-2 text-sm text-bone-dim">{t(`contact.faq.a${n}`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
