import { GuideHubBody } from "@/components/GuidePages";
import { guideHubMeta } from "@/lib/guide-seo";

export const metadata = guideHubMeta("es");
export default function Page() {
  return <GuideHubBody lang="es" />;
}
