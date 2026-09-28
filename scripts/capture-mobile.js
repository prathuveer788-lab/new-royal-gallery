const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputFile = 'C:\\Royals-Gallery\\screenshots\\shivanjali-mobile-375px.png';

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

async function capture() {
  const port = 9235;
  const tempDir = path.join(process.env.TEMP, `edge-cdp-mobile-${Date.now()}`);

  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
    '--window-size=375,812',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const targets = await getJson(`http://127.0.0.1:${port}/json/list`);
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) throw new Error('No page target found');

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let msgId = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resCmd) => {
        const id = msgId++;
        const handler = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            resCmd(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await sendCommand('Page.enable');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });

    // Navigate to page
    await sendCommand('Page.navigate', {
      url: 'http://127.0.0.1:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty'
    });

    // Wait 3.5s for load and fonts
    await new Promise(r => setTimeout(r, 4000));

    const screenshotRes = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    fs.writeFileSync(outputFile, Buffer.from(screenshotRes.data, 'base64'));
    console.log('Successfully captured shivanjali-mobile-375px.png');
    ws.close();
  } finally {
    edgeProc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

capture().catch(console.error);
