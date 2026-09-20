import { AboutBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("about", "es");
export default function Page() {
  return <AboutBody lang="es" />;
}
