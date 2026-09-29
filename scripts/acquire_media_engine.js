const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Helper to fetch JSON from URL
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'TheRoyalGallerysEditorial/2.0 (https://theroyalsgallery.com; hey.theroyalsgallery@gmail.com)'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJson(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message} - Data: ${data.slice(0, 100)}`));
        }
      });
    }).on('error', reject);
  });
}

// Helper to download a file stream to disk
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'TheRoyalGallerysEditorial/2.0 (https://theroyalsgallery.com; hey.theroyalsgallery@gmail.com)'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => resolve(destPath));
      });
    }).on('error', reject);
  });
}

// Clean HTML tags from metadata text
function cleanText(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

// Search Commons for a specific query, fetching 1920px web-ready high-res images
async function searchCommons(query, limit = 6) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1920&format=json`;
  try {
    const res = await fetchJson(url);
    const pages = res.query?.pages || {};
    const results = [];
    for (const pageId in pages) {
      const page = pages[pageId];
      if (page.imageinfo && page.imageinfo[0]) {
        const info = page.imageinfo[0];
        const title = page.title || '';
        const ext = path.extname(title).toLowerCase();
        // Only accept true raster/vector photo formats
        if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          continue;
        }
        const meta = info.extmetadata || {};
        const downloadUrl = info.thumburl || info.url;
        results.push({
          title: title.replace(/^File:/, ''),
          originalUrl: info.url,
          downloadUrl: downloadUrl,
          width: info.width,
          height: info.height,
          description: cleanText(meta.ImageDescription?.value) || title,
          artist: cleanText(meta.Artist?.value) || 'Historical Archive / Court Photographer',
          date: cleanText(meta.DateTimeOriginal?.value || meta.DateTime?.value) || 'Historical',
          license: cleanText(meta.LicenseShortName?.value) || 'Public Domain',
          attribution: cleanText(meta.Attribution?.value) || cleanText(meta.Credit?.value) || 'Historical Royal Archive'
        });
      }
    }
    return results;
  } catch (err) {
    console.error(`Search error for "${query}":`, err.message);
    return [];
  }
}

module.exports = {
  fetchJson,
  downloadFile,
  cleanText,
  searchCommons
};
