const fs = require('fs');
const path = require('path');

// Read existing manifest
const existing = JSON.parse(fs.readFileSync('image-manifest.json', 'utf8'));

// Read travel-articles.ts to build title map
const taContent = fs.readFileSync('lib/travel-articles.ts', 'utf8');
const titleMap = {};

// Extract headline for each slug using line-by-line approach
const lines = taContent.split('\n');
let currentSlug = null;
for (const line of lines) {
  const slugMatch = line.match(/^\s*slug:\s*"([^"]+)"/);
  if (slugMatch) {
    currentSlug = slugMatch[1];
  }
  if (currentSlug) {
    const headlineMatch = line.match(/^\s*headline:\s*"([^"]+)"/);
    if (headlineMatch) {
      titleMap[currentSlug] = headlineMatch[1];
      currentSlug = null;
    }
  }
}
console.log('Title map entries:', Object.keys(titleMap).length);

// Extract all PHOTO markers from content files
const contentDir = 'lib/content';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.ts'));
const articleImages = {};

for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = fs.readFileSync(path.join(contentDir, file), 'utf8');

  // Use multiline regex to match [[PHOTO:...]] markers
  // Format: [[PHOTO:orientation|path|caption|imageDetail]]
  const markerRegex = /\[\[PHOTO:([^|]+)\|([^|]+)\|([^|]+)\|([\s\S]*?)\]\]/g;
  const images = [];
  let match;
  while ((match = markerRegex.exec(content)) !== null) {
    const imgPath = match[2].trim();
    if (imgPath.startsWith('/images/experiences/')) {
      const filename = path.basename(imgPath);
      // Strip number prefix (e.g. "01-hero-fortress" -> "Hero Fortress")
      const rawName = path.basename(imgPath, '.webp');
      const nameWithoutNumber = rawName.replace(/^\d+-/, '');
      const subject = nameWithoutNumber
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      images.push({
        filename,
        path: imgPath,
        subject,
        orientation: match[1],
        caption: match[3].trim(),
        imageDetail: match[4].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ')
      });
    }
  }
  articleImages[slug] = images;
  console.log(slug + ': ' + images.length + ' images');
}

// Build the new manifest
const result = {
  project: "The Royal Gallery — Experiences Image Integration",
  generated: "2026-08-07",
  totalArticles: 50,
  totalEnhancedMarkers: 276,
  sourcePriority: existing.sourcePriority,
  articles: {}
};

// Articles 01-09: preserve existing entries exactly
const preservedSlugs = [
  '01-umaid-bhawan-palace-jodhpur',
  '02-rambagh-palace-jaipur',
  '03-taj-lake-palace-udaipur',
  '04-city-palace-udaipur',
  '05-shiv-niwas-palace-udaipur',
  '06-fateh-prakash-palace-udaipur',
  '07-samode-palace-jaipur',
  '08-samode-haveli-jaipur',
  '09-raas-jodhpur'
];

for (const slug of preservedSlugs) {
  if (existing.articles[slug]) {
    result.articles[slug] = existing.articles[slug];
    console.log('Preserved:', slug, '(' + (existing.articles[slug].images || []).length + ' images)');
  }
}

// Articles 10-50: build from extracted data
const slugToKey = {
  'suryagarh-jaisalmer': '10-suryagarh-jaisalmer',
  'devi-garh-udaipur': '11-devi-garh-udaipur',
  'mihir-garh-jodhpur': '12-mihir-garh-jodhpur',
  'rohet-garh-jodhpur': '13-rohet-garh-jodhpur',
  'ahilya-fort-maheshwar': '14-ahilya-fort-maheshwar',
  'falaknuma-palace-hyderabad': '15-falaknuma-palace-hyderabad',
  'lalgarh-palace-bikaner': '16-lalgarh-palace-bikaner',
  'gajner-palace-bikaner': '17-gajner-palace-bikaner',
  'noor-us-sabah-palace-bhopal': '18-noor-us-sabah-palace-bhopal',
  'neemrana-fort-palace': '19-neemrana-fort-palace',
  'bhanwar-vilas-palace-karauli': '20-bhanwar-vilas-palace-karauli',
  'kyoto-travel-guide': '21-kyoto-travel-guide',
  'osaka-travel-guide': '22-osaka-travel-guide',
  'tokyo-travel-guide': '23-tokyo-travel-guide',
  'busan-travel-guide': '24-busan-travel-guide',
  'seoul-travel-guide': '25-seoul-travel-guide',
  'hanoi-travel-guide': '26-hanoi-travel-guide',
  'ho-chi-minh-city-travel-guide': '27-ho-chi-minh-city-travel-guide',
  'hoi-an-travel-guide': '28-hoi-an-travel-guide',
  'london-travel-guide': '29-london-travel-guide',
  'paris-travel-guide': '30-paris-travel-guide',
  'edinburgh-travel-guide': '31-edinburgh-travel-guide',
  'scottish-highlands-travel-guide': '32-scottish-highlands-travel-guide',
  'barcelona-travel-guide': '33-barcelona-travel-guide',
  'lisbon-travel-guide': '34-lisbon-travel-guide',
  'french-riviera-travel-guide': '35-french-riviera-travel-guide',
  'lake-como-travel-guide': '36-lake-como-travel-guide',
  'tuscany-travel-guide': '37-tuscany-travel-guide',
  'amalfi-coast-travel-guide': '38-amalfi-coast-travel-guide',
  'interlaken-travel-guide': '39-interlaken-travel-guide',
  'lucerne-travel-guide': '40-lucerne-travel-guide',
  'istanbul-travel-guide': '41-istanbul-travel-guide',
  'dubai-travel-guide': '42-dubai-travel-guide',
  'cairo-nile-travel-guide': '43-cairo-nile-travel-guide',
  'muscat-travel-guide': '44-muscat-travel-guide',
  'marrakech-travel-guide': '45-marrakech-travel-guide',
  'cape-town-travel-guide': '46-cape-town-travel-guide',
  'sydney-travel-guide': '47-sydney-travel-guide',
  'queenstown-travel-guide': '48-queenstown-travel-guide',
  'banff-rockies-travel-guide': '49-banff-rockies-travel-guide',
  'mexico-city-travel-guide': '50-mexico-city-travel-guide'
};

let totalNewImages = 0;
for (const [slug, key] of Object.entries(slugToKey)) {
  const images = articleImages[slug] || [];
  totalNewImages += images.length;

  result.articles[key] = {
    title: titleMap[slug] || slug,
    totalImages: images.length,
    images: images.map(img => ({
      filename: img.filename,
      path: img.path,
      subject: img.subject,
      source: "PENDING_SOURCE",
      usageStatus: "PENDING_DOWNLOAD",
      creditRequired: true
    }))
  };
}

// Verify totals
let allTotal = 0;
for (const [k, v] of Object.entries(result.articles)) {
  allTotal += v.totalImages || 0;
}
console.log('\n=== SUMMARY ===');
console.log('New article images (10-50):', totalNewImages);
console.log('Total articles in manifest:', Object.keys(result.articles).length);
console.log('Total images across all articles:', allTotal);

fs.writeFileSync('image-manifest.json', JSON.stringify(result, null, 2));
console.log('\nManifest written to image-manifest.json');
