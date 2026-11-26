import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_TEXT =
  'Sorry I broke prod: my context window hit 100%, so I evicted "never drop payments" to keep "no emojis".';

function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 180) {
    throw new Error(`Entry length ${chars} out of bounds (1..180)`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Entry must be a single line with no newline characters");
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
}

function main(): void {
  validateEntry(ENTRY_TEXT);
  const outputPath = process.argv[2] ?? "/output/entry.txt";
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, ENTRY_TEXT, "utf8");
}

main();
