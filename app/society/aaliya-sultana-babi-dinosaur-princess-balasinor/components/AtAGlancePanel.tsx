interface FactItem {
  label: string;
  value: string;
  isItalic?: boolean;
}

const FACTS: FactItem[] = [
  { label: "Location", value: "Raiyoli, near Balasinor, Gujarat, India" },
  { label: "Geological Era", value: "Cretaceous period, 65–67 million years BC" },
  { label: "First Discovered", value: "1980s, as \"cannonballs\" in the cement quarries" },
  { label: "Scientific Confirmation", value: "Dr. Ashok Sahni, \"the Dino Man of India\"" },
  {
    label: "Excavation Yield",
    value: "Dinosaur eggs and about 400 bones from two types of dinosaur (one herbivore, one carnivore)",
  },
  {
    label: "Star Specimen",
    value: "Rajasaurus Narmadensis, a 30-foot carnivore",
    isItalic: true,
  },
  { label: "Museum Inauguration", value: "2019" },
  { label: "Distance", value: "About 15 minutes from Balasinor" },
];

export default function AtAGlancePanel() {
  return (
    <aside
      aria-label="At a Glance: Raiyoli Dinosaur Heritage Dossier"
      className="my-14 sm:my-18 p-8 sm:p-10 md:p-12 border border-[#D9CFC2] relative shadow-sm"
      style={{ backgroundColor: "#EFE3D2" }}
    >
      {/* Museum Label Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9CFC2] pb-5 mb-8">
        <div>
          <span
            className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold block"
            style={{ color: "#D4673A" }}
          >
            Exhibit Dossier · Archive Catalogue
          </span>
          <h3
            className="text-2xl sm:text-3xl font-serif text-[#1B1D21] tracking-tight mt-1"
            style={{ fontWeight: 400 }}
          >
            At a Glance
          </h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#6B6F76] block">
            Fossil Bed Registry
          </span>
          <span className="text-xs font-serif text-[#1B1D21] tracking-widest font-medium">
            CAT. NO. RAIYOLI-65M
          </span>
        </div>
      </div>

      {/* Grid of Facts */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
        {FACTS.map((fact) => (
          <div key={fact.label} className="border-b border-[#D9CFC2]/60 pb-3">
            <dt className="text-[10px] uppercase tracking-[0.22em] font-sans font-medium text-[#6B6F76] mb-1">
              {fact.label}
            </dt>
            <dd
              className={`text-sm sm:text-base font-serif text-[#1B1D21] leading-snug ${
                fact.isItalic ? "italic" : ""
              }`}
            >
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Museum Label Bottom Verification */}
      <div className="mt-8 pt-4 border-t border-[#D9CFC2] flex flex-wrap items-center justify-between text-[10px] uppercase tracking-[0.2em] font-sans text-[#6B6F76]">
        <span>Verified Field Data · Raiyoli, Gujarat</span>
        <span>The Royal Gallerys Heritage Archive</span>
      </div>
    </aside>
  );
}
