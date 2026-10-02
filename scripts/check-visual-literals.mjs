#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src");
const allowed = new Set([
  path.join(src, "styles", "tokens.css"),
  path.join(src, "styles", "fonts.css"),
]);

const banned = [
  /#[0-9a-fA-F]{3,8}\b/,
  /\bGeorgia\b/,
  /\bFraunces\b/,
  /Source Serif/,
  /\bGeist\b/,
  /\b[0-9]+(?:\.[0-9]+)?(?:px|rem)\b/,
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
      continue;
    }
    if (/\.(astro|css|ts|js)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const hits = [];
for (const file of await walk(src)) {
  if (allowed.has(file)) continue;
  const text = await readFile(file, "utf8");
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const pattern of banned) {
      if (pattern.test(line)) {
        hits.push(`${path.relative(root, file)}:${i + 1}: ${line.trim()}`);
        break;
      }
    }
  });
}

if (hits.length > 0) {
  console.error("Visual literals must live in src/styles/tokens.css or src/styles/fonts.css.");
  for (const hit of hits) console.error(hit);
  process.exit(1);
}

console.log("check-visual-literals: ok");
