// ── Phase 2: Download images for articles 02-09 (palaces) + 21-50 (travel) ──
// Same engine as search-dl.js, expanded article list

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const BASE = "public/images/experiences";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function apiFetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "RoyalsGallery/1.0" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

async function searchImages(query, limit = 12) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=${limit}&format=json&origin=*`;
  const data = await apiFetch(url);
  return (data.query?.search || []).map((r) => r.title.replace("File:", ""));
}

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
        const wait = Math.min((9 - retries) * 8000 + 4000, 60000);
        console.log(`    429, waiting ${wait/1000}s...`);
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
        return resolve(sleep(wait).then(() => dl(url, dest, retries - 1)));
      }
      reject(err);
    });
  });
}

async function saveWebP(buffer, articleDir, filename) {
  const dir = path.join(BASE, articleDir);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const destFile = path.join(dir, filename);
  const meta = await sharp(buffer).metadata();
  await sharp(buffer)
    .resize(meta.width > 2000 ? 2000 : meta.width, undefined, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(destFile);
  return { size: fs.statSync(destFile).size, width: meta.width, height: meta.height };
}

// ── Article config ──────────────────────────────────────
const ARTICLES = [
  // ── Palaces 02-09 ──────────────────────────────────
  { dir: "02-rambagh-palace-jaipur", queries: ["Rambagh Palace Jaipur", "Jaipur palace hotel luxury"], fillCount: 7 },
  { dir: "03-taj-lake-palace-udaipur", queries: ["Taj Lake Palace Udaipur", "Jag Niwas Lake Pichola"], fillCount: 8 },
  { dir: "04-city-palace-udaipur", queries: ["City Palace Udaipur interior", "Udaipur palace architecture"], fillCount: 6 },
  { dir: "05-shiv-niwas-palace-udaipur", queries: ["Shiv Niwas Palace Udaipur", "City Palace Udaipur courtyard"], fillCount: 4 },
  { dir: "06-fateh-prakash-palace-udaipur", queries: ["Fateh Prakash Palace Udaipur", "Udaipur Durbar Hall crystal"], fillCount: 4 },
  { dir: "07-samode-palace-jaipur", queries: ["Samode Palace Jaipur", "Rajasthan palace architecture Jaipur"], fillCount: 4 },
  { dir: "08-samode-haveli-jaipur", queries: ["Samode Haveli Jaipur", "Jaipur haveli architecture"], fillCount: 3 },
  { dir: "09-raas-jodhpur", queries: ["RAAS Jodhpur hotel Mehrangarh", "Jodhpur blue city haveli hotel"], fillCount: 6 },

  // ── Travel Guides 21-30 ────────────────────────────
  { dir: "21-kyoto", queries: ["Kyoto Japan temple garden", "Fushimi Inari torii", "Gion geisha Kyoto", "Golden Pavilion Kinkakuji"], fillCount: 5 },
  { dir: "22-osaka", queries: ["Osaka Japan city", "Osaka castle", "Dotonbori Osaka night"], fillCount: 5 },
  { dir: "23-tokyo", queries: ["Tokyo Japan city skyline", "Shibuya crossing Tokyo", "Tokyo temple garden"], fillCount: 4 },
  { dir: "24-busan", queries: ["Busan South Korea city", "Haedong Yonggungsa temple Busan", "Gamcheon Culture Village Busan"], fillCount: 5 },
  { dir: "25-seoul", queries: ["Seoul South Korea palace", "Gyeongbokgung Seoul", "Seoul city skyline night"], fillCount: 5 },
  { dir: "26-hanoi", queries: ["Hanoi Vietnam old quarter", "Hoan Kiem lake Hanoi", "Hanoi temple literature"], fillCount: 6 },
  { dir: "27-ho-chi-minh-city", queries: ["Ho Chi Minh City Vietnam", "Saigon Notre-Dame basilica", "Ben Thanh market Saigon"], fillCount: 6 },
  { dir: "28-hoi-an", queries: ["Hoi An Vietnam lantern", "Hoi An ancient town", "Hoi An river sunset"], fillCount: 6 },
  { dir: "29-london", queries: ["London UK city landmarks", "Tower Bridge London", "Buckingham Palace London"], fillCount: 5 },
  { dir: "30-paris", queries: ["Paris France Eiffel Tower", "Paris Seine river", "Louvre museum Paris"], fillCount: 5 },

  // ── Travel Guides 31-40 ────────────────────────────
  { dir: "31-edinburgh", queries: ["Edinburgh Scotland city", "Edinburgh castle", "Royal Mile Edinburgh"], fillCount: 3 },
  { dir: "32-scottish-highlands", queries: ["Scottish Highlands landscape", "Glencoe Scotland", "Isle of Skye Scotland"], fillCount: 5 },
  { dir: "33-barcelona", queries: ["Barcelona Spain architecture", "Sagrada Familia Barcelona", "Park Guell Barcelona"], fillCount: 5 },
  { dir: "34-lisbon", queries: ["Lisbon Portugal city", "Belem Tower Lisbon", "Lisbon tram 28"], fillCount: 5 },
  { dir: "35-french-riviera", queries: ["French Riviera Nice", "Saint-Tropez France", "Cannes French Riviera"], fillCount: 5 },
  { dir: "36-lake-como", queries: ["Lake Como Italy", "Bellagio Lake Como", "Villa del Balbianello Como"], fillCount: 8 },
  { dir: "37-tuscany", queries: ["Tuscany Italy landscape", "Val d Orcia Tuscany", "San Gimignano Tuscany"], fillCount: 6 },
  { dir: "38-amalfi-coast", queries: ["Amalfi Coast Italy", "Positano Italy", "Ravello Amalfi Coast"], fillCount: 9 },
  { dir: "39-interlaken", queries: ["Interlaken Switzerland", "Jungfrau Switzerland", "Lauterbrunnen Switzerland"], fillCount: 5 },
  { dir: "40-lucerne", queries: ["Lucerne Switzerland", "Chapel Bridge Lucerne", "Lake Lucerne Switzerland"], fillCount: 4 },

  // ── Travel Guides 41-50 ────────────────────────────
  { dir: "41-istanbul", queries: ["Istanbul Turkey landmarks", "Hagia Sophia Istanbul", "Blue Mosque Istanbul", "Bosphorus Istanbul"], fillCount: 14 },
  { dir: "42-dubai", queries: ["Dubai UAE skyline", "Burj Khalifa Dubai", "Dubai Marina", "Dubai desert"], fillCount: 5 },
  { dir: "43-cairo-nile", queries: ["Cairo Egypt pyramids", "Nile river Cairo", "Egyptian Museum Cairo", "Cairo Citadel"], fillCount: 4 },
  { dir: "44-muscat", queries: ["Muscat Oman", "Sultan Qaboos Grand Mosque", "Mutrah Souq Muscat"], fillCount: 4 },
  { dir: "45-marrakech", queries: ["Marrakech Morocco", "Jemaa el Fnaa Marrakech", "Majorelle Garden Marrakech"], fillCount: 5 },
  { dir: "46-cape-town", queries: ["Cape Town South Africa", "Table Mountain Cape Town", "Cape Town waterfront"], fillCount: 5 },
  { dir: "47-sydney", queries: ["Sydney Australia opera house", "Sydney Harbour Bridge", "Bondi Beach Sydney"], fillCount: 11 },
  { dir: "48-queenstown", queries: ["Queenstown New Zealand", "Milford Sound New Zealand", "Lake Wakatipu Queenstown"], fillCount: 5 },
  { dir: "49-banff-rockies", queries: ["Banff Canada Rockies", "Lake Louise Banff", "Moraine Lake Canada"], fillCount: 5 },
  { dir: "50-mexico-city", queries: ["Mexico City landmarks", "Palacio Bellas Artes Mexico", "Teotihuacan pyramids Mexico"], fillCount: 4 },
];

async function processArticle(config) {
  const { dir, queries, fillCount } = config;
  console.log(`\n=== ${dir} ===`);

  const articlePath = path.join(BASE, dir);
  const existing = fs.existsSync(articlePath)
    ? fs.readdirSync(articlePath).filter((f) => f.endsWith(".webp") || f.endsWith(".jpg"))
    : [];
  const needed = fillCount - existing.length;
  if (needed <= 0) {
    console.log(`  ✓ Already have ${existing.length} images (need ${fillCount})`);
    return { dir, downloaded: 0, total: existing.length };
  }
  console.log(`  Existing: ${existing.length}, need ${needed} more`);

  let allFilenames = new Set();
  for (const query of queries) {
    try {
      const results = await searchImages(query, 10);
      results.forEach((f) => allFilenames.add(f));
    } catch (e) { console.log(`  Search err: ${e.message}`); }
    await sleep(3000);
  }
  console.log(`  Found ${allFilenames.size} unique images`);

  if (allFilenames.size === 0) {
    console.log(`  ⚠ No images found`);
    return { dir, downloaded: 0, total: existing.length };
  }

  const urls = await getImageUrls([...allFilenames].slice(0, 20));
  console.log(`  Resolved ${Object.keys(urls).length} URLs`);
  await sleep(2000);

  // Filter out SVGs and other non-image files
  const validEntries = Object.entries(urls).filter(([fn]) => !fn.match(/\.(svg|ogg|pdf|ogv|webm)$/i));

  let downloaded = 0;
  let counter = existing.length + 1;

  for (const [filename, info] of validEntries) {
    if (downloaded >= needed) break;
    const outName = `img-${String(counter).padStart(2, "0")}.webp`;
    counter++;
    const tmpFile = path.join(articlePath, outName.replace(".webp", ".tmp"));
    console.log(`  ↓ ${outName} (${filename.substring(0, 40)}...)`);
    try {
      await dl(info.url, tmpFile);
      await sleep(500);
      const buffer = fs.readFileSync(tmpFile);
      const result = await saveWebP(buffer, dir, outName);
      console.log(`  ✓ ${outName} ${(result.size / 1024).toFixed(0)}KB ${result.width}x${result.height}`);
      downloaded++;
      try { fs.unlinkSync(tmpFile); } catch {}
    } catch (e) {
      console.log(`  ✗ ${e.message}`);
      try { fs.unlinkSync(tmpFile); } catch {}
    }
    await sleep(8000); // 8s between downloads
  }

  console.log(`  ✅ Downloaded ${downloaded} new images`);
  return { dir, downloaded, total: existing.length + downloaded };
}

async function main() {
  console.log("📸 Phase 2 Image Pipeline\n");
  let totalDl = 0;
  for (const config of ARTICLES) {
    const r = await processArticle(config);
    totalDl += r.downloaded;
    await sleep(3000);
  }
  console.log(`\n\nTotal downloaded: ${totalDl}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
