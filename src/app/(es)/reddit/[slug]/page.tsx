import { notFound } from "next/navigation";
import { GuideBody } from "@/components/GuidePages";
import { guideMeta, guideSlugs } from "@/lib/guide-seo";
import { getGuide } from "@/lib/guides";

export const dynamicParams = false;
export const generateStaticParams = guideSlugs;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return guideMeta(slug, "es");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!getGuide(slug)) notFound();
  return <GuideBody lang="es" slug={slug} />;
}
