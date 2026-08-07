// Fast batch download: article_key → [{url, filename}]
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const BASE = "public/images/experiences";

// Map: article directory → [{url, filename}]
const BATCH = {
  "14-ahilya-fort-maheshwar": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Ahilya_fort_%2C_Maheshwar.jpg", file: "01-hero.webp" },
  ],
  "15-falaknuma-palace-hyderabad": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Falaknuma_Palace_01.jpg", file: "01-hero.webp" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Twilight_Indian_Palace_%2849525748402%29.jpg", file: "09-blue-hour.webp" },
  ],
  "17-gajner-palace-bikaner": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Gajner_Palace_-_panoramio.jpg", file: "01-hero.webp" },
  ],
  "16-lalgarh-palace-bikaner": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Lalgarh_palace_in_Bikaner_during_sunset.jpg", file: "01-hero.webp" },
  ],
  "19-neemrana-fort-palace": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/1/17/Neemrana_Fort_Palace.jpg", file: "01-hero.webp" },
  ],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function dl(url, dest, retries = 5) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, {
      headers: { "User-Agent": "RoyalsGallery/1.0", "Accept": "image/*" },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        return resolve(dl(res.headers.location, dest, retries));
      }
      if (res.statusCode === 429 && retries > 0) {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        const wait = (6 - retries) * 3000;
        return resolve(sleep(wait).then(() => dl(url, dest, retries - 1)));
      }
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        return reject(new Error("HTTP " + res.statusCode));
      }
      res.pipe(file);
      file.on("finish", () => resolve());
      file.on("error", reject);
    }).on("error", reject);
  });
}

async function main() {
  let total = 0;
  for (const [articleDir, images] of Object.entries(BATCH)) {
    console.log("\n" + articleDir);
    const dir = path.join(BASE, articleDir);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    for (const img of images) {
      const tmpFile = path.join(dir, img.file.replace(".webp", ".tmp"));
      const destFile = path.join(dir, img.file);
      if (fs.existsSync(destFile)) {
        console.log("  ✓ " + img.file + " (already exists)");
        continue;
      }
      console.log("  ↓ " + img.file);
      try {
        await dl(img.url, tmpFile);
        await sleep(1000);
        const buffer = fs.readFileSync(tmpFile);
        const meta = await sharp(buffer).metadata();
        await sharp(buffer)
          .resize(meta.width > 2000 ? 2000 : meta.width, undefined, { withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(destFile);
        const st = fs.statSync(destFile);
        console.log("  ✓ " + img.file + " (" + (st.size / 1024).toFixed(0) + "KB, " + meta.width + "x" + meta.height + ")");
        try { fs.unlinkSync(tmpFile); } catch {}
        total++;
      } catch (err) {
        console.error("  ✗ " + img.file + ": " + err.message);
        try { fs.unlinkSync(tmpFile); } catch {}
      }
      await sleep(2000);
    }
  }
  console.log("\n✅ Downloaded " + total + " images");
}

main().catch((e) => { console.error(e); process.exit(1); });
