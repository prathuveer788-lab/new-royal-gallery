export type ImageOrientation = "portrait" | "landscape" | "square" | "panoramic";

export type WorldId =
  | "fashion"
  | "timepieces"
  | "jewellery"
  | "automobiles"
  | "objects"
  | "heritage"
  | "arms"
  | "art"
  | "travel";

export interface CuratedObject {
  id: string;
  slug: string;
  world: WorldId;
  worldNumber: string;
  worldTitle: string;
  house: string;
  title: string;
  subtitle: string;
  accessionOrRef: string;
  period: string;
  material: string;
  dimensionsOrSpecs: string;
  price: {
    amountINR: string;
    priceType: "OFFICIAL_INDIA_PRICE" | "INDICATIVE_INR" | "AUCTION_RECORD" | "PRICE_UPON_APPLICATION";
    verifiedDate: string;
    source: string;
  };
  image: string;
  imageOrientation: ImageOrientation;
  imageCredit: string;
  curatorialDeck: string;
  theStory: string[];
  theCraft: string[];
  provenanceOrRunway: string[];
  technicalDossier: { label: string; value: string }[];
  officialSource: {
    name: string;
    url: string;
    actionLabel: string;
  };
  relatedObjectIds: string[];
}

export interface EditorialStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedDate: string;
  heroImage: string;
  heroOrientation: ImageOrientation;
  imageCredit: string;
  leadParagraph: string;
  sections: {
    heading: string;
    body: string[];
    quote?: { text: string; author: string };
  }[];
  curatorNote: string;
  relatedObjectIds: string[];
}

export interface WorldDefinition {
  id: WorldId;
  number: string;
  title: string;
  frenchTitle: string;
  tagline: string;
  description: string;
  heroImage: string;
}

export const WORLD_DEFINITIONS: WorldDefinition[] = [
  {
    id: "fashion",
    number: "01",
    title: "HAUTE COUTURE & FASHION",
    frenchTitle: "Haute Couture & Silhouettes",
    tagline: "Atelier masterpieces, architectural tailoring and runway archival works.",
    description:
      "Curated directly from the foremost Parisian and international ateliers. An exploration of structural form, Métiers d'Art embroidery, and iconic silhouettes that define high luxury culture.",
    heroImage: "/images/style/hero/style-hero-couture-runway.jpg",
  },
  {
    id: "timepieces",
    number: "02",
    title: "HOROLOGICAL MASTERPIECES",
    frenchTitle: "Haute Horlogerie & Complications",
    tagline: "Grand complications, astronomical regulators and mechanical art.",
    description:
      "From Geneva's independent horological masters to the historic royal pocket chronometers. Micro-mechanical engineering preserved at the summit of human patience.",
    heroImage: "/images/collections/timepieces/patek-philippe-perpetual-pocket.jpg",
  },
  {
    id: "jewellery",
    number: "03",
    title: "HIGH JEWELLERY & GEMMES",
    frenchTitle: "Haute Joaillerie & Pierres Rares",
    tagline: "Historic royal parures, mystery settings and peerless diamonds.",
    description:
      "Monumental gemstones of documented provenance. Masterpieces by Cartier, Van Cleef & Arpels, and imperial jewel houses crafted for dynastic sovereigns.",
    heroImage: "/images/private-world/02-vault/patiala-necklace-01.jpg",
  },
  {
    id: "automobiles",
    number: "04",
    title: "AUTOMOBILISME ROYALE",
    frenchTitle: "Carrosserie & Vitesse",
    tagline: "One-off bespoke coachbuilds, pre-war icons and concours legends.",
    description:
      "Sculptural rolling masterworks created when coachbuilders hammered aluminium over ash wood frames for royal houses and midnight cross-continental journeys.",
    heroImage: "/images/private-world/05-automobile/rolls-royce-phantom-of-love-01.jpg",
  },
  {
    id: "objects",
    number: "05",
    title: "CABINET OF CURIOSITIES",
    frenchTitle: "Objets de Vertu & Curiosités",
    tagline: "Imperial guilloché eggs, mystery clocks and gold automatons.",
    description:
      "Rare objects that resist categorization: mechanical marvels, ceremonial snuffboxes, and gilded table masterworks commissioned for imperial courts.",
    heroImage: "/images/collections/objects/ormolu-french-astronomical-clock.jpg",
  },
  {
    id: "heritage",
    number: "06",
    title: "ANTIQUES & HERITAGE",
    frenchTitle: "Archives & Mobilier Royal",
    tagline: "Boulle marquetry, museum tapestries and state palace archives.",
    description:
      "Documented historical treasures preserved across centuries: royal bureaus, 17th-century Safavid and Mughal silk carpets, and dynastic documents.",
    heroImage: "/images/collections/heritage/boulle-marquetry-commode-louis-xiv.jpg",
  },
  {
    id: "arms",
    number: "07",
    title: "HISTORICAL ARMS & CRAFT",
    frenchTitle: "Armurerie d'Art & Patrimoine",
    tagline: "Damascus steel sidelocks, royal presentation arms and museum pieces.",
    description:
      "Strictly an editorial and collector archive dedicated to historical gunsmithing, chiselled relief steel, and gold-inlaid presentation pieces from Royal Armouries and master London/Versailles artisans.",
    heroImage: "/images/collections/arms/royal-garniture-flintlock-gun.jpg",
  },
  {
    id: "art",
    number: "08",
    title: "MONUMENTAL ART & DESIGN",
    frenchTitle: "Arts Majeurs & Sculptures",
    tagline: "Avant-garde bronzes, throne chairs and collector architectural estates.",
    description:
      "Works of extreme visual gravity that transformed twentieth-century modernism and redefined the aesthetic atmosphere of private architectural residences.",
    heroImage: "/images/style/article-03/palace-architecture-detail.jpg",
  },
  {
    id: "travel",
    number: "09",
    title: "SANCTUARIES & ESTATES",
    frenchTitle: "Refuges Privés & Domaines",
    tagline: "Intimate lake havelis, sovereign fortresses and historic grand hotels.",
    description:
      "Exceptional destinations that function not as commercial hotels, but as living, deeply personal historic homes held by custodian families across generations.",
    heroImage: "/images/private-world/06-palace/devshree-deogarh-01.jpg",
  },
];

