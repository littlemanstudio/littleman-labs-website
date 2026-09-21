"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const load = () => import("./BabyGlass");
const BabyGlass = dynamic(load, { ssr: false });

/* Begin fetching the three.js chunk the moment this module reaches the browser, in parallel with hydration. */
if (typeof window !== "undefined") {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (!conn?.saveData) void load();
}

/* The 3D statue starts loading as early as possible (chunk, model and photo are also preloaded in the page head).
   It is skipped for visitors who asked to save data or are on a very slow connection. */
export default function BabyGlassLazy({ page = false }: { page?: boolean }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;
    const t = setTimeout(() => setGo(true), 0);
    return () => clearTimeout(t);
  }, []);
  return go ? <BabyGlass page={page} /> : null;
}
