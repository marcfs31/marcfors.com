#!/usr/bin/env node
// Regenerates src/app/styles/tokens.css from the palette source of truth
// (src/lib/themePalettes.ts). Runs at prebuild; tokens.test.ts fails the suite
// if the committed file drifts from what this would write.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = pathToFileURL(join(root, "src/lib/themePalettes.ts"));
const { tokensCssFile } = await import(source.href);

const out = join(root, "src/app/styles/tokens.css");
writeFileSync(out, tokensCssFile());
console.log("tokens.css regenerated from themePalettes.ts");
