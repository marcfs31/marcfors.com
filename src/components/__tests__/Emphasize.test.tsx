import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Emphasize } from "@/components/Emphasize";

describe("Emphasize", () => {
  it("wraps only the matching phrases in <strong class='hit'>", () => {
    const { container } = render(
      <Emphasize text="Strong in React and TypeScript every day" phrases={["React", "TypeScript"]} />,
    );
    const hits = [...container.querySelectorAll("strong.hit")].map((el) => el.textContent);
    expect(hits).toEqual(["React", "TypeScript"]);
    expect(container.textContent).toBe("Strong in React and TypeScript every day");
  });

  it("renders plain text when nothing matches", () => {
    const { container } = render(<Emphasize text="nothing here" phrases={["React"]} />);
    expect(container.querySelector("strong.hit")).toBeNull();
    expect(container.textContent).toBe("nothing here");
  });

  it("prefers the longest phrase when phrases overlap", () => {
    const { container } = render(
      <Emphasize text="I use React and TypeScript here" phrases={["React", "React and TypeScript"]} />,
    );
    const hits = [...container.querySelectorAll("strong.hit")].map((el) => el.textContent);
    expect(hits).toEqual(["React and TypeScript"]);
  });
});
