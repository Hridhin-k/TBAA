import Image from "next/image";
import { cn } from "@/utils/cn";

type EditorialImageProps = {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "portrait" | "landscape" | "square" | "cinematic";
  priority?: boolean;
  sizes?: string;
};

const aspectMap = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  cinematic: "aspect-[16/10]",
};

export function EditorialImage({
  src,
  alt,
  className,
  aspectRatio = "landscape",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: EditorialImageProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-mist", aspectMap[aspectRatio], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="object-cover"
      />
    </div>
  );
}