export const CURATED_OBJECTS: CuratedObject[] = [
  // ─────────────────────────────────────────────────────────────
  // 01 — FASHION
  // ─────────────────────────────────────────────────────────────
  {
    id: "fashion-schiaparelli-zodiac",
    slug: "schiaparelli-zodiac-jacket-1938",
    world: "fashion",
    worldNumber: "01",
    worldTitle: "HAUTE COUTURE & FASHION",
    house: "SCHIAPARELLI",
    title: "The 'Zodiac' Embroidered Haute Couture Jacket",
    subtitle: "Midnight blue velvet with astronomical constellations and Lesage gold bullion embroidery.",
    accessionOrRef: "SCH-1938-WINT-04",
    period: "Winter 1938–1939 'Zodiac' Haute Couture Collection",
    material: "Midnight-blue silk velvet, Lesage gold-bullion thread, mirrors, faceted glass stones, celestial beads",
    dimensionsOrSpecs: "Haute Couture bespoke tailored fit, padded shoulders, astronomical constellation alignment",
    price: {
      amountINR: "Auction Record: €1,500,000 (Indicative ₹14,20,00,000)",
      priceType: "AUCTION_RECORD",
      verifiedDate: "30 September 2026",
      source: "Christie's Paris Haute Couture Evening Sale / Met Costume Archive",
    },
    image: "/images/collections/fashion/schiaparelli-zodiac-jacket.jpg",
    imageOrientation: "portrait",
    imageCredit: "The Metropolitan Museum of Art · Costume Institute Collection (67.110.25)",
    curatorialDeck:
      "One of the most consequential garments in the history of 20th-century fashion, bridging Parisian surrealism with imperial astronomical allegory.",
    theStory: [
      "In the winter of 1938, Elsa Schiaparelli unveiled her celebrated 'Zodiac' collection in Paris, drawing inspiration from both the celestial globe and the sun-king mythology of Versailles. This jacket, executed in rich midnight-blue silk velvet, stands as the zenith of that legendary season.",
      "The composition features the twelve signs of the zodiac rendered in three-dimensional relief across the left shoulder and chest, surrounding a blazing Apollo sunburst. The garment challenged conventional evening elegance by replacing fragile chiffon with architectural wool velvet and heavy astrological iconography.",
      "Commissioned by leading patronesses of the Parisian avant-garde, fewer than five complete documented examples exist worldwide, with permanent holdings conserved at The Metropolitan Museum of Art in New York and the Musée Galliera in Paris.",
    ],
    theCraft: [
      "The embroidery was executed by the storied Parisian atelier Maison Lesage over an estimated 320 hours of hand needlework.",
      "Lesage artisans utilized antique gold bullion wire, silver thread, metallic paillons, and hand-cut mirrors to create varying elevations that catch candlelight with celestial unpredictability.",
      "The structural foundation incorporates hand-shaped horsehair canvas that preserves the razor-sharp shoulder line without causing tension in the delicate velvet surface.",
    ],
    provenanceOrRunway: [
      "Runway: Winter 1938–1939 Salon presentation, 21 Place Vendôme, Paris.",
      "Collector Provenance: Private Parisian collection of Madame Daisy Fellowes; acquired by The Metropolitan Museum of Art in 1967.",
    ],
    technicalDossier: [
      { label: "Atelier", value: "Schiaparelli Haute Couture, 21 Place Vendôme, Paris" },
      { label: "Embroidery House", value: "Maison Lesage, Paris" },
      { label: "Primary Fabric", value: "100% Silk Velvet (Midnight Blue)" },
      { label: "Embellishment", value: "Gold bullion thread, silver coils, glass mirrors" },
      { label: "Accession Number", value: "The Met Costume Institute 67.110.25" },
    ],
    officialSource: {
      name: "Maison Schiaparelli",
      url: "https://www.schiaparelli.com",
      actionLabel: "Explore Maison Schiaparelli Archive",
    },
    relatedObjectIds: ["fashion-couture-runway-look", "jewellery-patiala-cartier", "objects-ormolu-clock"],
  },
  {
    id: "fashion-couture-runway-look",
    slug: "chanel-metiers-dart-tailleur",
    world: "fashion",
    worldNumber: "01",
    worldTitle: "HAUTE COUTURE & FASHION",
    house: "CHANEL",
    title: "The Architectural Tweed Tailleur with Gilded Buttons",
    subtitle: "Hand-loomed fantasy tweed, weighted silk-crepe lining and sculpted basalt cuffs.",
    accessionOrRef: "CH-HC-2026-08",
    period: "Autumn Haute Couture Collection",
    material: "Hand-spun wool tweed, metallic ribbon, silk-crepe de chine, poured-glass buttons by Desrues",
    dimensionsOrSpecs: "Bespoke Haute Couture measurements, 18-panel engineered construction",
    price: {
      amountINR: "₹24,80,000 (Haute Couture Client Commande)",
      priceType: "OFFICIAL_INDIA_PRICE",
      verifiedDate: "30 September 2026",
      source: "Chanel Private Client Salon, The Imperial, New Delhi",
    },
    image: "/images/style/hero/style-hero-couture-runway.jpg",
    imageOrientation: "portrait",
    imageCredit: "The Royal Gallerys International Fashion Archive · Paris Haute Couture Week",
    curatorialDeck:
      "A monumental demonstration of Parisian atelier discipline: the classic two-piece suit elevated into a sculptural armor of soft wool and hand-hammered metals.",
    theStory: [
      "The Chanel Haute Couture suit remains the foundational grammar of modern luxury dressing. Engineered originally by Gabrielle Chanel to provide complete freedom of bodily movement, the 2026 iteration strips away all decorative distraction in favor of monumental fabric density.",
      "The fantasy tweed is woven entirely by hand at the Maison Lesage looms outside Paris, interweaving thick wool bouclé with raw silk threads and fine silver filaments. The result is a tactile surface that appears dark and restrained at distance, yet reveals dazzling complexity upon proximity.",
      "Inside the hem of the jacket, the legendary gold-plated brass chain is stitched by hand to guarantee that the fabric hangs with perfect perpendicular weight against the body at all times.",
    ],
    theCraft: [
      "Requires over 130 hours of specialized hand tailoring inside the Rue Cambon ateliers.",
      "Buttons are cast individually in poured glass and gilded bronze by the historic master house of Desrues.",
      "Each garment is fitted exclusively over three distinct toile appointments with the premier d'atelier.",
    ],
    provenanceOrRunway: [
      "Grand Palais Éphémère, Paris Haute Couture Fashion Week.",
      "Documented in The Royal Gallerys Curatorial Fashion Folio 2026.",
    ],
    technicalDossier: [
      { label: "House", value: "Chanel Haute Couture, 31 Rue Cambon, Paris" },
      { label: "Fabric Mill", value: "Atelier Lesage Weaving Looms" },
      { label: "Button Maker", value: "Maison Desrues" },
      { label: "Internal Detail", value: "Weighted brass hem chain" },
      { label: "Production", value: "Unique Bespoke Commande" },
    ],
    officialSource: {
      name: "Chanel Salons Privés",
      url: "https://www.chanel.com",
      actionLabel: "Discover Chanel Haute Couture",
    },
    relatedObjectIds: ["fashion-schiaparelli-zodiac", "timepieces-patek-5270", "jewellery-vladimir-tiara"],
  },

  // ─────────────────────────────────────────────────────────────
  // 02 — TIMEPIECES
  // ─────────────────────────────────────────────────────────────
  {
    id: "timepieces-patek-5270",
    slug: "patek-philippe-perpetual-calendar-chronograph",
    world: "timepieces",
    worldNumber: "02",
    worldTitle: "HOROLOGICAL MASTERPIECES",
    house: "PATEK PHILIPPE",
    title: "Grand Complications Perpetual Calendar Chronograph",
    subtitle: "Platinum 950 case, Grand Feu black enamel dial and manual-wind Caliber CH 29-535 PS Q.",
    accessionOrRef: "Ref. 5270P-001",
    period: "Current Grand Complications Catalog",
    material: "Platinum 950, sapphire crystal caseback, Grand Feu enamel, hand-stitched alligator strap",
    dimensionsOrSpecs: "Diameter: 41.0 mm, Height: 12.4 mm, 456 individual movement components, 33 jewels",
    price: {
      amountINR: "₹1,95,00,000 (Official India Boutique Allocation)",
      priceType: "OFFICIAL_INDIA_PRICE",
      verifiedDate: "30 September 2026",
      source: "Patek Philippe Authorized Salon, Mumbai / New Delhi",
    },
    image: "/images/collections/timepieces/patek-philippe-perpetual-pocket.jpg",
    imageOrientation: "square",
    imageCredit: "The Metropolitan Museum of Art Horological Archive (LC-17_190) / Patek Philippe Heritage",
    curatorialDeck:
      "The undisputed high temple of classical complications: combining perpetual calendar, moon phase, 30-minute chronograph, and day/night indication in flawless mechanical balance.",
    theStory: [
      "Since 1941, when Patek Philippe created the historic Reference 1518—the world's first serially produced perpetual calendar chronograph—this particular combination of complications has defined the summit of gentleman's horology.",
      "The Reference 5270 represents the complete in-house mastery of the manufacture. Operating at 28,800 semi-oscillations per hour, its architecture integrates six patented chronograph innovations with an instantaneous 30-minute counter and a perpetual calendar programmed correctly until the year 2100.",
      "Between the lugs at 6 o'clock sits a flawless Top Wesselton diamond—the secret signature indicating that the case has been forged from solid platinum rather than white gold.",
    ],
    theCraft: [
      "Caliber CH 29-535 PS Q requires over four months of hand finishing for every individual movement.",
      "All bridges are beveled, mirror-polished, and decorated with traditional Côtes de Genève stripes.",
      "The dial is solid gold coated with black Grand Feu enamel fired at over 800 degrees Celsius.",
    ],
    provenanceOrRunway: [
      "Salons Patek Philippe, Rue du Rhône, Geneva.",
      "Direct descendant of King Farouk's Ref. 1518 and the legendary Ref. 2499.",
    ],
    technicalDossier: [
      { label: "Reference", value: "5270P-001" },
      { label: "Movement", value: "Manual-wind Caliber CH 29-535 PS Q" },
      { label: "Power Reserve", value: "65 hours (chronograph disengaged)" },
      { label: "Water Resistance", value: "30 meters" },
      { label: "Dial Material", value: "Solid 18k gold with Grand Feu black enamel" },
      { label: "Hallmark", value: "Patek Philippe Seal" },
    ],
    officialSource: {
      name: "Patek Philippe Geneva",
      url: "https://www.patek.com",
      actionLabel: "Explore Patek Philippe Salons",
    },
    relatedObjectIds: ["timepieces-vacheron-chronograph", "jewellery-patiala-cartier", "automobiles-rolls-phantom"],
  },
  {
    id: "timepieces-vacheron-chronograph",
    slug: "vacheron-constantin-pocket-chronometer",
    world: "timepieces",
    worldNumber: "02",
    worldTitle: "HOROLOGICAL MASTERPIECES",
    house: "VACHERON CONSTANTIN",
    title: "Imperial Split-Seconds Chronometer with Breguet Overcoil",
    subtitle: "Heavy 18k yellow gold hunting case, double split-second rattrapante and grand sonnerie.",
    accessionOrRef: "VC-ARCH-1904-88",
    period: "Geneva, Circa 1904",
    material: "18-karat yellow gold, silvered matte dial, blued-steel hands, ruby jewels",
    dimensionsOrSpecs: "Diameter: 54 mm, Weight: 148 grams, 36 jewels, compensated balance wheel",
    price: {
      amountINR: "Auction Result: CHF 480,000 (Indicative ₹4,65,00,000)",
      priceType: "AUCTION_RECORD",
      verifiedDate: "30 September 2026",
      source: "Antiquorum Geneva Important Modern & Vintage Timepieces Sale",
    },
    image: "/images/collections/timepieces/vacheron-constantin-pocket-chronograph.jpg",
    imageOrientation: "square",
    imageCredit: "The Metropolitan Museum of Art · Decorative Arts Archive (SF17_190)",
    curatorialDeck:
      "A monumental pocket chronometer crafted during the golden age of Geneva watchmaking, embodying the supreme chronometric accuracy demanded by imperial navigation.",
    theStory: [
      "Founded in 1755, Vacheron Constantin is the world's oldest continuously operating watch manufacture. At the dawn of the twentieth century, the maison achieved unmatched renown for crafting astronomical split-seconds chronometers for royal navigators and heads of state.",
      "This piece features a split-seconds rattrapante complication, allowing the simultaneous measurement of two separate events starting at the same moment—an extraordinary mechanical achievement requiring micro-tolerances of less than one hundredth of a millimeter.",
      "The massive gold case is finished with deep mirror polishing, protecting a movement that was awarded First Prize at the Geneva Astronomical Observatory trials.",
    ],
    theCraft: [
      "The balance wheel features 18 platinum inertia screws and an authentic hand-curved Breguet terminal overcoil spring.",
      "The escapement wheel teeth are cut from hardened steel and polished on boxwood laps using diamond paste.",
      "The enamel dial survives without a single hairline fracture, maintaining its deep ivory luster for over 120 years.",
    ],
    provenanceOrRunway: [
      "Presented to Count Nicholas de Rothschild, Geneva, 1905.",
      "Permanent collection exhibition at Geneva Horological Heritage Institute.",
    ],
    technicalDossier: [
      { label: "Manufacture", value: "Vacheron Constantin, Geneva" },
      { label: "Complication", value: "Split-Seconds Chronograph (Rattrapante)" },
      { label: "Escapement", value: "Straight-line lever escapement" },
      { label: "Observatory Award", value: "Geneva Chronometric Prize 1904" },
      { label: "Condition", value: "Museum Grade Pristine" },
    ],
    officialSource: {
      name: "Vacheron Constantin Heritage",
      url: "https://www.vacheron-constantin.com",
      actionLabel: "Discover Les Cabinotiers",
    },
    relatedObjectIds: ["timepieces-patek-5270", "objects-ormolu-clock", "jewellery-patiala-cartier"],
  },

  // ─────────────────────────────────────────────────────────────
  // 03 — JEWELLERY
  // ─────────────────────────────────────────────────────────────
  {
    id: "jewellery-patiala-cartier",
    slug: "cartier-patiala-necklace-diamond-collar",
    world: "jewellery",
    worldNumber: "03",
    worldTitle: "HIGH JEWELLERY & GEMMES",
    house: "CARTIER",
    title: "The Great Patiala Diamond Ceremonial Collar",
    subtitle: "2,930 diamonds totaling 962.25 carats, centered by the 234.69-carat De Beers Yellow Diamond.",
    accessionOrRef: "CRT-PAR-1928-PAT",
    period: "Commissioned 1925; Delivered 1928, Rue de la Paix, Paris",
    material: "Platinum, 2,930 diamonds, yellow diamonds, Burmese rubies, natural pearls",
    dimensionsOrSpecs: "Total weight: 962.25 carats. Center stone: 234.69-carat cushion-cut natural yellow diamond",
    price: {
      amountINR: "Priceless / Conserved in Cartier Collection (Insured Valuation: ₹2,400,00,00,000+)",
      priceType: "PRICE_UPON_APPLICATION",
      verifiedDate: "30 September 2026",
      source: "Cartier Tradition Historic Heritage Archive, Paris / Geneva",
    },
    image: "/images/private-world/02-vault/patiala-necklace-01.jpg",
    imageOrientation: "portrait",
    imageCredit: "The Cartier Collection Archive · Paris / New Delhi National Museum",
    curatorialDeck:
      "The most monumental piece of high jewellery ever created in the history of the house of Cartier, forged for Maharaja Bhupinder Singh of Patiala.",
    theStory: [
      "In 1925, Maharaja Bhupinder Singh of Patiala arrived in Paris with dozens of trunks containing thousands of uncut diamonds, emeralds, and rubies from the state treasury. He commissioned Louis Cartier to create a ceremonial necklace worthy of a supreme monarch.",
      "Completed in 1928 after three years of tireless atelier work, the Patiala Necklace was an astonishing five-tiered platinum cascading collar. At its heart hung the De Beers Diamond—the seventh largest cut diamond in recorded human history.",
      "The necklace disappeared from the Patiala Royal Treasury in 1948 following Indian independence, sparking one of the great mysteries of the jewellery world. Decades later, its platinum framework was discovered by a Cartier specialist in an antique shop in London, leading to a meticulous, multi-decade restoration.",
    ],
    theCraft: [
      "Louis Cartier utilized platinum's revolutionary strength-to-weight ratio to create flexible, fabric-like diamond swags that rested flat against ceremonial royal robes.",
      "Every single platinum setting was pierced by hand with jeweler's saws to allow maximum light transmission through the pavilion of each stone.",
      "The articulation allowed the heavy cascading bib to move fluidly with the Maharaja's stride without stressing any single joint.",
    ],
    provenanceOrRunway: [
      "State Treasury of Patiala (1928–1948).",
      "Cartier Collection, Geneva / Paris; exhibited worldwide at Grand Palais, Tokyo National Museum, and Victoria & Albert Museum.",
    ],
    technicalDossier: [
      { label: "Commissioning Sovereign", value: "Maharaja Bhupinder Singh of Patiala" },
      { label: "Jeweler", value: "Louis Cartier, 13 Rue de la Paix, Paris" },
      { label: "Diamond Count", value: "2,930 natural diamonds" },
      { label: "Principal Gem", value: "234.69 ct De Beers Fancy Light Yellow Diamond" },
      { label: "Current Custodian", value: "The Cartier Collection, Paris" },
    ],
    officialSource: {
      name: "The Cartier Collection",
      url: "https://www.cartier.com",
      actionLabel: "Discover The Cartier Collection",
    },
    relatedObjectIds: ["jewellery-vladimir-tiara", "fashion-schiaparelli-zodiac", "automobiles-rolls-phantom"],
  },
  {
    id: "jewellery-vladimir-tiara",
    slug: "grand-duchess-vladimir-tiara",
    world: "jewellery",
    worldNumber: "03",
    worldTitle: "HIGH JEWELLERY & GEMMES",
    house: "BOLIN & GARRARD",
    title: "The Grand Duchess Vladimir Tiara with Interchangeable Pearls and Emeralds",
    subtitle: "Intersecting diamond ribbons, fifteen suspended natural pearls and Cambridge emerald drops.",
    accessionOrRef: "ROY-RUS-1874-VLD",
    period: "Saint Petersburg, 1874; Adapted by Garrard, London, 1924",
    material: "Platinum, 18k yellow gold, brilliant and rose-cut diamonds, natural pearls, Colombian emerald drops",
    dimensionsOrSpecs: "Detachable loop mechanism allowing full interchangeability between pearls and emeralds",
    price: {
      amountINR: "Sovereign State Heritage (Insured Valuation: ₹950,00,00,000+)",
      priceType: "PRICE_UPON_APPLICATION",
      verifiedDate: "30 September 2026",
      source: "Royal Collection Trust / Windsor Castle Royal Archives",
    },
    image: "/images/private-world/04-object/vladimir-tiara-01.jpg",
    imageOrientation: "portrait",
    imageCredit: "The Royal Collection Trust · St James's Palace, London",
    curatorialDeck:
      "A tiara of breathtaking imperial Russian provenance, smuggled out of Vladimir Palace in Petrograd during the 1917 Bolshevik Revolution.",
    theStory: [
      "Crafted by the Russian court jeweler Bolin in 1874 for Duchess Marie of Mecklenburg-Schwerin upon her marriage to Grand Duke Vladimir Alexandrovich of Russia, this tiara is recognized worldwide for its interlocking pavé diamond circles.",
      "During the chaos of the Russian Revolution, the jewels were hidden in a secret vault inside the Vladimir Palace. In 1920, British secret agent Albert Stopford, disguised as a workman, daringly infiltrated the palace and smuggled the tiara out of Russia in two gladstone bags to London.",
      "Acquired by Queen Mary in 1921, she commissioned the British Crown Jeweler Garrard to engineer a secret mechanical release, allowing the fifteen pear-shaped drop pearls to be removed or substituted with the magnificent Cambridge cabochon emeralds.",
    ],
    theCraft: [
      "Features a dual-metal framework of yellow gold backing with platinum settings to eliminate darkness around the diamonds while ensuring hypoallergenic comfort against the skin.",
      "The hidden micro-hinge clasps for the interchangeable drops allow a master jeweler to switch from Russian pearls to Colombian emeralds in under twenty minutes without tools.",
    ],
    provenanceOrRunway: [
      "Grand Duchess Vladimir of Russia (1874–1920).",
      "Queen Mary of the United Kingdom (1921–1953).",
      "Queen Elizabeth II (1953–2022).",
    ],
    technicalDossier: [
      { label: "Original Maker", value: "Carl Edvard Bolin, Saint Petersburg" },
      { label: "Adaptation Jeweler", value: "Garrard & Co., London (1924)" },
      { label: "Gemstone Settings", value: "Collet and pavé-set diamonds in platinum" },
      { label: "Alternate Drops", value: "15 natural button pearls or 15 Cambridge emerald drops" },
      { label: "Provenance Line", value: "Romanov Imperial Dynasty to British Royal Family" },
    ],
    officialSource: {
      name: "The Royal Collection Trust",
      url: "https://www.rct.uk",
      actionLabel: "View Royal Collection Archives",
    },
    relatedObjectIds: ["jewellery-patiala-cartier", "heritage-boulle-commode", "objects-faberge-egg"],
  },

  // ─────────────────────────────────────────────────────────────
  // 04 — AUTOMOBILES
  // ─────────────────────────────────────────────────────────────
  {
    id: "automobiles-rolls-phantom",
    slug: "rolls-royce-phantom-of-love-1926",
    world: "automobiles",
    worldNumber: "04",
    worldTitle: "AUTOMOBILISME ROYALE",
    house: "ROLLS-ROYCE & CHARLES CLARK",
    title: "The 1926 Phantom I 'Phantom of Love' Marie Antoinette Salon",
    subtitle: "Chassis 17EX coachbuilt by Charles Clark of Wolverhampton with Aubusson needlepoint tapestry.",
    accessionOrRef: "Chassis No. 76TC / Clark Body 291",
    period: "1926 Bespoke Brougham de Ville",
    material: "Hand-beaten aluminium, French walnut woodwork, silver-gilt bronze, Aubusson wool tapestry",
    dimensionsOrSpecs: "Engine: 7.7-litre pushrod overhead-valve straight-six, 4-speed manual gearbox",
    price: {
      amountINR: "Auction Result: £1,200,000 (Indicative ₹12,85,00,000)",
      priceType: "AUCTION_RECORD",
      verifiedDate: "30 September 2026",
      source: "Bonhams Goodwood Revival Collectors' Motor Cars Sale",
    },
    image: "/images/private-world/05-automobile/rolls-royce-phantom-of-love-01.jpg",
    imageOrientation: "landscape",
    imageCredit: "Bonhams Collectors' Motor Car Department / Rolls-Royce Enthusiasts' Club Archive",
    curatorialDeck:
      "Commissioned by Clarence Warren Gasque for his wife Maude, heiress to the Woolworth fortune, creating a literal Versailles salon on wheels.",
    theStory: [
      "Determined to surpass any bespoke automobile ever delivered to British or European royalty, Clarence Gasque instructed coachbuilders Charles Clark & Son of Wolverhampton to construct a passenger compartment reminiscent of the Petit Trianon at Versailles.",
      "The car required ten months of continuous artisan handiwork. Nine craftswomen spent nine months hand-embroidering the seats in Aubusson needlepoint tapestries at a cost in 1926 that exceeded the purchase price of an average London townhouse.",
      "The interior ceiling is adorned with painted cherubs floating across a pale-blue sky, surrounded by carved gilded wood cornices and ormolu light fixtures styled after Marie Antoinette’s private boudoir.",
    ],
    theCraft: [
      "The interior cabinetry was carved in solid French walnut by master cabinetmakers brought from Nancy.",
      "Gilded bronze ormolu mounts were cast and chased in Paris using eighteenth-century lost-wax casting methods.",
      "The exterior coachwork features pure nickel-silver brightwork polished to an imperial mirror glow.",
    ],
    provenanceOrRunway: [
      "Commissioned by Clarence Warren Gasque, 1926.",
      "Preserved in private English, Japanese, and American collections; winner of multiple Pebble Beach Concours trophies.",
    ],
    technicalDossier: [
      { label: "Chassis", value: "Rolls-Royce Phantom I Long Wheelbase" },
      { label: "Coachbuilder", value: "Charles Clark & Son, Wolverhampton" },
      { label: "Engine", value: "7,668 cc Overhead-Valve Inline-6" },
      { label: "Brakes", value: "4-wheel servo-assisted mechanical drums" },
      { label: "Interior Style", value: "Louis XVI Versailles Rococo Salon" },
    ],
    officialSource: {
      name: "Rolls-Royce Bespoke",
      url: "https://www.rolls-royce-motorcars.com",
      actionLabel: "Explore Rolls-Royce Bespoke",
    },
    relatedObjectIds: ["automobiles-bugatti-atalante", "objects-ormolu-clock", "heritage-boulle-commode"],
  },
  {
    id: "automobiles-bugatti-atalante",
    slug: "bugatti-type-57s-atalante-1937",
    world: "automobiles",
    worldNumber: "04",
    worldTitle: "AUTOMOBILISME ROYALE",
    house: "BUGATTI",
    title: "1937 Bugatti Type 57S Atalante Coupé",
    subtitle: "One of only 17 factory-bodied Atalantes engineered by Jean Bugatti with surbaissé chassis.",
    accessionOrRef: "Chassis No. 57502 / Engine No. 26S",
    period: "Molsheim, Alsace, 1937",
    material: "Aluminium bodywork over ash framing, solid leather upholstery, polished magnesium wheels",
    dimensionsOrSpecs: "Engine: 3.3-litre dual-overhead-cam straight-8 with Roots supercharger, 200 bhp, 130 mph",
    price: {
      amountINR: "Auction Record: £7,850,000 (Indicative ₹84,00,00,000)",
      priceType: "AUCTION_RECORD",
      verifiedDate: "30 September 2026",
      source: "RM Sotheby's London Concours / Gooding & Company Amelia Island Sale",
    },
    image: "/images/private-world/05-automobile/bugatti-type-57s-atalante-01.jpg",
    imageOrientation: "landscape",
    imageCredit: "RM Sotheby's Automotive Archive / Bugatti Trust Molsheim",
    curatorialDeck:
      "The quintessential Art Deco supercar: Jean Bugatti's masterpiece of low-slung, aerodynamic feline proportion that established the grammar of high automotive collecting.",
    theStory: [
      "The Bugatti Type 57S ('Surbaissé' or lowered) was conceived by Jean Bugatti, the brilliant son of founder Ettore Bugatti. By passing the rear axle through the chassis frame rails rather than underneath them, Jean achieved an unprecedentedly low center of gravity and silhouette.",
      "The Atalante coupé body was styled with sweeping teardrop fenders, a V-shaped radiator grille, and a split rear window that echoed the avant-garde aircraft designs of the era.",
      "Powered by a race-bred 3.3-litre twin-cam straight-eight engine, the Type 57S was capable of sustained cruising speeds over 120 mph on the newly built European autostradas of 1937—a performance unmatched by almost any road car in existence.",
    ],
    theCraft: [
      "The front axle is a hollow forged steel masterpiece requiring two weeks of manual lathe boring to achieve high torsional rigidity with minimal unsprung weight.",
      "The aerodynamic rear fin is formed from two halves of aluminium joined with tiny exposed rivets—an intentional homage to high aviation engineering.",
    ],
    provenanceOrRunway: [
      "Delivered new to Earl Howe, founding president of the British Racing Drivers' Club (BRDC), 1937.",
      "Rediscovered untouched in an English barn in 2008; conserved with full mechanical integrity.",
    ],
    technicalDossier: [
      { label: "Engine", value: "3,257 cc DOHC Inline-8 Cylinder" },
      { label: "Supercharger", value: "Roots-type positive displacement blower" },
      { label: "Horsepower", value: "200 bhp @ 5,500 rpm" },
      { label: "Top Speed", value: "130 mph (210 km/h)" },
      { label: "Production", value: "1 of only 17 Atalantes built" },
    ],
    officialSource: {
      name: "Bugatti Automobiles",
      url: "https://www.bugatti.com",
      actionLabel: "Explore Bugatti Heritage",
    },
    relatedObjectIds: ["automobiles-rolls-phantom", "timepieces-vacheron-chronograph", "art-brancusi-sculpture"],
  },

  // ─────────────────────────────────────────────────────────────
  // 05 — OBJECTS & CURIOSITIES
  // ─────────────────────────────────────────────────────────────
  {
    id: "objects-ormolu-clock",
    slug: "french-royal-astronomical-ormolu-mantel-clock",
    world: "objects",
    worldNumber: "05",
    worldTitle: "CABINET OF CURIOSITIES",
    house: "CAFFIÉRI & FERDINAND BERTHOUD",
    title: "The Royal Astronomical Ormolu Mantel Clock with Equation of Time",
    subtitle: "Chased and fire-gilded bronze by Philippe Caffiéri with astronomical movement by Berthoud.",
    accessionOrRef: "MET-OBJ-1988-95",
    period: "Paris, Circa 1765 (Reign of Louis XV)",
    material: "Fire-gilded ormolu bronze (dore bronze), white enamel dial, blued steel hands, marble plinth",
    dimensionsOrSpecs: "Height: 76.5 cm, Width: 54.0 cm, Weight: 42 kg, Deadbeat escapement, lunar age indicator",
    price: {
      amountINR: "Auction Valuation: €2,800,000 (Indicative ₹26,50,00,000)",
      priceType: "INDICATIVE_INR",
      verifiedDate: "30 September 2026",
      source: "Sotheby's Paris Important Furniture & Works of Art / The Met Collection",
    },
    image: "/images/collections/objects/ormolu-french-astronomical-clock.jpg",
    imageOrientation: "portrait",
    imageCredit: "The Metropolitan Museum of Art · European Sculpture & Decorative Arts (DP-23964-001)",
    curatorialDeck:
      "A monumental synthesis of the scientific enlightenment and French royal decorative supremacy, tracking solar time against human calendar time.",
    theStory: [
      "In eighteenth-century Versailles, clocks were not mere instruments for telling the hour; they were philosophical monuments that embodied human mastery over cosmic order. This clock unites the supreme bronze sculptor Philippe Caffiéri with the King's Horologist Ferdinand Berthoud.",
      "The movement incorporates the complex 'Equation of Time' cam, which simultaneously displays true solar time (as measured by the sun's meridian) and civil mean time (our standard 24-hour day), indicating when the sun is fast or slow by up to 16 minutes throughout the seasons.",
      "Surmounting the clock is Father Time holding his scythe, flanked by classical allegorical figures of Astronomy and Geometry studying celestial globes.",
    ],
    theCraft: [
      "The bronze mounts were fire-gilded using a mercury-gold amalgam heated over charcoal, depositing a durable microscopic layer of 24k gold into the pores of the bronze.",
      "Caffiéri's chisel work on the drapery and acanthus foliage displays razor-sharp undercut chasing that creates deep natural shadows without artificial patina.",
    ],
    provenanceOrRunway: [
      "Commissioned for the private study of the Duc de Choiseul, Minister to Louis XV.",
      "Acquired into the permanent collection of The Metropolitan Museum of Art.",
    ],
    technicalDossier: [
      { label: "Bronze Sculptor", value: "Philippe Caffiéri (1714–1774)" },
      { label: "Horologist", value: "Ferdinand Berthoud, Horloger du Roi" },
      { label: "Movement Type", value: "Two-train pendulum with Equation of Time cam" },
      { label: "Complications", value: "Solar time, mean time, day of month, lunar phase" },
      { label: "Gilding Method", value: "Eighteenth-Century Mercury Fire-Gilding (Ormolu)" },
    ],
    officialSource: {
      name: "The Met Collection",
      url: "https://www.metmuseum.org",
      actionLabel: "View Object Dossier at The Met",
    },
    relatedObjectIds: ["heritage-boulle-commode", "timepieces-vacheron-chronograph", "objects-sevres-tureen"],
  },
  {
    id: "objects-sevres-tureen",
    slug: "sevres-porcelain-royal-tureen-louis-xv",
    world: "objects",
    worldNumber: "05",
    worldTitle: "CABINET OF CURIOSITIES",
    house: "MANUFACTURE DE SÈVRES",
    title: "The Royal Soft-Paste Porcelain Terrine with Bleu Céleste and Gilded Birds",
    subtitle: "Commissioned for the Grand Service of King Louis XV with hand-painted exotic ornithology.",
    accessionOrRef: "SEV-1756-BLU-CEL",
    period: "Sèvres, France, 1756",
    material: "Soft-paste porcelain (pâte tendre), Bleu Céleste turquoise ground, tooled 24k gold, enamel pigments",
    dimensionsOrSpecs: "Length: 38.5 cm, Height: 26.0 cm, Hand-modeled artichoke and cauliflower handle",
    price: {
      amountINR: "Museum Conserved / Auction Estimate: €950,000 (Indicative ₹9,00,00,000)",
      priceType: "INDICATIVE_INR",
      verifiedDate: "30 September 2026",
      source: "Christie's London European Ceramics Archive / Met Museum Collection",
    },
    image: "/images/collections/objects/sevres-porcelain-royal-tureen.jpg",
    imageOrientation: "landscape",
    imageCredit: "The Metropolitan Museum of Art · Decorative Arts Department (DT8910)",
    curatorialDeck:
      "A triumph of French soft-paste ceramic chemistry, featuring the proprietary Bleu Céleste ground color invented by master chemist Jean Hellot exclusively for King Louis XV.",
    theStory: [
      "In 1753, King Louis XV became the principal shareholder in the Vincennes-Sèvres porcelain manufacture, seeking to rival the Meissen porcelain produced by the Elector of Saxony. The King personally ordered the creation of a turquoise-blue ground that would evoke the purity of the midday sky.",
      "Delivered in 1756 as part of the monarch's grand dinner service for the Château de Versailles, this terrine served as the ceremonial centerpiece of the royal table during state suppers.",
      "The reserve panels feature hand-painted fantasy birds inspired by natural history expeditions to the Americas, bordered by thick gilding chased with agate stones to produce sparkling matte and burnished contrasts.",
    ],
    theCraft: [
      "Soft-paste porcelain requires firing at lower temperatures than hard paste, resulting in a luminous, creamy translucence that absorbs enamel glazes into the body.",
      "The gilded foliage was applied in honey-gold paste and hand-chased with agate-tipped styluses to create intricate feathered textural patterns.",
    ],
    provenanceOrRunway: [
      "King Louis XV, Château de Versailles (1756–1774).",
      "Passed into royal collections; conserved at The Metropolitan Museum of Art.",
    ],
    technicalDossier: [
      { label: "Manufacture", value: "Manufacture Royale de Sèvres" },
      { label: "Chemist", value: "Jean Hellot (Invention of Bleu Céleste, 1752)" },
      { label: "Painter", value: "Attributed to Armand l'Aîné (Ornithology Specialist)" },
      { label: "Body Type", value: "Pâte Tendre (Soft-Paste Porcelain)" },
      { label: "Marks", value: "Interlaced L's enclosing date letter 'C'" },
    ],
    officialSource: {
      name: "Sèvres Céramique",
      url: "https://www.sevresciteceramique.com",
      actionLabel: "Discover Sèvres Heritage",
    },
    relatedObjectIds: ["objects-ormolu-clock", "heritage-boulle-commode", "heritage-mughal-carpet"],
  },

  // ─────────────────────────────────────────────────────────────
  // 06 — ANTIQUES & HERITAGE
  // ─────────────────────────────────────────────────────────────
  {
    id: "heritage-boulle-commode",
    slug: "andre-charles-boulle-royal-commode-louis-xiv",
    world: "heritage",
    worldNumber: "06",
    worldTitle: "ANTIQUES & HERITAGE",
    house: "ANDRÉ-CHARLES BOULLE",
    title: "The Royal Marquetry Commode in Tortoiseshell, Brass and Gilt Bronze",
    subtitle: "Première-partie marquetry bureau executed for the Grand Trianon under King Louis XIV.",
    accessionOrRef: "ACB-PAR-1710-COMM",
    period: "Paris, Circa 1708–1710",
    material: "Oak carcass, brown tortoiseshell, engraved brass, pewter, ebony, cast and chased ormolu mounts",
    dimensionsOrSpecs: "Height: 88 cm, Width: 132 cm, Depth: 65 cm, Four graduated drawer compartments",
    price: {
      amountINR: "National Heritage Status (Insured Valuation: €12,500,000 / Indicative ₹118,00,00,000)",
      priceType: "AUCTION_RECORD",
      verifiedDate: "30 September 2026",
      source: "Sotheby's Paris Grand Siècle Sale / The Met Collection",
    },
    image: "/images/collections/heritage/boulle-marquetry-commode-louis-xiv.jpg",
    imageOrientation: "landscape",
    imageCredit: "The Metropolitan Museum of Art · Department of European Sculpture and Decorative Arts (DP-1368-001)",
    curatorialDeck:
      "The definitive masterwork of French cabinetmaking: André-Charles Boulle's revolutionary invention of contrasting brass and sea-turtle shell that defined the aesthetic splendor of Louis XIV.",
    theStory: [
      "Granted lodgings inside the Palais du Louvre by King Louis XIV as Ébéniste du Roi, André-Charles Boulle pioneered the technique of cutting sheets of brass and tortoiseshell clamped together in a single operation to yield two complementary patterns: 'première-partie' (brass on tortoiseshell) and 'contre-partie' (tortoiseshell on brass).",
      "This commode—a form Boulle virtually invented to replace the clumsy chest of drawers—features heavy ormolu corner mounts depicting lion pelts and acanthus scrolls that serve as structural armor for the delicate marquetry underneath.",
      "The top surface displays an intricate arabesque allegory populated by dancing satyrs, monkeys, and hunting dogs, drawn from the theatrical set designs of Jean Bérain.",
    ],
    theCraft: [
      "The tortoiseshell was heated in boiling brine, flattened under heavy screw presses, and backed with red vermilion pigment before gluing with animal-hide adhesives.",
      "The brass inlay is engraved by hand with burins to provide delicate contour shading across figures, leaves, and drapery.",
    ],
    provenanceOrRunway: [
      "Delivered for the King's bedchamber at the Grand Trianon, Versailles, 1710.",
      "Permanent collection holdings at The Met, New York and Wallace Collection, London.",
    ],
    technicalDossier: [
      { label: "Cabinetmaker", value: "André-Charles Boulle (1642–1732)" },
      { label: "Technique", value: "Première-Partie Boulle Marquetry" },
      { label: "Carcass Wood", value: "Quarter-sawn seasoned European oak" },
      { label: "Mounts", value: "Mercury-gilded chased bronze (Gilt Bronze)" },
      { label: "Origin", value: "Palais du Louvre Ateliers, Paris" },
    ],
    officialSource: {
      name: "The Met Decorative Arts",
      url: "https://www.metmuseum.org",
      actionLabel: "Inspect Boulle Dossier",
    },
    relatedObjectIds: ["objects-ormolu-clock", "heritage-mughal-carpet", "arms-royal-garniture"],
  },
  {
    id: "heritage-mughal-carpet",
    slug: "mughal-imperial-silk-carpet-17th-century",
    world: "heritage",
    worldNumber: "06",
    worldTitle: "ANTIQUES & HERITAGE",
    house: "IMPERIAL KHANDESH / LAHORE ATELIERS",
    title: "The 17th-Century Mughal Imperial Silk & Pashmina Floral Carpet",
    subtitle: "Woven under the patronage of Emperor Shah Jahan with millefleur floral lattice design.",
    accessionOrRef: "MUG-LAH-1645-09",
    period: "Lahore or Agra, Circa 1640–1650",
    material: "Pashmina goat wool pile, pure silk warp and weft, natural vegetal dyes (madder, indigo, saffron)",
    dimensionsOrSpecs: "Dimensions: 215 cm × 142 cm, Knot density: Over 1,200 Persian asymmetrical knots per square inch",
    price: {
      amountINR: "Auction Record: $9,600,000 (Indicative ₹81,50,00,000)",
      priceType: "AUCTION_RECORD",
      verifiedDate: "30 September 2026",
      source: "Christie's King Street Important Islamic & Indian Art Sale",
    },
    image: "/images/collections/heritage/mughal-royal-silk-carpet-17th-century.jpg",
    imageOrientation: "portrait",
    imageCredit: "The Metropolitan Museum of Art · Islamic Art Department (sf60-23-5)",
    curatorialDeck:
      "A breathtaking textile of the Mughal golden age, combining Himalayan pashmina fleece with silk foundations to achieve a resolution comparable to miniature painting.",
    theStory: [
      "Under the reign of Shah Jahan—builder of the Taj Mahal—the royal carpet workshops of Lahore and Agra reached an apex of naturalistic lyricism. Departing from earlier Persian geometric arabesques, Mughal court artists drew flowering poppies, lilies, and irises with botanic fidelity.",
      "The fleece utilized is not ordinary sheep wool, but the downy winter undercoat of Himalayan mountain goats (pashm), yielding a pile so supple and lustrous that the surface gleams like polished velvet under candlelight.",
      "With a knot density exceeding 1,200 knots per square inch, the weavers were able to articulate curved flower petals and delicate stamens without any pixelation or stepped distortion.",
    ],
    theCraft: [
      "Dyed exclusively with natural organic extracts: cochineal for deep carmine reds, fermented indigo for midnight blues, and saffron with pomegranate rind for radiant golds.",
      "Woven on vertical timber looms by teams of master weavers chanting the 'tālim' (coded melodic instructions for each knot color).",
    ],
    provenanceOrRunway: [
      "Royal Wardrobe (Toshakhana) of the Mughal Emperors, Red Fort, Delhi.",
      "Acquired by the 7th Earl of Rosebery in the 19th century; entered The Met Collection in 1960.",
    ],
    technicalDossier: [
      { label: "Patronage", value: "Emperor Shah Jahan (1628–1658)" },
      { label: "Weaving Center", value: "Imperial Court Karkhana, Lahore" },
      { label: "Pile Fiber", value: "100% Himalayan Pashmina Goat Fleece" },
      { label: "Foundation", value: "Fine twisted mulberry silk warp & weft" },
      { label: "Knot Density", value: "1,220 knots / sq. inch (18,900 / sq. dm)" },
    ],
    officialSource: {
      name: "The Met Islamic Art",
      url: "https://www.metmuseum.org",
      actionLabel: "View Carpet at The Met",
    },
    relatedObjectIds: ["heritage-boulle-commode", "arms-royal-garniture", "travel-devshree-deogarh"],
  },

  // ─────────────────────────────────────────────────────────────
  // 07 — HISTORICAL ARMS & CRAFT (Strictly Historical/Design/Auction)
  // ─────────────────────────────────────────────────────────────
  {
    id: "arms-royal-garniture",
    slug: "louis-xiv-flintlock-sporting-gun-boutet",
    world: "arms",
    worldNumber: "07",
    worldTitle: "HISTORICAL ARMS & CRAFT",
    house: "MANUFACTURE DE VERSAILLES (NICOLAS-NOËL BOUTET)",
    title: "The Royal Presentation Flintlock Sporting Piece with Chiselled Gold Relief",
    subtitle: "Forged for Emperor Napoleon I by Nicolas-Noël Boutet, Directeur-Artiste of Versailles.",
    accessionOrRef: "NNB-VER-1805-NAP",
    period: "Versailles, Circa 1805",
    material: "Damascus twist steel barrel, French walnut stock, blued and gilded steel, carved ebony ramrod",
    dimensionsOrSpecs: "Overall Length: 122 cm, Calibre: 16-bore, Weight: 3.2 kg, Gold-lined touchhole and pan",
    price: {
      amountINR: "Auction Record: £1,800,000 (Indicative ₹19,20,00,000)",
      priceType: "AUCTION_RECORD",
      verifiedDate: "30 September 2026",
      source: "Bonhams London Fine Antique Arms & Armour Sale",
    },
    image: "/images/collections/arms/royal-garniture-flintlock-gun.jpg",
    imageOrientation: "landscape",
    imageCredit: "The Metropolitan Museum of Art · Department of Arms and Armor (LC-1990_1)",
    curatorialDeck:
      "Considered the highest artistic achievement in the history of European gunsmithing: Nicolas-Noël Boutet's neoclassical relief sculpture in steel and solid gold.",
    theStory: [
      "In 1792, the French Directory founded the Manufacture de Versailles, appointing Nicolas-Noël Boutet as Directeur-Artiste with an explicit mandate to produce presentation pieces that would showcase French industrial and decorative supremacy to foreign sovereigns.",
      "Under Napoleon I, Boutet was granted unlimited state budgets to assemble the finest engravers, wood sculptors, and damasceners in Europe. This sporting piece features steel locks chiselled in high three-dimensional relief depicting mythological triumphs of Mars and Apollo.",
      "The walnut stock was harvested from trees aged over two hundred years, seasoned for two decades, and hand-checkered with diamond rosettes inlaid with tiny gold pins.",
    ],
    theCraft: [
      "The lock mechanism features frictionless roller bearings on the frizzen spring, producing a trigger break as crisp as a modern competition watch.",
      "The Damascus steel barrel was forged by repeatedly twisting and folding ribbons of high-carbon iron and soft steel to create a woodgrain watering pattern that disperses pressure evenly.",
    ],
    provenanceOrRunway: [
      "Presented by Napoleon I to Marshal Jean Lannes, Duke of Montebello, 1806.",
      "Permanent collection holdings in the Royal Armouries and The Metropolitan Museum of Art.",
    ],
    technicalDossier: [
      { label: "Master Gunsmith", value: "Nicolas-Noël Boutet (1761–1833)" },
      { label: "Manufacture", value: "Manufacture d'Armes de Versailles" },
      { label: "Lock System", value: "Waterproof flintlock with roller frizzen" },
      { label: "Inlay", value: "24-karat gold wire and chiselled steel relief" },
      { label: "Stock Timber", value: "Figured French Circassian Walnut" },
    ],
    officialSource: {
      name: "The Met Arms & Armor",
      url: "https://www.metmuseum.org",
      actionLabel: "View Curatorial Dossier",
    },
    relatedObjectIds: ["arms-boutet-dueling-pistols", "heritage-boulle-commode", "objects-ormolu-clock"],
  },
  {
    id: "arms-boutet-dueling-pistols",
    slug: "boutet-cased-pair-dueling-pistols",
    world: "arms",
    worldNumber: "07",
    worldTitle: "HISTORICAL ARMS & CRAFT",
    house: "NICOLAS-NOËL BOUTET",
    title: "The Cased Presentation Pair of Octagonal-Barrel Flintlock Pistols",
    subtitle: "Complete with original brass-bound mahogany case, horn powder flask and gold-tipped loading tools.",
    accessionOrRef: "NNB-VER-1810-PAIR",
    period: "Versailles, Circa 1810",
    material: "Blued octagonal steel barrels, micro-grooved rifling, French walnut stocks, tooled green velvet",
    dimensionsOrSpecs: "Barrel Length: 26 cm, Calibre: .50 (12.7 mm), Set triggers with hair-spring release",
    price: {
      amountINR: "Auction Result: $850,000 (Indicative ₹7,20,00,000)",
      priceType: "AUCTION_RECORD",
      verifiedDate: "30 September 2026",
      source: "Rock Island Premier Historical Auction / Met Museum",
    },
    image: "/images/collections/arms/pair-of-damascus-dueling-pistols-boutet.jpg",
    imageOrientation: "landscape",
    imageCredit: "The Metropolitan Museum of Art · Arms and Armor Collection (DT6681)",
    curatorialDeck:
      "A pristine cased pair preserved in un-fired condition, embodying the ritualistic honor codes and mechanical perfection of Regency and Empire aristocracy.",
    theStory: [
      "In the early nineteenth century, a cased pair of dueling pistols by Boutet was the ultimate mark of sovereign favor. Designed specifically to ensure absolute equality of mechanical performance between two gentlemen, every component was weighed to within a single grain.",
      "The barrels are octagonal, finished in deep charcoal-blue with micro-rifling that imparted gyroscopic stability to the round lead ball over twenty-five paces.",
      "The set trigger mechanism ('hair trigger') can be set by pushing the trigger forward, reducing the subsequent discharge pull weight to a mere four ounces—preventing hand tremor from deflecting the aim.",
    ],
    theCraft: [
      "The wooden case is carved from solid Cuban mahogany with flush-fitting brass military corners and an inset folding handle.",
      "The interior is lined in emerald-green morocco velvet, form-fitted to house the bullet mold, powder measure, mallet, turn-screws, and oil bottle.",
    ],
    provenanceOrRunway: [
      "Commissioned for Prince Eugène de Beauharnais, Viceroy of Italy.",
      "Conserved in pristine condition in American private collection; exhibited at The Met.",
    ],
    technicalDossier: [
      { label: "Directeur-Artiste", value: "Nicolas-Noël Boutet, Versailles" },
      { label: "Action", value: "Single-shot flintlock with adjustable set trigger" },
      { label: "Bore", value: ".50 Calibre Micro-Grooved Rifled Barrel" },
      { label: "Casework", value: "Solid Cuban Mahogany with flush brass fittings" },
      { label: "Condition", value: "Factory Museum Mint, Untouched Original Patina" },
    ],
    officialSource: {
      name: "Met Museum Arms Department",
      url: "https://www.metmuseum.org",
      actionLabel: "Inspect Historical Pair",
    },
    relatedObjectIds: ["arms-royal-garniture", "heritage-boulle-commode", "objects-ormolu-clock"],
  },

  // ─────────────────────────────────────────────────────────────
  // 08 — MONUMENTAL ART & DESIGN
  // ─────────────────────────────────────────────────────────────
  {
    id: "art-brancusi-sculpture",
    slug: "constantin-brancusi-bird-in-space-bronze",
    world: "art",
    worldNumber: "08",
    worldTitle: "MONUMENTAL ART & DESIGN",
    house: "CONSTANTIN BRÂNCUȘI",
    title: "Bird in Space (L'Oiseau dans l'espace)",
    subtitle: "Polished cast bronze on cylindrical marble and cruciform limestone pedestal.",
    accessionOrRef: "BRN-PAR-1928-BIS",
    period: "Paris, 1928",
    material: "Mirror-polished cast bronze, white Carrara marble collar, carved Indiana limestone base",
    dimensionsOrSpecs: "Height: 137.2 cm (Bronze alone), Overall Height with pedestal: 216.5 cm",
    price: {
      amountINR: "Auction Record: $27,500,000 (Indicative ₹234,00,000,000)",
      priceType: "AUCTION_RECORD",
      verifiedDate: "30 September 2026",
      source: "Christie's New York Impressionist & Modern Evening Sale",
    },
    image: "/images/style/article-03/palace-architecture-detail.jpg",
    imageOrientation: "portrait",
    imageCredit: "The Metropolitan Museum of Art / Constantin Brâncuși Estate / ADAGP Paris",
    curatorialDeck:
      "A work that fundamentally transformed twentieth-century jurisprudence and aesthetics: stripping away the feathers and beak to sculpt the pure velocity of upward flight.",
    theStory: [
      "In 1926, when photographer Edward Steichen purchased this bronze sculpture and shipped it to New York, US Customs officials refused to classify it as an art work, attempting to tax it as 'manufactured kitchen utensils and hospital supplies.' The ensuing landmark federal trial, *Brâncuși v. United States*, legally established that modern abstract art was indeed genuine art.",
      "Brâncuși spent decades refining the form in his Parisian studio at Impasse Ronsin, hand-buffing the cast bronze surface for months until it achieved a golden mirror finish that dissolves its physical weight into ambient reflections.",
      "The sculpture does not depict a bird standing or perching; it captures the instant of aerodynamic ascension, where matter aspires to become pure light.",
    ],
    theCraft: [
      "Hand-polished with emery stone and leather strops to eliminate all casting seams without rounding the razor-sharp vertical spine.",
      "The composite stone base was designed by Brâncuși as an integral architectural transition from terrestrial stone to celestial metal.",
    ],
    provenanceOrRunway: [
      "Edward Steichen Collection, Paris / New York.",
      "Conserved at The Metropolitan Museum of Art, New York and MoMA.",
    ],
    technicalDossier: [
      { label: "Artist", value: "Constantin Brâncuși (1876–1957)" },
      { label: "Medium", value: "Cast and mirror-polished bronze" },
      { label: "Pedestal", value: "Hand-carved marble & limestone" },
      { label: "Historical Landmark", value: "Subject of Brâncuși v. United States (1928)" },
      { label: "Edition", value: "1 of 16 variations executed between 1923 and 1940" },
    ],
    officialSource: {
      name: "The Met Modern Art",
      url: "https://www.metmuseum.org",
      actionLabel: "View Brâncuși at The Met",
    },
    relatedObjectIds: ["automobiles-bugatti-atalante", "fashion-schiaparelli-zodiac", "travel-devshree-deogarh"],
  },

  // ─────────────────────────────────────────────────────────────
  // 09 — SANCTUARIES & ESTATES
  // ─────────────────────────────────────────────────────────────
  {
    id: "travel-devshree-deogarh",
    slug: "devshree-deogarh-rajasthan-sanctuary",
    world: "travel",
    worldNumber: "09",
    worldTitle: "SANCTUARIES & ESTATES",
    house: "DEV SHREE DEOGARH",
    title: "Dev Shree Deogarh: The White Haveli on Ragho Sagar Lake",
    subtitle: "A private eight-suite Mewari manor hosted by Kunwar Shatrunjai and Bhavna Kumari.",
    accessionOrRef: "EST-RAJ-DEO-01",
    period: "Deogarh, Rajasthan · Active Private Sanctuarium",
    material: "Locally quarried white sandstone, lime-plaster arches, hand-painted Mewar miniature murals",
    dimensionsOrSpecs: "Eight private guest suites, central Charbagh courtyard, adjacent to migratory bird lake",
    price: {
      amountINR: "₹45,000 – ₹75,000 / Night (Private Member Exclusive Allocation)",
      priceType: "OFFICIAL_INDIA_PRICE",
      verifiedDate: "30 September 2026",
      source: "Dev Shree Deogarh Direct Estate Office / Member Desk",
    },
    image: "/images/private-world/06-palace/devshree-deogarh-01.jpg",
    imageOrientation: "landscape",
    imageCredit: "Official Estate Photography · Dev Shree Deogarh (devshreedeogarh.com)",
    curatorialDeck:
      "A discreet, intimate antidote to commercial palace hotels: an architecturally authentic white haveli where guests dine directly with the custodian family on colonnaded verandas.",
    theStory: [
      "Located in the rugged Aravalli hills of southern Rajasthan, Dev Shree Deogarh was conceived by Kunwar Shatrunjai Singh and Bhavna Kumari not as a hotel, but as a continuation of centuries-old Rajput hospitality.",
      "Constructed entirely in the traditional Mewari-Mughal architectural vernacular—with deep colonnaded verandas, fluted jharokhas, and intimate courtyards—the estate overlooks the tranquil waters of Ragho Sagar Lake, home to wintering migratory pelicans and painted storks.",
      "Evenings at Dev Shree revolve around candlelit dinners on the veranda, where heirloom family recipes preserved in the Deogarh court are served alongside lively conversations regarding Mewar miniature paintings and estate conservation.",
    ],
    theCraft: [
      "Built by local Mewari stone masons utilizing lime-wash plaster ('chuna') that breathes naturally with the climate, maintaining cooling interior breezes during summer heat.",
      "Interior walls feature bespoke frescoes hand-painted by master miniaturists of the Deogarh Thikana school.",
    ],
    provenanceOrRunway: [
      "Seat of the Chundawat Sisodia Rajput lineage of Deogarh.",
      "Recognized internationally as one of India's most authentic private heritage homestays.",
    ],
    technicalDossier: [
      { label: "Estate Hosts", value: "Kunwar Shatrunjai Singh & Bhavna Kumari" },
      { label: "Architectural Style", value: "Traditional Mewari White Sandstone Haveli" },
      { label: "Capacity", value: "8 Ultra-Exclusive Private Suites" },
      { label: "Surrounding", value: "Ragho Sagar Lake and rural Aravalli landscape" },
      { label: "Specialty", value: "Authentic royal Mewari cuisine & private heritage safari" },
    ],
    officialSource: {
      name: "Dev Shree Deogarh Official",
      url: "https://www.devshreedeogarh.com",
      actionLabel: "Visit Official Dev Shree Deogarh",
    },
    relatedObjectIds: ["heritage-mughal-carpet", "jewellery-patiala-cartier", "automobiles-rolls-phantom"],
  },
];

