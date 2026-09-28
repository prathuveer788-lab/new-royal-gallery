const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const screenshotsDir = 'C:\\Royals-Gallery\\screenshots';

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

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

function captureWithCDP(url, windowWidth, windowHeight, outputFile, scrollSelector = null, port = 9222, delay = 3000) {
  return new Promise(async (resolve, reject) => {
    const tempDir = path.join(process.env.TEMP, `edge-cdp-${port}-${Date.now()}`);

    const edgeProc = spawn(edgePath, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${tempDir}`,
      `--window-size=${windowWidth},${windowHeight}`,
      url,
    ]);

    // Wait for edge to start
    await new Promise(r => setTimeout(r, 3000));

    try {
      const targets = await getJson(`http://127.0.0.1:${port}/json/list`);
      const pageTarget = targets.find(t => t.type === 'page');
      if (!pageTarget) throw new Error('No page target found');

      const wsUrl = pageTarget.webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);

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

      // Emulate viewport
      await sendCommand('Emulation.setDeviceMetricsOverride', {
        width: windowWidth,
        height: windowHeight,
        deviceScaleFactor: 1,
        mobile: windowWidth < 768,
      });

      if (scrollSelector) {
        await sendCommand('Runtime.evaluate', {
          expression: `
            const el = document.querySelector('${scrollSelector}');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          `,
        });
      }

      // Wait for image decoding & render
      await new Promise(r => setTimeout(r, delay));

      // Capture screenshot
      const screenshotRes = await sendCommand('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });

      const buffer = Buffer.from(screenshotRes.data, 'base64');
      fs.writeFileSync(outputFile, buffer);
      console.log(`Saved screenshot: ${outputFile} (${windowWidth}x${windowHeight})`);

      ws.close();
      resolve(outputFile);
    } catch (err) {
      reject(err);
    } finally {
      edgeProc.kill();
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
    }
  });
}

async function main() {
  console.log('1. Capturing desktop profile at 1440px...');
  await captureWithCDP(
    'http://localhost:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty',
    1440,
    900,
    path.join(screenshotsDir, 'shivanjali-desktop-1440px.png'),
    null,
    9222,
    3000
  );

  await new Promise(r => setTimeout(r, 1000));

  console.log('2. Capturing mobile profile at 375px...');
  await captureWithCDP(
    'http://localhost:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty',
    375,
    812,
    path.join(screenshotsDir, 'shivanjali-mobile-375px.png'),
    null,
    9225,
    3000
  );

  await new Promise(r => setTimeout(r, 1000));

  console.log('3. Capturing updated Homepage Society section...');
  await captureWithCDP(
    'http://localhost:3000/',
    1440,
    960,
    path.join(screenshotsDir, 'homepage-society-section.png'),
    '#society',
    9228,
    3000
  );

  console.log('All screenshots captured successfully!');
}

main().catch(console.error);
