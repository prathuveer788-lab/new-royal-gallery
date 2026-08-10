import type { Metadata } from "next";
import MediaKitForm from "../components/MediaKitForm";

export const metadata: Metadata = {
  title: "Advertise With The Royal Gallerys | Luxury Heritage Media",
  description:
    "Connect your brand with India's most discerning audience. Download our media kit, rate card, and editorial calendar to explore advertising opportunities.",
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
    <div className="bg-white">
      {/* ════════════ HERO ════════════ */}
      <section className="relative pt-36 sm:pt-44 md:pt-52 pb-16 sm:pb-20 md:pb-28 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-950 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,120,30,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-400 font-bold mb-8 font-sans">
            Partnerships
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.06] mb-6 tracking-tight">
            Your Brand, in the<br />Company of Royalty
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
            The Royal Gallerys connects luxury brands with India&apos;s most affluent, culturally engaged audience —
            a community of decision-makers, collectors, and tastemakers who define what comes next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#media-kit"
              className="inline-block px-10 py-4 bg-amber-500 text-neutral-900 hover:bg-amber-400 transition-colors text-xs sm:text-sm uppercase tracking-[0.22em] font-semibold font-sans"
            >
              Download Media Kit
            </a>
            <a
              href="mailto:hey.theroyalgallerys@gmail.com"
              className="inline-block px-10 py-4 border border-white/25 text-white hover:border-white/60 transition-colors text-xs sm:text-sm uppercase tracking-[0.22em] font-medium font-sans"
            >
              Contact Partnerships
            </a>
          </div>
        </div>
      </section>

      {/* ════════════ AUDIENCE ════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold mb-6 font-sans">
              Our Audience
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-5 tracking-tight">
              India&apos;s Most Discerning Readers
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
              Not just reach. Relevance. Every reader is someone your brand wants to meet.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {AUDIENCE_STATS.map((stat) => (
              <div key={stat.label} className="text-center p-6 border border-neutral-100 hover:border-amber-100 transition-colors">
                <div className="text-2xl sm:text-3xl font-serif text-amber-700 mb-2 tracking-tight">{stat.value}</div>
                <div className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-[0.15em] font-medium font-sans leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ AD FORMATS ════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold mb-6 font-sans">
              Partnership Formats
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-5 tracking-tight">
              Beyond the Banner Ad
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
              Every partnership is designed to feel native, premium, and memorable — never intrusive.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AD_FORMATS.map((format) => (
              <div
                key={format.title}
                className="bg-white border border-neutral-100 p-8 sm:p-10 hover:border-amber-200 hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-4">{format.icon}</div>
                <h3 className="text-lg sm:text-xl font-serif text-neutral-900 mb-3 tracking-tight">
                  {format.title}
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold mb-6 font-sans">
            The Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-16 sm:mb-20 tracking-tight">
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
                <div className="text-3xl sm:text-4xl font-serif text-amber-200 mb-4 tracking-tight">{item.step}</div>
                <h3 className="text-base sm:text-lg font-serif text-neutral-900 mb-2 tracking-tight">{item.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ MEDIA KIT FORM ════════════ */}
      <section id="media-kit" className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-950 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-400 font-bold mb-6 font-sans">
              Media Kit
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-5 tracking-tight">
              Download the Full Partnership Deck
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
              Our media kit includes audience demographics, verified reach, ad format specifications,
              editorial themes for upcoming editions, and transparent rate information.
              Complete the form to access it instantly.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-white/10 p-8 sm:p-10 md:p-12">
            <MediaKitForm />
          </div>
        </div>
      </section>

      {/* ════════════ DIRECT CONTACT ════════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5] text-center">
        <div className="max-w-xl mx-auto">
          <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold mb-6 font-sans">
            Direct Contact
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-5 tracking-tight">
            Prefer to Talk?
          </h2>
          <p className="text-neutral-500 text-sm font-light leading-relaxed mb-8">
            Reach our partnerships team directly. We typically respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hey.theroyalgallerys@gmail.com?subject=Partnership%20Enquiry"
              className="inline-block px-10 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-xs uppercase tracking-[0.2em] font-semibold font-sans"
            >
              Email Partnerships
            </a>
            <a
              href="https://www.instagram.com/theroyalgallerys/"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-10 py-4 border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors text-xs uppercase tracking-[0.2em] font-medium font-sans"
            >
              DM on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
