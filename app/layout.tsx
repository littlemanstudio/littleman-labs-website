import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { RoomTransitionProvider } from "@/components/RoomTransition";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const TITLE = "Littleman Labs: Diseño Web, CRM y Automatización, Ponce PR";
const DESCRIPTION =
  "Littleman Labs es un estudio de diseño web, CRM y automatización en Ponce, Puerto Rico. Sitios bilingües, un solo sistema para toda la isla. Llamada gratis.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.littlemanlabs.com"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#17140f",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Littleman Labs",
  url: "https://www.littlemanlabs.com",
  logo: "https://www.littlemanlabs.com/brand/littleman-labs-logo.png",
  image: "https://www.littlemanlabs.com/brand/og-image.jpg",
  telephone: "+1-787-901-9020",
  email: "info@littlemanlabs.com",
  description:
    "Estudio de diseño web, CRM y automatización en Ponce, Puerto Rico. Sitios web bilingües, gestión de leads y anuncios en Meta, construidos como un solo sistema para negocios en toda la isla.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ponce",
    addressRegion: "PR",
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Puerto Rico" },
  founder: { "@type": "Person", name: "Allan Gianni Rosario Bobet" },
  sameAs: [
    "https://www.instagram.com/littlemanlabs",
    "https://www.tiktok.com/@littlemanlabs",
    "https://www.facebook.com/Littlemanlabs",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Diseño Web",
        description: "Sitios web bilingües a la medida para negocios en Puerto Rico.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "CRM y Gestión de Leads",
        description: "Buzón de leads unificado, texto automático a llamadas perdidas, y reportes mensuales.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Anuncios en Meta",
        description: "Anuncios pagados gestionados semanalmente con landing pages dedicadas.",
      },
    },
  ],
  knowsLanguage: ["es", "en"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${jakarta.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1085932210756511');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1085932210756511&ev=PageView&noscript=1"
          />
        </noscript>

        <LangProvider>
          <RoomTransitionProvider>
            <AmbientBackground />
            <div className="relative z-10">
              <Navbar />
              <main>{children}</main>
              <Footer />
              <WhatsAppFab />
            </div>
          </RoomTransitionProvider>
        </LangProvider>
      </body>
    </html>
  );
}
