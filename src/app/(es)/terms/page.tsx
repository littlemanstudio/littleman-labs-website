import { TermsBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("terms", "es");
export default function Page() {
  return <TermsBody lang="es" />;
}
