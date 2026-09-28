const { spawn, execFile } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const screenshotsDir = path.join(__dirname, '..', 'screenshots');

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const port = 9222;
  const tempDir = path.join(process.env.TEMP, `edge-cdp-${Date.now()}`);
  
  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
    '--window-size=1440,1100',
    'http://localhost:3000/'
  ]);

  // wait 2s for edge to start
  await new Promise(r => setTimeout(r, 2500));

  try {
    const targets = await getJson(`http://127.0.0.1:${port}/json/list`);
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) throw new Error('No page target found');

    const wsUrl = pageTarget.webSocketDebuggerUrl;
    console.log('WS URL:', wsUrl);

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    // Scroll to #society
    await sendCommand('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('society');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });

    // Wait 500ms
    await new Promise(r => setTimeout(r, 800));

    // Capture screenshot
    const screenshotRes = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });

    const buffer = Buffer.from(screenshotRes.data, 'base64');
    const outFile = path.join(screenshotsDir, 'homepage-society-section.png');
    fs.writeFileSync(outFile, buffer);
    console.log('Captured homepage-society-section.png successfully!');

    ws.close();
  } finally {
    edgeProc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

run().catch(console.error);
