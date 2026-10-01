const https = require('https');

function getJson(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const search = await getJson('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&artistOrCulture=true&q=Cartier');
  console.log('Total with images:', search && search.objectIDs && search.objectIDs.length);
  const ids = search.objectIDs || [];
  let found = 0;
  for (const id of ids) {
    if (found >= 10) break;
    const obj = await getJson('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id);
    if (obj && obj.primaryImage && obj.additionalImages && obj.additionalImages.length >= 2) {
      console.log('ID:', id, '| Title:', obj.title, '| Images:', 1 + obj.additionalImages.length, '| Period:', obj.period || obj.objectDate);
      console.log('  Primary:', obj.primaryImageSmall || obj.primaryImage);
      found++;
    }
  }
}
run();
