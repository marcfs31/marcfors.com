/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars */
import type { AxeMatchers } from "vitest-axe";

// Declaration merging to teach `expect(...)` about the axe matcher registered in
// src/test/setup.ts. The empty interfaces are the intended merge shape.
declare module "vitest" {
  interface Assertion<T = unknown> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
