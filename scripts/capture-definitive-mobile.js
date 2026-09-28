/**
 * Definitive mobile screenshot:
 * 1. Loads page with CDP
 * 2. Disables sticky/fixed positioning temporarily
 * 3. Scrolls to mobile hero container
 * 4. Screenshots, then cleanup
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputFile = 'C:\\Royals-Gallery\\screenshots\\shivanjali-mobile-375px.png';
const TARGET_URL = 'http://127.0.0.1:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty';
const DEBUG_PORT = 9290;

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
    }).on('error', reject);
  });
}

async function main() {
  const tempDir = os.tmpdir() + `\\edge-def-${Date.now()}`;
  const edgeProc = spawn(edgePath, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    '--disable-extensions', '--no-first-run',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${tempDir}`,
    '--window-size=390,844',
    'about:blank'
  ], { stdio: 'ignore' });

  await new Promise(r => setTimeout(r, 5000));

  try {
    const targets = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const page = targets.find(t => t.type === 'page');
    if (!page) throw new Error('No page target');

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

    let msgId = 1;
    const cmd = (method, params = {}) => new Promise(resolve => {
      const id = msgId++;
      const h = ev => { const m = JSON.parse(ev.data); if (m.id === id) { ws.removeEventListener('message', h); resolve(m.result); } };
      ws.addEventListener('message', h);
      ws.send(JSON.stringify({ id, method, params }));
    });

    await cmd('Page.enable');
    // Mobile emulation
    await cmd('Emulation.setDeviceMetricsOverride', {
      width: 390, height: 844, deviceScaleFactor: 1, mobile: true,
    });

    await cmd('Page.navigate', { url: TARGET_URL });
    console.log('Waiting 7s for full load + hydration...');
    await new Promise(r => setTimeout(r, 7000));

    // Step 1: Inject CSS to kill ALL sticky/fixed elements except nav
    await cmd('Runtime.evaluate', {
      expression: `
        (function() {
          const style = document.createElement('style');
          style.id = '__screenshot-fix__';
          style.textContent = \`
            /* Flatten sticky scroll sequences for screenshot */
            [class*="sticky"] { position: relative !important; }
            .sticky { position: relative !important; }
          \`;
          document.head.appendChild(style);
        })();
      `
    });

    // Step 2: Scroll to mobile hero image container
    const info = await cmd('Runtime.evaluate', {
      expression: `
        (function() {
          window.scrollTo(0, 0);
          const mobileHero = document.querySelector('header[aria-label="Profile Hero Banner"] .block');
          const imgBox = mobileHero ? mobileHero.querySelector('.aspect-\\\\[4\\\\/5\\\\]') : null;
          if (!imgBox) {
            // fallback: find first header
            const header = document.querySelector('header');
            if (header) header.scrollIntoView({ behavior: 'instant' });
          } else {
            imgBox.scrollIntoView({ behavior: 'instant', block: 'start' });
          }
          const scrollY = window.scrollY;
          // Get what's visible
          const el = document.elementFromPoint(195, 200);
          return JSON.stringify({
            scrollY,
            visibleAt200: el ? el.tagName + '.' + [...el.classList].slice(0,3).join('.') : 'none',
          });
        })()
      `,
      returnByValue: true
    });
    console.log('After scroll:', info?.result?.value);

    await new Promise(r => setTimeout(r, 600));

    // Take screenshot
    const shot = await cmd('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outputFile, Buffer.from(shot.data, 'base64'));
    console.log('✓ Saved:', outputFile, '—', fs.statSync(outputFile).size, 'bytes');
    ws.close();
  } finally {
    edgeProc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (_) {}
  }
}

main().catch(e => { console.error(e.message); process.exit(1); });
