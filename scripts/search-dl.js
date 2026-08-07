// ── Wikimedia Commons Image Search + Download ──────────
// Searches Wikimedia for each article's subject, downloads results,
// and fills in missing PHOTO markers with available images.
//
// Usage: node scripts/search-dl.js

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const BASE = "public/images/experiences";
const CONTENT = "lib/content";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── API helper ──────────────────────────────────────
function apiFetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { "User-Agent": "RoyalsGallery/1.0", "Accept": "application/json" },
    }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

// ── Search Wikimedia Commons for images ──────────────
async function searchImages(query, limit = 10) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=${limit}&format=json&origin=*`;
  const data = await apiFetch(url);
  const titles = (data.query?.search || []).map((r) => r.title.replace("File:", ""));
  return titles;
}

// ── Get image URLs from filenames ────────────────────
async function getImageUrls(filenames) {
  if (filenames.length === 0) return {};
  const titles = filenames.map((f) => "File:" + f).join("|");
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url|size|user&format=json&origin=*`;
  const data = await apiFetch(url);
  const result = {};
  for (const page of Object.values(data.query?.pages || {})) {
    if (page.imageinfo?.[0]) {
      result[page.title.replace("File:", "")] = {
        url: page.imageinfo[0].url,
        width: page.imageinfo[0].width,
        height: page.imageinfo[0].height,
        user: page.imageinfo[0].user,
      };
    }
  }
  return result;
}

// ── Download a single image ─────────────────────────
function dl(url, dest, retries = 8) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, {
      headers: { "User-Agent": "RoyalsGallery/1.0 (https://theroyalgallerys.com; educational)", "Accept": "image/*" },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        return resolve(dl(res.headers.location, dest, retries));
      }
      if (res.statusCode === 429 && retries > 0) {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        const wait = Math.min((9 - retries) * 8000 + 4000, 60000); // 4s→12s→20s→... up to 60s
        console.log(`    Rate limited (429), waiting ${wait/1000}s...`);
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
    }).on("error", (err) => {
      file.close();
      try { fs.unlinkSync(dest); } catch {}
      if (retries > 0) {
        const wait = Math.min((9 - retries) * 8000 + 4000, 60000);
        console.log(`    Connection error, waiting ${wait/1000}s...`);
        return resolve(sleep(wait).then(() => dl(url, dest, retries - 1)));
      }
      reject(err);
    });
  });
}

