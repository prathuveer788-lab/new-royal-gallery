export default function LuxuryDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-12 sm:my-16 ${className}`}>
      <span className="w-8" style={{ height: 1, background: "rgba(138,115,82,0.3)" }} />
      <span className="w-1.5 h-1.5" style={{ background: "#8A7352" }} />
      <span className="w-10" style={{ height: 1, background: "rgba(138,115,82,0.3)" }} />
      <span className="w-1.5 h-1.5" style={{ background: "#8A7352" }} />
      <span className="w-8" style={{ height: 1, background: "rgba(138,115,82,0.3)" }} />
    </div>
  );
}
