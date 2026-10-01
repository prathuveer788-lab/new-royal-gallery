const https = require('https');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, (res) => {
      console.log(url, 'STATUS:', res.statusCode);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirect to:', res.headers.location);
      }
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, length: d.length, body: d }));
    }).on('error', (e) => resolve({ error: e.message }));
  });
}

async function run() {
  const tests = [
    'https://www.graff.com/international-en/high-jewellery/',
    'https://www.bulgari.com/en-in/high-jewelry',
    'https://www.cartier.com/en-us/high-jewelry',
    'https://www.harrywinston.com/en/high-jewelry'
  ];
  for (const t of tests) {
    const res = await fetchPage(t);
    console.log(t, res.status || res.error, 'length:', res.length);
  }
}
run();
