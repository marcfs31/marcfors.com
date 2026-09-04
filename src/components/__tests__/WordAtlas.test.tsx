import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import { WordAtlas } from "@/components/WordAtlas";
import { ATLAS_COPY, WORDKEEP_GRAPH_URL, WORDKEEP_URL } from "@/data/wordAtlas";

beforeEach(() => {
  // jsdom has no ResizeObserver; the effect wires one up.
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("WordAtlas", () => {
  it("renders a labelled canvas figure with the census and full legend", () => {
    render(<WordAtlas locale="en" />);
    const fig = screen.getByRole("figure");
    expect(within(fig).getByRole("img", { name: /wordkeep atlas/i })).toBeInTheDocument();
    expect(within(fig).getByText("56 words · 90 links · 4 languages")).toBeInTheDocument();
    for (const label of ["synonym", "antonym", "translation", "related"]) {
      expect(within(fig).getByText(label)).toBeInTheDocument();
    }
    for (const code of ["EN", "ES", "FR", "DE"]) {
      expect(within(fig).getByText(code)).toBeInTheDocument();
    }
  });

  it("links out to the live graph and the app, safely", () => {
    render(<WordAtlas locale="es" />);
    const graph = screen.getByRole("link", { name: ATLAS_COPY.es.open });
    const app = screen.getByRole("link", { name: ATLAS_COPY.es.visit });
    expect(graph).toHaveAttribute("href", WORDKEEP_GRAPH_URL);
    expect(app).toHaveAttribute("href", WORDKEEP_URL);
    for (const a of [graph, app]) {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("has no axe violations", async () => {
    const { container } = render(<WordAtlas locale="en" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
