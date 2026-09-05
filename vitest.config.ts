import path from "node:path";
import { defineConfig } from "vitest/config";

const alias = { "@": path.resolve(__dirname, "src") };

export default defineConfig({
  resolve: { alias },
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.d.ts",
        "src/test/**",
        "src/generated/**",
        "src/app/**/opengraph-image.tsx",
        "src/app/**/twitter-image.tsx",
        "src/app/icon.svg",
      ],
      // functions still sits a little below the others: what's left of
      // WordAtlas.tsx after the sim was lifted into src/lib/atlasSim.ts (pure,
      // 100%-covered) is canvas draw + pointer/drag wiring that only does
      // anything against real layout geometry and a real 2D context — jsdom has
      // neither, so those closures are exercised by the Playwright e2e suite
      // (e2e/smoke.spec.ts, e2e/mobile.spec.ts) instead of here.
      thresholds: {
        lines: 75,
        functions: 73,
        branches: 80,
        statements: 75,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["src/**/*.test.ts"],
          exclude: ["src/**/*.dom.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "dom",
          environment: "jsdom",
          include: ["src/**/*.test.tsx", "src/**/*.dom.test.ts"],
          setupFiles: ["src/test/setup.ts"],
        },
      },
    ],
  },
});
