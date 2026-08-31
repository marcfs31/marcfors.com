import { describe, expect, it } from "vitest";
import { copy } from "@/data/copy";
import { mailTo } from "@/lib/mail";
import { DEV_EMAIL } from "@/lib/site";

describe("mailTo", () => {
  it("opens the developer mailbox with an encoded subject", () => {
    const href = mailTo(copy.en.hireSubject);
    expect(href.startsWith(`mailto:${DEV_EMAIL}?subject=`)).toBe(true);
    expect(href).toContain(encodeURIComponent(copy.en.hireSubject));
    expect(href).not.toContain(" ");
  });

  it("encodes Spanish custom-app subjects", () => {
    const href = mailTo(copy.es.buildSubject);
    expect(href).toContain(encodeURIComponent("App a medida"));
  });
});
