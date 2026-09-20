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
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-copy h1 .wi", { yPercent: 115, duration: 1.2, stagger: 0.07 }, 0.25)
        .from(".hero-copy p", { autoAlpha: 0, y: 18, filter: "blur(6px)", duration: 1.1 }, 1.05)
        .from(".cta", { autoAlpha: 0, x: -16, duration: 1 }, 1.2)
        .from(".cta .ring", { scale: 0, duration: 1.1, ease: "back.out(1.8)" }, 1.2)
        .from(".scroll-cue", { autoAlpha: 0, duration: 1 }, 2);

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          sceneState.scroll = self.progress;
        },
      });
      // headline blurs and fades in place while the object turns away (as in the reference)
      gsap.to(".hero-copy", {
        autoAlpha: 0,
        y: -40,
        filter: "blur(10px)",
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
