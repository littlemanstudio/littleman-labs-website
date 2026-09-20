import { PrivacyBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("privacy", "en");
export default function Page() {
  return <PrivacyBody lang="en" />;
}
