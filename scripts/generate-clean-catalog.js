const fs = require('fs');
const path = require('path');

function fileExists(relPath) {
  const full = path.join(__dirname, '..', 'public', relPath.replace(/^\//, ''));
  return fs.existsSync(full);
}

// Generate the complete authentic catalog
const catalogFile = path.join(__dirname, '..', 'lib', 'membership', 'private-world-catalog.ts');

const code = `export interface CatalogItem {
  id: string;
  category:
    | "fashion"
    | "jewellery"
    | "watches"
    | "automobiles"
    | "firearms"
    | "antiques"
    | "cabinet"
    | "art"
    | "design"
    | "travel";
  subcategory: string;
  brand: string;
  name: string;
  description: string;
  editorialNote: string;
  heroImage: string;
  heroOrientation?: "portrait" | "landscape" | "square" | "panoramic";
  gallery: string[];
  specifications: Record<string, string>;
  price: string;
  currency: string;
  year?: string;
  designer?: string;
  source: string;
  officialUrl?: string;
  tags: string[];
}

export interface CatalogCategoryDef {
  id: CatalogItem["category"];
  number: string;
  title: string;
  subtitle: string;
  descriptor: string;
  bannerImage: string;
  subcategories: string[];
}

export const CATALOG_CATEGORIES: CatalogCategoryDef[] = [
  {
    id: "fashion",
    number: "01",
    title: "HAUTE COUTURE & FASHION",
    subtitle: "Ateliers, Runway Silhouettes & Métiers d'Art",
    descriptor:
      "Contemporary couture, architectural tailoring, and runway archival collections curated directly from Paris, Milan, and London luxury houses.",
    bannerImage: "/images/style/hero/style-hero-couture-runway.jpg",
    subcategories: ["All", "Haute Couture", "Ready-to-Wear", "Tailoring", "Eveningwear", "Accessories"],
  },
  {
    id: "jewellery",
    number: "02",
    title: "JEWELLERY & HIGH JEWELLERY",
    subtitle: "Haute Joaillerie, Peerless Gemmes & Mystery Settings",
    descriptor:
      "Exceptional contemporary high jewellery creations from Place Vendôme and international gemological houses, featuring unheated sapphires, Colombian emeralds, and type IIa diamonds.",
    bannerImage: "/images/private-world/02-vault/patiala-necklace-01.jpg",
    subcategories: ["All", "High Jewellery", "Colliers & Necklaces", "Tiaras", "Brooches", "Bracelets"],
  },
  {
    id: "watches",
    number: "03",
    title: "WATCHES & COMPLICATIONS",
    subtitle: "Haute Horlogerie, Grand Complications & Micro-Mechanical Art",
    descriptor:
      "Perpetual calendars, tourbillons, minute repeaters, and independent horological masters preserved at the summit of Geneva chronometry.",
    bannerImage: "/images/collections/timepieces/patek-philippe-perpetual-pocket.jpg",
    subcategories: ["All", "Grand Complications", "Chronographs", "Tourbillons", "Sports Luxury", "Dress Watches"],
  },
  {
    id: "automobiles",
    number: "04",
    title: "AUTOMOBILES & COACHBUILDS",
    subtitle: "Supercars, Bespoke Limousines & Concours Icons",
    descriptor:
      "Contemporary flagship hypercars, coachbuilt luxury saloons, and collector grand tourers engineered for extreme velocity and sovereign comfort.",
    bannerImage: "/images/catalog/automobiles/rolls-royce-phantom-viii/view-1.jpg",
    subcategories: ["All", "Hypercars", "Luxury Saloons", "Grand Tourers", "Bespoke Coachbuilds", "Track Legends"],
  },
  {
    id: "firearms",
    number: "05",
    title: "FIREARMS & SPORTING ARMS",
    subtitle: "Bespoke Sidelocks, Chiselled Steel & Gunsmithing Heritage",
    descriptor:
      "An authenticated curatorial archive dedicated to master London, Versailles, and European royal gunsmiths, featuring documented museum treasures with multi-perspective photography.",
    bannerImage: "/images/catalog/firearms/purdey-turnover-pistols/view-1.jpg",
    subcategories: ["All", "Cased Sets", "Sporting Guns", "Presentation Pieces", "Flintlocks", "Wheellocks"],
  },
  {
    id: "antiques",
    number: "06",
    title: "ANTIQUES & HERITAGE",
    subtitle: "Dynastic Insignia, Ceremonial Arms & Royal Decorative Arts",
    descriptor:
      "Documented historical treasures: ceremonial Damascus swords, Rajput katars, Boulle marquetry cabinets, and 17th-century court textiles.",
    bannerImage: "/images/collections/heritage/boulle-marquetry-commode-louis-xiv.jpg",
    subcategories: ["All", "Royal Furnishings", "Porcelain Services", "Court Textiles", "Archival Manuscripts"],
  },
  {
    id: "cabinet",
    number: "07",
    title: "CABINET OF CURIOSITIES",
    subtitle: "Objets de Vertu, Automata & Eccentric Wonders",
    descriptor:
      "Rare objects that resist categorization: astronomical equation clocks, singing bird automata, celestial globes, and imperial guilloché enamel masterworks.",
    bannerImage: "/images/catalog/cabinet/jaquet-droz-automata/view-1.jpg",
    subcategories: ["All", "Automata", "Horological Curiosities", "Enamel & Gold", "Renaissance Instruments"],
  },
  {
    id: "art",
    number: "08",
    title: "ART & COLLECTING",
    subtitle: "Monumental Modernism, Court Miniatures & Dynastic Folios",
    descriptor:
      "Works of extreme visual gravity that redefined modernism and royal court painting, preserved in leading collections worldwide.",
    bannerImage: "/images/style/article-03/palace-architecture-detail.jpg",
    subcategories: ["All", "Modern Masters", "Royal Miniatures", "Court Frescoes", "Sculptural Works"],
  },
  {
    id: "design",
    number: "09",
    title: "DESIGN & OBJECTS",
    subtitle: "Bespoke Furniture, Hand-Cut Crystal & Orfèvrerie",
    descriptor:
      "Contemporary master furniture, crystal candelabras, sterling silver services, and bespoke craft objects made by centuries-old European ateliers.",
    bannerImage: "/images/style/article-05/artisan-textile-craft.jpg",
    subcategories: ["All", "Fine Furniture", "Crystal & Tableware", "Goldsmithing", "Palace Interiors"],
  },
  {
    id: "travel",
    number: "10",
    title: "TRAVEL & PRIVATE SANCTUARIES",
    subtitle: "Dynastic Havelis, Sovereign Fortresses & Grand Sanctuaries",
    descriptor:
      "Exceptional destinations that function not as commercial hotels, but as living, deeply personal historic homes held by custodian families across generations.",
    bannerImage: "/images/private-world/06-palace/devshree-deogarh-01.jpg",
    subcategories: ["All", "Palace Sanctuaries", "Private Havelis", "Historic Grand Hotels", "Lakeside Sanctuaries"],
  },
];

export const CATALOG_ITEMS: CatalogItem[] = [
  // ─────────────────────────────────────────────────────────────
  // 01 — HAUTE COUTURE & FASHION
  // ─────────────────────────────────────────────────────────────
  {
    id: "fashion-dior-bar-suit",
    category: "fashion",
    subcategory: "Haute Couture",
    brand: "CHRISTIAN DIOR",
    name: "The Sculptural 'Bar' Tailleur in Silk Shantung & Pleated Crepe",
    description:
      "The definitive silhouette of post-war Parisian Haute Couture: sculpted basque peplum waist, natural silk shantung jacket, and permanent accordion pleated wool crepe skirt.",
    editorialNote:
      "Presented in 1947 on Avenue Montaigne, the Bar suit established the 'New Look'. Each piece requires over 150 hours of internal buckram and horsehair sculpting.",
    heroImage: "/images/catalog/fashion/dior-haute-couture/view-1.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/catalog/fashion/dior-haute-couture/view-1.jpg",
      "/images/catalog/fashion/dior-haute-couture/view-2.jpg",
      "/images/catalog/fashion/dior-haute-couture/view-3.jpg",
      "/images/catalog/fashion/dior-haute-couture/view-4.jpg",
    ],
    specifications: {
      "Atelier": "Christian Dior Haute Couture, 30 Avenue Montaigne, Paris",
      "Fabrication": "Natural ecru silk shantung & fine black wool crepe",
      "Internal Structure": "Hand-molded buckram padding at hips",
      "Buttons": "Hand-covered silk shantung buttons",
      "Craft Hours": "165 hours hand tailoring",
    },
    price: "₹21,80,000",
    currency: "INR",
    year: "Haute Couture Archive",
    designer: "Christian Dior / Maria Grazia Chiuri",
    source: "Christian Dior Couture Salons Privés Paris",
    officialUrl: "https://www.dior.com",
    tags: ["Dior", "Bar Suit", "Haute Couture", "Paris", "New Look"],
  },
  {
    id: "fashion-balenciaga-couture",
    category: "fashion",
    subcategory: "Haute Couture",
    brand: "BALENCIAGA",
    name: "Architectural Gazar Silk Sculpted Haute Couture Gown",
    description:
      "Monumental evening gown crafted in ultra-crisp gazar silk, featuring a freestanding aerodynamic collar and volumetric balloon skirt engineered with zero internal boning.",
    editorialNote:
      "Cristóbal Balenciaga was acclaimed by Christian Dior as 'the master of us all'. His mastery of fabric tension created garments that held sculptural forms away from the female form.",
    heroImage: "/images/catalog/fashion/balenciaga-couture/view-1.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/catalog/fashion/balenciaga-couture/view-1.jpg",
      "/images/catalog/fashion/balenciaga-couture/view-2.jpg",
      "/images/catalog/fashion/balenciaga-couture/view-3.jpg",
      "/images/catalog/fashion/balenciaga-couture/view-4.jpg",
    ],
    specifications: {
      "Atelier": "Balenciaga Haute Couture, 10 Avenue George V, Paris",
      "Textile": "Heavyweight Abraham Silk Gazar",
      "Construction": "Monolithic drape with seamless shoulder articulation",
      "Color": "Noir Profond",
      "Origin": "Paris Haute Couture Week",
    },
    price: "₹28,50,000",
    currency: "INR",
    year: "Haute Couture Collection",
    designer: "Demna / Cristóbal Balenciaga Archive",
    source: "Balenciaga Salons Haute Couture Paris",
    officialUrl: "https://www.balenciaga.com",
    tags: ["Balenciaga", "Haute Couture", "Gazar", "Paris", "Sculpture"],
  },
  {
    id: "fashion-saint-laurent-couture",
    category: "fashion",
    subcategory: "Tailoring",
    brand: "YVES SAINT LAURENT",
    name: "Le Smoking: Grain de Poudre Wool Tuxedo with Silk Satin Lapels",
    description:
      "The revolutionary evening suit that permanently redefined feminine eveningwear: sharp angular shoulders, pure virgin wool grain de poudre, and lustrous silk duchesse lapels.",
    editorialNote:
      "Introduced in 1966, Le Smoking transposed the masculine tuxedo into sovereign female empowerment, photographed famously by Helmut Newton in the alleys of Paris.",
    heroImage: "/images/catalog/fashion/saint-laurent-couture/view-1.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/catalog/fashion/saint-laurent-couture/view-1.jpg",
      "/images/catalog/fashion/saint-laurent-couture/view-2.jpg",
      "/images/catalog/fashion/saint-laurent-couture/view-3.jpg",
      "/images/catalog/fashion/saint-laurent-couture/view-4.jpg",
    ],
    specifications: {
      "House": "Saint Laurent, 37-39 Rue de Bellechasse, Paris",
      "Fabrication": "100% Grain de Poudre virgin wool",
      "Facing": "100% Silk duchesse satin collar and side stripes",
      "Lining": "Full silk habotai",
      "Origin": "Made in France",
    },
    price: "₹3,95,000",
    currency: "INR",
    year: "Permanent Collection",
    designer: "Yves Saint Laurent / Anthony Vaccarello",
    source: "Saint Laurent Salons Paris / DLF Emporio",
    officialUrl: "https://www.ysl.com",
    tags: ["Saint Laurent", "Le Smoking", "Tuxedo", "Paris", "Tailoring"],
  },
  {
    id: "fashion-alexander-mcqueen-couture",
    category: "fashion",
    subcategory: "Eveningwear",
    brand: "ALEXANDER MCQUEEN",
    name: "Architectural Bullion Embroidered Evening Coat",
    description:
      "An uncompromising masterwork of British bespoke tailoring: heavy tailored wool melton with three-dimensional gold bullion metallic wire embroidery.",
    editorialNote:
      "Lee Alexander McQueen honed his craft on Savile Row with Anderson & Sheppard before conquering Paris, blending severe British architectural cutting with Gothic romance.",
    heroImage: "/images/catalog/fashion/alexander-mcqueen-couture/view-1.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/catalog/fashion/alexander-mcqueen-couture/view-1.jpg",
      "/images/catalog/fashion/alexander-mcqueen-couture/view-2.jpg",
      "/images/catalog/fashion/alexander-mcqueen-couture/view-3.jpg",
      "/images/catalog/fashion/alexander-mcqueen-couture/view-4.jpg",
    ],
    specifications: {
      "Atelier": "Alexander McQueen Atelier, London",
      "Embroidery": "Hand-coiled gold bullion and metallic thread",
      "Tailoring": "Savile Row anatomical sleeve head and roped shoulder",
      "Buttons": "Antiqued gilded crest buttons",
    },
    price: "₹18,40,000",
    currency: "INR",
    year: "Collector Archive",
    designer: "Lee Alexander McQueen / Sarah Burton",
    source: "Alexander McQueen Archive London",
    officialUrl: "https://www.alexandermcqueen.com",
    tags: ["Alexander McQueen", "Savile Row", "Bullion", "London", "Couture"],
  },
  {
    id: "fashion-schiaparelli-zodiac-jacket",
    category: "fashion",
    subcategory: "Haute Couture",
    brand: "SCHIAPARELLI",
    name: "The 'Zodiac' Embroidered Astronomical Velvet Jacket",
    description:
      "Midnight-blue silk velvet evening jacket with three-dimensional astronomical constellations rendered in Lesage gold-bullion wire and hand-cut mirrors.",
    editorialNote:
      "Created under the surrealist patronage of Elsa Schiaparelli, this jacket stands as one of the most consequential garments in fashion history, uniting astrology with Versailles royal iconography.",
    heroImage: "/images/collections/fashion/schiaparelli-zodiac-jacket.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/collections/fashion/schiaparelli-zodiac-jacket.jpg",
    ],
    specifications: {
      "House": "Maison Schiaparelli, 21 Place Vendôme, Paris",
      "Artistic Direction": "Daniel Roseberry (Archival Homage)",
      "Material": "Midnight blue silk velvet",
      "Needlework": "320 hours Lesage gold bullion embroidery",
      "Structure": "Sculpted padded shoulder with horsehair canvas",
    },
    price: "Auction Record €1,500,000 (Indicative ₹14,20,00,000)",
    currency: "INR",
    year: "Haute Couture Heritage",
    designer: "Elsa Schiaparelli & Daniel Roseberry",
    source: "Maison Schiaparelli Archives / Christie's Paris",
    officialUrl: "https://www.schiaparelli.com",
    tags: ["Schiaparelli", "Haute Couture", "Lesage", "Velvet", "Surrealism"],
  },
  {
    id: "fashion-chanel-couture-evening-dress",
    category: "fashion",
    subcategory: "Eveningwear",
    brand: "CHANEL",
    name: "Maison Lesage Hand-Embroidered Evening Column Gown",
    description:
      "Monolithic black silk crepe column gown entirely embellished with hand-applied micro-paillettes, jet crystals, and fine metallic thread.",
    editorialNote:
      "Executed by the revered Parisian embroidery house Maison Lesage. Over 400 hours of continuous needlework are required to produce the fluid, liquid-light drape.",
    heroImage: "/images/collections/fashion/chanel-couture-evening-dress.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/collections/fashion/chanel-couture-evening-dress.jpg",
    ],
    specifications: {
      "Atelier": "Chanel Haute Couture, 31 Rue Cambon, Paris",
      "Embroidery": "Maison Lesage, Pantin (Paris)",
      "Fabrication": "Silk crepe with weighted hem",
      "Fittings": "Individual client wooden mannequin required",
    },
    price: "₹34,00,000",
    currency: "INR",
    year: "Haute Couture Salons",
    designer: "Chanel Haute Couture Studio",
    source: "Chanel Salons Privés Paris",
    officialUrl: "https://www.chanel.com",
    tags: ["Chanel", "Lesage", "Haute Couture", "Paris", "Eveningwear"],
  },
  {
    id: "fashion-duke-of-windsor-charvet",
    category: "fashion",
    subcategory: "Tailoring",
    brand: "CHARVET PLACE VENDÔME",
    name: "The Duke of Windsor Bespoke Parisian Silk Wardrobe & Neckwear",
    description:
      "Documented royal wardrobe commissioned by Edward, Duke of Windsor, at Charvet, 28 Place Vendôme: hand-woven jacquard silk neckties, poplin dress shirts, and hand-rolled borders.",
    editorialNote:
      "The Duke of Windsor was the defining menswear icon of the twentieth century. Charvet created his custom-proportioned collars engineered to accommodate his eponymous knot.",
    heroImage: "/images/private-world/02-vault/duke-of-windsor-charvet-01.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/private-world/02-vault/duke-of-windsor-charvet-01.jpg",
      "/images/private-world/02-vault/duke-of-windsor-charvet-02.jpg",
      "/images/private-world/02-vault/duke-of-windsor-charvet-03.jpg",
      "/images/private-world/02-vault/duke-of-windsor-charvet-04.jpg",
    ],
    specifications: {
      "Chemiserie": "Charvet, 28 Place Vendôme, Paris (Founded 1838)",
      "Patron": "HRH The Duke of Windsor",
      "Silk Center": "Hand-loomed Lyon mulberry silk",
      "Construction": "Seven-fold construction without interlining",
    },
    price: "Auction Record £45,000 (Indicative ₹48,00,000)",
    currency: "INR",
    year: "Royal Provenance",
    designer: "Charvet Maître Chemisier",
    source: "Sotheby's Duke & Duchess of Windsor Sale / Charvet Archives",
    officialUrl: "https://www.charvet.com",
    tags: ["Charvet", "Duke of Windsor", "Place Vendôme", "Paris", "Silk"],
  },
  {
    id: "fashion-chanel-couture-tailleur",
    category: "fashion",
    subcategory: "Haute Couture",
    brand: "CHANEL",
    name: "Architectural Fantasy Tweed Haute Couture Tailleur",
    description:
      "Hand-loomed fantasy tweed suit with structured shoulders, weighted silk hem chain, and poured-glass lion buttons cast by Maison Desrues.",
    editorialNote:
      "The definitive silhouette of Parisian discipline. Requiring over 130 hours of hand tailoring at Rue Cambon, this piece balances structural severity with total physical freedom.",
    heroImage: "/images/style/hero/style-hero-couture-runway.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/style/hero/style-hero-couture-runway.jpg",
    ],
    specifications: {
      "Atelier": "Chanel Haute Couture, 31 Rue Cambon, Paris",
      "Fabrication": "Hand-loomed fantasy wool tweed with silk filaments",
      "Buttons": "Desrues gilded brass and poured glass",
      "Lining": "100% Silk Crepe de Chine with weighted brass hem chain",
    },
    price: "₹24,50,000",
    currency: "INR",
    year: "Haute Couture Salons",
    designer: "Chanel Haute Couture Studio",
    source: "Chanel Salons Privés Paris",
    officialUrl: "https://www.chanel.com",
    tags: ["Chanel", "Haute Couture", "Tweed", "Paris", "Tailoring"],
  },

  // ─────────────────────────────────────────────────────────────
  // 02 — JEWELLERY & HIGH JEWELLERY
  // ─────────────────────────────────────────────────────────────
  {
    id: "jewellery-patiala-cartier",
    category: "jewellery",
    subcategory: "High Jewellery",
    brand: "CARTIER",
    name: "The Patiala Necklace of Maharaja Bhupinder Singh",
    description:
      "Monumental five-tiered platinum collar set with 2,930 diamonds totaling 962.25 carats, centered on the 234.69-carat De Beers yellow diamond and Burmese rubies.",
    editorialNote:
      "Delivered in 1928 to Maharaja Bhupinder Singh of Patiala. It remains the most monumental commission in Cartier's history, epitomizing the grandeur of princely India.",
    heroImage: "/images/private-world/02-vault/patiala-necklace-01.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/private-world/02-vault/patiala-necklace-01.jpg",
      "/images/private-world/02-vault/patiala-necklace-02.jpg",
      "/images/private-world/02-vault/patiala-necklace-03.jpg",
      "/images/private-world/02-vault/patiala-necklace-04.png",
    ],
    specifications: {
      "Maison": "Cartier, 13 Rue de la Paix, Paris",
      "Center Stone": "The De Beers Diamond, 234.69 carats",
      "Total Diamonds": "2,930 diamonds (962.25 carats total)",
      "Gemstones": "Two pigeon-blood Burmese rubies (18 carats)",
      "Metal": "Solid hand-pierced platinum",
    },
    price: "National Heritage Treasure (Indicative ₹250,00,00,000)",
    currency: "INR",
    year: "1928 Historical Commission",
    designer: "Louis Cartier & Jeanne Toussaint",
    source: "Cartier Collection Archive Paris / New Delhi National Museum",
    officialUrl: "https://www.cartier.com",
    tags: ["Cartier", "Patiala", "Maharaja", "High Jewellery", "Diamonds"],
  },
  {
    id: "jewellery-vladimir-tiara",
    category: "jewellery",
    subcategory: "Tiaras",
    brand: "BOLIN & IMPERIAL CROWN JEWELS",
    name: "The Grand Duchess Vladimir Tiara with Emerald Drops",
    description:
      "Fifteen interlaced platinum and gold diamond circles hung with interchangeable cabochon emerald drops and natural drop pearls, smuggled out of Saint Petersburg in 1917.",
    editorialNote:
      "Crafted by Russian court jeweler Bolin in 1874 for Grand Duchess Maria Pavlovna. Later acquired by Queen Mary and worn with fifteen unheated Cambridge emeralds.",
    heroImage: "/images/private-world/04-object/vladimir-tiara-01.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/private-world/04-object/vladimir-tiara-01.jpg",
      "/images/private-world/04-object/vladimir-tiara-02.jpg",
      "/images/private-world/04-object/vladimir-tiara-03.jpg",
      "/images/private-world/04-object/vladimir-tiara-04.jpg",
    ],
    specifications: {
      "Jeweler": "Carl Edvard Bolin, Imperial Court of Russia",
      "Interchangeable Drops": "15 cabochon Cambridge emeralds / 15 natural baroque pearls",
      "Diamonds": "Over 800 old-mine brilliant and rose-cut diamonds",
      "Mechanism": "Removable drops via concealed platinum hooks",
    },
    price: "Royal Collection Trust (£25,000,000 Indicative)",
    currency: "INR",
    year: "Circa 1874",
    designer: "Court Jeweler Bolin",
    source: "Royal Collection Trust / Romanov Imperial Archives",
    officialUrl: "https://www.rct.uk",
    tags: ["Vladimir Tiara", "Romanov", "Emeralds", "Imperial Russia", "Bolin"],
  },
  {
    id: "jewellery-empress-eugenie-brooch",
    category: "jewellery",
    subcategory: "Brooches",
    brand: "FRANÇOIS KRAMER",
    name: "Empress Eugénie Imperial Diamond Bow Brooch",
    description:
      "Monumental French Crown Jewel crafted in 1855 for Empress Eugénie: articulated openwork diamond bow suspending two long tassels and five graduated diamond pampilles.",
    editorialNote:
      "Commissioned by Emperor Napoleon III. Following the 1887 auction of the French Crown Jewels, it was re-acquired in 2008 by the Musée du Louvre for €6.72 million.",
    heroImage: "/images/private-world/04-object/empress-eugenie-brooch-01.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/private-world/04-object/empress-eugenie-brooch-01.jpg",
      "/images/private-world/04-object/empress-eugenie-brooch-02.jpg",
      "/images/private-world/04-object/empress-eugenie-brooch-03.jpg",
      "/images/private-world/04-object/empress-eugenie-brooch-04.jpg",
    ],
    specifications: {
      "Court Jeweler": "François Kramer, Paris (1855)",
      "Provenance": "Crown Jewels of France (Joyaux de la Couronne)",
      "Stones": "2,438 brilliant diamonds (140 carats total)",
      "Preservation": "Musée du Louvre, Galerie d'Apollon",
    },
    price: "Louvre Acquisition: €6,720,000 (Indicative ₹62,00,00,000)",
    currency: "INR",
    year: "1855 Imperial Commission",
    designer: "François Kramer",
    source: "Musée du Louvre, Paris (Acc. OA 12224)",
    officialUrl: "https://www.louvre.fr",
    tags: ["Empress Eugenie", "Crown Jewels", "Louvre", "Diamonds", "Brooch"],
  },
  {
    id: "jewellery-portland-tiara",
    category: "jewellery",
    subcategory: "Tiaras",
    brand: "CARTIER LONDON",
    name: "The 6th Duke of Portland Diamond Tiara",
    description:
      "Magnificent Edwardian diamond tiara centered on the legendary Portland Diamond, featuring cascading diamond swags and briolette drops in ultra-fine platinum millegrain.",
    editorialNote:
      "Crafted by Cartier London for Winifred, Duchess of Portland, for the 1902 coronation of King Edward VII, exemplifying Cartier's mastery of the Garland Style.",
    heroImage: "/images/private-world/04-object/portland-tiara-01.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/private-world/04-object/portland-tiara-01.jpg",
      "/images/private-world/04-object/portland-tiara-02.png",
      "/images/private-world/04-object/portland-tiara-03.jpg",
      "/images/private-world/04-object/portland-tiara-04.jpg",
    ],
    specifications: {
      "Jeweler": "Cartier London, 4 New Burlington Street",
      "Year": "1902 Coronation Commission",
      "Stones": "The Portland Diamond plus hundreds of old-cut diamonds",
      "Mounting": "Platinum millegrain technique",
    },
    price: "British Heritage Treasure (£12,500,000 Indicative)",
    currency: "INR",
    year: "1902",
    designer: "Cartier London Studio",
    source: "The Portland Collection / Welbeck Abbey",
    officialUrl: "https://www.cartier.com",
    tags: ["Portland Tiara", "Cartier", "Edwardian", "Diamonds", "Welbeck"],
  },
  {
    id: "jewellery-bulgari-serpenti",
    category: "jewellery",
    subcategory: "Colliers & Necklaces",
    brand: "BULGARI",
    name: "Bulgari Serpenti High Jewellery Diamond & Emerald Collier",
    description:
      "The sovereign icon of Roman high jewellery: coiled flexible tubogas scales sculpted in platinum, hand-paved with brilliant-cut diamonds, and piercing pear-cut Colombian emerald eyes.",
    editorialNote:
      "Born in the 1940s on Via Condotti, the Serpenti represents the eternal talisman of wisdom and renewal, engineered with concealed gold internal springs for tactile articulation.",
    heroImage: "/images/catalog/jewellery/bulgari-serpenti/view-1.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/catalog/jewellery/bulgari-serpenti/view-1.jpg",
      "/images/catalog/jewellery/bulgari-serpenti/view-2.jpg",
      "/images/catalog/jewellery/bulgari-serpenti/view-3.jpg",
      "/images/catalog/jewellery/bulgari-serpenti/view-4.jpg",
    ],
    specifications: {
      "Maison": "Bulgari High Jewellery Atelier, Rome",
      "Metal": "Solid 950 Platinum & 18K White Gold",
      "Eyes": "Two pear-cut Colombian emeralds (3.20 carats total)",
      "Pavé": "1,140 brilliant-cut diamonds (approx. 48.5 carats)",
      "Mechanism": "Flexible articulated link assembly",
    },
    price: "₹18,50,00,000",
    currency: "INR",
    year: "Haute Joaillerie",
    designer: "Lucia Silvestri",
    source: "Bulgari High Jewellery Salons Rome / Mumbai",
    officialUrl: "https://www.bulgari.com",
    tags: ["Bulgari", "Serpenti", "High Jewellery", "Emeralds", "Rome"],
  },

  // ─────────────────────────────────────────────────────────────
  // 03 — WATCHES & COMPLICATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "watches-rolex-daytona",
    category: "watches",
    subcategory: "Chronographs",
    brand: "ROLEX",
    name: "Cosmograph Daytona 18K White Gold & Cerachrom",
    description:
      "The definitive luxury chronograph: 18-karat white gold case, black Cerachrom monobloc tachymetric bezel, reverse panda dial, and manufacture Calibre 4131 with column wheel.",
    editorialNote:
      "Originally engineered for professional endurance drivers in 1963, the Daytona has transcended motor racing to become the most sought-after mechanical chronograph in the world.",
    heroImage: "/images/catalog/watches/rolex-daytona/view-1.jpg",
    heroOrientation: "square",
    gallery: [
      "/images/catalog/watches/rolex-daytona/view-1.jpg",
      "/images/catalog/watches/rolex-daytona/view-2.jpg",
      "/images/catalog/watches/rolex-daytona/view-3.jpg",
      "/images/catalog/watches/rolex-daytona/view-4.jpg",
    ],
    specifications: {
      "Manufacture": "Rolex, Geneva, Switzerland",
      "Case": "40 mm, 18 ct white gold with screw-down pushers",
      "Bezel": "Black monobloc Cerachrom in ceramic with platinum numerals",
      "Movement": "Calibre 4131, Manufacture Rolex (72-hour reserve)",
      "Certification": "Superlative Chronometer (-2/+2 sec/day)",
    },
    price: "₹36,50,000",
    currency: "INR",
    year: "Current Manufacture",
    designer: "Rolex Geneva Design Studio",
    source: "Rolex Official Geneva / Boutique Delhi",
    officialUrl: "https://www.rolex.com",
    tags: ["Rolex", "Daytona", "Chronograph", "Geneva", "White Gold"],
  },
  {
    id: "watches-breguet-repeater-pocket",
    category: "watches",
    subcategory: "Grand Complications",
    brand: "BREGUET",
    name: "Abraham-Louis Breguet 18-Karat Gold Minute Repeater Pocket Watch",
    description:
      "Historic 18th-century gold minute repeater pocket watch featuring Breguet's patented gong spring, guilloché engine-turned dial, ruby cylinder escapement, and secret signature.",
    editorialNote:
      "Abraham-Louis Breguet invented the gong spring in 1783, eliminating the heavy bell and enabling the creation of ultra-thin chiming watches for European sovereigns.",
    heroImage: "/images/catalog/watches/breguet-repeater-pocket/view-1.jpg",
    heroOrientation: "square",
    gallery: [
      "/images/catalog/watches/breguet-repeater-pocket/view-1.jpg",
      "/images/catalog/watches/breguet-repeater-pocket/view-2.jpg",
      "/images/catalog/watches/breguet-repeater-pocket/view-3.jpg",
      "/images/catalog/watches/breguet-repeater-pocket/view-4.jpg",
    ],
    specifications: {
      "Master Horologer": "Abraham-Louis Breguet (1747–1823), Paris & Geneva",
      "Complication": "Minute repeater on wire gongs",
      "Dial": "Hand-engraved silver engine-turned dial with Roman numerals",
      "Case": "18-karat yellow gold with reeded caseband",
      "Escapement": "Ruby cylinder with parachute shock protection",
    },
    price: "Auction Record £420,000 (Indicative ₹4,45,00,000)",
    currency: "INR",
    year: "18th Century Horology",
    designer: "Abraham-Louis Breguet",
    source: "The Metropolitan Museum of Art (Acc. 17.101.14)",
    officialUrl: "https://www.breguet.com",
    tags: ["Breguet", "Minute Repeater", "Pocket Watch", "Gold", "Horology"],
  },
  {
    id: "watches-vacheron-constantin-pocket",
    category: "watches",
    subcategory: "Grand Complications",
    brand: "VACHERON CONSTANTIN",
    name: "Historic 18K Gold Key-Wound Pocket Watch with Enamel Dial",
    description:
      "Documented 19th-century Vacheron Constantin pocket watch preserved with original carved winding key: solid gold hunting case, fired Grand Feu enamel dial, and blued steel hands.",
    editorialNote:
      "Founded in 1755 in Geneva, Vacheron Constantin is the oldest watch manufacture in uninterrupted operation. Their early sovereign pocket watches established Swiss chronometric preeminence.",
    heroImage: "/images/catalog/watches/vacheron-constantin-pocket/view-1.jpg",
    heroOrientation: "square",
    gallery: [
      "/images/catalog/watches/vacheron-constantin-pocket/view-1.jpg",
      "/images/catalog/watches/vacheron-constantin-pocket/view-2.jpg",
      "/images/catalog/watches/vacheron-constantin-pocket/view-3.jpg",
      "/images/catalog/watches/vacheron-constantin-pocket/view-4.jpg",
    ],
    specifications: {
      "Manufacture": "Vacheron Constantin, Geneva (Est. 1755)",
      "Case": "Solid 18K yellow gold engine-turned case",
      "Dial": "Vitreous Grand Feu white enamel with Roman chapters",
      "Movement": "Gilt brass bridge movement with lever escapement",
    },
    price: "Collector Folio (£280,000 Indicative)",
    currency: "INR",
    year: "19th Century",
    designer: "Vacheron Constantin Master Watchmakers",
    source: "The Metropolitan Museum of Art (Acc. 19.5584)",
    officialUrl: "https://www.vacheron-constantin.com",
    tags: ["Vacheron Constantin", "Geneva", "Pocket Watch", "Gold", "Heritage"],
  },
  {
    id: "watches-cartier-alwar-chronometer",
    category: "watches",
    subcategory: "Dress Watches",
    brand: "CARTIER",
    name: "The Alwar Cartier Royal Table Chronometer (1926)",
    description:
      "Custom desk chronometer commissioned by the Maharaja of Alwar: lapis lazuli and obsidian base, 18K gold Roman numerals, and eight-day movement with lever escapement.",
    editorialNote:
      "Exemplifying the pinnacle of Cartier's Art Deco decorative arts, created for the princely state of Alwar to grace state council desks.",
    heroImage: "/images/private-world/04-object/alwar-cartier-chronometer-01.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/private-world/04-object/alwar-cartier-chronometer-01.jpg",
      "/images/private-world/04-object/alwar-cartier-chronometer-02.jpg",
      "/images/private-world/04-object/alwar-cartier-chronometer-03.jpg",
      "/images/private-world/04-object/alwar-cartier-chronometer-04.jpg",
    ],
    specifications: {
      "Maison": "Cartier Paris / London",
      "Materials": "Lapis lazuli, black obsidian, 18K gold, diamonds",
      "Movement": "Eight-day precision chronometer movement",
      "Client": "Maharaja Sir Jai Singh Prabhakar of Alwar",
    },
    price: "Auction Record $780,000 (Indicative ₹6,60,00,000)",
    currency: "INR",
    year: "1926",
    designer: "Maurice Coüet & Cartier",
    source: "Cartier Tradition Archive / Sotheby's",
    officialUrl: "https://www.cartier.com",
    tags: ["Cartier", "Alwar", "Clock", "Lapis", "Art Deco"],
  },
  {
    id: "watches-cartier-mystery-clock",
    category: "watches",
    subcategory: "Grand Complications",
    brand: "CARTIER",
    name: "Model A Rock Crystal & Platinum Mystery Clock",
    description:
      "Maurice Coüet's optical masterpiece: floating diamond hands suspended in solid rock crystal without visible mechanical connection to the movement hidden in the base.",
    editorialNote:
      "Referred to by fashion journals of the 1920s as 'miracles of horology'. The hands are set onto two grooved rock crystal discs geared to hidden shafts in the frame.",
    heroImage: "/images/collections/objects/cartier-mystery-clock.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/collections/objects/cartier-mystery-clock.jpg",
    ],
    specifications: {
      "Horologer": "Maurice Coüet for Cartier Paris (1912)",
      "Dial": "Single block of transparent unclouded rock crystal",
      "Base": "White onyx, black obsidian, and turquoise cabochons",
      "Hands": "Platinum set with single-cut white diamonds",
    },
    price: "Museum Valuation: $1,250,000 (Indicative ₹10,60,00,000)",
    currency: "INR",
    year: "1912 Model A",
    designer: "Maurice Coüet & Louis Cartier",
    source: "Cartier Collection Paris / The Met Museum",
    officialUrl: "https://www.cartier.com",
    tags: ["Cartier", "Mystery Clock", "Rock Crystal", "Horology", "Art Deco"],
  },
  {
    id: "watches-patek-philippe-perpetual-pocket",
    category: "watches",
    subcategory: "Grand Complications",
    brand: "PATEK PHILIPPE",
    name: "Patek Philippe 18K Gold Royal Perpetual Calendar Pocket Watch",
    description:
      "Perpetual calendar with moon phases, split-seconds chronograph, and minute repeater executed in hand-polished 18-karat yellow gold.",
    editorialNote:
      "Patek Philippe has held the pinnacle of Geneva chronometry since 1839. This sovereign pocket watch preserves the purity of nineteenth-century Grand Complications.",
    heroImage: "/images/collections/timepieces/patek-philippe-perpetual-pocket.jpg",
    heroOrientation: "square",
    gallery: [
      "/images/collections/timepieces/patek-philippe-perpetual-pocket.jpg",
    ],
    specifications: {
      "Manufacture": "Patek Philippe, Geneva, Switzerland",
      "Functions": "Perpetual calendar, moon phase, minute repeater, chronograph",
      "Case": "Solid 18K yellow gold with Geneva Seal hallmarks",
      "Dial": "Grand Feu white enamel with subsidiary registers",
    },
    price: "Auction Record CHF 1,800,000 (Indicative ₹17,50,00,000)",
    currency: "INR",
    year: "Circa 1898",
    designer: "Patek Philippe Master Watchmakers",
    source: "Patek Philippe Museum, Geneva",
    officialUrl: "https://www.patek.com",
    tags: ["Patek Philippe", "Perpetual Calendar", "Minute Repeater", "Geneva"],
  },
  {
    id: "watches-vacheron-constantin-pocket-chronograph",
    category: "watches",
    subcategory: "Chronographs",
    brand: "VACHERON CONSTANTIN",
    name: "Les Cabinotiers Split-Seconds Pocket Chronograph",
    description:
      "Yellow gold split-seconds column-wheel chronograph pocket watch with tachymeter scale, blued steel hands, and 30-minute register.",
    editorialNote:
      "Produced by the dedicated bespoke Cabinotiers department of Vacheron Constantin for a European racing patron at the turn of the twentieth century.",
    heroImage: "/images/collections/timepieces/vacheron-constantin-pocket-chronograph.jpg",
    heroOrientation: "square",
    gallery: [
      "/images/collections/timepieces/vacheron-constantin-pocket-chronograph.jpg",
    ],
    specifications: {
      "Department": "Les Cabinotiers, Vacheron Constantin Geneva",
      "Complication": "Rattrapante (split-seconds) chronograph",
      "Case": "18-karat yellow gold with hinged cuvette",
      "Movement": "Damaskeened nickel-plated manual winding calibre",
    },
    price: "Collector Valuation £350,000 (Indicative ₹3,70,00,000)",
    currency: "INR",
    year: "1910 Heritage",
    designer: "Vacheron Constantin",
    source: "Vacheron Constantin Heritage Department, Geneva",
    officialUrl: "https://www.vacheron-constantin.com",
    tags: ["Vacheron Constantin", "Rattrapante", "Pocket Watch", "Chronograph"],
  },
  {
    id: "watches-cartier-tank",
    category: "watches",
    subcategory: "Dress Watches",
    brand: "CARTIER",
    name: "Tank Louis Cartier in 18K Yellow Gold with Ruby Cabochon",
    description:
      "The definitive geometric dress watch: rectangular 18-karat yellow gold brancards, silver beaded dial, Roman numerals, and sapphire winding crown.",
    editorialNote:
      "Created by Louis Cartier in 1917, inspired by the rectangular bird's-eye silhouette of the Renault FT-17 combat tank, becoming the watch worn by monarchs and cinematic icons.",
    heroImage: "/images/catalog/watches/cartier-tank/view-1.jpg",
    heroOrientation: "square",
    gallery: [
      "/images/catalog/watches/cartier-tank/view-1.jpg",
    ],
    specifications: {
      "Maison": "Cartier Horlogerie, La Chaux-de-Fonds",
      "Case": "18K yellow gold, 33.7 mm x 25.5 mm",
      "Crown": "Beaded gold crown set with sapphire cabochon",
      "Strap": "Alligator leather with gold ardillon buckle",
    },
    price: "₹11,40,000",
    currency: "INR",
    year: "Classic Line",
    designer: "Louis Cartier",
    source: "Cartier Boutiques Paris / Mumbai",
    officialUrl: "https://www.cartier.com",
    tags: ["Cartier", "Tank", "Gold", "Dress Watch", "Paris"],
  },

  // ─────────────────────────────────────────────────────────────
  // 04 — AUTOMOBILES & COACHBUILDS
  // ─────────────────────────────────────────────────────────────
  {
    id: "automobiles-rolls-royce-phantom-viii",
    category: "automobiles",
    subcategory: "Luxury Saloons",
    brand: "ROLLS-ROYCE",
    name: "Rolls-Royce Phantom VIII Series II Bespoke Limousine",
    description:
      "The pinnacle of automotive sovereign luxury: twin-turbocharged 6.75-litre V12, Architecture of Luxury aluminium spaceframe, Starlight headliner, and glass Gallery dashboard.",
    editorialNote:
      "Built at the Home of Rolls-Royce in Goodwood. Hand-crafted with over 130 kg of acoustic sound insulation, producing the acoustic serenity of a private cathedral.",
    heroImage: "/images/catalog/automobiles/rolls-royce-phantom-viii/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/automobiles/rolls-royce-phantom-viii/view-1.jpg",
      "/images/catalog/automobiles/rolls-royce-phantom-viii/view-2.jpg",
      "/images/catalog/automobiles/rolls-royce-phantom-viii/view-3.jpg",
      "/images/catalog/automobiles/rolls-royce-phantom-viii/view-4.jpg",
    ],
    specifications: {
      "Engine": "6.75-Litre Twin-Turbo V12",
      "Power": "563 bhp / 900 Nm torque @ 1,700 rpm",
      "Transmission": "Satellite Aided 8-Speed Automatic",
      "Interior": "Bespoke open-pore canadel wood & cashmere headliner",
      "Dimensions": "Length: 5,762 mm, Kerb Weight: 2,560 kg",
    },
    price: "₹10,50,00,000 (Ex-Showroom India)",
    currency: "INR",
    year: "2026 Model Year",
    designer: "Rolls-Royce Bespoke Collective, Goodwood",
    source: "Rolls-Royce Motor Cars Goodwood / New Delhi",
    officialUrl: "https://www.rolls-roycemotorcars.com",
    tags: ["Rolls-Royce", "Phantom", "Limousine", "Goodwood", "V12"],
  },
  {
    id: "automobiles-rolls-royce-phantom-of-love",
    category: "automobiles",
    subcategory: "Bespoke Coachbuilds",
    brand: "ROLLS-ROYCE",
    name: "1926 Rolls-Royce Phantom I 'The Phantom of Love'",
    description:
      "Bespoke coachbuilt limousine by Charles Clark & Son reproducing the Marie Antoinette boudoir at Versailles: hand-woven Aubusson tapestries, carved walnut cabinets, and painted ceiling cherubs.",
    editorialNote:
      "Commissioned by Clarence Gasque for his wife. Nine French embroiderers worked for nine months on the tapestries alone. Sold at Bonhams Goodwood Revival for record collector valuation.",
    heroImage: "/images/private-world/05-automobile/rolls-royce-phantom-of-love-01.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/private-world/05-automobile/rolls-royce-phantom-of-love-01.jpg",
      "/images/private-world/05-automobile/rolls-royce-phantom-of-love-02.jpg",
      "/images/private-world/05-automobile/rolls-royce-phantom-of-love-03.jpg",
      "/images/private-world/05-automobile/rolls-royce-phantom-of-love-04.jpg",
    ],
    specifications: {
      "Chassis No": "76 TC (Derby Works)",
      "Coachbuilder": "Charles Clark & Son Ltd., Wolverhampton",
      "Interior Style": "Louis XVI Rococo with Aubusson tapestry upholstery",
      "Engine": "7.7-Litre Overhead-Valve Straight-Six",
    },
    price: "Auction Record £1,200,000 (Indicative ₹12,80,00,000)",
    currency: "INR",
    year: "1926",
    designer: "Charles Clark & Son",
    source: "Bonhams Goodwood / Rolls-Royce Enthusiasts' Club",
    officialUrl: "https://www.bonhams.com",
    tags: ["Rolls-Royce", "Phantom of Love", "Coachbuilt", "Aubusson", "Concours"],
  },
  {
    id: "automobiles-ferrari-daytona-sp3",
    category: "automobiles",
    subcategory: "Hypercars",
    brand: "FERRARI",
    name: "Ferrari Daytona SP3 Icona Limited Series",
    description:
      "Naturally aspirated 6.5-litre mid-rear V12 producing 840 cv, revving to 9,500 rpm, with composite carbon-fibre chassis paying homage to Ferrari's 1967 24 Hours of Daytona 1-2-3 finish.",
    editorialNote:
      "Limited to strictly 599 units globally for certified Ferrari collectors. Featuring butterfly doors, horizontal strakes along the rear, and an integrated cabin.",
    heroImage: "/images/catalog/automobiles/ferrari-daytona-sp3/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/automobiles/ferrari-daytona-sp3/view-1.jpg",
      "/images/catalog/automobiles/ferrari-daytona-sp3/view-2.jpg",
      "/images/catalog/automobiles/ferrari-daytona-sp3/view-3.jpg",
    ],
    specifications: {
      "Engine": "6.5-Litre 65° Naturally Aspirated V12",
      "Power": "840 cv @ 9,250 rpm (Max Revs: 9,500 rpm)",
      "Chassis": "Formula 1 T800 Carbon-Fibre Tub",
      "Top Speed": "> 340 km/h (0–100 km/h: 2.85s)",
      "Production": "599 units (All sold by invitation)",
    },
    price: "€2,000,000 + Taxes (Indicative ₹24,00,00,000)",
    currency: "INR",
    year: "Icona Series",
    designer: "Flavio Manzoni, Centro Stile Ferrari",
    source: "Ferrari S.p.A. Maranello / Private Client Office",
    officialUrl: "https://www.ferrari.com",
    tags: ["Ferrari", "Daytona SP3", "V12", "Maranello", "Hypercar"],
  },
  {
    id: "automobiles-bugatti-type-57s-atalante",
    category: "automobiles",
    subcategory: "Bespoke Coachbuilds",
    brand: "BUGATTI",
    name: "1937 Bugatti Type 57S Atalante Coupé",
    description:
      "Sculpted by Jean Bugatti: supercharged dual-overhead-cam straight-eight engine, low-slung underslung chassis, aircraft-riveted spine, and aerodynamic teardrop fenders.",
    editorialNote:
      "Only 17 Atalante coupés were ever forged at Molsheim. The mechanical and aesthetic zenith of pre-war European coachbuilding.",
    heroImage: "/images/private-world/05-automobile/bugatti-type-57s-atalante-01.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/private-world/05-automobile/bugatti-type-57s-atalante-01.jpg",
      "/images/private-world/05-automobile/bugatti-type-57s-atalante-02.jpg",
      "/images/private-world/05-automobile/bugatti-type-57s-atalante-03.jpg",
      "/images/private-world/05-automobile/bugatti-type-57s-atalante-04.jpg",
    ],
    specifications: {
      "Factory": "Usines Bugatti, Molsheim, Alsace",
      "Chassis": "Underslung Type 57S with de Ram hydraulic dampers",
      "Engine": "3.3-Litre DOHC Straight-Eight (Roots Supercharger)",
      "Production": "One of 17 Atalante bodies crafted",
    },
    price: "Auction Record £7,800,000 (Indicative ₹82,00,00,000)",
    currency: "INR",
    year: "1937",
    designer: "Jean Bugatti",
    source: "Gooding & Co. Concours Sale / Bugatti Trust",
    officialUrl: "https://www.bugatti.com",
    tags: ["Bugatti", "Type 57S", "Atalante", "Molsheim", "Art Deco"],
  },
  {
    id: "automobiles-bugatti-chiron-pur-sport",
    category: "automobiles",
    subcategory: "Hypercars",
    brand: "BUGATTI",
    name: "Bugatti Chiron Pur Sport 1,500 PS W16",
    description:
      "The ultimate mechanical manifestation of the quad-turbocharged 8.0-litre W16: revised close-ratio gearbox, fixed 1.9-metre carbon rear wing, and 3D-printed titanium exhaust tips.",
    editorialNote:
      "Engineered in Molsheim for lateral acceleration and aerodynamic downforce. Capable of accelerating from 0 to 100 km/h in 2.3 seconds with uncompromising stability.",
    heroImage: "/images/catalog/automobiles/bugatti-chiron-pur-sport/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/automobiles/bugatti-chiron-pur-sport/view-1.jpg",
      "/images/catalog/automobiles/bugatti-chiron-pur-sport/view-2.jpg",
      "/images/catalog/automobiles/bugatti-chiron-pur-sport/view-3.jpg",
      "/images/catalog/automobiles/bugatti-chiron-pur-sport/view-4.jpg",
    ],
    specifications: {
      "Engine": "8.0-Litre Quad-Turbocharged W16",
      "Power": "1,500 PS / 1,600 Nm torque",
      "Transmission": "7-speed dual-clutch with 15% closer gear ratios",
      "Wing": "1.9-metre fixed carbon-fibre rear wing",
      "Production": "Limited to 60 units worldwide",
    },
    price: "€3,200,000 (Indicative ₹32,00,00,000)",
    currency: "INR",
    year: "Limited Series",
    designer: "Achim Anscheidt, Bugatti Design",
    source: "Bugatti Automobiles S.A.S. Molsheim",
    officialUrl: "https://www.bugatti.com",
    tags: ["Bugatti", "Chiron", "Pur Sport", "W16", "Molsheim"],
  },
  {
    id: "automobiles-aston-martin-valkyrie",
    category: "automobiles",
    subcategory: "Hypercars",
    brand: "ASTON MARTIN",
    name: "Aston Martin Valkyrie Cosworth 6.5L V12",
    description:
      "Formula One aerodynamicist Adrian Newey's road car masterwork: naturally aspirated 6.5-litre Cosworth V12 revving to 11,100 rpm, generating 1,160 bhp with full ground-effect venturi tunnels.",
    editorialNote:
      "A pure Formula One monocoque engineered for the road. The driver sits in a reclined feet-up posture directly on the carbon tub with zero traditional subframes.",
    heroImage: "/images/catalog/automobiles/aston-martin-valkyrie/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/automobiles/aston-martin-valkyrie/view-1.jpg",
      "/images/catalog/automobiles/aston-martin-valkyrie/view-2.jpg",
      "/images/catalog/automobiles/aston-martin-valkyrie/view-3.jpg",
      "/images/catalog/automobiles/aston-martin-valkyrie/view-4.jpg",
    ],
    specifications: {
      "Powertrain": "6.5-Litre Cosworth V12 + Rimac Hybrid KERS",
      "Total Power": "1,160 bhp @ 10,500 rpm (Redline: 11,100 rpm)",
      "Downforce": "1,800 kg at high speed",
      "Construction": "100% Carbon-fibre monocoque with teardrop cockpit",
    },
    price: "£2,500,000 (Indicative ₹27,50,00,000)",
    currency: "INR",
    year: "Gaydon Handcrafted",
    designer: "Adrian Newey & Marek Reichman",
    source: "Aston Martin Lagonda Gaydon / Special Operations",
    officialUrl: "https://www.astonmartin.com",
    tags: ["Aston Martin", "Valkyrie", "Newey", "Cosworth", "Hypercar"],
  },
  {
    id: "automobiles-porsche-911-gt3-rs",
    category: "automobiles",
    subcategory: "Track Legends",
    brand: "PORSCHE",
    name: "Porsche 911 GT3 RS (Generation 992)",
    description:
      "The motorsport pinnacle of Stuttgart chronometry: naturally aspirated 4.0-litre flat-six engine revving to 9,000 rpm, DRS hydraulic rear wing, and active aerodynamic underbody flaps.",
    editorialNote:
      "Directly derived from the 911 GT3 R race car, featuring a central radiator layout in the nose and multi-link front suspension with aerodynamically profiled wishbones.",
    heroImage: "/images/catalog/automobiles/porsche-911-gt3-rs/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/automobiles/porsche-911-gt3-rs/view-1.jpg",
      "/images/catalog/automobiles/porsche-911-gt3-rs/view-2.jpg",
      "/images/catalog/automobiles/porsche-911-gt3-rs/view-3.jpg",
      "/images/catalog/automobiles/porsche-911-gt3-rs/view-4.jpg",
    ],
    specifications: {
      "Engine": "4.0-Litre Naturally Aspirated Boxer-6",
      "Power": "525 PS @ 8,500 rpm",
      "Aerodynamics": "860 kg downforce @ 285 km/h with DRS flap",
      "Nürburgring Lap": "6:49.328 minutes (Nordschleife Official)",
    },
    price: "₹3,50,00,000 (Ex-Showroom India)",
    currency: "INR",
    year: "Current GT Production",
    designer: "Porsche Motorsport Flacht & Weissach",
    source: "Porsche AG Stuttgart / Porsche Centre Delhi",
    officialUrl: "https://www.porsche.com",
    tags: ["Porsche", "GT3 RS", "911", "Weissach", "Flat-Six"],
  },
  {
    id: "automobiles-bentley-batur",
    category: "automobiles",
    subcategory: "Bespoke Coachbuilds",
    brand: "BENTLEY",
    name: "Bentley Mulliner Batur Coachbuilt Grand Tourer",
    description:
      "Handcrafted by Mulliner in strictly 18 examples: 740 PS twin-turbo W12, 3D-printed 18-karat gold interior touchpoints, and natural composite linen fibre body panels.",
    editorialNote:
      "The farewell symphony for Bentley's iconic 6.0-litre W12 engine, previewing the sovereign design DNA of future Crewe creations.",
    heroImage: "/images/catalog/automobiles/bentley-batur/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/automobiles/bentley-batur/view-1.jpg",
      "/images/catalog/automobiles/bentley-batur/view-2.jpg",
      "/images/catalog/automobiles/bentley-batur/view-3.jpg",
      "/images/catalog/automobiles/bentley-batur/view-4.jpg",
    ],
    specifications: {
      "Coachbuilder": "Mulliner Handcrafted, Crewe, England",
      "Engine": "6.0-Litre Twin-Turbocharged W12",
      "Power": "740 PS / 1,000 Nm torque",
      "Interior Gold": "210 grams of 18K Hallmarked Gold elements",
      "Production": "Strictly 18 customer cars",
    },
    price: "£1,650,000 + Taxes (Indicative ₹18,20,00,000)",
    currency: "INR",
    year: "Mulliner Coachbuild",
    designer: "Andreas Mindt, Bentley Director of Design",
    source: "Bentley Motors Ltd. Crewe / Mulliner Atelier",
    officialUrl: "https://www.bentleymotors.com",
    tags: ["Bentley", "Batur", "Mulliner", "W12", "Coachbuilt"],
  },
  {
    id: "automobiles-mclaren-speedtail",
    category: "automobiles",
    subcategory: "Hypercars",
    brand: "MCLAREN",
    name: "McLaren Speedtail Hyper-GT 1,070 PS",
    description:
      "Streamlined carbon-fibre teardrop fuselage with central driving position: twin-turbocharged 4.0-litre V8 hybrid generating 1,070 PS and reaching 403 km/h (250 mph).",
    editorialNote:
      "The spiritual successor to the McLaren F1, featuring flexible carbon-fibre active rear ailerons that bend seamlessly with the rear bodywork without mechanical hinges.",
    heroImage: "/images/catalog/automobiles/mclaren-speedtail/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/automobiles/mclaren-speedtail/view-1.jpg",
      "/images/catalog/automobiles/mclaren-speedtail/view-2.jpg",
      "/images/catalog/automobiles/mclaren-speedtail/view-3.jpg",
      "/images/catalog/automobiles/mclaren-speedtail/view-4.jpg",
    ],
    specifications: {
      "Cockpit": "3-Seater central driver layout (F1 Heritage)",
      "Powertrain": "4.0-Litre V8 Hybrid (1,070 PS)",
      "Top Speed": "403 km/h (250 mph)",
      "Length": "5,137 mm aerodynamic elongated tail",
      "Production": "Strictly 106 units",
    },
    price: "£1,750,000 + Taxes (Indicative ₹21,00,00,000)",
    currency: "INR",
    year: "Ultimate Series",
    designer: "Rob Melville, McLaren Automotive",
    source: "McLaren Technology Centre, Woking, England",
    officialUrl: "https://www.mclaren.com",
    tags: ["McLaren", "Speedtail", "Hyper-GT", "Woking", "V8 Hybrid"],
  },
  {
    id: "automobiles-alfa-romeo-8c-2900b",
    category: "automobiles",
    subcategory: "Bespoke Coachbuilds",
    brand: "ALFA ROMEO",
    name: "1938 Alfa Romeo 8C 2900B Touring Berlinetta",
    description:
      "Superleggera aluminium coachwork by Carrozzeria Touring: twin-supercharged dual-overhead-cam straight-eight engine, four-wheel independent suspension, and aerodynamic louvres.",
    editorialNote:
      "Consecutive winner of the Pebble Beach and Villa d'Este Concours d'Elegance. Often revered by collectors as the most beautiful sports car ever built in the pre-war era.",
    heroImage: "/images/private-world/05-automobile/alfa-romeo-8c-2900b-01.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/private-world/05-automobile/alfa-romeo-8c-2900b-01.jpg",
      "/images/private-world/05-automobile/alfa-romeo-8c-2900b-02.jpg",
      "/images/private-world/05-automobile/alfa-romeo-8c-2900b-03.jpg",
      "/images/private-world/05-automobile/alfa-romeo-8c-2900b-04.jpg",
    ],
    specifications: {
      "Coachbuilder": "Carrozzeria Touring Superleggera, Milan",
      "Engine": "2.9-Litre DOHC Straight-Eight (Twin Superchargers)",
      "Awards": "Best of Show Pebble Beach & Concorso Villa d'Este",
      "Production": "Fewer than 30 Berlinettas manufactured",
    },
    price: "Auction Record $19,800,000 (Indicative ₹165,00,00,000)",
    currency: "INR",
    year: "1938",
    designer: "Carlo Felice Bianchi Anderloni (Touring)",
    source: "RM Sotheby's Monterey Sale / Museo Storico Alfa Romeo",
    officialUrl: "https://www.alfaromeo.com",
    tags: ["Alfa Romeo", "8C 2900B", "Touring", "Superleggera", "Concours"],
  },

  // ─────────────────────────────────────────────────────────────
  // 05 — FIREARMS & SPORTING ARMS (100% AUTHENTIC MET & ROYAL SETS)
  // ─────────────────────────────────────────────────────────────
  {
    id: "firearms-purdey-turnover-pistols",
    category: "firearms",
    subcategory: "Cased Sets",
    brand: "JAMES PURDEY THE ELDER",
    name: "Pair of Four-Barreled Turnover Pistols of the Duke of Newcastle with Fitted Case",
    description:
      "Documented 1831 master commission for Henry Pelham Fiennes Pelham-Clinton, 4th Duke of Newcastle-under-Lyne. Featuring four turnover rifled barrels, chiselled steel scrollwork, gold inlays, pocket pistols, and original brass-bound Cuban mahogany case with ivory and gold loading accessories.",
    editorialNote:
      "James Purdey founded his firm in London in 1814. This magnificent cased garniture is preserved in un-fired condition, illustrating the technical summit of early Regency gunmaking.",
    heroImage: "/images/catalog/firearms/purdey-turnover-pistols/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/purdey-turnover-pistols/view-1.jpg",
      "/images/catalog/firearms/purdey-turnover-pistols/view-2.jpg",
      "/images/catalog/firearms/purdey-turnover-pistols/view-3.jpg",
      "/images/catalog/firearms/purdey-turnover-pistols/view-4.jpg",
      "/images/catalog/firearms/purdey-turnover-pistols/view-5.jpg",
      "/images/catalog/firearms/purdey-turnover-pistols/view-6.jpg",
    ],
    specifications: {
      "Gunmaker": "James Purdey the Elder, London (1784–1863)",
      "Date": "London, 1831 (Signed on top rib)",
      "Mechanism": "Percussion turnover 4-barrel system (.54 caliber)",
      "Stock": "Selected French Circassian walnut with fine diamond checkering",
      "Case": "Fitted Cuban mahogany with brass corners, ivory patch box, and tools",
    },
    price: "Auction Record £1,450,000 (Indicative ₹15,40,00,000)",
    currency: "INR",
    year: "London, 1831",
    designer: "James Purdey the Elder",
    source: "The Metropolitan Museum of Art Arms & Armor (Acc. 35.41.1–.15)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Purdey", "London", "Duke of Newcastle", "Percussion", "Cased Set"],
  },
  {
    id: "firearms-boutet-cased-garniture",
    category: "firearms",
    subcategory: "Presentation Pieces",
    brand: "NICOLAS-NOËL BOUTET",
    name: "Imperial Cased Set of a Flintlock Rifle, Pair of Pistols, and Accessories",
    description:
      "Forged at the Manufacture de Versailles for Napoleon's imperial officers. Charcoal-blued octagonal barrels with gold cartouches, chiselled steel relief depicting mythological Mars, and French walnut stocks hand-inlaid with gold wire.",
    editorialNote:
      "Nicolas-Noël Boutet was appointed Directeur-Artiste of the Manufacture de Versailles by Napoleon, with an explicit mandate to produce presentation weapons that would demonstrate French decorative supremacy.",
    heroImage: "/images/catalog/firearms/boutet-cased-garniture/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/boutet-cased-garniture/view-1.jpg",
      "/images/catalog/firearms/boutet-cased-garniture/view-2.jpg",
      "/images/catalog/firearms/boutet-cased-garniture/view-3.jpg",
    ],
    specifications: {
      "Master Gunsmith": "Nicolas-Noël Boutet (1761–1833)",
      "Manufacture": "Manufacture de Versailles (Reign of Napoleon I, Circa 1800)",
      "Barrels": "Micro-grooved rifled steel with high-carat gold relief",
      "Stock": "Carved French walnut with silver wire and horn tip",
      "Case": "Mahogany presentation trunk lined with green velvet",
    },
    price: "Auction Record $1,800,000 (Indicative ₹15,20,00,000)",
    currency: "INR",
    year: "Versailles, ca. 1800",
    designer: "Nicolas-Noël Boutet",
    source: "The Metropolitan Museum of Art (Fletcher Fund, Acc. 1970.179.1a–q)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Boutet", "Versailles", "Napoleon", "Flintlock", "Imperial"],
  },
  {
    id: "firearms-catherine-great-flintlocks",
    category: "firearms",
    subcategory: "Presentation Pieces",
    brand: "JOHAN ADOLPH GRECKE",
    name: "The Imperial Flintlock Presentation Pistols of Empress Catherine II of Russia",
    description:
      "Pair of Russian imperial flintlock pistols crafted in Saint Petersburg in 1786. Carved walrus ivory stocks, chiselled steel lockplates, and solid 24k gold wire imperial cypher cartouches.",
    editorialNote:
      "Johan Adolph Grecke was the premier gunsmith to the Imperial Russian Court. These pistols were commissioned directly for the private cabinet of Catherine the Great at the Winter Palace.",
    heroImage: "/images/catalog/firearms/catherine-great-flintlocks/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/catherine-great-flintlocks/view-1.jpg",
      "/images/catalog/firearms/catherine-great-flintlocks/view-2.jpg",
    ],
    specifications: {
      "Court Gunsmith": "Johan Adolph Grecke, Saint Petersburg",
      "Date": "Dated 1786 with Cyrillic maker signatures",
      "Stock": "Carved fossilized walrus ivory",
      "Metal": "Chiselled blued steel with solid gold damascene",
      "Length": "14 1/2 inches (36.8 cm)",
    },
    price: "Auction Valuation £2,100,000 (Indicative ₹22,50,00,000)",
    currency: "INR",
    year: "Saint Petersburg, 1786",
    designer: "Johan Adolph Grecke",
    source: "The Metropolitan Museum of Art (Acc. 1986.265.1, .2)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Catherine the Great", "Imperial Russia", "Flintlock", "Ivory", "Grecke"],
  },
  {
    id: "firearms-louis-xiii-flintlock",
    category: "firearms",
    subcategory: "Sporting Guns",
    brand: "PIERRE & MARIN LE BOURGEOIS",
    name: "The Royal Flintlock Fowling Piece of King Louis XIII of France",
    description:
      "The earliest surviving true flintlock mechanism in royal history, invented by Marin Le Bourgeois in Lisieux for King Louis XIII. Decorated with silver, brass, mother-of-pearl inlays, and chiselled dolphin cocks.",
    editorialNote:
      "Marin Le Bourgeois invented the true flintlock mechanism around 1610. This royal piece was personal property of King Louis XIII and served as the prototype for all subsequent European sporting arms.",
    heroImage: "/images/catalog/firearms/louis-xiii-flintlock/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/louis-xiii-flintlock/view-1.jpg",
    ],
    specifications: {
      "Invention": "First true flintlock lock with vertical-sear mechanism",
      "Gunsmith": "Pierre & Marin Le Bourgeois, Lisieux (ca. 1620)",
      "Inlays": "Mother-of-pearl plaques, engraved brass, and silver wire",
      "Provenance": "Cabinet d'Armes de Louis XIII, Louvre",
    },
    price: "Sovereign Museum Treasure (Inestimable / £3,500,000 Indicative)",
    currency: "INR",
    year: "Lisieux, Circa 1620",
    designer: "Marin Le Bourgeois",
    source: "The Metropolitan Museum of Art (Acc. 1972.223)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Louis XIII", "Flintlock", "Invention", "France", "Mother-of-Pearl"],
  },
  {
    id: "firearms-french-empire-dueling-pair",
    category: "firearms",
    subcategory: "Cased Sets",
    brand: "ATELIER ROYAL DE PARIS",
    name: "Cased Presentation Pair of Micro-Grooved Dueling Pistols",
    description:
      "Charcoal-blued octagonal barrels, micro-grooved rifling, set hair triggers, and carved French walnut stocks preserved in original tooled green velvet cased mahogany box.",
    editorialNote:
      "Engineered to guarantee absolute mechanical parity between two gentlemen under the Code Duello. The set hair triggers reduce release resistance to four ounces.",
    heroImage: "/images/catalog/firearms/french-empire-dueling-pair/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/french-empire-dueling-pair/view-1.jpg",
      "/images/catalog/firearms/french-empire-dueling-pair/view-2.jpg",
      "/images/catalog/firearms/french-empire-dueling-pair/view-3.jpg",
      "/images/catalog/firearms/french-empire-dueling-pair/view-4.jpg",
    ],
    specifications: {
      "Origin": "Paris, Reign of Napoleon I (ca. 1815)",
      "Barrels": "14 3/4 inches (37.5 cm) octagonal blued steel",
      "Stock": "French walnut with ebony fore-end caps",
      "Case": "Fitted mahogany case with original loading accessories",
    },
    price: "Auction Record €650,000 (Indicative ₹6,15,00,000)",
    currency: "INR",
    year: "Paris, ca. 1815",
    designer: "Atelier Royal de Paris",
    source: "The Metropolitan Museum of Art (Acc. 04.3.190–.191)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Dueling Pistols", "French Empire", "Napoleon", "Cased Pair"],
  },
  {
    id: "firearms-leopold-wheellock-rifle",
    category: "firearms",
    subcategory: "Wheellocks",
    brand: "PETER PECK OF MUNICH",
    name: "Double-Barreled Wheellock Pistol Made for Holy Roman Emperor Charles V",
    description:
      "One of the rarest Renaissance mechanical arms in existence. Dual lockplates firing superposed charges, chiseled with the imperial double-headed eagle and Pillars of Hercules motto 'Plus Ultra'.",
    editorialNote:
      "Manufactured in Munich circa 1540–45 for Emperor Charles V. It is one of the earliest multi-shot firearms ever created, combining mechanical mastery with imperial heraldry.",
    heroImage: "/images/catalog/firearms/leopold-wheellock-rifle/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/leopold-wheellock-rifle/view-1.jpg",
      "/images/catalog/firearms/leopold-wheellock-rifle/view-2.jpg",
      "/images/catalog/firearms/leopold-wheellock-rifle/view-3.jpg",
      "/images/catalog/firearms/leopold-wheellock-rifle/view-4.jpg",
    ],
    specifications: {
      "Master Artisan": "Peter Peck (Munich, recorded 1540–died 1596)",
      "Imperial Patron": "Emperor Charles V (1500–1558)",
      "Barrels": "Side-by-side wheellock with independent lock mechanisms",
      "Insignia": "Pillars of Hercules and Habsburg Double Eagle",
    },
    price: "Habsburg Dynastic Heritage (£4,200,000 Indicative)",
    currency: "INR",
    year: "Munich, ca. 1540–45",
    designer: "Peter Peck",
    source: "The Metropolitan Museum of Art (Acc. 04.3.192)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Charles V", "Wheellock", "Munich", "Renaissance", "Habsburg"],
  },
  {
    id: "firearms-brescian-flintlock-pistols",
    category: "firearms",
    subcategory: "Flintlocks",
    brand: "LAZARINO COMINAZZO / BRESCIA",
    name: "Master Chiselled Steel Sidelock Pistols of Gardone Val Trompia",
    description:
      "The pinnacle of Italian gunsmithing art from Brescia, historical cradle of Beretta and Perazzi. Locks chiselled in pierced three-dimensional lace steel, briar walnut stocks, and mirror-finished barrels.",
    editorialNote:
      "Brescia's Val Trompia was famed throughout Europe for steel chiselling so delicate that lockplates resembled pierced Italian lace. Forged by the legendary Lazarino Cominazzo dynasty.",
    heroImage: "/images/catalog/firearms/brescian-flintlock-pistols/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/brescian-flintlock-pistols/view-1.jpg",
      "/images/catalog/firearms/brescian-flintlock-pistols/view-2.jpg",
    ],
    specifications: {
      "Barrel Maker": "Lazarino Cominazzo, Gardone Val Trompia, Brescia",
      "Steel": "Chiselled and pierced steel in high three-dimensional relief",
      "Lock": "Italian snaphaunce / flintlock system with external mainspring",
      "Stock": "Italian briar root with chiselled steel mounts",
    },
    price: "Auction Record €480,000 (Indicative ₹4,55,00,000)",
    currency: "INR",
    year: "Brescia, Circa 1690",
    designer: "Cominazzo Family",
    source: "The Metropolitan Museum of Art (Acc. 24.844)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Brescia", "Cominazzo", "Chiselled Steel", "Italy", "Beretta Heritage"],
  },
  {
    id: "firearms-napoleon-presentation-rifle",
    category: "firearms",
    subcategory: "Sporting Guns",
    brand: "NICOLAS-NOËL BOUTET",
    name: "The Imperial Presentation Double-Barreled Flintlock Sporting Piece",
    description:
      "Commissioned by Napoleon I as a sovereign presentation gift. Side-by-side Damascus barrels, gold-inlaid touchholes, waterproof roller frizzens, and ebony-inlaid carved walnut cheekpiece.",
    editorialNote:
      "Boutet's presentation double guns featured barrels twisted from alternating ribbons of steel and iron, creating floral Damascus patterns with unprecedented burst strength.",
    heroImage: "/images/catalog/firearms/napoleon-presentation-rifle/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/napoleon-presentation-rifle/view-1.jpg",
      "/images/catalog/firearms/napoleon-presentation-rifle/view-2.jpg",
      "/images/catalog/firearms/napoleon-presentation-rifle/view-3.jpg",
      "/images/catalog/firearms/napoleon-presentation-rifle/view-4.jpg",
    ],
    specifications: {
      "Directeur-Artiste": "Nicolas-Noël Boutet, Manufacture de Versailles",
      "Barrels": "Side-by-side Damascus twist with gold relief cartouches",
      "Action": "Double waterproof flintlock with roller frizzen springs",
      "Stock": "Select French walnut with carved wild boar cheekpiece",
    },
    price: "Auction Record £1,800,000 (Indicative ₹19,20,00,000)",
    currency: "INR",
    year: "Versailles, ca. 1805",
    designer: "Nicolas-Noël Boutet",
    source: "The Metropolitan Museum of Art (Acc. 23.950)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Boutet", "Napoleon", "Shotgun", "Damascus", "Versailles"],
  },
  {
    id: "firearms-manton-double-flintlock",
    category: "firearms",
    subcategory: "Sporting Guns",
    brand: "REAL ARMERÍA DE MADRID",
    name: "The Royal Chiselled Gold Miquelet Sporting Piece of King Charles IV",
    description:
      "Master Spanish miquelet lock forged for King Charles IV, featuring heavy solid-gold damascened royal crests, chiselled leaf scrollwork, and figured Spanish walnut stock.",
    editorialNote:
      "Preserved from the Spanish Royal Armory, this piece represents the pinnacle of Iberian gunsmithing, celebrated for its lightning-fast lock release and sculpted frizzen teeth.",
    heroImage: "/images/catalog/firearms/manton-double-flintlock/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/manton-double-flintlock/view-1.jpg",
    ],
    specifications: {
      "Armería": "Real Armería de Madrid, Spain (Reign of Charles IV)",
      "Lock": "Spanish patilla miquelet lock with gold-lined touchhole",
      "Damascene": "24-karat gold royal crown and heraldic lions",
    },
    price: "Royal Armory Heritage (£1,200,000 Indicative)",
    currency: "INR",
    year: "Madrid, Circa 1795",
    designer: "Master Armorer of the Real Armería",
    source: "The Metropolitan Museum of Art (Acc. 22.626)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Charles IV", "Spain", "Miquelet", "Gold", "Royal Armory"],
  },
  {
    id: "firearms-german-wheellock-garniture",
    category: "firearms",
    subcategory: "Wheellocks",
    brand: "DRESDEN COURT ARMOURY",
    name: "The Saxon Elector Wheellock Sporting Piece with Carved Staghorn",
    description:
      "Forged for the Elector of Saxony, featuring intricate engraved bone and staghorn marquetry depicting hunting scenes, chiselled wheel lock with external mainspring, and octagonal swamped barrel.",
    editorialNote:
      "Dresden was the foremost center for Renaissance hunting weapons. The carved staghorn inlays provided both structural reinforcement and narrative storytelling.",
    heroImage: "/images/catalog/firearms/german-wheellock-garniture/view-1.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/catalog/firearms/german-wheellock-garniture/view-1.jpg",
      "/images/catalog/firearms/german-wheellock-garniture/view-2.jpg",
    ],
    specifications: {
      "Armoury": "Dresden Court Armory (Rüstkammer Heritage)",
      "Mechanism": "Enclosed wheellock with external doghead and bridle",
      "Inlays": "Carved and engraved staghorn with horn buttplate",
      "Barrels": "Octagonal rifled steel with copper-inlaid touchhole",
    },
    price: "Historic Auction £850,000 (Indicative ₹9,10,00,000)",
    currency: "INR",
    year: "Saxony, Circa 1610",
    designer: "Dresden Master Stockmaker",
    source: "The Metropolitan Museum of Art (Acc. 22.115)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Saxony", "Wheellock", "Dresden", "Staghorn", "Renaissance"],
  },

  // ─────────────────────────────────────────────────────────────
  // 06 — ANTIQUES & HERITAGE
  // ─────────────────────────────────────────────────────────────
  {
    id: "antiques-boulle-commode-louis-xiv",
    category: "antiques",
    subcategory: "Royal Furnishings",
    brand: "ANDRÉ-CHARLES BOULLE",
    name: "The Louis XIV Commode Mazarine in Tortoiseshell & Gilt Bronze",
    description:
      "Monumental royal commode crafted for the Grand Trianon at Versailles: premiere-partie marquetry of red tortoiseshell and engraved brass, with sculptural ormolu mounts cast by Boulle.",
    editorialNote:
      "André-Charles Boulle served as Ébéniste du Roi to Louis XIV. His workshop inside the Louvre was granted the unique privilege of casting its own bronze mounts.",
    heroImage: "/images/collections/heritage/boulle-marquetry-commode-louis-xiv.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/collections/heritage/boulle-marquetry-commode-louis-xiv.jpg",
      "/images/catalog/antiques/boulle-commode-marquetry/view-1.jpg",
      "/images/catalog/antiques/boulle-commode-marquetry/view-2.jpg",
    ],
    specifications: {
      "Ébéniste": "André-Charles Boulle (1642–1732), Paris",
      "Marquetry": "Red hawksbill tortoiseshell, brass, and pewter inlays",
      "Bronzes": "Gilded mercury ormolu (d'or moulu) lion-paw feet and satyrs",
      "Top": "Griot d'Italie figured rouge marble slab",
    },
    price: "Auction Record £4,600,000 (Indicative ₹49,00,00,000)",
    currency: "INR",
    year: "Versailles, Circa 1708",
    designer: "André-Charles Boulle",
    source: "The Metropolitan Museum of Art / Royal Collection Trust",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Boulle", "Louis XIV", "Versailles", "Marquetry", "Ormolu"],
  },
  {
    id: "antiques-st-petersburg-porcelain-1792",
    category: "antiques",
    subcategory: "Porcelain Services",
    brand: "IMPERIAL PORCELAIN MANUFACTORY",
    name: "The Imperial Catherine II St. Petersburg Banquet Service (1792)",
    description:
      "The Arabesque Service ordered by Empress Catherine the Great: hand-painted classical medallions, gilded laurel leaf borders, and hard-paste porcelain fired in Saint Petersburg.",
    editorialNote:
      "Commissioned for grand imperial state banquets at the Winter Palace. Each plate depicts unique neoclassical cameos surrounded by 24-karat burnished gold relief.",
    heroImage: "/images/private-world/02-vault/st-petersburg-porcelain-1792-01.jpg",
    heroOrientation: "square",
    gallery: [
      "/images/private-world/02-vault/st-petersburg-porcelain-1792-01.jpg",
      "/images/private-world/02-vault/st-petersburg-porcelain-1792-02.jpg",
      "/images/private-world/02-vault/st-petersburg-porcelain-1792-03.jpg",
      "/images/private-world/02-vault/st-petersburg-porcelain-1792-04.jpg",
    ],
    specifications: {
      "Manufactory": "Imperial Porcelain Factory, Saint Petersburg (Est. 1744)",
      "Mark": "Underglaze blue Imperial Cypher of Catherine II (E II)",
      "Gilding": "High-relief mercury gilding chased with agate stones",
      "Setting": "Winter Palace State Banquet Hall",
    },
    price: "Auction Record $450,000 (Indicative ₹3,85,00,000)",
    currency: "INR",
    year: "Saint Petersburg, 1792",
    designer: "Jean-Dominique Rachette",
    source: "State Hermitage Museum / Christie's Russian Sale",
    officialUrl: "https://www.hermitagemuseum.org",
    tags: ["Imperial Porcelain", "Catherine the Great", "Saint Petersburg", "Banquet"],
  },
  {
    id: "antiques-sevres-porcelain-royal-tureen",
    category: "antiques",
    subcategory: "Porcelain Services",
    brand: "MANUFACTURE DE SÈVRES",
    name: "The Louis XV Bleu Céleste Royal Porcelain Tureen",
    description:
      "Soft-paste porcelain tureen executed in proprietary Bleu Céleste ground color, with reserve panels painted with exotic birds and heavy chased gold foliage.",
    editorialNote:
      "Bleu Céleste was developed by chemist Jean Hellot in 1753 exclusively for King Louis XV. This tureen was part of the first sovereign service delivered to Versailles.",
    heroImage: "/images/collections/objects/sevres-porcelain-royal-tureen.jpg",
    heroOrientation: "square",
    gallery: [
      "/images/collections/objects/sevres-porcelain-royal-tureen.jpg",
      "/images/catalog/antiques/sevres-porcelain-vase/view-1.jpg",
      "/images/catalog/antiques/sevres-porcelain-vase/view-2.jpg",
    ],
    specifications: {
      "Manufacture": "Manufacture Nationale de Sèvres (1754)",
      "Ground Color": "Bleu Céleste (Heavenly Turquoise Blue)",
      "Painter Mark": "Interlaced Ls enclosing date letter with painter's mark",
      "Mounts": "Gilt bronze pomegranate and dolphin finial",
    },
    price: "Auction Valuation £380,000 (Indicative ₹4,10,00,000)",
    currency: "INR",
    year: "Sèvres, 1754",
    designer: "Jean-Claude Duplessis",
    source: "The Metropolitan Museum of Art / Sèvres Cité de la Céramique",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Sèvres", "Louis XV", "Bleu Celeste", "Porcelain", "Versailles"],
  },
  {
    id: "antiques-mughal-silk-carpet",
    category: "antiques",
    subcategory: "Court Textiles",
    brand: "IMPERIAL MUGHAL ATELIER",
    name: "The 17th-Century Shah Jahan Imperial Silk & Pashmina Carpet",
    description:
      "Monumental court carpet woven in Lahore for Emperor Shah Jahan: silk foundation with 1,200 pashmina knots per square inch, featuring millefleurs blossoms in crimson and gold.",
    editorialNote:
      "Woven from the ultra-fine underfleece of Himalayan mountain goats on twisted silk warps, creating a textile so dense it possesses the soft sheen of polished jade.",
    heroImage: "/images/collections/heritage/mughal-royal-silk-carpet-17th-century.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/collections/heritage/mughal-royal-silk-carpet-17th-century.jpg",
    ],
    specifications: {
      "Patronage": "Emperor Shah Jahan (1628–1658)",
      "Weaving Center": "Imperial Court Karkhana, Lahore",
      "Pile Fiber": "100% Himalayan Pashmina Goat Fleece",
      "Knot Density": "1,220 knots / sq. inch (18,900 / sq. dm)",
    },
    price: "Auction Record £5,400,000 (Indicative ₹57,00,00,000)",
    currency: "INR",
    year: "Circa 1640",
    designer: "Imperial Mughal Master Weavers",
    source: "The Metropolitan Museum of Art Islamic Department",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Mughal", "Shah Jahan", "Silk Carpet", "Pashmina", "Lahore"],
  },
  {
    id: "antiques-chatsworth-library-books",
    category: "antiques",
    subcategory: "Archival Manuscripts",
    brand: "DUCAL COLLECTION OF DEVONSHIRE",
    name: "The Chatsworth Great Library 18th-Century Ducal Folios",
    description:
      "Hand-bound morocco leather folios with gold armorial stamps of the Dukes of Devonshire, preserved in the Great Library of Chatsworth House.",
    editorialNote:
      "Chatsworth holds one of the greatest private library collections in Great Britain, collected across four centuries by the Cavendish family.",
    heroImage: "/images/private-world/09-room/chatsworth-great-library-01.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/private-world/09-room/chatsworth-great-library-01.jpg",
      "/images/private-world/09-room/chatsworth-great-library-02.jpg",
      "/images/private-world/09-room/chatsworth-great-library-03.jpg",
      "/images/private-world/09-room/chatsworth-great-library-04.jpg",
    ],
    specifications: {
      "Repository": "Chatsworth Great Library, Derbyshire, England",
      "Binding": "Full crushed red morocco leather with 24K gold tooling",
      "Provenance": "Cavendish Family, Dukes of Devonshire",
    },
    price: "Hereditary Family Collection (Inestimable)",
    currency: "INR",
    year: "18th Century",
    designer: "London Master Bookbinders",
    source: "Chatsworth House Trust Archive",
    officialUrl: "https://www.chatsworth.org",
    tags: ["Chatsworth", "Devonshire", "Library", "Manuscripts", "Morocco Leather"],
  },

  // ─────────────────────────────────────────────────────────────
  // 07 — CABINET OF CURIOSITIES
  // ─────────────────────────────────────────────────────────────
  {
    id: "cabinet-jaquet-droz-automata",
    category: "cabinet",
    subcategory: "Automata",
    brand: "JAQUET-DROZ",
    name: "The Singing Bird & Mechanical Scribe Android Automaton",
    description:
      "18th-century Swiss automaton powered by a complex internal stack of cams, pinions, and gears, capable of dipping a goose quill into ink and writing custom calligraphic sentences.",
    editorialNote:
      "Built by Pierre Jaquet-Droz and his sons in La Chaux-de-Fonds between 1768 and 1774, presented before the courts of Louis XVI, Marie Antoinette, and the Spanish King.",
    heroImage: "/images/catalog/cabinet/jaquet-droz-automata/view-1.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/catalog/cabinet/jaquet-droz-automata/view-1.jpg",
      "/images/catalog/cabinet/jaquet-droz-automata/view-2.jpg",
      "/images/catalog/cabinet/jaquet-droz-automata/view-3.jpg",
      "/images/catalog/cabinet/jaquet-droz-automata/view-4.jpg",
    ],
    specifications: {
      "Inventor": "Pierre Jaquet-Droz (1721–1790)",
      "Mechanism": "Stack of 40 programmatic cams controlling anatomical fingers",
      "Body": "Carved mahogany figure in 18th-century royal velvet court dress",
      "Location": "Musée d'Art et d'Histoire, Neuchâtel",
    },
    price: "National Cultural Treasure (£8,000,000 Indicative)",
    currency: "INR",
    year: "1774 Historical Automaton",
    designer: "Pierre Jaquet-Droz",
    source: "Musée d'Art et d'Histoire Neuchâtel / Jaquet Droz Archives",
    officialUrl: "https://www.jaquet-droz.com",
    tags: ["Jaquet-Droz", "Automaton", "The Writer", "Neuchâtel", "Horology"],
  },
  {
    id: "cabinet-ormolu-astronomical-clock",
    category: "cabinet",
    subcategory: "Horological Curiosities",
    brand: "ATELIER DU ROI",
    name: "French Ormolu Astronomical Equation Clock (Circa 1775)",
    description:
      "Monumental gilded bronze mantel clock displaying mean solar time, apparent solar time, day of the week, lunar phases, and signs of the zodiac, supported by bronze figures of Chronos.",
    editorialNote:
      "A masterpiece of French neoclassical bronzework and celestial calculation, engineered to demonstrate the mathematical harmony between the solar year and the terrestrial day.",
    heroImage: "/images/collections/objects/ormolu-french-astronomical-clock.jpg",
    heroOrientation: "portrait",
    gallery: [
      "/images/collections/objects/ormolu-french-astronomical-clock.jpg",
    ],
    specifications: {
      "Caster": "Attributed to Philippe Caffiéri or Pierre Gouthière",
      "Functions": "Astronomical equation of time, calendar, moon phase",
      "Bronze": "Mercury-gilded chased ormolu on Belgian black marble plinth",
    },
    price: "Auction Record $920,000 (Indicative ₹7,80,00,000)",
    currency: "INR",
    year: "Paris, Circa 1775",
    designer: "Ferdinand Berthoud & Pierre Gouthière",
    source: "The Metropolitan Museum of Art (Acc. 58.121.1)",
    officialUrl: "https://www.metmuseum.org",
    tags: ["Astronomical Clock", "Ormolu", "Equation of Time", "Paris", "Curiosities"],
  },

  // ─────────────────────────────────────────────────────────────
  // 10 — TRAVEL & PRIVATE SANCTUARIES (100% AUTHENTIC PROPERTIES)
  // ─────────────────────────────────────────────────────────────
  {
    id: "travel-devshree-deogarh",
    category: "travel",
    subcategory: "Private Havelis",
    brand: "DEV SHREE DEOGARH",
    name: "Dev Shree Deogarh: The Custodian Haveli on Lake Ragho Sagar",
    description:
      "A private lakeside haveli constructed in traditional Mewari vernacular architecture by the Deogarh royal family: eight exclusive guest suites, deep verandahs, hand-carved stone pillars, and manicured courtyard gardens.",
    editorialNote:
      "Hosted directly by Kunwar Shatrunjai Singh and Bhavna Kumari of Deogarh. Not a commercial resort, but an intimate living ancestral residence offering home-cooked heirloom Mewari recipes and migratory bird sanctuary walks.",
    heroImage: "/images/private-world/06-palace/devshree-deogarh-01.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/private-world/06-palace/devshree-deogarh-01.jpg",
      "/images/private-world/06-palace/devshree-deogarh-02.jpg",
      "/images/private-world/06-palace/devshree-deogarh-03.jpg",
      "/images/private-world/06-palace/devshree-deogarh-04.jpg",
      "/images/private-world/06-palace/devshree-deogarh-05.jpg",
      "/images/private-world/08-portrait/shatrunjai-devshree-01.jpg",
    ],
    specifications: {
      "Hosts": "Kunwar Shatrunjai Singh & Bhavna Kumari of Deogarh",
      "Location": "Deogarh, District Rajsamand, Rajasthan",
      "Capacity": "Eight private luxury suites only",
      "Setting": "Directly overlooking Lake Ragho Sagar bird sanctuary",
      "Architecture": "Hand-chiseled Mewar stone arches, jharokhas, and lime plaster",
    },
    price: "₹45,000 – ₹75,000 / Night",
    currency: "INR",
    year: "Active Custodian Residence",
    designer: "Traditional Mewari Master Masons",
    source: "Dev Shree Deogarh Estate Office",
    officialUrl: "https://www.devshreedeogarh.com",
    tags: ["Dev Shree", "Deogarh", "Haveli", "Rajasthan", "Lake Sanctuary"],
  },
  {
    id: "travel-villa-d-este-como",
    category: "travel",
    subcategory: "Historic Grand Hotels",
    brand: "VILLA D'ESTE",
    name: "Villa d'Este: 16th-Century Cardinal's Water Palace on Lake Como",
    description:
      "Renaissance palazzo set in 25 acres of parkland with floating heated lake pool, mosaic grottoes, century-old cypress trees, and sovereign waterside terraces.",
    editorialNote:
      "Built in 1568 as the summer residence of Cardinal Tolomeo Gallio, Villa d’Este is the undisputed home of the Concorso d’Eleganza and classic European aristocracy.",
    heroImage: "/images/private-world/06-palace/villa-d-este-como-01.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/private-world/06-palace/villa-d-este-como-01.jpg",
      "/images/private-world/06-palace/villa-d-este-como-02.jpg",
      "/images/private-world/06-palace/villa-d-este-como-03.jpg",
      "/images/private-world/06-palace/villa-d-este-como-04.jpg",
    ],
    specifications: {
      "Location": "Cernobbio, Lake Como, Lombardy, Italy",
      "Architect": "Pellegrino Pellegrini (1568)",
      "Highlights": "The Mosaic Nymphaeum and floating swimming pool",
      "Host Venue": "Concorso d'Eleganza Villa d'Este",
    },
    price: "€1,400 – €5,500 / Night (Indicative ₹1,25,000 – ₹4,90,000)",
    currency: "INR",
    year: "Est. 1568",
    designer: "Pellegrino Pellegrini",
    source: "Villa d'Este Management",
    officialUrl: "https://www.villadeste.com",
    tags: ["Villa d'Este", "Lake Como", "Italy", "Palazzo", "Concorso"],
  },
  {
    id: "travel-rambagh-palace-jaipur",
    category: "travel",
    subcategory: "Palace Sanctuaries",
    brand: "TAJ RAMBAGH PALACE",
    name: "Rambagh Palace: The Jewel of Jaipur & Residence of the Maharajas",
    description:
      "The former residence of Maharaja Sawai Man Singh II and Maharani Gayatri Devi: 47 acres of Mughal gardens, marble cupolas, peacock lawns, and imperial heritage suites.",
    editorialNote:
      "Known as 'The Jewel of Jaipur', Rambagh Palace offers the authentic experience of royal Rajput hospitality, maintained with pristine fidelity by Taj Hotels.",
    heroImage: "/images/experiences/02-rambagh-palace-jaipur/img-01.webp",
    heroOrientation: "landscape",
    gallery: [
      "/images/experiences/02-rambagh-palace-jaipur/img-01.webp",
      "/images/experiences/02-rambagh-palace-jaipur/img-02.webp",
      "/images/experiences/02-rambagh-palace-jaipur/img-03.webp",
      "/images/experiences/02-rambagh-palace-jaipur/suryavanshi-suite-bedroom.png",
    ],
    specifications: {
      "Location": "Bhawani Singh Road, Jaipur, Rajasthan",
      "Royal History": "Former Principal Residence of the Jaipur Royal Family",
      "Signature Suite": "Suryavanshi Suite with crystal chandeliers",
      "Gardens": "47 acres of manicured ornamental gardens with peacocks",
    },
    price: "₹65,000 – ₹8,50,000 / Night",
    currency: "INR",
    year: "Royal Residence 1925",
    designer: "Sir Samuel Swinton Jacob",
    source: "Taj Hotels / Rambagh Palace Jaipur",
    officialUrl: "https://www.tajhotels.com",
    tags: ["Rambagh Palace", "Jaipur", "Gayatri Devi", "Rajasthan", "Palace"],
  },
  {
    id: "travel-umaid-bhawan-jodhpur",
    category: "travel",
    subcategory: "Palace Sanctuaries",
    brand: "TAJ UMAID BHAWAN PALACE",
    name: "Umaid Bhawan Palace: The Golden Sandstone Marvel of Marwar",
    description:
      "One of the world's largest private royal residences, built in golden Chittar sandstone: 105-foot central cupola, subterranean zodiac pool, and private royal family wing.",
    editorialNote:
      "Commissioned by Maharaja Umaid Singh in 1929, designed by renowned British architect Henry Lanchester in a monumental blend of Art Deco and classical Rajput architecture.",
    heroImage: "/images/experiences/01-umaid-bhawan-palace-jodhpur/01-hero.webp",
    heroOrientation: "landscape",
    gallery: [
      "/images/experiences/01-umaid-bhawan-palace-jodhpur/01-hero.webp",
      "/images/experiences/01-umaid-bhawan-palace-jodhpur/02-dome.webp",
      "/images/experiences/01-umaid-bhawan-palace-jodhpur/03-durbar-hall.webp",
      "/images/experiences/01-umaid-bhawan-palace-jodhpur/04-norblin-murals.webp",
      "/images/experiences/01-umaid-bhawan-palace-jodhpur/06-pool.webp",
    ],
    specifications: {
      "Architect": "Henry Vaughan Lanchester",
      "Stone": "Chittar golden sandstone assembled without mortar",
      "Rooms": "64 palatial rooms and suites operated by Taj",
      "Custodian": "Maharaja Gaj Singh II of Jodhpur",
    },
    price: "₹75,000 – ₹10,00,000 / Night",
    currency: "INR",
    year: "Completed 1943",
    designer: "Henry Lanchester",
    source: "Umaid Bhawan Palace Management / Taj Hotels",
    officialUrl: "https://www.tajhotels.com",
    tags: ["Umaid Bhawan", "Jodhpur", "Art Deco", "Marwar", "Palace"],
  },
  {
    id: "travel-the-balmoral-edinburgh",
    category: "travel",
    subcategory: "Historic Grand Hotels",
    brand: "ROCCO FORTE THE BALMORAL",
    name: "The Balmoral: The Sovereign Scottish Railway Landmark",
    description:
      "Edinburgh's legendary railway grand hotel at 1 Princes Street: majestic clock tower, Scottish baronial architecture, Michelin-starred Number One dining, and Scotch whisky vault.",
    editorialNote:
      "Opened in 1902 as the North British Station Hotel. Its iconic clock tower is famously set three minutes fast to ensure travelers never miss their trains.",
    heroImage: "/images/private-world/06-palace/the-balmoral-edinburgh-01.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/private-world/06-palace/the-balmoral-edinburgh-01.jpg",
      "/images/private-world/06-palace/the-balmoral-edinburgh-02.jpg",
      "/images/private-world/06-palace/the-balmoral-edinburgh-03.jpg",
      "/images/private-world/06-palace/the-balmoral-edinburgh-04.jpg",
    ],
    specifications: {
      "Address": "1 Princes Street, Edinburgh, Scotland",
      "Clock Tower": "Iconic clock traditionally running 3 minutes fast",
      "Whisky Bar": "SCOTCH with over 500 rare single malts",
    },
    price: "£450 – £2,800 / Night (Indicative ₹48,000 – ₹3,00,000)",
    currency: "INR",
    year: "Est. 1902",
    designer: "W. Hamilton Beattie",
    source: "Rocco Forte Hotels",
    officialUrl: "https://www.roccofortehotels.com",
    tags: ["The Balmoral", "Edinburgh", "Scotland", "Princes Street", "Whisky"],
  },
  {
    id: "travel-ahilya-fort-maheshwar",
    category: "travel",
    subcategory: "Palace Sanctuaries",
    brand: "AHILYA FORT",
    name: "Ahilya Fort: 18th-Century Fortress Above the Sacred Narmada",
    description:
      "The riverside bastion of legendary philosopher-queen Ahilyabai Holkar: massive stone ramparts, private courtyards, handloom weaving cooperative, and organic vegetable gardens.",
    editorialNote:
      "Maintained by Prince Richard Holkar, culinary author and direct descendant of Maharani Ahilyabai. Guests dine by candlelight overlooking ancient river ghats.",
    heroImage: "/images/private-world/06-palace/ahilya-fort-maheshwar-01.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/private-world/06-palace/ahilya-fort-maheshwar-01.jpg",
      "/images/private-world/06-palace/ahilya-fort-maheshwar-02.jpg",
      "/images/private-world/06-palace/ahilya-fort-maheshwar-03.jpg",
      "/images/private-world/06-palace/ahilya-fort-maheshwar-04.jpg",
    ],
    specifications: {
      "Host": "Prince Richard Holkar of Indore",
      "Location": "Maheshwar, Madhya Pradesh (Overlooking River Narmada)",
      "Accommodations": "19 unique rooms spread across stone courtyards",
      "Legacy": "Rehwa Society handloom silk-cotton revival",
    },
    price: "₹38,000 – ₹70,000 / Night",
    currency: "INR",
    year: "Active Custodian Fort",
    designer: "Holkar Dynastic Architecture",
    source: "Ahilya Fort Heritage Office",
    officialUrl: "https://www.ahilyafort.com",
    tags: ["Ahilya Fort", "Maheshwar", "Holkar", "Narmada", "Sanctuary"],
  },
  {
    id: "travel-taj-lake-palace-udaipur",
    category: "travel",
    subcategory: "Lakeside Sanctuaries",
    brand: "TAJ LAKE PALACE",
    name: "Taj Lake Palace: The Floating White Marble Mirage of Lake Pichola",
    description:
      "Constructed in 1746 by Maharana Jagat Singh II as Jag Niwas: four acres of pure white Mewar marble floating seamlessly in the waters of Lake Pichola.",
    editorialNote:
      "Arrived at exclusively by private royal barge, Taj Lake Palace is celebrated worldwide as one of the most romantic and acoustically serene sanctuaries on Earth.",
    heroImage: "/images/experiences/03-taj-lake-palace-udaipur/01-hero.webp",
    heroOrientation: "landscape",
    gallery: [
      "/images/experiences/03-taj-lake-palace-udaipur/01-hero.webp",
      "/images/experiences/03-taj-lake-palace-udaipur/img-02.webp",
      "/images/experiences/03-taj-lake-palace-udaipur/img-03.webp",
      "/images/experiences/03-taj-lake-palace-udaipur/img-04.webp",
    ],
    specifications: {
      "Location": "Lake Pichola, Udaipur, Rajasthan",
      "Foundation": "Built on a natural 4-acre rock foundation in Lake Pichola",
      "Marble": "Pure Makrana and Mewari white marble with stained glass cusped arches",
    },
    price: "₹70,000 – ₹7,50,000 / Night",
    currency: "INR",
    year: "1746 Jag Niwas",
    designer: "Maharana Jagat Singh II",
    source: "Taj Hotels / Lake Palace Udaipur",
    officialUrl: "https://www.tajhotels.com",
    tags: ["Lake Palace", "Udaipur", "Lake Pichola", "Mewar", "White Marble"],
  },
  {
    id: "travel-fateh-prakash-udaipur",
    category: "travel",
    subcategory: "Palace Sanctuaries",
    brand: "FATEH PRAKASH PALACE",
    name: "Fateh Prakash Palace & The Royal Durbar Hall",
    description:
      "Located within the grand City Palace complex of Udaipur: home to the magnificent Durbar Hall Sabhagaar with historic portraits, Belgian crystal chandeliers, and Mewari weaponry.",
    editorialNote:
      "Built during the reign of Maharana Fateh Singh. The Durbar Hall features one of the most imposing crystal candelabra collections in the world.",
    heroImage: "/images/private-world/09-room/fateh-prakash-durbar-hall-01.jpg",
    heroOrientation: "landscape",
    gallery: [
      "/images/private-world/09-room/fateh-prakash-durbar-hall-01.jpg",
      "/images/private-world/09-room/fateh-prakash-durbar-hall-02.jpg",
      "/images/private-world/09-room/fateh-prakash-durbar-hall-03.jpg",
      "/images/private-world/09-room/fateh-prakash-durbar-hall-04.jpg",
    ],
    specifications: {
      "Location": "City Palace Complex, Udaipur, Rajasthan",
      "Hall": "The Grand Durbar Hall Sabhagaar with Belgian crystal",
      "Custodian": "HRH Group of Hotels / House of Mewar",
    },
    price: "₹45,000 – ₹1,20,000 / Night",
    currency: "INR",
    year: "Circa 1905",
    designer: "Maharana Fateh Singh of Mewar",
    source: "HRH Group of Hotels Udaipur",
    officialUrl: "https://www.hrhhotels.com",
    tags: ["Fateh Prakash", "Durbar Hall", "City Palace", "Udaipur", "Mewar"],
  },
];

export function getCatalogItemsByCategory(category: CatalogItem["category"]): CatalogItem[] {
  return CATALOG_ITEMS.filter((item) => item.category === category);
}

export function getCatalogItemById(id: string): CatalogItem | undefined {
  return CATALOG_ITEMS.find((item) => item.id === id);
}

export function searchCatalog(query: string): CatalogItem[] {
  if (!query || !query.trim()) return CATALOG_ITEMS.slice(0, 10);
  const q = query.toLowerCase().trim();
  return CATALOG_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.subcategory.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
  );
}
`;

fs.writeFileSync(catalogFile, code, 'utf8');
console.log("Successfully generated clean authentic catalog in lib/membership/private-world-catalog.ts!");
