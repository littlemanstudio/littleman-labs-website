import type Lenis from "lenis";

export const smooth: { current: Lenis | null } = { current: null };

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (smooth.current) {
    smooth.current.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (smooth.current) smooth.current.scrollTo(0, { duration: 1.8 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
