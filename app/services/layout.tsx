import type { Metadata } from "next";

const TITLE = "Diseño Web, CRM y Anuncios: Littleman Labs, Ponce PR";
const DESCRIPTION =
  "Diseño web bilingüe, CRM y gestión de leads, y anuncios en Meta para negocios en Ponce y toda Puerto Rico. En línea en 3–7 días laborales. Llamada gratis.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
