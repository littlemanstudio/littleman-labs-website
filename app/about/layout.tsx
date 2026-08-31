import type { Metadata } from "next";

const TITLE = "Sobre Littleman Labs: Estudio Web en Ponce, Puerto Rico";
const DESCRIPTION =
  "Littleman Labs es un estudio de diseño web, CRM y automatización en Ponce, Puerto Rico, fundado por Allan Gianni Rosario Bobet. Un sistema, no tres proveedores.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
