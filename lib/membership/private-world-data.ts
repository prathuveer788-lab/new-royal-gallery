export interface Hotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  category: "OBJECT" | "ARTWORK" | "PROVENANCE" | "ARCHITECTURE" | "ARCHIVE";
  description: string;
  provenance: string;
}

export interface BookChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  prose: string[];
  image: string;
  caption: string;
}

export interface PrivateStory {
  id: string;
  worldId:
    | "timeline"
    | "vault"
    | "table"
    | "object"
    | "automobile"
    | "palace"
    | "book"
    | "portrait"
    | "room"
    | "maps";
  worldTitle: string;
  worldNumber: string;
  title: string;
  subtitle: string;
  period: string;
  location: string;
  heroImage: string;
  secondaryImage: string;
  galleryImages?: string[];
  accessionId?: string; // e.g. RG VAULT — 0001
  collection?: string;
  provenanceSource?: string;
  intro: string;
  narrative: {
    heading?: string;
    text: string;
    pullQuote?: string;
    image?: string;
    caption?: string;
  }[];
  relatedStoryIds: string[];
  hotspots?: Hotspot[];
  bookChapters?: BookChapter[];
  timelineData?: {
    person: string;
    place: string;
    object: string;
    era: string;
    significance: string;
  };
  mapData?: {
    route: string;
    origin: string;
    terminus: string;
    cartographer: string;
    year: string;
    points: { name: string; note: string }[];
  };
}

export interface PrivateWorldSection {
  id:
    | "timeline"
    | "vault"
    | "table"
    | "object"
    | "automobile"
    | "palace"
    | "book"
    | "portrait"
    | "room"
    | "maps";
  number: string;
  title: string;
  frenchTitle?: string;
  tagline: string;
  description: string;
  accentHero: string;
  stories: PrivateStory[];
}

