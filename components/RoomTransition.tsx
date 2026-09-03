"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { clipSequence, zoneForPath, hasZone, type Zone } from "@/lib/rooms";

type NavigateFn = (href: string) => void;

const RoomTransitionContext = createContext<{ navigate: NavigateFn; zone: Zone }>({
  navigate: (href) => {
    window.location.href = href;
  },
  zone: "entry",
});

export function useRoomNavigate() {
  return useContext(RoomTransitionContext).navigate;
}

/** Current zone, kept in sync with the destination the instant a
    navigation starts (not when it finishes), so the ambient background
    already shows the right room before the cover even lifts, the same
    "precover" precision the live site gets from its sessionStorage handoff,
    just automatic here since the DOM never actually unmounts. */
export function useCurrentZone() {
  return useContext(RoomTransitionContext).zone;
}

/* Client-side version of js/room-transition.js: instead of covering a real
   page reload, this covers a soft Next.js navigation. The destination page
   is already mounted underneath (App Router swaps it near-instantly), the
   clip(s) just get to play out on top before the cover lifts, so the "walk
   through the building" effect survives without the site ever doing a full
   reload. Same 8 source clips, same RING adjacency/2-hop logic as the live
   site, only the delivery mechanism changed. */
export function RoomTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentZoneRef = useRef<Zone>(zoneForPath(pathname));
  const [zone, setZone] = useState<Zone>(zoneForPath(pathname));
  const [queue, setQueue] = useState<string[]>([]);
  const [covering, setCovering] = useState(false);
  const [fadeOnly, setFadeOnly] = useState(false);
  const reducedMotionRef = useRef(false);

  // Two persistent <video> elements that never remount: while slot A plays,
  // slot B preloads the next clip in the background, so swapping between
  // clips in a multi-hop sequence is a crossfade between two already-primed
  // frames instead of a fresh element buffering from nothing (the old
  // key={currentClip} approach, which showed the cover's bg color through
  // for a beat every time React tore down and rebuilt the video node).
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const clipIndexRef = useRef(0);
  const queueRef = useRef<string[]>([]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const navigate = useCallback<NavigateFn>(
    (href) => {
      const toZone = zoneForPath(href);
      const fromZone = currentZoneRef.current;

      if (reducedMotionRef.current) {
        currentZoneRef.current = toZone;
        setZone(toZone);
        router.push(href);
        return;
      }

      if (!hasZone(href) || toZone === fromZone) {
        setFadeOnly(true);
        setQueue([]);
        setCovering(true);
        currentZoneRef.current = toZone;
        setZone(toZone);
        router.push(href);
        window.setTimeout(() => setCovering(false), 420);
        return;
      }

      const clips = clipSequence(fromZone, toZone);
      currentZoneRef.current = toZone;
      setZone(toZone);
      setFadeOnly(false);
      setQueue(clips);
      setCovering(true);
      // Swap the underlying route while it's covered, so it's ready the
      // instant the cover lifts.
      router.push(href);
    },
    [router]
  );

  // Prime slot 0 with the sequence's first clip and, if there's a second
  // hop, start slot 1 buffering it in the background so it's already
  // decoded and ready the moment slot 0 finishes — the swap below just
  // crossfades between two live videos instead of waiting on a fresh one.
  useEffect(() => {
    if (fadeOnly || queue.length === 0) return;
    clipIndexRef.current = 0;
    queueRef.current = queue;
    setActiveSlot(0);

    const a = videoRefs[0].current;
    const b = videoRefs[1].current;
    if (a) {
      a.src = `/video/${queue[0]}.mp4`;
      a.currentTime = 0;
      a.load();
      a.play().catch(() => {});
    }
    if (b) {
      if (queue[1]) {
        b.src = `/video/${queue[1]}.mp4`;
        b.currentTime = 0;
        b.load();
      } else {
        b.removeAttribute("src");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, fadeOnly]);

  const handleSlotEnded = useCallback((slot: 0 | 1) => {
    const q = queueRef.current;
    if (clipIndexRef.current >= q.length - 1) {
      setCovering(false);
      return;
    }
    clipIndexRef.current += 1;
    const nextSlot: 0 | 1 = slot === 0 ? 1 : 0;
    const nextVideo = videoRefs[nextSlot].current;
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }
    setActiveSlot(nextSlot);
  }, []);

  return (
    <RoomTransitionContext.Provider value={{ navigate, zone }}>
      {children}
      <AnimatePresence>
        {covering && (fadeOnly || queue.length > 0) && (
          <motion.div
            key="room-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[var(--graphite-deep)]"
          >
            {!fadeOnly && queue.length > 0 && (
              <>
                <video
                  ref={videoRefs[0]}
                  className={
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-150 " +
                    (activeSlot === 0 ? "opacity-100" : "opacity-0")
                  }
                  muted
                  playsInline
                  onEnded={() => handleSlotEnded(0)}
                  onError={() => handleSlotEnded(0)}
                />
                <video
                  ref={videoRefs[1]}
                  className={
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-150 " +
                    (activeSlot === 1 ? "opacity-100" : "opacity-0")
                  }
                  muted
                  playsInline
                  onEnded={() => handleSlotEnded(1)}
                  onError={() => handleSlotEnded(1)}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </RoomTransitionContext.Provider>
  );
}
