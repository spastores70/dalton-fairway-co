import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, "dist");
const excluded = new Set([".git", "dist", "node_modules", "video-parts", "build.mjs", "package.json", "vercel.json"]);

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of readdirSync(root)) {
  if (!excluded.has(entry)) {
    cpSync(join(root, entry), join(output, entry), { recursive: true });
  }
}

const partsDir = join(root, "video-parts");
const parts = readdirSync(partsDir).filter((name) => name.endsWith(".part")).sort();
const video = Buffer.concat(parts.map((name) => readFileSync(join(partsDir, name))));
const videoPath = join(output, "assets", "golf-hero.mp4");

if (!existsSync(join(output, "assets"))) mkdirSync(join(output, "assets"), { recursive: true });
writeFileSync(videoPath, video);

if (video.length !== 7472930) {
  throw new Error(`Unexpected reconstructed video size: ${video.length}`);
}

console.log(`Built ${videoPath} (${video.length} bytes from ${parts.length} parts)`);
