export default function LuxuryDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-12 sm:my-16 ${className}`}>
      <span className="w-8 h-px bg-neutral-300" />
      <span className="w-2 h-2 bg-amber-400 rounded-full" />
      <span className="w-10 h-px bg-neutral-300" />
      <span className="w-2 h-2 bg-amber-400 rounded-full" />
      <span className="w-8 h-px bg-neutral-300" />
    </div>
  );
}
