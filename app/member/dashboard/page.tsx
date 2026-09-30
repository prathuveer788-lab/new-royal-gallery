"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrivateNavigation, { NavView } from "@/app/components/membership/PrivateNavigation";
import PrivateWorldTransition from "@/app/components/membership/PrivateWorldTransition";
import CollectionsDiscoveryDrawer from "@/app/components/membership/CollectionsDiscoveryDrawer";
import ObjectEditorialModal from "@/app/components/membership/ObjectEditorialModal";
import EditorialStoryModal from "@/app/components/membership/EditorialStoryModal";
import SubmitYourWorld from "@/app/components/membership/SubmitYourWorld";
import MyArchive from "@/app/components/membership/MyArchive";
import PrivateCatalogSearch from "@/app/components/membership/PrivateCatalogSearch";
import AdaptiveImageFrame from "@/app/components/membership/AdaptiveImageFrame";
import {
  CuratedObject,
  EditorialStory,
  WorldId,
  WORLD_DEFINITIONS,
  getAllCuratedObjects,
  getObjectById,
  getObjectsByWorld,
  getFeaturedHeroObject,
  getEditorialTriptych,
  getAllEditorialStories,
} from "@/lib/membership/private-collections-data";
import type { SafeMember, EditorialSubmission } from "@/lib/membership/store";

