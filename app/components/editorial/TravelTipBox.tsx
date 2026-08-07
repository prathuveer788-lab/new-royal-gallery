export default function TravelTipBox({
  title,
  icon = "💡",
  children,
  className = "",
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-neutral-200 p-5 sm:p-6 md:p-7 my-6 sm:my-8 ${className}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{icon}</span>
        <div>
          <h5 className="text-sm sm:text-base font-serif text-neutral-900 mb-2">
            {title}
          </h5>
          <div className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
