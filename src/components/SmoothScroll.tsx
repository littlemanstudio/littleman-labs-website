"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import { smooth, scrollToId } from "@/lib/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
    smooth.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const hash = location.hash.slice(1);
    const hashTimer = hash ? setTimeout(() => scrollToId(hash), 900) : 0;
    return () => {
      clearTimeout(hashTimer);
      gsap.ticker.remove(tick);
      lenis.destroy();
      smooth.current = null;
    };
  }, []);
  return null;
}
