import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import http from "node:http";
import sharp from "sharp";

const RETIRED_DIR = path.join(process.cwd(), "public", "images", "_retired");
if (!fs.existsSync(RETIRED_DIR)) {
  fs.mkdirSync(RETIRED_DIR, { recursive: true });
}

/**
 * Downloads a file with redirect and User-Agent support
 */
export function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === "https:" ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          "User-Agent": "TheRoyalGallerys/1.0 (https://theroyalgallerys.com; image pipeline)",
          Accept: "image/*",
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(downloadFile(res.headers.location, destPath));
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
        }
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on("finish", () => {
          file.close(() => resolve(destPath));
        });
        file.on("error", (err) => {
          fs.unlink(destPath, () => reject(err));
        });
      }
    );
    req.on("error", reject);
  });
}

/**
 * Retires an old image by moving it to /public/images/_retired/
 */
export function retireImage(relPath) {
  const clean = relPath.startsWith("/") ? relPath.slice(1) : relPath;
  const src = path.join(process.cwd(), "public", clean);
  if (!fs.existsSync(src)) {
    console.warn(`[retire] File does not exist to retire: ${src}`);
    return false;
  }
  const baseName = path.basename(src);
  const dest = path.join(RETIRED_DIR, baseName);
  fs.copyFileSync(src, dest);
  console.log(`[retire] Archived ${clean} -> public/images/_retired/${baseName}`);
  return true;
}

/**
 * Processes an image using sharp:
 * - ensures sRGB
 * - resizes within maxWidth/maxHeight (no upscaling)
 * - saves optimized jpg and webp
 */
export async function processImage(inputPath, outputPath, options = {}) {
  const {
    maxWidth = 3200,
    maxHeight = 2400,
    quality = 88,
    formats = ["jpg", "webp"],
  } = options;

  const instance = sharp(inputPath).rotate(); // auto-orient
  const meta = await instance.metadata();

  const resizeOpts = {
    withoutEnlargement: true,
    fit: "inside",
  };

  if (meta.width && (meta.width > maxWidth || (meta.height && meta.height > maxHeight))) {
    resizeOpts.width = maxWidth;
    resizeOpts.height = maxHeight;
  }

  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const baseWithoutExt = outputPath.replace(/\.[^.]+$/, "");
  const outputs = [];

  for (const fmt of formats) {
    let pipeline = sharp(inputPath).rotate().toColorspace("srgb");
    if (resizeOpts.width || resizeOpts.height) {
      pipeline = pipeline.resize(resizeOpts);
    }

    if (fmt === "jpg" || fmt === "jpeg") {
      const dest = `${baseWithoutExt}.jpg`;
      await pipeline.jpeg({ quality, mozjpeg: true }).toFile(dest);
      outputs.push(dest);
    } else if (fmt === "webp") {
      const dest = `${baseWithoutExt}.webp`;
      await pipeline.webp({ quality: Math.min(quality + 2, 92), effort: 6 }).toFile(dest);
      outputs.push(dest);
    } else if (fmt === "avif") {
      const dest = `${baseWithoutExt}.avif`;
      await pipeline.avif({ quality: Math.min(quality - 5, 82), effort: 5 }).toFile(dest);
      outputs.push(dest);
    }
  }

  console.log(`[processed] ${path.basename(inputPath)} -> ${outputs.map(p => path.basename(p)).join(", ")}`);
  return outputs;
}
