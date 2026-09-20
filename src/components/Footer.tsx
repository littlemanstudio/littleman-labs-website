"use client";
import Link from "next/link";
import { useLang } from "./LangProvider";
import { scrollToTop } from "@/lib/lenis";
import { SITE } from "@/lib/site";

export default function Footer() {
  const { t, href } = useLang();
  return (
    <footer className="footer" id="end">
      <div className="pier" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-96.png" alt="" width={54} height={48} />
      </div>
      <div className="foot-grid">
        <div>
          <p className="foot-brand">Littleman Labs</p>
          <p className="foot-tag">{t.footer.tagline}</p>
        </div>
        <div>
          <p className="foot-h label">{t.footer.connect}</p>
          <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneLabel}</a>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
        <div>
          <p className="foot-h label">{t.footer.site}</p>
          <Link href={href("/services/websites")}>{t.services.items[0].title}</Link>
          <Link href={href("/services/ads")}>{t.services.items[1].title}</Link>
          <Link href={href("/work")}>{t.nav.work}</Link>
          <Link href={href("/about")}>{t.nav.about}</Link>
        </div>
        <div>
          <p className="foot-h label">{t.footer.legal}</p>
          <Link href={href("/privacy")}>{t.footer.privacy}</Link>
          <Link href={href("/terms")}>{t.footer.terms}</Link>
          <span className="foot-social">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          </span>
        </div>
      </div>
      <div className="foot-row">
        <span>© {new Date().getFullYear()} Littleman Labs. {t.footer.rights}</span>
        <button onClick={scrollToTop}>{t.footer.top}</button>
      </div>
    </footer>
  );
}
