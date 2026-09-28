import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import fg from "fast-glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

// Laplacian kernel for sharpness / blur detection
const laplacianKernel = {
  width: 3,
  height: 3,
  kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0],
};

async function computeLaplacianVariance(filePath) {
  try {
    const { data, info } = await sharp(filePath)
      .greyscale()
      .convolve(laplacianKernel)
      .raw()
      .toBuffer({ resolveWithObject: true });

    let sum = 0;
    let sumSq = 0;
    const n = data.length;
    for (let i = 0; i < n; i++) {
      const val = data[i];
      sum += val;
      sumSq += val * val;
    }
    const mean = sum / n;
    const variance = (sumSq / n) - (mean * mean);
    return Math.round(variance);
  } catch {
    return null;
  }
}

async function getImageMetadata(imgSrc) {
  let localPath = null;
  let isRemote = false;

  if (imgSrc.startsWith("http://") || imgSrc.startsWith("https://")) {
    isRemote = true;
  } else if (imgSrc.startsWith("/")) {
    localPath = path.join(publicDir, imgSrc.slice(1));
  } else {
    localPath = path.join(publicDir, imgSrc);
    if (!fs.existsSync(localPath) && fs.existsSync(path.join(publicDir, "images", imgSrc))) {
      localPath = path.join(publicDir, "images", imgSrc);
    }
  }

  if (isRemote) {
    return {
      exists: false,
      isRemote: true,
      url: imgSrc,
      width: null,
      height: null,
      sizeBytes: null,
      format: null,
      space: null,
      sharpness: null,
    };
  }

  if (!fs.existsSync(localPath)) {
    return {
      exists: false,
      isRemote: false,
      localPath,
      width: null,
      height: null,
      sizeBytes: null,
      format: null,
      space: null,
      sharpness: null,
    };
  }

  try {
    const stat = fs.statSync(localPath);
    const meta = await sharp(localPath).metadata();
    const sharpness = await computeLaplacianVariance(localPath);

    return {
      exists: true,
      isRemote: false,
      localPath,
      width: meta.width || null,
      height: meta.height || null,
      sizeBytes: stat.size,
      format: meta.format || null,
      space: meta.space || null,
      hasProfile: !!meta.icc,
      sharpness,
    };
  } catch (err) {
    return {
      exists: true,
      isRemote: false,
      localPath,
      error: err.message,
      width: null,
      height: null,
      sizeBytes: null,
      format: null,
      space: null,
      sharpness: null,
    };
  }
}

// Check filename patterns
function checkFilenameIssues(src) {
  const base = path.basename(src).toLowerCase();
  const genericPatterns = [
    { pattern: /vectorezy|vecteezy/, label: "Vecteezy stock filename" },
    { pattern: /freepik/, label: "Freepik stock filename" },
    { pattern: /shutterstock/, label: "Shutterstock stock filename" },
    { pattern: /\(1\)/, label: "Duplicate download suffix (1)" },
    { pattern: /chatgpt/, label: "AI generated filename" },
    { pattern: /^image[\s_-]?\d+/i, label: "Generic camera/download name" },
    { pattern: /^images\s*\(\d+\)/i, label: "Browser thumbnail download name" },
  ];

  for (const p of genericPatterns) {
    if (p.pattern.test(base)) return p.label;
  }
  return null;
}