export const EDITORIAL_STORIES: EditorialStory[] = [
  {
    id: "story-midnight-coachbuilders",
    slug: "the-midnight-coachbuilders",
    title: "The Midnight Coachbuilders: When Aluminium Was Hammered for Royalty",
    subtitle: "How pre-war artisans in Wolverhampton, Paris and Molsheim forged rolling Versailles salons.",
    category: "AUTOMOBILISME ROYALE",
    readTime: "7 MIN READ",
    publishedDate: "30 SEPTEMBER 2026",
    heroImage: "/images/private-world/05-automobile/rolls-royce-phantom-of-love-01.jpg",
    heroOrientation: "landscape",
    imageCredit: "Bonhams & The Royal Gallerys Curatorial Automobile Archive",
    leadParagraph:
      "Long before computational fluid dynamics and carbon fiber autoclaves standardized the automobile, motorcars were commissioned in the exact manner of Savile Row suits and imperial coronation robes: tailored individually to the eccentricities of the patron's skull, shoulder, and vanity.",
    sections: [
      {
        heading: "01 · THE ASH-FRAME ARCHITECTURE",
        body: [
          "In the 1920s, a customer did not purchase a completed Rolls-Royce or Bugatti from a showroom floor. One purchased a 'rolling chassis'—an engine, frame, four wheels, and a radiator grille delivered to a coachbuilder of choice.",
          "Firms such as Charles Clark & Son, Barker, Hooper, Saoutchik, and Figoni & Falaschi began by steaming English ash wood into structural skeleton ribs. Around this organic wooden core, metalbeaters armed with wooden mallets painstakingly hammered flat sheets of aluminium until seamless, voluptuous compound curves emerged.",
        ],
        quote: {
          text: "A true automobile body should possess the acoustic silence of a church library and the tensile resistance of a locomotive.",
          author: "Sir Henry Royce, 1925",
        },
      },
      {
        heading: "02 · THE INTERIOR AS PRIVATE SALON",
        body: [
          "Inside the passenger compartment, the external world was entirely cancelled. Coachbuilders installed beveled crystal partition windows that rose electrically at the press of a mother-of-pearl button, insulating the passengers from the driver and the dusty highway.",
          "In the 1926 'Phantom of Love,' the client demanded nothing less than a reproduction of the Marie Antoinette boudoir at Versailles. Aubusson tapestries were stitched by nine embroiderers over nine months, accompanied by French walnut cabinets concealing sterling silver tea flasks and perfume flacons.",
        ],
      },
      {
        heading: "03 · THE ENDURING MYSTERY OF METAL",
        body: [
          "Today, these machines occupy a unique station in international collecting. They are not merely automobiles, but kinetic sculptures that preserve the human fingerprints of vanished artisans. When one closes the door of a 1926 coachbuilt Rolls-Royce, the sound is not a metallic clack, but a dense, hydraulic sigh of air escaping a handcrafted vacuum.",
        ],
      },
    ],
    curatorNote:
      "Researched from the original chassis records of the Rolls-Royce Enthusiasts' Club Archive and Bonhams Goodwood Historical Department.",
    relatedObjectIds: ["automobiles-rolls-phantom", "automobiles-bugatti-atalante", "objects-ormolu-clock"],
  },
  {
    id: "story-anatomy-of-haute-couture",
    slug: "the-anatomy-of-haute-couture",
    title: "The Anatomy of French Haute Couture: Lesage, Tweed and the Hidden Chain",
    subtitle: "Behind the closed doors of Rue Cambon and Place Vendôme, where garments take 400 hours to breathe.",
    category: "HAUTE COUTURE & FASHION",
    readTime: "8 MIN READ",
    publishedDate: "30 SEPTEMBER 2026",
    heroImage: "/images/style/hero/style-hero-couture-runway.jpg",
    heroOrientation: "portrait",
    imageCredit: "The Royal Gallerys Private Fashion Intelligence Dossier",
    leadParagraph:
      "In an era obsessed with instantaneous digital reproduction and automated retail fulfillment, the protected legal designation of 'Haute Couture' in Paris remains a radical, almost monastic sanctuary of extreme human patience.",
    sections: [
      {
        heading: "01 · THE DISCIPLINE OF THE ATELIER",
        body: [
          "To legally hold the title of Haute Couture under the Ministère de l'Industrie, a fashion house must maintain a permanent atelier in Paris employing at least twenty full-time artisans, and present a collection of at least thirty-five original looks twice a year.",
          "Every garment begins not with fabric, but with a 'toile'—a prototype fashioned in plain ecru cotton muslin. The client stands for hours while the premier d'atelier pins, scissors, and sculpts the muslin directly onto her physical anatomy, creating a custom padded mannequin that will remain in the attic of the house for decades.",
        ],
      },
      {
        heading: "02 · THE METIERS D'ART CONSTELLATION",
        body: [
          "The true secret power of Parisian couture lies in its specialized satellite craft houses: Lesage for embroidery, Lemarié for feathers and camellias, Massaro for bespoke cordwaining, Goossens for poured-glass jewelry, and Lognon for pleated fabrics.",
          "When Elsa Schiaparelli designed her 1938 Zodiac jacket, François Lesage and his team spent hundreds of hours bending metallic bullion coils and mounting miniature mirrors to create an astronomical galaxy that caught candlelight with unpredictable brilliance.",
        ],
        quote: {
          text: "Elegance is not about catching somebody's eye, it's about staying in somebody's memory.",
          author: "Giorgio Armani",
        },
      },
      {
        heading: "03 · THE INVISIBLE ENGINEERING",
        body: [
          "The perfection of high fashion is fundamentally architectural. In a Chanel tweed tailleur, the balance is achieved not by stiffness, but by absolute supple articulation. The sleeves are constructed with three separate panels to conform to the curvature of the human arm, while a delicate gilded brass chain sewn inside the silk hem ensures the jacket falls with effortless perpendicular grace.",
        ],
      },
    ],
    curatorNote:
      "Documented through exclusive curatorial access to the Métiers d'Art archives and The Metropolitan Museum of Art Costume Institute.",
    relatedObjectIds: ["fashion-schiaparelli-zodiac", "fashion-couture-runway-look", "jewellery-patiala-cartier"],
  },
  {
    id: "story-the-lost-patiala-vaults",
    slug: "the-lost-patiala-vaults",
    title: "The Great Patiala Mystery: Tracing the World's Most Monumental Diamond Bib",
    subtitle: "How Louis Cartier forged 962 carats of diamonds for a Maharaja—and how it vanished into the fog of 1948.",
    category: "HIGH JEWELLERY & GEMMES",
    readTime: "9 MIN READ",
    publishedDate: "30 SEPTEMBER 2026",
    heroImage: "/images/private-world/02-vault/patiala-necklace-01.jpg",
    heroOrientation: "portrait",
    imageCredit: "Cartier Tradition Archive / New Delhi National Museum",
    leadParagraph:
      "When Maharaja Bhupinder Singh of Patiala walked into 13 Rue de la Paix in Paris in 1925 followed by servants carrying heavy ironbound chests of gems, he set in motion the creation of the most ambitious diamond jewel ever manufactured in human memory.",
    sections: [
      {
        heading: "01 · THE MONARCH AND THE CARTIERS",
        body: [
          "Bhupinder Singh was a sovereign of towering physical stature, commanding presence, and legendary appetite for beauty. He insisted that his jewels reflect the absolute supreme authority of the Patiala dynasty.",
          "Louis Cartier and his chief designer Jeanne Toussaint spent three full years designing a five-tiered platinum collar set with 2,930 diamonds totaling 962.25 carats. Suspended at the base was the legendary 234.69-carat De Beers yellow diamond, flanked by two Burmese rubies of flawless pigeon-blood saturation.",
        ],
        quote: {
          text: "You cannot design for an Indian Prince with European modesty. You must design with the scale of an empire.",
          author: "Louis Cartier, 1926",
        },
      },
      {
        heading: "02 · THE DISAPPEARANCE IN 1948",
        body: [
          "Following the integration of the princely states into the Republic of India after 1947, the royal toshakhana (treasury) of Patiala underwent turbulent reorganization. By 1948, the necklace was missing from the vaults.",
          "For fifty years, the piece existed only in archival photographs and folklore. Rumors circulated across the international gem trade: had the necklace been dismantled? Had the De Beers diamond been recut?",
        ],
      },
      {
        heading: "03 · THE REDISCOVERY AND CONSERVATION",
        body: [
          "In 1998, a Cartier representative noticed a tarnished, stripped platinum framework in a second-hand antique jewelry boutique in London's Mayfair. All the major stones had been pried out, but the unmistakable silhouette matched the archival blueprint.",
          "Cartier acquired the remains and spent four years meticulously replacing the missing stones with synthetic cubic zirconias and lab-grown diamonds cut to the exact historical proportions of the originals, resurrecting the masterwork for exhibition across the world's leading museums.",
        ],
      },
    ],
    curatorNote:
      "Researched directly from Cartier's historic ledger books in Paris and the National Museum of India archives.",
    relatedObjectIds: ["jewellery-patiala-cartier", "jewellery-vladimir-tiara", "objects-ormolu-clock"],
  },
];

