"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Menu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export type KineticLink = { label: string; href: string };

type Props = {
  /** Menu entries. `data-shape` cycles 1-5 so each row triggers its own background shape on hover. */
  links?: KineticLink[];
  /** Render the component's own header (logo row + Menu button). Off when a host header already has a toggle. */
  showHeader?: boolean;
  /** Controlled state. Leave undefined to let the component manage itself. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Called when a link is chosen, so a router-aware host can navigate. */
  renderLink?: (link: KineticLink, children: React.ReactNode, close: () => void) => React.ReactNode;
};

const DEFAULT_LINKS: KineticLink[] = [
  { label: "About us", href: "#" },
  { label: "Our work", href: "#" },
  { label: "Services", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact us", href: "#" },
];

/* Custom ease is created once, and applied per timeline. The original set gsap.defaults globally,
   which would silently change every other GSAP tween on the page. */
let easeReady = false;
function ensureEase() {
  if (easeReady) return "main";
  try {
    if (!gsap.parseEase("main") || gsap.parseEase("main") === gsap.parseEase("none")) {
      CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
    }
    easeReady = true;
    return "main";
  } catch {
    return "power2.out";
  }
}

export function Component({ links = DEFAULT_LINKS, showHeader = true, open, onOpenChange, renderLink }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inner, setInner] = useState(false);
  const isMenuOpen = open ?? inner;
  const setOpen = (v: boolean) => {
    onOpenChange?.(v);
    if (open === undefined) setInner(v);
  };

  // Hover: each row reveals its own background shape
  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll<HTMLElement>(".menu-list-item[data-shape]");
      const shapesContainer = root.querySelector(".ambient-background-shapes");
      const cleanups: (() => void)[] = [];

      items.forEach((item) => {
        const idx = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(`.bg-shape-${idx}`);
        if (!shape) return;
        const els = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapesContainer?.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");
          gsap.fromTo(
            els,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" },
          );
        };
        const onLeave = () => {
          gsap.to(els, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
            onComplete: () => shape.classList.remove("active"),
          });
        };
        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        item.addEventListener("focusin", onEnter);
        item.addEventListener("focusout", onLeave);
        cleanups.push(() => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
          item.removeEventListener("focusin", onEnter);
          item.removeEventListener("focusout", onLeave);
        });
      });
      return () => cleanups.forEach((c) => c());
    }, root);
    return () => ctx.revert();
  }, [links]);

  // Open / close choreography
  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;
    const ctx = gsap.context(() => {
      const navWrap = root.querySelector(".nav-overlay-wrapper");
      const menu = root.querySelector(".menu-content");
      const overlay = root.querySelector(".overlay");
      const bgPanels = root.querySelectorAll(".backdrop-layer");
      const menuLinks = root.querySelectorAll(".nav-link-text");
      const fadeTargets = root.querySelectorAll("[data-menu-fade]");
      const menuButton = root.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");

      const tl = gsap.timeline({ defaults: { ease: ensureEase(), duration: 0.7 } });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) tl.timeScale(30);

      if (isMenuOpen) {
        navWrap?.setAttribute("data-nav", "open");
        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<");
        if (menuButtonTexts?.length) tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 });
        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.09, duration: 0.8, ease: "expo.out" }, "<")
          .fromTo(menuLinks, { yPercent: 110 }, { yPercent: 0, stagger: 0.07, duration: 1, ease: "expo.out" }, "<+=0.3");
        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
        }
      } else {
        navWrap?.setAttribute("data-nav", "closed");
        tl.to(overlay, { autoAlpha: 0, duration: 0.5 }).to(menu, { xPercent: 105, duration: 0.6, ease: "power3.inOut" }, "<");
        if (menuButtonTexts?.length) tl.to(menuButtonTexts, { yPercent: 0 }, "<");
        tl.set(navWrap, { display: "none" });
      }
    }, root);
    return () => ctx.revert();
  }, [isMenuOpen]);

  // Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  const toggle = () => setOpen(!isMenuOpen);
  const close = () => setOpen(false);

  return (
    <div ref={containerRef} className="kn">
      {showHeader && (
        <div className="site-header-wrapper">
          <header className="header">
            <div className="container is--full">
              <nav className="nav-row">
                <a href="#" aria-label="home" className="nav-logo-row w-inline-block" />
                <div className="nav-row__right">
                  <button type="button" className="nav-close-btn" onClick={toggle} aria-expanded={isMenuOpen} aria-controls="kinetic-menu">
                    <div className="menu-button-text">
                      <p className="p-large">Menu</p>
                      <p className="p-large">Close</p>
                    </div>
                    <div className="icon-wrap">
                      <Menu className="menu-button-icon" strokeWidth={1.25} aria-hidden="true" />
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          </header>
        </div>
      )}

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper" id="kinetic-menu">
          <div className="overlay" onClick={close} />
          <nav className="menu-content" aria-label="Menu">
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              <div className="ambient-background-shapes" aria-hidden="true">
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(163,148,130,0.16)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(142,105,108,0.14)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(80,100,112,0.22)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(163,148,130,0.16)" />
                </svg>
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(163,148,130,0.22)" strokeWidth="60" fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(142,105,108,0.18)" strokeWidth="40" fill="none" />
                </svg>
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  {[50, 150, 250, 350].map((x, i) => (
                    <circle key={`a${x}`} className="shape-element" cx={x} cy="50" r="8" fill={["rgba(163,148,130,0.34)", "rgba(142,105,108,0.34)", "rgba(186,189,185,0.3)", "rgba(163,148,130,0.34)"][i]} />
                  ))}
                  {[100, 200, 300].map((x, i) => (
                    <circle key={`b${x}`} className="shape-element" cx={x} cy="150" r="12" fill={["rgba(142,105,108,0.28)", "rgba(186,189,185,0.24)", "rgba(163,148,130,0.28)"][i]} />
                  ))}
                  {[50, 150, 250, 350].map((x, i) => (
                    <circle key={`c${x}`} className="shape-element" cx={x} cy="250" r="10" fill={["rgba(186,189,185,0.3)", "rgba(163,148,130,0.32)", "rgba(142,105,108,0.32)", "rgba(186,189,185,0.3)"][i]} />
                  ))}
                  {[100, 200, 300].map((x, i) => (
                    <circle key={`d${x}`} className="shape-element" cx={x} cy="350" r="6" fill={["rgba(163,148,130,0.34)", "rgba(142,105,108,0.34)", "rgba(186,189,185,0.3)"][i]} />
                  ))}
                </svg>
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(163,148,130,0.14)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(142,105,108,0.14)" />
                </svg>
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(163,148,130,0.16)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(142,105,108,0.14)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(186,189,185,0.12)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {links.map((l, i) => {
                  const inside = (
                    <>
                      <p className="nav-link-text">{l.label}</p>
                      <div className="nav-link-hover-bg" />
                    </>
                  );
                  return (
                    <li className="menu-list-item" data-shape={(i % 5) + 1} key={l.label}>
                      {renderLink ? (
                        renderLink(l, inside, close)
                      ) : (
                        <a href={l.href} className="nav-link w-inline-block" onClick={close}>
                          {inside}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
