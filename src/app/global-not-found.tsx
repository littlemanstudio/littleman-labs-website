import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontClasses } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 | Littleman Labs",
  robots: { index: false, follow: true },
};

/* A single friendly page for every unmatched URL, written in both languages. */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={fontClasses}>
      <body>
        <main className="nf">
          <Link className="brand" href="/">Littleman Labs</Link>
          <p className="label">404</p>
          <h1 className="display">Esta página no existe.</h1>
          <p className="nf-en display">This page does not exist.</p>
          <p className="nf-links">
            <Link href="/">Inicio</Link>
            <Link href="/services">Servicios</Link>
            <Link href="/contact">Contacto</Link>
            <span aria-hidden="true">·</span>
            <Link href="/en">Home</Link>
            <Link href="/en/services">Services</Link>
            <Link href="/en/contact">Contact</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
