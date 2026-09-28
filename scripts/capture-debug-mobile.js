/**
 * Debug + capture: get hero element bounds, then screenshot
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputFile = 'C:\\Royals-Gallery\\screenshots\\shivanjali-mobile-375px.png';
const TARGET_URL = 'http://127.0.0.1:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty';
const DEBUG_PORT = 9270;

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
    }).on('error', reject);
  });
}

async function main() {
  const tempDir = path.join(os.tmpdir(), `edge-debug-${Date.now()}`);
  const edgeProc = spawn(edgePath, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    '--disable-extensions', '--no-first-run',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${tempDir}`,
    '--window-size=375,812',
    'about:blank'
  ], { stdio: 'ignore' });

  await new Promise(r => setTimeout(r, 5000));

  try {
    const targets = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const page = targets.find(t => t.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

    let msgId = 1;
    function cmd(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (ev) => {
          const msg = JSON.parse(ev.data);
          if (msg.id === id) { ws.removeEventListener('message', handler); resolve(msg.result); }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await cmd('Page.enable');
    await cmd('Emulation.setDeviceMetricsOverride', {
      width: 375, height: 812, deviceScaleFactor: 1, mobile: true,
    });

    await cmd('Page.navigate', { url: TARGET_URL });
    console.log('Waiting 6s...');
    await new Promise(r => setTimeout(r, 6000));

    // Get DOM geometry of key elements
    const domInfo = await cmd('Runtime.evaluate', {
      expression: `
        (() => {
          window.scrollTo(0, 0);
          const header = document.querySelector('header[aria-label]');
          const mobileHero = document.querySelector('.block.md\\\\:hidden');
          const mobileImg = document.querySelector('.block.md\\\\:hidden img');
          const colourSection = document.querySelector('section[aria-label*="Colour"]');
          return JSON.stringify({
            scrollY: window.scrollY,
            viewH: window.innerHeight,
            headerRect: header ? header.getBoundingClientRect() : null,
            mobileHeroRect: mobileHero ? mobileHero.getBoundingClientRect() : null,
            mobileImgSrc: mobileImg ? mobileImg.src : null,
            mobileImgRect: mobileImg ? mobileImg.getBoundingClientRect() : null,
            colourRect: colourSection ? colourSection.getBoundingClientRect() : null,
          });
        })()
      `,
      returnByValue: true
    });
    console.log('DOM info:', domInfo?.result?.value);

    await new Promise(r => setTimeout(r, 500));

    // Simple screenshot, no clip, no deviceScaleFactor tricks
    const shot = await cmd('Page.captureScreenshot', { format: 'png' });

    fs.writeFileSync(outputFile, Buffer.from(shot.data, 'base64'));
    console.log('✓ Saved:', outputFile);
    ws.close();
  } finally {
    edgeProc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (_) {}
  }
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
