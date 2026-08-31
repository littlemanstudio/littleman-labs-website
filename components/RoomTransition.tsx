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
  const [clipIndex, setClipIndex] = useState(0);
  const [covering, setCovering] = useState(false);
  const [fadeOnly, setFadeOnly] = useState(false);
  const reducedMotionRef = useRef(false);

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
      setClipIndex(0);
      setCovering(true);
      // Swap the underlying route while it's covered, so it's ready the
      // instant the cover lifts.
      router.push(href);
    },
    [router]
  );

  const handleClipEnded = () => {
    if (clipIndex < queue.length - 1) {
      setClipIndex((i) => i + 1);
    } else {
      setCovering(false);
    }
  };

  const currentClip = queue[clipIndex];

  return (
    <RoomTransitionContext.Provider value={{ navigate, zone }}>
      {children}
      <AnimatePresence>
        {covering && (fadeOnly || currentClip) && (
          <motion.div
            key="room-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--graphite-deep)]"
          >
            {!fadeOnly && currentClip && (
              <video
                key={currentClip}
                className="h-full w-full object-cover"
                src={`/video/${currentClip}.mp4`}
                autoPlay
                muted
                playsInline
                onEnded={handleClipEnded}
                onError={handleClipEnded}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </RoomTransitionContext.Provider>
  );
}
