"use client";

import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";
import { NavLink } from "@/components/NavLink";
import { useLang } from "@/components/LangProvider";

const STUDIO_LINKS = [
  { key: "nav.home", href: "/" },
  { key: "nav.services", href: "/services" },
  { key: "nav.about", href: "/about" },
  { key: "nav.contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { icon: IconBrandInstagram, href: "https://www.instagram.com/littlemanlabs", label: "Instagram" },
  { icon: IconBrandTiktok, href: "https://www.tiktok.com/@littlemanlabs", label: "TikTok" },
  { icon: IconBrandFacebook, href: "https://www.facebook.com/Littlemanlabs", label: "Facebook" },
];

/* 1:1 port of the live site's site-footer.tsx: giant low-opacity wordmark
   watermark, 4-column grid (brand+socials spans 2), studio links, connect
   links, legal line. */
export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-bone/10 bg-graphite-deep">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none text-[13vw] font-extrabold leading-none tracking-tight text-bone/5 sm:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Littleman Labs
        </div>

        <div className="mt-8 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3">
            <div className="font-display text-lg font-semibold text-bone">{t("footer.est")}</div>
            <p className="max-w-sm text-sm text-bone-dim">{t("footer.tagline")}</p>
            <div className="flex gap-2 pt-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="rounded-md border border-bone/20 p-1.5 text-bone-dim transition-colors hover:border-bronze-bright hover:text-bronze-bright"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wide text-bone-faint">{t("footer.studio")}</span>
            {STUDIO_LINKS.map((l) => (
              <NavLink key={l.key} href={l.href} className="w-max text-sm text-bone/80 transition-colors hover:text-bronze-bright hover:underline">
                {t(l.key)}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wide text-bone-faint">{t("footer.connect")}</span>
            <a href="tel:+17879019020" className="w-max text-sm text-bone/80 transition-colors hover:text-bronze-bright hover:underline">
              +1 (787) 901-9020
            </a>
            <a href="https://wa.me/19392335269" target="_blank" rel="noopener" className="w-max text-sm text-bone/80 transition-colors hover:text-bronze-bright hover:underline">
              WhatsApp
            </a>
            <a href="mailto:info@littlemanlabs.com" className="w-max text-sm text-bone/80 transition-colors hover:text-bronze-bright hover:underline">
              {t("footer.email")}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-bone/10 pt-5 text-xs text-bone-faint sm:flex-row sm:items-center">
          <span>&copy; {year} Littleman Labs</span>
          <div className="flex items-center gap-4">
            <NavLink href="/privacy" className="transition-colors hover:text-bronze-bright hover:underline">
              {t("footer.privacy")}
            </NavLink>
            <NavLink href="/terms" className="transition-colors hover:text-bronze-bright hover:underline">
              {t("footer.terms")}
            </NavLink>
            <span>Ponce, Puerto Rico</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
