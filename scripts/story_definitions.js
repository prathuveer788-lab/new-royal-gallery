const path = require('path');
const fs = require('fs');
const { searchCommons, downloadFile } = require('./acquire_media_engine');

const ALL_STORIES = [
  // ── 01 TIMELINE ──
  {
    id: "timeline-amber-purandar-1665",
    worldDir: "01-timeline",
    prefix: "purandar-amber",
    queries: [
      "Purandar Fort entrance",
      "Purandar Fort",
      "Mirza Raja Jai Singh Marwar",
      "Mirza Raja Jai Singh",
      "Amber Fort Ganesh Pol"
    ]
  },
  {
    id: "timeline-versailles-hall-of-mirrors-1684",
    worldDir: "01-timeline",
    prefix: "versailles-hall-of-mirrors",
    queries: [
      "Chateau Versailles Galerie des Glaces",
      "Hall of Mirrors Versailles",
      "Ceiling Hall of Mirrors Versailles",
      "Louis XIV Rigaud",
      "Versailles garden fountain"
    ]
  },
  {
    id: "timeline-delhi-durbar-cartier-1911",
    worldDir: "01-timeline",
    prefix: "delhi-durbar-1911",
    queries: [
      "Delhi Durbar 1911",
      "King George V Delhi Durbar",
      "Coronation Park Delhi 1911",
      "Delhi Durbar pavilion",
      "Jacques Cartier India"
    ]
  },
  {
    id: "timeline-romanov-winter-ball-1903",
    worldDir: "01-timeline",
    prefix: "romanov-ball-1903",
    queries: [
      "Alexandra Fjodorowna and Nicholas II of Russia in Russian dress",
      "1903 ball in the Winter Palace",
      "Grand Duchess Maria Pavlovna 1903 ball",
      "1903 ball - Maria Georg",
      "Winter Palace Nicholas II"
    ]
  },

  // ── 02 VAULT ──
  {
    id: "vault-patiala-necklace",
    worldDir: "02-vault",
    prefix: "patiala-necklace",
    queries: [
      "Joyaux dynastiques collier maharajah de patiala",
      "Yadavindra Singh of Patiala",
      "Bhupinder Singh of Patiala",
      "Cartier jewellery design",
      "Patiala diamond necklace"
    ]
  },
  {
    id: "vault-balmoral-menu-1897",
    worldDir: "02-vault",
    prefix: "balmoral-menu-1897",
    queries: [
      "Queen Victoria Balmoral",
      "Queen Victoria Diamond Jubilee",
      "Balmoral Castle Victorian",
      "Royal banquet menu Victorian",
      "Queen Victoria dining"
    ]
  },
  {
    id: "vault-duke-of-windsor-charvet-1936",
    worldDir: "02-vault",
    prefix: "duke-of-windsor-charvet",
    queries: [
      "Duke of Windsor portrait",
      "Edward VIII 1936",
      "Edward VIII Prince of Wales",
      "Charvet Place Vendome",
      "Savile Row tailoring vintage"
    ]
  },
  {
    id: "vault-st-petersburg-porcelain-1792",
    worldDir: "02-vault",
    prefix: "st-petersburg-porcelain-1792",
    queries: [
      "Imperial Porcelain Factory Catherine",
      "Hermitage Museum porcelain",
      "Arabesque Service porcelain",
      "Russian imperial porcelain",
      "Winter Palace porcelain"
    ]
  },

  // ── 03 TABLE ──
  {
    id: "table-buckingham-state-banquet",
    worldDir: "03-table",
    prefix: "buckingham-state-banquet",
    queries: [
      "Buckingham Palace State Banquet",
      "Buckingham Palace Ballroom",
      "Grand Service silver-gilt",
      "State banquet table setting",
      "St George's Hall Windsor banquet"
    ]
  },
  {
    id: "table-romanov-catherine-palace",
    worldDir: "03-table",
    prefix: "romanov-catherine-palace",
    queries: [
      "Catherine Palace Great Hall Tsarskoye Selo",
      "Catherine Palace Tsarskoye Selo",
      "Gilded Enfilade Catherine Palace",
      "Tsarskoye Selo banquet",
      "Russian Imperial dining table"
    ]
  },
  {
    id: "table-chatsworth-ducal-feast",
    worldDir: "03-table",
    prefix: "chatsworth-ducal-feast",
    queries: [
      "The Great Dining Room Chatsworth",
      "Chatsworth House Great Chamber",
      "Chatsworth House silver",
      "Chatsworth House interior",
      "Duke of Devonshire banquet"
    ]
  },
  {
    id: "table-savoy-piedmont-court",
    worldDir: "03-table",
    prefix: "savoy-piedmont-court",
    queries: [
      "Sala da pranzo Palazzo reale Torino",
      "Palazzo Reale Torino interior",
      "Galleria Daniel Palazzo Reale Torino",
      "Royal Palace of Turin dining",
      "Savoy royal silverware"
    ]
  },

  // ── 04 OBJECT ──
  {
    id: "object-vladimir-tiara",
    worldDir: "04-object",
    prefix: "vladimir-tiara",
    queries: [
      "Maria Pavlovna of Russia tiara",
      "Queen Mary Wellcome Vladimir Tiara",
      "HM Queen Elizabeth II",
      "Queen Elizabeth II official portrait for 1959 tour",
      "Grande-duchesse Wladimir"
    ]
  },
  {
    id: "object-portland-tiara",
    worldDir: "04-object",
    prefix: "portland-tiara",
    queries: [
      "Winifred Anna Cavendish-Bentinck Duchess of Portland",
      "Duchess of Portland 1912 Laszlo",
      "Duke and Duchess of Portland",
      "Cartier tiara 1902",
      "Edwardian diamond tiara"
    ]
  },
  {
    id: "object-empress-eugenie-brooch",
    worldDir: "04-object",
    prefix: "empress-eugenie-brooch",
    queries: [
      "Empress Eugenie Winterhalter",
      "Empress Eugenie diamond",
      "French Crown Jewels Louvre",
      "Louvre crown jewels bow brooch",
      "Empress Eugenie portrait"
    ]
  },
  {
    id: "object-alwar-cartier-chronometer",
    worldDir: "04-object",
    prefix: "alwar-cartier-chronometer",
    queries: [
      "Mystery clock Cartier Pierre Gravoin",
      "Mystery clock Cartier",
      "Cartier Art Deco clock",
      "Cartier pocket watch vintage",
      "Jai Singh Prabhakar of Alwar"
    ]
  },

  // ── 05 AUTOMOBILE ──
  {
    id: "automobile-rolls-royce-phantom-of-love",
    worldDir: "05-automobile",
    prefix: "rolls-royce-phantom-of-love",
    queries: [
      "1926 Rolls-Royce Phantom",
      "Rolls-Royce Phantom I",
      "Rolls-Royce Phantom 1920s",
      "Vintage Rolls-Royce Charles Clark",
      "Rolls-Royce Spirit of Ecstasy vintage"
    ]
  },
  {
    id: "automobile-bugatti-type-57s-atalante",
    worldDir: "05-automobile",
    prefix: "bugatti-type-57s-atalante",
    queries: [
      "Bugatti Type 57 Atalante 1937",
      "Bugatti Type 57 front",
      "Bugatti Type 57 rear",
      "Bugatti Type 57 Atalante",
      "Bugatti Type 57 engine"
    ]
  },
  {
    id: "automobile-alfa-romeo-8c-2900b",
    worldDir: "05-automobile",
    prefix: "alfa-romeo-8c-2900b",
    queries: [
      "Alfa Romeo 8C 2900B Touring Berlinetta",
      "Alfa Romeo 8C 2900B at Villa d'Este",
      "Alfa Romeo 8C 2900B Touring Spider",
      "Alfa Romeo 8C engine",
      "Alfa Romeo 8C vintage"
    ]
  },
  {
    id: "automobile-brooke-swan-car-1910",
    worldDir: "05-automobile",
    prefix: "brooke-swan-car-1910",
    queries: [
      "1910 Brooke Swan Car",
      "Brooke Swan Car Louwman",
      "Louwman museum 364",
      "1910 Brooke Swan Car detail",
      "Swan Car Calcutta"
    ]
  },

  // ── 06 PALACE ──
  {
    id: "palace-one-night-at-devshree",
    worldDir: "06-palace",
    prefix: "devshree-deogarh",
    queries: [
      "Deogarh Rajasthan palace",
      "Deogarh heritage courtyard",
      "Rajasthan haveli courtyard",
      "Lake Ragho Sagar Deogarh",
      "Mewar courtyard haveli"
    ]
  },
  {
    id: "palace-one-night-at-the-balmoral",
    worldDir: "06-palace",
    prefix: "the-balmoral-edinburgh",
    queries: [
      "Balmoral Hotel Edinburgh",
      "The Balmoral Hotel Edinburgh geograph",
      "Princes Street Balmoral Hotel",
      "Balmoral Hotel clock tower Edinburgh",
      "Edinburgh Castle from Princes Street"
    ]
  },
  {
    id: "palace-one-night-at-villa-d-este",
    worldDir: "06-palace",
    prefix: "villa-d-este-como",
    queries: [
      "Villa d'Este Cernobbio",
      "Villa d Este Lake Como",
      "Lake Como Cernobbio villa",
      "Villa d'Este garden nymphaeum",
      "Villa d'Este Como terrace"
    ]
  },
  {
    id: "palace-one-night-at-ahilya-fort",
    worldDir: "06-palace",
    prefix: "ahilya-fort-maheshwar",
    queries: [
      "Maheshwar Fort Jharokha 01",
      "Maheshwar Fort Sculpture",
      "River Narmada from Maheshwar Fort",
      "Maheshwar Fort Narmada River",
      "Ahilya Fort Maheshwar ghats"
    ]
  },

  // ── 07 BOOK ──
  {
    id: "book-chronicles-palace-architecture",
    worldDir: "07-book",
    prefix: "chronicles-palace-architecture",
    queries: [
      "Indian palace architecture drawing",
      "Jali lattice Rajasthan architecture",
      "Chhatri pavilion architecture Rajasthan",
      "Mehrangarh Fort architecture elevation",
      "Jaipur City Palace architectural elevation"
    ]
  },
  {
    id: "book-imperial-cartier-archive",
    worldDir: "07-book",
    prefix: "imperial-cartier-archive",
    queries: [
      "Cartier Rue de la Paix historic",
      "Cartier jewellery rendering gouache",
      "Cartier archive drawing",
      "Cartier royal warrant vintage",
      "Cartier tiara historic gouache"
    ]
  },
  {
    id: "book-great-dining-rooms-europe",
    worldDir: "07-book",
    prefix: "great-dining-rooms-europe",
    queries: [
      "Grand Couvert Versailles banquet",
      "Schonbrunn Palace Great Gallery banquet",
      "St George Hall Windsor banquet",
      "Palazzo Pitti banqueting hall",
      "Banqueting House Whitehall ceiling"
    ]
  },
  {
    id: "book-coachbuilt-aristocracy",
    worldDir: "07-book",
    prefix: "coachbuilt-aristocracy",
    queries: [
      "Hooper coachbuilder vintage",
      "Barker coachwork vintage",
      "Saoutchik vintage coachwork",
      "Figoni Falaschi vintage coachwork",
      "Coachbuilt classic car dashboard"
    ]
  },

  // ── 08 PORTRAIT ──
  {
    id: "portrait-shatrunjai-singh-devshree",
    worldDir: "08-portrait",
    prefix: "shatrunjai-devshree",
    queries: [
      "Rawat of Deogarh portrait",
      "Mewar nobleman portrait",
      "Deogarh miniature painting portrait",
      "Rajasthan royal portrait historic",
      "Devshree hospitality courtyard"
    ]
  },
  {
    id: "portrait-duke-of-richmond",
    worldDir: "08-portrait",
    prefix: "duke-of-richmond-goodwood",
    queries: [
      "9th Duke of Richmond Allan Warren",
      "Duke of Richmond Goodwood",
      "Goodwood House Sussex",
      "Goodwood Revival historic",
      "Charles Gordon-Lennox Duke of Richmond"
    ]
  },
  {
    id: "portrait-princess-esra-jah",
    worldDir: "08-portrait",
    prefix: "princess-esra-hyderabad",
    queries: [
      "Chowmahalla Palace Hyderabad",
      "Taj Falaknuma Palace Hyderabad",
      "Falaknuma Palace interior",
      "Nizam of Hyderabad palace durbar",
      "Hyderabad royal court historic"
    ]
  },
  {
    id: "portrait-count-hubert-d-ornano",
    worldDir: "08-portrait",
    prefix: "count-hubert-d-ornano",
    queries: [
      "Château de la Loire French estate",
      "French nobleman portrait 19th",
      "Count d'Ornano portrait",
      "Loire Valley chateau garden",
      "French château salon historic"
    ]
  },

  // ── 09 ROOM ──
  {
    id: "room-haddon-hall",
    worldDir: "09-room",
    prefix: "haddon-hall-long-gallery",
    queries: [
      "Long Gallery Haddon Hall DSC02798",
      "The Long Gallery at Haddon Hall geograph",
      "Haddon Hall Long Gallery c.1890",
      "Haddon Hall Long Gallery ceiling decoration",
      "Joseph Nash The Long Gallery Haddon Hall"
    ]
  },
  {
    id: "room-durbar-hall-fateh-prakash",
    worldDir: "09-room",
    prefix: "fateh-prakash-durbar-hall",
    queries: [
      "Durbar Hall Fateh Prakash Palace Hotel Udaipur",
      "City Palace Udaipur Durbar Hall",
      "Fateh Prakash Palace Hotel",
      "Udaipur crystal gallery Durbar Hall",
      "Fateh Prakash Palace interior"
    ]
  },
  {
    id: "room-queen-library-chatsworth",
    worldDir: "09-room",
    prefix: "chatsworth-great-library",
    queries: [
      "Chatsworth House library 11-07-2023",
      "Chatsworth house library interior",
      "Chatsworth House library painted ceiling",
      "Chatsworth book collection",
      "Chatsworth House Great Library"
    ]
  },
  {
    id: "room-drawing-room-villa-ephrussi",
    worldDir: "09-room",
    prefix: "villa-ephrussi-grand-salon",
    queries: [
      "Interior of the Villa Ephrussi de Rothschild DSC04537",
      "Interior of the Villa Ephrussi de Rothschild DSC04540",
      "Interior of the Villa Ephrussi de Rothschild DSC04541",
      "Villa Ephrussi de Rothschild Grand Salon",
      "Villa Ephrussi de Rothschild Cap Ferrat"
    ]
  },

  // ── 10 MAPS ──
  {
    id: "maps-1857-dak-bungalow-route",
    worldDir: "10-maps",
    prefix: "dak-bungalow-1857",
    queries: [
      "Survey of India 19th century map",
      "Map of Central India 1857",
      "1857 map of India routes",
      "Grand Trunk Road vintage map",
      "Imperial Gazetteer of India map"
    ]
  },
  {
    id: "maps-1903-durbar-railway-network",
    worldDir: "10-maps",
    prefix: "durbar-railway-1903",
    queries: [
      "1903 Indian railway map",
      "East Indian Railway vintage map",
      "Imperial Durbar Album map",
      "Railways of India 1900 map",
      "Delhi Durbar 1903 encampment plan"
    ]
  },
  {
    id: "maps-savoy-hunting-estates",
    worldDir: "10-maps",
    prefix: "savoy-hunting-estates",
    queries: [
      "Gran Paradiso Savoy map",
      "Kingdom of Sardinia historical map",
      "House of Savoy Piedmont map",
      "Aosta Valley historical map",
      "Piedmont vintage topographic map"
    ]
  },
  {
    id: "maps-rhine-strongholds-1820",
    worldDir: "10-maps",
    prefix: "rhine-strongholds-1820",
    queries: [
      "Rhine River map 1820",
      "Mittelrhein castles vintage map",
      "Rhine gorge cadastral map",
      "Marksburg Stolzenfels historic map",
      "Rhine castle 19th century map"
    ]
  }
];

module.exports = { ALL_STORIES };
