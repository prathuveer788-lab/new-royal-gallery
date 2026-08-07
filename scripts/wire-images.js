// ── Wire downloaded images into content PHOTO markers ──
// After search-dl.js downloads img-NN.webp files, this script
// updates content files to reference the actual filenames.
// Only fixes markers that reference missing files.
//
// Usage: node scripts/wire-images.js

const fs = require("fs");
const path = require("path");

const IMG_BASE = "public/images/experiences";
const CONTENT_BASE = "lib/content";

function dirToContentFile(dirName) {
  const name = dirName.replace(/^\d+-/, "");
  const exact = path.join(CONTENT_BASE, name + ".ts");
  if (fs.existsSync(exact)) return exact;
  const guide = path.join(CONTENT_BASE, name + "-travel-guide.ts");
  if (fs.existsSync(guide)) return guide;
  return null;
}

// Extract the local filename from a path like /images/experiences/21-kyoto/01-hero.webp
function localFile(imgPath) {
  const parts = imgPath.split("/");
  return parts[parts.length - 1];
}

function main() {
  const dirs = fs.readdirSync(IMG_BASE, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  let updated = 0;

  for (const dirName of dirs) {
    const imgDir = path.join(IMG_BASE, dirName);
    const allImages = fs.readdirSync(imgDir)
      .filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i))
      .sort();

    if (allImages.length === 0) {
      console.log(`${dirName}: no images, skipping`);
      continue;
    }

    const contentFile = dirToContentFile(dirName);
    if (!contentFile) {
      console.log(`${dirName}: no content file found`);
      continue;
    }

    let content = fs.readFileSync(contentFile, "utf8");
    const photoPattern = /\[\[PHOTO:(landscape|portrait|square|wide|full-width)\|([^|]+)\|([^\]]+)\]\]/g;
    const markers = [...content.matchAll(photoPattern)];

    if (markers.length === 0) {
      console.log(`${dirName}: no PHOTO markers`);
      continue;
    }

    // Identify which markers already reference existing files
    const referencedFiles = new Set();
    for (const match of markers) {
      const imgPath = match[2];
      const localName = localFile(imgPath);
      const fullPath = path.join(imgDir, localName);
      if (fs.existsSync(fullPath) && imgPath.startsWith("/images/")) {
        referencedFiles.add(localName);
      }
    }

    // Available images: all images NOT already correctly referenced
    // (so we don't reuse an already-correct image)
    let available = allImages.filter(f => !referencedFiles.has(f));
    // If no available images left, use all images (cycling)
    if (available.length === 0) available = allImages;

    let availIdx = 0;
    let replaced = 0;
    let replacedContent = content;

    for (const match of markers) {
      const [fullMatch] = match;
      const imgPath = match[2];
      const localName = localFile(imgPath);
      const fullPath = path.join(imgDir, localName);

      // Skip if the referenced file already exists on disk
      if (fs.existsSync(fullPath) && imgPath.startsWith("/images/")) {
        continue;
      }

      // Replace with next available image
      const newFile = available[availIdx % available.length];
      const newPath = `/images/experiences/${dirName}/${newFile}`;
      const newMarker = fullMatch.replace(/\|([^|]+)\|([^|]+)\|([^|]*)\]\]/, `|${newPath}|$2|$3]]`);

      replacedContent = replacedContent.replace(fullMatch, newMarker);
      console.log(`  ${path.basename(contentFile)}: ${localName} → ${newFile}`);
      replaced++;
      availIdx++;
    }

    if (replaced > 0) {
      fs.writeFileSync(contentFile, replacedContent, "utf8");
      console.log(`  ✓ Updated ${contentFile} (${replaced} markers fixed)`);
      updated++;
    } else {
      console.log(`  ${dirName}: all markers have valid files`);
    }
  }

  console.log(`\nUpdated ${updated} content files`);
}

main();
