import { TermsBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("terms", "en");
export default function Page() {
  return <TermsBody lang="en" />;
}
