const https = require('https');

function queryCommons(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'RoyalsGallery/1.0 (info@royalsgallery.com)'
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
  const categories = [
    'Category:Jewellery_by_Cartier',
    'Category:Jewellery_by_Bulgari',
    'Category:Jewellery_by_Van_Cleef_%26_Arpels',
    'Category:Harry_Winston',
    'Category:Diamonds',
    'Category:Necklaces'
  ];

  for (const cat of categories) {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=' + encodeURIComponent(cat) + '&cmtype=file&cmlimit=15&format=json';
    const data = await queryCommons(url);
    console.log('=== ' + cat + ' ===');
    if (data && data.query && data.query.categorymembers) {
      data.query.categorymembers.forEach(m => console.log('  ', m.title));
    } else {
      console.log('  none or error');
    }
  }
}
run();
