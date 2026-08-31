"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LangProvider";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { key: "nav.home", href: "/" },
  { key: "nav.services", href: "/services" },
  { key: "nav.about", href: "/about" },
];

function Logo() {
  return (
    <>
      <Image src="/brand/littleman-labs-logo.png" alt="" width={24} height={24} className="h-6 w-6 opacity-95 brightness-0 invert" />
      Littleman
    </>
  );
}

/* 1:1 port of the live site's resizable-navbar.tsx behavior: past 100px of
   scroll, the bar condenses into a floating pill (narrower, blurred,
   dropped-shadow, nudged down from the top) instead of just toggling a
   flat background color. */
export function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Desktop pill */}
      <motion.nav
        animate={{
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled
            ? "0 0 24px rgba(0,0,0,0.18), 0 1px 1px rgba(0,0,0,0.1), 0 0 0 1px rgba(241,237,228,0.06)"
            : "none",
          width: scrolled ? "56%" : "100%",
          y: scrolled ? 16 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 50 }}
        className={
          "relative mx-auto hidden max-w-6xl items-center justify-between rounded-full px-6 py-3 lg:flex " +
          (scrolled ? "bg-graphite-deep/90" : "bg-transparent")
        }
        style={{ minWidth: "720px" }}
      >
        <NavLink href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-bone">
          <Logo />
        </NavLink>

        <div className="flex items-center gap-8">
          {LINKS.map((l) => (
            <NavLink key={l.key} href={l.href} className="text-sm text-bone/75 transition-colors hover:text-bone">
              {t(l.key)}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex overflow-hidden rounded-full border border-bone/20 font-mono text-[0.68rem]">
            {(["es", "en"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={
                  "px-2.5 py-1 uppercase transition-colors " +
                  (lang === code ? "bg-bronze-bright text-graphite-deep" : "text-bone/60 hover:text-bone")
                }
              >
                {code}
              </button>
            ))}
          </div>
          <NavLink
            href="/contact"
            className="rounded-md border border-bronze/70 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.06em] text-bronze-bright transition-colors hover:bg-bronze-bright hover:text-graphite-deep"
          >
            {t("cta.getInTouch")}
          </NavLink>
        </div>
      </motion.nav>

      {/* Mobile bar */}
      <motion.div
        animate={{
          backdropFilter: scrolled ? "blur(10px)" : "none",
          width: scrolled ? "92%" : "100%",
          borderRadius: scrolled ? "16px" : "0px",
          y: scrolled ? 12 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 50 }}
        className={
          "relative mx-auto flex items-center justify-between px-5 py-4 lg:hidden " +
          (scrolled || menuOpen ? "bg-graphite-deep/90" : "bg-transparent")
        }
      >
        <NavLink
          href="/"
          onClick={() => setMenuOpen(false)}
          className="relative z-[70] flex items-center gap-2 font-display text-base font-semibold text-bone"
        >
          <Logo />
        </NavLink>
        <button
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-[70] flex h-9 w-9 items-center justify-center text-bone"
        >
          {menuOpen ? <IconX className="size-6" /> : <IconMenu2 className="size-6" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col justify-center gap-8 bg-graphite-deep px-8 lg:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <NavLink href={l.href} onClick={() => setMenuOpen(false)} className="font-display text-3xl font-semibold text-bone">
                  {t(l.key)}
                </NavLink>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <NavLink
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl font-semibold text-bronze-bright"
              >
                {t("nav.contact")}
              </NavLink>
            </motion.div>
            <div className="flex gap-2 pt-4 font-mono text-xs">
              {(["es", "en"] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={
                    "rounded-full border border-bone/20 px-3 py-1 uppercase " +
                    (lang === code ? "bg-bronze-bright text-graphite-deep" : "text-bone/60")
                  }
                >
                  {code}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
