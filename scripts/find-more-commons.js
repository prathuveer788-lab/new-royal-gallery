const https = require('https');

function searchCommons(query) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(query) + '&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size|mime&format=json';
    https.get(url, { headers: { 'User-Agent': 'RoyalsGallery/1.0' } }, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          const pages = j.query ? Object.values(j.query.pages) : [];
          resolve(pages.map(p => ({
            title: p.title,
            info: p.imageinfo && p.imageinfo[0]
          })).filter(x => x.info && x.info.url && (x.info.mime === 'image/jpeg' || x.info.mime === 'image/png' || x.info.mime === 'image/webp')));
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const queries = [
    'Wittelsbach Graff',
    'Napoleon Diamond',
    'Cartier tiara',
    'Serpenti Bulgari',
    'Van Cleef Zip',
    'Smithsonian diamond necklace'
  ];

  for (const q of queries) {
    const items = await searchCommons(q);
    console.log('=== ' + q + ' === (' + items.length + ' found)');
    items.forEach(it => {
      console.log('  ' + it.title + ' | ' + it.info.width + 'x' + it.info.height + ' | ' + it.info.url);
    });
  }
}
run();