// Find all code references
async function scanCodebase() {
  const references = [];

  // 1. Scan components and pages for next/image and img tags
  const codeFiles = await fg(["app/**/*.{tsx,ts,jsx,js}", "components/**/*.{tsx,ts,jsx,js}"], {
    cwd: rootDir,
    absolute: true,
  });

  for (const file of codeFiles) {
    const relFile = path.relative(rootDir, file).replace(/\\/g, "/");
    const content = fs.readFileSync(file, "utf8");

    // Match src="..." or src={`...`}
    const srcRegex = /(?:src|heroImage|heroBg|image|backgroundImage):\s*["'`]([^"'`]+)["'`]|(?:src|href)=["'`]([^"'`]+\.(?:jpg|jpeg|png|webp|avif|svg))["'`]/gi;
    let match;
    while ((match = srcRegex.exec(content)) !== null) {
      const src = match[1] || match[2];
      if (src && !src.startsWith("data:") && !src.startsWith("#")) {
        // determine slot from file/context
        let slot = "content";
        if (/hero/i.test(match[0]) || /hero/i.test(content.slice(Math.max(0, match.index - 100), match.index + 100))) {
          slot = "hero";
        } else if (/card|grid|tile/i.test(content.slice(Math.max(0, match.index - 80), match.index + 80))) {
          slot = "card";
        } else if (/thumb|avatar/i.test(content.slice(Math.max(0, match.index - 80), match.index + 80))) {
          slot = "thumb";
        }

        references.push({
          src: src.trim(),
          sourceFile: relFile,
          slot,
          type: "component",
        });
      }
    }
  }

  // 2. Scan content registry files (lib/*-articles.ts and lib/content/*.ts)
  const contentFiles = await fg(["lib/**/*articles*.ts", "lib/content/**/*.ts", "lib/editorial/**/*.ts"], {
    cwd: rootDir,
    absolute: true,
  });

  for (const file of contentFiles) {
    const relFile = path.relative(rootDir, file).replace(/\\/g, "/");
    const content = fs.readFileSync(file, "utf8");

    // Extract article objects
    const imgPropRegex = /(?:heroImage|image|src):\s*["']([^"']+\.(?:jpg|jpeg|png|webp|avif))["']/gi;
    let match;
    while ((match = imgPropRegex.exec(content)) !== null) {
      const src = match[1];
      const isHero = /heroImage/i.test(match[0]);
      references.push({
        src: src.trim(),
        sourceFile: relFile,
        slot: isHero ? "hero" : "content-wide",
        type: "article-data",
      });
    }
  }

  // 3. Scan public/images directly to find untracked/unreferenced assets
  const publicImages = await fg(["public/images/**/*.{jpg,jpeg,png,webp,avif}", "public/assets/images/**/*.{jpg,jpeg,png,webp,avif}"], {
    cwd: rootDir,
    absolute: true,
  });

  const knownSrcs = new Set(references.map((r) => r.src.replace(/^\//, "")));

  for (const imgPath of publicImages) {
    const relToPublic = path.relative(publicDir, imgPath).replace(/\\/g, "/");
    if (!knownSrcs.has(relToPublic) && !knownSrcs.has("/" + relToPublic)) {
      references.push({
        src: "/" + relToPublic,
        sourceFile: "public-directory",
        slot: "unreferenced-or-static",
        type: "static-file",
      });
    }
  }

  return references;
}

async function runAudit() {
  console.log("Starting Phase 1 Image Audit...");
  const rawRefs = await scanCodebase();
  console.log(`Found ${rawRefs.length} raw image references.`);

  // Deduplicate by src + slot + sourceFile
  const uniqueMap = new Map();
  for (const ref of rawRefs) {
    const key = `${ref.src}::${ref.slot}::${ref.sourceFile}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, ref);
    }
  }

  const items = Array.from(uniqueMap.values());
  console.log(`Auditing ${items.length} unique image usage instances...`);

  const auditResults = [];

  for (const item of items) {
    const meta = await getImageMetadata(item.src);

    // Maximum rendered CSS width estimation
    let renderedWidth = 600;
    if (item.slot === "hero") renderedWidth = 1920;
    else if (item.slot === "content-wide" || item.slot === "wide") renderedWidth = 1200;
    else if (item.slot === "card") renderedWidth = 500;
    else if (item.slot === "thumb") renderedWidth = 200;
    else renderedWidth = 700;

    const requiredWidth = renderedWidth * 2; // retina 2x
    const intrinsicWidth = meta.width || 0;
    const longEdge = Math.max(meta.width || 0, meta.height || 0);
    const ratio = requiredWidth > 0 ? (intrinsicWidth / requiredWidth).toFixed(2) : "0";

    const issues = [];

    // Check editor-supplied exceptions
    const isEditorSupplied =
      /balmoral/i.test(item.src) ||
      /aaliya-sultana-babi/i.test(item.src) ||
      /shivanjali/i.test(item.src) ||
      /editorial-supplied/i.test(item.src);

    // Stock filename check
    const stockIssue = checkFilenameIssues(item.src);
    if (stockIssue) issues.push(stockIssue);

    // Remote hotlink check
    if (meta.isRemote) {
      issues.push("Remote URL hotlink (should be downloaded locally)");
    }

    if (!meta.exists && !meta.isRemote) {
      issues.push("File not found on disk");
    }

    // Ratio / Resolution check
    if (meta.exists) {
      if (parseFloat(ratio) < 1.0) {
        issues.push(`Resolution deficit: ratio ${ratio} < 1.0 (upscaled on retina)`);
      }
      if (item.slot === "hero" && longEdge < 2400) {
        issues.push(`Hero long edge ${longEdge}px < 2400px minimum`);
      } else if (item.slot === "content-wide" && longEdge < 1600) {
        issues.push(`Wide image long edge ${longEdge}px < 1600px minimum`);
      }

      // Color profile check
      if (meta.space && meta.space !== "srgb") {
        issues.push(`Non-sRGB colour space (${meta.space})`);
      }

      // Sharpness check
      if (meta.sharpness !== null && meta.sharpness < 60) {
        issues.push(`Low Laplacian sharpness variance (${meta.sharpness}) - potential blur`);
      }
    }

    // Determine status
    let status = "KEEP";
    if (isEditorSupplied) {
      status = "KEPT-EDITORIAL";
    } else if (
      !meta.exists ||
      meta.isRemote ||
      stockIssue ||
      parseFloat(ratio) < 0.8 ||
      (item.slot === "hero" && longEdge < 2000)
    ) {
      status = "REPLACE";
    } else if (issues.length > 0) {
      status = "FIX-RENDER";
    }

    auditResults.push({
      src: item.src,
      sourceFile: item.sourceFile,
      slot: item.slot,
      exists: meta.exists,
      isRemote: meta.isRemote,
      intrinsicPx: meta.exists ? `${meta.width}x${meta.height}` : "N/A",
      sizeKb: meta.sizeBytes ? (meta.sizeBytes / 1024).toFixed(1) + " KB" : "N/A",
      format: meta.format || "N/A",
      colorSpace: meta.space || "N/A",
      sharpness: meta.sharpness !== null ? meta.sharpness : "N/A",
      renderedWidth: `${renderedWidth}px`,
      requiredWidth: `${requiredWidth}px`,
      ratio,
      issues: issues.join("; ") || "None",
      status,
      isEditorSupplied,
    });
  }

  // Generate outputs
  generateMarkdownReport(auditResults);
  generateCsvReport(auditResults);
  generateContactSheet(auditResults);
  console.log("Audit complete! Artifacts generated: IMAGE_AUDIT.md, image-audit.csv, image-audit-contact.html");
}

function generateMarkdownReport(results) {
  const replaceCount = results.filter((r) => r.status === "REPLACE").length;
  const fixRenderCount = results.filter((r) => r.status === "FIX-RENDER").length;
  const keepCount = results.filter((r) => r.status === "KEEP").length;
  const keptEditorialCount = results.filter((r) => r.status === "KEPT-EDITORIAL").length;

  let md = `# THE ROYAL GALLERYS — Comprehensive Site-wide Image Audit\n\n`;
  md += `**Date:** 28 September 2026  \n`;
  md += `**Total Images Audited:** ${results.length}  \n`;
  md += `**Status Summary:**\n`;
  md += `- 🔴 **REPLACE:** ${replaceCount} images (resolution deficit, generic stock filename, remote hotlinks, or low quality)\n`;
  md += `- 🟡 **FIX-RENDER:** ${fixRenderCount} images (good intrinsic image, needs pipeline/sizes/focal crop fixes)\n`;
  md += `- 🟢 **KEEP:** ${keepCount} images (verified high-res, authentic)\n`;
  md += `- 🔵 **KEPT-EDITORIAL:** ${keptEditorialCount} images (editor-supplied archives, e.g. Balmoral, Aaliya Sultana Babi)\n\n`;

  md += `---\n\n## 1. Critical Replacement Targets (Known Homepage & Key Articles)\n\n`;
  md += `| File / Source | Slot / Page | Intrinsic Px | Ratio | Issues | Action |\n`;
  md += `|---|---|---|---|---|---|\n`;

  for (const r of results.filter((r) => r.status === "REPLACE").slice(0, 30)) {
    md += `| \`${path.basename(r.src)}\` | \`${r.sourceFile}\` (${r.slot}) | ${r.intrinsicPx} | ${r.ratio} | ${r.issues} | **REPLACE** |\n`;
  }

  md += `\n---\n\n## 2. Editor-Supplied Features (Protected per Ground Rule 4)\n\n`;
  md += `| File / Subject | Source Context | Dimensions | Status |\n`;
  md += `|---|---|---|---|\n`;
  for (const r of results.filter((r) => r.status === "KEPT-EDITORIAL")) {
    md += `| \`${path.basename(r.src)}\` | \`${r.sourceFile}\` | ${r.intrinsicPx} | **KEPT-EDITORIAL** (Do not replace) |\n`;
  }

  md += `\n---\n\n## 3. Full Audit Table\n\n`;
  md += `| Page / File | Slot | Intrinsic | Required (2x) | Ratio | Sharpness | Status | Issues |\n`;
  md += `|---|---|---|---|---|---|---|---|\n`;

  for (const r of results) {
    const badge = r.status === "REPLACE" ? "🔴 REPLACE" : r.status === "FIX-RENDER" ? "🟡 FIX-RENDER" : r.status === "KEPT-EDITORIAL" ? "🔵 KEPT-EDITORIAL" : "🟢 KEEP";
    md += `| \`${path.basename(r.src)}\`<br>_(${r.sourceFile})_ | ${r.slot} | ${r.intrinsicPx} | ${r.requiredWidth} | ${r.ratio} | ${r.sharpness} | ${badge} | ${r.issues} |\n`;
  }

  fs.writeFileSync(path.join(rootDir, "IMAGE_AUDIT.md"), md, "utf8");
}

function generateCsvReport(results) {
  let csv = "page,slot,file,intrinsic_px,required_px,ratio,sharpness,issues,status,is_editor_supplied\n";
  for (const r of results) {
    const cleanIssues = `"${r.issues.replace(/"/g, '""')}"`;
    const cleanFile = `"${r.src.replace(/"/g, '""')}"`;
    const cleanPage = `"${r.sourceFile.replace(/"/g, '""')}"`;
    csv += `${cleanPage},${r.slot},${cleanFile},${r.intrinsicPx},${r.requiredWidth},${r.ratio},${r.sharpness},${cleanIssues},${r.status},${r.isEditorSupplied}\n`;
  }
  fs.writeFileSync(path.join(rootDir, "image-audit.csv"), csv, "utf8");
}

function generateContactSheet(results) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Royal Gallerys — Image Audit Contact Sheet</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #121212; color: #E0E0E0; margin: 0; padding: 24px; }
    h1 { font-family: Georgia, serif; color: #FAF8F4; font-size: 28px; margin-bottom: 8px; }
    .subtitle { color: #8A7352; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; }
    .stats { display: flex; gap: 16px; margin-bottom: 24px; }
    .stat-pill { padding: 8px 16px; border-radius: 4px; font-size: 13px; font-weight: 600; }
    .pill-replace { background: #5c1d1d; color: #ff9999; }
    .pill-fix { background: #5c4d1d; color: #ffe699; }
    .pill-keep { background: #1d5c2d; color: #99ffaa; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .card { background: #1E1E1E; border: 1px solid #333; border-radius: 6px; overflow: hidden; display: flex; flex-col; }
    .thumb-wrap { width: 100%; height: 180px; background: #0A0A0A; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
    .thumb-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .meta { padding: 12px; font-size: 11px; line-height: 1.5; color: #AAA; }
    .meta strong { color: #FFF; word-break: break-all; }
    .badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px; }
    .badge-REPLACE { background: #D32F2F; color: #FFF; }
    .badge-FIX-RENDER { background: #F57C00; color: #FFF; }
    .badge-KEEP { background: #388E3C; color: #FFF; }
    .badge-KEPT-EDITORIAL { background: #1976D2; color: #FFF; }
  </style>
</head>
<body>
  <h1>The Royal Gallerys — Image Quality Audit Contact Sheet</h1>
  <div class="subtitle">Auditing ${results.length} visual assets across theroyalgallerys.com</div>
  <div class="stats">
    <div class="stat-pill pill-replace">REPLACE: ${results.filter(r => r.status === "REPLACE").length}</div>
    <div class="stat-pill pill-fix">FIX-RENDER: ${results.filter(r => r.status === "FIX-RENDER").length}</div>
    <div class="stat-pill pill-keep">KEEP: ${results.filter(r => r.status === "KEEP").length}</div>
  </div>
  <div class="grid">
`;

  for (const r of results) {
    const isRemote = r.isRemote;
    const imgSrc = isRemote ? r.src : r.src.startsWith("/") ? r.src : "/" + r.src;
    html += `
    <div class="card">
      <div class="thumb-wrap">
        <img src="${imgSrc}" alt="${path.basename(r.src)}" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><text x=\\'10\\' y=\\'50\\' fill=\\'%23666\\'>Error</text></svg>'">
      </div>
      <div class="meta">
        <span class="badge badge-${r.status}">${r.status}</span><br>
        <strong>${path.basename(r.src)}</strong><br>
        <span>Slot: ${r.slot}</span><br>
        <span>Intrinsic: ${r.intrinsicPx} | Ratio: ${r.ratio}</span><br>
        <span>Sharpness: ${r.sharpness}</span><br>
        <span>File: ${r.sourceFile}</span><br>
        <span style="color: ${r.issues === 'None' ? '#8BC34A' : '#EF5350'}">${r.issues}</span>
      </div>
    </div>
`;
  }

  html += `
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(rootDir, "image-audit-contact.html"), html, "utf8");
}

runAudit().catch(console.error);
