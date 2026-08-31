import type { Metadata } from "next";

const TITLE = "Política de Privacidad: Littleman Labs, Ponce PR";
const DESCRIPTION = "Cómo Littleman Labs recopila, usa, y protege tu información, incluyendo llamadas y mensajes de texto.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
