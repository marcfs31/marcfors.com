import { skipRepos } from "@/data/projects";
import { GITHUB_USER } from "@/lib/site";

export type GhRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  homepage: string | null;
  pushed_at: string;
  fork: boolean;
};

export function isListedRepo(repo: GhRepo): boolean {
  return !repo.fork && !skipRepos.has(repo.name) && Boolean(repo.description || repo.language);
}

export async function fetchPublicRepos(): Promise<GhRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } },
    );
    if (!response.ok) return [];
    const rows = (await response.json()) as GhRepo[];
    return rows.filter(isListedRepo);
  } catch {
    return [];
  }
}
