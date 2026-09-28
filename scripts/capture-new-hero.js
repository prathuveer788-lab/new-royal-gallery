const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const screenshotsDir = path.join(__dirname, '..', 'screenshots');

async function getJson(url) {
  return new Promise((res, rej) => {
    http.get(url, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => { try { res(JSON.parse(d)); } catch(e) { rej(e); } });
    }).on('error', rej);
  });
}

async function capture(url, width, height, outFile, port) {
  const tempDir = path.join(process.env.TEMP, 'edge-cdp-' + Date.now());
  const edge = spawn(edgePath, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tempDir,
    '--window-size=' + width + ',' + height,
    url
  ]);

  let targets = null;
  for (let i = 0; i < 25; i++) {
    try {
      targets = await getJson('http://127.0.0.1:' + port + '/json/list');
      if (targets && targets.length) break;
    } catch(e) {}
    await new Promise(r => setTimeout(r, 400));
  }

  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let msgId = 1;
  const send = (method, params = {}) => new Promise(res => {
    const id = msgId++;
    const h = e => {
      const d = JSON.parse(e.data);
      if (d.id === id) { ws.removeEventListener('message', h); res(d.result); }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id, method, params }));
  });

  // Wait for full page load
  await new Promise(r => setTimeout(r, 3000));

  // Set device metrics explicitly
  await send('Emulation.setDeviceMetricsOverride', {
    width, height, deviceScaleFactor: 1, mobile: width < 500
  });
  await new Promise(r => setTimeout(r, 500));

  const ss = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(outFile, Buffer.from(ss.data, 'base64'));

  ws.close();
  edge.kill();
  try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch(e) {}
  console.log('Saved:', outFile);
}

(async () => {
  const base = 'http://localhost:3001/society/aaliya-sultana-babi-dinosaur-princess-balasinor';
  
  console.log('Capturing desktop (1440x900)...');
  await capture(base, 1440, 900, path.join(screenshotsDir, 'new-hero-desktop.png'), 9225);

  console.log('Capturing mobile (390x844)...');
  await capture(base, 390, 844, path.join(screenshotsDir, 'new-hero-mobile.png'), 9226);

  console.log('All done!');
})().catch(console.error);
