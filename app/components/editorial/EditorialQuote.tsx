export default function EditorialQuote({
  children,
  attribution,
  role,
  className = "",
}: {
  children: string;
  attribution?: string;
  role?: string;
  className?: string;
}) {
  return (
    <blockquote
      className={`relative pl-6 sm:pl-8 md:pl-10 py-2 sm:py-3 my-8 sm:my-10 md:my-12 ${className}`}
      style={{ borderLeft: `2px solid rgba(138,115,82,0.45)` }}
    >
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif leading-[1.35] italic" style={{ color: "#181714" }}>
        &ldquo;{children}&rdquo;
      </p>
      {(attribution || role) && (
        <footer className="mt-4 sm:mt-5 text-xs sm:text-sm font-sans tracking-wide not-italic" style={{ color: "#9B9589", fontWeight: 400 }}>
          {attribution && (
            <span className="font-medium" style={{ color: "#181714" }}>{attribution}</span>
          )}
          {attribution && role && (
            <span className="mx-2" style={{ color: "#8A7352" }}>·</span>
          )}
          {role && <span>{role}</span>}
        </footer>
      )}
    </blockquote>
  );
}
