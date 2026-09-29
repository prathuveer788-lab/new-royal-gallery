const path = require('path');
const fs = require('fs');
const { ALL_STORIES } = require('./story_definitions');
const { searchCommons, downloadFile } = require('./acquire_media_engine');

const INVENTORY_FILE = path.join(__dirname, '../data/media-inventory.json');
const BASE_IMG_DIR = path.join(__dirname, '../public/images/private-world');

// Global set of downloaded image titles/URLs to guarantee ZERO repetition
const globalSeenUrls = new Set();
const globalSeenTitles = new Set();

async function run() {
  // Load existing inventory if present
  let inventory = [];
  if (fs.existsSync(INVENTORY_FILE)) {
    try {
      inventory = JSON.parse(fs.readFileSync(INVENTORY_FILE, 'utf8'));
      inventory.forEach(item => {
        if (item.originalUrl) globalSeenUrls.add(item.originalUrl);
        if (item.title) globalSeenTitles.add(item.title);
      });
      console.log(`Loaded ${inventory.length} existing inventory records.`);
    } catch (e) {
      inventory = [];
    }
  }

  const inventoryByStory = {};
  inventory.forEach(item => {
    if (!inventoryByStory[item.storyId]) inventoryByStory[item.storyId] = [];
    inventoryByStory[item.storyId].push(item);
  });

  console.log(`Starting media acquisition for ${ALL_STORIES.length} Private World stories...`);

  for (let sIdx = 0; sIdx < ALL_STORIES.length; sIdx++) {
    const story = ALL_STORIES[sIdx];
    const outDir = path.join(BASE_IMG_DIR, story.worldDir);
    fs.mkdirSync(outDir, { recursive: true });

    const existingForStory = inventoryByStory[story.id] || [];
    // Verify existing files on disk
    const validExisting = existingForStory.filter(item => {
      const fullPath = path.join(__dirname, '../public', item.filePath);
      return fs.existsSync(fullPath) && fs.statSync(fullPath).size > 10000;
    });

    console.log(`\n------------------------------------------------------------`);
    console.log(`[${sIdx + 1}/${ALL_STORIES.length}] Story: ${story.id}`);
    console.log(`Existing valid assets: ${validExisting.length}/4`);

    if (validExisting.length >= 4) {
      console.log(`Story already has sufficient authentic assets. Skipping download.`);
      continue;
    }

    const downloadedThisRun = [...validExisting];

    for (const q of story.queries) {
      if (downloadedThisRun.length >= 4) break;
      console.log(`Searching query: "${q}"...`);
      const results = await searchCommons(q, 5);

      for (const res of results) {
        if (downloadedThisRun.length >= 4) break;

        // Skip duplicates across entire platform!
        if (globalSeenUrls.has(res.originalUrl) || globalSeenTitles.has(res.title)) {
          continue;
        }

        const ext = path.extname(res.title).toLowerCase() || '.jpg';
        const index = downloadedThisRun.length + 1;
        const filename = `${story.prefix}-${index.toString().padStart(2, '0')}${ext}`;
        const localFilePath = path.join(outDir, filename);
        const webPath = `/images/private-world/${story.worldDir}/${filename}`;

        console.log(`  Downloading [${index}/4]: ${res.title.slice(0, 45)}...`);
        try {
          await downloadFile(res.downloadUrl, localFilePath);
          const stats = fs.statSync(localFilePath);
          if (stats.size < 8000) {
            console.log(`  File too small (${stats.size}b), discarded.`);
            if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
            continue;
          }

          globalSeenUrls.add(res.originalUrl);
          globalSeenTitles.add(res.title);

          const mediaEntry = {
            id: `IMG-PW-${story.id}-${index}`,
            storyId: story.id,
            subject: res.description.slice(0, 140) || story.id,
            source: "Wikimedia Commons",
            originalUrl: res.originalUrl,
            downloadUrl: res.downloadUrl,
            photographer: res.artist,
            date: res.date,
            collection: "Historic Imperial & Editorial Archives",
            copyrightHolder: res.license,
            licence: res.license,
            attribution: `${res.artist} (${res.date}). ${res.description.slice(0, 90)}. License: ${res.license}`,
            usageStatus: "VERIFIED_AUTHENTIC",
            resolution: `${res.width}x${res.height}`,
            filePath: webPath,
            title: res.title
          };

          downloadedThisRun.push(mediaEntry);
          inventory.push(mediaEntry);
          console.log(`  ✓ Saved ${filename} (${Math.round(stats.size / 1024)} KB, ${res.width}x${res.height})`);

          // Save inventory after every download
          fs.writeFileSync(INVENTORY_FILE, JSON.stringify(inventory, null, 2));
        } catch (err) {
          console.error(`  Error downloading: ${err.message}`);
          if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        }
      }
    }
  }

  console.log(`\n============================================================`);
  console.log(`Media Acquisition Complete!`);
  console.log(`Total records in data/media-inventory.json: ${inventory.length}`);
  console.log(`============================================================`);
}

run();