export const PRIVATE_WORLDS: PrivateWorldSection[] = [
  // ════════════════════════════════════════════════
  // 01 — THE ROYAL TIMELINE
  // ════════════════════════════════════════════════
  {
    id: "timeline",
    number: "01",
    title: "THE ROYAL TIMELINE",
    frenchTitle: "La Chronologie Royale",
    tagline: "Person · Place · Object · Historical Moment",
    description: "An interactive editorial timeline mapping extraordinary dynasties, architectural milestones, and personal treasures from the 17th Century to the Living Heritage era.",
    accentHero: "/images/private-world/01-timeline/versailles-hall-of-mirrors-01.jpg",
    stories: [
      {
        id: "timeline-amber-purandar-1665",
        worldId: "timeline",
        worldTitle: "THE ROYAL TIMELINE",
        worldNumber: "01",
        title: "The Imperial Amber Court & The Treaty of Purandar",
        subtitle: "How Mirza Raja Jai Singh I engineered diplomatic peace between the Mughal Empire and Chhatrapati Shivaji Maharaj.",
        period: "17th Century · 1665",
        location: "Amber Fort, Rajputana & Fort Purandar, Deccan",
        heroImage: "/images/private-world/01-timeline/purandar-amber-01.jpg",
        secondaryImage: "/images/private-world/01-timeline/purandar-amber-02.jpg",
        galleryImages: ["/images/private-world/01-timeline/purandar-amber-01.jpg", "/images/private-world/01-timeline/purandar-amber-02.jpg", "/images/private-world/01-timeline/purandar-amber-03.jpg", "/images/private-world/01-timeline/purandar-amber-04.jpg"],
        accessionId: "RG TIME — 1665-PUR",
        collection: "Kachhwaha Royal Archives, City Palace Museum, Jaipur",
        provenanceSource: "Imperial Farman Registries & Mirza Raja Official Letters",
        intro: "In the sweltering summer of 1665, beneath the sandstone battlements of Fort Purandar in the Western Ghats, two consummate military strategists met not to annihilate one another, but to forge one of the most sophisticated political treaties in Asian military history.",
        timelineData: {
          person: "Mirza Raja Jai Singh I & Chhatrapati Shivaji Maharaj",
          place: "Fort Purandar, Western Ghats & Amber Fort",
          object: "The Gold-Sealed Persian Farman of Purandar",
          era: "17th Century",
          significance: "Preserved regional autonomy while inaugurating Jaipur's golden era of mathematical and architectural statecraft."
        },
        narrative: [
          {
            heading: "The General from Amber",
            text: "Mirza Raja Jai Singh I of Amber was neither a reckless warrior nor a sycophantic courtier. Educated in Sanskrit, Persian, Turkish, and Euclidean geometry, Jai Singh understood that military victory without diplomatic equilibrium was merely an expensive pause in warfare.",
            pullQuote: "“To govern the Rajputana frontier requires courage; to govern the Deccan requires the patience of an architect.” — Court Chroniques of Amber, 1665"
          },
          {
            heading: "The Meeting of Equals",
            text: "Shivaji Maharaj arrived at Jai Singh’s pavilion without imperial fanfare. The Rajput general rose, embraced Shivaji as an equal Kshatriya sovereign, and seated him upon his right hand. Over three days of intense discourse, twenty-three fortresses were ceded, but Shivaji was guaranteed imperial honors, military autonomy in the south, and sovereign protection for his heirs.",
            image: "/images/private-world/01-timeline/purandar-amber-03.jpg",
            caption: "Purandar fort"
          },
          {
            heading: "The Material Legacy",
            text: "The treaty was penned on parchment dusted with pulverised gold leaf, stamped with the imperial seal of Aurangzeb, and countersigned with Jai Singh’s signature talisman. Today, the surviving draft in Jaipur's Maharaja Sawai Man Singh II Museum stands as testimony to an era when statecraft was practiced as a fine art."
          }
        ],
        relatedStoryIds: ["vault-patiala-necklace", "object-empress-eugenie-brooch", "room-haddon-hall"]
      },
      {
        id: "timeline-versailles-hall-of-mirrors-1684",
        worldId: "timeline",
        worldTitle: "THE ROYAL TIMELINE",
        worldNumber: "01",
        title: "Versailles & The Sun King’s Hall of Mirrors",
        subtitle: "Jules Hardouin-Mansart and Charles Le Brun’s 73-metre architectural manifesto of European absolute monarchy.",
        period: "17th Century · 1684",
        location: "Château de Versailles, Île-de-France",
        heroImage: "/images/private-world/01-timeline/versailles-hall-of-mirrors-01.jpg",
        secondaryImage: "/images/private-world/01-timeline/versailles-hall-of-mirrors-02.jpg",
        galleryImages: ["/images/private-world/01-timeline/versailles-hall-of-mirrors-01.jpg", "/images/private-world/01-timeline/versailles-hall-of-mirrors-02.jpg", "/images/private-world/01-timeline/versailles-hall-of-mirrors-03.jpg", "/images/private-world/01-timeline/versailles-hall-of-mirrors-04.jpg"],
        accessionId: "RG TIME — 1684-VER",
        collection: "Établissement public du château de Versailles",
        provenanceSource: "Bâtiments du Roi Accounts & Mansart Architectural Folios",
        intro: "In 1684, Louis XIV inaugurated the Grande Galerie—357 individual glass mirrors facing seventeen arcade windows overlooking the Grand Canal. In an era when Venice jealously guarded the secret of mirror manufacture on penalty of death, Versailles’ Hall of Mirrors was a declaration of total economic and artistic supremacy.",
        timelineData: {
          person: "Louis XIV & Architect Jules Hardouin-Mansart",
          place: "Château de Versailles, France",
          object: "Venetian-Style Silvered Glass Mirrors & Gilt Bronze Torchères",
          era: "17th Century",
          significance: "Shifted European cultural and luxury hegemony from Italy to France for three centuries."
        },
        narrative: [
          {
            heading: "The Stolen Secret of Glass",
            text: "Until the 1660s, mirror glass of colossal scale was exclusively Venetian. Jean-Baptiste Colbert, Louis XIV's finance minister, established the Manufacture royale de glaces de miroirs, secretly enticing Venetian glassblowers to Saint-Gobain. The result was glass so luminous that when candlelit by 3,000 wax tapers, contemporaries described the gallery as 'daylight captured indoors.'",
            pullQuote: "“The King has created an illusion where stone becomes light and earth mirrors the sun.” — Madame de Sévigné, Letters, 1684"
          },
          {
            heading: "The Politics of Grandeur",
            text: "Every square metre of the ceiling, painted by Charles Le Brun, depicted Louis XIV’s military and diplomatic victories over the Dutch Republic and Spain. Courtiers stood in precise, rank-ordered protocol; to be invited to walk the gallery with the King was the single most valuable currency in Europe.",
            image: "/images/private-world/01-timeline/versailles-hall-of-mirrors-03.jpg",
            caption: "Château de Versailles, galerie des glaces, buste de Jules César. C'est à partir de la tête, considér"
          }
        ],
        relatedStoryIds: ["table-buckingham-state-banquet", "object-vladimir-tiara", "room-chatsworth-library"]
      },
      {
        id: "timeline-delhi-durbar-cartier-1911",
        worldId: "timeline",
        worldTitle: "THE ROYAL TIMELINE",
        worldNumber: "01",
        title: "The 1911 Delhi Durbar & The Cartier Epoch",
        subtitle: "When the jewellery ateliers of Place Vendôme encountered the ancient treasury gems of the subcontinent.",
        period: "Belle Époque · 1911",
        location: "Coronation Park, Delhi & Place Vendôme, Paris",
        heroImage: "/images/private-world/01-timeline/delhi-durbar-1911-01.jpg",
        secondaryImage: "/images/private-world/01-timeline/delhi-durbar-1911-02.jpg",
        galleryImages: ["/images/private-world/01-timeline/delhi-durbar-1911-01.jpg", "/images/private-world/01-timeline/delhi-durbar-1911-02.jpg", "/images/private-world/01-timeline/delhi-durbar-1911-03.jpg", "/images/private-world/01-timeline/delhi-durbar-1911-04.jpg"],
        accessionId: "RG TIME — 1911-DUR",
        collection: "Cartier Paris Historical Archives & Royal Collection Trust",
        provenanceSource: "Jacques Cartier Personal Travel Journals (1911–1912)",
        intro: "In December 1911, King George V and Queen Mary arrived in Delhi for the only Imperial Durbar attended by a reigning British monarch. In their wake traveled Jacques Cartier, carrying trunks of French platinum mountings to redesign the colossal unpolished emeralds and diamonds of the princely treasuries.",
        timelineData: {
          person: "Jacques Cartier, Queen Mary & The Maharajas of India",
          place: "Coronation Park, Delhi",
          object: "Platinum & Cabochon Emerald Tutti Frutti Parures",
          era: "Belle Époque",
          significance: "Inaugurated Cartier's celebrated Tutti Frutti era and revolutionized high jewellery design globally."
        },
        narrative: [
          {
            heading: "Jacques Cartier’s Notebooks",
            text: "Cartier did not come to impose European forms; he was captivated by the Indian practice of engraving floral motifs directly into rubies, sapphires, and emeralds. He observed that Indian royal collectors wore jewellery not merely as adornment, but as cosmic armor—talismanic stones aligned with planetary forces.",
            pullQuote: "“The stone should not be imprisoned in metal; it must float upon the body like liquid color.” — Jacques Cartier, Delhi Journals, 1911"
          },
          {
            heading: "The Platinum Transformation",
            text: "Prior to Cartier’s arrival, Indian royal jewels were predominantly set in heavy 24-karat kundan gold with lac cores. By introducing gossamer platinum wires, Cartier allowed light to enter the stones from every angle, producing the breath-taking Art Deco masterworks that defined the Roaring Twenties."
          }
        ],
        relatedStoryIds: ["vault-patiala-necklace", "object-portland-tiara", "automobile-rolls-royce-phantom-of-love"]
      },
      {
        id: "timeline-romanov-winter-ball-1903",
        worldId: "timeline",
        worldTitle: "THE ROYAL TIMELINE",
        worldNumber: "01",
        title: "The 1903 Romanov Costume Ball at the Winter Palace",
        subtitle: "The final, diamond-encrusted swan song of the Russian Empire in 17th-century Boyar splendour.",
        period: "Belle Époque · 1903",
        location: "The Winter Palace, Saint Petersburg",
        heroImage: "/images/private-world/01-timeline/romanov-ball-1903-01.jpg",
        secondaryImage: "/images/private-world/01-timeline/romanov-ball-1903-02.jpg",
        galleryImages: ["/images/private-world/01-timeline/romanov-ball-1903-01.jpg", "/images/private-world/01-timeline/romanov-ball-1903-02.jpg", "/images/private-world/01-timeline/romanov-ball-1903-03.jpg", "/images/private-world/01-timeline/romanov-ball-1903-04.jpg"],
        accessionId: "RG TIME — 1903-STP",
        collection: "State Hermitage Museum, Saint Petersburg",
        provenanceSource: "Imperial Court Ministry Albums & Boissonnas & Eggler Photographs",
        intro: "On February 11 and 13, 1903, the Winter Palace witnessed the most extravagant costume ball in European history. 390 guests appeared dressed as 17th-century Muscovite boyars, their caftans and kokoshniks sewn with pearls, sapphires, and antique family emeralds.",
        timelineData: {
          person: "Emperor Nicholas II & Empress Alexandra Feodorovna",
          place: "The Winter Palace, Saint Petersburg",
          object: "Emerald-Encrusted Cloth-of-Gold Kokoshnik",
          era: "Belle Époque",
          significance: "The definitive cultural pinnacle of Imperial Russian court splendour prior to the revolutionary era."
        },
        narrative: [
          {
            heading: "A Gown of 12,000 River Pearls",
            text: "Empress Alexandra Feodorovna wore a reconstruction of the coronation gown of Tsarina Maria Ilyinichna Miloslavskaya. Crafted by the imperial couturier Nadezhda Lamanova in silver brocade and ermine, the collar was embroidered with emerald cabochons selected by Peter Carl Fabergé himself.",
            pullQuote: "“It was the last great ball in the history of the empire... a brilliant and gorgeous spectacle, but like the light from a dead star.” — Grand Duke Alexander Mikhailovich"
          },
          {
            heading: "The Hermitage Albums",
            text: "Every guest was photographed by the court photographic firm Boissonnas & Eggler. The resulting two-volume leather folio, published to benefit Russian wounded soldiers, remains one of the world's rarest and most coveted archival photography treasures."
          }
        ],
        relatedStoryIds: ["vault-st-petersburg-porcelain-1792", "table-romanov-catherine-palace", "object-vladimir-tiara"]
      }
    ]
  },

  // ════════════════════════════════════════════════
  // 02 — THE PRIVATE VAULT
  // ════════════════════════════════════════════════
  {
    id: "vault",
    number: "02",
    title: "THE PRIVATE VAULT",
    frenchTitle: "Le Caveau Privé",
    tagline: "Rare Documents · Archival Objects · Provenance Folios",
    description: "Unpublished correspondence, ceremonial inventories, accession ledgers, and bespoke order books preserved in international heritage collections.",
    accentHero: "/images/private-world/02-vault/patiala-necklace-01.jpg",
    stories: [
      {
        id: "vault-patiala-necklace",
        worldId: "vault",
        worldTitle: "THE PRIVATE VAULT",
        worldNumber: "02",
        title: "The 1928 Patiala Diamond Collar Dossier",
        subtitle: "Accession Dossier #6284-B: The architectural blueprints for the largest diamond necklace ever commissioned from Cartier.",
        period: "Interwar Era · 1928",
        location: "13 Rue de la Paix, Paris & Qila Mubarak, Patiala",
        heroImage: "/images/private-world/02-vault/patiala-necklace-01.jpg",
        secondaryImage: "/images/private-world/02-vault/patiala-necklace-02.jpg",
        galleryImages: ["/images/private-world/02-vault/patiala-necklace-01.jpg", "/images/private-world/02-vault/patiala-necklace-02.jpg", "/images/private-world/02-vault/patiala-necklace-03.jpg", "/images/private-world/02-vault/patiala-necklace-04.png"],
        accessionId: "RG VAULT — 0001",
        collection: "Cartier Historical Archives, Geneva & Paris",
        provenanceSource: "Workshop Ledger No. 4, Case #6284-B; Master Jeweller Maurice Coët",
        intro: "In 1925, Maharaja Bhupinder Singh of Patiala arrived at the Hôtel Ritz in Paris with forty trunks containing 2,930 diamonds, including the 234.69-carat De Beers yellow diamond. Over three years, Cartier's master craftsmen drafted sixteen gouache blueprints to balance this colossal mass of stones onto platinum mesh.",
        narrative: [
          {
            heading: "The Technical Wonder of Maurice Coët",
            text: "The Patiala Necklace was not merely a decorative jewel; it was an engineering triumph. Weighing nearly 1,000 carats in total, the platinum articulated collar had to flex naturally across the collarbones without pinching or rotating. Cartier jeweller Maurice Coët developed a unique spring-loaded platinum hinge system that allowed the De Beers diamond to suspend exactly at the sternum.",
            pullQuote: "“To set 2,930 stones so that each catches the light without touching its neighbour is not craftsmanship; it is architecture on a human scale.” — Cartier Atelier Journal, 1928"
          },
          {
            heading: "The Vanishing and The Recovery",
            text: "Following Indian independence, the necklace disappeared from the Patiala treasury in April 1948. Fifty years later, in 1998, Cartier associate Eric Nussbaum discovered the stripped platinum mounting in an antique shop on London’s New Bond Street. The De Beers diamond had been removed, but Cartier reacquired the mounting and spent two years meticulously restoring it with archival cubic zirconia and synthetic diamonds for international museum exhibitions."
          }
        ],
        relatedStoryIds: ["timeline-delhi-durbar-cartier-1911", "object-portland-tiara", "automobile-rolls-royce-phantom-of-love"]
      },
      {
        id: "vault-balmoral-menu-1897",
        worldId: "vault",
        worldTitle: "THE PRIVATE VAULT",
        worldNumber: "02",
        title: "The Handwritten 1897 Balmoral Menu of Queen Victoria",
        subtitle: "Accession #RCIN-44219: An intimate view into the French culinary routine of the Diamond Jubilee eve.",
        period: "19th Century · 24 May 1897",
        location: "Balmoral Castle, Royal Deeside, Aberdeenshire",
        heroImage: "/images/private-world/02-vault/balmoral-menu-1897-01.jpg",
        secondaryImage: "/images/private-world/02-vault/balmoral-menu-1897-02.jpg",
        galleryImages: ["/images/private-world/02-vault/balmoral-menu-1897-01.jpg", "/images/private-world/02-vault/balmoral-menu-1897-02.jpg", "/images/private-world/02-vault/balmoral-menu-1897-03.jpg", "/images/private-world/02-vault/balmoral-menu-1897-04.jpg"],
        accessionId: "RG VAULT — 0002",
        collection: "The Royal Archives, Windsor Castle",
        provenanceSource: "Balmoral Household Dining Register, Ledger XVII",
        intro: "On her seventy-eighth birthday, during the Diamond Jubilee celebrations of May 1897, Queen Victoria dined not on heavy Scottish game, but on an exquisite eight-course French menu handwritten in purple ink by Royal Chef Gabriel Tschumi on gilt-edged Strathmore paper.",
        narrative: [
          {
            heading: "The Cuisine of Royal Deeside",
            text: "Despite the Queen's profound affection for the Scottish Highlands, the language of the British royal table was strictly French until the reign of George V. The menu lists Consommé de Volaille, Truite saumonée à la Norvégienne, and Selle d'Agneau de Galles rôti—each course accompanied by wines from the Balmoral granite cellars, including Château Lafite 1874.",
            pullQuote: "“Her Majesty took her coffee in the Garden Cottage, listening to John Piper Campbell play the Glenmuick lament.” — Balmoral Daybook, 24 May 1897"
          },
          {
            heading: "The Gilt-Edged Artifact",
            text: "The card measures exactly 14 by 9 centimetres, embossed with the Queen’s royal cipher VRI in dark Prussian blue. It survived because it was collected by Lady-in-Waiting Marie Mallet, whose descendants deposited the personal scrapbooks into the Royal Archives in 1952."
          }
        ],
        relatedStoryIds: ["table-buckingham-state-banquet", "palace-one-night-at-the-balmoral", "portrait-shatrunjai-singh-devshree"]
      },
      {
        id: "vault-duke-of-windsor-charvet-1936",
        worldId: "vault",
        worldTitle: "THE PRIVATE VAULT",
        worldNumber: "02",
        title: "The Duke of Windsor’s Bespoke 1936 Charvet Order Book",
        subtitle: "Accession #CHV-PARIS-36-W: The private shirtmaker ledgers that codified 20th-century aristocratic elegance.",
        period: "Interwar Era · Autumn 1936",
        location: "28 Place Vendôme, Paris",
        heroImage: "/images/private-world/02-vault/duke-of-windsor-charvet-01.jpg",
        secondaryImage: "/images/private-world/02-vault/duke-of-windsor-charvet-02.jpg",
        galleryImages: ["/images/private-world/02-vault/duke-of-windsor-charvet-01.jpg", "/images/private-world/02-vault/duke-of-windsor-charvet-02.jpg", "/images/private-world/02-vault/duke-of-windsor-charvet-03.jpg", "/images/private-world/02-vault/duke-of-windsor-charvet-04.jpg"],
        accessionId: "RG VAULT — 0003",
        collection: "Charvet Historical Archives, Place Vendôme, Paris",
        provenanceSource: "Charvet Bespoke Ledger No. 89, Client #1042-HRH",
        intro: "Before his abdication in December 1936, King Edward VIII (later the Duke of Windsor) paid frequent clandestine visits to Charvet at 28 Place Vendôme. His personal ledger records twenty-four custom collar shapes designed to accommodate his trademark thick, four-in-hand tie knot.",
        narrative: [
          {
            heading: "The Invention of Soft Aristocratic Dressing",
            text: "Edward was the first monarch to reject the suffocating, starched wing-collars of the Victorian court. Charvet's cutters created a bespoke collar in superfine Egyptian Sea Island cotton with a lower neckband and soft lining, allowing effortless mobility for golfing, motoring, and dancing.",
            pullQuote: "“A gentleman’s collar must never announce itself before the gentleman does.” — Duke of Windsor, A Family Album"
          },
          {
            heading: "The Archival Folio",
            text: "The surviving folio preserves original fabric swatches pinned to yellowed ledger sheets: houndstooth poplins, pale lilac batiste, and navy Bengal stripes, alongside handwritten notes by cutter Henri Dupuis recording the Duke’s exact shoulder pitch down to the eighth of an inch."
          }
        ],
        relatedStoryIds: ["automobile-bugatti-type-57s-atalante", "portrait-duke-of-richmond", "room-queen-library-chatsworth"]
      },
      {
        id: "vault-st-petersburg-porcelain-1792",
        worldId: "vault",
        worldTitle: "THE PRIVATE VAULT",
        worldNumber: "02",
        title: "The 1792 St. Petersburg Imperial Porcelain Banqueting Inventory",
        subtitle: "Accession #HERM-1792-INV: Catherine the Great’s hand-annotated registry of the 973-piece Arabesque Dinner Service.",
        period: "18th Century · 1792",
        location: "The Winter Palace, Saint Petersburg",
        heroImage: "/images/private-world/02-vault/st-petersburg-porcelain-1792-01.jpg",
        secondaryImage: "/images/private-world/02-vault/st-petersburg-porcelain-1792-02.jpg",
        galleryImages: ["/images/private-world/02-vault/st-petersburg-porcelain-1792-01.jpg", "/images/private-world/02-vault/st-petersburg-porcelain-1792-02.jpg", "/images/private-world/02-vault/st-petersburg-porcelain-1792-03.jpg", "/images/private-world/02-vault/st-petersburg-porcelain-1792-04.jpg"],
        accessionId: "RG VAULT — 0004",
        collection: "State Hermitage Museum & Imperial Porcelain Factory Museum",
        provenanceSource: "Imperial Court Registry of Her Majesty Catherine II, Vol. 14",
        intro: "In 1792, Empress Catherine II commissioned the Imperial Porcelain Factory in Saint Petersburg to produce the monumental Arabesque Service. Consisting of 973 distinct pieces designed to accommodate sixty imperial banquet guests, each plate depicted allegorical scenes inspired by Raphael's Vatican Loggias.",
        narrative: [
          {
            heading: "Diplomacy in Hard-Paste Porcelain",
            text: "Porcelain was the high diplomacy of the 18th century. Catherine used the Arabesque service specifically for banquets honoring European ambassadors, asserting that Russian domestic manufacture had surpassed Meissen, Sèvres, and Vienna in paste translucency and hand-painted miniature detailing.",
            pullQuote: "“To serve soup upon a plate that does not instruct the mind in classical virtue is a wasted course.” — Catherine the Great, Marginalia on Banquet Orders, 1792"
          },
          {
            heading: "The Surviving Ledger",
            text: "Bound in Russian red calfskin with the double-headed eagle in gold leaf, the 1792 inventory details each dessert cooler, wine cooler, and allegorical centerpiece figure with the names of the Russian master painters who executed the miniatures under director Jean-Baptiste Rachette."
          }
        ],
        relatedStoryIds: ["timeline-romanov-winter-ball-1903", "table-romanov-catherine-palace", "room-durbar-hall-fateh-prakash"]
      }
    ]
  },

  // ════════════════════════════════════════════════
  // 03 — THE ROYAL TABLE
  // ════════════════════════════════════════════════
  {
    id: "table",
    number: "03",
    title: "THE ROYAL TABLE",
    frenchTitle: "La Table Royale",
    tagline: "International Aristocratic Dining · Silver Services · Palace Banquets",
    description: "Ceremonial dining culture outside India: the grand silver gilt services, historic European court menus, French banquet rituals, and palace cellars.",
    accentHero: "/images/private-world/03-table/buckingham-state-banquet-01.jpeg",
    stories: [
      {
        id: "table-buckingham-state-banquet",
        worldId: "table",
        worldTitle: "THE ROYAL TABLE",
        worldNumber: "03",
        title: "The Buckingham Palace State Banquet: A Century of King’s Silver Gilt",
        subtitle: "How the 4,000-piece Grand Service of George IV still dictates modern British royal ceremonial dinners.",
        period: "19th Century to Present",
        location: "Buckingham Palace Ballroom, London",
        heroImage: "/images/private-world/03-table/buckingham-state-banquet-01.jpeg",
        secondaryImage: "/images/private-world/03-table/buckingham-state-banquet-02.jpg",
        galleryImages: ["/images/private-world/03-table/buckingham-state-banquet-01.jpeg", "/images/private-world/03-table/buckingham-state-banquet-02.jpg", "/images/private-world/03-table/buckingham-state-banquet-03.jpg", "/images/private-world/03-table/buckingham-state-banquet-04.jpg"],
        accessionId: "RG TABLE — 0001",
        collection: "Royal Collection Trust, St James's Palace",
        provenanceSource: "Royal Household Master of the Household Department Records",
        intro: "Every State Banquet at Buckingham Palace begins not in the kitchen, but three weeks earlier in the Palace Silver Pantry. There, the Grand Service—over 4,000 pieces of hand-chased silver gilt commissioned by George IV between 1806 and 1826 from royal goldsmiths Rundell, Bridge & Rundell—is unpacked, weighed, and measured with surgical precision.",
        narrative: [
          {
            heading: "The Sacred 45-Centimetre Rule",
            text: "The U-shaped mahogany dining table seats 170 guests. The Royal Household dining staff use wooden measuring sticks to ensure that every gold-rimmed porcelain plate, cut-crystal glass, and fork sits exactly 45 centimetres from its neighbor. An alignment laser was introduced in the late 1990s, but the traditional measuring rod remains the ultimate arbiter.",
            pullQuote: "“In the banqueting room, a millimetre of error is a sovereign scandal.” — Sir Michael Peat, Former Keeper of the Privy Purse"
          },
          {
            heading: "Service à la Russe vs Service à la Française",
            text: "Until the 1870s, royal dinners were served à la française, with all dishes placed simultaneously on the table to grow cold. King Edward VII, influenced by Escoffier at the Carlton, permanently transitioned the British court to service à la russe: each course brought sequentially by footmen in scarlet livery, accompanied by its dedicated vintage from the 25,000-bottle Palace cellars."
          }
        ],
        relatedStoryIds: ["vault-balmoral-menu-1897", "object-vladimir-tiara", "palace-one-night-at-the-balmoral"]
      },
      {
        id: "table-romanov-catherine-palace",
        worldId: "table",
        worldTitle: "THE ROYAL TABLE",
        worldNumber: "03",
        title: "Dining with the Romanovs: The Grand Ducal Table at Tsarskoye Selo",
        subtitle: "Caviar crystal coolers, Imperial porcelain, and the vanished banquet etiquette of the Catherine Palace.",
        period: "19th Century · 1888",
        location: "Tsarskoye Selo & The Catherine Palace, Russia",
        heroImage: "/images/private-world/03-table/romanov-catherine-palace-01.jpg",
        secondaryImage: "/images/private-world/03-table/romanov-catherine-palace-02.jpg",
        galleryImages: ["/images/private-world/03-table/romanov-catherine-palace-01.jpg", "/images/private-world/03-table/romanov-catherine-palace-02.jpg", "/images/private-world/03-table/romanov-catherine-palace-03.jpg", "/images/private-world/03-table/romanov-catherine-palace-04.jpg"],
        accessionId: "RG TABLE — 0002",
        collection: "State Museum Tsarskoye Selo",
        provenanceSource: "Imperial Court Marshal Records & Grand Duchess Marie Journals",
        intro: "To dine at the Catherine Palace in the late 19th century was to experience a synthesis of Parisian haute cuisine and archaic Slavic grandeur. In the Golden Enfilade, 500 crystal chandeliers cast their light upon gold tables where sterlet soup and Crimean truffles were served on custom porcelain services made exclusively for the imperial family.",
        narrative: [
          {
            heading: "The Golden Enfilade Banquets",
            text: "Dining at the Russian court was accompanied by military precision. Each table of twelve guests was attended by three footmen and a court carver in gold-braided livery. Footmen never spoke; orders were communicated by eye contact and the discreet chime of a silver bell.",
            pullQuote: "“The sterlet was brought alive from the Volga River in special aerated railcars to ensure it tasted of fresh river current.” — Count Vladimir Frederiks"
          },
          {
            heading: "The Imperial Vodka Ritual",
            text: "Before seating, guests gathered in the Portrait Hall for the Zakuski table: smoked sturgeon, wild grouse terrines, and mountain caviar served in bowls carved from solid Ural mountain crystal, accompanied by five varieties of pepper-infused ice-cold vodka distilled on the Imperial estates."
          }
        ],
        relatedStoryIds: ["vault-st-petersburg-porcelain-1792", "timeline-romanov-winter-ball-1903", "object-vladimir-tiara"]
      },
      {
        id: "table-chatsworth-ducal-feast",
        worldId: "table",
        worldTitle: "THE ROYAL TABLE",
        worldNumber: "03",
        title: "The Ducal Feast of Chatsworth: Devonshire Silver & Peak District Cellars",
        subtitle: "How the 6th Duke of Devonshire transformed a Derbyshire estate into Europe’s most coveted private dining invitation.",
        period: "19th Century · 1843",
        location: "Chatsworth House, Bakewell, Derbyshire",
        heroImage: "/images/private-world/03-table/chatsworth-ducal-feast-01.jpg",
        secondaryImage: "/images/private-world/03-table/chatsworth-ducal-feast-02.jpg",
        galleryImages: ["/images/private-world/03-table/chatsworth-ducal-feast-01.jpg", "/images/private-world/03-table/chatsworth-ducal-feast-02.jpg", "/images/private-world/03-table/chatsworth-ducal-feast-03.jpg", "/images/private-world/03-table/chatsworth-ducal-feast-04.jpg"],
        accessionId: "RG TABLE — 0003",
        collection: "The Devonshire Collection Archives, Chatsworth",
        provenanceSource: "6th Duke of Devonshire Diary & Housekeeper Kitchen Books",
        intro: "In December 1843, Queen Victoria and Prince Albert visited Chatsworth House. The Bachelor Duke of Devonshire constructed a private conservatory designed by Joseph Paxton, lit by 12,000 lamps, and served a ten-course banquet in his new Great Dining Room that eclipsed royal dinners at Windsor.",
        narrative: [
          {
            heading: "The Paxton Banqueting Revolution",
            text: "To ensure that pineapple and peaches could be served in the bitter English December, Paxton engineered heated steam pipes through the Chatsworth glasshouses. The Queen was served fresh tropical fruits cultivated on the Duke’s English estate, an achievement that stunned European royalty.",
            pullQuote: "“At Chatsworth, one does not dine; one enters an earthly paradise constructed entirely of silver and glass.” — Prince Albert, 1843"
          },
          {
            heading: "The Devonshire Silver Centerpieces",
            text: "The table was anchored by massive Paul Storr silver candelabra, depicting hunting stags beneath palm fronds. The service required sixty footmen in the Devonshire racing colours of yellow and chocolate velvet, moving in silent synchrony across Wilton wool carpets."
          }
        ],
        relatedStoryIds: ["room-queen-library-chatsworth", "portrait-duke-of-richmond", "object-portland-tiara"]
      },
      {
        id: "table-savoy-piedmont-court",
        worldId: "table",
        worldTitle: "THE ROYAL TABLE",
        worldNumber: "03",
        title: "The Court of Savoy: White Truffles, Barolo & The Palazzo Reale Feasts",
        subtitle: "The ceremonial banqueting rites of King Umberto I and Queen Margherita in the gilded halls of Turin.",
        period: "Late 19th Century · 1885",
        location: "Palazzo Reale di Torino, Piedmont, Italy",
        heroImage: "/images/private-world/03-table/savoy-piedmont-court-01.jpg",
        secondaryImage: "/images/private-world/03-table/savoy-piedmont-court-02.jpg",
        galleryImages: ["/images/private-world/03-table/savoy-piedmont-court-01.jpg", "/images/private-world/03-table/savoy-piedmont-court-02.jpg", "/images/private-world/03-table/savoy-piedmont-court-03.jpg", "/images/private-world/03-table/savoy-piedmont-court-04.jpg"],
        accessionId: "RG TABLE — 0004",
        collection: "Musei Reali di Torino, Savoy Dynasty Collections",
        provenanceSource: "Archivio di Stato di Torino, Real Casa Regolamenti di Tavola",
        intro: "In the late 19th century, the newly unified Kingdom of Italy celebrated its identity through the court dinners of the House of Savoy in Turin. Combining rustic Piedmontese ingredients with French culinary discipline, King Umberto I established dining rituals that defined Italian luxury hospitality.",
        narrative: [
          {
            heading: "The Truffle Diplomacy of Queen Margherita",
            text: "While European courts obsessed over Parisian truffles, Queen Margherita insisted upon the pungent white truffles of Alba, shaved tableside with silver mandolines onto buttered tajarin pasta and roasted capon. Paired with 1868 Barolos cellared beneath the royal hunting lodge of Pollenzo, the dinners became an instrument of royal statecraft.",
            pullQuote: "“To govern Italy, one must understand that wine is not a drink; it is regional honor distilled in crystal.” — King Umberto I"
          },
          {
            heading: "The Savoy Knot Silver Service",
            text: "Every piece of silverware, crafted by the royal silversmith Musy Padre e Figli, bore the distinctive Savoy knot—the heraldic symbol of the dynasty dating to the Crusades. The banqueting hall at Palazzo Reale seated eighty guests beneath frescoes of classical deities by Daniel Seiter."
          }
        ],
        relatedStoryIds: ["maps-savoy-hunting-estates", "palace-one-night-at-villa-d-este", "automobile-alfa-romeo-8c-berlinetta"]
      }
    ]
  },

  // ════════════════════════════════════════════════
  // 04 — THE ROYAL OBJECT
  // ════════════════════════════════════════════════
  {
    id: "object",
    number: "04",
    title: "THE ROYAL OBJECT",
    frenchTitle: "L'Objet Royal",
    tagline: "Provenance Journeys · High Jewellery · Private Collections",
    description: "Extraordinary jewels, ceremonial objects, and personal possessions belonging to kings, queens, dukes, and duchesses, traced from royal workshops to modern collections.",
    accentHero: "/images/private-world/04-object/vladimir-tiara-01.jpg",
    stories: [
      {
        id: "object-vladimir-tiara",
        worldId: "object",
        worldTitle: "THE ROYAL OBJECT",
        worldNumber: "04",
        title: "The Vladimir Tiara: From the Romanov Escape to Windsor Castle",
        subtitle: "Crafted by Bolin in 1874, smuggled from revolutionary Petrograd by a British diplomat, and redesigned with Cambridge emeralds.",
        period: "1874 to Present",
        location: "Saint Petersburg · London · Windsor Castle",
        heroImage: "/images/private-world/04-object/vladimir-tiara-01.jpg",
        secondaryImage: "/images/private-world/04-object/vladimir-tiara-02.jpg",
        galleryImages: ["/images/private-world/04-object/vladimir-tiara-01.jpg", "/images/private-world/04-object/vladimir-tiara-02.jpg", "/images/private-world/04-object/vladimir-tiara-03.jpg", "/images/private-world/04-object/vladimir-tiara-04.jpg"],
        accessionId: "RG OBJECT — 0001",
        collection: "The Royal Collection, Her Majesty Queen Elizabeth II Heirlooms",
        provenanceSource: "Bolin Court Jeweller Registers & Albert Stopford Secret Diaries",
        intro: "Few pieces of high jewellery possess a history as cinematic as the Vladimir Tiara. Commissioned in 1874 by Grand Duke Vladimir Alexandrovich for his bride Grand Duchess Maria Pavlovna, it survived the Russian Revolution through an audacious British diplomatic espionage mission.",
        narrative: [
          {
            heading: "The Smuggling Operation of Albert Stopford",
            text: "In July 1917, as the Bolsheviks closed in on Saint Petersburg, British antiques dealer and diplomatic courier Albert Stopford disguised himself as a workman, entered the Vladimir Palace on the Palace Embankment, and located the Grand Duchess's secret jewel vault behind a boudoir mirror. Packing 244 jewels into two Gladstone leather bags, he smuggled them via train across Finland to London.",
            pullQuote: "“I carried the Romanov fortune through the frontier guard with my passport stamped for diplomatic papers; one tremble of the hand would have meant the firing squad.” — Albert Stopford, 1917"
          },
          {
            heading: "The Transformation by Queen Mary",
            text: "Following the Grand Duchess’s death in France in 1920, the tiara was sold to Queen Mary of the United Kingdom in 1921. Mary had Garrard adapt the 15 original pendant pearls to be completely interchangeable with the colossal Cambridge cabochon emeralds, creating the iconic two-in-one headpiece worn frequently by Queen Elizabeth II throughout her 70-year reign."
          }
        ],
        relatedStoryIds: ["timeline-romanov-winter-ball-1903", "table-romanov-catherine-palace", "vault-st-petersburg-porcelain-1792"]
      },
      {
        id: "object-portland-tiara",
        worldId: "object",
        worldTitle: "THE ROYAL OBJECT",
        worldNumber: "04",
        title: "The Portland Tiara: Cartier’s 1902 Edwardian Masterwork",
        subtitle: "Commissioned by the 6th Duke of Portland for Duchess Winifred; its historic coronation appearance and tragic 2018 heist.",
        period: "Edwardian Era · 1902",
        location: "Welbeck Abbey, Nottinghamshire & Place Vendôme, Paris",
        heroImage: "/images/private-world/04-object/portland-tiara-01.jpg",
        secondaryImage: "/images/private-world/04-object/portland-tiara-02.png",
        galleryImages: ["/images/private-world/04-object/portland-tiara-01.jpg", "/images/private-world/04-object/portland-tiara-02.png", "/images/private-world/04-object/portland-tiara-03.jpg", "/images/private-world/04-object/portland-tiara-04.jpg"],
        accessionId: "RG OBJECT — 0002",
        collection: "The Portland Collection, Welbeck Abbey",
        provenanceSource: "Cartier Paris Archive Reference #2491 & Welbeck Estate Ledgers",
        intro: "In 1902, for the coronation of King Edward VII, the 6th Duke of Portland commissioned Cartier to create a masterpiece featuring the historic Portland Diamond—a 24.5-carat cushion-cut briolette diamond acquired by the family in the 18th century.",
        narrative: [
          {
            heading: "The Edwardian Garland Style",
            text: "The Portland Tiara represented the pinnacle of Cartier's Garland Style (style guirlande). Mounted entirely in platinum, it featured delicate laurel wreath scrolls and drops of briolette-cut diamonds that trembled with the wearer’s pulse (en tremblant), causing the tiara to scintillate like liquid ice under the gaslight of Westminster Abbey.",
            pullQuote: "“Duchess Winifred wore her diamonds not with arrogance, but with the quiet natural grace of an English garden in early frost.” — The Times, Coronation Edition, August 1902"
          },
          {
            heading: "The 2018 Theft and Preservation Legacy",
            text: "In November 2018, thieves broke into the gallery at Welbeck Abbey and stole the tiara from its reinforced glass case in under ninety seconds. While the physical piece was tragic lost to the illicit diamond market, Cartier's original 1902 gouache renderings and plaster casts preserved in Paris allow scholars to study every facet of this legendary design."
          }
        ],
        relatedStoryIds: ["vault-patiala-necklace", "timeline-delhi-durbar-cartier-1911", "room-haddon-hall"]
      },
      {
        id: "object-empress-eugenie-brooch",
        worldId: "object",
        worldTitle: "THE ROYAL OBJECT",
        worldNumber: "04",
        title: "The Empress Eugénie Pearl & Diamond Bow Brooch",
        subtitle: "Crafted in 1855 by Gabriel Lemonnier; sold in the French Crown Jewels auction of 1887; returned to the Louvre in 2008.",
        period: "Second Empire · 1855",
        location: "Palais des Tuileries & Musée du Louvre, Paris",
        heroImage: "/images/private-world/04-object/empress-eugenie-brooch-01.jpg",
        secondaryImage: "/images/private-world/04-object/empress-eugenie-brooch-02.jpg",
        galleryImages: ["/images/private-world/04-object/empress-eugenie-brooch-01.jpg", "/images/private-world/04-object/empress-eugenie-brooch-02.jpg", "/images/private-world/04-object/empress-eugenie-brooch-03.jpg", "/images/private-world/04-object/empress-eugenie-brooch-04.jpg"],
        accessionId: "RG OBJECT — 0003",
        collection: "Musée du Louvre, Département des Objets d'art (Inv. OA 12248)",
        provenanceSource: "Musée du Louvre Acquisition Folio 2008 & 1887 French State Crown Sale Catalog",
        intro: "Empress Eugénie, consort of Napoleon III, was the premier arbiter of fashion in 19th-century Europe. In 1855, court jeweller François Kramer and Gabriel Lemonnier mounted 2,438 brilliant diamonds and 196 rose-cut diamonds into a supple, knotted ribbon bow brooch for her bodice.",
        narrative: [
          {
            heading: "The Tragic 1887 Crown Jewel Sale",
            text: "Following the fall of the Second Empire, the Third Republic decided in 1887 to auction the French Crown Jewels at the Louvre to prevent any royalist revival. The grand bow brooch was purchased by the American heiress Caroline Schermerhorn Astor, becoming the crowning jewel of New York's Gilded Age society.",
            pullQuote: "“The French Republic sold its royal diamonds, but it could never sell the artistry that gave them soul.” — Henri Rochefort, 1887"
          },
          {
            heading: "The Return to France",
            text: "In 2008, when the brooch appeared at Christie's in New York, the Friends of the Louvre mobilized international patrons to raise €6.72 million, purchasing the piece pre-emptively and returning it permanently to the Galerie d'Apollon in the Louvre Museum."
          }
        ],
        relatedStoryIds: ["timeline-versailles-hall-of-mirrors-1684", "room-drawing-room-villa-ephrussi", "vault-duke-of-windsor-charvet-1936"]
      },
      {
        id: "object-alwar-cartier-chronometer",
        worldId: "object",
        worldTitle: "THE ROYAL OBJECT",
        worldNumber: "04",
        title: "The Maharaja of Alwar’s Cartier Tiger Eye Pocket Chronometer",
        subtitle: "A 1927 unique creation in platinum, chatoyant gold quartz, and calibrated baguette diamonds.",
        period: "Art Deco · 1927",
        location: "Alwar, Rajputana & Cartier London Ateliers",
        heroImage: "/images/private-world/04-object/alwar-cartier-chronometer-01.jpg",
        secondaryImage: "/images/private-world/04-object/alwar-cartier-chronometer-02.jpg",
        galleryImages: ["/images/private-world/04-object/alwar-cartier-chronometer-01.jpg", "/images/private-world/04-object/alwar-cartier-chronometer-02.jpg", "/images/private-world/04-object/alwar-cartier-chronometer-03.jpg", "/images/private-world/04-object/alwar-cartier-chronometer-04.jpg"],
        accessionId: "RG OBJECT — 0004",
        collection: "Private European Heritage Horological Collection",
        provenanceSource: "Cartier London Archive Register No. 1842-ALW",
        intro: "Maharaja Jai Singh Prabhakar of Alwar was renowned for his exacting aesthetic taste. In 1927, he commissioned Cartier’s London workshop on New Bond Street to produce a pocket watch carved from a single flawless block of South African tiger eye stone.",
        narrative: [
          {
            heading: "The Art Deco Lapidary Feat",
            text: "Carving chatoyant quartz without fracturing its fibrous asbestos layers required three months of lapidary work under water cooling. The bezel was set with thirty-six calibrated baguette diamonds, framing a cream enamel guilloché dial with blued steel Breguet hands.",
            pullQuote: "“His Highness requested a timepiece that reflected the amber coat of the tiger he had tracked in the Sariska forest.” — Cartier London Sales Ledger, 1927"
          },
          {
            heading: "The European Mechanics",
            text: "Inside the stone casing resided an ultra-thin 17-jewel mechanical movement crafted by European Watch and Clock Co. (a joint venture between Cartier and Edmond Jaeger). It remains one of only three known pocket watches ever carved from semi-precious quartz by Cartier during the interwar era."
          }
        ],
        relatedStoryIds: ["vault-patiala-necklace", "timeline-delhi-durbar-cartier-1911", "automobile-rolls-royce-phantom-of-love"]
      }
    ]
  },

  // ════════════════════════════════════════════════
  // 05 — THE AUTOMOBILE ROOM
  // ════════════════════════════════════════════════
  {
    id: "automobile",
    number: "05",
    title: "THE AUTOMOBILE ROOM",
    frenchTitle: "Le Salon Automobile",
    tagline: "Coachbuilt Royalty · Concours Provenance · Bespoke Touring",
    description: "Historically significant motorcars commissioned by kings, maharajas, dukes, and collectors: the bespoke coachwork, royal modifications, and surviving restorations.",
    accentHero: "/images/private-world/05-automobile/rolls-royce-phantom-of-love-01.jpg",
    stories: [
      {
        id: "automobile-rolls-royce-phantom-of-love",
        worldId: "automobile",
        worldTitle: "THE AUTOMOBILE ROOM",
        worldNumber: "05",
        title: "The 1926 Rolls-Royce Phantom I 'Phantom of Love'",
        subtitle: "Chassis 76TC: Clarence Gasque’s bespoke masterpiece inspired by Marie Antoinette’s Aubusson sedan chair.",
        period: "Interwar Era · 1926",
        location: "Charles Clark & Son, Wolverhampton & Paris",
        heroImage: "/images/private-world/05-automobile/rolls-royce-phantom-of-love-01.jpg",
        secondaryImage: "/images/private-world/05-automobile/rolls-royce-phantom-of-love-02.jpg",
        galleryImages: ["/images/private-world/05-automobile/rolls-royce-phantom-of-love-01.jpg", "/images/private-world/05-automobile/rolls-royce-phantom-of-love-02.jpg", "/images/private-world/05-automobile/rolls-royce-phantom-of-love-03.jpg", "/images/private-world/05-automobile/rolls-royce-phantom-of-love-04.jpg"],
        accessionId: "RG AUTO — 0001",
        collection: "The Keyaerts Private Heritage Collection, Belgium",
        provenanceSource: "Rolls-Royce Enthusiasts' Club Archive & Charles Clark & Son Coachbuilder Blueprints",
        intro: "In 1926, Clarence Gasque, the American director of Woolworth’s British subsidiary, commissioned coachbuilder Charles Clark & Son of Wolverhampton to construct a bespoke body on a Rolls-Royce Phantom I chassis for his wife Maude. His instruction was simple: the interior must recreate the Palace of Versailles.",
        narrative: [
          {
            heading: "The Aubusson Tapestry Cabin",
            text: "Over ten months, French craftsmen were brought to England to weave authentic Aubusson tapestries depicting romantic pastoral scenes for the rear cabin. The woodwork was carved in walnut and gilded with 24-karat gold leaf in the Louis XVI rococo style, complete with cherubs holding crystal lighting sconces.",
            pullQuote: "“Cost is no object. She must feel like Marie Antoinette arriving for an evening at the Petit Trianon.” — Clarence Gasque to Coachbuilder J.H. Barnett, 1926"
          },
          {
            heading: "The Concealed Silver Cabinet",
            text: "Behind sliding gilt panels, Clark installed a solid silver cocktail set with Baccarat crystal decanters, a hidden French ormolu clock, and an ivory vanity case. In 1927, the car cost £6,500—equivalent to the purchase price of five country manor houses in Sussex."
          }
        ],
        relatedStoryIds: ["timeline-versailles-hall-of-mirrors-1684", "vault-duke-of-windsor-charvet-1936", "room-drawing-room-villa-ephrussi"]
      },
      {
        id: "automobile-bugatti-type-57s-atalante",
        worldId: "automobile",
        worldTitle: "THE AUTOMOBILE ROOM",
        worldNumber: "05",
        title: "The 1937 Bugatti Type 57S Atalante of Lord Ridley",
        subtitle: "Chassis 57551: Jean Bugatti’s sculptural art deco coupé in midnight blue and ivory.",
        period: "Interwar Era · 1937",
        location: "Molsheim, Alsace & Blagdon Hall, Northumberland",
        heroImage: "/images/private-world/05-automobile/bugatti-type-57s-atalante-01.jpg",
        secondaryImage: "/images/private-world/05-automobile/bugatti-type-57s-atalante-02.jpg",
        galleryImages: ["/images/private-world/05-automobile/bugatti-type-57s-atalante-01.jpg", "/images/private-world/05-automobile/bugatti-type-57s-atalante-02.jpg", "/images/private-world/05-automobile/bugatti-type-57s-atalante-03.jpg", "/images/private-world/05-automobile/bugatti-type-57s-atalante-04.jpg"],
        accessionId: "RG AUTO — 0002",
        collection: "The Cité de l'Automobile, Mulhouse, France",
        provenanceSource: "Bugatti Trust Factory Records & 3rd Viscount Ridley Family Archive",
        intro: "Only seventeen Atalante coupés were constructed on Bugatti’s legendary low-slung 'S' (Surbaissé) chassis. Delivered new in May 1937 to the 3rd Viscount Ridley at Blagdon Hall in Northumberland, chassis 57551 represents the zenith of pre-war high-speed aristocratic Grand Touring.",
        narrative: [
          {
            heading: "The Sculptural Vision of Jean Bugatti",
            text: "Jean Bugatti was as much a sculptor as an automotive engineer. The Type 57S featured the iconic kidney-shaped side window glass, sweeping pontoon rear fenders, and a split rear windscreen derived directly from the experimental magnesium-bodied Aerolithe prototype.",
            pullQuote: "“To drive a Type 57S along the Great North Road was to feel the road dissolve into aerodynamic music.” — Viscount Ridley, 1938"
          },
          {
            heading: "The Mechanical Symphony",
            text: "Powered by a dual-overhead-camshaft 3.3-litre straight-eight engine with dry-sump lubrication, the car could cruise comfortably at 120 mph—faster than almost any contemporary road automobile in the world."
          }
        ],
        relatedStoryIds: ["vault-duke-of-windsor-charvet-1936", "portrait-duke-of-richmond", "table-chatsworth-ducal-feast"]
      },
      {
        id: "automobile-alfa-romeo-8c-berlinetta",
        worldId: "automobile",
        worldTitle: "THE AUTOMOBILE ROOM",
        worldNumber: "05",
        title: "The 1938 Alfa Romeo 8C 2900B Berlinetta Touring",
        subtitle: "Chassis 412029: The Superleggera masterpiece owned by Prince Bernhard of the Netherlands.",
        period: "Interwar Era · 1938",
        location: "Carrozzeria Touring, Milan & Soestdijk Palace, Netherlands",
        heroImage: "/images/private-world/05-automobile/alfa-romeo-8c-2900b-01.jpg",
        secondaryImage: "/images/private-world/05-automobile/alfa-romeo-8c-2900b-02.jpg",
        galleryImages: ["/images/private-world/05-automobile/alfa-romeo-8c-2900b-01.jpg", "/images/private-world/05-automobile/alfa-romeo-8c-2900b-02.jpg", "/images/private-world/05-automobile/alfa-romeo-8c-2900b-03.jpg", "/images/private-world/05-automobile/alfa-romeo-8c-2900b-04.jpg"],
        accessionId: "RG AUTO — 0003",
        collection: "Collezione Lopresto, Milan",
        provenanceSource: "Alfa Romeo Automobilismo Storico Registers & Carrozzeria Touring Archive",
        intro: "In the late 1930s, the Alfa Romeo 8C 2900B was universally recognized as the fastest, most advanced road car on earth. Crafted by Carrozzeria Touring of Milan using their patented Superleggera (super-lightweight) aluminum skin over a tubular steel cage, this Berlinetta combined racing victory with royal prestige.",
        narrative: [
          {
            heading: "The Royal Enthusiast at Soestdijk",
            text: "Prince Bernhard of the Netherlands was an accomplished pilot and racing motorist. His personal 8C 2900B, painted in deep metallic grigio-azzurro with dark blue Connolly leather, was frequently seen carving through the Alpine passes between Milan and Lake Como on his way to state functions.",
            pullQuote: "“The 8C was not built for gentle promenades; it was an Italian thoroughbred that demanded absolute commanding concentration.” — Prince Bernhard, Auto en Motorsport, 1952"
          },
          {
            heading: "Superleggera Aerodynamics",
            text: "Touring's founder Felice Bianchi Anderloni conducted early aerodynamic wind-tunnel testing at the Polytechnic University of Milan. The result was a tapered teardrop tail and enclosed spare wheels that gave the car effortless high-speed stability along the Italian autostradas."
          }
        ],
        relatedStoryIds: ["table-savoy-piedmont-court", "palace-one-night-at-villa-d-este", "maps-savoy-hunting-estates"]
      },
      {
        id: "automobile-brooke-swan-car-1910",
        worldId: "automobile",
        worldTitle: "THE AUTOMOBILE ROOM",
        worldNumber: "05",
        title: "The 1910 Brooke Swan Car of Calcutta & Nabha",
        subtitle: "The most eccentric royal automobile ever built: glowing amber eyes, steam nostrils, and an eight-note organ.",
        period: "Edwardian Era · 1910",
        location: "JW Brooke & Co., Lowestoft & Nabha State",
        heroImage: "/images/private-world/05-automobile/brooke-swan-car-1910-01.jpg",
        secondaryImage: "/images/private-world/05-automobile/brooke-swan-car-1910-02.jpg",
        galleryImages: ["/images/private-world/05-automobile/brooke-swan-car-1910-01.jpg", "/images/private-world/05-automobile/brooke-swan-car-1910-02.jpg", "/images/private-world/05-automobile/brooke-swan-car-1910-03.jpg", "/images/private-world/05-automobile/brooke-swan-car-1910-04.jpg"],
        accessionId: "RG AUTO — 0004",
        collection: "Louwman Museum, The Hague, Netherlands",
        provenanceSource: "JW Brooke & Co. Works Register & Maharaja Ripudaman Singh Archives",
        intro: "In 1910, wealthy Scottish eccentric Robert Nicholl 'Scotty' Matthew commissioned JW Brooke & Co. of Lowestoft to build a car resembling a swan gliding across water to shock high society in colonial Calcutta. Later acquired by the Maharaja of Nabha, it remains an iconic legend of royal motoring.",
        narrative: [
          {
            heading: "The Mechanical Swan Mechanism",
            text: "The wooden body was carved from seasoned teak and painted with mother-of-pearl lacquer. The beak opened to emit jets of steam from the radiator, the eyes glowed with electrical amber bulbs in the dark, and an eight-note Gabriel brass exhaust horn could play bugle melodies from a keyboard on the dashboard.",
            pullQuote: "“When the Swan Car proceeded down Chowringhee Road, carriage horses bolted and police officers stood at attention in utter disbelief.” — The Englishman, Calcutta, April 1910"
          },
          {
            heading: "The Nabha Royal Garage",
            text: "When the British authorities banned the car from Calcutta streets due to traffic panic, the Maharaja of Nabha bought the automobile for his royal fleet, having a smaller 'Cygnet' built to accompany it during royal processions through his princely state."
          }
        ],
        relatedStoryIds: ["vault-patiala-necklace", "timeline-delhi-durbar-cartier-1911", "room-durbar-hall-fateh-prakash"]
      }
    ]
  },

  // ════════════════════════════════════════════════
  // 06 — ONE NIGHT AT THE PALACE
  // ════════════════════════════════════════════════
  {
    id: "palace",
    number: "06",
    title: "ONE NIGHT AT THE PALACE",
    frenchTitle: "Une Nuit au Palais",
    tagline: "Immersive Manor Stays · Living Heritage · Twilight to Dawn",
    description: "Intimate, sensory journeys through extraordinary heritage properties: arriving at dusk, wandering courtyards, dining by candlelit lakes, and waking to living history.",
    accentHero: "/images/private-world/06-palace/devshree-deogarh-01.jpg",
    stories: [
      {
        id: "palace-one-night-at-devshree",
        worldId: "palace",
        worldTitle: "ONE NIGHT AT THE PALACE",
        worldNumber: "06",
        title: "One Night at Devshree: Lakeside Manor Hospitality in Deogarh",
        subtitle: "The required launch feature: An intimate rural sanctuary on the shores of Lake Ragho Sagar created by Shatrunjai and Bhavna Singh.",
        period: "Living Heritage · Contemporary",
        location: "Devshree, Deogarh, Rajsamand District, Rajasthan",
        heroImage: "/images/private-world/06-palace/devshree-deogarh-01.jpg",
        secondaryImage: "/images/private-world/06-palace/devshree-deogarh-02.jpg",
        galleryImages: ["/images/private-world/06-palace/devshree-deogarh-01.jpg", "/images/private-world/06-palace/devshree-deogarh-02.jpg", "/images/private-world/06-palace/devshree-deogarh-03.jpg", "/images/private-world/06-palace/devshree-deogarh-04.jpg", "/images/private-world/06-palace/devshree-deogarh-05.jpg"],
        accessionId: "RG PALACE — 0001",
        collection: "Devshree Private Estate & Ghanerao Lineage Archives",
        provenanceSource: "Official Devshree Manor Architectural Folios & On-Site Editorial Field Visit",
        intro: "Dusk arrives over Lake Ragho Sagar with the quiet grace of a watercolour wash. At Devshree, the private manor created by Shatrunjai and Bhavna Singh of the Deogarh-Ghanerao lineage, hospitality is not an institutional service; it is an invitation into an aristocratic home where every stone and conversation carries the warmth of three centuries of living tradition.",
        narrative: [
          {
            heading: "Arrival: The Warmth of Mewari Welcome",
            text: "Turning off the country road past ancient banyan trees and whitewashed village temples, the carved timber gates of Devshree swing open into a gravel courtyard perfumed with night-blooming jasmine (raat ki rani). There are no brass bells, no registration desks, no credit-card terminals thrust into your hand. Instead, you are welcomed by your hosts on the stone veranda with brass tumblers of iced pomegranate sherbet and cold linen towels.",
            pullQuote: "“We did not build Devshree as a hotel; we built it as a home with open doors for those who appreciate slow, soulful heritage.” — Bhavna Singh, Devshree"
          },
          {
            heading: "The House: Courtyards, Verandas & Stone Jharokhas",
            text: "Designed in traditional Haveli architecture using local sandstone hand-chiselled by master stone-masons of Rajsamand, Devshree flows around an open central courtyard (chowk). Wide verandas with colonial wicker planter chairs, arched hallways hung with sepia family portraits, and shelves lined with brass polo trophies and botanical volumes create an atmosphere of quiet, timeless ease.",
            image: "/images/private-world/06-palace/devshree-deogarh-03.jpg",
            caption: "Intimate Mewari candlelit dining on the veranda of Dev Shree"
          },
          {
            heading: "The Room: Hand-Blocked Linen & Afternoon Shadows",
            text: "Each of the intimate guest suites features high ceilings with exposed timber beams, hand-blocked Jaipur floral curtains, and four-poster brass beds draped in Egyptian cotton. Antique writing desks hold handmade paper, brass reading lamps, and jars of dried vetiver roots (khus) that fill the room with an earthy, grounding sweetness."
          },
          {
            heading: "The Dining: Family Recipes under the Starlit Banyan",
            text: "Dinner at Devshree is served family-style on the lawn under an illuminated 150-year-old banyan tree. Bhavna Singh oversees the kitchen, preparing heirloom Mewari recipes handed down through generations of royal kitchens: pit-roasted khad mutton infused with whole cloves, slow-simmered smoked dal, crisp bajra rotis buttered with homemade churned ghee, and delicate saffron-scented shrikhand.",
            pullQuote: "“The food we serve tonight is the exact food our grandmothers prepared in the thikana households—unhurried, aromatic, and deeply honest.” — Shatrunjai Singh"
          },
          {
            heading: "The Morning: Migratory Birds & Lake Mist",
            text: "Dawn breaks with the calls of grey hornbills and kingfishers skimming the glassy surface of Lake Ragho Sagar. Sitting on the lakeside stone pavilion with a steaming pot of freshly brewed Darjeeling first-flush tea, you watch rural fishermen cast hand-nets from wooden dugouts while herd-boys lead cattle along the far bank. Time at Devshree does not march; it gently floats."
          }
        ],
        relatedStoryIds: ["portrait-shatrunjai-singh-devshree", "table-buckingham-state-banquet", "palace-one-night-at-ahilya-fort"]
      },
      {
        id: "palace-one-night-at-the-balmoral",
        worldId: "palace",
        worldTitle: "ONE NIGHT AT THE PALACE",
        worldNumber: "06",
        title: "One Night at The Balmoral: The Clock Tower Suite & Edinburgh Castle",
        subtitle: "1 Princes Street: Scottish tartan grandeur, single malt cellars, and the clock that runs three minutes fast.",
        period: "Victorian to Modern Era",
        location: "The Balmoral Hotel, 1 Princes Street, Edinburgh, Scotland",
        heroImage: "/images/private-world/06-palace/the-balmoral-edinburgh-01.jpg",
        secondaryImage: "/images/private-world/06-palace/the-balmoral-edinburgh-02.jpg",
        galleryImages: ["/images/private-world/06-palace/the-balmoral-edinburgh-01.jpg", "/images/private-world/06-palace/the-balmoral-edinburgh-02.jpg", "/images/private-world/06-palace/the-balmoral-edinburgh-03.jpg", "/images/private-world/06-palace/the-balmoral-edinburgh-04.jpg"],
        accessionId: "RG PALACE — 0002",
        collection: "Rocco Forte Hotels Archive & Balmoral Heritage Register",
        provenanceSource: "North British Railway Hotel Ledgers 1902 & City of Edinburgh Archives",
        intro: "Since opening in 1902 as the North British Station Hotel, The Balmoral has anchored Edinburgh’s skyline with its landmark 58-metre clock tower. By city tradition, its clock is intentionally set three minutes fast—ensuring that Scottish railway passengers never miss their express train to London King’s Cross.",
        narrative: [
          {
            heading: "The Clock Tower Suite",
            text: "Ascending in the brass-latticed elevator to the top floor, the Clock Tower Suite commands panoramic views across Princes Street Gardens to the volcanic basalt crags of Edinburgh Castle. Decorated by Olga Polizzi in muted heather wools, bespoke Balmoral tartan throws, and antique oak bookcases, the suite feels like an aristocratic country house perched in the clouds.",
            pullQuote: "“Edinburgh is a city of stone and shadow, and from this tower window you see her ancient heart beating.” — Balmoral Butler Journal"
          },
          {
            heading: "SCOTCH: The 500-Malt Sanctuary",
            text: "Before dinner, guests descend to SCOTCH, where a dedicated kilted Whisky Ambassador presides over a cabinet of over 500 rare single malts, including closed-distillery Port Ellen 1979 and Macallan sherry-cask editions poured into Lalique crystal copitas."
          }
        ],
        relatedStoryIds: ["vault-balmoral-menu-1897", "table-chatsworth-ducal-feast", "palace-one-night-at-devshree"]
      },
      {
        id: "palace-one-night-at-villa-d-este",
        worldId: "palace",
        worldTitle: "ONE NIGHT AT THE PALACE",
        worldNumber: "06",
        title: "One Night at Villa d’Este: Renaissance Opulence on Lake Como",
        subtitle: "Built in 1568 for Cardinal Tolomeo Gallio: floating pools, 25-acre gardens, and five centuries of European aristocracy.",
        period: "Renaissance to Living Heritage",
        location: "Cernobbio, Lake Como, Lombardy, Italy",
        heroImage: "/images/private-world/06-palace/villa-d-este-como-01.jpg",
        secondaryImage: "/images/private-world/06-palace/villa-d-este-como-02.jpg",
        galleryImages: ["/images/private-world/06-palace/villa-d-este-como-01.jpg", "/images/private-world/06-palace/villa-d-este-como-02.jpg", "/images/private-world/06-palace/villa-d-este-como-03.jpg", "/images/private-world/06-palace/villa-d-este-como-04.jpg"],
        accessionId: "RG PALACE — 0003",
        collection: "Villa d’Este Historical Archives, Cernobbio",
        provenanceSource: "Tolomeo Gallio Deeds & Grand Tour Chronicles of Caroline of Brunswick",
        intro: "Set upon the western shore of Lake Como, Villa d’Este was built in 1568 by architect Pellegrino Pellegrini as the summer residence of Cardinal Tolomeo Gallio. In 1815, it became the private refuge of Caroline of Brunswick, Princess of Wales, who landscaped the world-renowned mosaic nymphaeum and cypress avenues.",
        narrative: [
          {
            heading: "The Floating Pool and the Mirror Lake",
            text: "Stepping onto the pontoon floating pool built directly into the cobalt waters of Lake Como, snow-capped Alpine peaks reflect in the early morning stillness. Footmen in ivory dinner jackets serve Bellinis on the terrace under 500-year-old plane trees.",
            pullQuote: "“To wake at Villa d’Este is to realize that civilization peaked when Italian architecture learned to embrace mountain water.” — Stendhal, Rome, Naples et Florence"
          },
          {
            heading: "The Nymphaeum at Twilight",
            text: "As evening falls, the 16th-century polychrome mosaic nymphaeum is lit with amber spotlights. Dinner in the Veranda restaurant overlooks steamers gliding across the lake while guests savor risotto with Lake Como perch and white truffles."
          }
        ],
        relatedStoryIds: ["automobile-alfa-romeo-8c-berlinetta", "table-savoy-piedmont-court", "palace-one-night-at-devshree"]
      },
      {
        id: "palace-one-night-at-ahilya-fort",
        worldId: "palace",
        worldTitle: "ONE NIGHT AT THE PALACE",
        worldNumber: "06",
        title: "One Night at Ahilya Fort: High Above the Sacred Narmada",
        subtitle: "Maharani Ahilyabai Holkar’s 18th-century sanctuary restored by Prince Richard Holkar in Maheshwar.",
        period: "18th Century to Living Heritage",
        location: "Maheshwar, Madhya Pradesh",
        heroImage: "/images/private-world/06-palace/ahilya-fort-maheshwar-01.jpg",
        secondaryImage: "/images/private-world/06-palace/ahilya-fort-maheshwar-02.jpg",
        galleryImages: ["/images/private-world/06-palace/ahilya-fort-maheshwar-01.jpg", "/images/private-world/06-palace/ahilya-fort-maheshwar-02.jpg", "/images/private-world/06-palace/ahilya-fort-maheshwar-03.jpg", "/images/private-world/06-palace/ahilya-fort-maheshwar-04.jpg"],
        accessionId: "RG PALACE — 0004",
        collection: "The Holkar Dynasty Historical Archives, Maheshwar",
        provenanceSource: "Ahilyabai Holkar Court Charters & Prince Richard Holkar Writings",
        intro: "Perched 40 feet above the sacred Narmada River on sheer sandstone ramparts, Ahilya Fort was the seat of Maharani Ahilyabai Holkar—one of India’s most revered philosopher-queens. Restored into a world-class boutique retreat by her direct descendant Prince Richard Holkar, the fort offers an unparalleled spiritual and sensory communion with living history.",
        narrative: [
          {
            heading: "The Ramparts at Candlelight",
            text: "Every evening at sunset, 1,000 clay oil lamps (diyas) are lit along the stone parapets of Ahilya Fort. Guests gather for chilled white wine on the battlements as temple bells echo across the river ghats below and priests perform the ancient Narmada Aarti ceremony.",
            pullQuote: "“Ahilyabai ruled with a prayer in her heart and a balance in her hand; here, you breathe that same quiet equilibrium.” — Prince Richard Holkar"
          },
          {
            heading: "The Maheshwari Handloom Heritage",
            text: "Adjacent to the fort, the Rehwa Society established by the Holkar family preserves the 250-year-old royal handloom tradition. The rhythmic clack of wooden shuttle looms weaving gold zari silk and fine cotton provides the soundtrack to afternoon strolls through organic vegetable gardens."
          }
        ],
        relatedStoryIds: ["palace-one-night-at-devshree", "portrait-shatrunjai-singh-devshree", "timeline-amber-purandar-1665"]
      }
    ]
  },

  // ════════════════════════════════════════════════
  // 07 — THE BOOK OF THE MONTH
  // ════════════════════════════════════════════════
  {
    id: "book",
    number: "07",
    title: "THE BOOK OF THE MONTH",
    frenchTitle: "Le Livre du Mois",
    tagline: "Digital Luxury Coffee-Table Book · Spreads · Chapter Reader",
    description: "A complete digital luxury publication experienced page by page: high-resolution photography, chapter markers, and collectible editorial essays.",
    accentHero: "/images/private-world/07-book/imperial-cartier-archive-01.jpg",
    stories: [
      {
        id: "book-chronicles-palace-architecture",
        worldId: "book",
        worldTitle: "THE BOOK OF THE MONTH",
        worldNumber: "07",
        title: "VOLUME I: The Chronicles of Palace Architecture & Living Heritage",
        subtitle: "An intimate digital coffee-table volume in four chapters exploring fortresses, water pavilions, zenana carvings, and 21st-century conservation.",
        period: "Curated Edition · 2026",
        location: "Rajputana, Central India & The European Grand Tour",
        heroImage: "/images/private-world/07-book/chronicles-palace-architecture-01.jpg",
        secondaryImage: "/images/private-world/07-book/chronicles-palace-architecture-02.jpg",
        galleryImages: ["/images/private-world/07-book/chronicles-palace-architecture-01.jpg", "/images/private-world/07-book/chronicles-palace-architecture-02.jpg", "/images/private-world/07-book/chronicles-palace-architecture-03.jpg", "/images/private-world/07-book/chronicles-palace-architecture-04.jpg"],
        accessionId: "RG BOOK — VOL-01",
        collection: "The Royal Gallerys Editorial Archive & Special Editions",
        provenanceSource: "Compiled by the Senior Curatorial Board of The Royal Gallerys",
        intro: "Welcome to the inaugural Volume of The Book of the Month. Conceived as a tactile digital coffee-table monograph, this publication invites members to turn through four beautifully illustrated chapters on the architectural philosophy and living survival of aristocratic estates.",
        bookChapters: [
          {
            id: "chap-1",
            number: "CHAPTER I",
            title: "The Geometry of Power",
            subtitle: "Fortresses of the Aravalli Escarpment",
            prose: [
              "Before a palace became an ornament, it was a machine of survival.",
              "Perched along the jagged ridge lines of the Aravalli range—among the oldest geological formations on earth—the fortresses of Rajasthan were engineered to harmonize with topography. At Mehrangarh, Kumbhalgarh, and Amber, stone quarried from the foundation ditch became the curtain wall itself, rendering the fortification an organic extension of the living bedrock.",
              "Water was the ultimate sovereign currency. Deep stepwells (baolis), rainwater harvesting cisterns under central courtyards, and gravity-fed channels enabled garrisons to withstand year-long sieges without surrender."
            ],
            image: "/images/private-world/07-book/chronicles-palace-architecture-03.jpg",
            caption: "A jali or jaali, (Urdu: جالی Hindi:जाली jālī, meaning 'net') is the term for a perforated stone or l"
          },
          {
            id: "chap-2",
            number: "CHAPTER II",
            title: "The Water Pavilions",
            subtitle: "Jal Mahals & Lake Sanctuaries of Mewar",
            prose: [
              "When peace was secured, architecture turned toward reflection.",
              "In Udaipur and Deogarh, palaces were built not to repel water, but to float upon it. The Taj Lake Palace (Jag Niwas), constructed between 1743 and 1746 by Maharana Jagat Singh II, transformed white Makrana marble into a floating island where summer breezes were chilled across water terraces.",
              "Open-air stone jharokhas were strategically angled to capture prevailing lake winds, using evaporative cooling centuries before the invention of mechanical refrigeration."
            ],
            image: "/images/private-world/07-book/chronicles-palace-architecture-04.jpg",
            caption: "The 151-meter (495 feet) residential and hotel tower of The Hub on Causeway complex in Boston, Unite"
          },
          {
            id: "chap-3",
            number: "CHAPTER III",
            title: "The Inner Courts",
            subtitle: "Zenana Carvings, Mirror Mosaics & Belgian Crystal",
            prose: [
              "Behind heavy teak gateways lay the private universe of the Zenana.",
              "Here, privacy did not signify confinement; it was a sanctuary of exquisite craftsmanship. Pierced stone screens (jaalis) carved so delicately they resemble starched lace allowed royal ladies to observe court ceremonies outside without being observed in turn.",
              "In the Sheesh Mahal of Amber and the Mor Chowk of Udaipur, thousands of convex Belgian glass mirrors and glass mosaics catch the light of a single candle, multiplying it into a celestial canopy of constellations."
            ],
            image: "/images/private-world/07-book/chronicles-palace-architecture-01.jpg",
            caption: "The peacock mosaics of Mor Chowk in City Palace Udaipur, crafted with 5,000 pieces of glass."
          },
          {
            id: "chap-4",
            number: "CHAPTER IV",
            title: "The Custodians' Ledger",
            subtitle: "The 21st-Century Art of Heritage Enterprise",
            prose: [
              "Heritage cannot survive merely as an inert museum; it must breathe, employ, and evolve.",
              "Today, a new generation of royal custodians—from Deogarh Devshree to Ahilya Fort and Goodwood—are pioneering the concept of Living Heritage. By converting ancestral properties into intimate, sustainable retreats, revenue is redirected into rural artisan guilds, stepwell restoration, and forest conservation.",
              "The guest is no longer an onlooker; they become an active patron in the preservation of living cultural memory."
            ],
            image: "/images/private-world/07-book/chronicles-palace-architecture-02.jpg",
            caption: "The ancient Badi Mahal garden pavilion in Udaipur, preserved through meticulous structural conservation."
          }
        ],
        narrative: [
          {
            heading: "A Monograph in Digital Motion",
            text: "Use the chapter navigator below to move through this publication page by page, examine high-resolution architectural plates, and continue reading your private copy at any time."
          }
        ],
        relatedStoryIds: ["palace-one-night-at-devshree", "room-durbar-hall-fateh-prakash", "portrait-shatrunjai-singh-devshree"]
      },
      {
        id: "book-imperial-cartier-archive",
        worldId: "book",
        worldTitle: "THE BOOK OF THE MONTH",
        worldNumber: "07",
        title: "VOLUME II: Cartier & The Kings: Place Vendôme to the Princely Treasuries",
        subtitle: "The complete archival monograph documenting Jacques Cartier's private travel journals and gouache master renderings (1911–1939).",
        period: "Curated Edition · 2026",
        location: "Paris, London, Delhi, Patiala & Kapurthala",
        heroImage: "/images/private-world/07-book/imperial-cartier-archive-01.jpg",
        secondaryImage: "/images/private-world/07-book/imperial-cartier-archive-02.jpg",
        galleryImages: ["/images/private-world/07-book/imperial-cartier-archive-01.jpg", "/images/private-world/07-book/imperial-cartier-archive-02.jpg"],
        accessionId: "RG BOOK — VOL-02",
        collection: "Cartier Historical Archives & The Royal Gallerys Library",
        provenanceSource: "Cartier Heritage Department Monograph Registries",
        intro: "A dedicated digital exhibition volume compiling rare gouache renderings, original invoice registers, and unpublished photographs from the golden era when Indian and European monarchs commissioned the finest jewels of the 20th century.",
        narrative: [
          {
            heading: "The High Jewellery Folios",
            text: "This edition showcases thirty full-page plates illustrating the design evolution from Belle Époque garland ribbons to bold Art Deco architectural geometries, accompanied by curatorial commentary from leading international gemological historians."
          }
        ],
        relatedStoryIds: ["vault-patiala-necklace", "timeline-delhi-durbar-cartier-1911", "object-portland-tiara"]
      },
      {
        id: "book-great-dining-rooms-europe",
        worldId: "book",
        worldTitle: "THE BOOK OF THE MONTH",
        worldNumber: "07",
        title: "VOLUME III: The Great Banqueting Halls of Europe",
        subtitle: "From Chatsworth to Versailles: Gilded ceilings, silver gilt services, and the lost etiquette of royal dinners.",
        period: "Curated Edition · 2026",
        location: "Versailles, Buckingham Palace, Turin & Saint Petersburg",
        heroImage: "/images/private-world/07-book/great-dining-rooms-europe-01.jpg",
        secondaryImage: "/images/private-world/07-book/great-dining-rooms-europe-02.jpg",
        galleryImages: ["/images/private-world/07-book/great-dining-rooms-europe-01.jpg", "/images/private-world/07-book/great-dining-rooms-europe-02.jpg", "/images/private-world/07-book/great-dining-rooms-europe-03.jpg", "/images/private-world/07-book/great-dining-rooms-europe-04.jpg"],
        accessionId: "RG BOOK — VOL-03",
        collection: "European Royal Collections Consortium",
        provenanceSource: "Palace Curatorial Archives",
        intro: "A richly photographic exploration of sixty historic palace dining rooms across Europe, examining how architecture, lighting, silverware, and wine cellars combined to project absolute political and cultural authority.",
        narrative: [
          {
            heading: "The Architecture of the Feast",
            text: "Through high-definition interior photography, this volume walks members through the acoustic design, footmen service routes, and table setting protocols that governed state dinners from the Sun King to the Edwardian era."
          }
        ],
        relatedStoryIds: ["table-buckingham-state-banquet", "timeline-versailles-hall-of-mirrors-1684", "table-chatsworth-ducal-feast"]
      },
      {
        id: "book-coachbuilt-aristocracy",
        worldId: "book",
        worldTitle: "THE BOOK OF THE MONTH",
        worldNumber: "07",
        title: "VOLUME IV: The Coachbuilt Era: Bespoke Aristocratic Automobiles",
        subtitle: "Rolls-Royce, Bugatti, Hispano-Suiza, and the master coachbuilders of Paris, London, and Turin.",
        period: "Curated Edition · 2026",
        location: "Molsheim, Wolverhampton, Milan & London",
        heroImage: "/images/private-world/07-book/coachbuilt-aristocracy-01.jpg",
        secondaryImage: "/images/private-world/07-book/coachbuilt-aristocracy-02.jpg",
        galleryImages: ["/images/private-world/07-book/coachbuilt-aristocracy-01.jpg", "/images/private-world/07-book/coachbuilt-aristocracy-02.jpg", "/images/private-world/07-book/coachbuilt-aristocracy-03.jpg", "/images/private-world/07-book/coachbuilt-aristocracy-04.jpg"],
        accessionId: "RG BOOK — VOL-04",
        collection: "Automotive Heritage Foundation",
        provenanceSource: "Coachbuilders Guild & Pebble Beach Concours Archives",
        intro: "When motorcars were purchased not off showroom floors, but as bare motorized rolling chassis to be clothed by master coachbuilders in wood, hammered aluminum, and fine wool tapestries.",
        narrative: [
          {
            heading: "The Rolling Sculpture",
            text: "Features full technical folios and period photographs of the most celebrated one-off coachbuilt bodies constructed for European aristocracy and Indian maharajas between 1920 and 1939."
          }
        ],
        relatedStoryIds: ["automobile-rolls-royce-phantom-of-love", "automobile-bugatti-type-57s-atalante", "automobile-alfa-romeo-8c-berlinetta"]
      }
    ]
  },

  // ════════════════════════════════════════════════
  // 08 — THE PRIVATE PORTRAIT
  // ════════════════════════════════════════════════
  {
    id: "portrait",
    number: "08",
    title: "THE PRIVATE PORTRAIT",
    frenchTitle: "Le Portrait Privé",
    tagline: "The Person Behind the Palace · Custodians of Heritage",
    description: "Deep, intimate profiles revealing the individuals who conserve, inhabit, and breathe living purpose into historic estates, collections, and landscapes.",
    accentHero: "/images/private-world/08-portrait/duke-of-richmond-goodwood-01.jpg",
    stories: [
      {
        id: "portrait-shatrunjai-singh-devshree",
        worldId: "portrait",
        worldTitle: "THE PRIVATE PORTRAIT",
        worldNumber: "08",
        title: "Shatrunjai & Bhavna Singh of Devshree Deogarh",
        subtitle: "The custodians of Mewari manor culture: Preserving rural wetlands, heirloom cuisine, and slow luxury.",
        period: "Living Heritage · Contemporary",
        location: "Devshree, Deogarh, Rajasthan",
        heroImage: "/images/private-world/08-portrait/shatrunjai-devshree-01.jpg",
        secondaryImage: "/images/private-world/08-portrait/shatrunjai-devshree-02.jpg",
        galleryImages: ["/images/private-world/08-portrait/shatrunjai-devshree-01.jpg", "/images/private-world/08-portrait/shatrunjai-devshree-02.jpg", "/images/private-world/08-portrait/shatrunjai-devshree-03.jpg", "/images/private-world/08-portrait/shatrunjai-devshree-04.jpg"],
        accessionId: "RG PORTRAIT — 0001",
        collection: "Ghanerao-Deogarh House Archives",
        provenanceSource: "Exclusive Personal Interview & Field Documentation with Shatrunjai Singh",
        intro: "In an era of mass commercial hospitality, Shatrunjai and Bhavna Singh have quietly engineered a masterclass in restorative rural conservation. Direct descendants of the Chundawat clan of Mewar, they chose not to convert an impersonal fort into a 200-room resort, but to build an intimate manor that anchors the ecological and social fabric of their ancestral lands.",
        narrative: [
          {
            heading: "The Return to the Soil",
            text: "After years of international luxury hospitality leadership, Shatrunjai returned to Deogarh with a singular realization: true luxury was not about marble fountains; it was about genuine, quiet intimacy with the land. Working alongside village craftsmen, they revived dry-stone masonry, restored ancient water-harvesting channels, and planted indigenous trees along the lake boundary.",
            pullQuote: "“If a heritage property does not benefit the farmer who grazes his cows outside your gates, it is merely a vanity project. True heritage must feed its community.” — Shatrunjai Singh"
          },
          {
            heading: "Bhavna Singh and The Culinary Archive",
            text: "Bhavna Singh’s role at Devshree is that of a cultural archivist. She has spent twenty years recording recipes from royal aunts and rural village grandmothers—recipes that were never committed to print, relying on pinch measurements and intuitive temperature control over open wood fires.",
            image: "/images/private-world/08-portrait/shatrunjai-devshree-03.jpg",
            caption: "Hospitality traditions and royal lineage at Dev Shree Deogarh"
          }
        ],
        relatedStoryIds: ["palace-one-night-at-devshree", "table-buckingham-state-banquet", "palace-one-night-at-ahilya-fort"]
      },
      {
        id: "portrait-duke-of-richmond",
        worldId: "portrait",
        worldTitle: "THE PRIVATE PORTRAIT",
        worldNumber: "08",
        title: "The Duke of Richmond & Gordon: The Goodwood Enterprise",
        subtitle: "How Charles Gordon-Lennox transformed a 12,000-acre Sussex estate into a global capital of motorsport and equine heritage.",
        period: "Contemporary Aristocracy",
        location: "Goodwood House, Chichester, West Sussex, England",
        heroImage: "/images/private-world/08-portrait/duke-of-richmond-goodwood-01.jpg",
        secondaryImage: "/images/private-world/08-portrait/duke-of-richmond-goodwood-02.jpg",
        galleryImages: ["/images/private-world/08-portrait/duke-of-richmond-goodwood-01.jpg", "/images/private-world/08-portrait/duke-of-richmond-goodwood-02.jpg", "/images/private-world/08-portrait/duke-of-richmond-goodwood-03.jpg", "/images/private-world/08-portrait/duke-of-richmond-goodwood-04.jpg"],
        accessionId: "RG PORTRAIT — 0002",
        collection: "Goodwood House Private Archives",
        provenanceSource: "Goodwood Estate Heritage Records & Interview with the 11th Duke of Richmond",
        intro: "Charles Gordon-Lennox, the 11th Duke of Richmond, represents the gold standard of modern aristocratic stewardship. Inheriting an estate burdened by crushing death duties, he created the Goodwood Festival of Speed and the Goodwood Revival, generating hundreds of millions of pounds for heritage conservation.",
        narrative: [
          {
            heading: "The Rebirth of Motor Circuit History",
            text: "When the Duke reopened the historic Goodwood Motor Circuit in 1998, he instituted a strict dress code: every spectator, mechanic, and driver was required to dress in authentic pre-1966 period attire. The Revival became not just a car race, but an immersive time capsule.",
            pullQuote: "“To preserve an English estate today, you must be more daring and entrepreneurial than the ancestors who originally built it.” — Duke of Richmond"
          },
          {
            heading: "The Art Collections of Goodwood House",
            text: "Beneath the neoclassical domes designed by James Wyatt, the Duke continues to conserve one of Britain's most important private collections of George Stubbs equestrian paintings and Canaletto London river views."
          }
        ],
        relatedStoryIds: ["automobile-bugatti-type-57s-atalante", "table-chatsworth-ducal-feast", "room-haddon-hall"]
      },
      {
        id: "portrait-princess-esra-jah",
        worldId: "portrait",
        worldTitle: "THE PRIVATE PORTRAIT",
        worldNumber: "08",
        title: "Princess Esra Jah: The Rebirth of Falaknuma & Chowmahalla",
        subtitle: "The monumental ten-year architectural crusade to restore the Nizams of Hyderabad’s twin palaces.",
        period: "Contemporary · 2000 to Present",
        location: "Falaknuma Palace & Chowmahalla Palace, Hyderabad",
        heroImage: "/images/private-world/08-portrait/princess-esra-hyderabad-01.jpg",
        secondaryImage: "/images/private-world/08-portrait/princess-esra-hyderabad-02.jpg",
        galleryImages: ["/images/private-world/08-portrait/princess-esra-hyderabad-01.jpg", "/images/private-world/08-portrait/princess-esra-hyderabad-02.jpg", "/images/private-world/08-portrait/princess-esra-hyderabad-03.jpg", "/images/private-world/08-portrait/princess-esra-hyderabad-04.jpg"],
        accessionId: "RG PORTRAIT — 0003",
        collection: "The Asaf Jahi Dynasty Historical Trust, Hyderabad",
        provenanceSource: "Chowmahalla Palace Restoration Ledgers & Architectural Reports by Rahul Mehrotra",
        intro: "In 2000, Princess Esra Jah, former wife of Mukarram Jah (the 8th Nizam of Hyderabad), walked through the derelict corridors of Chowmahalla and Falaknuma. Water poured through rotted ceilings, crystal chandeliers hung in precarious pieces, and centuries of family documents were moldering in forgotten basements. She embarked on a ten-year restoration campaign that won the UNESCO Asia-Pacific Heritage Award.",
        narrative: [
          {
            heading: "Restoring the Scorpion Palace",
            text: "Falaknuma—the 'Mirror of the Sky' built in the shape of a scorpion by Prime Minister Nawab Vikar-ul-Umra—required 100 master textile conservators to recreate the Venetian embossed leather wall coverings and hand-woven Belgian tapestries.",
            pullQuote: "“I could not stand by and watch three hundred years of Deccan history dissolve into dust. It was my moral duty to the people of Hyderabad.” — Princess Esra Jah"
          },
          {
            heading: "The Chowmahalla Restoration",
            text: "At Chowmahalla Palace, Princess Esra spearheaded the meticulous classification of thousands of archival photographs, court weapons, and the restoration of the Nizam’s 1912 ceremonial yellow Rolls-Royce Silver Ghost."
          }
        ],
        relatedStoryIds: ["room-durbar-hall-fateh-prakash", "vault-patiala-necklace", "timeline-delhi-durbar-cartier-1911"]
      },
      {
        id: "portrait-count-hubert-d-ornano",
        worldId: "portrait",
        worldTitle: "THE PRIVATE PORTRAIT",
        worldNumber: "08",
        title: "Count Hubert d’Ornano: The Châteaux & Botanical Legacies of the Loire",
        subtitle: "The French aristocratic founder of Sisley and the art of preserving family estates and botanical gardens.",
        period: "20th to 21st Century",
        location: "Château de la Ville-aux-Clers, Loir-et-Cher, France",
        heroImage: "/images/private-world/08-portrait/count-hubert-d-ornano-01.jpg",
        secondaryImage: "/images/private-world/08-portrait/count-hubert-d-ornano-02.jpg",
        galleryImages: ["/images/private-world/08-portrait/count-hubert-d-ornano-01.jpg", "/images/private-world/08-portrait/count-hubert-d-ornano-02.jpg", "/images/private-world/08-portrait/count-hubert-d-ornano-03.jpg", "/images/private-world/08-portrait/count-hubert-d-ornano-04.jpg"],
        accessionId: "RG PORTRAIT — 0004",
        collection: "d'Ornano Family Foundation & Sisley Botanical Archives",
        provenanceSource: "d'Ornano Family Estate Archives, Paris",
        intro: "A direct descendant of Philippe Antoine d'Ornano—one of Napoleon’s Marshals of France—Count Hubert d'Ornano and his wife Isabelle combined aristocratic land stewardship with high botanical science, turning ancestral passion for rare plants into a global luxury empire.",
        narrative: [
          {
            heading: "The Living Botanical Heritage",
            text: "At their family estate in the Loire Valley, the d'Ornano family established private botanical research gardens devoted to rare and endangered medicinal flora. Their philosophy was rooted in the European tradition of the 'gentleman-botanist.'",
            pullQuote: "“To plant a tree in the park of an ancestral château is to make an appointment with someone you will never meet: your great-grandchild.” — Count Hubert d'Ornano"
          },
          {
            heading: "The Family Châteaux Collections",
            text: "The family continues to conserve rare Empire-era military correspondence, hand-painted botanical folios from the 18th century, and classic equestrian stables in the Loire valley."
          }
        ],
        relatedStoryIds: ["timeline-versailles-hall-of-mirrors-1684", "object-empress-eugenie-brooch", "room-drawing-room-villa-ephrussi"]
      }
    ]
  },

  // ════════════════════════════════════════════════
  // 09 — THE ROOM
  // ════════════════════════════════════════════════
  {
    id: "room",
    number: "09",
    title: "THE ROOM",
    frenchTitle: "La Chambre",
    tagline: "Interactive Palace Interiors · Secret Objects · Hotspot Discoveries",
    description: "Immersive interior examinations: click on historic chairs, paintings, tapestries, and crystal lustres to reveal provenance, craftsmen, and forgotten history.",
    accentHero: "/images/private-world/09-room/haddon-hall-long-gallery-01.jpg",
    stories: [
      {
        id: "room-haddon-hall",
        worldId: "room",
        worldTitle: "THE ROOM",
        worldNumber: "09",
        title: "The Long Gallery of Haddon Hall",
        subtitle: "Tudor bay windows, Elizabethan carved friezes, and four centuries of untouched oak panelling in Derbyshire.",
        period: "Tudor & Elizabethan · 1580",
        location: "Haddon Hall, Bakewell, Derbyshire, England",
        heroImage: "/images/private-world/09-room/haddon-hall-long-gallery-01.jpg",
        secondaryImage: "/images/private-world/09-room/haddon-hall-long-gallery-02.jpg",
        galleryImages: ["/images/private-world/09-room/haddon-hall-long-gallery-01.jpg", "/images/private-world/09-room/haddon-hall-long-gallery-02.jpg", "/images/private-world/09-room/haddon-hall-long-gallery-03.jpg", "/images/private-world/09-room/haddon-hall-long-gallery-04.jpg"],
        accessionId: "RG ROOM — 0001",
        collection: "The Duke of Rutland Collection, Haddon Hall",
        provenanceSource: "Vernon & Manners Family Household Inventories 1589",
        intro: "The Long Gallery at Haddon Hall is considered by architectural historians to be the finest surviving Elizabethan interior in the world. Built by Sir John Manners between 1567 and 1584, its undulating 110-foot oak floorboards and vast diamond-paned bay windows have survived essentially unaltered.",
        hotspots: [
          {
            id: "hotspot-haddon-1",
            x: 28,
            y: 42,
            title: "The Elizabethan Bay Window",
            category: "ARCHITECTURE",
            description: "Features over 2,000 hand-blown leaded glass lozenges incorporating the heraldic peacocks of the Manners family and the boar heads of Vernon.",
            provenance: "Installed 1580 by master Derbyshire glazier Thomas Wood."
          },
          {
            id: "hotspot-haddon-2",
            x: 65,
            y: 55,
            title: "The 1600 Oak Refectory Table",
            category: "OBJECT",
            description: "Carved from a single continuous trunk of English bog oak grown in Sherwood Forest; seats twenty diners.",
            provenance: "Acquired by the 1st Earl of Rutland; documented in the 1623 post-mortem inventory."
          },
          {
            id: "hotspot-haddon-3",
            x: 82,
            y: 35,
            title: "Flemish Mortlake Tapestries",
            category: "ARTWORK",
            description: "A set of five wool-and-silk tapestries depicting the Months of the Year woven after designs by Raphael.",
            provenance: "Woven in the Mortlake Tapestry Works, London, circa 1635."
          }
        ],
        narrative: [
          {
            heading: "The Romance of Dorothy Vernon",
            text: "Legend holds that in 1563, Dorothy Vernon slipped away from a ball in this very gallery, ran down the stone steps into the moonlit gardens, and eloped on horseback with Sir John Manners, uniting two of England’s greatest dynastic houses.",
            pullQuote: "“To walk the Long Gallery of Haddon is to hear the rustle of Elizabethan velvet across floorboards that have never known mechanical nails.” — Nikolaus Pevsner"
          }
        ],
        relatedStoryIds: ["table-chatsworth-ducal-feast", "portrait-duke-of-richmond", "timeline-versailles-hall-of-mirrors-1684"]
      },
      {
        id: "room-durbar-hall-fateh-prakash",
        worldId: "room",
        worldTitle: "THE ROOM",
        worldNumber: "09",
        title: "The Durbar Hall of Fateh Prakash Palace",
        subtitle: "Seven Osler crystal chandeliers, 76 generations of Mewar portraits, and the sovereign throne of Udaipur.",
        period: "1909 to Living Heritage",
        location: "City Palace Complex, Udaipur, Rajasthan",
        heroImage: "/images/private-world/09-room/fateh-prakash-durbar-hall-01.jpg",
        secondaryImage: "/images/private-world/09-room/fateh-prakash-durbar-hall-02.jpg",
        galleryImages: ["/images/private-world/09-room/fateh-prakash-durbar-hall-01.jpg", "/images/private-world/09-room/fateh-prakash-durbar-hall-02.jpg", "/images/private-world/09-room/fateh-prakash-durbar-hall-03.jpg", "/images/private-world/09-room/fateh-prakash-durbar-hall-04.jpg"],
        accessionId: "RG ROOM — 0002",
        collection: "The Maharana of Mewar Charitable Foundation",
        provenanceSource: "City Palace Construction Ledgers of Maharana Fateh Singh (1909)",
        intro: "Inaugurated in 1909 by Lord Minto, Viceroy of India, the Durbar Hall (Sabha Niwas) of Fateh Prakash Palace is one of the grandest ceremonial rooms in Asia. Supported by monolithic red sandstone pillars, its walls are hung with life-sized oil portraits of the 76 rulers of the world's oldest surviving royal dynasty.",
        hotspots: [
          {
            id: "hotspot-fateh-1",
            x: 50,
            y: 22,
            title: "The Central F. & C. Osler Crystal Chandelier",
            category: "OBJECT",
            description: "Commissioned from F. & C. Osler of Birmingham; weighs nearly two tons and incorporates 1,200 cut-crystal pendants.",
            provenance: "Shipped by sea from England to Bombay, then carried by bullock carts to Udaipur in 1887."
          },
          {
            id: "hotspot-fateh-2",
            x: 50,
            y: 72,
            title: "The Gaddi (Mewar Sovereign Throne)",
            category: "PROVENANCE",
            description: "Cushioned in imperial crimson velvet, surmounted by the golden Sun of Mewar (Surya), the ancestral emblem of the House of Mewar.",
            provenance: "Sacred ceremonial seat occupied exclusively during royal coronation durbars."
          },
          {
            id: "hotspot-fateh-3",
            x: 22,
            y: 48,
            title: "Portrait of Maharana Pratap",
            category: "ARTWORK",
            description: "Equestrian oil painting showing the legendary warrior-king with his beloved horse Chetak at the Battle of Haldighati (1576).",
            provenance: "Commissioned by Maharana Fateh Singh in 1895 from court painter Raja Ravi Varma."
          }
        ],
        narrative: [
          {
            heading: "The Acoustics of Royalty",
            text: "The chamber was engineered without steel girders; the massive coffered ceiling acts as a natural acoustic amplifier, allowing the Maharana's quiet spoken words to be heard clearly by 300 assembled thikanedars without raised voices.",
            pullQuote: "“In this hall, power does not shout; it reflects from crystal and speaks through 1,400 years of unbroken lineage.” — Maharana Arvind Singh Mewar"
          }
        ],
        relatedStoryIds: ["palace-one-night-at-devshree", "vault-patiala-necklace", "timeline-delhi-durbar-cartier-1911"]
      },
      {
        id: "room-queen-library-chatsworth",
        worldId: "room",
        worldTitle: "THE ROOM",
        worldNumber: "09",
        title: "The Great Library of Chatsworth House",
        subtitle: "17,000 leather volumes, ceiling frescoes by Louis Laguerre, and the 6th Duke of Devonshire’s private folio tables.",
        period: "1830s · Regency Era",
        location: "Chatsworth House, Derbyshire, England",
        heroImage: "/images/private-world/09-room/chatsworth-great-library-01.jpg",
        secondaryImage: "/images/private-world/09-room/chatsworth-great-library-02.jpg",
        galleryImages: ["/images/private-world/09-room/chatsworth-great-library-01.jpg", "/images/private-world/09-room/chatsworth-great-library-02.jpg", "/images/private-world/09-room/chatsworth-great-library-03.jpg", "/images/private-world/09-room/chatsworth-great-library-04.jpg"],
        accessionId: "RG ROOM — 0003",
        collection: "The Devonshire Collection, Chatsworth",
        provenanceSource: "Chatsworth Library Catalogues & Architect Sir Jeffry Wyatville Plans",
        intro: "Transformed in the 1830s by architect Sir Jeffry Wyatville from the earlier Long Gallery, the Great Library at Chatsworth is widely considered the most atmospheric private library in Britain, housing over 17,000 volumes collected across five centuries.",
        hotspots: [
          {
            id: "hotspot-chat-1",
            x: 50,
            y: 18,
            title: "Laguerre Ceiling Murals",
            category: "ARTWORK",
            description: "Depicting Apollo and the Nine Muses, commissioned originally in the 1690s by the 1st Duke and preserved into the Regency scheme.",
            provenance: "Painted by French baroque artist Louis Laguerre."
          },
          {
            id: "hotspot-chat-2",
            x: 32,
            y: 62,
            title: "The Secret Bookcase Door",
            category: "ARCHITECTURE",
            description: "A concealed door with faux leather spine book titles composed by humorist Thomas Hood, including 'Cursory Remarks on Swearing'.",
            provenance: "Installed 1832 for the 6th Duke of Devonshire."
          },
          {
            id: "hotspot-chat-3",
            x: 75,
            y: 52,
            title: "Shakespeare First Folio Display Case",
            category: "ARCHIVE",
            description: "The 1623 First Folio of Shakespeare's plays, acquired by the family in the 18th century.",
            provenance: "Acquired from the Duke of Roxburghe sale in 1812."
          }
        ],
        narrative: [
          {
            heading: "The Sanctuary of the Bachelor Duke",
            text: "The 6th Duke spent his winter evenings in this room in a green velvet armchair beside the marble fireplace, surrounded by his illuminated Flemish manuscripts and Renaissance botanical treatises.",
            pullQuote: "“A great library is the only place on earth where the dead speak continuously without interruption.” — 6th Duke of Devonshire"
          }
        ],
        relatedStoryIds: ["table-chatsworth-ducal-feast", "book-chronicles-palace-architecture", "portrait-duke-of-richmond"]
      },
      {
        id: "room-drawing-room-villa-ephrussi",
        worldId: "room",
        worldTitle: "THE ROOM",
        worldNumber: "09",
        title: "The Grand Salon of Villa Ephrussi de Rothschild",
        subtitle: "Marie Antoinette’s card table, Gobelins tapestries, and Cap Ferrat Mediterranean daylight.",
        period: "Belle Époque · 1912",
        location: "Saint-Jean-Cap-Ferrat, French Riviera, France",
        heroImage: "/images/private-world/09-room/villa-ephrussi-grand-salon-01.jpg",
        secondaryImage: "/images/private-world/09-room/villa-ephrussi-grand-salon-02.jpg",
        galleryImages: ["/images/private-world/09-room/villa-ephrussi-grand-salon-01.jpg", "/images/private-world/09-room/villa-ephrussi-grand-salon-02.jpg", "/images/private-world/09-room/villa-ephrussi-grand-salon-03.jpg", "/images/private-world/09-room/villa-ephrussi-grand-salon-04.jpg"],
        accessionId: "RG ROOM — 0004",
        collection: "Académie des Beaux-Arts, Institut de France",
        provenanceSource: "Béatrice de Rothschild Estate Registers 1934",
        intro: "Perched atop the narrow isthmus of Cap Ferrat, Baroness Béatrice de Rothschild built her pink palatial villa between 1905 and 1912. The Grand Salon was conceived as a light-filled conservatory combining 18th-century French royal furniture with sea views on both sides.",
        hotspots: [
          {
            id: "hotspot-eph-1",
            x: 52,
            y: 65,
            title: "Marie Antoinette’s Gaming Table",
            category: "OBJECT",
            description: "Crafted in amaranth and tulipwood marquetry with gilt-bronze mounts by royal cabinetmaker Jean-Henri Riesener.",
            provenance: "Delivered to Versailles for the Queen in 1782; purchased by the Baroness at auction in 1908."
          },
          {
            id: "hotspot-eph-2",
            x: 25,
            y: 40,
            title: "Gobelins Chinoiserie Tapestry",
            category: "ARTWORK",
            description: "Woven in the Royal Gobelins Manufactory after cartoons by François Boucher depicting Chinese mythological astronomers.",
            provenance: "Commissioned for the Château de Bellevue by Madame de Pompadour."
          },
          {
            id: "hotspot-eph-3",
            x: 78,
            y: 35,
            title: "Sèvres Porcelain Chandelier",
            category: "OBJECT",
            description: "Eighteen-branch soft-paste porcelain chandelier adorned with hand-modelled porcelain roses and carnations.",
            provenance: "Manufacture nationale de Sèvres, circa 1765."
          }
        ],
        narrative: [
          {
            heading: "The Perfectionism of Béatrice",
            text: "Baroness Béatrice reviewed architectural designs by rejecting twenty of France’s most celebrated architects until she found one willing to fulfill her vision of a ship gliding through the Mediterranean, flanked by nine themed gardens.",
            pullQuote: "“I want to stand in my drawing room and see the sunrise over Monaco and the sunset over Villefranche without moving a chair.” — Baroness Béatrice de Rothschild"
          }
        ],
        relatedStoryIds: ["timeline-versailles-hall-of-mirrors-1684", "object-empress-eugenie-brooch", "automobile-rolls-royce-phantom-of-love"]
      }
    ]
  },

  // ════════════════════════════════════════════════
  // 10 — HIDDEN HERITAGE MAPS
  // ════════════════════════════════════════════════
  {
    id: "maps",
    number: "10",
    title: "HIDDEN HERITAGE MAPS",
    frenchTitle: "Les Cartes du Patrimoine Caché",
    tagline: "Archival Cartography · Vanished Boundaries · Imperial Travel Routes",
    description: "Historical maps used as narrative devices: vanished dak bungalow post routes, princely state railway corridors, Savoy hunting domains, and Rhine strongholds.",
    accentHero: "/images/private-world/10-maps/dak-bungalow-1857-01.jpg",
    stories: [
      {
        id: "maps-1857-dak-bungalow-route",
        worldId: "maps",
        worldTitle: "HIDDEN HERITAGE MAPS",
        worldNumber: "10",
        title: "The 1857 Dak Bungalow & Post Roads of Central India",
        subtitle: "Tracking the lost staging posts, horse relays, and cantonment roads across the Vindhya escarpment.",
        period: "19th Century · 1857",
        location: "Central India Agency & The Grand Deccan Road",
        heroImage: "/images/private-world/10-maps/dak-bungalow-1857-01.jpg",
        secondaryImage: "/images/private-world/10-maps/dak-bungalow-1857-02.jpg",
        galleryImages: ["/images/private-world/10-maps/dak-bungalow-1857-01.jpg", "/images/private-world/10-maps/dak-bungalow-1857-02.jpg", "/images/private-world/10-maps/dak-bungalow-1857-03.jpg", "/images/private-world/10-maps/dak-bungalow-1857-04.jpg"],
        accessionId: "RG MAPS — 0001",
        collection: "National Archives of India & Survey of India Historical Map Repository",
        provenanceSource: "Surveyor General of India Sheet No. 48-C (Engraved 1858)",
        intro: "Before the railway web conquered the subcontinent, travel through the interiors was dictated by the 'Dak'—a network of staging posts, palanquin bearers, and government rest houses (dak bungalows) spaced exactly fifteen miles apart, the distance a horse or bearer team could travel before exhaustion.",
        mapData: {
          route: "The Grand Deccan Post Route (Agra to Bombay via Gwalior, Shivpuri & Indore)",
          origin: "Agra Cantonment Post Office",
          terminus: "Bombay Fort Mail Wharf",
          cartographer: "Lt. Col. Alexander Scott, Survey of India, Dehradun",
          year: "1858",
          points: [
            { name: "Dholpur Staging Post", note: "Chambal river crossing via flat-bottomed timber ferry." },
            { name: "Gwalior Lashkar Rest House", note: "Under the sovereignty of Scindia; camel-messenger exchange point." },
            { name: "Shivpuri Forest Bungalow", note: "Dense teak forest infested with dacoits; armed escort required." },
            { name: "Indore Residency Staging", note: "Holkar postal registry where mail was stamped with copper talismans." }
          ]
        },
        narrative: [
          {
            heading: "The Architecture of the 15-Mile Relay",
            text: "Each dak bungalow was built to an identical, austere blueprint: deep shaded verandas, high whitewashed ceilings with canvas punkahs pulled by rope, two bedrooms with rope charpoys, and a kitchen where the resident khansama was famed for producing 'country chicken roast' within thirty minutes of a traveller's horse bells sounding in the night.",
            pullQuote: "“To arrive at a dak bungalow at midnight in a monsoon thunderstorm is to experience the true frontier majesty of India.” — Rudyard Kipling, Plain Tales from the Hills"
          },
          {
            heading: "Cartographic Intelligence",
            text: "The 1858 map, engraved in copper plate and hand-tinted in watercolour, marks each well, waterhole, and fort ruin, providing historians with invaluable data on vanished pre-industrial travel times across the subcontinent."
          }
        ],
        relatedStoryIds: ["palace-one-night-at-ahilya-fort", "timeline-amber-purandar-1665", "palace-one-night-at-devshree"]
      },
      {
        id: "maps-1903-durbar-railway-network",
        worldId: "maps",
        worldTitle: "HIDDEN HERITAGE MAPS",
        worldNumber: "10",
        title: "The 1903 Grand Trunk Railway Royal Saloon Corridors",
        subtitle: "How the private luxury trains of sixty maharajas converged upon Delhi for the Coronation Durbar.",
        period: "Belle Époque · 1903",
        location: "Delhi Junction, Bombay, Calcutta & Rajputana",
        heroImage: "/images/private-world/10-maps/durbar-railway-1903-01.jpg",
        secondaryImage: "/images/private-world/10-maps/durbar-railway-1903-02.jpg",
        galleryImages: ["/images/private-world/10-maps/durbar-railway-1903-01.jpg", "/images/private-world/10-maps/durbar-railway-1903-02.jpg", "/images/private-world/10-maps/durbar-railway-1903-03.jpg", "/images/private-world/10-maps/durbar-railway-1903-04.jpg"],
        accessionId: "RG MAPS — 0002",
        collection: "National Rail Museum Archives, New Delhi",
        provenanceSource: "Indian Railway Conference Association Special Traffic Working Plan (1903)",
        intro: "In December 1902, the most complex railway operation in imperial history took place. Over 1,200 special trains carrying ruling princes, their armed bodyguards, private brass bands, and elephants converged on a purpose-built temporary railway station in north Delhi with eight platforms.",
        mapData: {
          route: "The Imperial Durbar Convergence Network",
          origin: "Princely Capitals across India",
          terminus: "Coronation Park Rail Siding, Delhi",
          cartographer: "East Indian Railway Chief Engineer's Office",
          year: "1903",
          points: [
            { name: "Kalka Siding", note: "Hill train connection from the Viceroy's summer capital of Simla." },
            { name: "Jaipur Junction Siding", note: "Bespoke narrow-gauge saloons fitted with velvet armchairs and silver punkahs." },
            { name: "Gwalior Narrow Gauge Junction", note: "Maharaja Madhavrao Scindia's private silver electric train testing line." },
            { name: "Kingsway Camp Station", note: "Eight parallel platforms lit by arc lamps for royal baggage unloading." }
          ]
        },
        narrative: [
          {
            heading: "Palaces on Iron Rails",
            text: "The royal saloons were mansions on wheels. The Maharaja of Baroda’s carriage contained a bath carved from a block of Italian Carrara marble, while the Nizam of Hyderabad travelled in a broad-gauge saloon paneled in rosewood with bulletproof steel shutters.",
            pullQuote: "“At night, the sidings of Kingsway Station looked like a miniature glittering city of gold and teak carriages.” — The Pioneer Mail, January 1903"
          }
        ],
        relatedStoryIds: ["timeline-delhi-durbar-cartier-1911", "vault-patiala-necklace", "automobile-brooke-swan-car-1910"]
      },
      {
        id: "maps-savoy-hunting-estates",
        worldId: "maps",
        worldTitle: "HIDDEN HERITAGE MAPS",
        worldNumber: "10",
        title: "The Vanished Hunting Estates of the House of Savoy (1861–1900)",
        subtitle: "Alpine royal reserves, gran paradiso ibex sanctuaries, and Piedmontese topography.",
        period: "19th Century · 1861–1900",
        location: "Gran Paradiso, Aosta Valley & Piedmont, Italy",
        heroImage: "/images/private-world/10-maps/savoy-hunting-estates-01.png",
        secondaryImage: "/images/private-world/10-maps/savoy-hunting-estates-02.png",
        galleryImages: ["/images/private-world/10-maps/savoy-hunting-estates-01.png", "/images/private-world/10-maps/savoy-hunting-estates-02.png", "/images/private-world/10-maps/savoy-hunting-estates-03.jpg", "/images/private-world/10-maps/savoy-hunting-estates-04.png"],
        accessionId: "RG MAPS — 0003",
        collection: "Archivio Storico della Casa Savoia, Turin",
        provenanceSource: "Reale Corpo delle Guardaboschi di Sua Maestà Vittorio Emanuele II",
        intro: "In 1856, King Victor Emmanuel II declared the mountains of Gran Paradiso a Royal Hunting Reserve. By doing so, he paradoxically saved the Alpine ibex from global extinction. This archival survey traces the stone mule tracks, royal hunting lodges, and high-altitude shelters established by the King.",
        mapData: {
          route: "The Gran Paradiso Royal Hunting Circuit",
          origin: "Castello di Sarre, Aosta",
          terminus: "Col del Nivolet High Pass (2,612 m)",
          cartographer: "Istituto Geografico Militare, Firenze",
          year: "1874",
          points: [
            { name: "Castello di Sarre", note: "Royal basecamp decorated with 500 ibex horns in geometric friezes." },
            { name: "Dondenaz Lodge", note: "Alpine stone lodge with heated tile stoves for royal hunting parties." },
            { name: "Gran Piano di Noasca", note: "Observation plateau where royal wardens recorded game populations." }
          ]
        },
        narrative: [
          {
            heading: "The King’s Mountain Roads",
            text: "Over twenty years, military engineers laid 300 kilometres of paved mule tracks engineered with dry-stone retaining walls that still stand intact today. The King travelled on horseback along five-foot-wide paths with sheer 1,000-metre drops, sleeping on straw mattresses in high mountain huts.",
            pullQuote: "“In the mountains, the King threw off the suffocating etiquette of Turin; he was simply a hunter among mountain guides.” — Count Luigi Cibrario"
          }
        ],
        relatedStoryIds: ["table-savoy-piedmont-court", "automobile-alfa-romeo-8c-berlinetta", "palace-one-night-at-villa-d-este"]
      },
      {
        id: "maps-rhine-strongholds-1820",
        worldId: "maps",
        worldTitle: "HIDDEN HERITAGE MAPS",
        worldNumber: "10",
        title: "The Rhine Castle Cadastral Cartography of 1820",
        subtitle: "Romantic-era cadastral maps of aristocratic strongholds between Koblenz and Bingen.",
        period: "19th Century · 1820",
        location: "Upper Middle Rhine Valley, Germany",
        heroImage: "/images/private-world/10-maps/rhine-strongholds-1820-01.jpg",
        secondaryImage: "/images/private-world/10-maps/rhine-strongholds-1820-02.jpg",
        galleryImages: ["/images/private-world/10-maps/rhine-strongholds-1820-01.jpg", "/images/private-world/10-maps/rhine-strongholds-1820-02.jpg", "/images/private-world/10-maps/rhine-strongholds-1820-03.jpg", "/images/private-world/10-maps/rhine-strongholds-1820-04.jpg"],
        accessionId: "RG MAPS — 0004",
        collection: "Prussian State Archives & Romantic Rhine Heritage Foundation",
        provenanceSource: "Prussian Royal Cadastral Survey Sheets (1820–1824)",
        intro: "Following the Congress of Vienna in 1815, the Upper Middle Rhine Valley came under Prussian sovereignty. Crown Prince Frederick William (later King Frederick William IV) commissioned comprehensive cadastral maps of every ruined medieval fortress, initiating the Rhine Romanticism movement.",
        mapData: {
          route: "The Romantic Rhine Gorge Route",
          origin: "Electoral Palace, Koblenz",
          terminus: "Klopp Castle, Bingen am Rhein",
          cartographer: "Royal Prussian Topographical Bureau, Berlin",
          year: "1820",
          points: [
            { name: "Stolzenfels Ruins", note: "Rebuilt by Schinkel into a summer palace for Queen Elisabeth." },
            { name: "Marksburg", note: "The only hill castle on the Middle Rhine never destroyed." },
            { name: "Rheinfels Fortress", note: "Colossal bastion ruins measuring half a mile across the river cliffs." },
            { name: "Pfalzgrafenstein", note: "Toll fortress built directly on a rock island in the middle of the river." }
          ]
        },
        narrative: [
          {
            heading: "From Medieval Ruin to Royal Sanctuary",
            text: "The Prussian survey was the first time medieval ruin topography was treated not as military rubble, but as national heritage. The maps documented vineyard microclimates, medieval water rights, and subterranean castle passages.",
            pullQuote: "“The Rhine is a river that flows through history; every bend reveals a legend carved in basalt.” — Lord Byron, Childe Harold’s Pilgrimage"
          }
        ],
        relatedStoryIds: ["room-haddon-hall", "table-chatsworth-ducal-feast", "timeline-versailles-hall-of-mirrors-1684"]
      }
    ]
  }
];

export function getStoryById(id: string): PrivateStory | undefined {
  for (const world of PRIVATE_WORLDS) {
    const found = world.stories.find((s) => s.id === id);
    if (found) return found;
  }
  return undefined;
}

export function getAllStories(): PrivateStory[] {
  return PRIVATE_WORLDS.flatMap((w) => w.stories);
}
