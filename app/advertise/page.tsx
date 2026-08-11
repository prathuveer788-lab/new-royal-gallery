import type { Metadata } from "next";
import MediaKitForm from "../components/MediaKitForm";

export const metadata: Metadata = {
  title: "Advertise With The Royal Gallerys | Luxury Heritage Media",
  description:
    "Connect your brand with India's most discerning audience. Download our media kit, rate card, and editorial calendar to explore advertising opportunities.",
};

const C = {
  obsidian: "#11110F",
  charcoal: "#1C1B18",
  forest: "#17261F",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

const AD_FORMATS = [
  {
    title: "Full-Page Print",
    description:
      "Premium placement in our quarterly print edition distributed to 50,000+ UHNI households, palace hotels, and private members' clubs.",
    icon: "📰",
  },
  {
    title: "Sponsored Content",
    description:
      "Bespoke editorial features that tell your brand's story through the lens of heritage, craftsmanship, and luxury — written by our editorial team.",
    icon: "✍️",
  },
  {
    title: "Digital Feature",
    description:
      "Dedicated digital placements on theroyalgallerys.com reaching 180,000+ monthly readers, with performance analytics included.",
    icon: "💻",
  },
  {
    title: "Event Partnership",
    description:
      "Co-host exclusive heritage experiences — palace dinners, curator-led tours, and private showcases — positioning your brand at the center of culture.",
    icon: "🥂",
  },
  {
    title: "Custom Partnership",
    description:
      "Tailored collaborations: branded photo essays, heritage preservation funding with brand attribution, AI-powered archival projects, and more.",
    icon: "✨",
  },
];

const AUDIENCE_STATS = [
  { value: "180K+", label: "Monthly Digital Readers" },
  { value: "50K+", label: "Print Circulation" },
  { value: "₹45L+", label: "Avg. Reader Household Income" },
  { value: "72%", label: "C-Suite / Business Owners" },
  { value: "42", label: "Countries Reached" },
  { value: "8.4 min", label: "Avg. Time on Page" },
];

export default function AdvertisePage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* ════════════ HERO ════════════ */}
      <section className="relative pt-36 sm:pt-44 md:pt-52 pb-16 sm:pb-20 md:pb-28 px-6 sm:px-8 md:px-12 lg:px-16 text-center overflow-hidden" style={{ background: C.obsidian }}>
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block text-[10px]/[11px] uppercase tracking-[0.22em] font-medium mb-8 font-sans" style={{ color: C.champagne }}>
            Partnerships
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.06] mb-6 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            Your Brand, in the<br />Company of Royalty
          </h1>
          <p className="text-base sm:text-lg font-sans font-normal leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: C.textStone }}>
            The Royal Gallerys connects luxury brands with India&apos;s most affluent, culturally engaged audience —
            a community of decision-makers, collectors, and tastemakers who define what comes next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#media-kit"
              className="inline-block px-10 py-4 transition-colors text-xs sm:text-sm uppercase tracking-[0.22em] font-medium font-sans"
              style={{ background: C.bronze, color: C.ivory, border: `1px solid ${C.bronze}` }} >
              Download Media Kit
            </a>
            <a
              href="mailto:hey.theroyalgallerys@gmail.com"
              className="inline-block px-10 py-4 transition-colors text-xs sm:text-sm uppercase tracking-[0.22em] font-medium font-sans"
              style={{ color: C.ivory, border: `1px solid ${C.bronze}` }} >
              Contact Partnerships
            </a>
          </div>
        </div>
      </section>

      {/* ════════════ AUDIENCE ════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[10px]/[11px] uppercase tracking-[0.22em] font-medium mb-6 font-sans" style={{ color: C.bronze }}>
              Our Audience
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-5 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
              India&apos;s Most Discerning Readers
            </h2>
            <p className="text-sm sm:text-base font-sans font-normal leading-relaxed max-w-xl mx-auto" style={{ color: C.textStone }}>
              Not just reach. Relevance. Every reader is someone your brand wants to meet.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {AUDIENCE_STATS.map((stat) => (
              <div key={stat.label} className="text-center p-6 transition-colors" style={{ border: `1px solid rgba(138,115,82,0.35)` }}>
                <div className="text-2xl sm:text-3xl font-serif mb-2 tracking-tight" style={{ color: C.bronze, fontWeight: 400 }}>{stat.value}</div>
                <div className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans leading-tight" style={{ color: C.textStone }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ AD FORMATS ════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[10px]/[11px] uppercase tracking-[0.22em] font-medium mb-6 font-sans" style={{ color: C.bronze }}>
              Partnership Formats
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-5 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
              Beyond the Banner Ad
            </h2>
            <p className="text-sm sm:text-base font-sans font-normal leading-relaxed max-w-xl mx-auto" style={{ color: C.textStone }}>
              Every partnership is designed to feel native, premium, and memorable — never intrusive.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AD_FORMATS.map((format) => (
              <div
                key={format.title}
                className="p-8 sm:p-10 transition-all"
                style={{ background: C.ivory, border: `1px solid rgba(138,115,82,0.35)` }}
              >
                <div className="text-2xl mb-4">{format.icon}</div>
                <h3 className="text-lg sm:text-xl font-serif mb-3 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
                  {format.title}
                </h3>
                <p className="text-sm font-sans font-normal leading-relaxed" style={{ color: C.textStone }}>
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[10px]/[11px] uppercase tracking-[0.22em] font-medium mb-6 font-sans" style={{ color: C.bronze }}>
            The Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-16 sm:mb-20 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
            From Interest to Impact
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {[
              { step: "01", title: "Download the Kit", desc: "Get our media kit, rate card, and editorial calendar. Everything your team needs to evaluate the opportunity." },
              { step: "02", title: "Discovery Call", desc: "A 20-minute conversation about your brand, campaign goals, and which format best delivers your message." },
              { step: "03", title: "Tailored Proposal", desc: "We craft a bespoke partnership proposal with creative direction, placement strategy, and transparent pricing." },
              { step: "04", title: "Go Live", desc: "From creative production to performance reporting, our team manages every detail so your brand shines." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-3xl sm:text-4xl font-serif mb-4 tracking-tight" style={{ color: C.champagne, fontWeight: 400 }}>{item.step}</div>
                <h3 className="text-base sm:text-lg font-serif mb-2 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>{item.title}</h3>
                <p className="text-sm font-sans font-normal leading-relaxed" style={{ color: C.textStone }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ MEDIA KIT FORM ════════════ */}
      <section id="media-kit" className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[10px]/[11px] uppercase tracking-[0.22em] font-medium mb-6 font-sans" style={{ color: C.champagne }}>
              Media Kit
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-5 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
              Download the Full Partnership Deck
            </h2>
            <p className="text-sm sm:text-base font-sans font-normal leading-relaxed max-w-xl mx-auto" style={{ color: C.textStone }}>
              Our media kit includes audience demographics, verified reach, ad format specifications,
              editorial themes for upcoming editions, and transparent rate information.
              Complete the form to access it instantly.
            </p>
          </div>

          <div className="p-8 sm:p-10 md:p-12" style={{ background: "rgba(28,27,24,0.5)", border: `1px solid rgba(184,164,122,0.15)` }}>
            <MediaKitForm />
          </div>
        </div>
      </section>

      {/* ════════════ DIRECT CONTACT ════════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.cream }}>
        <div className="max-w-xl mx-auto">
          <span className="inline-block text-[10px]/[11px] uppercase tracking-[0.22em] font-medium mb-6 font-sans" style={{ color: C.bronze }}>
            Direct Contact
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-5 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
            Prefer to Talk?
          </h2>
          <p className="text-sm font-sans font-normal leading-relaxed mb-8" style={{ color: C.textStone }}>
            Reach our partnerships team directly. We typically respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hey.theroyalgallerys@gmail.com?subject=Partnership%20Enquiry"
              className="inline-block px-10 py-4 transition-colors text-xs uppercase tracking-[0.22em] font-medium font-sans"
              style={{ background: C.obsidian, color: C.ivory, border: `1px solid ${C.obsidian}` }} >
              Email Partnerships
            </a>
            <a
              href="https://www.instagram.com/theroyalgallerys/"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-10 py-4 transition-colors text-xs uppercase tracking-[0.22em] font-medium font-sans"
              style={{ color: C.textDeep, border: `1px solid ${C.bronze}` }} >
              DM on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
