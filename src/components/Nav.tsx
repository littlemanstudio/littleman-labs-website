"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LangProvider";
import { scrollToTop } from "@/lib/lenis";
import { isEnPath, toEs } from "@/lib/site";
import { Component as KineticMenu } from "@/components/ui/sterling-gate-kinetic-navigation";

const links = [
  { key: "services", href: "/services" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export default function Nav() {
  const { t, lang, setLang, href } = useLang();
  const pathname = usePathname();
  const base = isEnPath(pathname) ? toEs(pathname) : pathname;
  const home = base === "/";
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
  }, [open]);

  const active = (h: string) => base === h || base.startsWith(h + "/");

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav" data-solid={solid || open || !home}>
        <Link
          className="brand"
          href={href("/")}
          aria-label="Littleman Labs"
          onClick={(e) => {
            setOpen(false);
            if (home) {
              e.preventDefault();
              scrollToTop();
            }
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-outlined.png" alt="" width={48} height={43} />
          <span>Littleman Labs</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links label">
            {links.map((l) => (
              <li key={l.key}>
                <Link href={href(l.href)} aria-current={active(l.href) ? "page" : undefined}>
                  {t.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-right">
          <div className="lang label" role="group" aria-label="Language">
            {(["es", "en"] as const).map((l) => (
              <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="kinetic-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </header>

      <KineticMenu
        showHeader={false}
        open={open}
        onOpenChange={setOpen}
        links={links.map((l) => ({ label: t.nav[l.key], href: href(l.href) }))}
        renderLink={(l, children, close) => (
          <Link href={l.href} className="nav-link" onClick={close}>
            {children}
          </Link>
        )}
      />
    </>
  );
}
