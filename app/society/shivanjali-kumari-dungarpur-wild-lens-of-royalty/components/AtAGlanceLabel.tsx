export default function AtAGlanceLabel() {
  return (
    <section
      aria-label="At a Glance: Exhibition Wall Label"
      className="my-16 sm:my-24 p-8 sm:p-12 lg:p-14 border border-[#D8D6D0] shadow-sm max-w-4xl mx-auto"
      style={{ backgroundColor: "#E3ECEE" }}
    >
      {/* Wall label masthead */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#D8D6D0] pb-6 mb-8 gap-2">
        <div>
          <span className="text-[10px] uppercase tracking-[0.32em] font-sans font-medium text-[#C4687F] block mb-1">
            Gallery Wall Label · Factsheet
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1C1E] tracking-tight">
            At a Glance
          </h3>
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#6A6A70]">
          Shivanjali Kumari Dungarpur
        </span>
      </div>

      {/* 1. Numbers */}
      <div className="mb-10">
        <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#6A6A70] block mb-4">
          Numbers
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="border-l-2 border-[#C4687F] pl-4">
            <span className="text-3xl sm:text-4xl font-serif text-[#1C1C1E] block leading-none mb-1">
              19
            </span>
            <span className="text-xs uppercase tracking-wider font-sans text-[#6A6A70]">
              Years of Age
            </span>
          </div>
          <div className="border-l-2 border-[#C4687F] pl-4">
            <span className="text-3xl sm:text-4xl font-serif text-[#1C1C1E] block leading-none mb-1">
              12th
            </span>
            <span className="text-xs uppercase tracking-wider font-sans text-[#6A6A70]">
              Century Founded
            </span>
          </div>
          <div className="border-l-2 border-[#C4687F] pl-4">
            <span className="text-3xl sm:text-4xl font-serif text-[#1C1C1E] block leading-none mb-1">
              10
            </span>
            <span className="text-xs uppercase tracking-wider font-sans text-[#6A6A70]">
              Years of Tabla
            </span>
          </div>
        </div>
      </div>

      {/* 2. Heritage Context */}
      <div className="mb-10 pb-8 border-b border-[#D8D6D0]">
        <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#6A6A70] block mb-2">
          Heritage Context
        </span>
        <p className="font-serif italic text-base sm:text-lg text-[#1C1C1E] leading-relaxed">
          The Royal Family of Dungarpur belongs to the Guhilot clan — among Rajasthan&apos;s oldest dynasties. Juna Mahal, their seven-storey ancestral palace of local Pareva stone, is among the finest pre-Mughal Rajput architecture.
        </p>
      </div>

      {/* 3 & 4. Pillars of Her Practice & Institutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#6A6A70] block mb-3">
            Pillars of Her Practice
          </span>
          <ul className="space-y-2 text-sm font-sans text-[#1C1C1E]/85">
            <li className="flex items-start gap-2">
              <span className="text-[#C4687F] select-none mt-0.5">◆</span>
              <span><strong>Wildlife &amp; nature</strong>, the primary pursuit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C4687F] select-none mt-0.5">◆</span>
              <span><strong>Architectural photography</strong>, Rajasthan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C4687F] select-none mt-0.5">◆</span>
              <span><strong>Fashion &amp; editorial</strong>, Bombay</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C4687F] select-none mt-0.5">◆</span>
              <span><strong>Automotive</strong>, the family museum</span>
            </li>
          </ul>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#6A6A70] block mb-3">
            Institutions
          </span>
          <ul className="space-y-2 text-sm font-sans text-[#1C1C1E]/85">
            <li className="flex items-start gap-2">
              <span className="text-[#C4687F] select-none mt-0.5">◆</span>
              <span>Mayo College, Ajmer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C4687F] select-none mt-0.5">◆</span>
              <span>Le Mark Institute, Mumbai</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C4687F] select-none mt-0.5">◆</span>
              <span>Sophia College, Mumbai</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C4687F] select-none mt-0.5">◆</span>
              <span>Tabla, ten years of study</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
