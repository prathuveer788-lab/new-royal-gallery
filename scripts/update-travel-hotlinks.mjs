import fs from "node:fs";

const REPLACEMENTS = [
  {
    slug: "umaid-bhawan-palace-jodhpur",
    from: "https://upload.wikimedia.org/wikipedia/commons/9/99/Umaid_Bhawan_Palace%2C_Jodhpur.jpg",
    to: "/images/experiences/01-umaid-bhawan-palace-jodhpur/01-hero.webp",
  },
  {
    slug: "taj-lake-palace-udaipur",
    from: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Lake_Palace%2C_Lake_Pichola%2C_Udaipur.jpg",
    to: "/images/experiences/03-taj-lake-palace-udaipur/01-hero.webp",
  },
  {
    slug: "shiv-niwas-palace-udaipur",
    from: "https://upload.wikimedia.org/wikipedia/commons/3/38/Mor_chowk%2C_City_Palace%2C_Udaipur.jpg",
    to: "/images/experiences/05-shiv-niwas-palace-udaipur/04-mor-chowk.webp",
  },
  {
    slug: "fateh-prakash-palace-udaipur",
    from: "https://upload.wikimedia.org/wikipedia/commons/4/43/Durbar_Hall%2C_Fateh_Prakash_Palace_Hotel%2C_Udaipur.jpg",
    to: "/images/experiences/06-fateh-prakash-palace-udaipur/01-durbar-hall.webp",
  },
  {
    slug: "samode-palace-jaipur",
    from: "https://upload.wikimedia.org/wikipedia/commons/5/53/Samode_Palace_Jaipur.jpg",
    to: "/images/experiences/07-samode-palace-jaipur/01-hero.webp",
  },
  {
    slug: "samode-haveli-jaipur",
    from: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Samode_Haveli_Jaipur.jpg",
    to: "/images/experiences/08-samode-haveli-jaipur/01-courtyard.webp",
  },
  {
    slug: "raas-jodhpur",
    from: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Glorious_Mehrangarh_Fort.jpg",
    to: "/images/experiences/09-raas-jodhpur/01-mehrangarh-fort.webp",
  },
  {
    slug: "ahilya-fort-maheshwar",
    from: "https://upload.wikimedia.org/wikipedia/commons/6/62/Ahilya_fort_%2C_Maheshwar.jpg",
    to: "/images/experiences/14-ahilya-fort-maheshwar/01-hero.webp",
  },
  {
    slug: "falaknuma-palace-hyderabad",
    from: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Falaknuma_Palace_01.jpg",
    to: "/images/experiences/15-falaknuma-palace-hyderabad/01-hero.webp",
  },
  {
    slug: "lalgarh-palace-bikaner",
    from: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Lalgarh_palace_in_Bikaner_during_sunset.jpg",
    to: "/images/experiences/16-lalgarh-palace-bikaner/01-hero.webp",
  },
  {
    slug: "gajner-palace-bikaner",
    from: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Gajner_Palace_-_panoramio.jpg",
    to: "/images/experiences/17-gajner-palace-bikaner/01-hero.webp",
  },
  {
    slug: "neemrana-fort-palace",
    from: "https://upload.wikimedia.org/wikipedia/commons/1/17/Neemrana_Fort_Palace.jpg",
    to: "/images/experiences/19-neemrana-fort-palace/01-hero.webp",
  },
  {
    slug: "luxury-hotel-marketing-india-hnw-travellers",
    from: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Lake_Palace%2C_Lake_Pichola%2C_Udaipur.jpg",
    to: "/images/experiences/03-taj-lake-palace-udaipur/01-hero.webp",
  },
];

let content = fs.readFileSync("lib/travel-articles.ts", "utf8");
let count = 0;

for (const r of REPLACEMENTS) {
  if (content.includes(r.from)) {
    content = content.replace(r.from, r.to);
    count++;
    console.log(`Updated ${r.slug} -> ${r.to}`);
  } else {
    console.warn(`Could not find ${r.from} in lib/travel-articles.ts`);
  }
}

fs.writeFileSync("lib/travel-articles.ts", content, "utf8");
console.log(`Successfully replaced ${count} remote hotlinks in lib/travel-articles.ts!`);