export default function MemberPrivateWorldPage() {
  const router = useRouter();

  // Authentication & Member Data
  const [member, setMember] = useState<SafeMember | null>(null);
  const [loading, setLoading] = useState(true);

  // Transition Gate
  const [showTransition, setShowTransition] = useState(true);

  // Navigation State
  const [activeView, setActiveView] = useState<NavView>("discover");
  const [selectedWorld, setSelectedWorld] = useState<WorldId | "all">("all");
  const [collectionsDrawerOpen, setCollectionsDrawerOpen] = useState(false);

  // Reader Modals
  const [activeObject, setActiveObject] = useState<CuratedObject | null>(null);
  const [activeStory, setActiveStory] = useState<EditorialStory | null>(null);

  // Search Modal
  const [searchOpen, setSearchOpen] = useState(false);

  // Personal Archive (Saved objects & stories)
  const [savedObjectIds, setSavedObjectIds] = useState<string[]>([]);
  const [savedStoryIds, setSavedStoryIds] = useState<string[]>([]);
  const [submissions, setSubmissions] = useState<EditorialSubmission[]>([]);

  // Fetch Member Session
  useEffect(() => {
    async function initSession() {
      try {
        const res = await fetch("/api/member/me");
        if (!res.ok) {
          router.replace("/member/login");
          return;
        }
        const data = await res.json();
        setMember(data.member);

        // Fetch member submissions
        const dataRes = await fetch("/api/admin/data");
        if (dataRes.ok) {
          const allData = await dataRes.json();
          const userSubs = (allData.submissions || []).filter(
            (s: EditorialSubmission) => s.memberEmail === data.member.email
          );
          setSubmissions(userSubs);
        }

        // Initialize transition seen check
        const seen = sessionStorage.getItem("rg_private_access_transition");
        if (seen === "true") {
          setShowTransition(false);
        }

        // Load saved items from localStorage
        try {
          const savedObj = localStorage.getItem("rg_saved_objects");
          if (savedObj) setSavedObjectIds(JSON.parse(savedObj));
          const savedSt = localStorage.getItem("rg_saved_stories");
          if (savedSt) setSavedStoryIds(JSON.parse(savedSt));
        } catch {}
      } catch {
        router.replace("/member/login");
      } finally {
        setLoading(false);
      }
    }

    initSession();
  }, [router]);

  // Handle URL hash and popstate for modals (so browser back closes reader!)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#object-")) {
        const objId = hash.replace("#object-", "");
        const obj = getObjectById(objId);
        if (obj) {
          setActiveObject(obj);
          setActiveStory(null);
          return;
        }
      } else if (hash.startsWith("#story-")) {
        const storyId = hash.replace("#story-", "");
        const allStories = getAllEditorialStories();
        const found = allStories.find((s) => s.id === storyId || s.slug === storyId);
        if (found) {
          setActiveStory(found);
          setActiveObject(null);
          return;
        }
      }
      setActiveObject(null);
      setActiveStory(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Modal Open Handlers with History Push
  const handleOpenObject = (obj: CuratedObject) => {
    setActiveObject(obj);
    setActiveStory(null);
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: "object", id: obj.id }, "", `#object-${obj.id}`);
    }
  };

  const handleCloseObject = () => {
    setActiveObject(null);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#object-")) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const handleOpenStory = (story: EditorialStory) => {
    setActiveStory(story);
    setActiveObject(null);
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: "story", id: story.id }, "", `#story-${story.id}`);
    }
  };

  const handleCloseStory = () => {
    setActiveStory(null);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#story-")) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  // Toggle Save Object
  const handleToggleSaveObject = (objId: string) => {
    setSavedObjectIds((prev) => {
      const exists = prev.includes(objId);
      const next = exists ? prev.filter((id) => id !== objId) : [...prev, objId];
      try {
        localStorage.setItem("rg_saved_objects", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await fetch("/api/member/logout", { method: "POST" });
    } catch {}
    sessionStorage.removeItem("rg_private_access_transition");
    router.push("/member/login");
  };

  // Profile update
  const handleUpdateProfile = async (payload: any) => {
    const res = await fetch("/api/member/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update failed");
    if (data.member) setMember(data.member);
  };

  // Memoized Curated Data
  const heroObject = useMemo(() => getFeaturedHeroObject(), []);
  const triptychObjects = useMemo(() => getEditorialTriptych(), []);
  const allStories = useMemo(() => getAllEditorialStories(), []);
  const currentWorldDef = useMemo(
    () => WORLD_DEFINITIONS.find((w) => w.id === selectedWorld),
    [selectedWorld]
  );
  const currentWorldObjects = useMemo(
    () =>
      selectedWorld === "all" ? getAllCuratedObjects() : getObjectsByWorld(selectedWorld),
    [selectedWorld]
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F7F5F0] flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#C5A880] block">
            ROYAL GALLERYS
          </span>
          <h2
            className="text-2xl font-serif text-[#F7F5F0]"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Entering Private Collections...
          </h2>
        </div>
      </div>
    );
  }

  if (!member) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F7F5F0] selection:bg-[#C5A880] selection:text-[#050505]">
      {/* ════════════════════════════════════════════════
          01 — CINEMATIC LOGIN TRANSITION SEQUENCE
          ════════════════════════════════════════════════ */}
      {showTransition && (
        <PrivateWorldTransition
          memberName={member.fullName}
          membershipId={member.membershipId}
          onComplete={() => {
            setShowTransition(false);
            sessionStorage.setItem("rg_private_access_transition", "true");
          }}
        />
      )}

      {/* ════════════════════════════════════════════════
          02 — TOP-LEVEL MINIMAL NAVIGATION
          ════════════════════════════════════════════════ */}
      <PrivateNavigation
        activeView={activeView}
        onSelectView={(v) => {
          setActiveView(v);
          setCollectionsDrawerOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        memberName={member.fullName}
        membershipId={member.membershipId}
        onOpenSearch={() => setSearchOpen(true)}
        onToggleCollectionsDrawer={() => setCollectionsDrawerOpen(!collectionsDrawerOpen)}
        collectionsDrawerOpen={collectionsDrawerOpen}
        onSignOut={handleSignOut}
      />

      {/* ════════════════════════════════════════════════
          03 — EXPANDABLE COLLECTIONS DISCOVERY DRAWER
          ════════════════════════════════════════════════ */}
      <CollectionsDiscoveryDrawer
        isOpen={collectionsDrawerOpen}
        onClose={() => setCollectionsDrawerOpen(false)}
        selectedWorld={selectedWorld}
        onSelectWorld={(worldId) => {
          setSelectedWorld(worldId);
          setActiveView("collections");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* ════════════════════════════════════════════════
          04 — MAIN VIEW CANVAS
          ════════════════════════════════════════════════ */}
      <div className="pt-24 sm:pt-28 pb-32">
        {/* ── VIEW: DISCOVER (The Main Uncluttered Entry Experience) ── */}
        {activeView === "discover" && (
          <main className="space-y-20 sm:space-y-32">
            {/* 01. MONUMENTAL MASTERWORK (HERO FOCAL POINT) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-mono text-[#C5A880] block">
                  CURATED MONUMENT OF GRAVITY · ARCHIVAL ACQUISITION
                </span>
                <h1
                  className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#F7F5F0] leading-[0.98] tracking-tight font-normal"
                  style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                >
                  The Private Collection
                </h1>
                <div className="w-16 h-px bg-[#C5A880]/40 mx-auto my-3" />
                <p className="text-sm sm:text-lg font-serif italic text-[#A8A49C] leading-relaxed">
                  Rare masterworks of couture, horology, gemmes, coachbuilt automobilia and dynastic archives.
                </p>
              </div>

              {/* Masterwork Hero Card */}
              <div
                onClick={() => handleOpenObject(heroObject)}
                className="group relative cursor-pointer bg-[#0A0A0A] border border-[#222222] hover:border-[#C5A880] transition-all duration-700 shadow-2xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* Left Column: Visual with Adaptive Frame */}
                  <div className="lg:col-span-7 bg-[#0E0E0E] p-4 sm:p-8 flex items-center justify-center">
                    <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden">
                      <Image
                        src={heroObject.image}
                        alt={heroObject.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-contain transition-transform duration-1000 group-hover:scale-102"
                      />
                    </div>
                  </div>

                  {/* Right Column: High-Fashion Curatorial Essay Deck */}
                  <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#C5A880] uppercase tracking-[0.3em]">
                      <span>{heroObject.worldNumber} · {heroObject.worldTitle}</span>
                      <span>{heroObject.accessionOrRef}</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#AAAAAA] block">
                        {heroObject.house}
                      </span>
                      <h2
                        className="text-2xl sm:text-4xl font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-tight font-normal"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {heroObject.title}
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base font-serif italic text-[#A8A49C] leading-relaxed">
                      {heroObject.subtitle}
                    </p>

                    <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between">
                      <span className="text-xs font-mono text-[#F7F5F0]">
                        {heroObject.price.amountINR}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] group-hover:translate-x-1 transition-transform">
                        Inspect Piece →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 02. THE CURATORIAL TRIPTYCH (THREE WORLDS, THREE WORKS) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
              <div className="flex items-end justify-between border-b border-[#1C1C1C] pb-4">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block">
                    SELECTION DE LA SEMAINE
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-serif text-[#F7F5F0] mt-1"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    The Curatorial Triptych
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedWorld("all");
                    setActiveView("collections");
                  }}
                  className="text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#C5A880] transition-colors hidden sm:block"
                >
                  Explore All Collections →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {triptychObjects.map((obj) => (
                  <article
                    key={obj.id}
                    onClick={() => handleOpenObject(obj)}
                    className="group cursor-pointer bg-[#0A0A0A] border border-[#1C1C1C] hover:border-[#C5A880] transition-all p-6 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Image container respecting orientation */}
                      <div className="relative aspect-square w-full bg-[#0E0E0E] overflow-hidden flex items-center justify-center p-3 border border-[#1A1A1A]">
                        <div className="relative w-full h-full">
                          <Image
                            src={obj.image}
                            alt={obj.title}
                            fill
                            sizes="400px"
                            className="object-contain group-hover:scale-103 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[8px] font-mono text-[#C5A880] uppercase tracking-wider">
                          <span>{obj.house}</span>
                          <span className="text-[#666666]">{obj.worldNumber}</span>
                        </div>

                        <h4
                          className="text-lg font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2"
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                        >
                          {obj.title}
                        </h4>

                        <p className="text-xs font-serif italic text-[#888888] line-clamp-2 leading-relaxed">
                          {obj.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#181818] flex items-center justify-between text-[10px] font-mono text-[#777777]">
                      <span className="truncate max-w-[160px]">{obj.price.amountINR}</span>
                      <span className="group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all">
                        Inspect →
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* 03. DEEP READING HIGHLIGHT (EDITORIAL DOSSIER SPREAD) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8">
              {allStories[0] && (
                <div
                  onClick={() => handleOpenStory(allStories[0])}
                  className="group cursor-pointer bg-[#0A0A0A] border border-[#222222] hover:border-[#C5A880] p-8 sm:p-14 transition-all duration-500 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl"
                >
                  <div className="lg:max-w-xl space-y-4">
                    <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#C5A880] block">
                      FEATURED CURATORIAL DOSSIER · {allStories[0].readTime}
                    </span>

                    <h3
                      className="text-2xl sm:text-4xl font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-tight"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {allStories[0].title}
                    </h3>

                    <p className="text-sm font-serif italic text-[#A8A49C] leading-relaxed">
                      {allStories[0].subtitle}
                    </p>

                    <div className="pt-2">
                      <span className="inline-block px-8 py-3 bg-[#161616] group-hover:bg-[#F7F5F0] text-[#F7F5F0] group-hover:text-[#050505] text-xs font-mono uppercase tracking-[0.25em] font-medium transition-colors">
                        Read Full Dossier →
                      </span>
                    </div>
                  </div>

                  <div className="relative aspect-[16/10] w-full lg:w-[480px] bg-[#0E0E0E] overflow-hidden border border-[#222222] flex items-center justify-center p-3">
                    <div className="relative w-full h-full">
                      <Image
                        src={allStories[0].heroImage}
                        alt={allStories[0].title}
                        fill
                        sizes="500px"
                        className="object-contain group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 04. PROGRESSIVE GATEWAY: 9 WORLDS IN SILENCE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="p-8 sm:p-12 bg-[#080808] border border-[#1A1A1A] text-center space-y-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A880] block">
                  ARCHITECTURAL DISCOVERY SYSTEM
                </span>

                <h3
                  className="text-2xl sm:text-3xl font-serif text-[#F7F5F0]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Nine Curatorial Worlds Preserved in Silence
                </h3>

                <p className="text-xs sm:text-sm font-serif italic text-[#888888] max-w-xl mx-auto">
                  Fashion, Horology, High Jewellery, Automobilia, Objets de Vertu, Dynastic Heritage,
                  Historical Arms, Monumental Art, and Sanctuaries.
                </p>

                <div>
                  <button
                    type="button"
                    onClick={() => setCollectionsDrawerOpen(true)}
                    className="px-8 py-3.5 border border-[#333333] hover:border-[#C5A880] text-xs font-mono uppercase tracking-[0.25em] text-[#CCCCCC] hover:text-[#F7F5F0] transition-all"
                  >
                    Open Progressive Collections Drawer ▾
                  </button>
                </div>
              </div>
            </section>
          </main>
        )}

        {/* ── VIEW: COLLECTIONS (The 9 Worlds & Objects Grid) ── */}
        {activeView === "collections" && (
          <main className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
            {/* World Category Filter Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C] overflow-x-auto gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedWorld("all")}
                  className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border transition-all ${
                    selectedWorld === "all"
                      ? "bg-[#C5A880] text-[#050505] border-[#C5A880] font-semibold"
                      : "bg-[#0E0E0E] text-[#888888] border-[#1C1C1C] hover:text-white"
                  }`}
                >
                  All ({getAllCuratedObjects().length})
                </button>

                {WORLD_DEFINITIONS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setSelectedWorld(w.id)}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border whitespace-nowrap transition-all ${
                      selectedWorld === w.id
                        ? "bg-[#C5A880] text-[#050505] border-[#C5A880] font-semibold"
                        : "bg-[#0E0E0E] text-[#888888] border-[#1C1C1C] hover:text-white"
                    }`}
                  >
                    {w.number} {w.title}
                  </button>
                ))}
              </div>
            </div>

            {/* World Masthead if a specific category is chosen */}
            {currentWorldDef && selectedWorld !== "all" && (
              <div className="p-8 sm:p-12 bg-[#0A0A0A] border border-[#1C1C1C] space-y-3">
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#C5A880] block">
                  WORLD NO. {currentWorldDef.number} · {currentWorldDef.frenchTitle}
                </span>

                <h1
                  className="text-3xl sm:text-5xl font-serif text-[#F7F5F0] font-normal"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {currentWorldDef.title}
                </h1>

                <p className="text-sm sm:text-base font-serif italic text-[#A8A49C] max-w-2xl">
                  {currentWorldDef.description}
                </p>
              </div>
            )}

            {/* Objects Grid (Respecting natural image framing) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {currentWorldObjects.map((obj) => (
                <article
                  key={obj.id}
                  onClick={() => handleOpenObject(obj)}
                  className="group cursor-pointer bg-[#0A0A0A] border border-[#1C1C1C] hover:border-[#C5A880] transition-all p-6 sm:p-7 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#C5A880]">
                      <span>{obj.house}</span>
                      <span className="text-[#666666]">{obj.accessionOrRef}</span>
                    </div>

                    {/* Image container respecting orientation */}
                    <div className="relative aspect-[4/3] w-full bg-[#0E0E0E] overflow-hidden flex items-center justify-center p-3 border border-[#181818]">
                      <div className="relative w-full h-full">
                        <Image
                          src={obj.image}
                          alt={obj.title}
                          fill
                          sizes="450px"
                          className="object-contain group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Title & Deck */}
                    <div className="space-y-1.5">
                      <h3
                        className="text-lg sm:text-xl font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {obj.title}
                      </h3>

                      <p className="text-xs font-serif italic text-[#888888] line-clamp-2 leading-relaxed">
                        {obj.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="pt-4 border-t border-[#181818] flex items-center justify-between text-[10px] font-mono text-[#777777]">
                    <span className="truncate max-w-[180px]">{obj.price.amountINR}</span>
                    <span className="group-hover:text-[#C5A880] group-hover:translate-x-1 transition-all">
                      Inspect Dossier →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </main>
        )}

        {/* ── VIEW: STORIES (Editorial Dossiers) ── */}
        {activeView === "stories" && (
          <main className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3 pb-8 border-b border-[#1C1C1C]">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A880] block">
                EDITORIAL INVESTIGATIONS & ARCHIVES
              </span>
              <h1
                className="text-3xl sm:text-5xl font-serif text-[#F7F5F0] font-normal"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Curatorial Stories
              </h1>
              <div className="w-16 h-px bg-[#C5A880]/40 mx-auto my-3" />
              <p className="text-sm sm:text-base font-serif italic text-[#A8A49C] leading-relaxed">
                Substantial monographs exploring royal provenance, vanishing craft techniques, and
                historic collector mysteries.
              </p>
            </div>

            <div className="space-y-8">
              {allStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => handleOpenStory(story)}
                  className="group cursor-pointer bg-[#0A0A0A] border border-[#1C1C1C] hover:border-[#C5A880] p-6 sm:p-10 transition-all flex flex-col md:flex-row items-center justify-between gap-8"
                >
                  <div className="space-y-3 max-w-xl">
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A880] block">
                      {story.category} · {story.readTime}
                    </span>

                    <h2
                      className="text-2xl sm:text-3xl font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {story.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-serif italic text-[#888888] leading-relaxed">
                      {story.subtitle}
                    </p>

                    <div className="pt-2 text-[10px] font-mono text-[#666666]">
                      <span>{story.publishedDate}</span>
                    </div>
                  </div>

                  <div className="relative aspect-[16/10] w-full md:w-80 bg-[#0E0E0E] overflow-hidden border border-[#222222] shrink-0 p-2 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={story.heroImage}
                        alt={story.title}
                        fill
                        sizes="320px"
                        className="object-contain group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* ── VIEW: ARCHIVE (My Archive & Folio) ── */}
        {activeView === "archive" && (
          <MyArchive
            member={member}
            savedObjectIds={savedObjectIds}
            savedStoryIds={savedStoryIds}
            submissions={submissions}
            onSelectObject={handleOpenObject}
            onSelectStory={handleOpenStory}
            onRemoveSavedObject={(id) => handleToggleSaveObject(id)}
            onRemoveSavedStory={(id) => {
              setSavedStoryIds((prev) => prev.filter((stId) => stId !== id));
            }}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {/* ── VIEW: SUBMIT (Submit Your World Portal) ── */}
        {activeView === "submit" && (
          <SubmitYourWorld
            memberName={member.fullName}
            membershipId={member.membershipId}
            onSubmissionSuccess={(newSub) => {
              setSubmissions((prev) => [newSub, ...prev]);
            }}
          />
        )}

        {/* ── VIEW: PROFILE (Direct Dossier Settings) ── */}
        {activeView === "profile" && (
          <MyArchive
            member={member}
            savedObjectIds={savedObjectIds}
            savedStoryIds={savedStoryIds}
            submissions={submissions}
            onSelectObject={handleOpenObject}
            onSelectStory={handleOpenStory}
            onRemoveSavedObject={(id) => handleToggleSaveObject(id)}
            onRemoveSavedStory={(id) => {
              setSavedStoryIds((prev) => prev.filter((stId) => stId !== id));
            }}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </div>

      {/* ════════════════════════════════════════════════
          05 — OBJECT EDITORIAL MODAL
          ════════════════════════════════════════════════ */}
      <ObjectEditorialModal
        object={activeObject}
        onClose={handleCloseObject}
        onSelectObject={(obj) => handleOpenObject(obj)}
        isSaved={activeObject ? savedObjectIds.includes(activeObject.id) : false}
        onToggleSave={handleToggleSaveObject}
      />

      {/* ════════════════════════════════════════════════
          06 — EDITORIAL STORY MODAL
          ════════════════════════════════════════════════ */}
      <EditorialStoryModal
        story={activeStory}
        onClose={handleCloseStory}
        onSelectObject={(obj) => handleOpenObject(obj)}
      />

      {/* ════════════════════════════════════════════════
          07 — LIGHTNING CATALOG SEARCH OVERLAY
          ════════════════════════════════════════════════ */}
      <PrivateCatalogSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectObject={(obj) => handleOpenObject(obj)}
      />
    </div>
  );
}
