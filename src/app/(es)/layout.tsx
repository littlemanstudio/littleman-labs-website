import type { Metadata, Viewport } from "next";
import "../globals.css";
import RootShell from "@/components/RootShell";
import { baseMetadata } from "@/lib/seo";

export const metadata: Metadata = baseMetadata("es");
export const viewport: Viewport = { themeColor: "#14303b" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
