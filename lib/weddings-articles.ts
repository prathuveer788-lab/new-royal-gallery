// ── WEDDINGS SECTION — Article Data ───────────────────
// Business-intelligence editorial: the world's largest wedding economy.
import type { EditorialArticle } from "./editorial/types";

export const allWeddingsArticles: EditorialArticle[] = [
  // ═══════════════ ARTICLE 01 ═══════════════
  {
    slug: "luxury-wedding-marketing-india",
    section: "weddings",
    seoTitle: "Luxury Wedding Marketing in India: Reaching the Right Families | The Royal Gallerys",
    seoDescription: "India's wedding economy is the largest in the world, and its luxury segment is booming. This analysis explains how brands, venues and planners can reach the families who make the decisions.",
    ogTitle: "Luxury Wedding Marketing in India: Reaching the Right Families",
    ogDescription: "How brands, venues and planners reach the families who decide India's luxury weddings — and why the decision is never individual.",
    category: "Brand Strategy",
    editorialSubcategory: "wedding-marketing",
    searchIntent: "commercial-investigation",
    keywordMap: {
      primary: ["luxury wedding marketing India", "Indian wedding economy brands"],
      secondary: ["destination wedding marketing India", "wedding venue marketing India"],
      longTail: ["how to reach luxury wedding families India", "who decides Indian luxury weddings"],
      commercial: ["wedding brand strategy India", "destination wedding venue partnership India"],
      semantic: ["bridal couture", "destination wedding", "palace venue", "family decision", "multi-day celebration", "ritual"],
    },
    tags: ["weddings", "marketing", "brand-strategy", "luxury", "india", "destination-weddings"],
    headline: "Luxury Wedding Marketing in India: Reaching the Right Families",
    subtitle: "The Indian wedding is the single largest luxury purchase most families will ever make — and it is decided not by an individual but by a family, with the parents often holding final authority. Brands, venues and planners that market to the couple alone are missing the real decision-maker",
    authorName: "The Royal Gallerys Editorial",
    authorRole: "Weddings & Luxury Correspondent",
    readTime: "12 min read",
    publishedDate: "2026-08-04",
    heroImage: "/images/style/article-06/indian-bridal-couture-hero.jpg",
    heroCaption: "Indian bridal couture — the centre of the world's largest wedding economy and its most culturally rich luxury market. Image: Unsplash.",
    sections: [
      {
        id: "the-family-decision",
        heading: "The Family Decision: Why the Couple Is Not the Buyer",
        content: "The single most important fact of the Indian luxury wedding market is that the decision is collective, not individual. The couple — usually the bride and groom — drive the aesthetic and the aspiration. But the parents, who typically fund the event, hold authority over budget, scale and many of the practical choices. The extended family, in turn, shapes expectations around capacity, ritual and guest comfort.\n\nThis has profound marketing implications. A campaign that speaks only to the couple — aspirational imagery, romantic language, aesthetic appeal — wins the heart but not the signature. A campaign that speaks only to the parents — operational reassurance, budget clarity, logistical competence — wins the signature but not the enthusiasm that drives the event's memorable quality.\n\nThe brands and venues that succeed address all three audiences simultaneously. They present aspirational imagery for the couple, operational reassurance for the parents, and capacity and comfort signals for the extended family. Single-narrative marketing, however polished, is structurally incomplete.",
      },
      {
        id: "the-multi-day-economy",
        heading: "The Multi-Day Economy: Beyond the Ceremony",
        content: "An Indian wedding is not a single event but a sequence — five to ten distinct ceremonies spread across multiple days, each with its own rituals, its own wardrobe, its own catering requirements and its own guest dynamics. The sangeet, the mehndi, the haldi, the pheras, the reception — each is a production in its own right.\n\nThis multi-day structure has direct commercial consequences. It multiplies the opportunities for every category of luxury brand: couture for each ceremony, jewellery for each look, hospitality for extended stays, and event production for the ceremonies themselves. A single wedding can engage a wedding couturier, a jewellery house, a venue, a caterer, a florist, a photographer and a production company — each serving the same family across the same event.\n\nThe brands that understand this structure position themselves for participation across the whole event, not a single transaction. The couturier who designs for the mehndi as well as the ceremony captures more value. The venue that can host the full multi-day programme, rather than a single evening, wins the booking.",
      },
      {
        id: "the-palace-and-destination-appeal",
        heading: "The Palace and Destination Appeal",
        content: "The aspirational centre of the Indian luxury wedding market is the palace venue and the destination wedding. Rajasthan's palace hotels, Goa and Kerala's coastal resorts, and increasingly international destinations — Tuscany, the Riviera, the Maldives — represent the pinnacle of the category. For the family, a palace wedding is not merely a location; it is a statement of heritage, scale and standing.\n\nFor venues, the opportunity is specific and valuable. A destination wedding typically occupies 30 to 80 rooms across multiple days, with food and beverage spend per head that frequently exceeds room revenue, and a guest list that is precisely the HNW demographic the venue wants to cultivate. A single well-executed wedding generates more qualified future leads than a year of advertising.\n\nThe properties that win this segment are those that can genuinely host a multi-day, multi-ceremony Indian wedding — palace courtyards and heritage gardens rather than converted ballrooms, culinary teams capable of multi-cuisine programmes, and staff who understand the event as a cultural production rather than a logistical problem.",
      },
      {
        id: "editorial-and-influence",
        heading: "Editorial and Influence: How Families Decide",
        content: "Luxury wedding decisions are researched, not impulsive. The family — and particularly the younger members conducting the research — turn to editorial content, expert guidance and peer recommendation rather than broadcast advertising. Bridal fashion editorials, venue profiles, and destination guides in credible publications shape the consideration set long before any venue visit.\n\nThis is where editorial media provides its distinctive value. A credible publication that profiles a palace venue, documents a couturier's bridal collection, or guides families through the destination-wedding decision reaches the families at the research stage — the moment when preferences are being formed. The brand that appears within that editorial context is encountered as recommendation, not promotion.\n\nTHE ROYAL GALLERYS positions itself precisely here: as an editorial destination for the world of Indian weddings — couture, venues, destinations and the craft that surrounds them.",
      },
      {
        id: "the-royal-gallerys-perspective",
        heading: "The Royal Gallerys Perspective",
        content: "THE ROYAL GALLERYS treats the Indian wedding as what it is: the largest, most culturally rich luxury market in the world. We document its couture, its venues and its destinations, and we explain to the decision-makers who serve it how to reach the families who shape it.\n\nWe believe the brands, venues and planners that will lead this economy are those that understand its family structure, its multi-day scale and its cultural depth. The market rewards seriousness, and the families who decide these weddings reward those who respect what the event means.",
      },
    ],
    pullQuotes: [
      { quote: "The decision is collective, not individual — a campaign that speaks only to the couple wins the heart but not the signature.", context: "On the family decision" },
      { quote: "A single well-executed destination wedding generates more qualified future leads than a year of advertising.", context: "On the venue opportunity" },
    ],
    imageBreaks: [
      { image: "/images/style/article-06/indian-bridal-couture-wedding.jpg", alt: "Indian bridal couture wedding", caption: "The bridal look is the centrepiece of the multi-day celebration — and a distinct opportunity for couture and jewellery brands at each ceremony." },
      { image: "/images/style/article-06/luxury-wedding-bridal.jpg", alt: "Luxury wedding bridal", caption: "Luxury weddings engage multiple categories — couture, jewellery, hospitality and production — across the same family and event." },
    ],
    relatedSlugs: ["palace-venues-destination-wedding-market"],
    keywords: ["luxury wedding India", "Indian wedding economy", "destination wedding marketing", "wedding venue India", "bridal couture", "Indian wedding market"],
  },

  // ═══════════════ ARTICLE 02 ═══════════════
  {
    slug: "palace-venues-destination-wedding-market",
    section: "weddings",
    seoTitle: "Palace Venues and the Destination Wedding Market | The Royal Gallerys",
    seoDescription: "Palace hotels and heritage venues are the aspirational centre of India's destination wedding market. This analysis explains the opportunity and how venues can win the multi-day wedding booking.",
    ogTitle: "Palace Venues and the Destination Wedding Market",
    ogDescription: "How palace hotels and heritage venues can win India's booming destination wedding market — the multi-day, multi-ceremony opportunity.",
    category: "Market Intelligence",
    editorialSubcategory: "destination-weddings",
    searchIntent: "commercial-investigation",
    keywordMap: {
      primary: ["palace wedding venues India", "destination wedding market India"],
      secondary: ["heritage hotel wedding venue", "luxury destination wedding India"],
      longTail: ["how palace hotels win destination wedding bookings", "what makes a palace venue attractive for Indian weddings"],
      commercial: ["wedding venue partnership India", "destination wedding venue marketing India"],
      semantic: ["palace hotel", "heritage venue", "multi-day wedding", "ceremony", "courtyard", "guest capacity"],
    },
    tags: ["weddings", "destination-weddings", "venues", "market-intelligence", "luxury", "palaces"],
    headline: "Palace Venues and the Destination Wedding Market",
    subtitle: "The palace venue is the aspirational heart of India's destination wedding market — a heritage setting that no purpose-built resort can replicate. For the venues that can genuinely host the multi-day celebration, the commercial opportunity is extraordinary",
    authorName: "The Royal Gallerys Editorial",
    authorRole: "Weddings & Luxury Correspondent",
    readTime: "10 min read",
    publishedDate: "2026-08-09",
    heroImage: "/images/style/article-06/indian-bridal-couture-wedding.jpg",
    heroCaption: "The palace wedding — heritage setting, multi-day scale and a guest list that represents the HNW demographic venues most want. Image: Unsplash.",
    sections: [
      {
        id: "the-heritage-moat",
        heading: "The Heritage Moat: Why Palaces Win",
        content: "A palace venue possesses an advantage no competitor can replicate: genuine heritage. A 15th-century fort, a royal residence, a restored haveli — these settings carry a cultural weight that a purpose-built resort cannot manufacture. For a family for whom the wedding is a statement of heritage and standing, the palace is not merely a location but the point of the event itself.\n\nThis converts directly into pricing power. Palace venues command premiums over comparable luxury resorts precisely because their setting cannot be copied. The family is not renting a ballroom; they are purchasing participation in a heritage that predates them.\n\nFor venues, the strategic implication is that heritage should be positioned as the asset it is — a moat that differentiates the venue from every competitor in the market. Venues that downplay their heritage, or that attempt to compete on generic luxury grounds, are surrendering their single greatest advantage.",
      },
      {
        id: "the-multi-day-demand",
        heading: "The Multi-Day Demand: What Venues Must Deliver",
        content: "Winning the palace wedding booking is not a matter of having a beautiful setting alone. The Indian wedding is a multi-day, multi-ceremony production, and the venue must be able to host it in full — the sangeet, the mehndi, the haldi, the ceremony and the reception, each with distinct spatial, catering and ritual requirements.\n\nThis demands genuine event spaces rather than converted ballrooms: palace courtyards and heritage gardens that can be transformed for each ceremony. It demands culinary teams capable of executing multi-cuisine, multi-event programmes — including vegetarian and Jain requirements that are non-negotiable for many families. It demands staff who understand the event as a cultural production to be honoured, not a logistical problem to be solved.\n\nThe venues that can deliver this win not just the booking but the ecosystem around it — the extended stay, the elevated food and beverage spend, and the guest list that becomes the venue's most valuable marketing asset.",
      },
      {
        id: "positioning-and-editorial",
        heading: "Positioning and Editorial: Reaching the Families",
        content: "The destination-wedding decision is researched by families well in advance, and editorial content shapes the consideration set. A credible profile of a palace venue, placed in a publication the family trusts, does what advertising cannot: it presents the venue as a recommendation rather than a promotion.\n\nPositioning matters too. The venue must speak simultaneously to the couple's aspiration and the parents' operational concerns — aspirational imagery for the former, reassurance about capacity, capability and cultural competence for the latter. Venues that master this dual address outperform those that market a single narrative.\n\nTHE ROYAL GALLERYS serves this market by documenting the palace venues and destination-wedding landscape with editorial seriousness — reaching the families at the research stage, when their preferences are being formed.",
      },
      {
        id: "the-royal-gallerys-perspective",
        heading: "The Royal Gallerys Perspective",
        content: "THE ROYAL GALLERYS covers the destination wedding market as part of its broader mandate on heritage and luxury — because the palace wedding is where those two worlds meet most dramatically. We document the venues, the couture and the destinations, and we help the decision-makers who serve this economy understand the families who shape it.\n\nWe believe the venues that will lead this market are those that position their heritage proudly, deliver the full multi-day programme, and reach the deciding families through credible editorial. The opportunity is extraordinary for those who take it seriously.",
      },
    ],
    pullQuotes: [
      { quote: "The family is not renting a ballroom; they are purchasing participation in a heritage that predates them.", context: "On the palace venue moat" },
      { quote: "Winning the palace wedding booking is a matter of hosting the full multi-day, multi-ceremony production — not a beautiful setting alone.", context: "On venue capability" },
    ],
    imageBreaks: [
      { image: "/images/style/article-06/bridal-lehenga-couture-break.jpg", alt: "Bridal lehenga couture", caption: "Bridal couture is the centrepiece of the palace wedding — and a distinct opportunity at each ceremony across the multi-day event." },
    ],
    relatedSlugs: ["luxury-wedding-marketing-india"],
    keywords: ["palace wedding venues", "destination wedding India", "heritage hotel wedding", "wedding venue marketing", "palace hotel", "Indian destination wedding"],
  },
];
