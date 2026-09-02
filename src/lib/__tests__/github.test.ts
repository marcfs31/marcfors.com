import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchPublicRepos, isListedRepo, type GhRepo } from "@/lib/github";
import { skipRepos } from "@/data/projects";
import { GITHUB_USER } from "@/lib/site";

function repo(overrides: Partial<GhRepo> = {}): GhRepo {
  return {
    name: "some-lib",
    html_url: "https://github.com/x/some-lib",
    description: "a thing",
    language: "TypeScript",
    stargazers_count: 0,
    homepage: null,
    pushed_at: "2026-01-01T00:00:00Z",
    fork: false,
    ...overrides,
  };
}

afterEach(() => vi.unstubAllGlobals());

describe("isListedRepo", () => {
  it("keeps a non-fork repo that has a description or a language", () => {
    expect(isListedRepo(repo())).toBe(true);
    expect(isListedRepo(repo({ description: null }))).toBe(true); // still has language
  });

  it("drops forks, skip-listed names, and empty shells", () => {
    expect(isListedRepo(repo({ fork: true }))).toBe(false);
    const skipped = [...skipRepos][0];
    expect(skipped, "skip list is populated").toBeTruthy();
    expect(isListedRepo(repo({ name: skipped }))).toBe(false);
    expect(isListedRepo(repo({ description: null, language: null }))).toBe(false);
  });
});

describe("fetchPublicRepos", () => {
  it("requests the configured user's repos and returns the filtered list", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [repo({ name: "keep-me" }), repo({ name: "a-fork", fork: true })],
    });
    vi.stubGlobal("fetch", fetchMock);

    const rows = await fetchPublicRepos();
    expect(rows.map((r) => r.name)).toEqual(["keep-me"]);
    expect(String(fetchMock.mock.calls[0][0])).toContain(`/users/${GITHUB_USER}/repos`);
  });

  it("returns an empty list on a non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 403, json: async () => ({}) }));
    expect(await fetchPublicRepos()).toEqual([]);
  });

  it("returns an empty list when the request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    expect(await fetchPublicRepos()).toEqual([]);
  });
});
