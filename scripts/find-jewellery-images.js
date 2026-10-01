const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function getUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) {
          const parsed = new URL(url);
          loc = parsed.origin + loc;
        }
        return getUrl(loc).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Timeout ' + url));
    });
  });
}

async function searchGoogleImages(query) {
  try {
    const url = 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(query);
    const res = await getUrl(url);
    const regex = /\[\"(https:\/\/[^\"]+\.(?:jpg|jpeg|png|webp))\",\s*(\d+),\s*(\d+)\]/g;
    const urls = [];
    let match;
    while ((match = regex.exec(res.body)) !== null) {
      const imgUrl = match[1];
      const w = parseInt(match[2], 10);
      const h = parseInt(match[3], 10);
      if (w > 400 && h > 400 && !imgUrl.includes('gstatic') && !imgUrl.includes('google')) {
        urls.push(imgUrl);
      }
    }
    return urls;
  } catch (err) {
    console.error('Google search failed for ' + query + ':', err.message);
    return [];
  }
}

async function searchDuckDuckGoImages(query) {
  try {
    const searchUrl = 'https://duckduckgo.com/?q=' + encodeURIComponent(query) + '&t=h_&iax=images&ia=images';
    const mainRes = await getUrl(searchUrl);
    const vqdMatch = mainRes.body.match(/vqd=([0-9-]+)/) || mainRes.body.match(/vqd=\"([0-9-]+)\"/);
    if (!vqdMatch) return [];
    const vqd = vqdMatch[1];
    const apiUrl = 'https://duckduckgo.com/i.js?l=us-en&o=json&q=' + encodeURIComponent(query) + '&vqd=' + vqd + '&f=,,,&p=1';
    const apiRes = await getUrl(apiUrl);
    const json = JSON.parse(apiRes.body);
    if (json && json.results) {
      return json.results.map(r => r.image).filter(Boolean);
    }
    return [];
  } catch (err) {
    return [];
  }
}

async function test() {
  console.log('Testing image search for high jewellery creations...');
  const tests = [
    'Graff Golden Empress necklace',
    'Graff Lesotho Promise necklace',
    'Harry Winston Winston Cluster necklace',
    'Cartier Panthere high jewellery necklace',
    'Bulgari Serpenti Aeterna necklace',
    'Van Cleef Arpels Zip necklace'
  ];

  for (const q of tests) {
    console.log('\nSearching:', q);
    let results = await searchDuckDuckGoImages(q);
    if (results.length === 0) {
      results = await searchGoogleImages(q);
    }
    console.log(`Found ${results.length} candidate images`);
    results.slice(0, 5).forEach((u, i) => console.log(`  [${i+1}] ${u}`));
  }
}

test();
