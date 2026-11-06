"use client";
import { useEffect, useRef } from "react";
import { Split, plain } from "./Split";
import { useLang } from "./LangProvider";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import { sceneState } from "@/lib/scene-state";
import Link from "next/link";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { t, lang, href } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (reducedMotion()) return;
      // the entrance (headline words, paragraph, button, scroll cue) is CSS in globals.css (.hero-copy / .scroll-cue),
      // so it paints with the first frame instead of waiting for hydration; GSAP keeps the scroll-driven motion below
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          sceneState.scroll = self.progress;
        },
      });
      // the dark legibility scrim at the hero's foot fades out first, so the hero meets the next section without a visible edge
      gsap.to(".hero-scrim", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "2% top", end: "24% top", scrub: true },
      });
      // headline fades and lifts while the object turns away; opacity and transform only, so scrolling stays on the compositor
      gsap.to(".hero-copy", {
        autoAlpha: 0,
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: el, start: "8% top", end: "55% top", scrub: true },
      });
    }, el);
    return () => {
      ctx.revert();
      sceneState.scroll = 0;
    };
  }, []);

  return (
    <section className="hero" id="top" ref={root} aria-label="Littleman Labs">

      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-copy">
        <h1 className="display" aria-label={plain(t.hero.title)} key={lang}>
          <Split text={t.hero.title} />
        </h1>
        <p>{t.hero.body}</p>
        <Link className="cta label" href={href("/work")}>
          <span className="ring" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
          {t.hero.cta}
        </Link>
      </div>


      <div className="scroll-cue label" aria-hidden="true">
        {t.hero.scroll}
        <span className="track">
          <span className="dot" />
        </span>
      </div>
    </section>
  );
}
