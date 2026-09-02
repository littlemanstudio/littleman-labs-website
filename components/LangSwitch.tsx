"use client";

import { useLang } from "@/components/LangProvider";

/* Plain mono text, ES/EN separated by a slash, no pill/border/fill —
   matches the site's own stated button philosophy ("no pill/chrome
   buttons, real studio sites ship plain text links with a bare
   opacity/color hover"). A bordered pill toggle is the generic
   template pattern this is deliberately avoiding. */
export function LangSwitch({ large = false }: { large?: boolean }) {
  const { lang, setLang } = useLang();

  const size = large ? "text-lg" : "text-[0.7rem]";

  return (
    <div className={`flex items-center gap-2 font-mono uppercase tracking-[0.06em] ${size}`}>
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-current={lang === "es"}
        className={
          "transition-colors " + (lang === "es" ? "text-bronze-bright" : "text-bone/45 hover:text-bone")
        }
      >
        ES
      </button>
      <span className="text-bone/25">/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-current={lang === "en"}
        className={
          "transition-colors " + (lang === "en" ? "text-bronze-bright" : "text-bone/45 hover:text-bone")
        }
      >
        EN
      </button>
    </div>
  );
}
