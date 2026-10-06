"use client";
import { useState } from "react";

/**
 * Image that fails silently — gallery slots render nothing
 * until the real photo files are dropped into public/images/profile/.
 */
export default function SmartImage({
  src,
  alt,
  className,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [dead, setDead] = useState(false);
  if (dead) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setDead(true)}
      className={className}
      draggable={false}
    />
  );
}
