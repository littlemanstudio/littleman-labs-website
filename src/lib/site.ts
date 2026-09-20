export const SITE = {
  url: "https://www.littlemanlabs.com",
  name: "Littleman Labs",
  email: "info@littlemanlabs.com",
  phoneTel: "+17879019020", // direct calls (kept apart from WhatsApp on purpose)
  phoneLabel: "+1 (787) 901-9020",
  whatsapp: "https://wa.me/19392335269",
  instagram: "https://www.instagram.com/littlemanlabs",
  tiktok: "https://www.tiktok.com/@littlemanlabs",
  facebook: "https://www.facebook.com/Littlemanlabs",
  pixelId: "1085932210756511",
  /* Google Business Profile share link. Fill in after the profile is verified, and it flows into the schema. */
  gbp: "",
  formEndpoint: "https://formsubmit.co/ajax/info@littlemanlabs.com",
} as const;

/* Language lives in the URL: Spanish at /, English under /en. */
export type LangCode = "es" | "en";
export const isEnPath = (p: string) => p === "/en" || p.startsWith("/en/");
export const toEn = (p: string) => (p === "/" ? "/en" : `/en${p}`);
export const toEs = (p: string) => (p === "/en" ? "/" : p.replace(/^\/en(?=\/)/, "") || "/");
export const localize = (lang: LangCode, p: string) => (lang === "en" ? toEn(p) : p);
