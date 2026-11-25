"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

const C = {
  obsidian: "#11110F",
  charcoal: "#1C1B18",
  forest: "#17261F",
  oxblood: "#4A171B",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

type GalleryGroup = "Correspondence & Archive" | "Residences & Palaces" | "Portraits";

interface EncounterPlate {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag: string;
  galleryGroup: GalleryGroup;
}

const PLATES: EncounterPlate[] = [
  {
    id: "letter",
    src: "/images/encounters/encounter-01.webp",
    alt: "Letter on Umaid Bhawan Palace letterhead from Maharaja Gaj Singh II of Jodhpur to Shri Prathuveer Singh Chundawat, dated 24 October 2026",
    caption: "The original correspondence. Umaid Bhawan Palace, Jodhpur, 24 October 2026.",
    tag: "Plate I · Jodhpur",
    galleryGroup: "Correspondence & Archive",
  },
  {
    id: "devi-bhawan",
    src: "/images/encounters/encounter-02.webp",
    alt: "Seated on the veranda swing at Devi Bhawan, Jodhpur, holding the Autumn Edition 2026 of The Royal Gallerys",
    caption: "On the veranda at Devi Bhawan, Jodhpur, with the Autumn Edition 2026.",
    tag: "Plate II · Devi Bhawan",
    galleryGroup: "Residences & Palaces",
  },
  {
    id: "barmer",
    src: "/images/encounters/encounter-03.webp",
    alt: "Rawat Tribhuwan Singh Ji of Barmer holding the Autumn Edition of The Royal Gallerys before framed family portraits",
    caption: "Rawat Tribhuwan Singh Ji with the Autumn Edition of The Royal Gallerys, Barmer.",
    tag: "Plate III · Barmer",
    galleryGroup: "Portraits",
  },
  {
    id: "pratap-niwas",
    src: "/images/encounters/encounter-04.webp",
    alt: "Pankaj Pratap Singh Ji on the illuminated terrace at Pratap Niwas Palace, Jhalamand, holding the Autumn Edition",
    caption: "Pankaj Pratap Singh Ji on the terrace at Pratap Niwas Palace, Jhalamand, with the Autumn Edition.",
    tag: "Plate IV · Pratap Niwas",
    galleryGroup: "Residences & Palaces",
  },
  {
    id: "veer-vikram",
    src: "/images/encounters/encounter-05.webp",
    alt: "Rajkumar Veer Vikram Singh Ji holding the Autumn Edition of The Royal Gallerys in Jodhpur",
    caption: "Rajkumar Veer Vikram Singh Ji with the Autumn Edition of The Royal Gallerys.",
    tag: "Plate V · Jodhpur",
    galleryGroup: "Portraits",
  },
  {
    id: "kesar-bhawan",
    src: "/images/encounters/encounter-06.webp",
    alt: "Maharaj Daivat Singh Ji seated at Kesar Bhawan Palace beneath a gilt-framed portrait and the 1917 Princes photograph",
    caption: "Maharaj Daivat Singh Ji at Kesar Bhawan Palace, beneath a portrait in a gilt frame and the 1917 photograph of the Conference of Ruling Princes and Chiefs.",
    tag: "Plate VI · Mount Abu",
    galleryGroup: "Portraits",
  },
  {
    id: "princes-1917",
    src: "/images/encounters/encounter-07.webp",
    alt: "Framed sepia group photograph titled The Conference of Ruling Princes and Chiefs, Delhi, 1917",
    caption: "The Conference of Ruling Princes and Chiefs, Delhi, 1917. Photograph by F. Bremner, Simla & Lahore.",
    tag: "Plate VII · 1917 Archive",
    galleryGroup: "Correspondence & Archive",
  },
  {
    id: "shillinglee-1908",
    src: "/images/encounters/encounter-08.webp",
    alt: "Framed watercolour portrait of a nobleman in a vermilion turban, inscribed at dinner, May 19, 1908, at Shillinglee Park, Sussex",
    caption: "A watercolour study, inscribed \"at dinner, May 19, 1908, at Shillinglee Park, Sussex\".",
    tag: "Plate VIII · 1908 Study",
    galleryGroup: "Correspondence & Archive",
  },
];

const GALLERY_FILTERS: ("All" | GalleryGroup)[] = [
  "All",
  "Residences & Palaces",
  "Portraits",
  "Correspondence & Archive",
];

const CHAPTER_INDEX = [
  { num: "I", href: "#encounter-letter", title: "A Letter from Jodhpur", sub: "Correspondence" },
  { num: "II", href: "#encounter-devi-bhawan", title: "Devi Bhawan", sub: "The Residences" },
  { num: "III", href: "#encounter-barmer", title: "Barmer", sub: "People & Homelands" },
  { num: "IV", href: "#encounter-pratap-niwas", title: "Pratap Niwas", sub: "Art of Collecting" },
  { num: "V", href: "#encounter-distinguished", title: "Rajkumar Veer Vikram Singh Ji", sub: "Distinguished Encounters" },
  { num: "VI", href: "#encounter-kesar-bhawan", title: "Kesar Bhawan Palace", sub: "Heritage of Sirohi" },
];

const NOTED_BY_HH = [
  {
    roman: "i.",
    title: "The reign",
    body: "Railway connectivity, irrigation, administration and institution-building.",
  },
  {
    roman: "ii.",
    title: "The portrait",
    body: "The cover portrait capturing the dignity of the House of Marwar.",
  },
  {
    roman: "iii.",
    title: "The journey",
    body: "An editorial undertaking described as meaningful, with good wishes for its future.",
  },
];

const BARMER_CRAFTS = [
  { title: "Block printing", desc: "Ajrakh & resist-dyed natural indigo and madder prints." },
  { title: "Needlework", desc: "Dense embroidery, mirror-work and appliqué textiles." },
  { title: "Pottery", desc: "Earthenware for cooling and storing water in daily use." },
  { title: "Carved wood", desc: "Doors and chests echoing regional desert stone carving." },
];

const BARMER_TIMELINE = [
  { era: "14th c.", note: "Rawal Mallinath; Mallani" },
  { era: "Juna", note: "Rawat Lunka & Rawal Mandalak" },
  { era: "1552", note: "Rawat Bhima founds Barmer" },
  { era: "Today", note: "Rawat Tribhuwan Singh Ji" },
];

function Kicker({ num, label, light = true }: { num: string; label: string; light?: boolean }) {
  const accent = light ? C.champagne : C.bronze;
  return (
    <div className="flex flex-wrap items-center gap-2.5 mb-3">
      <span className="font-serif italic text-sm" style={{ color: accent }}>
        {num}
      </span>
      <span className="w-7 h-px" style={{ background: accent, opacity: 0.55 }} />
      <span
        className="text-[10px] uppercase tracking-[0.26em] font-sans font-medium"
        style={{ color: accent }}
      >
        {label}
      </span>
    </div>
  );
}

function FactGrid({
  rows,
  light = true,
}: {
  rows: { label: string; value: string }[];
  light?: boolean;
}) {
  const border = light ? "rgba(220,205,176,0.18)" : "rgba(24,23,20,0.14)";
  const accent = light ? C.champagne : C.bronze;
  const text = light ? C.ivory : C.textDeep;

  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-3" style={{ borderTop: `1px solid ${border}` }}>
      {rows.map((r) => (
        <div key={r.label} className="pb-2.5" style={{ borderBottom: `1px solid ${border}` }}>
          <dt className="text-[9px] uppercase tracking-[0.22em] font-sans font-medium" style={{ color: accent }}>
            {r.label}
          </dt>
          <dd className="text-xs sm:text-sm font-serif leading-snug mt-0.5" style={{ color: text }}>
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function PlateButton({
  plateId,
  onOpen,
  className = "",
  imgClassName = "w-full h-auto max-h-[52vh] object-contain mx-auto block",
  lightCaption = true,
}: {
  plateId: string;
  onOpen: (id: string) => void;
  className?: string;
  imgClassName?: string;
  lightCaption?: boolean;
}) {
  const plate = PLATES.find((p) => p.id === plateId);
  if (!plate) return null;

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => onOpen(plate.id)}
        className="group block w-full text-left cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B8A47A]"
        aria-label={`Enlarge photograph: ${plate.caption}`}
      >
        <img
          src={plate.src}
          alt={plate.alt}
          loading="lazy"
          className={`${imgClassName} transition-transform duration-700 ease-out group-hover:scale-[1.015]`}
        />
      </button>
      <figcaption
        className="mt-2.5 pl-3 text-xs font-serif italic leading-snug"
        style={{
          color: lightCaption ? "rgba(244,240,231,0.75)" : "rgba(24,23,20,0.72)",
          borderLeft: `1px solid ${lightCaption ? C.champagne : C.bronze}`,
        }}
      >
        {plate.caption}
      </figcaption>
    </figure>
  );
}

export default function RoyalEncountersSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<"All" | GalleryGroup>("All");
  const lightboxIndexRef = useRef<number | null>(null);
  const pushedHistoryRef = useRef(false);

  useEffect(() => {
    lightboxIndexRef.current = lightboxIndex;
  }, [lightboxIndex]);

  const galleryPlates =
    galleryFilter === "All"
      ? PLATES
      : PLATES.filter((p) => p.galleryGroup === galleryFilter);

  const openPlate = (id: string) => {
    const idx = PLATES.findIndex((p) => p.id === id);
    if (idx === -1) return;
    if (typeof window !== "undefined" && lightboxIndexRef.current === null && !pushedHistoryRef.current) {
      pushedHistoryRef.current = true;
      window.history.pushState(
        { ...(window.history.state ?? {}), royalEncounterPlate: id },
        "",
        `${window.location.pathname}${window.location.search}${window.location.hash}`
      );
    }
    setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    if (typeof window !== "undefined" && pushedHistoryRef.current) {
      pushedHistoryRef.current = false;
      window.history.back();
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (pushedHistoryRef.current || lightboxIndexRef.current !== null) {
        pushedHistoryRef.current = false;
        setLightboxIndex(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  const prevPlate = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + PLATES.length) % PLATES.length)),
    []
  );
  const nextPlate = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % PLATES.length)),
    []
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPlate();
      if (e.key === "ArrowRight") nextPlate();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, prevPlate, nextPlate]);

  const activePlate = lightboxIndex !== null ? PLATES[lightboxIndex] : null;

  return (
    <div id="the-royal-encounters" className="scroll-mt-16 sm:scroll-mt-20">
      {/* ════════════════════════════════════════════════
          04 — OPENING CHRONICLE (Compact Single-Screen)
          ════════════════════════════════════════════════ */}
      <section
        className="py-14 sm:py-20 px-6 sm:px-8 md:px-12 lg:px-16 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(85% 55% at 50% 0%, rgba(74,23,27,0.52) 0%, rgba(17,17,15,0) 70%), #11110F",
          color: C.ivory,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="flex flex-wrap items-baseline justify-between gap-4 pb-3 mb-10"
            style={{ borderBottom: "1px solid rgba(184,164,122,0.3)" }}
          >
            <span className="font-serif text-xs tracking-[0.26em] uppercase" style={{ color: C.champagne }}>
              The Royal Gallerys · Inaugural Print Dispatch
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-medium" style={{ color: C.champagne }}>
              03 — The Royal Encounters
            </span>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="block text-[10px] uppercase tracking-[0.38em] font-sans mb-2" style={{ color: C.champagne }}>
              The Royal
            </span>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-serif italic leading-[0.95] tracking-tight mb-4"
              style={{ color: C.ivory, fontWeight: 400 }}
            >
              Encounters
            </h2>
            <p className="text-base sm:text-xl font-serif italic leading-relaxed" style={{ color: "#DCCDB0" }}>
              When our inaugural Autumn Edition 2026 left the press — an intimate chronicle of distinguished personalities, living heritage and remarkable residences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto mb-10 text-sm leading-relaxed">
            <p className="font-serif text-base sm:text-lg" style={{ color: C.ivory }}>
              Beyond the pages of our first edition, a journey through the people, places and legacies that give heritage its living voice.
            </p>
            <p className="font-sans text-xs sm:text-sm" style={{ color: "rgba(244,240,231,0.75)" }}>
              We arrived in person with our inaugural Autumn Edition 2026, sat with families in the rooms they have kept, looked through their albums and archives, and recorded each visit as a living chronicle.
            </p>
          </div>

          <nav aria-label="The Royal Encounters chapters" className="max-w-5xl mx-auto">
            <ol
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ borderTop: "1px solid rgba(184,164,122,0.3)" }}
            >
              {CHAPTER_INDEX.map((ch) => (
                <li
                  key={ch.num}
                  style={{
                    borderBottom: "1px solid rgba(184,164,122,0.2)",
                    borderRight: "1px solid rgba(184,164,122,0.14)",
                  }}
                >
                  <a
                    href={ch.href}
                    className="group flex items-baseline gap-3 px-4 py-3.5 transition-colors duration-300 hover:bg-white/[0.04]"
                  >
                    <span className="font-serif italic text-lg shrink-0" style={{ color: C.champagne }}>
                      {ch.num}
                    </span>
                    <span className="block">
                      <span className="block font-serif text-base sm:text-lg text-[#F4F0E7] group-hover:text-[#B8A47A] transition-colors">
                        {ch.title}
                      </span>
                      <span className="block text-[9px] uppercase tracking-[0.22em] font-sans text-[#DCCDB0]/65">
                        {ch.sub}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CHAPTER I — A LETTER FROM JODHPUR (Ivory)
          ════════════════════════════════════════════════ */}
      <article
        id="encounter-letter"
        className="py-12 sm:py-16 px-6 sm:px-8 md:px-12 lg:px-16 scroll-mt-16"
        style={{ background: C.ivory, color: C.textDeep }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <div
              className="p-4 sm:p-5 shadow-xl"
              style={{
                background: C.oxblood,
                outline: "1px solid rgba(184,164,122,0.45)",
                outlineOffset: "-8px",
              }}
            >
              <PlateButton
                plateId="letter"
                onOpen={openPlate}
                imgClassName="w-full h-auto max-h-[50vh] object-contain mx-auto block"
                lightCaption={true}
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <Kicker num="Chapter I" label="Correspondence · Jodhpur" light={false} />
            <h3 className="text-3xl sm:text-4xl font-serif leading-tight" style={{ color: "#4A171B", fontWeight: 400 }}>
              A Letter from Jodhpur
            </h3>
            <p className="text-base sm:text-lg font-serif italic leading-snug" style={{ color: "#5D4B40" }}>
              Correspondence from His Highness Maharaja Gaj Singh II of Jodhpur, following our Autumn Edition 2026 cover feature on Maharaja Jaswant Singh II.
            </p>

            <div className="space-y-3 text-sm font-sans leading-relaxed" style={{ color: C.textDeep }}>
              <p>
                On 24 October 2026 a letter arrived from Umaid Bhawan Palace, written by His Highness Maharaja Gaj Singh II of Jodhpur to our Founder and Editor, Shri Prathuveer Singh Chundawat, acknowledging the Autumn Edition 2026 and its feature on Maharaja Jaswant Singh II (r. 1873–1895).
              </p>
              <p>
                His Highness remarked on the achievements set out — railway connectivity, irrigation, administration and institution-building — and noted that the portrait captured the dignity of the House of Marwar.
              </p>
            </div>

            <blockquote className="py-3 pl-4 border-l-2 border-[#B8A47A]">
              <p className="text-base sm:text-lg font-serif italic" style={{ color: "#4A171B" }}>
                &ldquo;Wishing our team every success in developing The Royal Gallerys into a respected international publication dedicated to our heritage and culture.&rdquo;
              </p>
              <footer className="mt-1 text-[9px] uppercase tracking-[0.22em] font-sans" style={{ color: C.bronze }}>
                — H.H. Maharaja Gaj Singh II of Jodhpur, 24 October 2026
              </footer>
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#181714]/15">
              {NOTED_BY_HH.map((item) => (
                <div key={item.roman} className="text-xs font-sans">
                  <span className="font-serif italic text-sm mr-1.5" style={{ color: C.bronze }}>{item.roman}</span>
                  <strong className="font-serif text-sm font-normal" style={{ color: "#4A171B" }}>{item.title}:</strong>{" "}
                  <span className="text-[#4A463F]">{item.body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* ════════════════════════════════════════════════
          CHAPTER II — DEVI BHAWAN (Heritage Forest)
          ════════════════════════════════════════════════ */}
      <article
        id="encounter-devi-bhawan"
        className="py-12 sm:py-16 px-6 sm:px-8 md:px-12 lg:px-16 scroll-mt-16"
        style={{ background: C.forest, color: C.ivory }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <PlateButton
              plateId="devi-bhawan"
              onOpen={openPlate}
              imgClassName="w-full h-auto max-h-[54vh] object-contain mx-auto block bg-[#0D1813]"
              lightCaption={true}
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <Kicker num="Chapter II" label="The Residences · Jodhpur" light={true} />
            <h3 className="text-3xl sm:text-4xl font-serif leading-tight" style={{ color: C.ivory, fontWeight: 400 }}>
              Devi Bhawan
            </h3>
            <p className="text-base sm:text-lg font-serif italic" style={{ color: "#DCCDB0" }}>
              A Heritage Residence with a Garden Soul
            </p>

            <div className="space-y-3 text-sm font-sans leading-relaxed" style={{ color: "rgba(244,240,231,0.85)" }}>
              <p>
                Set in Ratanada, close to the centre of Jodhpur, Devi Bhawan was established in 1916 as a family residence. Its architecture balances the verandas of a colonial bungalow with Rajasthani sandstone detailing — now a family-run heritage hotel of twenty-four rooms where the family still lives.
              </p>
              <p>
                Mature trees, meandering paths, a lotus fountain and pool divide the gardens in quiet privacy. Photographed on its shaded veranda beneath white stone jali screens, our host holds the inaugural Autumn Edition in a heritage home still lived in today.
              </p>
            </div>

            <FactGrid
              light={true}
              rows={[
                { label: "Established", value: "1916, as a family residence" },
                { label: "Setting", value: "Ratanada, Jodhpur" },
                { label: "Architecture", value: "Indian & colonial British sandstone" },
                { label: "Today", value: "Family-run heritage house of 24 rooms" },
              ]}
            />
          </div>
        </div>
      </article>

      {/* ════════════════════════════════════════════════
          CHAPTER III — BARMER (Cream)
          ════════════════════════════════════════════════ */}
      <article
        id="encounter-barmer"
        className="py-12 sm:py-16 px-6 sm:px-8 md:px-12 lg:px-16 scroll-mt-16"
        style={{ background: C.cream, color: C.textDeep }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="p-2.5 bg-[#FAF8F4] border border-[#8A7352]/40 shadow-lg">
              <PlateButton
                plateId="barmer"
                onOpen={openPlate}
                imgClassName="w-full h-auto max-h-[44vh] object-contain mx-auto block"
                lightCaption={false}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#181714]/15">
              {BARMER_TIMELINE.map((t) => (
                <div key={t.era}>
                  <span className="block font-serif italic text-sm" style={{ color: C.bronze }}>{t.era}</span>
                  <p className="text-[11px] font-sans text-[#181714] leading-snug">{t.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <Kicker num="Chapter III" label="People & Homelands · Barmer" light={false} />
            <h3 className="text-3xl sm:text-4xl font-serif leading-tight" style={{ color: "#4A171B", fontWeight: 400 }}>
              Barmer — A Land of Living Traditions
            </h3>
            <p className="text-base sm:text-lg font-serif italic" style={{ color: "#5D4B40" }}>
              In Conversation with Rawat Tribhuwan Singh Ji
            </p>

            <div className="space-y-3 text-sm font-sans leading-relaxed" style={{ color: C.textDeep }}>
              <p>
                Known as Mallani after the fourteenth-century warrior-saint Rawal Mallinath, Barmer&apos;s desert scarcity shaped extraordinary living crafts. Rathore rule began at Juna under Rawat Lunka and Rawal Mandalak before Rawat Bhima founded Barmer in 1552.
              </p>
              <p>
                We met Rawat Tribhuwan Singh Ji, the present Rawat of Barmer, and presented him with our Autumn Edition — recognising that heritage survival rests on the people who keep its customs and makers in view.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-3 border-t border-[#181714]/15">
              {BARMER_CRAFTS.map((craft) => (
                <div key={craft.title}>
                  <h4 className="text-base font-serif" style={{ color: "#4A171B" }}>{craft.title}</h4>
                  <p className="text-xs font-sans text-[#4A463F] leading-snug">{craft.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* ════════════════════════════════════════════════
          CHAPTER IV — PRATAP NIWAS (Charcoal Night)
          ════════════════════════════════════════════════ */}
      <article
        id="encounter-pratap-niwas"
        className="py-12 sm:py-16 px-6 sm:px-8 md:px-12 lg:px-16 scroll-mt-16"
        style={{ background: C.charcoal, color: C.ivory }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <PlateButton
              plateId="pratap-niwas"
              onOpen={openPlate}
              imgClassName="w-full h-auto max-h-[54vh] object-contain mx-auto block bg-[#0D1117]"
              lightCaption={true}
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <Kicker num="Chapter IV" label="The Art of Collecting · Jhalamand" light={true} />
            <h3 className="text-3xl sm:text-4xl font-serif leading-tight" style={{ color: C.ivory, fontWeight: 400 }}>
              Pratap Niwas
              <span className="block text-lg sm:text-xl italic mt-1" style={{ color: C.champagne }}>
                An Encounter with Pankaj Pratap Singh Ji at Jhalamand
              </span>
            </h3>

            <div className="space-y-4 pt-3 border-t border-[#DCCDB0]/15 text-sm font-sans leading-relaxed" style={{ color: "rgba(244,240,231,0.82)" }}>
              <div>
                <h4 className="font-serif text-lg text-[#F4F0E7] mb-1">The Palace</h4>
                <p>Ten kilometres from Jodhpur among khejri trees and rural Marwar, Pratap Niwas pairs lit scalloped arches and domed cupolas with a living village landscape near Singasni&apos;s potters and winter bird lakes.</p>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#F4F0E7] mb-1">The Automobiles</h4>
                <p>Pankaj Pratap Singh Ji maintains a working collection of antique motor cars — including a documented 1929 Chrysler in which guests may still ride.</p>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#F4F0E7] mb-1">The Horses &amp; Our Encounter</h4>
                <p>He also keeps horses and mares in the Marwar equestrian tradition, and personally showed our team the palace and collection on the night terrace with the Autumn Edition.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ════════════════════════════════════════════════
          CHAPTER V — DISTINGUISHED ENCOUNTERS (Ivory)
          ════════════════════════════════════════════════ */}
      <article
        id="encounter-distinguished"
        className="py-12 sm:py-16 px-6 sm:px-8 md:px-12 lg:px-16 scroll-mt-16"
        style={{ background: C.ivory, color: C.textDeep }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <div
              className="p-3 sm:p-4 bg-[#FAF8F4] shadow-xl"
              style={{
                border: "1px solid rgba(138,115,82,0.45)",
                outline: "1px solid rgba(138,115,82,0.22)",
                outlineOffset: "-6px",
              }}
            >
              <PlateButton
                plateId="veer-vikram"
                onOpen={openPlate}
                imgClassName="w-full h-auto max-h-[50vh] object-contain mx-auto block"
                lightCaption={false}
              />
            </div>
          </div>

          <div className="md:col-span-5 space-y-4">
            <Kicker num="Chapter V" label="Distinguished Encounters" light={false} />
            <h3 className="text-3xl sm:text-4xl font-serif leading-tight" style={{ color: "#4A171B", fontWeight: 400 }}>
              Rajkumar Veer Vikram Singh Ji
            </h3>
            <p className="text-base sm:text-lg font-serif italic leading-relaxed" style={{ color: "#5D4B40" }}>
              We met Rajkumar Veer Vikram Singh Ji in Jodhpur, where he was photographed with the inaugural Autumn Edition of The Royal Gallerys.
            </p>
          </div>
        </div>
      </article>

      {/* ════════════════════════════════════════════════
          CHAPTER VI — KESAR BHAWAN PALACE (Oxblood)
          ════════════════════════════════════════════════ */}
      <article
        id="encounter-kesar-bhawan"
        className="py-12 sm:py-16 px-6 sm:px-8 md:px-12 lg:px-16 scroll-mt-16"
        style={{ background: C.oxblood, color: C.ivory }}
      >
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="p-3 border border-[#B8A47A]/45 bg-[#14090B]/35">
                <PlateButton
                  plateId="kesar-bhawan"
                  onOpen={openPlate}
                  imgClassName="w-full h-auto max-h-[50vh] object-contain mx-auto block"
                  lightCaption={true}
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <Kicker num="Chapter VI" label="The Heritage of Sirohi · Mount Abu" light={true} />
              <h3 className="text-3xl sm:text-4xl font-serif leading-tight" style={{ color: C.ivory, fontWeight: 400 }}>
                Kesar Bhawan Palace
                <span className="block text-lg sm:text-xl italic mt-1" style={{ color: C.champagne }}>
                  Discovering the Heritage of Sirohi in Mount Abu
                </span>
              </h3>

              <div className="space-y-3 text-sm font-sans leading-relaxed" style={{ color: "rgba(244,240,231,0.88)" }}>
                <p>
                  Brought into the domain of Sirohi by Maharao Lumbha in 1311, Mount Abu rises 1,200 metres above the plains. Built in 1868 by H.H. Maharajadhiraj Maharao Umed Singhji above Nakki Lake, Kesar Bhawan is the oldest palace on the hill — kept today by Maharaj Daivat Singh Ji as an eco-friendly heritage hotel across seven acres of century-old gardens.
                </p>
                <p>
                  Maharaj Sahib received our team personally and guided us through the palace&apos;s archival treasures — including the 1917 Delhi Conference of Ruling Princes and Chiefs photograph and historic family portraits.
                </p>
              </div>

              <FactGrid
                light={true}
                rows={[
                  { label: "Built", value: "1868, by H.H. Maharao Umed Singhji" },
                  { label: "Setting", value: "Sunset Road, Mount Abu, above Nakki Lake" },
                  { label: "Grounds", value: "7 acres of gardens & century-old trees" },
                  { label: "Today", value: "Eco-friendly family-kept heritage hotel" },
                ]}
              />
            </div>
          </div>

          {/* Compact Archival Vitrine */}
          <div
            className="p-4 sm:p-6"
            style={{
              background: "rgba(17,17,15,0.32)",
              border: "1px solid rgba(184,164,122,0.35)",
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold pb-3 mb-4 border-b border-[#DCCDB0]/20" style={{ color: C.champagne }}>
              From the Archive at Kesar Bhawan
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-8">
                <PlateButton
                  plateId="princes-1917"
                  onOpen={openPlate}
                  imgClassName="w-full h-auto max-h-[30vh] object-contain mx-auto block"
                  lightCaption={true}
                />
              </div>
              <div className="md:col-span-4">
                <PlateButton
                  plateId="shillinglee-1908"
                  onOpen={openPlate}
                  imgClassName="w-full h-auto max-h-[30vh] object-contain mx-auto block"
                  lightCaption={true}
                />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ════════════════════════════════════════════════
          05 — THE GALLERY (All 8 Plates)
          ════════════════════════════════════════════════ */}
      <section
        id="encounter-gallery"
        className="py-14 sm:py-20 px-6 sm:px-8 md:px-12 lg:px-16 scroll-mt-16"
        style={{ background: C.cream, color: C.textDeep }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span
              className="block text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium font-sans mb-3"
              style={{ color: C.bronze }}
            >
              04 — The Visual Chronicle
            </span>
            <h2
              className="text-3xl sm:text-5xl font-serif leading-tight tracking-tight mb-3"
              style={{ color: "#4A171B", fontWeight: 400 }}
            >
              The Royal Gallery
            </h2>
            <p className="text-sm sm:text-base font-serif italic" style={{ color: "#5D4B40" }}>
              Every photograph, portrait, and archival plate from our inaugural dispatch — click any frame to inspect in full detail.
            </p>
            <hr
              className="border-0 mx-auto mt-6"
              style={{ width: 64, height: 1, background: "rgba(138,115,82,0.4)" }}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
            {GALLERY_FILTERS.map((group) => {
              const active = galleryFilter === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setGalleryFilter(group)}
                  className="px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-colors cursor-pointer"
                  style={{
                    background: active ? C.obsidian : "transparent",
                    color: active ? C.ivory : C.bronze,
                    border: active ? `1px solid ${C.obsidian}` : "1px solid rgba(138,115,82,0.35)",
                  }}
                >
                  {group === "All" ? `All Plates (${PLATES.length})` : group}
                </button>
              );
            })}
          </div>

          {/* Uncropped Editorial Masonry Gallery */}
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-5">
            {galleryPlates.map((plate) => (
              <figure
                key={plate.id}
                className="break-inside-avoid mb-5 p-3 bg-[#FAF8F4] border border-[#8A7352]/30 hover:border-[#8A7352] transition-all duration-300 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => openPlate(plate.id)}
                  className="group block w-full text-left cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8A7352]"
                  aria-label={`Enlarge ${plate.tag}: ${plate.caption}`}
                >
                  <img
                    src={plate.src}
                    alt={plate.alt}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </button>
                <figcaption className="pt-2.5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-semibold" style={{ color: C.bronze }}>
                      {plate.tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => openPlate(plate.id)}
                      className="text-[9px] uppercase tracking-[0.18em] font-sans text-[#5D4B40] hover:text-[#181714] cursor-pointer"
                    >
                      View ↗
                    </button>
                  </div>
                  <p className="text-xs font-serif italic leading-snug text-[#4A463F]">
                    {plate.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CLOSING SEAL (Compact Obsidian)
          ════════════════════════════════════════════════ */}
      <section
        className="py-14 sm:py-20 px-6 sm:px-8 md:px-12 text-center"
        style={{
          background:
            "radial-gradient(85% 65% at 50% 100%, rgba(74,23,27,0.45) 0%, rgba(17,17,15,0) 70%), #11110F",
          color: C.ivory,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px" style={{ background: "rgba(184,164,122,0.5)" }} />
            <span className="text-xs" style={{ color: C.champagne }}>◆</span>
            <span className="w-12 h-px" style={{ background: "rgba(184,164,122,0.5)" }} />
          </div>

          <p className="text-xl sm:text-3xl font-serif italic leading-[1.3]" style={{ color: C.ivory }}>
            Every encounter reveals a story. Every residence preserves a legacy.
            <span className="block mt-1.5" style={{ color: "#DCCDB0" }}>
              And every conversation brings us closer to the living heritage of our world.
            </span>
          </p>

          <p className="mt-8 text-xs uppercase tracking-[0.36em] font-serif" style={{ color: C.champagne }}>
            The Royal Gallerys · International Chronicles of Heritage
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          INTERACTIVE PHOTOGRAPH LIGHTBOX
          ════════════════════════════════════════════════ */}
      {activePlate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(14,7,9,0.96)" }}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Back to Home Page"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] font-sans border border-[#B8A47A]/50 text-[#DCCDB0] bg-[#11110F]/80 hover:bg-[#B8A47A] hover:text-[#11110F] transition-colors cursor-pointer"
          >
            ✕ Close
          </button>
          <div
            className="max-w-5xl w-full flex flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePlate.src}
              alt={activePlate.alt}
              className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl border border-[#B8A47A]/25"
            />
            <p className="font-serif italic text-base sm:text-lg text-center max-w-2xl" style={{ color: "#DCCDB0" }}>
              {activePlate.caption}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevPlate}
                aria-label="Previous photograph"
                className="px-4 py-2 text-xs uppercase tracking-[0.22em] font-sans border border-[#B8A47A]/50 text-[#DCCDB0] hover:bg-[#B8A47A] hover:text-[#11110F] transition-colors cursor-pointer"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={closeLightbox}
                className="px-5 py-2 text-xs uppercase tracking-[0.22em] font-sans border border-[#B8A47A]/50 text-[#DCCDB0] hover:bg-[#B8A47A] hover:text-[#11110F] transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={nextPlate}
                aria-label="Next photograph"
                className="px-4 py-2 text-xs uppercase tracking-[0.22em] font-sans border border-[#B8A47A]/50 text-[#DCCDB0] hover:bg-[#B8A47A] hover:text-[#11110F] transition-colors cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
