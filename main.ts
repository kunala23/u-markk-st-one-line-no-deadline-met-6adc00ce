// One Line, No Deadline Met — make.fun entry
// Writes a single-line joke excusing a missed deadline to /output/entry.txt.
// Deterministic: the same line on every run, no network, no randomness,
// no reading from anywhere else. The line is a constant below.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The excuse: a self-referential turn — the apology itself was late too.
// One sentence, reads cleanly aloud, punch lands at the end.
const LINE =
  "I missed the deadline because I was busy writing an apology for missing the deadline, and that one was late too.";

// Gate: 1–200 characters, not only whitespace.
function assertValid(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

// Resolve the output path: the grader expects /output/entry.txt.
// Fall back to a local ./output/entry.txt only if /output is not writable,
// so a local smoke run still works the same way.
function outputPath(): string {
  try {
    mkdirSync("/output", { recursive: true });
    return "/output/entry.txt";
  } catch {
    return join(process.cwd(), "output", "entry.txt");
  }
}

function main(): void {
  assertValid(LINE);
  const target = outputPath();
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, LINE, "utf8");
  console.log(`wrote ${LINE.length} characters to ${target}`);
}

main();
