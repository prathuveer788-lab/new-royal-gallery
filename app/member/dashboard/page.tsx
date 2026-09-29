"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DigitalMembershipCard from "@/app/components/membership/DigitalMembershipCard";
import CinematicEntrance from "@/app/components/membership/CinematicEntrance";
import PrivateWorldHeader from "@/app/components/membership/PrivateWorldHeader";
import StoryReaderModal from "@/app/components/membership/StoryReaderModal";
import PrivateWorldSearch from "@/app/components/membership/PrivateWorldSearch";
import {
  PRIVATE_WORLDS,
  getAllStories,
  PrivateStory,
} from "@/lib/membership/private-world-data";
import type {
  SafeMember,
  PrintIssueItem,
  EditorialSubmission,
} from "@/lib/membership/store";

export default function MemberDashboardPage() {
  const router = useRouter();

  // Authentication State
  const [member, setMember] = useState<SafeMember | null>(null);
  const [loading, setLoading] = useState(true);

  // Entrance Sequence (Screen 01)
  const [showEntrance, setShowEntrance] = useState(true);

  // Active View Tab: 'all' | 'timeline' | 'vault' | 'table' | 'object' | 'automobile' | 'palace' | 'book' | 'portrait' | 'room' | 'maps' | 'credential'
  const [activeTab, setActiveTab] = useState("all");

  // Reader Modal State
  const [activeStory, setActiveStory] = useState<PrivateStory | null>(null);

  // Search Modal
  const [searchOpen, setSearchOpen] = useState(false);

  // Timeline Period Filter
  const [timelinePeriodFilter, setTimelinePeriodFilter] = useState("ALL");

  // Content for Dossier
  const [printIssues, setPrintIssues] = useState<PrintIssueItem[]>([]);
  const [submissions, setSubmissions] = useState<EditorialSubmission[]>([]);

  // Editorial Desk Submission Form
  const [subTitle, setSubTitle] = useState("");
  const [subCategory, setSubCategory] = useState("Heritage");
  const [subDesc, setSubDesc] = useState("");
  const [subNotes, setSubNotes] = useState("");
  const [submittingStory, setSubmittingStory] = useState(false);
  const [subMsg, setSubMsg] = useState("");

  // Profile Form State
  const [profName, setProfName] = useState("");
  const [profPhone, setProfPhone] = useState("");
  const [profStreet, setProfStreet] = useState("");
  const [profCity, setProfCity] = useState("");
  const [profState, setProfState] = useState("");
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
        setProfName(m.fullName || "");
        setProfPhone(m.phone || "");
        setProfStreet(m.address?.street || "");
        setProfCity(m.address?.city || "");
        setProfState(m.address?.state || "");
        setProfPincode(m.address?.pincode || "");

        // Check if user already saw entrance in this session
        const alreadySaw = sessionStorage.getItem("rg_seen_entrance");
        if (alreadySaw === "true") {
          setShowEntrance(false);
        }

        // Fetch editorial content for dossier
        fetch("/api/member/submit-story")
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => {
            if (d?.submissions) setSubmissions(d.submissions);
          })
          .catch(() => {});
      } catch (err) {
        console.error("Member data load error:", err);
        router.push("/member/login");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  const handleEnterWorld = () => {
    setShowEntrance(false);
    sessionStorage.setItem("rg_seen_entrance", "true");
  };

  const handleReplayEntrance = () => {
    setShowEntrance(true);
  };

  const handleOpenStory = (story: PrivateStory) => {
    setActiveStory(story);
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: "story", storyId: story.id }, "", `#story-${story.id}`);
    }
  };

  const handleCloseStory = () => {
    setActiveStory(null);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#story-")) {
      window.history.back();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#story-")) {
        const sId = hash.replace("#story-", "");
        const all = getAllStories();
        const found = all.find((s) => s.id === sId);
        if (found) {
          setActiveStory(found);
          return;
        }
      }
      setActiveStory(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/member/logout", { method: "POST" });
    } catch {}
    sessionStorage.removeItem("rg_seen_entrance");
    router.push("/member/login");
  };

  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingStory(true);
    setSubMsg("");

    try {
      const res = await fetch("/api/member/submit-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: subTitle,
          category: subCategory,
          description: subDesc,
          internalNotes: subNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");

      setSubMsg("✓ Your story proposal has been transmitted to the Editorial Office.");
      setSubTitle("");
      setSubDesc("");
      setSubNotes("");
      if (data.submission) {
        setSubmissions((prev) => [data.submission, ...prev]);
      }
    } catch (err: unknown) {
      setSubMsg(err instanceof Error ? err.message : "Failed to transmit proposal.");
    } finally {
      setSubmittingStory(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg("");

    try {
      const res = await fetch("/api/member/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: profName,
          phone: profPhone,
          address: {
            street: profStreet,
            city: profCity,
            state: profState,
            pincode: profPincode,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed.");

      setProfileMsg("✓ Dossier records updated successfully.");
      if (data.member) setMember(data.member);
    } catch (err: unknown) {
      setProfileMsg(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-36 px-6 flex items-center justify-center bg-[#FAF8F5] text-[#111111]">
        <div className="text-center space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#8A7352] font-sans font-semibold">
            The Royal Gallerys
          </p>
          <h2
            className="text-2xl font-serif text-[#111111]"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Entering Private Members’ World...
          </h2>
        </div>
      </div>
    );
  }

  if (!member) return null;

  const isApproved = member.status === "ACTIVE";
  const allStories = getAllStories();

  // Find Featured Stories for Living Cover
  const devshreeStory = allStories.find((s) => s.id === "palace-one-night-at-devshree") || allStories[0];
  const patialaStory = allStories.find((s) => s.id === "vault-patiala-necklace") || allStories[1];
  const vladimirStory = allStories.find((s) => s.id === "object-vladimir-tiara") || allStories[2];
  const rollsStory = allStories.find((s) => s.id === "automobile-rolls-royce-phantom-of-love") || allStories[3];
  const banquetStory = allStories.find((s) => s.id === "table-buckingham-state-banquet") || allStories[4];
  const haddonRoomStory = allStories.find((s) => s.id === "room-haddon-hall") || allStories[5];
  const bookVol1Story = allStories.find((s) => s.id === "book-chronicles-palace-architecture") || allStories[6];

  // Selected World if on a specific world tab
  const currentWorldSection = PRIVATE_WORLDS.find((w) => w.id === activeTab);

  return (
    <div style={{ background: "#FAF8F5", color: "#111111" }} className="min-h-screen">
      {/* ════════════════════════════════════════════════
          01 — THE CINEMATIC EDITORIAL ENTRANCE (SCREEN 01)
          ════════════════════════════════════════════════ */}
      {showEntrance && (
        <CinematicEntrance
          memberName={member.fullName}
          membershipId={member.membershipId}
          membershipType="LIFETIME MEMBER"
          onEnter={handleEnterWorld}
        />
      )}

      {/* ════════════════════════════════════════════════
          02 — MINIMAL VOGUE EDITORIAL NAVIGATION
          ════════════════════════════════════════════════ */}
      <PrivateWorldHeader
        activeTab={activeTab}
        onSelectTab={(tabId) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        memberName={member.fullName}
        membershipId={member.membershipId}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCredential={() => setActiveTab("credential")}
        onSignOut={handleSignOut}
        onReplayEntrance={handleReplayEntrance}
      />

      {/* ════════════════════════════════════════════════
          03 — LIVING COVER VIEW (ALL WORLDS DISCOVERY)
          ════════════════════════════════════════════════ */}
      {activeTab === "all" && (
        <main className="space-y-16 sm:space-y-24 pb-32">
          {/* ── LIVING EDITORIAL COVER HERO ── */}
          <section className="pt-10 sm:pt-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto space-y-4 mb-10 sm:mb-14">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.45em] font-sans font-semibold text-[#8A7352]">
                Private Members’ World · Curated Edition
              </span>
              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#111111] leading-[0.96] tracking-tight font-normal"
                style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
              >
                The Private World
              </h1>
              <div className="w-16 h-px mx-auto my-4 bg-[#8A7352]/40" />
              <p className="text-base sm:text-xl font-serif italic text-[#555555] max-w-2xl mx-auto leading-relaxed">
                Stories of heritage, royalty, people, places and objects—curated beyond the obvious.
              </p>
            </div>

            {/* ── FEATURE 01: FULL-WIDTH EDITORIAL HERO (ONE NIGHT AT DEVSHREE) ── */}
            <div
              onClick={() => handleOpenStory(devshreeStory)}
              className="group relative cursor-pointer overflow-hidden bg-[#111111] shadow-xl"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/8] max-h-[620px] w-full overflow-hidden">
                <Image
                  src={devshreeStory.heroImage}
                  alt={devshreeStory.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-101"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-opacity duration-700 group-hover:from-black/90" />

                <div className="absolute inset-0 p-6 sm:p-12 md:p-16 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-sans font-semibold px-3 py-1 bg-white/20 backdrop-blur-xs text-white border border-white/30">
                      06 · ONE NIGHT AT THE PALACE · LAUNCH FEATURE
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 hidden sm:inline">
                      {devshreeStory.location}
                    </span>
                  </div>

                  <div className="max-w-3xl space-y-3">
                    <h2
                      className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.05] tracking-tight font-normal text-white"
                      style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                    >
                      {devshreeStory.title}
                    </h2>
                    <p className="text-xs sm:text-base font-serif italic text-white/90 line-clamp-2 leading-relaxed">
                      {devshreeStory.subtitle}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-sans font-medium text-[#FAF8F5] underline underline-offset-4 group-hover:text-[#DFC498] transition-colors">
                        <span>Read Overnight Feature</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FEATURE 02: SPLIT-SCREEN MAGAZINE COMPOSITION ── */}
          <section className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: The Patiala Diamond Collar (Vault) */}
              <div
                onClick={() => handleOpenStory(patialaStory)}
                className="lg:col-span-6 group cursor-pointer bg-white p-8 sm:p-10 border border-[#111111]/12 flex flex-col justify-between shadow-xs hover:border-[#111111] transition-all duration-500"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8A7352]">
                      02 · THE PRIVATE VAULT
                    </span>
                    <span className="text-[10px] font-mono text-[#777777]">
                      {patialaStory.accessionId}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] w-full bg-[#141414] overflow-hidden border border-[#111111]/10 flex items-center justify-center p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={patialaStory.heroImage}
                        alt={patialaStory.title}
                        fill
                        sizes="600px"
                        className="object-contain transition-transform duration-500 group-hover:scale-102"
                      />
                    </div>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {patialaStory.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-serif italic text-[#555555] leading-relaxed">
                    {patialaStory.subtitle}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#111111]/10 flex items-center justify-between text-xs font-sans text-[#777777]">
                  <span>{patialaStory.location}</span>
                  <span className="group-hover:text-[#111111] group-hover:translate-x-1 transition-all">
                    Inspect Vault File →
                  </span>
                </div>
              </div>

              {/* Right Column: The Vladimir Tiara (Object) */}
              <div
                onClick={() => handleOpenStory(vladimirStory)}
                className="lg:col-span-6 group cursor-pointer bg-white p-8 sm:p-10 border border-[#111111]/12 flex flex-col justify-between shadow-xs hover:border-[#111111] transition-all duration-500"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8A7352]">
                      04 · THE ROYAL OBJECT
                    </span>
                    <span className="text-[10px] font-mono text-[#777777]">
                      {vladimirStory.accessionId}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] w-full bg-[#141414] overflow-hidden border border-[#111111]/10 flex items-center justify-center p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={vladimirStory.heroImage}
                        alt={vladimirStory.title}
                        fill
                        sizes="600px"
                        className="object-contain transition-transform duration-500 group-hover:scale-102"
                      />
                    </div>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {vladimirStory.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-serif italic text-[#555555] leading-relaxed">
                    {vladimirStory.subtitle}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#111111]/10 flex items-center justify-between text-xs font-sans text-[#777777]">
                  <span>{vladimirStory.location}</span>
                  <span className="group-hover:text-[#111111] group-hover:translate-x-1 transition-all">
                    Explore Provenance →
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ── FEATURE 03: ASYMMETRICAL EDITORIAL TRIAD ── */}
          <section className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="mb-6 flex items-end justify-between border-b border-[#111111]/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold">
                  Curatorial Spotlight
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-serif text-[#111111] mt-0.5"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Automobilia, Banqueting & Interior Secrets
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="text-xs uppercase tracking-widest text-[#777777] hover:text-[#111111] hidden sm:block"
              >
                Search All 40 Works →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Rolls-Royce */}
              <div
                onClick={() => handleOpenStory(rollsStory)}
                className="group cursor-pointer bg-white border border-[#111111]/10 p-6 flex flex-col justify-between hover:border-[#111111] transition-all"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full bg-[#141414] overflow-hidden flex items-center justify-center p-1.5">
                    <div className="relative w-full h-full">
                      <Image
                        src={rollsStory.heroImage}
                        alt={rollsStory.title}
                        fill
                        sizes="400px"
                        className="object-contain group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8A7352] block">
                    05 · THE AUTOMOBILE ROOM
                  </span>
                  <h4
                    className="text-lg font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {rollsStory.title}
                  </h4>
                  <p className="text-xs font-sans text-[#666666] line-clamp-2">
                    {rollsStory.subtitle}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#111111]/5 text-[10px] uppercase tracking-wider text-[#888888] flex items-center justify-between">
                  <span>{rollsStory.period}</span>
                  <span className="group-hover:text-[#111111] group-hover:translate-x-1 transition-all">Inspect Automobilia →</span>
                </div>
              </div>

              {/* Card 2: Buckingham Palace Banquet */}
              <div
                onClick={() => handleOpenStory(banquetStory)}
                className="group cursor-pointer bg-white border border-[#111111]/10 p-6 flex flex-col justify-between hover:border-[#111111] transition-all"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full bg-[#141414] overflow-hidden flex items-center justify-center p-1.5">
                    <div className="relative w-full h-full">
                      <Image
                        src={banquetStory.heroImage}
                        alt={banquetStory.title}
                        fill
                        sizes="400px"
                        className="object-contain group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8A7352] block">
                    03 · THE ROYAL TABLE
                  </span>
                  <h4
                    className="text-lg font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {banquetStory.title}
                  </h4>
                  <p className="text-xs font-sans text-[#666666] line-clamp-2">
                    {banquetStory.subtitle}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#111111]/5 text-[10px] uppercase tracking-wider text-[#888888] flex items-center justify-between">
                  <span>{banquetStory.location}</span>
                  <span className="group-hover:text-[#111111] group-hover:translate-x-1 transition-all">View Menu Folio →</span>
                </div>
              </div>

              {/* Card 3: Interactive Room (Haddon Hall) */}
              <div
                onClick={() => handleOpenStory(haddonRoomStory)}
                className="group cursor-pointer bg-white border border-[#111111]/10 p-6 flex flex-col justify-between hover:border-[#111111] transition-all"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full bg-[#141414] overflow-hidden flex items-center justify-center p-1.5">
                    <div className="relative w-full h-full">
                      <Image
                        src={haddonRoomStory.heroImage}
                        alt={haddonRoomStory.title}
                        fill
                        sizes="400px"
                        className="object-contain group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-2 right-2 bg-[#111111]/90 text-[#FAF8F5] text-[9px] uppercase tracking-widest font-mono px-2 py-0.5 backdrop-blur-xs border border-white/20 z-10">
                      Hotspots
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8A7352] block">
                    09 · THE ROOM · INTERACTIVE
                  </span>
                  <h4
                    className="text-lg font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {haddonRoomStory.title}
                  </h4>
                  <p className="text-xs font-sans text-[#666666] line-clamp-2">
                    {haddonRoomStory.subtitle}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#111111]/5 text-[10px] uppercase tracking-wider text-[#888888] flex items-center justify-between">
                  <span>Interior Hotspots</span>
                  <span className="group-hover:text-[#111111] group-hover:translate-x-1 transition-all">Explore Room →</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── FEATURE 04: THE BOOK OF THE MONTH DIGITAL MONOGRAPH ── */}
          <section className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div
              onClick={() => handleOpenStory(bookVol1Story)}
              className="group cursor-pointer bg-white p-8 sm:p-12 md:p-16 border-2 border-[#111111]/15 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8 hover:border-[#111111] transition-all"
            >
              <div className="lg:max-w-xl space-y-4">
                <span className="text-[10px] uppercase tracking-[0.35em] font-sans font-semibold text-[#8A7352] block">
                  07 · THE BOOK OF THE MONTH · COFFEE-TABLE MONOGRAPH
                </span>
                <h3
                  className="text-3xl sm:text-4xl font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors leading-tight"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {bookVol1Story.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#555555] leading-relaxed">
                  {bookVol1Story.subtitle} Four complete illustrated chapters exploring fortress engineering, water pavilions, zenana carvings, and 21st-century conservation.
                </p>
                <div className="pt-2">
                  <span className="inline-block px-8 py-3 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-[0.24em] font-sans font-medium group-hover:bg-[#8A7352] transition-colors">
                    Open Monograph Reader →
                  </span>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full lg:w-96 bg-[#141414] overflow-hidden shadow-lg flex items-center justify-center p-2">
                <div className="relative w-full h-full">
                  <Image
                    src={bookVol1Story.heroImage}
                    alt={bookVol1Story.title}
                    fill
                    sizes="400px"
                    className="object-contain group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── FEATURE 05: THE 10 PERMANENT PRIVATE WORLDS DIRECTORY ── */}
          <section className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.35em] font-sans text-[#8A7352] font-semibold block mb-2">
                The Curatorial Structure
              </span>
              <h3
                className="text-3xl sm:text-4xl font-serif text-[#111111]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                The Ten Private Worlds
              </h3>
              <div className="w-12 h-px mx-auto my-3 bg-[#8A7352]/40" />
              <p className="text-xs font-sans text-[#666666]">
                Forty collectible, verified editorial works preserved for private members.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PRIVATE_WORLDS.map((world) => (
                <div
                  key={world.id}
                  onClick={() => {
                    setActiveTab(world.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group cursor-pointer bg-white p-5 border border-[#111111]/10 hover:border-[#111111] transition-all flex flex-col justify-between h-48"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[#8A7352] text-xs font-semibold block">
                      {world.number}
                    </span>
                    <h4
                      className="text-sm font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {world.title}
                    </h4>
                    <p className="text-[10px] font-serif italic text-[#777777] line-clamp-2">
                      {world.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#111111]/5 flex items-center justify-between text-[10px] font-sans text-[#888888]">
                    <span>4 Works</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ════════════════════════════════════════════════
          04 — DEDICATED INDIVIDUAL WORLD CATEGORY VIEW
          ════════════════════════════════════════════════ */}
      {currentWorldSection && activeTab !== "all" && activeTab !== "credential" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-32 space-y-10">
          {/* Quick Return Navigation */}
          <div className="flex items-center justify-between pb-4 border-b border-[#111111]/10">
            <button
              type="button"
              onClick={() => {
                setActiveTab("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#777777] hover:text-[#111111] transition-colors font-medium"
            >
              <span>← Back to All Worlds</span>
            </button>
            <span className="text-[10px] font-mono text-[#8A7352] uppercase tracking-wider hidden sm:inline">
              Collection No. {currentWorldSection.number}
            </span>
          </div>

          {/* Category Header Masthead */}
          <div className="text-center max-w-3xl mx-auto space-y-3 pb-8 border-b border-[#111111]/15">
            <span className="text-[10px] uppercase tracking-[0.38em] font-sans font-semibold text-[#8A7352]">
              {currentWorldSection.number} · {currentWorldSection.frenchTitle || "Collection Royale"}
            </span>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#111111] leading-tight font-normal"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {currentWorldSection.title}
            </h1>
            <p className="text-xs sm:text-sm font-serif italic text-[#666666] max-w-xl mx-auto">
              {currentWorldSection.description}
            </p>
          </div>

          {/* Timeline Period Filter Bar if in The Royal Timeline */}
          {activeTab === "timeline" && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 pb-4 text-[10px] font-sans uppercase tracking-widest">
              <span className="text-[#8A7352] mr-2">Filter Period:</span>
              {["ALL", "17th Century", "Belle Époque"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTimelinePeriodFilter(p)}
                  className={`px-3 py-1 border transition-colors ${
                    timelinePeriodFilter === p
                      ? "bg-[#111111] text-[#FAF8F5] border-[#111111]"
                      : "bg-white text-[#666666] border-[#111111]/15 hover:border-[#111111]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* The 4 Stories for this World */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentWorldSection.stories
              .filter((st) =>
                activeTab === "timeline" && timelinePeriodFilter !== "ALL"
                  ? st.period.includes(timelinePeriodFilter)
                  : true
              )
              .map((story) => (
                <article
                  key={story.id}
                  onClick={() => handleOpenStory(story)}
                  className="group cursor-pointer bg-white border border-[#111111]/12 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-[#111111] transition-all duration-500"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.28em] font-sans font-semibold text-[#8A7352]">
                        {story.period}
                      </span>
                      {story.accessionId && (
                        <span className="text-[10px] font-mono text-[#777777]">
                          {story.accessionId}
                        </span>
                      )}
                    </div>

                    <div className="relative aspect-[16/10] w-full bg-[#141414] overflow-hidden flex items-center justify-center p-2">
                      <div className="relative w-full h-full">
                        <Image
                          src={story.heroImage}
                          alt={story.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-contain group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <h3
                      className="text-2xl sm:text-3xl font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {story.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-serif italic text-[#555555] leading-relaxed">
                      {story.subtitle}
                    </p>

                    <p className="text-xs font-sans text-[#666666] line-clamp-2 leading-relaxed">
                      {story.intro}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#111111]/10 flex items-center justify-between text-xs font-sans text-[#777777]">
                    <span>{story.location}</span>
                    <span className="text-[#111111] group-hover:text-[#8A7352] group-hover:translate-x-1 transition-all">
                      Read Full Dossier →
                    </span>
                  </div>
                </article>
              ))}
          </div>
        </main>
      )}

      {/* ════════════════════════════════════════════════
          05 — MY CREDENTIAL & DOSSIER (TAB 'credential')
          ════════════════════════════════════════════════ */}
      {activeTab === "credential" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-10 sm:pt-14 pb-32 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 pb-6 border-b border-[#111111]/15">
            <span className="text-[10px] uppercase tracking-[0.35em] font-sans font-semibold text-[#8A7352]">
              Private Member Dossier
            </span>
            <h1
              className="text-3xl sm:text-4xl font-serif text-[#111111]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Credential & Account Settings
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Official Digital Membership Card */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#111111]/12 shadow-sm space-y-6 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold">
                Official Lifetime Membership Credential
              </span>

              {isApproved ? (
                <DigitalMembershipCard
                  fullName={member.fullName}
                  membershipId={member.membershipId}
                  status="ACTIVE"
                />
              ) : (
                <div className="p-8 border border-dashed border-[#8A7352]/40 text-center max-w-md bg-[#FAF8F5]">
                  <span className="text-xs uppercase tracking-widest text-[#8A7352] font-semibold block mb-2">
                    Card Locked Pending Payment Confirmation
                  </span>
                  <p className="text-xs font-sans text-[#666666]">
                    Your card will unlock as soon as your ₹3,999 registration fee is confirmed by the Editorial Office.
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Member Dossier Information */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 border border-[#111111]/12 shadow-sm space-y-6">
              <h3 className="text-xl font-serif text-[#111111]">
                Dossier Summary
              </h3>

              <div className="space-y-3 text-xs font-sans">
                <div className="flex justify-between py-2 border-b border-[#111111]/5">
                  <span className="text-[#777777]">Full Name</span>
                  <span className="font-medium text-[#111111]">{member.fullName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#111111]/5">
                  <span className="text-[#777777]">Permanent Identifier</span>
                  <span className="font-mono font-bold text-[#8A7352]">{member.membershipId}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#111111]/5">
                  <span className="text-[#777777]">Standing</span>
                  <span className="font-medium text-emerald-800">
                    {isApproved ? "Lifetime Member (Active)" : "Pending Verification"}
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
                <div className="flex justify-between py-2">
                  <span className="text-[#777777]">Delivery Address</span>
                  <span className="text-right text-[#111111] max-w-[200px]">
                    {member.address?.street}, {member.address?.city} {member.address?.pincode}
                  </span>
                </div>
              </div>

              {/* Physical Print Volumes Status */}
              <div className="pt-4 border-t border-[#111111]/10">
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#8A7352] font-semibold block mb-2">
                  Annual Print Volumes (3 Issues / Year)
                </span>
                <div className="p-3 bg-[#FAF8F5] border border-[#111111]/10 text-xs font-sans space-y-1">
                  <div className="flex justify-between">
                    <span>Spring Volume I</span>
                    <span className="text-emerald-700 font-semibold">Dispatched</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Summer Volume II</span>
                    <span className="text-[#888888]">In Preparation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Autumn Volume III</span>
                    <span className="text-[#888888]">In Preparation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Desk Story Proposal Form */}
          <section className="bg-white p-8 sm:p-12 border border-[#111111]/12 shadow-sm max-w-4xl mx-auto space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold block">
                Editorial Desk
              </span>
              <h3 className="text-2xl font-serif text-[#111111] mt-1">
                Submit a Heritage Dossier or Story Proposal
              </h3>
              <p className="text-xs font-sans text-[#666666] mt-1">
                Members may submit archival photographs, family histories, and estate dossiers directly to our Senior Curatorial Board for publication consideration.
              </p>
            </div>

            {subMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                {subMsg}
              </div>
            )}

            <form onSubmit={handleSubmitStory} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-sans font-semibold">
                  Story / Subject Title *
                </label>
                <input
                  type="text"
                  required
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="e.g. The Lost 19th-Century Glassware of Mewar"
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-xs text-[#111111] focus:border-[#111111] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-sans font-semibold">
                    Curatorial Category
                  </label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:outline-none"
                  >
                    <option value="Heritage">Heritage</option>
                    <option value="Royalty">Royalty</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Jewellery">Jewellery & Objects</option>
                    <option value="Automobilia">Automobilia</option>
                    <option value="Archives">Archives & Documents</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-sans font-semibold">
                    Internal Reference / Notes
                  </label>
                  <input
                    type="text"
                    value={subNotes}
                    onChange={(e) => setSubNotes(e.target.value)}
                    placeholder="Private collection number, family name, etc."
                    className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-sans font-semibold">
                  Proposal Synopsis & Documentation *
                </label>
                <textarea
                  rows={4}
                  required
                  value={subDesc}
                  onChange={(e) => setSubDesc(e.target.value)}
                  placeholder="Describe the subject, historical period, available visual material, and documented provenance..."
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-xs text-[#111111] focus:border-[#111111] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingStory}
                className="px-8 py-3 bg-[#111111] text-[#FAF8F5] text-xs uppercase tracking-[0.24em] font-sans font-medium hover:bg-[#8A7352] transition-colors"
              >
                {submittingStory ? "Transmitting..." : "Submit to Curatorial Board →"}
              </button>
            </form>
          </section>
        </main>
      )}

      {/* ════════════════════════════════════════════════
          06 — STORY READER MODAL
          ════════════════════════════════════════════════ */}
      <StoryReaderModal
        story={activeStory}
        onClose={handleCloseStory}
        onSelectStory={(s) => handleOpenStory(s)}
      />

      {/* ════════════════════════════════════════════════
          07 — SEARCH OVERLAY
          ════════════════════════════════════════════════ */}
      <PrivateWorldSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectStory={(s) => handleOpenStory(s)}
      />
    </div>
  );
}
