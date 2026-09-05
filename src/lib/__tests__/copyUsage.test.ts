import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { copy } from "@/data/copy";

/**
 * Every `UiCopy` key should be read by something under app/components/lib —
 * otherwise it's dead weight that still gets hand-translated into six
 * languages on every content change (this is exactly how `aboutTitle` /
 * `notFoundTitle` / `notFoundBody` / `errorTitle` / `errorBody` / `retryCta`
 * went stale: the v0.10.0 server/client split made `error.tsx`, `not-found.tsx`
 * and `global-error.tsx` static and English-only, and nothing else ever read
 * them).
 *
 * The check is a plain text scan for `.keyName`, so it can't tell a real
 * `t.role` read from an unrelated `.role` on some other object — a short,
 * common key name (`now`, `live`, `lang`, `theme`, `role`…) could in
 * principle hide behind that ambiguity. It still catches what matters: a key
 * whose distinctive name appears nowhere as a property access has nothing
 * reading it, full stop.
 */
function readSourceUnder(dir: string): string {
  let text = "";
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__tests__") continue;
      text += readSourceUnder(full);
    } else if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.(ts|tsx)$/.test(entry.name)) {
      text += fs.readFileSync(full, "utf8");
    }
  }
  return text;
}

describe("UiCopy keys stay live", () => {
  it("has no key that nothing in app/components/lib reads", () => {
    const root = path.resolve(__dirname, "../../..");
    const source = ["src/app", "src/components", "src/lib"]
      .map((dir) => readSourceUnder(path.join(root, dir)))
      .join("\n");

    const keys = Object.keys(copy.en);
    const dead = keys.filter((key) => !new RegExp(`\\.${key}\\b`).test(source));
    expect(dead).toEqual([]);
  });
});
