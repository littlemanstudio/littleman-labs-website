import { ContactBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("contact", "es");
export default function Page() {
  return <ContactBody lang="es" />;
}
