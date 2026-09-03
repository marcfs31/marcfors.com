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

  const foldHead = (container: HTMLElement, id: string) =>
    container.querySelector(`[data-fold="${id}"] .fold-head`) as HTMLButtonElement;

  it("renders every fold, with only the intro open", () => {
    const { container } = renderDesk();
    const ids = ["intro", "work", "projects", "contact", "skills", "signal", "edu", "more"];
    for (const id of ids) {
      expect(foldHead(container, id), id).toBeTruthy();
    }
    expect(foldHead(container, "intro")).toHaveAttribute("aria-expanded", "true");
    expect(foldHead(container, "work")).toHaveAttribute("aria-expanded", "false");
    expect(foldHead(container, "projects")).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a fold when its header is clicked, closing the previous one", async () => {
    const { container } = renderDesk();
    await userEvent.click(foldHead(container, "projects"));
    expect(foldHead(container, "projects")).toHaveAttribute("aria-expanded", "true");
    expect(foldHead(container, "intro")).toHaveAttribute("aria-expanded", "false");
  });

  it("never shows a source link for a private project", async () => {
    const { container } = renderDesk();
    await userEvent.click(foldHead(container, "projects"));

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

  it("has no axe violations", async () => {
    const { container } = renderDesk();
    expect(await axe(container)).toHaveNoViolations();
  });
});
