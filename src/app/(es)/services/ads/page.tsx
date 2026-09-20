import { AdsBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("ads", "es");
export default function Page() {
  return <AdsBody lang="es" />;
}
