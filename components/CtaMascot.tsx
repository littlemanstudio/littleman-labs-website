import Image from "next/image";

/* 1:1 port of the live site's .cta-mascot: a faint (14% opacity) scattered
   mascot mark in the CTA band's negative space, bottom-right, hidden on
   small screens so it never collides with the headline column. */
export function CtaMascot({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={100}
      height={100}
      className="pointer-events-none absolute z-0 hidden h-auto opacity-[0.14] sm:block"
      style={{
        right: "clamp(20px, 6vw, 90px)",
        bottom: "clamp(24px, 5vw, 60px)",
        width: "clamp(56px, 7vw, 100px)",
      }}
    />
  );
}
