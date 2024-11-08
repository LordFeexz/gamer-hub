"use client";

import { cn } from "@/lib/utils";
import Image, { type StaticImageData, type ImageProps } from "next/image";
import { useState } from "react";

export interface LazyLoadImgProps extends ImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  rounded?: string;
  wrapperClassName?: string;
}

export default function LazyLoadImg({
  src,
  alt,
  rounded,
  className = "",
  wrapperClassName = "",
  ...rest
}: LazyLoadImgProps) {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <figure
      className={cn(
        "overflow-hidden",
        wrapperClassName,
        loading && "animate-pulse"
      )}
    >
      <Image
        {...rest}
        alt={alt}
        src={src}
        loading="lazy"
        onLoad={() => setLoading(false)}
        quality={100}
        className={cn(
          "duration-700 ease-in-out",
          loading
            ? "scale-[1.02] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0",
          className
        )}
      />
    </figure>
  );
}
