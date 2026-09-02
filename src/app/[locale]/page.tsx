import { notFound } from "next/navigation";
import { Desk } from "@/components/Desk";
import { getAuditSnapshot } from "@/lib/audit";
import { fetchPublicRepos } from "@/lib/github";
import { isLocale } from "@/lib/locale";

export const revalidate = 3600;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const repos = await fetchPublicRepos();
  return <Desk repos={repos} audit={getAuditSnapshot()} initialLocale={locale} />;
}
