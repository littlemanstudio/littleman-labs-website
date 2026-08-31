"use client";

import { useEffect, useRef } from "react";
import { useCurrentZone } from "@/components/RoomTransition";

const ZONE_IMAGE: Record<string, string> = {
  entry: "/lab/entry.jpg",
  workshop: "/lab/workshop.jpg",
  studio: "/lab/studio.jpg",
  comms: "/lab/comms.jpg",
};

/* 1:1 port of the live site's .bg-field/.bg-scene + js/lab-background.js:
   one continuous room per zone, fixed behind all page content (not scoped
   to the hero), pointer-parallax + slow idle drift for a 3D-ish depth cue,
   a centered vignette keeps the text column legible without flattening the
   image to near-invisible opacity. Swapping `zone` (from RoomTransition's
   context) is what makes the background already match the destination
   before the room-transition cover even lifts. */
export function AmbientBackground() {
  const zone = useCurrentZone();
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let t = 0;
    let last = performance.now();
    function tick(now: number) {
      const dt = Math.min(now - last, 50);
      last = now;
      t += dt;

      curX += (targetX - curX) * 0.03;
      curY += (targetY - curY) * 0.03;
      const driftX = Math.sin(t * 0.00012) * 1.2;
      const driftY = Math.cos(t * 0.00009) * 0.8;

      const x = curX * -14 + driftX;
      const y = curY * -10 + driftY;
      if (scene) scene.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.06)`;

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-graphite">
      <div
        ref={sceneRef}
        className="absolute inset-0 bg-cover bg-center opacity-[0.88]"
        style={{
          backgroundImage: `url(${ZONE_IMAGE[zone] ?? ZONE_IMAGE.entry})`,
          transform: "scale(1.06)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 52% at 50% 46%, rgba(28,26,23,0.58) 0%, rgba(28,26,23,0.32) 50%, rgba(28,26,23,0) 100%)",
        }}
      />
    </div>
  );
}