// ── Optimize and save as WebP ────────────────────────
async function saveWebP(buffer, articleDir, filename) {
  const dir = path.join(BASE, articleDir);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const destFile = path.join(dir, filename);
  const meta = await sharp(buffer).metadata();
  await sharp(buffer)
    .resize(meta.width > 2000 ? 2000 : meta.width, undefined, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(destFile);
  const st = fs.statSync(destFile);
  return { size: st.size, width: meta.width, height: meta.height };
}

// ── Article config: directory → { search queries, missing markers } ──
// Each article entry: { dir: "XX-name", queries: ["search1", "search2"], fillCount: N }
const ARTICLES = [
  // ── Palaces 10-20 ─────────────────────────────────
  { dir: "10-suryagarh-jaisalmer", queries: ["Suryagarh Jaisalmer", "Jaisalmer fort desert Rajasthan"], fillCount: 7 },
  { dir: "11-devi-garh-udaipur", queries: ["Devi Garh Udaipur palace", "Udaipur palace Rajasthan"], fillCount: 6 },
  { dir: "12-mihir-garh-jodhpur", queries: ["Mihir Garh Jodhpur", "Jodhpur Rajasthan palace"], fillCount: 4 },
  { dir: "13-rohet-garh-jodhpur", queries: ["Rohet Garh Jodhpur", "Rajasthan haveli palace Jodhpur"], fillCount: 4 },
  { dir: "14-ahilya-fort-maheshwar", queries: ["Ahilya Fort Maheshwar", "Maheshwar Narmada river ghat"], fillCount: 3 },
  { dir: "15-falaknuma-palace-hyderabad", queries: ["Falaknuma Palace Hyderabad interior", "Hyderabad Nizam palace dining"], fillCount: 7 },
  { dir: "16-lalgarh-palace-bikaner", queries: ["Lalgarh Palace Bikaner", "Bikaner Rajasthan palace"], fillCount: 5 },
  { dir: "17-gajner-palace-bikaner", queries: ["Gajner Palace Bikaner", "Bikaner lake palace Rajasthan"], fillCount: 3 },
  { dir: "18-noor-us-sabah-palace-bhopal", queries: ["Noor-us-Sabah Palace Bhopal", "Bhopal heritage palace"], fillCount: 3 },
  { dir: "19-neemrana-fort-palace", queries: ["Neemrana Fort Palace", "Rajasthan fort palace heritage"], fillCount: 3 },
  { dir: "20-bhanwar-vilas-palace-karauli", queries: ["Bhanwar Vilas Palace Karauli", "Karauli Rajasthan palace"], fillCount: 3 },
];

async function processArticle(config) {
  const { dir, queries, fillCount } = config;
  console.log(`\n=== ${dir} ===`);

  // Check what already exists
  const articlePath = path.join(BASE, dir);
  const existing = fs.existsSync(articlePath)
    ? fs.readdirSync(articlePath).filter((f) => f.endsWith(".webp"))
    : [];
  console.log(`  Existing: ${existing.length} images`);

  if (existing.length >= fillCount) {
    console.log(`  ✓ Already have enough images`);
    return { dir, downloaded: 0, total: existing.length };
  }

  // Search for images
  const allFilenames = new Set();
  for (const query of queries) {
    console.log(`  Search: "${query}"`);
    try {
      const results = await searchImages(query, 8);
      results.forEach((f) => allFilenames.add(f));
    } catch (e) {
      console.log(`    Error: ${e.message}`);
    }
    await sleep(3000);
  }

  console.log(`  Found ${allFilenames.size} unique images`);

  if (allFilenames.size === 0) {
    console.log(`  ⚠ No images found`);
    return { dir, downloaded: 0, total: existing.length };
  }

  // Get URLs
  const urls = await getImageUrls([...allFilenames].slice(0, 15));
  console.log(`  Resolved ${Object.keys(urls).length} URLs`);
  await sleep(1000);

  // Download and save
  let downloaded = 0;
  const existingSet = new Set(existing.map((f) => f.replace(".webp", "")));
  let counter = existing.length + 1;

  for (const [filename, info] of Object.entries(urls)) {
    if (downloaded + existing.length >= fillCount) break;
    // Skip .svg, .ogg, .pdf
    if (filename.match(/\.(svg|ogg|pdf|ogv|webm)$/i)) continue;

    const outName = `img-${String(counter).padStart(2, "0")}.webp`;
    counter++;

    const tmpFile = path.join(articlePath, outName.replace(".webp", ".tmp"));
    console.log(`  ↓ ${outName}`);
    try {
      await dl(info.url, tmpFile);
      await sleep(500);
      const buffer = fs.readFileSync(tmpFile);
      const result = await saveWebP(buffer, dir, outName);
      console.log(`  ✓ ${outName} (${(result.size / 1024).toFixed(0)}KB, ${result.width}x${result.height})`);
      downloaded++;
      try { fs.unlinkSync(tmpFile); } catch {}
    } catch (e) {
      console.log(`  ✗ ${e.message}`);
      try { fs.unlinkSync(tmpFile); } catch {}
    }
    await sleep(12000);  // Long delay to avoid 429 rate limiting
  }

  console.log(`  Downloaded ${downloaded} new images`);
  return { dir, downloaded, total: existing.length + downloaded };
}

async function main() {
  console.log("📸 Wikimedia Commons Image Pipeline\n");
  const results = [];
  for (const config of ARTICLES) {
    const r = await processArticle(config);
    results.push(r);
    await sleep(5000);  // Longer delay between articles
  }
  console.log("\n\n═══════════════════════════════════");
  console.log("SUMMARY");
  let totalDl = 0;
  for (const r of results) {
    console.log(`  ${r.dir}: ${r.total} images (${r.downloaded} new)`);
    totalDl += r.downloaded;
  }
  console.log(`\nTotal downloaded: ${totalDl}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
