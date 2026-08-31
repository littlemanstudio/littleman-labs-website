"use client";

import { useLang } from "@/components/LangProvider";
import { Reveal } from "@/components/Reveal";
import { PRIVACY } from "@/lib/legal";

export default function Privacy() {
  const { t, lang } = useLang();
  const sections = PRIVACY[lang];

  return (
    <section className="px-6 pt-32 pb-28">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-[length:var(--fs-h3)] font-extrabold text-bone">{t("privacy.h1")}</h1>
        <p className="mt-4 text-bone-dim">{t("privacy.lede")}</p>
        <p className="mt-2 font-mono text-xs text-bone-faint">{t("privacy.updated")}</p>

        <div className="mt-14 flex flex-col gap-8">
          {sections.map((s, i) => (
            <Reveal key={s.h2} delay={Math.min(i * 0.03, 0.3)}>
              <h2 className="font-display text-lg font-semibold text-bone">{s.h2}</h2>
              <p className="mt-2 text-sm text-bone-dim">{s.body}</p>
            </Reveal>
          ))}
          <div>
            <h2 className="font-display text-lg font-semibold text-bone">
              {lang === "es" ? "10. Contáctanos" : "10. Contact Us"}
            </h2>
            <p className="mt-2 text-sm text-bone-dim">
              Littleman Labs, Ponce, Puerto Rico
              <br />
              +1 (787) 901-9020
              <br />
              <a href="mailto:info@littlemanlabs.com" className="text-bronze-bright hover:underline">
                info@littlemanlabs.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
