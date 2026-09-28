import fs from "node:fs";
import path from "node:path";
import { downloadFile, processImage, retireImage } from "./process-images.mjs";

const TEMP_DIR = path.join(process.cwd(), "scratch", "downloads");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const ASSETS_TO_DOWNLOAD = [
  {
    name: "jaipur-city-palace-grand-facade",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Jaipur_03-2016_22_City_Palace_complex.jpg",
    destBase: "public/images/hero/jaipur-city-palace-grand-facade.jpg",
    maxWidth: 3200,
    formats: ["jpg", "webp"],
    credit: {
      title: "Jaipur City Palace Complex",
      artist: "A.Savin",
      license: "FAL (Free Art License)",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Jaipur_03-2016_22_City_Palace_complex.jpg",
    },
  },
  {
    name: "maharaja-rolls-royce-vintage-collection",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Rolls_Royce_20-25%2C_Vintage_Collection_of_Classic_Cars_Museum%2C_Udaipur%2C_20191208_0959_7514.jpg",
    destBase: "public/images/motoring/maharaja-rolls-royce-vintage-collection.jpg",
    maxWidth: 2400,
    formats: ["jpg", "webp"],
    credit: {
      title: "Maharaja's Vintage Rolls-Royce 20/25 HP Collection, Udaipur",
      artist: "Jakub Hałun",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rolls_Royce_20-25,_Vintage_Collection_of_Classic_Cars_Museum,_Udaipur,_20191208_0959_7514.jpg",
    },
  },
  {
    name: "land-rover-defender-safari-expedition",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Land_Rover_Defender_110_Station_Wagon_2016_-_front.jpg",
    destBase: "public/images/motoring/land-rover-defender-safari-expedition.jpg",
    maxWidth: 2400,
    formats: ["jpg", "webp"],
    credit: {
      title: "Land Rover Defender 110 Station Wagon",
      artist: "DeFacto",
      license: "CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Land_Rover_Defender_110_Station_Wagon_2016_-_front.jpg",
    },
  },
  {
    name: "varanasi-silk-weaving-traditional-loom",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/13/India_-_Varanasi_loom_-_0985.jpg",
    destBase: "public/images/design/varanasi-silk-weaving-traditional-loom.jpg",
    maxWidth: 2400,
    formats: ["jpg", "webp"],
    credit: {
      title: "Traditional Silk Weaving Loom, Varanasi",
      artist: "Jorge Royan",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:India_-_Varanasi_loom_-_0985.jpg",
    },
  },
  {
    name: "rajasthani-royal-thali-banquet",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Rajasthani_thali_%2813041306695%29.jpg",
    destBase: "public/images/dining/rajasthani-royal-thali-banquet.jpg",
    maxWidth: 2400,
    formats: ["jpg", "webp"],
    credit: {
      title: "Traditional Rajasthani Royal Thali",
      artist: "Connie Ma",
      license: "CC BY-SA 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rajasthani_thali_(13041306695).jpg",
    },
  },
  {
    name: "samode-palace-courtyard",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/10/Samode_Palace_courtyard_arcades_-_panoramio.jpg",
    destBase: "public/images/experiences/07-samode-palace-jaipur/01-hero.jpg",
    maxWidth: 2400,
    formats: ["jpg", "webp"],
    credit: {
      title: "Samode Palace Courtyard Arcades",
      artist: "Walter Schärer",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Samode_Palace_courtyard_arcades_-_panoramio.jpg",
    },
  },
  {
    name: "maheshwar-fort-ahilya",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Maheshwar_Fort_01.jpg",
    destBase: "public/images/experiences/14-ahilya-fort-maheshwar/01-hero.jpg",
    maxWidth: 2400,
    formats: ["jpg", "webp"],
    credit: {
      title: "View Inside Maheshwar Fort (Ahilya Fort)",
      artist: "Bernard Gagnon",
      license: "CC BY-SA 3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Maheshwar_Fort_01.jpg",
    },
  },
  {
    name: "neemrana-fort-grand-view",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Neemrana_fort.jpg",
    destBase: "public/images/experiences/19-neemrana-fort-palace/01-hero.jpg",
    maxWidth: 2400,
    formats: ["jpg", "webp"],
    credit: {
      title: "Neemrana Fort-Palace Panoramic View",
      artist: "Archit Ratan",
      license: "CC BY 2.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Neemrana_fort.jpg",
    },
  },
];

async function run() {
  console.log("=== STEP 1: Retiring old stock images ===");
  const filesToRetire = [
    "images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg",
    "images/colorful-vibrant-indian-landscape(1).jpg",
    "images/indian-city-buildings-scene(1).jpg",
    "images/udaipur-city-view-from-hotel-balcony-rajasthan-india(1).jpg",
    "images/images (5).jpg",
  ];
  for (const f of filesToRetire) {
    retireImage(f);
  }

  console.log("\n=== STEP 2: Downloading & Processing verified authentic assets ===");
  const credits = [];

  for (const item of ASSETS_TO_DOWNLOAD) {
    const rawDest = path.join(TEMP_DIR, `${item.name}-raw.jpg`);
    console.log(`Downloading ${item.name} from ${item.url}...`);
    try {
      await downloadFile(item.url, rawDest);
      const outDest = path.join(process.cwd(), item.destBase);
      await processImage(rawDest, outDest, {
        maxWidth: item.maxWidth || 2400,
        formats: item.formats || ["jpg", "webp"],
      });
      credits.push({
        path: item.destBase.replace(/^public/, ""),
        ...item.credit,
      });
    } catch (err) {
      console.error(`ERROR processing ${item.name}:`, err.message);
    }
  }

  console.log("\n=== STEP 3: Writing updated credits registry ===");
  const creditsPath = path.join(process.cwd(), "content", "image-credits.json");
  let existing = [];
  if (fs.existsSync(creditsPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(creditsPath, "utf8"));
    } catch {}
  }
  const merged = [...existing.filter(e => !credits.some(c => c.path === e.path)), ...credits];
  fs.mkdirSync(path.dirname(creditsPath), { recursive: true });
  fs.writeFileSync(creditsPath, JSON.stringify(merged, null, 2), "utf8");
  console.log(`Saved ${merged.length} image credits to content/image-credits.json`);
}

run().catch(console.error);
