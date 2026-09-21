import { preload } from "react-dom";
import Shell from "./Shell";
import { fontClasses } from "@/lib/fonts";
import type { LangCode } from "@/lib/site";

/* One real <html lang> per language: the Spanish and English sections are separate root layouts. */
export default function RootShell({ lang, children }: { lang: LangCode; children: React.ReactNode }) {
  /* Start downloading the statue's model and photo with the HTML, before any script runs. */
  preload("/models/crystal.glb", { as: "fetch", crossOrigin: "anonymous" });
  preload("/models/crystal-front.webp", { as: "image" });
  return (
    <html lang={lang} className={fontClasses}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
