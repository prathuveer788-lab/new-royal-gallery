const { spawn } = require('child_process');
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
  const port = 9223;
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

  // Wait for edge debugging port
  let targets = null;
  for (let i = 0; i < 20; i++) {
    try {
      targets = await getJson(`http://127.0.0.1:${port}/json/list`);
      if (targets) break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  if (!targets) throw new Error('Could not connect to Edge debugger');

  try {
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) throw new Error('No page target found');

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
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

    // Wait until document.readyState === 'complete'
    await new Promise(r => setTimeout(r, 2000));

    // Scroll through the entire page in increments to trigger all lazy images
    await sendCommand('Runtime.evaluate', {
      expression: `
        (async () => {
          for (let y = 0; y < 10000; y += 1000) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 100));
          }
        })()
      `,
      awaitPromise: true
    });

    await new Promise(r => setTimeout(r, 1500));

    // Now scroll #society directly into view
    const evalRes = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('society');
          if (!el) return { found: false };
          el.scrollIntoView({ behavior: 'instant', block: 'start' });
          const rect = el.getBoundingClientRect();
          return {
            found: true,
            top: rect.top,
            scrollY: window.scrollY,
            text: el.innerText.substring(0, 150)
          };
        })()
      `,
      returnByValue: true
    });

    const resultObj = evalRes.result && evalRes.result.value ? evalRes.result.value : evalRes.value;
    console.log('Society element in view:', resultObj);

    // Wait a moment for rendering
    await new Promise(r => setTimeout(r, 1200));

    const screenshotRes = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });
    const buffer = Buffer.from(screenshotRes.data, 'base64');
    fs.writeFileSync(path.join(screenshotsDir, 'homepage-society-section.png'), buffer);
    console.log('Successfully saved homepage-society-section.png');

    ws.close();
  } finally {
    edgeProc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

run().catch(console.error);
