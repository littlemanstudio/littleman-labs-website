import { AdsBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("ads", "en");
export default function Page() {
  return <AdsBody lang="en" />;
}
