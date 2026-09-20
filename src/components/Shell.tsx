"use client";
import { LangProvider } from "./LangProvider";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <SmoothScroll />
      <Nav />
      {children}
      <Footer />
      <CookieConsent />
    </LangProvider>
  );
}
