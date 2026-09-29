const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close(() => resolve(dest));
      });
    }).on('error', reject);
  });
}

async function run() {
  const palaceDir = path.join(__dirname, '../public/images/private-world/06-palace');
  const portraitDir = path.join(__dirname, '../public/images/private-world/08-portrait');
  fs.mkdirSync(palaceDir, { recursive: true });
  fs.mkdirSync(portraitDir, { recursive: true });

  const devshreePalaceImages = [
    {
      url: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/Copy_of_Dev_Shree-1",
      filename: "devshree-deogarh-01.jpg",
      dir: palaceDir,
      caption: "The elegant white Haveli facade and colonnaded veranda of Dev Shree Deogarh"
    },
    {
      url: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/Copy_of_Dev_Shree-4",
      filename: "devshree-deogarh-02.jpg",
      dir: palaceDir,
      caption: "The central courtyard garden and swimming pool sanctuary at Dev Shree Deogarh"
    },
    {
      url: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/AKS00952_iyapzr",
      filename: "devshree-deogarh-03.jpg",
      dir: palaceDir,
      caption: "Intimate Mewari candlelit dining on the veranda of Dev Shree"
    },
    {
      url: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/BGO_8598",
      filename: "devshree-deogarh-04.jpg",
      dir: palaceDir,
      caption: "Panoramic vistas over Lake Ragho Sagar directly adjacent to the Dev Shree estate"
    },
    {
      url: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1920,f_auto,c_limit/dev-shree-deogarh/contactus1_mhjnjd",
      filename: "devshree-deogarh-05.jpg",
      dir: palaceDir,
      caption: "Lush gardens and traditional Mewari architecture of Dev Shree Deogarh"
    }
  ];

  const devshreePortraitImages = [
    {
      url: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1600,f_auto,c_limit/dev-shree-deogarh/PHOTO-2019-03-06-10-37-30_ruxwyb",
      filename: "shatrunjai-devshree-01.jpg",
      dir: portraitDir,
      caption: "Shatrunjai and Bhavna Singh, hosts and creators of Dev Shree Deogarh"
    },
    {
      url: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1600,f_auto,c_limit/dev-shree-deogarh/20200222_121501",
      filename: "shatrunjai-devshree-02.jpg",
      dir: portraitDir,
      caption: "Shatrunjai Singh welcoming guests to the heritage estate of Deogarh"
    },
    {
      url: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1600,f_auto,c_limit/dev-shree-deogarh/20191231_134115",
      filename: "shatrunjai-devshree-03.jpg",
      dir: portraitDir,
      caption: "Hospitality traditions and royal lineage at Dev Shree Deogarh"
    },
    {
      url: "https://assets.simplotel.com/simplotel/image/upload/q_90,fl_progressive,w_1600,f_auto,c_limit/dev-shree-deogarh/AKS07163_lbi73w",
      filename: "shatrunjai-devshree-04.jpg",
      dir: portraitDir,
      caption: "Bespoke Mewari afternoon tea on the lawn at Dev Shree"
    }
  ];

  const allToDownload = [...devshreePalaceImages, ...devshreePortraitImages];

  for (const item of allToDownload) {
    const dest = path.join(item.dir, item.filename);
    console.log(`Downloading authentic Devshree asset: ${item.filename}...`);
    try {
      await download(item.url, dest);
      const size = fs.statSync(dest).size;
      console.log(`  ✓ Acquired ${item.filename} (${Math.round(size / 1024)} KB)`);
    } catch (e) {
      console.error(`  Failed ${item.filename}:`, e.message);
    }
  }

  console.log("Devshree official asset download complete!");
}

run();
