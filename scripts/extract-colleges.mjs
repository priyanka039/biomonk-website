// One-off extractor: pulls the COLLEGES array out of the original
// neet-predictor.html reference file and emits a typed TS module.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const candidates = [
  resolve(root, "..", "neet-predictor.html.bak"),
  resolve(root, "neet-predictor.html"),
];

let html = "";
let used = "";
for (const c of candidates) {
  try {
    html = readFileSync(c, "utf8");
    used = c;
    break;
  } catch {
    /* try next */
  }
}
if (!html) {
  console.error("Could not find reference HTML in:", candidates);
  process.exit(1);
}

const start = html.indexOf("const COLLEGES = [");
if (start === -1) {
  console.error("COLLEGES array not found");
  process.exit(1);
}
const arrStart = html.indexOf("[", start);
// find matching closing bracket
let depth = 0;
let end = -1;
for (let i = arrStart; i < html.length; i++) {
  const ch = html[i];
  if (ch === "[") depth++;
  else if (ch === "]") {
    depth--;
    if (depth === 0) {
      end = i;
      break;
    }
  }
}
const arrayLiteral = html.slice(arrStart, end + 1);

const out = `// AUTO-GENERATED from the original neet-predictor.html reference.
// 2023-2024 MCC/state counselling closing-rank data (indicative, not a guarantee).

export type Category = "UR" | "OBC" | "SC" | "ST" | "EWS" | "PH";

export interface College {
  name: string;
  state: string;
  type: "AIIMS" | "Central" | "Government" | "Deemed" | "Private";
  quota: string;
  seats: number;
  fees: string;
  cutoff: Record<Category, number>;
}

export const COLLEGES: College[] = ${arrayLiteral};
`;

mkdirSync(resolve(root, "lib", "data"), { recursive: true });
const outPath = resolve(root, "lib", "data", "colleges.ts");
writeFileSync(outPath, out, "utf8");
console.log(
  `Extracted ${(arrayLiteral.match(/\{\s*name:/g) || []).length} colleges from ${used} -> ${outPath}`
);
