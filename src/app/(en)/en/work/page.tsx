import { WorkBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("work", "en");
export default function Page() {
  return <WorkBody lang="en" />;
}
