export default function TravelTipBox({
  title, icon = "💡", children, className = "",
}: {
  title: string; icon?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`p-5 sm:p-6 md:p-7 my-6 sm:my-8 ${className}`} style={{ border: "1px solid rgba(138,115,82,0.18)", background: "#F4F0E7" }}>
      <div className="flex items-start gap-3 sm:gap-4">
        <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{icon}</span>
        <div>
          <h5 className="text-sm sm:text-base font-serif mb-2" style={{ color: "#181714" }}>{title}</h5>
          <div className="text-xs sm:text-sm font-sans leading-relaxed space-y-2" style={{ color: "#9B9589", fontWeight: 400 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
