import fs from "fs";
import path from "path";

export interface MemberAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface MemberPayment {
  transactionId: string;
  orderId: string;
  paidAt: string;
  method: string;
  amount: number;
  verified: boolean;
}

export interface MemberAccount {
  id: string;
  membershipId: string; // e.g. RGC-003593 (assigned on approval or pending)
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  passwordHash: string;
  passwordSalt: string;
  address: MemberAddress;
  membershipType: "LIFETIME";
  amountPaid: number;
  status: "PENDING_APPROVAL" | "ACTIVE" | "SUSPENDED";
  joinedAt: string;
  approvedAt?: string;
  payment: MemberPayment;
  resetToken?: string | null;
  resetTokenExpiry?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SafeMember = Omit<MemberAccount, "passwordHash" | "passwordSalt" | "resetToken" | "resetTokenExpiry">;

export interface PrintIssueItem {
  id: string;
  issueNumber: string;
  title: string;
  period: string;
  coverImage: string;
  status: "Preparing" | "Dispatched" | "Delivered";
  dispatchDate?: string;
  trackingNumber?: string;
  description: string;
}

export interface ArchiveIssueItem {
  id: string;
  title: string;
  volume: string;
  season: string;
  year: number;
  coverImage: string;
  pageCount: number;
  pdfUrl?: string;
  summary: string;
  featuredStory: string;
}

export interface PrivateFileItem {
  id: string;
  title: string;
  code: string;
  subtitle: string;
  description: string;
  publicationDate: string;
  coverImage: string;
  readTime: string;
  pageCount: number;
  downloadUrl?: string;
  fileSize: string;
  restricted: boolean;
}

export interface CollectorEditionItem {
  id: string;
  year: number;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  releaseDate: string;
  pageCount: number;
  downloadUrl?: string;
  fileSize: string;
}

export interface EditorialSubmission {
  id: string;
  memberId: string;
  memberEmail: string;
  memberName: string;
  membershipId: string;
  title: string;
  category: string;
  description: string;
  notes?: string;
  attachments: Array<{
    name: string;
    url: string;
    size?: number;
    type?: string;
  }>;
  status:
    | "Submitted"
    | "Under Editorial Review"
    | "Further Information Requested"
    | "Accepted"
    | "Published"
    | "Not Selected";
  internalNotes?: string;
  submittedAt: string;
  updatedAt: string;
}

export interface MemberNotification {
  id: string;
  memberId?: string; // If empty, broadcast to all members
  title: string;
  message: string;
  category: "ANNOUNCEMENT" | "EDITORIAL" | "DELIVERY" | "ARCHIVE";
  createdAt: string;
  read?: boolean;
}

export interface DispatchedEmail {
  id: string;
  to: string;
  from: string;
  subject: string;
  body: string;
  type: "APPLICATION_ALERT" | "MEMBER_APPROVAL" | "WELCOME" | "SUBMISSION_ALERT";
  sentAt: string;
  status: "SENT";
}

export interface MembershipStoreData {
  config: {
    memberCount: number; // Base count: 3592
    membershipPrice: number; // 40000
    currency: string; // "INR"
    editorialEmail: string; // hey.theroyalsgallery@gmail.com
  };
  members: MemberAccount[];
  printIssues: PrintIssueItem[];
  archiveIssues: ArchiveIssueItem[];
  privateFiles: PrivateFileItem[];
  collectorEditions: CollectorEditionItem[];
  submissions: EditorialSubmission[];
  notifications: MemberNotification[];
  dispatchedEmails: DispatchedEmail[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "membership-store.json");

const INITIAL_DATA: MembershipStoreData = {
  config: {
    memberCount: 3592,
    membershipPrice: 40000,
    currency: "INR",
    editorialEmail: "hey.theroyalsgallery@gmail.com",
  },
  members: [],
  printIssues: [
    {
      id: "vol-01-summer-2026",
      issueNumber: "Volume I",
      title: "The Living Heritage of Princely India",
      period: "Summer 2026",
      coverImage: "/images/hero/jaipur-city-palace-grand-facade.jpg",
      status: "Delivered",
      dispatchDate: "June 2026",
      trackingNumber: "TRG-PRT-882910",
      description:
        "The inaugural international edition exploring palace restorations, royal archives of Rajasthan, and modern custodianship.",
    },
    {
      id: "vol-02-autumn-2026",
      issueNumber: "Volume II",
      title: "Jewels, Horology & Haute Époque",
      period: "Autumn 2026",
      coverImage: "/images/watches/watch-hero.jpeg",
      status: "Dispatched",
      dispatchDate: "September 2026",
      trackingNumber: "TRG-PRT-904122",
      description:
        "An in-depth inquiry into royal jewellery provenance, master watchmakers of the courts, and private connoisseurship.",
    },
    {
      id: "vol-03-winter-2026",
      issueNumber: "Volume III",
      title: "Winter Salons & The Art of the Table",
      period: "Winter 2026",
      coverImage: "/images/dining/rajasthani-royal-thali-banquet.jpg",
      status: "Preparing",
      dispatchDate: "December 2026",
      description:
        "The winter banquet tradition, private cellar chronicles, and culinary dynasties of the Subcontinent.",
    },
  ],
  archiveIssues: [
    {
      id: "arc-2026-v1",
      title: "Volume I — Foundations of Grandeur",
      volume: "Volume I",
      season: "Summer",
      year: 2026,
      coverImage: "/images/hero/jaipur-city-palace-grand-facade.jpg",
      pageCount: 224,
      summary:
        "The inaugural volume documenting the restoration of Baoris, Mewar royal kitchens, and the bespoke Rolls-Royces of the Maharajas.",
      featuredStory: "Inside City Palace Jaipur: An Unbroken Lineage",
    },
    {
      id: "arc-2025-retrospective",
      title: "Special Retrospective — The Archival Portfolios",
      volume: "Archival Special",
      season: "Annual",
      year: 2025,
      coverImage: "/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg",
      pageCount: 180,
      summary:
        "A private curated folio of glass-plate negatives from 1890–1930 documenting royal durbars and palace architectures.",
      featuredStory: "The Forgotten Durbar Photographs of 1911",
    },
    {
      id: "arc-2025-monograph",
      title: "Monograph — Textiles, Weaves & Royal Looms",
      volume: "Monograph IV",
      season: "Autumn",
      year: 2025,
      coverImage: "/images/design/varanasi-silk-weaving-traditional-loom.jpg",
      pageCount: 148,
      summary:
        "The royal patrons of Varanasi, Patan Patola, and Chanderi: preserving five centuries of handloom luxury.",
      featuredStory: "Zari, Silver & Gold: The Guilds of Varanasi",
    },
  ],
  privateFiles: [
    {
      id: "pf-2026-01",
      code: "DOSSIER NO. 01 / 2026",
      title: "The Lost Cellars of Mewar & The Royal Recipes",
      subtitle: "Unpublished manuscripts and oral histories from the royal kitchens of Udaipur",
      description:
        "A 64-page confidential digital dossier translating royal court recipes, banquet etiquette of the 19th century, and the secret spice blends passed through four generations of royal khansamas.",
      publicationDate: "July 2026",
      coverImage: "/images/dining/rajasthani-royal-thali-banquet.jpg",
      readTime: "45 min read",
      pageCount: 64,
      fileSize: "18.4 MB",
      restricted: true,
    },
    {
      id: "pf-2026-02",
      code: "DOSSIER NO. 02 / 2026",
      title: "The Golconda Emerald & Diamond Provenance Register",
      subtitle: "Tracing 18 royal gems from the Nizam's treasury to modern European private vaults",
      description:
        "Exclusively compiled with gemstone historians and museum archivists, featuring high-resolution gemological diagrams, archival receipts, and verified provenance records.",
      publicationDate: "September 2026",
      coverImage: "/images/style/article-07/high-jewellery-gold-luxury.jpg",
      readTime: "60 min read",
      pageCount: 88,
      fileSize: "24.1 MB",
      restricted: true,
    },
    {
      id: "pf-2026-03",
      code: "DOSSIER NO. 03 / 2026",
      title: "Coachbuilt: The 42 Bespoke Phantoms of the Maharajas",
      subtitle: "Chassis numbers, original build sheets, and royal special orders from 1907 to 1939",
      description:
        "The definitive archival dossier on the special-order Rolls-Royce and Bentley automobiles built for princely courts, complete with original coachbuilder correspondence.",
      publicationDate: "November 2026",
      coverImage: "/images/motoring/maharaja-rolls-royce-vintage-collection.jpg",
      readTime: "50 min read",
      pageCount: 76,
      fileSize: "21.8 MB",
      restricted: true,
    },
  ],
  collectorEditions: [
    {
      id: "ce-2026",
      year: 2026,
      title: "The Princely Lineages of the Subcontinent",
      subtitle: "A Collector's Compendium of Living Traditions, Architecture & Living Memory",
      description:
        "The Royal Gallerys 2026 Annual Collector's Edition: an encyclopedic, masterfully documented collector's volume of 320 pages featuring 14 royal dynasties, private photographic collections, genealogical lineages, and exclusive architectural drawings.",
      coverImage: "/images/hero/jaipur-city-palace-grand-facade.jpg",
      releaseDate: "Autumn 2026",
      pageCount: 320,
      fileSize: "48.6 MB",
    },
  ],
  submissions: [],
  notifications: [
    {
      id: "notif-welcome-circle",
      title: "Welcome to The Royal Gallery Circle",
      message:
        "Your lifetime membership is active. You have full access to the Royal Gallerys Archive, 2026 Private Files, and direct submission access to our Editorial Desk.",
      category: "ANNOUNCEMENT",
      createdAt: new Date().toISOString(),
    },
  ],
  dispatchedEmails: [],
};

function ensureDataFile(): MembershipStoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_FILE)) {
      fs.writeFileSync(STORE_FILE, JSON.stringify(INITIAL_DATA, null, 2), "utf8");
      return INITIAL_DATA;
    }
    const content = fs.readFileSync(STORE_FILE, "utf8");
    const parsed = JSON.parse(content) as MembershipStoreData;
    if (!parsed.config) parsed.config = INITIAL_DATA.config;
    if (!parsed.members) parsed.members = [];
    if (!parsed.printIssues) parsed.printIssues = INITIAL_DATA.printIssues;
    if (!parsed.archiveIssues) parsed.archiveIssues = INITIAL_DATA.archiveIssues;
    if (!parsed.privateFiles) parsed.privateFiles = INITIAL_DATA.privateFiles;
    if (!parsed.collectorEditions) parsed.collectorEditions = INITIAL_DATA.collectorEditions;
    if (!parsed.submissions) parsed.submissions = [];
    if (!parsed.notifications) parsed.notifications = INITIAL_DATA.notifications;
    if (!parsed.dispatchedEmails) parsed.dispatchedEmails = [];
    return parsed;
  } catch (err) {
    console.error("Failed to read membership store:", err);
    return INITIAL_DATA;
  }
}

export function getMembershipStore(): MembershipStoreData {
  return ensureDataFile();
}

export function saveMembershipStore(data: MembershipStoreData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${STORE_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(tempFile, STORE_FILE);
  } catch (err) {
    console.error("Failed to save membership store:", err);
    throw err;
  }
}

/**
 * Returns dynamic live member count:
 * base 3592 + all APPROVED active members.
 */
export function getLiveMemberCount(store: MembershipStoreData): number {
  const base = store.config.memberCount ?? 3592;
  const activeCount = store.members.filter((m) => m.status === "ACTIVE").length;
  return base + activeCount;
}

/**
 * Generate next sequential Permanent Identifier starting from 3592 + active count + 1
 */
export function generateNextMembershipId(store: MembershipStoreData): string {
  const liveCount = getLiveMemberCount(store);
  const nextNum = liveCount + 1;
  return `RGC-${String(nextNum).padStart(6, "0")}`;
}
