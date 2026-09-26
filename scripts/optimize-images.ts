import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
// Masters live outside public/ so a deploy does not ship the multi-megabyte PNGs.
const SOURCE_DIR = path.join(ROOT, "assets", "work");
const OUTPUT_DIR = path.join(ROOT, "public", "images", "projects");

const WIDTH = 1600;
const HEIGHT = 1000; // 16:10

type SourceImage = {
  file: string;
  outputName: string;
  /**
   * "contain" pads portrait/square screenshots onto a transparent 16:10
   * canvas so nothing gets cropped. "cover" crops landscape screenshots
   * that are already close to 16:10.
   */
  fit: "contain" | "cover";
};

const images: SourceImage[] = [
  { file: "gaming-global.png", outputName: "gaming-global.webp", fit: "contain" },
  { file: "woody-shop.png", outputName: "woody-shop.webp", fit: "contain" },
  { file: "chat-application.png", outputName: "real-time-chat.webp", fit: "cover" },
  { file: "payment-portal.png", outputName: "memorial-planning.webp", fit: "contain" },
  { file: "smart-living-portal.png", outputName: "smart-living.webp", fit: "cover" },
];

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const image of images) {
    const inputPath = path.join(SOURCE_DIR, image.file);
    const outputPath = path.join(OUTPUT_DIR, image.outputName);

    const pipeline = sharp(inputPath).resize(WIDTH, HEIGHT, {
      fit: image.fit,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      position: image.fit === "cover" ? "top" : undefined,
    });

    await pipeline.webp({ quality: 76, effort: 6 }).toFile(outputPath);
    console.log(`Wrote ${path.relative(ROOT, outputPath)}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
