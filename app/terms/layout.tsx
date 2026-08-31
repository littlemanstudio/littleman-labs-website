import type { Metadata } from "next";

const TITLE = "Términos y Condiciones: Littleman Labs, Ponce PR";
const DESCRIPTION =
  "Las condiciones que rigen trabajar con Littleman Labs: precios, cancelación, alcance de proyecto, y propiedad intelectual.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
