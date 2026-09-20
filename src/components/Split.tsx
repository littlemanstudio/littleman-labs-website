import { Fragment } from "react";

type Word = { w: string; accent: boolean; tail: string };

/* Splits a headline into masked words. `*word*` becomes the gold italic accent.
   Punctuation right after an accent word stays attached to it. */
export function Split({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  const words: Word[] = [];
  for (const p of parts) {
    const accent = p.startsWith("*");
    const clean = accent ? p.slice(1, -1) : p;
    const tokens = clean.split(/\s+/).filter(Boolean);
    tokens.forEach((tok, i) => {
      const glued = i === 0 && !accent && !/^\s/.test(clean) && words.length > 0;
      if (glued) words[words.length - 1].tail += tok;
      else words.push({ w: tok, accent, tail: "" });
    });
  }
  return (
    <>
      {words.map((x, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span className="wi">
              {x.accent ? <em>{x.w}</em> : x.w}
              {x.tail}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export const plain = (text: string) => text.replace(/\*/g, "");
