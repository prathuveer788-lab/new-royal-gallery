const https = require('https');

function fetchWikiMediaList(title) {
  return new Promise((resolve) => {
    https.get('https://en.wikipedia.org/api/rest_v1/page/media-list/' + encodeURIComponent(title), {
      headers: {
        'User-Agent': 'RoyalsGalleryBot/1.0 (info@royalsgallery.com)'
      }
    }, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const titles = [
    'Hope_Diamond',
    'Napoleon_Diamond_Necklace',
    'Bismarck_Sapphire_Necklace',
    'Wittelsbach-Graff_Diamond',
    'Patiala_Necklace',
    'Vladimir_Tiara',
    'Cartier_(jeweler)'
  ];

  for (const t of titles) {
    const data = await fetchWikiMediaList(t);
    console.log('=== ' + t + ' ===');
    if (data && data.items) {
      const imgs = data.items.filter(it => it.type === 'image' && it.srcset && it.srcset.length > 0);
      console.log('Found ' + imgs.length + ' images');
      imgs.slice(0, 4).forEach((img, i) => {
        const best = img.srcset[img.srcset.length - 1];
        console.log(`  [${i+1}] ${img.title}: ${best.src}`);
      });
    } else {
      console.log('No data');
    }
  }
}
run();
