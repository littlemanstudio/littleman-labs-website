"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "./LangProvider";
import { SITE } from "@/lib/site";

const KEY = "ll-consent";

function loadPixel() {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void; _fbq?: unknown };
  if (w.fbq) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  const queue: unknown[][] = [];
  const fbq = function (...a: unknown[]) {
    queue.push(a);
  } as unknown as ((...a: unknown[]) => void) & { queue: unknown[][]; loaded: boolean; version: string };
  fbq.queue = queue;
  fbq.loaded = true;
  fbq.version = "2.0";
  w.fbq = fbq;
  w._fbq = fbq;
  document.head.appendChild(s);
  fbq("init", SITE.pixelId);
  fbq("track", "PageView");
}

/* Meta Pixel only loads after the visitor accepts. The choice is remembered on this device. */
export default function CookieConsent() {
  const { t, href } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let v: string | null = null;
    try {
      v = localStorage.getItem(KEY);
    } catch {}
    if (v === "yes") loadPixel();
    else if (v !== "no") setTimeout(() => setShow(true), 1500);
  }, []);

  const choose = (yes: boolean) => {
    try {
      localStorage.setItem(KEY, yes ? "yes" : "no");
    } catch {}
    if (yes) loadPixel();
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-label="Cookies">
      <p>
        {t.cookie.text} <Link href={href("/privacy")}>{t.cookie.more}</Link>
      </p>
      <div>
        <button onClick={() => choose(false)}>{t.cookie.decline}</button>
        <button className="yes" onClick={() => choose(true)}>{t.cookie.accept}</button>
      </div>
    </div>
  );
}
