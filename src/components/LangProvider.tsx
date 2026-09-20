"use client";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { copy, type Copy, type Lang } from "@/lib/i18n";
import { isEnPath, localize, toEn, toEs } from "@/lib/site";

type Ctx = { lang: Lang; t: Copy; setLang: (l: Lang) => void; href: (path: string) => string };
const LangCtx = createContext<Ctx | null>(null);

/* The URL decides the language (Spanish at /, English at /en), so every page has a crawlable version
   in each language. The toggle changes the URL, and a remembered choice is honoured on arrival. */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lang: Lang = isEnPath(pathname) ? "en" : "es";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("ll-lang");
    } catch {}
    if ((saved === "en" || saved === "es") && saved !== lang) {
      const target = saved === "en" ? toEn(toEs(pathname)) : toEs(pathname);
      router.replace(target + window.location.hash);
    }
    // once, on first arrival only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback(
    (l: Lang) => {
      try {
        localStorage.setItem("ll-lang", l);
      } catch {}
      const base = toEs(pathname);
      router.push(l === "en" ? toEn(base) : base);
    },
    [pathname, router],
  );

  const href = useCallback((p: string) => localize(lang, p), [lang]);
  const value = useMemo(() => ({ lang, t: copy[lang], setLang, href }), [lang, setLang, href]);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
