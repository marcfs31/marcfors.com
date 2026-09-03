import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrintDesk } from "@/components/PrintDesk";
import { PrintButton } from "@/components/PrintButton";
import { copy } from "@/data/copy";
import { contact, experience, skills } from "@/data/copy";

describe("PrintDesk", () => {
  it("renders the CV from the same copy source, every job and skill group", () => {
    render(<PrintDesk locale="en" />);
    expect(screen.getByRole("heading", { level: 1, name: "Marc Fors" })).toBeInTheDocument();
    expect(screen.getByText(contact.email, { exact: false })).toBeInTheDocument();

    for (const job of experience.en) {
      expect(screen.getByText(new RegExp(job.org))).toBeInTheDocument();
    }
    for (const group of Object.keys(skills) as Array<keyof typeof skills>) {
      expect(screen.getByText(`${copy.en.skillGroups[group]}:`)).toBeInTheDocument();
    }
  });

  it("localizes headings", () => {
    render(<PrintDesk locale="de" />);
    expect(screen.getByRole("heading", { name: copy.de.skillsTitle })).toBeInTheDocument();
  });
});

describe("PrintButton", () => {
  it("calls window.print when pressed", async () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<PrintButton label="Print / Save PDF" />);
    await userEvent.click(screen.getByRole("button", { name: "Print / Save PDF" }));
    expect(print).toHaveBeenCalledOnce();
  });
});
