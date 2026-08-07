// Quick download script for Umaid Bhawan batch
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ARTICLE = "01-umaid-bhawan-palace-jodhpur";
const BASE = path.join("public", "images", "experiences", ARTICLE);

const IMAGES = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/40/Stefan_Norblin_-_Lord_Shiva_%281944%29.jpg",
    file: "04-norblin-murals.webp",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Umaid_Bhawan_Palace-Exterior.jpg",
    file: "05-arrival.webp",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/53/Indoor_swimming_pool_at_Umaid_Bhawan_Palace%2C_Jodhpur.jpg",
    file: "06-pool.webp",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Umaid_Bhavan_Palace_in_Golden_Hour.jpg",
    file: "09-sunset-terrace.webp",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Aerial_View_Umaid_Mahal_Jodhpur.jpg",
    file: "10-aerial-sunset.webp",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Umaid_Bhawan_Palace_%282427877817%29.jpg",
    file: "03-durbar-hall.webp",
  },
];

function dl(url, dest, retries = 5) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    const req = client.get(
      url,
      { headers: { "User-Agent": "RoyalsGallery/1.0 (https://theroyalgallerys.com; educational image collection)", "Accept": "image/*" } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          try { fs.unlinkSync(dest); } catch {}
          return resolve(dl(res.headers.location, dest, retries));
        }
        if (res.statusCode === 429 && retries > 0) {
          file.close();
          try { fs.unlinkSync(dest); } catch {}
          const wait = (6 - retries) * 4000 + 2000; // 6s, 10s, 14s, 18s, 22s
          console.log(`    Rate limited, retrying in ${wait/1000}s...`);
          return resolve(sleep(wait).then(() => dl(url, dest, retries - 1)));
        }
        if (res.statusCode !== 200) {
          file.close();
          try { fs.unlinkSync(dest); } catch {}
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        res.pipe(file);
        file.on("finish", () => resolve());
        file.on("error", reject);
      }
    );
    req.on("error", (err) => {
      try { fs.unlinkSync(dest); } catch {}
      if (retries > 0) {
        const wait = (6 - retries) * 4000 + 2000;
        console.log(`    Error, retrying in ${wait/1000}s...`);
        resolve(sleep(wait).then(() => dl(url, dest, retries - 1)));
      } else {
        reject(err);
      }
    });
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  for (const img of IMAGES) {
    const tmpFile = path.join(BASE, img.file.replace(".webp", ".tmp"));
    const destFile = path.join(BASE, img.file);

    console.log(`↓ ${img.file}`);
    try {
      await dl(img.url, tmpFile);
      await sleep(500);
      const buffer = fs.readFileSync(tmpFile);
      const meta = await sharp(buffer).metadata();
      await sharp(buffer)
        .resize(meta.width > 2000 ? 2000 : meta.width, undefined, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(destFile);
      const st = fs.statSync(destFile);
      console.log(`  ✓ ${img.file} (${(st.size / 1024).toFixed(1)} KB, ${meta.width}×${meta.height})`);
      fs.unlinkSync(tmpFile);
      // Save original
      const origDir = path.join(BASE, "originals");
      if (!fs.existsSync(origDir)) fs.mkdirSync(origDir, { recursive: true });
      fs.writeFileSync(path.join(origDir, img.file.replace(".webp", ".jpg")), buffer);
    } catch (err) {
      console.error(`  ✗ ${img.file}: ${err.message}`);
    }
    await sleep(4000);
  }
  console.log("Done!");
}

main().catch((e) => { console.error(e); process.exit(1); });
