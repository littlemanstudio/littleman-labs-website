"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";

/* 1:1 port of the live site's pinned build-process clip: a sticky 9:16
   frame (same corner-tick vitrine device as PhotoFrame/hero-specimen)
   that plays/pauses via IntersectionObserver as it scrolls through view,
   not scroll-scrubbed despite the section's legacy "code-scroll" name, a
   talking clip can't be scrubbed frame-by-frame the way an image sequence
   can. Autoplay only works muted, so a round button lets whoever wants
   sound turn it on. */
export function CodeScroll() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative" style={{ height: "180vh" }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="relative overflow-hidden border"
          style={{
            width: "min(400px, 82vw, 39.375vh)",
            aspectRatio: "9/16",
            borderColor: "var(--line-strong)",
          }}
        >
          <span
            aria-hidden
            className="absolute left-[-1px] top-[-1px] z-10 h-4 w-4 border-t border-l"
            style={{ borderColor: "var(--bronze-bright)" }}
          />
          <span
            aria-hidden
            className="absolute bottom-[-1px] right-[-1px] z-10 h-4 w-4 border-b border-r"
            style={{ borderColor: "var(--bronze-bright)" }}
          />

          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ background: "var(--graphite-deep)" }}
            src="/video/build-process.mp4"
            poster="/img/build-process-poster.jpg"
            aria-label="Un proyecto de Littleman Labs, explicado de principio a fin"
            muted={muted}
            loop
            playsInline
            preload="metadata"
          />

          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? t("home.codeScroll.unmute") : t("home.codeScroll.mute")}
            title={muted ? t("home.codeScroll.unmute") : t("home.codeScroll.mute")}
            className="absolute right-3.5 top-3.5 z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full border text-bone transition-colors hover:border-bronze-bright"
            style={{ background: "rgba(18,17,16,0.55)", borderColor: "rgba(241,237,228,0.3)" }}
          >
            {muted ? (
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="10 4 5 8 2 8 2 14 5 14 10 18 10 4" />
                <line x1="21" y1="8" x2="15" y2="14" />
                <line x1="15" y1="8" x2="21" y2="14" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="10 4 5 8 2 8 2 14 5 14 10 18 10 4" />
                <path d="M14.5 6.5a7 7 0 0 1 0 9.9" />
                <path d="M17.5 3.5a11.5 11.5 0 0 1 0 15" />
              </svg>
            )}
          </button>

          <div
            className="absolute inset-x-0 bottom-0 z-[1] px-4 pb-3.5 pt-5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-bone-faint"
            style={{ background: "linear-gradient(to top, rgba(18,17,16,0.82), rgba(18,17,16,0))" }}
          >
            {t("home.codeScroll.caption")}
          </div>
        </div>
      </div>
    </section>
  );
}
