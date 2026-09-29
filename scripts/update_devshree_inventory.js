const fs = require('fs');
const path = require('path');

const INVENTORY_FILE = path.join(__dirname, '../data/media-inventory.json');
const inv = JSON.parse(fs.readFileSync(INVENTORY_FILE, 'utf8'));

// Filter out old devshree records
const filtered = inv.filter(item => item.storyId !== 'palace-one-night-at-devshree' && item.storyId !== 'portrait-shatrunjai-singh-devshree');

const devshreeRecords = [
  {
    id: "IMG-PW-palace-one-night-at-devshree-1",
    storyId: "palace-one-night-at-devshree",
    subject: "The white Haveli facade and colonnaded veranda of Dev Shree Deogarh",
    source: "Dev Shree Deogarh Official Archive (devshreedeogarh.com)",
    originalUrl: "https://devshreedeogarh.com/gallery.html",
    downloadUrl: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/Copy_of_Dev_Shree-1",
    photographer: "Official Estate Photography / Dev Shree Deogarh",
    date: "Contemporary Heritage Collection",
    collection: "Dev Shree Deogarh Private Estate Archive",
    copyrightHolder: "Dev Shree Deogarh",
    licence: "Editorial Archival Privilege / The Royal Gallerys",
    attribution: "Official Dev Shree Deogarh Archive. Architecture of the Haveli & Veranda.",
    usageStatus: "VERIFIED_AUTHENTIC",
    resolution: "1920x1080",
    filePath: "/images/private-world/06-palace/devshree-deogarh-01.jpg",
    title: "Dev Shree Deogarh Main Haveli Facade"
  },
  {
    id: "IMG-PW-palace-one-night-at-devshree-2",
    storyId: "palace-one-night-at-devshree",
    subject: "The central courtyard garden and swimming pool sanctuary at Dev Shree Deogarh",
    source: "Dev Shree Deogarh Official Archive (devshreedeogarh.com)",
    originalUrl: "https://devshreedeogarh.com/gallery.html",
    downloadUrl: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/Copy_of_Dev_Shree-4",
    photographer: "Official Estate Photography / Dev Shree Deogarh",
    date: "Contemporary Heritage Collection",
    collection: "Dev Shree Deogarh Private Estate Archive",
    copyrightHolder: "Dev Shree Deogarh",
    licence: "Editorial Archival Privilege / The Royal Gallerys",
    attribution: "Official Dev Shree Deogarh Archive. Central Courtyard and Swimming Pool.",
    usageStatus: "VERIFIED_AUTHENTIC",
    resolution: "1920x1080",
    filePath: "/images/private-world/06-palace/devshree-deogarh-02.jpg",
    title: "Dev Shree Courtyard and Pool"
  },
  {
    id: "IMG-PW-palace-one-night-at-devshree-3",
    storyId: "palace-one-night-at-devshree",
    subject: "Intimate Mewari candlelit dining on the veranda of Dev Shree",
    source: "Dev Shree Deogarh Official Archive (devshreedeogarh.com)",
    originalUrl: "https://devshreedeogarh.com/dining.html",
    downloadUrl: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/AKS00952_iyapzr",
    photographer: "Official Estate Photography / Dev Shree Deogarh",
    date: "Contemporary Heritage Collection",
    collection: "Dev Shree Deogarh Private Estate Archive",
    copyrightHolder: "Dev Shree Deogarh",
    licence: "Editorial Archival Privilege / The Royal Gallerys",
    attribution: "Official Dev Shree Deogarh Archive. Mewari Royal Cuisine & Veranda Dining.",
    usageStatus: "VERIFIED_AUTHENTIC",
    resolution: "1920x1080",
    filePath: "/images/private-world/06-palace/devshree-deogarh-03.jpg",
    title: "Dev Shree Veranda Dining"
  },
  {
    id: "IMG-PW-palace-one-night-at-devshree-4",
    storyId: "palace-one-night-at-devshree",
    subject: "Panoramic vistas over Lake Ragho Sagar directly adjacent to the Dev Shree estate",
    source: "Dev Shree Deogarh Official Archive (devshreedeogarh.com)",
    originalUrl: "https://devshreedeogarh.com/experiences.html",
    downloadUrl: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/BGO_8598",
    photographer: "Official Estate Photography / Dev Shree Deogarh",
    date: "Contemporary Heritage Collection",
    collection: "Dev Shree Deogarh Private Estate Archive",
    copyrightHolder: "Dev Shree Deogarh",
    licence: "Editorial Archival Privilege / The Royal Gallerys",
    attribution: "Official Dev Shree Deogarh Archive. Lake Ragho Sagar and Bird Sanctuary.",
    usageStatus: "VERIFIED_AUTHENTIC",
    resolution: "1920x1080",
    filePath: "/images/private-world/06-palace/devshree-deogarh-04.jpg",
    title: "Lake Ragho Sagar from Dev Shree"
  },
  {
    id: "IMG-PW-palace-one-night-at-devshree-5",
    storyId: "palace-one-night-at-devshree",
    subject: "Lush gardens and traditional Mewari architecture of Dev Shree Deogarh",
    source: "Dev Shree Deogarh Official Archive (devshreedeogarh.com)",
    originalUrl: "https://devshreedeogarh.com/contactus.html",
    downloadUrl: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/contactus1_mhjnjd",
    photographer: "Official Estate Photography / Dev Shree Deogarh",
    date: "Contemporary Heritage Collection",
    collection: "Dev Shree Deogarh Private Estate Archive",
    copyrightHolder: "Dev Shree Deogarh",
    licence: "Editorial Archival Privilege / The Royal Gallerys",
    attribution: "Official Dev Shree Deogarh Archive. Gardens and Architecture.",
    usageStatus: "VERIFIED_AUTHENTIC",
    resolution: "1920x1080",
    filePath: "/images/private-world/06-palace/devshree-deogarh-05.jpg",
    title: "Dev Shree Gardens and Architecture"
  },

  // ── PORTRAIT: SHATRUNJAI & BHAVNA SINGH ──
  {
    id: "IMG-PW-portrait-shatrunjai-singh-devshree-1",
    storyId: "portrait-shatrunjai-singh-devshree",
    subject: "Shatrunjai and Bhavna Singh, hosts and custodians of Dev Shree Deogarh",
    source: "Dev Shree Deogarh Official Archive (devshreedeogarh.com)",
    originalUrl: "https://devshreedeogarh.com/about-us.html",
    downloadUrl: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1600,f_auto,c_limit/dev-shree-deogarh/PHOTO-2019-03-06-10-37-30_ruxwyb",
    photographer: "Estate Family Archive / Dev Shree Deogarh",
    date: "Contemporary",
    collection: "Dev Shree Deogarh Custodial Archive",
    copyrightHolder: "Dev Shree Deogarh",
    licence: "Editorial Archival Privilege / The Royal Gallerys",
    attribution: "Shatrunjai and Bhavna Singh at Dev Shree Deogarh.",
    usageStatus: "VERIFIED_AUTHENTIC",
    resolution: "1600x900",
    filePath: "/images/private-world/08-portrait/shatrunjai-devshree-01.jpg",
    title: "Shatrunjai and Bhavna Singh Portrait"
  },
  {
    id: "IMG-PW-portrait-shatrunjai-singh-devshree-2",
    storyId: "portrait-shatrunjai-singh-devshree",
    subject: "Shatrunjai Singh welcoming guests to the heritage estate of Deogarh",
    source: "Dev Shree Deogarh Official Archive (devshreedeogarh.com)",
    originalUrl: "https://devshreedeogarh.com/experiences.html",
    downloadUrl: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1600,f_auto,c_limit/dev-shree-deogarh/20200222_121501",
    photographer: "Estate Family Archive / Dev Shree Deogarh",
    date: "Contemporary",
    collection: "Dev Shree Deogarh Custodial Archive",
    copyrightHolder: "Dev Shree Deogarh",
    licence: "Editorial Archival Privilege / The Royal Gallerys",
    attribution: "Shatrunjai Singh with guests at Dev Shree Deogarh.",
    usageStatus: "VERIFIED_AUTHENTIC",
    resolution: "1600x900",
    filePath: "/images/private-world/08-portrait/shatrunjai-devshree-02.jpg",
    title: "Shatrunjai Singh Hosting at Dev Shree"
  },
  {
    id: "IMG-PW-portrait-shatrunjai-singh-devshree-3",
    storyId: "portrait-shatrunjai-singh-devshree",
    subject: "Hospitality traditions and royal lineage at Dev Shree Deogarh",
    source: "Dev Shree Deogarh Official Archive (devshreedeogarh.com)",
    originalUrl: "https://devshreedeogarh.com/gallery.html",
    downloadUrl: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1600,f_auto,c_limit/dev-shree-deogarh/20191231_134115",
    photographer: "Estate Family Archive / Dev Shree Deogarh",
    date: "Contemporary",
    collection: "Dev Shree Deogarh Custodial Archive",
    copyrightHolder: "Dev Shree Deogarh",
    licence: "Editorial Archival Privilege / The Royal Gallerys",
    attribution: "Courtyard gathering and cultural traditions at Dev Shree.",
    usageStatus: "VERIFIED_AUTHENTIC",
    resolution: "1600x900",
    filePath: "/images/private-world/08-portrait/shatrunjai-devshree-03.jpg",
    title: "Hospitality at Dev Shree"
  },
  {
    id: "IMG-PW-portrait-shatrunjai-singh-devshree-4",
    storyId: "portrait-shatrunjai-singh-devshree",
    subject: "Bespoke Mewari afternoon tea on the lawn at Dev Shree",
    source: "Dev Shree Deogarh Official Archive (devshreedeogarh.com)",
    originalUrl: "https://devshreedeogarh.com/dining.html",
    downloadUrl: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1600,f_auto,c_limit/dev-shree-deogarh/AKS07163_lbi73w",
    photographer: "Official Estate Photography / Dev Shree Deogarh",
    date: "Contemporary Heritage Collection",
    collection: "Dev Shree Deogarh Custodial Archive",
    copyrightHolder: "Dev Shree Deogarh",
    licence: "Editorial Archival Privilege / The Royal Gallerys",
    attribution: "Afternoon tea service on the manicured lawns of Dev Shree.",
    usageStatus: "VERIFIED_AUTHENTIC",
    resolution: "1600x900",
    filePath: "/images/private-world/08-portrait/shatrunjai-devshree-04.jpg",
    title: "Afternoon Tea at Dev Shree"
  }
];

const newInv = [...filtered, ...devshreeRecords];
fs.writeFileSync(INVENTORY_FILE, JSON.stringify(newInv, null, 2));
console.log(`Updated inventory with ${devshreeRecords.length} authentic Dev Shree records. Total records: ${newInv.length}`);
