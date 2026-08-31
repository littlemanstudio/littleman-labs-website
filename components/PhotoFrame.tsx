import Image from "next/image";

/* 1:1 port of the live site's .photo-frame: a hairline border + two bronze
   corner ticks (top-left, bottom-right), like a museum vitrine label. This
   is the site's one recurring UI signature for anything photographic,
   used instead of a generic rounded-card treatment. */
export function PhotoFrame({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden border ${aspect} ${className}`}
      style={{ borderColor: "var(--line-strong)" }}
    >
      <span
        aria-hidden
        className="absolute left-[-1px] top-[-1px] z-10 h-3.5 w-3.5 border-t border-l"
        style={{ borderColor: "var(--bronze-bright)" }}
      />
      <span
        aria-hidden
        className="absolute bottom-[-1px] right-[-1px] z-10 h-3.5 w-3.5 border-b border-r"
        style={{ borderColor: "var(--bronze-bright)" }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ filter: "saturate(0.9) contrast(1.05)" }}
      />
    </figure>
  );
}
