const https = require('https');

function getCommonsFileInfo(titles) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(titles.join('|')) + '&prop=imageinfo&iiprop=url|size|mime&format=json';
    https.get(url, { headers: { 'User-Agent': 'RoyalsGallery/1.0' } }, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const pages = Object.values(j.query.pages);
          resolve(pages.map(p => ({
            title: p.title,
            info: p.imageinfo && p.imageinfo[0]
          })));
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const files = [
    'File:Wittelsbach Graff Diamond.JPG',
    'File:The Hope Diamond - SIA.jpg',
    'File:Hope Diamond Closeup.jpg',
    'File:Napoleon Diamond Necklace.jpg',
    'File:Spanish Inquisition Necklace 2.jpg',
    'File:Bismarck Necklace (crop).jpg',
    'File:Hooker Emerald Brooch.jpg',
    'File:Tutti frutti bracelet - Cartier (25802475508).jpg',
    'File:BulgariNecklace.jpg',
    'File:Patiala Necklace, 1928, Cartier, Paris. Part of the Cartier Exhibition at V&A Museum.jpg'
  ];

  const results = await getCommonsFileInfo(files);
  for (const r of results) {
    if (r.info) {
      console.log('✓ ' + r.title + ' -> ' + r.info.url + ' (' + r.info.width + 'x' + r.info.height + ')');
    } else {
      console.log('✕ ' + r.title + ' NOT FOUND');
    }
  }
}
run();
