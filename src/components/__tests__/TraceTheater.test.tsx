import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TraceTheater, type TraceStrings } from "@/components/TraceTheater";
import { copy } from "@/data/copy";

const t = copy.en;
const strings: TraceStrings = {
  traceTitle: t.traceTitle,
  traceLede: t.traceLede,
  tracePaste: t.tracePaste,
  traceSample: t.traceSample,
  traceClear: t.traceClear,
  traceInvalid: t.traceInvalid,
  traceEmpty: t.traceEmpty,
  traceSpans: t.traceSpans,
  traceDuration: t.traceDuration,
};

async function paste(text: string) {
  const box = screen.getByLabelText(t.tracePaste);
  await userEvent.click(box);
  await userEvent.paste(text);
  return box;
}

describe("TraceTheater", () => {
  it("loads the sample and renders one row per span with a total", async () => {
    render(<TraceTheater strings={strings} />);
    await userEvent.click(screen.getByRole("button", { name: t.traceSample }));

    expect(screen.getByText(`${t.traceSpans}: 4`)).toBeInTheDocument();
    expect(screen.getByText(`${t.traceDuration}: 154 ms`)).toBeInTheDocument();
    expect(screen.getByText("github.repos")).toBeInTheDocument();
    expect(screen.getByText("vitals.report").closest(".span-row")).toHaveClass("error");
  });

  it("flags invalid JSON and clears back to empty", async () => {
    render(<TraceTheater strings={strings} />);
    await paste("not json");
    expect(screen.getByText(t.traceInvalid)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: t.traceClear }));
    expect(screen.queryByText(t.traceInvalid)).not.toBeInTheDocument();
  });

  it("shows the empty-state note for well-formed JSON with no spans", async () => {
    render(<TraceTheater strings={strings} />);
    await paste('{"spans": []}');
    expect(screen.getByText(t.traceEmpty)).toBeInTheDocument();
  });
});
