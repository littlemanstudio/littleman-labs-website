import type { Metadata } from "next";

const TITLE = "Contacta a Littleman Labs: Llamada Gratis, Ponce PR";
const DESCRIPTION =
  "Contacta a Littleman Labs en Ponce, Puerto Rico por teléfono, WhatsApp, correo electrónico, o el formulario. Una llamada gratis de 20 minutos, sin presión.";

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué pasa después de enviar el formulario?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Leemos cada consulta y te contestamos enseguida, usualmente con algunas preguntas y un horario para la llamada gratis de 20 minutos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Solo trabajan con negocios en Ponce?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ponce y Peñuelas son nuestra base, pero el estudio construye sitios web y sistemas de CRM bilingües para negocios en cualquier parte de Puerto Rico.",
      },
    },
    {
      "@type": "Question",
      name: "¿Atienden en inglés también?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El estudio es bilingüe desde el primer día: hablamos español e inglés en la llamada, el sitio, y el soporte.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué pasa si ya tengo un sitio web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Podemos evaluarlo en la llamada gratis y decirte honestamente si conviene reconstruirlo o solo añadir CRM y automatización al que ya tienes.",
      },
    },
    {
      "@type": "Question",
      name: '¿Qué tan rápido es "en línea en 3–7 días laborales"?',
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eso es típico para un sitio de 3-5 páginas una vez tengamos tu contenido y fotos. La configuración de CRM y automatización corre en paralelo, no después del lanzamiento.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué pasa después del lanzamiento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No hay mensualidad obligatoria: el sitio es tuyo para siempre en cuanto lo entregamos. La mayoría de los clientes añaden CRM y gestión de leads después, para que cada llamada, formulario y mensaje llegue a un solo buzón sin que se pierda nada. Esa parte es un servicio mensual.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      {children}
    </>
  );
}
