"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BabyGlass = dynamic(() => import("./BabyGlass"), { ssr: false });

/* The 3D statue (three.js + model) starts loading only once the browser is idle, so text and layout paint first.
   It is skipped for visitors who asked to save data or are on a very slow connection. */
export default function BabyGlassLazy({ page = false }: { page?: boolean }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;
    const start = () => setGo(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 600);
    return () => clearTimeout(t);
  }, []);
  return go ? <BabyGlass page={page} /> : null;
}
