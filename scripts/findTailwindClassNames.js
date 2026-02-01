import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_PREFIXES = ["slate-", "gray-"];
const EXCLUDE_DIRS = new Set([
  "node_modules",
  "dist",
  ".git",
  "build",
  ".next",
  ".cache",
]);

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseArgs(argv) {
  const cfg = {
    dir: process.cwd(),
    prefixes: [...DEFAULT_PREFIXES],
    json: false,
    ext: "ts",
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dir" && argv[i + 1]) {
      cfg.dir = path.resolve(argv[++i]);
    } else if (arg.startsWith("--dir=")) {
      cfg.dir = path.resolve(arg.slice("--dir=".length));
    } else if (arg === "--prefix" && argv[i + 1]) {
      cfg.prefixes.push(argv[++i]);
    } else if (arg.startsWith("--prefix=")) {
      cfg.prefixes.push(arg.slice("--prefix=".length));
    } else if (arg.startsWith("--prefixes=")) {
      const list = arg
        .slice("--prefixes=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      cfg.prefixes.push(...list);
    } else if (arg === "--json") {
      cfg.json = true;
    } else if (arg === "--ext" && argv[i + 1]) {
      cfg.ext = argv[++i];
    } else if (arg.startsWith("--ext=")) {
      cfg.ext = arg.slice("--ext=".length);
    }
  }

  // Deduplicate prefixes and keep only truthy entries
  cfg.prefixes = Array.from(new Set(cfg.prefixes.filter(Boolean)));

  return cfg;
}

async function walkDir(dir, outFiles, ext) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      await walkDir(full, outFiles, ext);
    } else if (entry.isFile() && full.endsWith(`.${ext}`)) {
      outFiles.push(full);
    }
  }
}

async function scanFile(filePath, regex) {
  const results = [];
  let content;
  try {
    content = await fs.readFile(filePath, "utf8");
  } catch {
    return results;
  }
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const matches = Array.from(line.matchAll(regex)).map((m) => m[0]);
    if (matches.length > 0) {
      results.push({
        line: i + 1,
        matches,
        snippet: line.trim(),
      });
    }
  }
  return results;
}

async function main() {
  const cfg = parseArgs(process.argv);
  const files = [];
  await walkDir(cfg.dir, files, cfg.ext);

  if (cfg.prefixes.length === 0) {
    console.error(
      "No prefixes specified. Use --prefix slate- --prefix gray- or --prefixes=slate-,gray-",
    );
    process.exit(1);
  }

  const pattern = cfg.prefixes.map(escapeRegExp).join("|");
  const regex = new RegExp(pattern, "g");

  const allResults = [];
  for (const file of files) {
    const fileResults = await scanFile(file, regex);
    if (fileResults.length > 0) {
      allResults.push({
        file: path.relative(cfg.dir, file),
        occurrences: fileResults,
      });
    }
  }

  if (cfg.json) {
    console.log(
      JSON.stringify(
        { dir: cfg.dir, prefixes: cfg.prefixes, results: allResults },
        null,
        2,
      ),
    );
    return;
  }

  const totalMatches = allResults.reduce(
    (sum, f) => sum + f.occurrences.reduce((s, o) => s + o.matches.length, 0),
    0,
  );

  console.log(`Scanning: ${cfg.dir}`);
  console.log(`Extensions: .${cfg.ext}`);
  console.log(`Prefixes: ${cfg.prefixes.join(", ")}`);
  console.log(
    `Found ${totalMatches} match(es) across ${allResults.length} file(s).\n`,
  );

  for (const f of allResults) {
    console.log(`${f.file}:`);
    for (const occ of f.occurrences) {
      const uniqueMatches = Array.from(new Set(occ.matches));
      console.log(
        `  L${occ.line}: ${uniqueMatches.join(", ")}  |  ${occ.snippet}`,
      );
    }
    console.log("");
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});

// RUN LIKE THIS:
// node scripts/findTailwindClassNames.js --dir ./src --prefixes=slate-,gray-
