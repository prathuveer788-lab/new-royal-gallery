// ── Image Download & Optimize Pipeline ─────────────────
// Downloads images from source URLs, converts to WebP,
// and saves to the correct local path.
//
// Usage: node scripts/download-image.js <url> <output-path>
//        node scripts/download-image.js --batch <manifest-key>

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function download(url, retries = 3) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client.get(url, {
      headers: {
        "User-Agent": "RoyalsGallery/1.0 (https://theroyalgallerys.com; educational/research image collection)",
        "Accept": "image/webp,image/*,*/*",
      },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, retries));
      }
      if (res.statusCode === 429 && retries > 0) {
        const wait = (4 - retries) * 3000; // exponential backoff: 3s, 6s, 9s
        console.log(`    Rate limited, retrying in ${wait / 1000}s...`);
        return resolve(sleep(wait).then(() => download(url, retries - 1)));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", (err) => {
      if (retries > 0) {
        const wait = (4 - retries) * 3000;
        console.log(`    Connection error, retrying in ${wait / 1000}s...`);
        resolve(sleep(wait).then(() => download(url, retries - 1)));
      } else {
        reject(err);
      }
    });
  });
}

async function optimizeAndSave(buffer, outputRelPath, opts = {}) {
  const fullPath = path.join(PUBLIC_DIR, outputRelPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let image = sharp(buffer);
  const metadata = await image.metadata();

  // Determine target width based on orientation
  const targetWidth = opts.width || (outputRelPath.includes("hero") ? 2400 : 2000);

  // Resize if source is larger
  if (metadata.width > targetWidth) {
    image = image.resize(targetWidth, undefined, { withoutEnlargement: true });
  }

  // Convert to WebP with quality
  await image.webp({ quality: 85 }).toFile(fullPath);

  const stats = fs.statSync(fullPath);
  console.log(`  ✓ Saved: ${outputRelPath} (${(stats.size / 1024).toFixed(1)} KB, ${metadata.width}×${metadata.height})`);
  return { path: outputRelPath, width: metadata.width, height: metadata.height, sizeKB: (stats.size / 1024).toFixed(1) };
}

// ── Main ──────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);

  if (args[0] === "--batch") {
    const manifestKey = args[1];
    const manifest = require("../image-manifest.json");
    const article = manifest.articles[manifestKey];
    if (!article) { console.error("Article not found:", manifestKey); process.exit(1); }

    console.log(`\n📥 Processing: ${manifestKey} (${article.title})`);
    const results = [];

    for (const img of article.images) {
      if (!img.originalUrl || img.usageStatus !== "LIVE_VIA_URL") {
        console.log(`  ⚠ ${img.filename} — no downloadable URL (${img.usageStatus || "NONE"})`);
        continue;
      }

      console.log(`  ↓ Downloading: ${img.filename}`);
      try {
        await sleep(1500); // polite delay between downloads
        const buffer = await download(img.originalUrl);
        const relPath = `/images/experiences/${manifestKey}/${img.filename}`;
        const result = await optimizeAndSave(buffer, relPath);
        results.push({ ...result, filename: img.filename });
        // Also save original
        const origDir = path.join(PUBLIC_DIR, `images/experiences/${manifestKey}/originals`);
        if (!fs.existsSync(origDir)) fs.mkdirSync(origDir, { recursive: true });
        const ext = path.extname(new URL(img.originalUrl).pathname) || ".jpg";
        fs.writeFileSync(path.join(origDir, img.filename.replace(".webp", ext)), buffer);
      } catch (err) {
        console.error(`  ✗ FAILED: ${img.filename} — ${err.message}`);
      }
    }

    console.log(`\n✅ Done: ${results.length} images downloaded for ${manifestKey}\n`);
    return;
  }

  // Single image mode
  if (args.length < 2) {
    console.log("Usage: node scripts/download-image.js <url> <output-rel-path>");
    console.log("       node scripts/download-image.js --batch <manifest-key>");
    process.exit(1);
  }

  const [url, outputPath] = args;
  console.log(`Downloading: ${url}`);
  const buffer = await download(url);
  await optimizeAndSave(buffer, outputPath);
  console.log("Done.");
}

main().catch((err) => { console.error(err); process.exit(1); });
