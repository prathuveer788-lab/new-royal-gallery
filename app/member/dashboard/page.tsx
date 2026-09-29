"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DigitalMembershipCard from "@/app/components/membership/DigitalMembershipCard";
import type {
  SafeMember,
  PrintIssueItem,
  ArchiveIssueItem,
  PrivateFileItem,
  CollectorEditionItem,
  EditorialSubmission,
  MemberNotification,
} from "@/lib/membership/store";

const TABS = [
  { id: "membership", label: "My Membership" },
  { id: "print", label: "Print Issues" },
  { id: "archive", label: "Archive" },
  { id: "private-files", label: "Private Files" },
  { id: "collector", label: "Collector's Edition" },
  { id: "editorial-desk", label: "Editorial Desk" },
  { id: "submissions", label: "My Submissions" },
  { id: "notifications", label: "Notifications" },
  { id: "profile", label: "My Profile" },
];

const CATEGORIES = [
  "Heritage",
  "Family History",
  "Travel",
  "Architecture",
  "Culture",
  "Archive",
  "Art",
  "Design",
  "Society",
  "Other",
];

export default function MemberDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("membership");
  const [member, setMember] = useState<SafeMember | null>(null);
  const [loading, setLoading] = useState(true);

  // Content
  const [printIssues, setPrintIssues] = useState<PrintIssueItem[]>([]);
  const [archiveIssues, setArchiveIssues] = useState<ArchiveIssueItem[]>([]);
  const [privateFiles, setPrivateFiles] = useState<PrivateFileItem[]>([]);
  const [collectorEditions, setCollectorEditions] = useState<CollectorEditionItem[]>([]);
  const [submissions, setSubmissions] = useState<EditorialSubmission[]>([]);
  const [notifications, setNotifications] = useState<MemberNotification[]>([]);

  // Reader Modal
  const [readingItem, setReadingItem] = useState<{
    title: string;
    subtitle?: string;
    content: string;
    code?: string;
  } | null>(null);

  // Editorial Desk Submission
  const [subTitle, setSubTitle] = useState("");
  const [subCategory, setSubCategory] = useState("Heritage");
  const [subDesc, setSubDesc] = useState("");
  const [subNotes, setSubNotes] = useState("");
  const [submittingStory, setSubmittingStory] = useState(false);
  const [subSuccessMsg, setSubSuccessMsg] = useState("");
  const [subErrorMsg, setSubErrorMsg] = useState("");

  // Profile Form
  const [profName, setProfName] = useState("");
  const [profEmail, setProfEmail] = useState("");
  const [profPhone, setProfPhone] = useState("");
  const [profWhatsapp, setProfWhatsapp] = useState("");
  const [profStreet, setProfStreet] = useState("");
  const [profCity, setProfCity] = useState("");
  const [profState, setProfState] = useState("");
  const [profCountry, setProfCountry] = useState("India");
  const [profPincode, setProfPincode] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/member/me");
        if (!res.ok) {
          router.push("/member/login");
          return;
        }

        const data = await res.json();
        if (!data.authenticated || !data.member) {
          router.push("/member/login");
          return;
        }

        const m: SafeMember = data.member;
        setMember(m);

        setProfName(m.fullName);
        setProfEmail(m.email);
        setProfPhone(m.phone);
        setProfWhatsapp(m.whatsapp || m.phone);
        setProfStreet(m.address?.street || "");
        setProfCity(m.address?.city || "");
        setProfState(m.address?.state || "");
        setProfCountry(m.address?.country || "India");
        setProfPincode(m.address?.pincode || "");

        // Fetch submissions
        const subRes = await fetch("/api/member/submit-story");
        if (subRes.ok) {
          const subData = await subRes.json();
          setSubmissions(subData.submissions || []);
        }

        setPrintIssues([
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
              "An in-depth inquiry into royal jewellery provenance, master watchmakers of the princely courts, and private connoisseurship.",
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
        ]);

        setArchiveIssues([
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
        ]);

        setPrivateFiles([
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
        ]);

        setCollectorEditions([
          {
            id: "ce-2026",
            year: 2026,
            title: "The Princely Lineages of the Subcontinent",
            subtitle: "A Collector's Compendium of Living Traditions, Architecture & Living Memory",
            description:
              "The Royal Gallerys 2026 Annual Collector's Edition: an encyclopedic, masterfully documented volume of 320 pages featuring 14 royal dynasties, private photographic collections, genealogical lineages, and exclusive architectural drawings.",
            coverImage: "/images/hero/jaipur-city-palace-grand-facade.jpg",
            releaseDate: "Autumn 2026",
            pageCount: 320,
            fileSize: "48.6 MB",
          },
        ]);

        setNotifications([
          {
            id: "notif-welcome",
            title: "Welcome to The Royal Gallery Circle",
            message:
              "Your account coordinates have been registered with the Editorial Office. Your private quarters are unlocked.",
            category: "ANNOUNCEMENT",
            createdAt: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/member/logout", { method: "POST" });
      router.push("/member/login");
      router.refresh();
    } catch {
      router.push("/member/login");
    }
  };

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubSuccessMsg("");
    setSubErrorMsg("");
    setSubmittingStory(true);

    try {
      const res = await fetch("/api/member/submit-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: subTitle,
          category: subCategory,
          description: subDesc,
          notes: subNotes,
          attachments: [],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");

      setSubSuccessMsg(
        "Thank you. Your material has been received by The Royal Gallerys Editorial Office."
      );
      setSubmissions((prev) => [data.submission, ...prev]);
      setSubTitle("");
      setSubDesc("");
      setSubNotes("");
    } catch (err: unknown) {
      setSubErrorMsg(err instanceof Error ? err.message : "Error submitting story.");
    } finally {
      setSubmittingStory(false);
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg("");
    setSavingProfile(true);

    try {
      const res = await fetch("/api/member/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: profName,
          email: profEmail,
          phone: profPhone,
          whatsapp: profWhatsapp,
          address: profStreet,
          city: profCity,
          state: profState,
          country: profCountry,
          pincode: profPincode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save profile changes.");

      setMember((prev) => (prev ? { ...prev, ...data.member } : null));
      setProfileMsg("Personal coordinates updated successfully.");
    } catch (err: unknown) {
      setProfileMsg(err instanceof Error ? err.message : "Error saving profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen pt-36 pb-20 px-6 flex items-center justify-center bg-[#FAF8F5] text-[#111111]"
      >
        <div className="text-center space-y-3">
          <div className="w-8 h-8 mx-auto border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-[0.28em] font-sans text-[#8A7352]">
            Opening The Royal Gallery Circle...
          </p>
        </div>
      </div>
    );
  }

  if (!member) {
    return null;
  }

  const isApproved = member.status === "ACTIVE";

  return (
    <div style={{ background: "#FAF8F5", color: "#111111" }} className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* ════════════════════════════════════════════════
            01 — LIGHT VOGUE MASTHEAD HEADER
            ════════════════════════════════════════════════ */}
        <header className="mb-8 pb-6 border-b border-[#111111]/15 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${isApproved ? "bg-emerald-600" : "bg-amber-600 animate-pulse"}`} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8A7352]">
                The Royal Gallery Circle · Private Quarters
              </span>
            </div>
            <h1
              className="text-3xl sm:text-5xl font-serif text-[#111111]"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
            >
              WELCOME, {member.firstName.toUpperCase()}
            </h1>
            <p className="mt-1 text-sm sm:text-base font-serif italic text-[#555555]">
              Welcome to The Royal Gallery Circle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-xs uppercase tracking-[0.18em] font-sans border border-[#111111]/30 text-[#111111] hover:bg-[#111111] hover:text-[#FAF8F5] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* ════════════════════════════════════════════════
            02 — MEMBERSHIP STATUS BANNER (LIGHT VOGUE)
            ════════════════════════════════════════════════ */}
        <div className="p-6 sm:p-8 bg-white border border-[#111111]/15 shadow-sm mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          <div>
            <span className="text-[9px] uppercase tracking-[0.24em] font-sans text-[#8A7352] block mb-1">
              Membership Rank
            </span>
            <span className="text-xl font-serif text-[#111111] font-medium tracking-wide">
              {isApproved ? "LIFETIME MEMBER" : "APPLICATION LODGED"}
            </span>
            <span className="block text-xs text-[#777777] font-sans mt-0.5">
              The Royal Gallery Circle
            </span>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.24em] font-sans text-[#8A7352] block mb-1">
              Permanent Identifier
            </span>
            <span className="text-xl font-mono text-[#111111] font-bold tracking-wider">
              {member.membershipId}
            </span>
            <span className="block text-xs text-[#777777] font-sans mt-0.5">
              {isApproved ? "Custodial Register Verified" : "Pending Office Activation"}
            </span>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.24em] font-sans text-[#8A7352] block mb-1">
              Account Status
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${isApproved ? "bg-emerald-600" : "bg-amber-500 animate-pulse"}`} />
              <span
                className={`text-xs font-sans font-bold tracking-widest uppercase ${
                  isApproved ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {member.status === "ACTIVE" ? "ACTIVE" : "UNDER EDITORIAL REVIEW"}
              </span>
            </div>
            <span className="block text-xs text-[#777777] font-sans mt-0.5">
              ₹3,999 Lifetime Tier
            </span>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.24em] font-sans text-[#8A7352] block mb-1">
              Date Applied
            </span>
            <span className="text-base font-serif text-[#111111]">
              {new Date(member.joinedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="block text-xs text-[#777777] font-sans mt-0.5">
              {isApproved ? "Perpetual Standing" : "Awaiting Editorial Approval"}
            </span>
          </div>
        </div>

        {/* ════════ PENDING APPROVAL NOTICE (IF NOT YET APPROVED) ════════ */}
        {!isApproved && (
          <div className="mb-10 p-8 bg-amber-50/70 border border-amber-300 text-[#111111] space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#8A7352] font-semibold block">
              Editorial Office Notification
            </span>
            <h3 className="text-2xl font-serif text-[#111111]">
              Application Pending Editorial Office Approval
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed max-w-3xl">
              Your details have been received and dispatched to The Royal Gallerys Editorial Office at{" "}
              <strong className="text-[#111111]">hey.theroyalsgallery@gmail.com</strong>. Our editorial directors verify each membership candidate. As soon as your application is approved and your permanent identifier is confirmed, your Digital Membership Card will unlock here.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/editorial-office"
                className="inline-block px-6 py-2.5 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-wider font-sans font-medium hover:bg-[#8A7352] transition-colors"
              >
                Editorial Office Console (Approve Locally) →
              </Link>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            03 — NAVIGATION TABS
            ════════════════════════════════════════════════ */}
        <div className="mb-10 overflow-x-auto no-scrollbar border-b border-[#111111]/15">
          <div className="flex gap-2 min-w-max pb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-sans font-medium transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? "text-[#111111] font-bold"
                    : "text-[#777777] hover:text-[#111111]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            TAB A — MY MEMBERSHIP
            ════════════════════════════════════════════════ */}
        {activeTab === "membership" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Digital Card on left / center */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-white border border-[#111111]/10 shadow-sm">
                <span className="text-[10px] uppercase tracking-[0.24em] font-sans text-[#8A7352] mb-6 font-semibold">
                  Official Membership Credential
                </span>
                {isApproved ? (
                  <DigitalMembershipCard
                    fullName={member.fullName}
                    membershipId={member.membershipId}
                    joinedDate={member.joinedAt}
                    status="ACTIVE"
                  />
                ) : (
                  <div className="p-10 border border-dashed border-[#8A7352]/40 text-center max-w-md bg-[#FAF8F5]">
                    <span className="text-xs uppercase tracking-widest text-[#8A7352] font-semibold block mb-2">
                      Card Locked Pending Office Approval
                    </span>
                    <p className="text-xs font-sans text-[#666666] leading-relaxed">
                      Your high-resolution Light Vogue Digital Membership Card will generate automatically as soon as the Editorial Office approves your application.
                    </p>
                  </div>
                )}
              </div>

              {/* Account summary on right */}
              <div className="lg:col-span-5 p-8 bg-white border border-[#111111]/10 shadow-sm space-y-6">
                <h3 className="text-2xl font-serif text-[#111111]">
                  Membership Dossier
                </h3>

                <div className="space-y-4 text-xs font-sans">
                  <div className="flex justify-between py-2 border-b border-[#111111]/5">
                    <span className="text-[#777777]">Full Name</span>
                    <span className="text-[#111111] font-medium">{member.fullName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#111111]/5">
                    <span className="text-[#777777]">Permanent ID</span>
                    <span className="text-[#8A7352] font-mono font-bold">{member.membershipId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#111111]/5">
                    <span className="text-[#777777]">Standing</span>
                    <span className="text-[#111111] font-medium">
                      {isApproved ? "Lifetime Member (Active)" : "Pending Editorial Approval"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#111111]/5">
                    <span className="text-[#777777]">Registered Email</span>
                    <span className="text-[#111111]">{member.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#111111]/5">
                    <span className="text-[#777777]">Mobile Phone</span>
                    <span className="text-[#111111]">{member.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#111111]/5">
                    <span className="text-[#777777]">Mailing Address</span>
                    <span className="text-[#111111] text-right max-w-[200px]">
                      {member.address.street}, {member.address.city}, {member.address.state} — {member.address.pincode}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="w-full py-2.5 text-xs uppercase tracking-[0.2em] font-sans border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#FAF8F5] transition-colors"
                  >
                    Edit Delivery Coordinates →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            TAB B — PRINT ISSUES
            ════════════════════════════════════════════════ */}
        {activeTab === "print" && (
          <div className="space-y-8">
            <div className="border-b border-[#111111]/10 pb-4">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                YOUR PRINT ISSUES
              </h2>
              <p className="text-sm font-sans text-[#666666] mt-1">
                Your lifetime membership includes three physical hardcover volumes of The Royal Gallerys delivered to your registered mailing address.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {printIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-white border border-[#111111]/10 shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={issue.coverImage}
                      alt={issue.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 border border-[#111111]/10 text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-[#111111]">
                      {issue.period}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8A7352] block mb-1">
                        {issue.issueNumber}
                      </span>
                      <h3 className="text-xl font-serif text-[#111111] mb-2 font-normal">
                        {issue.title}
                      </h3>
                      <p className="text-xs text-[#666666] font-sans leading-relaxed mb-4">
                        {issue.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-[#777777] block">
                          Delivery Status
                        </span>
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider ${
                            issue.status === "Delivered"
                              ? "text-emerald-700"
                              : issue.status === "Dispatched"
                              ? "text-amber-700"
                              : "text-blue-700"
                          }`}
                        >
                          ● {issue.status}
                        </span>
                      </div>

                      {issue.trackingNumber && (
                        <div className="text-right">
                          <span className="text-[8px] uppercase tracking-wider text-[#777777] block">
                            Dispatch Tracking
                          </span>
                          <span className="text-xs font-mono text-[#111111]">
                            {issue.trackingNumber}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            TAB C — ROYAL GALLERYS ARCHIVE
            ════════════════════════════════════════════════ */}
        {activeTab === "archive" && (
          <div className="space-y-8">
            <div className="border-b border-[#111111]/10 pb-4">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                THE ROYAL GALLERYS ARCHIVE
              </h2>
              <p className="text-sm font-sans text-[#666666] mt-1">
                Unrestricted digital access to previous volumes, retrospective editions, and designated member-only archival folios.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {archiveIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-white border border-[#111111]/10 shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={issue.coverImage}
                      alt={issue.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 border border-[#111111]/10 text-[9px] uppercase tracking-[0.2em] font-mono text-[#111111]">
                      {issue.pageCount} Pages
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8A7352] block mb-1">
                        {issue.volume} · {issue.season} {issue.year}
                      </span>
                      <h3 className="text-xl font-serif text-[#111111] mb-2 font-normal">
                        {issue.title}
                      </h3>
                      <p className="text-xs text-[#666666] font-sans leading-relaxed mb-4">
                        {issue.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#111111]/10">
                      <button
                        onClick={() =>
                          setReadingItem({
                            title: issue.title,
                            subtitle: `${issue.volume} · ${issue.year}`,
                            content: `${issue.summary}\n\nKey Featured Investigation: ${issue.featuredStory}\n\nFull 220+ page digitized folio accessible for authenticated Circle members. High-resolution archival plates, translated royal manuscripts, and architectural plans.`,
                          })
                        }
                        className="w-full py-2.5 text-xs uppercase tracking-[0.2em] font-sans font-medium bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352] transition-colors text-center"
                      >
                        Read Online →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            TAB D — PRIVATE FILES
            ════════════════════════════════════════════════ */}
        {activeTab === "private-files" && (
          <div className="space-y-8">
            <div className="border-b border-[#111111]/10 pb-4">
              <span className="text-[10px] uppercase tracking-[0.24em] font-sans text-[#8A7352] font-semibold">
                Member Dossiers
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] mt-1">
                PRIVATE FILES
              </h2>
              <p className="text-sm font-sans text-[#666666] mt-1">
                Three exclusive, substantial digital dossiers curated annually by our editors for Royal Gallery Circle members.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {privateFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white border border-[#111111]/10 shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={file.coverImage}
                      alt={file.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono text-[#8A7352] border border-[#111111]/10 font-bold">
                      {file.code}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.16em] font-sans text-[#8A7352] block mb-1">
                        Released {file.publicationDate} · {file.readTime}
                      </span>
                      <h3 className="text-xl font-serif text-[#111111] mb-2 font-normal">
                        {file.title}
                      </h3>
                      <p className="text-xs font-serif italic text-[#777777] mb-3">
                        {file.subtitle}
                      </p>
                      <p className="text-xs text-[#666666] font-sans leading-relaxed mb-4">
                        {file.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#111111]/10">
                      <button
                        onClick={() =>
                          setReadingItem({
                            title: file.title,
                            subtitle: `${file.code} — ${file.publicationDate}`,
                            content: `${file.description}\n\n${file.subtitle}\n\nContents of this confidential file are reserved exclusively for members of The Royal Gallery Circle. Includes historical accounts, correspondence, and technical provenance notes.`,
                            code: file.code,
                          })
                        }
                        className="w-full py-2.5 text-xs uppercase tracking-[0.2em] font-sans font-medium bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352] transition-colors text-center"
                      >
                        Open Dossier →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            TAB E — ANNUAL DIGITAL COLLECTOR'S EDITION
            ════════════════════════════════════════════════ */}
        {activeTab === "collector" && (
          <div className="space-y-8">
            <div className="border-b border-[#111111]/10 pb-4">
              <span className="text-[10px] uppercase tracking-[0.24em] font-sans text-[#8A7352] font-semibold">
                Encyclopedic Masterpiece
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111] mt-1">
                ANNUAL DIGITAL COLLECTOR&apos;S EDITION
              </h2>
              <p className="text-sm font-sans text-[#666666] mt-1">
                One separately curated annual digital heritage publication created as a lavish collector&apos;s edition.
              </p>
            </div>

            {collectorEditions.map((ce) => (
              <div
                key={ce.id}
                className="p-8 sm:p-12 bg-white border border-[#111111]/10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div className="relative md:col-span-5 aspect-[4/5] overflow-hidden border border-[#111111]/10">
                  <Image
                    src={ce.coverImage}
                    alt={ce.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 text-xs font-mono uppercase text-[#111111]">
                    {ce.year} Collector&apos;s Folio · {ce.pageCount} Pages
                  </div>
                </div>

                <div className="md:col-span-7 space-y-5">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold block">
                    {ce.year} Definitive Compendium
                  </span>
                  <h3
                    className="text-2xl sm:text-4xl font-serif text-[#111111]"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {ce.title}
                  </h3>
                  <p className="text-sm font-serif italic text-[#666666]">
                    {ce.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed">
                    {ce.description}
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() =>
                        setReadingItem({
                          title: ce.title,
                          subtitle: `${ce.year} Annual Collector's Edition`,
                          content: `${ce.description}\n\nCurated over eighteen months in collaboration with private palace archives and custodians across 14 royal dynasties. Includes genealogical charts, full-page plates of 19th-century portraits, and architectural blueprints of private royal residences.`,
                        })
                      }
                      className="px-8 py-3.5 text-xs uppercase tracking-[0.24em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
                    >
                      Read Online →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ════════════════════════════════════════════════
            TAB F — EDITORIAL DESK
            ════════════════════════════════════════════════ */}
        {activeTab === "editorial-desk" && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-b border-[#111111]/10 pb-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8A7352]">
                Privilege 04 & 05
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] mt-1">
                EDITORIAL DESK
              </h2>
              <p className="text-sm font-sans text-[#666666] max-w-xl mx-auto mt-2 leading-relaxed">
                Have a story, archive, family history, heritage property, travel experience or cultural material to share with The Royal Gallerys? Submit it directly to our Editorial Office.
              </p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 text-xs font-sans text-[#775522] text-center">
              ★ Membership provides priority editorial consideration; publication is not guaranteed.
            </div>

            {subSuccessMsg && (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-sans text-center">
                {subSuccessMsg}
              </div>
            )}

            {subErrorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-sans">
                {subErrorMsg}
              </div>
            )}

            <form
              onSubmit={handleStorySubmit}
              className="p-8 sm:p-10 bg-white border border-[#111111]/15 shadow-sm space-y-6"
            >
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                  Submission Title *
                </label>
                <input
                  type="text"
                  required
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="e.g. The 1898 Durbar Photographs of Our Ancestral Haveli"
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Category *
                  </label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-white text-[#111111]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Attach Digital Asset URL / Drive Link
                  </label>
                  <input
                    type="url"
                    value={subNotes}
                    onChange={(e) => setSubNotes(e.target.value)}
                    placeholder="https://drive.google.com/... (optional)"
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                  Description / Story Details *
                </label>
                <textarea
                  required
                  rows={6}
                  value={subDesc}
                  onChange={(e) => setSubDesc(e.target.value)}
                  placeholder="Describe the heritage background, historical provenance, family archive, or cultural context..."
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 p-4 text-sm text-[#111111] focus:border-[#111111] focus:outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submittingStory}
                className="w-full py-4 text-xs uppercase tracking-[0.24em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
              >
                {submittingStory ? "Transmitting to Editors..." : "SUBMIT TO EDITORIAL DESK →"}
              </button>
            </form>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            TAB G — MY SUBMISSIONS
            ════════════════════════════════════════════════ */}
        {activeTab === "submissions" && (
          <div className="space-y-8">
            <div className="border-b border-[#111111]/10 pb-4">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                MY SUBMISSIONS
              </h2>
              <p className="text-sm font-sans text-[#666666] mt-1">
                Track the status of materials and stories submitted to The Royal Gallerys Editorial Office.
              </p>
            </div>

            {submissions.length === 0 ? (
              <div className="p-12 text-center border border-[#111111]/10 bg-white">
                <p className="text-sm font-serif text-[#666666] mb-4">
                  You have not submitted any materials to the Editorial Desk yet.
                </p>
                <button
                  onClick={() => setActiveTab("editorial-desk")}
                  className="px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-sans border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#FAF8F5]"
                >
                  Submit Material Now →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-6 bg-white border border-[#111111]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-[#8A7352] font-bold">
                          {sub.id}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#111111]/10 text-[#666666]">
                          {sub.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-serif text-[#111111]">
                        {sub.title}
                      </h4>
                      <p className="text-xs text-[#666666] line-clamp-2 max-w-2xl">
                        {sub.description}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-[9px] uppercase tracking-wider text-[#777777] block mb-1">
                        Editorial Status
                      </span>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-xs ${
                          sub.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                            : sub.status === "Accepted"
                            ? "bg-amber-50 text-amber-700 border border-amber-300"
                            : sub.status === "Under Editorial Review"
                            ? "bg-blue-50 text-blue-700 border border-blue-300"
                            : "bg-neutral-100 text-[#111111] border border-neutral-300"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════
            TAB H — NOTIFICATIONS
            ════════════════════════════════════════════════ */}
        {activeTab === "notifications" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-[#111111]/10 pb-4">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                NOTIFICATIONS
              </h2>
              <p className="text-sm font-sans text-[#666666] mt-1">
                Private member announcements, editorial notices, and print dispatch updates.
              </p>
            </div>

            <div className="space-y-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-6 bg-white border border-[#111111]/10 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider">
                    <span className="text-[#8A7352] font-semibold">{notif.category}</span>
                    <span className="text-[#777777]">
                      {new Date(notif.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif text-[#111111]">{notif.title}</h4>
                  <p className="text-xs font-sans text-[#666666] leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            TAB I — MY PROFILE
            ════════════════════════════════════════════════ */}
        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="border-b border-[#111111]/10 pb-4">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                MY PROFILE
              </h2>
              <p className="text-sm font-sans text-[#666666] mt-1">
                Manage your personal contact coordinates and delivery address.
              </p>
            </div>

            {profileMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-sans">
                {profileMsg}
              </div>
            )}

            <form
              onSubmit={handleProfileSave}
              className="p-8 bg-white border border-[#111111]/15 shadow-sm space-y-5"
            >
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={profName}
                  onChange={(e) => setProfName(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={profEmail}
                    onChange={(e) => setProfEmail(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={profPhone}
                    onChange={(e) => setProfPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={profWhatsapp}
                  onChange={(e) => setProfWhatsapp(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                  Street Address / Estate Name
                </label>
                <input
                  type="text"
                  required
                  value={profStreet}
                  onChange={(e) => setProfStreet(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={profCity}
                    onChange={(e) => setProfCity(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    State
                  </label>
                  <input
                    type="text"
                    value={profState}
                    onChange={(e) => setProfState(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    PIN / ZIP
                  </label>
                  <input
                    type="text"
                    required
                    value={profPincode}
                    onChange={(e) => setProfPincode(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Country
                  </label>
                  <input
                    type="text"
                    value={profCountry}
                    onChange={(e) => setProfCountry(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="w-full py-3.5 text-xs uppercase tracking-[0.24em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
                >
                  {savingProfile ? "Saving Details..." : "SAVE CHANGES"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── READER MODAL ── */}
        {readingItem && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="max-w-3xl w-full max-h-[85vh] bg-[#FAF8F5] border border-[#111111] p-8 sm:p-12 overflow-y-auto space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#111111]/15 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#8A7352] font-bold">
                    The Royal Gallerys Private Archive Reader
                  </span>
                  <h3 className="text-2xl font-serif text-[#111111] mt-1">{readingItem.title}</h3>
                  {readingItem.subtitle && (
                    <p className="text-xs text-[#777777] font-sans mt-0.5">{readingItem.subtitle}</p>
                  )}
                </div>
                <button
                  onClick={() => setReadingItem(null)}
                  className="text-2xl text-[#111111] hover:text-[#8A7352] p-2"
                >
                  ✕
                </button>
              </div>

              <div className="text-sm font-sans text-[#333333] leading-relaxed whitespace-pre-line py-4">
                {readingItem.content}
              </div>

              <div className="border-t border-[#111111]/15 pt-4 flex justify-between items-center text-xs font-sans text-[#777777]">
                <span>● Authenticated Member Access Verified</span>
                <button
                  onClick={() => setReadingItem(null)}
                  className="px-6 py-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#FAF8F5]"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
