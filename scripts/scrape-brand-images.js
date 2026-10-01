const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function fetchPage(url) {
  return new Promise((resolve) => {
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
        return fetchPage(loc).then(resolve);
      }
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    });
    req.on('error', () => resolve(''));
    req.setTimeout(12000, () => {
      req.destroy();
      resolve('');
    });
  });
}

function extractImageUrls(html) {
  const urls = new Set();
  // Match src="..." or data-src="..." or srcset="..."
  const attrRegex = /(?:src|data-src|data-original|srcset)=["']([^"']+)["']/gi;
  let match;
  while ((match = attrRegex.exec(html)) !== null) {
    const val = match[1];
    if (val.includes(',')) {
      // srcset
      const parts = val.split(',');
      for (const p of parts) {
        const u = p.trim().split(/\s+/)[0];
        if (u && (u.includes('.jpg') || u.includes('.jpeg') || u.includes('.png') || u.includes('.webp'))) {
          urls.add(u);
        }
      }
    } else {
      if (val.includes('.jpg') || val.includes('.jpeg') || val.includes('.png') || val.includes('.webp')) {
        urls.add(val);
      }
    }
  }
  return Array.from(urls);
}

async function run() {
  const articles = [
    {
      name: 'Bulgari Serpenti Aeterna',
      url: 'https://remixmagazine.com/culture/bvlgari-unveils-serpenti-aeterna-necklace/'
    },
    {
      name: 'Harry Winston Cluster',
      url: 'https://www.naturaldiamonds.com/epic-diamonds/the-story-behind-the-iconic-harry-winston-wreath-necklace/'
    },
    {
      name: 'Van Cleef Zip',
      url: 'https://www.naturaldiamonds.com/epic-diamonds/van-cleef-arpels-zip-necklace-history/'
    }
  ];

  for (const art of articles) {
    console.log('\nFetching article:', art.name);
    const html = await fetchPage(art.url);
    const images = extractImageUrls(html);
    console.log('Found ' + images.length + ' image URLs');
    const filtered = images.filter(m => 
      !m.includes('logo') && 
      !m.includes('icon') && 
      !m.includes('avatar') &&
      !m.includes('tracking') &&
      !m.includes('pixel') &&
      !m.includes('gravatar')
    );
    filtered.slice(0, 10).forEach((m, i) => console.log(`  [${i+1}] ${m}`));
  }
}

run();
