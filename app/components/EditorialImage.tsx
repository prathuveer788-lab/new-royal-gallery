import Image from "next/image";

export interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  priority?: boolean;
  ratio?: "16/9" | "4/5" | "3/2" | "1/1" | "2/3" | "4/3";
  focal?: string;
  variant?: "hero" | "wide" | "column" | "card" | "thumb";
  className?: string;
  imageClassName?: string;
}

const defaultBlurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNFQUUzRDUiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function EditorialImage({
  src,
  alt,
  caption,
  credit,
  priority = false,
  ratio = "3/2",
  focal = "center",
  variant = "column",
  className = "",
  imageClassName = "",
}: EditorialImageProps) {
  // Variant sizes mapping per design specification
  const sizesMap = {
    hero: "100vw",
    wide: "(min-width: 1280px) 1200px, 100vw",
    column: "(min-width: 768px) 700px, 100vw",
    card: "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw",
    thumb: "(min-width: 768px) 200px, 100px",
  };

  const aspectClassMap = {
    "16/9": "aspect-[16/9]",
    "4/5": "aspect-[4/5]",
    "3/2": "aspect-[3/2]",
    "1/1": "aspect-square",
    "2/3": "aspect-[2/3]",
    "4/3": "aspect-[4/3]",
  };

  const quality = variant === "hero" ? 90 : 85;
  const sizes = sizesMap[variant] || sizesMap.column;
  const aspectClass = aspectClassMap[ratio] || "aspect-[3/2]";

  return (
    <figure className={`w-full my-6 ${className}`}>
      <div className={`relative w-full ${aspectClass} bg-[#EAE3D5] overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          placeholder="blur"
          blurDataURL={defaultBlurDataURL}
          style={{ objectFit: "cover", objectPosition: focal }}
          className={`transition-transform duration-500 hover:scale-[1.02] ${imageClassName}`}
        />
      </div>

      {(caption || credit) && (
        <figcaption className="mt-2.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs text-[#5B5B5B] gap-1 font-sans">
          {caption && (
            <span className="text-[13px] text-[#1A1A1A] leading-relaxed max-w-2xl">
              {caption}
            </span>
          )}
          {credit && (
            <span className="text-[11px] sm:text-[12px] italic text-[#5B5B5B] shrink-0 sm:text-right">
              {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
