import { ContactBody } from "@/components/PageBodies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("contact", "en");
export default function Page() {
  return <ContactBody lang="en" />;
}
