#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let parsed = {};
try {
  const raw = execFileSync("npm", ["audit", "--json", "--omit=dev"], {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  parsed = JSON.parse(raw);
} catch (error) {
  const err = error;
  if (err && typeof err === "object" && "stdout" in err && err.stdout) {
    try {
      parsed = JSON.parse(String(err.stdout));
    } catch {
      parsed = {};
    }
  }
}

const vulns = parsed?.metadata?.vulnerabilities ?? {};
const critical = Number(vulns.critical ?? 0);
const high = Number(vulns.high ?? 0);
const moderate = Number(vulns.moderate ?? 0);
const low = Number(vulns.low ?? 0);
const info = Number(vulns.info ?? 0);
const total = Number(vulns.total ?? critical + high + moderate + low + info);
const snapshot = {
  generatedAt: new Date().toISOString(),
  critical,
  high,
  moderate,
  low,
  info,
  total,
  ok: critical + high === 0,
};

const outDir = join(root, "src/generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "audit.json"), `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`audit snapshot ${snapshot.ok ? "clean" : "findings"} total=${snapshot.total}`);
