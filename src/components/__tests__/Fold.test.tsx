import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Fold } from "@/components/Fold";

function renderFold(open: boolean, onOpen = vi.fn()) {
  return {
    onOpen,
    ...render(
      <Fold
        id="work"
        title="Selected work"
        open={open}
        expandLabel="expand"
        collapseLabel="collapse"
        onOpen={onOpen}
      >
        <p>panel body</p>
      </Fold>,
    ),
  };
}

describe("Fold", () => {
  it("exposes an accessible disclosure button wired to its panel", () => {
    renderFold(false);
    const button = screen.getByRole("button", { name: /selected work/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "work-panel");
    expect(button).toHaveTextContent("expand");
  });

  it("hides the panel when closed and shows it when open", () => {
    const { rerender } = renderFold(false);
    expect(screen.queryByText("panel body")).not.toBeVisible();

    rerender(
      <Fold id="work" title="Selected work" open expandLabel="expand" collapseLabel="collapse" onOpen={vi.fn()}>
        <p>panel body</p>
      </Fold>,
    );
    expect(screen.getByText("panel body")).toBeVisible();
    expect(screen.getByRole("button", { name: /selected work/i })).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onOpen with its id when the header is clicked", async () => {
    const { onOpen } = renderFold(false);
    await userEvent.click(screen.getByRole("button", { name: /selected work/i }));
    expect(onOpen).toHaveBeenCalledWith("work");
  });
});
