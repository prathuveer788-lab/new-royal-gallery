interface ItineraryDay {
  timeOfDay: string;
  activity: string;
  description: string;
}

interface ItineraryPlan {
  title: string;
  days: { label: string; items: ItineraryDay[] }[];
}

export default function ItineraryCard({
  plan,
  className = "",
}: {
  plan: ItineraryPlan;
  className?: string;
}) {
  return (
    <div className={`my-8 sm:my-10 ${className}`}>
      <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-6 sm:mb-8 text-center">
        {plan.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {plan.days.map((day) => (
          <div
            key={day.label}
            className="border border-neutral-200 p-4 sm:p-5 flex flex-col"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-amber-700 font-bold mb-3 sm:mb-4 font-sans">
              {day.label}
            </span>
            <div className="space-y-3 sm:space-y-4 flex-1">
              {day.items.map((item) => (
                <div key={item.activity} className="border-l-2 border-amber-200 pl-3">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-medium font-sans">
                    {item.timeOfDay}
                  </span>
                  <p className="text-xs sm:text-sm font-serif text-neutral-800 mt-0.5">
                    {item.activity}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 font-light leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
