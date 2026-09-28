/**
 * Capture final mobile screenshot of Shivanjali profile page
 * Uses CDP with a completely fresh user-data-dir to avoid any caching
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputFile = 'C:\\Royals-Gallery\\screenshots\\shivanjali-mobile-375px.png';
const TARGET_URL = 'http://127.0.0.1:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty';
const DEBUG_PORT = 9260;

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function main() {
  const tempDir = path.join(os.tmpdir(), `edge-fresh-${Date.now()}`);
  console.log('Starting Edge headless on port', DEBUG_PORT);
  console.log('Temp profile:', tempDir);

  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--no-first-run',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${tempDir}`,
    '--window-size=375,812',
    'about:blank'
  ], { stdio: 'ignore' });

  // Wait for Edge to start
  await new Promise(r => setTimeout(r, 5000));

  try {
    const targets = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const page = targets.find(t => t.type === 'page');
    if (!page) throw new Error('No page target found: ' + JSON.stringify(targets));

    console.log('Connecting to:', page.webSocketDebuggerUrl);
    const ws = new WebSocket(page.webSocketDebuggerUrl);

    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = (e) => rej(new Error('WS open error: ' + e.message));
    });

    let msgId = 1;
    function cmd(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (ev) => {
          const msg = JSON.parse(ev.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await cmd('Page.enable');
    await cmd('Network.enable');
    await cmd('Network.clearBrowserCookies');
    await cmd('Network.clearBrowserCache');

    // Set mobile viewport BEFORE navigation
    await cmd('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true,
    });

    console.log('Navigating to:', TARGET_URL);
    await cmd('Page.navigate', { url: TARGET_URL });

    // Wait for page load event + extra time for fonts/images
    console.log('Waiting 5s for full load...');
    await new Promise(r => setTimeout(r, 5000));

    // Scroll to absolute top & verify page
    const info = await cmd('Runtime.evaluate', {
      expression: `
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        JSON.stringify({
          title: document.title,
          h1: document.querySelector('h1')?.textContent?.trim()?.slice(0, 60),
          url: location.href,
          scrollY: window.scrollY
        })
      `,
      returnByValue: true
    });
    console.log('Page info:', info?.result?.value);

    // Extra wait after scroll reset
    await new Promise(r => setTimeout(r, 1500));

    // Capture viewport screenshot using clip at physical pixels (DSF=2: 375*2=750, 812*2=1624)
    const shot = await cmd('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 375,
        height: 812,
        scale: 2,
      },
      captureBeyondViewport: true,
    });

    fs.writeFileSync(outputFile, Buffer.from(shot.data, 'base64'));
    console.log('✓ Saved:', outputFile);
    ws.close();
  } finally {
    edgeProc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (_) {}
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
