import { HomeBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "en");
export default function Page() {
  return <HomeBody lang="en" />;
}
