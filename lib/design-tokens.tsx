/* ═══════════════════════════════════════════════════
   THE ROYAL GALLERYS — Shared Design Tokens
   ═══════════════════════════════════════════════════ */

export const C = {
  obsidian: "#11110F",
  charcoal: "#1C1B18",
  forest: "#17261F",
  oxblood: "#4A171B",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
} as const;

export const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

/* Shared editorial micro-components */

export function SectionLabel({
  children,
  light,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <span
      className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans"
      style={{ color: light ? "#B8A47A" : "#8A7352" }}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      className="text-[clamp(2rem,4.5vw,4.2rem)] font-serif leading-[1.08] tracking-tight mt-4 sm:mt-5"
      style={{ color: light ? "#F4F0E7" : "#181714", fontWeight: 400 }}
    >
      {children}
    </h2>
  );
}
