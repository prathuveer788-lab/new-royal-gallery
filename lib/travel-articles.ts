// ── Travel Article Data ──────────────────────────────
// Each article metadata + content structure
// Photography placeholders marked with [[PHOTO:...]]

export interface TravelArticle {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  category: "Indian Palace Hotels" | "Asia" | "Europe" | "Middle East & Africa" | "Americas & Oceania";
  destination: string;
  country: string;
  headline: string;
  subtitle: string;
  authorName: string;
  authorRole: string;
  readTime: string;
  publishedDate: string;
  heroImage: string;
  heroCaption: string;
  quickFacts: { label: string; value: string }[];
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  itinerary3Day?: ItineraryData;
  itinerary5Day?: ItineraryData;
  itinerary7Day?: ItineraryData;
  hotels: HotelData[];
  budget: BudgetRange;
}

export interface ArticleSection {
  id: string;
  heading: string;
  content: string; // markdown-like, [[PHOTO:orientation|caption]] for placeholders
}

export interface ItineraryDay {
  timeOfDay: string;
  activity: string;
  description: string;
}

export interface ItineraryData {
  title: string;
  days: { label: string; items: ItineraryDay[] }[];
}

export interface HotelData {
  name: string;
  category: string;
  description: string;
  highlights: string[];
  priceRange: string;
}

export interface BudgetRange {
  budget: string;
  midRange: string;
  luxury: string;
  ultraLuxury: string;
}

// ── Helper to create TOC from sections ───────────────
export function getTOC(sections: ArticleSection[]): { id: string; label: string }[] {
  return sections.map((s) => ({ id: s.id, label: s.heading }));
}

// ── All Articles Registry ────────────────────────────
export const allArticles: TravelArticle[] = [
  // ══════════ PART ONE: Indian Royal Heritage Hotels (20) ══════════
  {
    slug: "umaid-bhawan-palace-jodhpur",
    seoTitle: "Umaid Bhawan Palace: The Last Royal Palace of India — Luxury Travel Guide 2026",
    seoDescription: "A complete luxury guide to Umaid Bhawan Palace, Jodhpur — history, suites, dining, experiences, and insider tips for the ultimate royal Rajasthan stay.",
    ogTitle: "Umaid Bhawan Palace: A Royal Legacy in Stone",
    ogDescription: "Where Art Deco meets Rajput grandeur — the definitive guide to India's most magnificent palace hotel.",
    category: "Indian Palace Hotels",
    destination: "Umaid Bhawan Palace",
    country: "India",
    headline: "Umaid Bhawan Palace: Where Art Deco Meets Rajput Grandeur",
    subtitle: "The last of India's great palaces, still home to the Jodhpur royal family — a living monument to ambition, craftsmanship, and the enduring power of heritage",
    authorName: "The Royal Gallery Editorial",
    authorRole: "Luxury Heritage Correspondent",
    readTime: "14 min read",
    publishedDate: "2026-07-15",
    heroImage: "/images/mehrangarh-fort.jpg",
    heroCaption: "Umaid Bhawan Palace at golden hour — the 347-room sandstone masterpiece rises from Chittar Hill, one of the world's largest private residences",
    quickFacts: [
      { label: "Location", value: "Jodhpur, Rajasthan, India" },
      { label: "Built", value: "1928–1943" },
      { label: "Architecture", value: "Indo-Art Deco (Indo-Deco)" },
      { label: "Rooms", value: "347 (70 as hotel suites)" },
      { label: "Best Season", value: "October to March" },
      { label: "Nearest Airport", value: "Jodhpur Airport (JDH), 5 km" },
      { label: "Still Royal Residence", value: "Yes — the Maharaja resides here" },
      { label: "Starting Rate", value: "₹45,000 / $550 per night" },
    ],
    sections: [],
    faqs: [],
    relatedSlugs: ["rambagh-palace-jaipur", "taj-lake-palace-udaipur", "mehrangarh-fort-guide"],
    hotels: [],
    budget: { budget: "₹5,000–15,000", midRange: "₹15,000–40,000", luxury: "₹45,000–2,50,000", ultraLuxury: "₹3,00,000–10,00,000" },
  },
  // ... more articles will be added
];

// This registry will expand to 50 articles
// Each article's full content is loaded separately to keep this file manageable
