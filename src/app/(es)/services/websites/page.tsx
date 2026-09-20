import { WebsitesBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("websites", "es");
export default function Page() {
  return <WebsitesBody lang="es" />;
}
