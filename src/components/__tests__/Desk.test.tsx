import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Desk } from "@/components/Desk";
import { copy } from "@/data/copy";
import { featured } from "@/data/projects";
import { getAuditSnapshot } from "@/lib/audit";

vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: vi.fn() }) }));
vi.mock("web-vitals", () => ({
  onLCP: vi.fn(),
  onINP: vi.fn(),
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onTTFB: vi.fn(),
}));

const audit = getAuditSnapshot();
const renderDesk = (locale: "en" | "it" = "en") =>
  render(<Desk repos={[]} audit={audit} initialLocale={locale} />);

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ ok: true, audit }) }));
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("Desk", () => {
  it("leads with the name and role", () => {
    renderDesk();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Marc Fors");
    expect(screen.getByText(copy.en.headline)).toBeInTheDocument();
  });

  it("renders every section, all visible on load — no accordion", () => {
    const { container } = renderDesk();
    for (const id of ["intro", "projects", "work", "skills", "contact", "signal", "edu"]) {
      const section = container.querySelector(`#${id}`);
      expect(section, id).toBeTruthy();
      expect(section, id).toBeVisible();
    }
    // The section headings are plain h2s, not expand/collapse buttons.
    expect(container.querySelector(".fold-head")).toBeNull();
    expect(container.querySelector("[aria-expanded]")).toBeNull();
    for (const label of [copy.en.projectsTitle, copy.en.workTitle, copy.en.contactTitle]) {
      expect(screen.getByRole("heading", { level: 2, name: label })).toBeInTheDocument();
    }
  });

  it("keeps only the archive collapsed, and it opens on click", async () => {
    const { container } = renderDesk();
    const archive = container.querySelector("details#more") as HTMLDetailsElement;
    expect(archive).toBeTruthy();
    expect(archive.open).toBe(false);
    await userEvent.click(within(archive).getByText(copy.en.atticTitle));
    expect(archive.open).toBe(true);
  });

  it("never shows a source link for a private project", () => {
    renderDesk();
    const privateProject = featured.find((p) => p.private && !p.repo);
    expect(privateProject).toBeTruthy();
    const heading = screen.getByRole("heading", { name: privateProject!.name });
    const card = heading.closest(".card") as HTMLElement;
    expect(within(card).getByText(copy.en.private)).toBeInTheDocument();
    expect(within(card).queryByRole("link", { name: copy.en.source })).toBeNull();
  });

  it("emphasises every proof-line token, including the Italian 'Barcellona'", () => {
    const { container } = renderDesk("it");
    const proof = container.querySelector(".proof-line") as HTMLElement;
    const tokens = copy.it.proofLine.split(" · ");
    const bolded = [...proof.querySelectorAll("strong.hit")].map((el) => el.textContent);
    expect(bolded).toEqual(tokens);
    expect(bolded).toContain("Barcellona");
  });

  it(
    "has no axe violations",
    async () => {
      const { container } = renderDesk();
      expect(await axe(container)).toHaveNoViolations();
    },
    15000, // a full-desk axe scan under coverage instrumentation can outrun the 5s default
  );
});
