import { AboutBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("about", "en");
export default function Page() {
  return <AboutBody lang="en" />;
}
