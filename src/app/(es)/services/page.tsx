import { ServicesBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("services", "es");
export default function Page() {
  return <ServicesBody lang="es" />;
}
