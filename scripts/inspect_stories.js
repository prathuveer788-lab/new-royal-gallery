const fs = require('fs');

const content = fs.readFileSync('lib/membership/private-world-data.ts', 'utf8');

// Regex to capture story id, title, heroImage, secondaryImage, narrative images, etc.
const storyRegex = /id:\s*"([^"]+)",\s*worldId:\s*"([^"]+)",\s*worldTitle:\s*"([^"]+)",\s*worldNumber:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*subtitle:\s*"([^"]+)"/g;

let match;
const stories = [];
while ((match = storyRegex.exec(content)) !== null) {
  stories.push({
    id: match[1],
    worldId: match[2],
    worldTitle: match[3],
    worldNumber: match[4],
    title: match[5],
    subtitle: match[6]
  });
}

console.log(`Found ${stories.length} stories across 10 worlds:`);
stories.forEach((s, i) => {
  console.log(`${(i+1).toString().padStart(2, '0')}. [${s.worldId.toUpperCase()}] ${s.id} — "${s.title}"`);
});
