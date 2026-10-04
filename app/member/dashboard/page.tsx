"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PrivateNavigation, { NavView } from "@/app/components/membership/PrivateNavigation";
import PrivateWorldTransition from "@/app/components/membership/PrivateWorldTransition";
import CollectionsDiscoveryDrawer from "@/app/components/membership/CollectionsDiscoveryDrawer";
import CatalogDetailModal from "@/app/components/membership/CatalogDetailModal";
import ArchiveView from "@/app/components/membership/ArchiveView";
import MemberProfileView from "@/app/components/membership/MemberProfileView";
import EditorialStoryModal from "@/app/components/membership/EditorialStoryModal";
import SubmitYourWorld from "@/app/components/membership/SubmitYourWorld";
import PrivateCatalogSearch from "@/app/components/membership/PrivateCatalogSearch";

import {
  CATALOG_CATEGORIES,
  CATALOG_ITEMS,
  CatalogItem,
  getCatalogItemById,
} from "@/lib/membership/private-world-catalog";

import {
  EditorialStory,
  getAllEditorialStories,
  getStoryById,
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [catalogSearch, setCatalogSearch] = useState<string>("");
  const [collectionsDrawerOpen, setCollectionsDrawerOpen] = useState(false);

  // Modals
  const [activeCatalogItem, setActiveCatalogItem] = useState<CatalogItem | null>(null);
  const [activeStory, setActiveStory] = useState<EditorialStory | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Member Saved State
  const [savedCatalogIds, setSavedCatalogIds] = useState<string[]>([]);
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

        // If not authenticated or member missing, redirect to login
        if (!data.authenticated || !data.member) {
          router.replace("/member/login");
          return;
        }

        setMember(data.member);

        // Fetch member submissions — guarded so crash here won't block dashboard
        try {
          const dataRes = await fetch("/api/admin/data");
          if (dataRes.ok) {
            const allData = await dataRes.json();
            const userSubs = (allData.submissions || []).filter(
              (s: EditorialSubmission) =>
                data.member?.email && s.memberEmail === data.member.email
            );
            setSubmissions(userSubs);
          }
        } catch (subErr) {
          console.warn("[Dashboard] Could not load submissions:", subErr);
          // Non-fatal — dashboard still loads
        }

        // Initialize transition seen check
        try {
          const seen = sessionStorage.getItem("rg_private_access_transition");
          if (seen === "true") {
            setShowTransition(false);
          }
        } catch {}

        // Load saved items from localStorage
        try {
          const savedCat = localStorage.getItem("rg_saved_catalog_items");
          if (savedCat) setSavedCatalogIds(JSON.parse(savedCat));
          const savedSt = localStorage.getItem("rg_saved_stories");
          if (savedSt) setSavedStoryIds(JSON.parse(savedSt));
        } catch {}

      } catch (err) {
        console.error("[Dashboard] Session init error:", err);
        router.replace("/member/login");
      } finally {
        setLoading(false);
      }
    }

    initSession();
  }, [router]);

  // Handle URL hash and popstate for modals (so browser back closes modal cleanly)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#catalog-")) {
        const itemId = hash.replace("#catalog-", "");
        const item = getCatalogItemById(itemId);
        if (item) {
          setActiveCatalogItem(item);
          setActiveStory(null);
          return;
        }
      } else if (hash.startsWith("#story-")) {
        const storyId = hash.replace("#story-", "");
        const allStories = getAllEditorialStories();
        const found = allStories.find((s) => s.id === storyId || s.slug === storyId);
        if (found) {
          setActiveStory(found);
          setActiveCatalogItem(null);
          return;
        }
      }
      setActiveCatalogItem(null);
      setActiveStory(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Modal Open Handlers with History Push
  const handleOpenCatalogItem = useCallback((item: CatalogItem) => {
    setActiveCatalogItem(item);
    setActiveStory(null);
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: "catalog", id: item.id }, "", `#catalog-${item.id}`);
    }
  }, []);

  const handleCloseCatalogItem = useCallback(() => {
    setActiveCatalogItem(null);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#catalog-")) {
      window.history.pushState(null, "", window.location.pathname);
    }
  }, []);

  const handleOpenStory = useCallback((story: EditorialStory) => {
    setActiveStory(story);
    setActiveCatalogItem(null);
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: "story", id: story.id }, "", `#story-${story.id}`);
    }
  }, []);

  const handleCloseStory = useCallback(() => {
    setActiveStory(null);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#story-")) {
      window.history.pushState(null, "", window.location.pathname);
    }
  }, []);

  // Toggle Save Catalog Item
  const handleToggleSaveCatalogItem = useCallback((itemId: string) => {
    setSavedCatalogIds((prev) => {
      const exists = prev.includes(itemId);
      const next = exists ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      try {
        localStorage.setItem("rg_saved_catalog_items", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  // Toggle Save Story
  const handleToggleSaveStory = useCallback((storyId: string) => {
    setSavedStoryIds((prev) => {
      const exists = prev.includes(storyId);
      const next = exists ? prev.filter((id) => id !== storyId) : [...prev, storyId];
      try {
        localStorage.setItem("rg_saved_stories", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  // Sign out
  const handleSignOut = async () => {
    try {
      await fetch("/api/member/logout", { method: "POST" });
    } catch {}
    sessionStorage.removeItem("rg_private_access_transition");
    router.push("/member/login");
  };

  // Profile update handler
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

  // Reset subcategory & brand when category changes
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory("All");
    setSelectedBrand("All");
  };

  // Current category definition
  const currentCategoryDef = useMemo(() => {
    if (selectedCategory === "all") return null;
    return CATALOG_CATEGORIES.find((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  // Available brands in the current category
  const availableBrands = useMemo(() => {
    const sourceItems =
      selectedCategory === "all"
        ? CATALOG_ITEMS
        : CATALOG_ITEMS.filter((i) => i.category === selectedCategory);
    const set = new Set<string>();
    sourceItems.forEach((i) => set.add(i.brand));
    return ["All", ...Array.from(set)];
  }, [selectedCategory]);

  // Filtered Catalog Items
  const filteredCatalogItems = useMemo(() => {
    let list = CATALOG_ITEMS;

    if (selectedCategory !== "all") {
      list = list.filter((i) => i.category === selectedCategory);
    }

    if (selectedSubcategory !== "All") {
      list = list.filter((i) => i.subcategory.toLowerCase() === selectedSubcategory.toLowerCase());
    }

    if (selectedBrand !== "All") {
      list = list.filter((i) => i.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase().trim();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.brand.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.subcategory.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, selectedSubcategory, selectedBrand, catalogSearch]);

  // Featured spotlight piece (Chanel / Patek / Rolls)
  const spotlightItem = useMemo(() => CATALOG_ITEMS[0], []);

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
          02 — TOP-LEVEL PRIVATE NAVIGATION
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
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          handleSelectCategory(catId);
          setActiveView("collections");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* ════════════════════════════════════════════════
          04 — MAIN VIEW CANVAS
          ════════════════════════════════════════════════ */}
      <div className="pt-24 sm:pt-28 pb-32">
        {/* ── VIEW: DISCOVER (Primary Luxury Discovery Experience) ── */}
        {activeView === "discover" && (
          <main className="space-y-16 sm:space-y-24">
            {/* 01. EDITORIAL HEADER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.45em] font-mono text-[#C5A880] block">
                  CONTEMPORARY LUXURY & LIVING HERITAGE
                </span>
                <h1
                  className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#F7F5F0] leading-[0.98] tracking-tight font-normal"
                  style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                >
                  The Private Discovery
                </h1>
                <div className="w-16 h-px bg-[#C5A880]/40 mx-auto my-3" />
                <p className="text-sm sm:text-base font-serif italic text-[#A8A49C] leading-relaxed">
                  One hundred peerless creations across fashion, high jewellery, haute horlogerie,
                  coachbuilds, bespoke firearms, and dynastic collections.
                </p>
              </div>

              {/* Spotlight Hero Card */}
              {spotlightItem && (
                <div
                  onClick={() => handleOpenCatalogItem(spotlightItem)}
                  className="group relative cursor-pointer bg-[#0A0A0A] border border-[#222222] hover:border-[#C5A880] transition-all duration-700 shadow-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    {/* Left Column: Image Stage */}
                    <div className="lg:col-span-7 bg-[#0E0E0E] p-4 sm:p-8 flex items-center justify-center">
                      <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden">
                        <Image
                          src={spotlightItem.heroImage}
                          alt={spotlightItem.name}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 600px"
                          className="object-contain transition-transform duration-1000 group-hover:scale-102"
                        />
                      </div>
                    </div>

                    {/* Right Column: Curatorial Dossier */}
                    <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#C5A880] uppercase tracking-[0.3em]">
                        <span>01 · {spotlightItem.category.toUpperCase()}</span>
                        <span>{spotlightItem.subcategory}</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#AAAAAA] block">
                          {spotlightItem.brand}
                        </span>
                        <h2
                          className="text-2xl sm:text-4xl font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-tight font-normal"
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                        >
                          {spotlightItem.name}
                        </h2>
                      </div>

                      <p className="text-sm sm:text-base font-serif italic text-[#A8A49C] leading-relaxed">
                        &ldquo;{spotlightItem.editorialNote}&rdquo;
                      </p>

                      <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between">
                        <span className="text-sm font-mono text-[#C5A880]">
                          {spotlightItem.price}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] group-hover:translate-x-1 transition-transform">
                          Inspect Folio & Multi-Angle Rail →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 02. CATEGORY DISCOVERY STRIP (10 CATEGORIES) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
              <div className="flex items-end justify-between border-b border-[#1C1C1C] pb-3">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block">
                    THE TEN EDITORIAL CATEGORIES
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-serif text-[#F7F5F0]"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    Select an Atelier or Field of Craft
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleSelectCategory("all");
                    setActiveView("collections");
                  }}
                  className="text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#C5A880] transition-colors hidden sm:block"
                >
                  View Complete 100 Creations →
                </button>
              </div>

              {/* 10 Category Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {CATALOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      handleSelectCategory(cat.id);
                      setActiveView("collections");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-left p-4 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#C5A880] transition-all group flex flex-col justify-between h-36"
                  >
                    <div>
                      <div className="flex justify-between items-center text-[9px] font-mono text-[#C5A880]">
                        <span>{cat.number}</span>
                        <span className="text-[#666666]">10 Pieces</span>
                      </div>
                      <h4
                        className="text-xs sm:text-sm font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-tight mt-1.5"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {cat.title}
                      </h4>
                    </div>

                    <div className="text-[9px] font-mono text-[#777777] flex items-center justify-between pt-2 border-t border-[#141414]">
                      <span className="truncate">{cat.subcategories[1] || "All"}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 03. CURATED SELECTIONS ACROSS WORLDS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
              <div className="flex items-end justify-between border-b border-[#1C1C1C] pb-3">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block">
                    SELECTION DE LA MAISON
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-serif text-[#F7F5F0]"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    Curated Highlights
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#777777]">
                  Showing 8 of 100 Creations
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {CATALOG_ITEMS.slice(0, 8).map((item) => (
                  <article
                    key={item.id}
                    onClick={() => handleOpenCatalogItem(item)}
                    className="group cursor-pointer bg-[#0A0A0A] border border-[#1C1C1C] hover:border-[#C5A880] transition-all p-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[4/3] w-full bg-[#070707] overflow-hidden border border-[#161616] p-2">
                        <Image
                          src={item.heroImage}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-contain p-1 group-hover:scale-104 transition-transform duration-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider text-[#C5A880]">
                          <span className="truncate">{item.brand}</span>
                          <span className="text-[#666666]">{item.subcategory}</span>
                        </div>

                        <h4
                          className="text-sm font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2"
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                        >
                          {item.name}
                        </h4>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#141414] flex items-center justify-between text-[10px] font-mono text-[#888888]">
                      <span className="truncate max-w-[130px] text-[#CCCCCC]">{item.price}</span>
                      <span className="text-[#C5A880] group-hover:translate-x-1 transition-transform">
                        Inspect →
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
        )}

        {/* ── VIEW: COLLECTIONS (Complete 100-Item Catalog Discovery Engine) ── */}
        {activeView === "collections" && (
          <main className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
            {/* Category Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[#1C1C1C]">
              <button
                type="button"
                onClick={() => handleSelectCategory("all")}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border whitespace-nowrap transition-all ${
                  selectedCategory === "all"
                    ? "bg-[#C5A880] text-black border-[#C5A880] font-semibold"
                    : "bg-[#0E0E0E] text-[#888888] border-[#1C1C1C] hover:text-white"
                }`}
              >
                All (100)
              </button>

              {CATALOG_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#C5A880] text-black border-[#C5A880] font-semibold"
                      : "bg-[#0E0E0E] text-[#888888] border-[#1C1C1C] hover:text-white"
                  }`}
                >
                  {cat.number} {cat.title.split("&")[0].trim()}
                </button>
              ))}
            </div>

            {/* Category Masthead (when specific category chosen) */}
            {currentCategoryDef && (
              <div className="p-6 sm:p-10 bg-[#0A0A0A] border border-[#1C1C1C] space-y-3">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#C5A880] uppercase tracking-[0.3em]">
                  <span>CATEGORY {currentCategoryDef.number}</span>
                  <span>10 CURATED CREATIONS</span>
                </div>
                <h1
                  className="text-2xl sm:text-4xl font-serif text-[#F7F5F0]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {currentCategoryDef.title}
                </h1>
                <p className="text-xs sm:text-sm font-serif italic text-[#A8A49C] max-w-3xl leading-relaxed">
                  {currentCategoryDef.descriptor}
                </p>
              </div>
            )}

            {/* Granular Filters: Subcategory + Brand + Search Input */}
            <div className="p-4 bg-[#090909] border border-[#1A1A1A] space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Search by brand, model, material, or keyword..."
                    className="w-full bg-[#121212] border border-[#282828] px-4 py-2 text-xs font-mono text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none placeholder:text-[#666666]"
                  />
                  {catalogSearch && (
                    <button
                      type="button"
                      onClick={() => setCatalogSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#666666] hover:text-white font-mono"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Brand Filter */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
                  <span className="uppercase text-[10px] tracking-wider text-[#666666]">Brand:</span>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="bg-[#121212] border border-[#282828] text-xs font-mono text-[#F7F5F0] px-3 py-1.5 focus:border-[#C5A880] focus:outline-none"
                  >
                    {availableBrands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Counter */}
                <div className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider">
                  Displaying {filteredCatalogItems.length} of {CATALOG_ITEMS.length} Creations
                </div>
              </div>

              {/* Subcategories (if in a specific category) */}
              {currentCategoryDef && (
                <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#141414]">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#666666] shrink-0">
                    Subcategory:
                  </span>
                  {currentCategoryDef.subcategories.map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider border whitespace-nowrap transition-all ${
                        selectedSubcategory === sub
                          ? "bg-[#222222] text-[#F7F5F0] border-[#C5A880]"
                          : "bg-transparent text-[#777777] border-transparent hover:text-white"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Catalog Grid */}
            {filteredCatalogItems.length === 0 ? (
              <div className="p-16 text-center bg-[#090909] border border-[#1A1A1A] space-y-3">
                <p className="text-sm font-serif text-[#777777]">
                  No items matched your filter criteria in this category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubcategory("All");
                    setSelectedBrand("All");
                    setCatalogSearch("");
                  }}
                  className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#C5A880] border border-[#2B2B2B]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCatalogItems.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => handleOpenCatalogItem(item)}
                    className="group cursor-pointer bg-[#0A0A0A] border border-[#1C1C1C] hover:border-[#C5A880] transition-all p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-4">
                      {/* Brand & Subcategory Header */}
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#C5A880] uppercase tracking-wider">
                        <span className="font-semibold">{item.brand}</span>
                        <span className="text-[#666666]">{item.subcategory}</span>
                      </div>

                      {/* Image Stage */}
                      <div className="relative aspect-[4/3] w-full bg-[#070707] overflow-hidden border border-[#181818] p-3 flex items-center justify-center">
                        <Image
                          src={item.heroImage}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain p-2 group-hover:scale-104 transition-transform duration-500"
                        />
                        {/* Multi-angle indicator pill */}
                        {item.gallery && item.gallery.length > 1 && (
                          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 border border-white/10 text-[8px] font-mono text-[#AAAAAA]">
                            {item.gallery.length} Views
                          </div>
                        )}
                      </div>

                      {/* Title & Short Editorial */}
                      <div className="space-y-1.5">
                        <h3
                          className="text-base sm:text-lg font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2"
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                        >
                          {item.name}
                        </h3>

                        <p className="text-xs font-serif italic text-[#888888] line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Info: Price + CTA */}
                    <div className="pt-3 border-t border-[#161616] flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#CCCCCC] truncate max-w-[170px]">{item.price}</span>
                      <span className="text-[#C5A880] group-hover:translate-x-1 transition-transform">
                        Inspect Piece →
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        )}

        {/* ── VIEW: STORIES (Editorial Investigations) ── */}
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
              {getAllEditorialStories().map((story) => (
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

        {/* ── VIEW: ARCHIVE (Editorial Publication Memory: Issues & Monographs) ── */}
        {activeView === "archive" && (
          <ArchiveView
            onSelectStory={handleOpenStory}
            onOpenSubmit={() => {
              setActiveView("submit");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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

        {/* ── VIEW: PROFILE (Member Sanctuary & Credentials & Dispatch) ── */}
        {activeView === "profile" && (
          <MemberProfileView
            member={member}
            savedCatalogIds={savedCatalogIds}
            savedStoryIds={savedStoryIds}
            submissions={submissions}
            onSelectCatalogItem={handleOpenCatalogItem}
            onSelectStory={handleOpenStory}
            onRemoveSavedCatalogItem={handleToggleSaveCatalogItem}
            onRemoveSavedStory={handleToggleSaveStory}
            onUpdateProfile={handleUpdateProfile}
            onNavigateToDiscover={() => {
              setActiveView("collections");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNavigateToSubmit={() => {
              setActiveView("submit");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </div>

      {/* ════════════════════════════════════════════════
          05 — CATALOG DETAIL MODAL (MULTI-IMAGE GALLERY)
          ════════════════════════════════════════════════ */}
      <CatalogDetailModal
        item={activeCatalogItem}
        onClose={handleCloseCatalogItem}
        onSelectItem={(item) => handleOpenCatalogItem(item)}
        isSaved={activeCatalogItem ? savedCatalogIds.includes(activeCatalogItem.id) : false}
        onToggleSave={handleToggleSaveCatalogItem}
      />

      {/* ════════════════════════════════════════════════
          06 — EDITORIAL STORY MODAL
          ════════════════════════════════════════════════ */}
      <EditorialStoryModal
        story={activeStory}
        onClose={handleCloseStory}
        onSelectObject={(obj) => {
          // If related object matches a catalog item, open it
          const found = CATALOG_ITEMS.find((c) => c.id === obj.id || c.name === obj.title);
          if (found) {
            handleOpenCatalogItem(found);
          }
        }}
      />

      {/* ════════════════════════════════════════════════
          07 — LIGHTNING CATALOG SEARCH OVERLAY
          ════════════════════════════════════════════════ */}
      <PrivateCatalogSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectCatalogItem={handleOpenCatalogItem}
        onSelectStory={handleOpenStory}
      />
    </div>
  );
}
