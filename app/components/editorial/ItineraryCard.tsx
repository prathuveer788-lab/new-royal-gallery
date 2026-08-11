interface ItineraryDay { timeOfDay: string; activity: string; description: string; }
interface ItineraryPlan { title: string; days: { label: string; items: ItineraryDay[] }[]; }

const C = { bronze: "#8A7352", champagne: "#B8A47A", textDeep: "#181714", textStone: "#9B9589", ivory: "#F4F0E7" };

export default function ItineraryCard({ plan, className = "" }: { plan: ItineraryPlan; className?: string }) {
  return (
    <div className={`my-8 sm:my-10 ${className}`}>
      <h3 className="text-xl sm:text-2xl font-serif mb-6 sm:mb-8 text-center" style={{ color: C.textDeep }}>{plan.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {plan.days.map((day) => (
          <div key={day.label} className="p-4 sm:p-5 flex flex-col" style={{ border: "1px solid rgba(138,115,82,0.2)", background: C.ivory }}>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-3 sm:mb-4" style={{ color: C.bronze }}>{day.label}</span>
            <div className="space-y-3 sm:space-y-4 flex-1">
              {day.items.map((item) => (
                <div key={item.activity} className="pl-3" style={{ borderLeft: `2px solid ${C.champagne}` }}>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] font-medium font-sans" style={{ color: C.textStone }}>{item.timeOfDay}</span>
                  <p className="text-xs sm:text-sm font-serif mt-0.5" style={{ color: C.textDeep }}>{item.activity}</p>
                  <p className="text-[10px] sm:text-[11px] font-sans leading-relaxed mt-0.5" style={{ color: C.textStone, fontWeight: 400 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
