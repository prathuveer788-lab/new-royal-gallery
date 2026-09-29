const fs = require('fs');
const path = require('path');

const INVENTORY_FILE = path.join(__dirname, '../data/media-inventory.json');
const DATA_FILE = path.join(__dirname, '../lib/membership/private-world-data.ts');

function updatePrivateWorldData() {
  if (!fs.existsSync(INVENTORY_FILE)) {
    console.error('Inventory file not found:', INVENTORY_FILE);
    return;
  }

  const inventory = JSON.parse(fs.readFileSync(INVENTORY_FILE, 'utf8'));
  console.log(`Loaded ${inventory.length} media records from inventory.`);

  // Group inventory by storyId
  const byStory = {};
  inventory.forEach(item => {
    if (!byStory[item.storyId]) byStory[item.storyId] = [];
    byStory[item.storyId].push(item);
  });

  let fileContent = fs.readFileSync(DATA_FILE, 'utf8');

  let updatedCount = 0;

  for (const storyId in byStory) {
    const images = byStory[storyId];
    if (!images || images.length === 0) continue;

    console.log(`Updating story "${storyId}" with ${images.length} images...`);

    // Find the story block in fileContent
    const storyIdRegex = new RegExp(`id:\\s*"${storyId}",[\\s\\S]*?relatedStoryIds:`, 'm');
    const match = storyIdRegex.exec(fileContent);

    if (match) {
      let block = match[0];

      // Replace heroImage
      if (images[0]) {
        block = block.replace(
          /heroImage:\s*"[^"]*"/,
          `heroImage: "${images[0].filePath}"`
        );
      }

      // Replace secondaryImage
      if (images[1]) {
        block = block.replace(
          /secondaryImage:\s*"[^"]*"/,
          `secondaryImage: "${images[1].filePath}"`
        );
      }

      // Add or update galleryImages
      const galleryPaths = images.map(img => `"${img.filePath}"`).join(', ');
      if (block.includes('galleryImages:')) {
        block = block.replace(/galleryImages:\s*\[[^\]]*\]/, `galleryImages: [${galleryPaths}]`);
      } else {
        block = block.replace(
          /(secondaryImage:\s*"[^"]*",)/,
          `$1\n        galleryImages: [${galleryPaths}],`
        );
      }

      // Replace narrative images
      let narrativeImgIdx = 2;
      block = block.replace(/image:\s*"[^"]*"/g, (imgMatch) => {
        if (narrativeImgIdx < images.length) {
          const replacement = `image: "${images[narrativeImgIdx].filePath}"`;
          narrativeImgIdx++;
          return replacement;
        } else if (images.length > 0) {
          // If narrative has more slots, use the next available or wrap around without reusing identical slots
          const chosen = images[narrativeImgIdx % images.length];
          narrativeImgIdx++;
          return `image: "${chosen.filePath}"`;
        }
        return imgMatch;
      });

      // Update captions if possible
      let captionIdx = 2;
      block = block.replace(/caption:\s*"[^"]*"/g, (capMatch) => {
        if (captionIdx < images.length && images[captionIdx]?.subject) {
          const cap = images[captionIdx].subject.replace(/"/g, "'").slice(0, 100);
          captionIdx++;
          return `caption: "${cap}"`;
        }
        return capMatch;
      });

      fileContent = fileContent.replace(match[0], block);
      updatedCount++;
    } else {
      console.warn(`Could not find story block for "${storyId}"`);
    }
  }

  // Also update book chapters and room hotspots if applicable
  // For book chapters
  const bookStories = [
    "book-chronicles-palace-architecture",
    "book-imperial-cartier-archive",
    "book-great-dining-rooms-europe",
    "book-coachbuilt-aristocracy"
  ];

  bookStories.forEach(bId => {
    const imgs = byStory[bId];
    if (imgs && imgs.length > 0) {
      const bRegex = new RegExp(`id:\\s*"${bId}",[\\s\\S]*?bookChapters:\\s*\\[([\\s\\S]*?)\\]\\s*,\\s*timelineData:`, 'm');
      const bMatch = bRegex.exec(fileContent);
      if (bMatch) {
        let chapterBlock = bMatch[1];
        let chIdx = 0;
        chapterBlock = chapterBlock.replace(/image:\s*"[^"]*"/g, () => {
          const chosen = imgs[chIdx % imgs.length];
          chIdx++;
          return `image: "${chosen.filePath}"`;
        });
        fileContent = fileContent.replace(bMatch[1], chapterBlock);
      }
    }
  });

  // Also update accentHero of each world if available
  const worldHeroMap = {
    timeline: byStory["timeline-versailles-hall-of-mirrors-1684"]?.[0]?.filePath,
    vault: byStory["vault-patiala-necklace"]?.[0]?.filePath,
    table: byStory["table-buckingham-state-banquet"]?.[0]?.filePath,
    object: byStory["object-vladimir-tiara"]?.[0]?.filePath,
    automobile: byStory["automobile-rolls-royce-phantom-of-love"]?.[0]?.filePath,
    palace: byStory["palace-one-night-at-devshree"]?.[0]?.filePath,
    book: byStory["book-imperial-cartier-archive"]?.[0]?.filePath,
    portrait: byStory["portrait-duke-of-richmond"]?.[0]?.filePath,
    room: byStory["room-haddon-hall"]?.[0]?.filePath,
    maps: byStory["maps-1857-dak-bungalow-route"]?.[0]?.filePath,
  };

  for (const [wId, heroPath] of Object.entries(worldHeroMap)) {
    if (heroPath) {
      const wRegex = new RegExp(`id:\\s*"${wId}",[\\s\\S]*?accentHero:\\s*"[^"]*"`, 'm');
      const wMatch = wRegex.exec(fileContent);
      if (wMatch) {
        const updated = wMatch[0].replace(/accentHero:\s*"[^"]*"/, `accentHero: "${heroPath}"`);
        fileContent = fileContent.replace(wMatch[0], updated);
      }
    }
  }

  fs.writeFileSync(DATA_FILE, fileContent, 'utf8');
  console.log(`Successfully updated ${updatedCount} stories and world accent heroes in private-world-data.ts!`);
}

if (require.main === module) {
  updatePrivateWorldData();
}

module.exports = { updatePrivateWorldData };
