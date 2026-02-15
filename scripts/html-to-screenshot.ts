#!/usr/bin/env bun

import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const DEFAULT_WIDTH = 1440;
const DEFAULT_HEIGHT = 900;

type CliOptions = {
  inputHtml: string;
  outputImage: string;
  width: number;
  height: number;
  quality: number;
};

const DEFAULT_JPEG_QUALITY = 90;

function printUsage(): void {
  console.log(
    [
      "Usage:",
      "  bun run screenshot:html -- <input.html> [output.(png|jpg|jpeg)] [--width <px>] [--height <px>] [--quality <1-100>]",
      "",
      "Examples:",
      "  bun run screenshot:html -- ./example.html",
      "  bun run screenshot:html -- ./example.html ./screenshots/example.png --width 1280 --height 800",
      "  bun run screenshot:html -- ./preview.html ./prompts/material-you/screenshot.jpg --quality 88",
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

function parseQuality(flagName: string, value?: string): number {
  const parsed = parseDimension(flagName, value);
  if (parsed > 100) {
    throw new Error(`Invalid value for ${flagName}: ${value}. Use a value from 1 to 100.`);
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
  let quality = DEFAULT_JPEG_QUALITY;

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

    if (arg === "--quality") {
      quality = parseQuality("--quality", argv[i + 1]);
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

  const outputImage = positional[1] ?? "";

  return { inputHtml, outputImage, width, height, quality };
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
  const { inputHtml, outputImage, width, height, quality } = parseArgs(
    process.argv.slice(2),
  );
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
  const outputPath = path.resolve(repoRoot, outputImage || defaultOutput);
  const extension = path.extname(outputPath).toLowerCase();
  let type: "png" | "jpeg";
  if (extension === ".png") {
    type = "png";
  } else if (extension === ".jpg" || extension === ".jpeg") {
    type = "jpeg";
  } else {
    throw new Error(
      `Unsupported output extension: ${extension || "(none)"}. Use .png, .jpg, or .jpeg.`,
    );
  }

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

    if (type === "jpeg") {
      await page.screenshot({
        path: outputPath,
        fullPage: true,
        type,
        quality,
      });
    } else {
      await page.screenshot({
        path: outputPath,
        fullPage: true,
        type,
      });
    }

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