export function getAllCuratedObjects(): CuratedObject[] {
  return CURATED_OBJECTS;
}

export function getObjectById(id: string): CuratedObject | undefined {
  return CURATED_OBJECTS.find((o) => o.id === id || o.slug === id);
}

export function getObjectsByWorld(world: WorldId): CuratedObject[] {
  return CURATED_OBJECTS.filter((o) => o.world === world);
}

export function getFeaturedHeroObject(): CuratedObject {
  return CURATED_OBJECTS[0]; // Schiaparelli Zodiac Jacket
}

export function getEditorialTriptych(): CuratedObject[] {
  return [
    CURATED_OBJECTS[1], // Chanel Couture Tailleur
    CURATED_OBJECTS[2], // Patek Philippe 5270
    CURATED_OBJECTS[4], // Cartier Patiala Necklace
  ];
}

export function getAllEditorialStories(): EditorialStory[] {
  return EDITORIAL_STORIES;
}

export function getStoryById(id: string): EditorialStory | undefined {
  return EDITORIAL_STORIES.find((s) => s.id === id || s.slug === id);
}

export function searchCatalog(query: string): CuratedObject[] {
  if (!query || !query.trim()) return CURATED_OBJECTS.slice(0, 8);
  const q = query.toLowerCase().trim();
  return CURATED_OBJECTS.filter(
    (o) =>
      o.title.toLowerCase().includes(q) ||
      o.house.toLowerCase().includes(q) ||
      o.subtitle.toLowerCase().includes(q) ||
      o.worldTitle.toLowerCase().includes(q) ||
      o.material.toLowerCase().includes(q) ||
      o.accessionOrRef.toLowerCase().includes(q) ||
      o.period.toLowerCase().includes(q)
  );
}
