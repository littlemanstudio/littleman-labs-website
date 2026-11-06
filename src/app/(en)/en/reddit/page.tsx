import { GuideHubBody } from "@/components/GuidePages";
import { guideHubMeta } from "@/lib/guide-seo";

export const metadata = guideHubMeta("en");
export default function Page() {
  return <GuideHubBody lang="en" />;
}
