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
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function capture() {
  const port = 9245;
  const tempDir = path.join(process.env.TEMP, `edge-mobile-clean-${Date.now()}`);

  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tempDir}`,
    '--window-size=375,812',
    'http://127.0.0.1:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty'
  ]);

  await new Promise(r => setTimeout(r, 3000));

  try {
    const targets = await getJson(`http://127.0.0.1:${port}/json/list`);
    const pageTarget = targets.find(t => t.type === 'page');
    console.log('Navigated target:', pageTarget.url, pageTarget.title);

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

    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });

    // Wait 3.5s for fonts and image rendering
    await new Promise(r => setTimeout(r, 3500));

    const screenshotRes = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    fs.writeFileSync(outputFile, Buffer.from(screenshotRes.data, 'base64'));
    console.log('Mobile screenshot successfully written to:', outputFile);
    ws.close();
  } finally {
    edgeProc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

capture().catch(console.error);
