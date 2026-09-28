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
  const port = 9250;
  const tempDir = path.join(process.env.TEMP, `edge-mobile-top-${Date.now()}`);

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
      deviceScaleFactor: 1,
      mobile: true,
    });

    await sendCommand('Page.navigate', {
      url: 'http://127.0.0.1:3000/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty'
    });

    // Wait 3.5s for page to load completely
    await new Promise(r => setTimeout(r, 3500));

    // Force scroll to top (0, 0)
    const scrollEval = await sendCommand('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, 0);
        ({
          scrollY: window.scrollY,
          title: document.title,
          h1: document.querySelector('h1')?.innerText,
          heroImg: document.querySelector('header img')?.src
        })
      `,
      returnByValue: true
    });
    console.log('Scroll eval:', scrollEval.result.value);

    await new Promise(r => setTimeout(r, 1000));

    // Capture screenshot at top
    const screenshotRes = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 375,
        height: 812,
        scale: 1
      },
      captureBeyondViewport: false,
    });

    fs.writeFileSync(outputFile, Buffer.from(screenshotRes.data, 'base64'));
    console.log('Screenshot saved to:', outputFile);

    ws.close();
  } finally {
    edgeProc.kill();
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

capture().catch(console.error);
