const https = require('https');

function searchCommons(query, limit = 5) {
  return new Promise((resolve, reject) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=${limit}&gsrnamespace=6&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    
    https.get(url, { headers: { 'User-Agent': 'TheRoyalGallerys/1.0 (https://theroyalgallerys.com; editorial archive research)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? Object.values(json.query.pages) : [];
          const results = pages.map(p => {
            const info = p.imageinfo ? p.imageinfo[0] : {};
            const meta = info.extmetadata || {};
            return {
              title: p.title,
              width: info.width,
              height: info.height,
              url: info.url,
              description: meta.ImageDescription ? meta.ImageDescription.value.replace(/<[^>]+>/g, '').slice(0, 150) : '',
              artist: meta.Artist ? meta.Artist.value.replace(/<[^>]+>/g, '') : 'Unknown',
              license: meta.LicenseShortName ? meta.LicenseShortName.value : (meta.UsageTerms ? meta.UsageTerms.value : 'Public Domain')
            };
          }).filter(r => r.width >= 2000);
          resolve(results);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

const query = process.argv[2] || 'Jaipur City Palace';
searchCommons(query).then(results => {
  console.log(`Results for "${query}" (${results.length} found):`);
  results.forEach(r => {
    console.log(`- [${r.width}x${r.height}] ${r.title}`);
    console.log(`  Artist: ${r.artist} | License: ${r.license}`);
    console.log(`  URL: ${r.url}`);
    console.log(`  Desc: ${r.description}\n`);
  });
}).catch(console.error);
