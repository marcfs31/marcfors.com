import { cookies } from "next/headers";
import { Desk } from "@/components/Desk";
import { getAuditSnapshot } from "@/lib/audit";
import { fetchPublicRepos } from "@/lib/github";
import { DEFAULT_LOCALE, isLocale, LOCALE_KEY } from "@/lib/locale";

export const revalidate = 3600;

export default async function Home() {
  const repos = await fetchPublicRepos();
  const stored = (await cookies()).get(LOCALE_KEY)?.value;
  const initialLocale = isLocale(stored) ? stored : DEFAULT_LOCALE;
  return <Desk repos={repos} audit={getAuditSnapshot()} initialLocale={initialLocale} />;
}
