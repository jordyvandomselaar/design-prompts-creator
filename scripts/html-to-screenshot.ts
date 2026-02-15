#!/usr/bin/env bun

import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const DEFAULT_WIDTH = 1440;
const DEFAULT_HEIGHT = 900;

type CliOptions = {
  inputHtml: string;
  outputPng: string;
  width: number;
  height: number;
};

function printUsage(): void {
  console.log(
    [
      "Usage:",
      "  bun run screenshot:html -- <input.html> [output.png] [--width <px>] [--height <px>]",
      "",
      "Examples:",
      "  bun run screenshot:html -- ./example.html",
      "  bun run screenshot:html -- ./example.html ./screenshots/example.png --width 1280 --height 800",
    ].join("\n"),
  );
}

function parseDimension(flagName: string, value?: string): number {
  if (!value) {
    throw new Error(`Missing value for ${flagName}`);
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid value for ${flagName}: ${value}`);
  }

  return parsed;
}

function parseArgs(argv: string[]): CliOptions {
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    printUsage();
    process.exit(0);
  }

  const positional: string[] = [];
  let width = DEFAULT_WIDTH;
  let height = DEFAULT_HEIGHT;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg) {
      continue;
    }

    if (arg === "--width") {
      width = parseDimension("--width", argv[i + 1]);
      i += 1;
      continue;
    }

    if (arg === "--height") {
      height = parseDimension("--height", argv[i + 1]);
      i += 1;
      continue;
    }

    if (arg.startsWith("--")) {
      throw new Error(`Unknown flag: ${arg}`);
    }

    positional.push(arg);
  }

  if (positional.length === 0) {
    throw new Error("Missing input HTML file path.");
  }

  const inputHtml = positional[0];
  if (!inputHtml) {
    throw new Error("Missing input HTML file path.");
  }

  const outputPng = positional[1] ?? "";

  return { inputHtml, outputPng, width, height };
}

function assertInsideRepo(repoRoot: string, targetPath: string): void {
  const relative = path.relative(repoRoot, targetPath);
  const isOutside = relative.startsWith("..") || path.isAbsolute(relative);
  if (isOutside) {
    throw new Error(
      `Output path must be inside this repository. Received: ${targetPath}`,
    );
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  const { inputHtml, outputPng, width, height } = parseArgs(process.argv.slice(2));
  const repoRoot = process.cwd();

  const inputPath = path.resolve(repoRoot, inputHtml);
  const inputExists = await fileExists(inputPath);
  if (!inputExists) {
    throw new Error(`Input HTML file not found: ${inputPath}`);
  }

  const defaultOutput = path.join(
    "screenshots",
    `${path.basename(inputPath, path.extname(inputPath))}.png`,
  );
  const outputPath = path.resolve(repoRoot, outputPng || defaultOutput);
  assertInsideRepo(repoRoot, outputPath);
  await mkdir(path.dirname(outputPath), { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto(pathToFileURL(inputPath).href, { waitUntil: "networkidle0" });

    await page.evaluate(
      // Keep this as a string to avoid requiring DOM typings in this Bun project.
      "document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()",
    );

    await page.screenshot({
      path: outputPath,
      fullPage: true,
      type: "png",
    });

    const printableOutput = path.relative(repoRoot, outputPath) || outputPath;
    console.log(`Saved screenshot: ${printableOutput}`);
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to render screenshot: ${message}`);
  process.exit(1);
});
