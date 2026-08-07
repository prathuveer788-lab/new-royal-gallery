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
      className={`relative border-l-2 border-amber-400 pl-6 sm:pl-8 md:pl-10 py-2 sm:py-3 my-8 sm:my-10 md:my-12 ${className}`}
    >
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-neutral-800 leading-[1.35] italic">
        &ldquo;{children}&rdquo;
      </p>
      {(attribution || role) && (
        <footer className="mt-4 sm:mt-5 text-xs sm:text-sm text-neutral-500 font-light tracking-wide not-italic">
          {attribution && (
            <span className="font-medium text-neutral-700">{attribution}</span>
          )}
          {attribution && role && (
            <span className="mx-2 text-neutral-300">·</span>
          )}
          {role && <span>{role}</span>}
        </footer>
      )}
    </blockquote>
  );
}
