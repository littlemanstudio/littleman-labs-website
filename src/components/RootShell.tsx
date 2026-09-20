import Shell from "./Shell";
import { fontClasses } from "@/lib/fonts";
import type { LangCode } from "@/lib/site";

/* One real <html lang> per language: the Spanish and English sections are separate root layouts. */
export default function RootShell({ lang, children }: { lang: LangCode; children: React.ReactNode }) {
  return (
    <html lang={lang} className={fontClasses}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
