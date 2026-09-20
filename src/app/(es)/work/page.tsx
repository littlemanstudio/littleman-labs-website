import { WorkBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("work", "es");
export default function Page() {
  return <WorkBody lang="es" />;
}
