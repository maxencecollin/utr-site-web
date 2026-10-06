"use client";

import { imageOptimisee } from "./imagesOptimisees";

/* Chargeur de next/image en export statique : versions WebP pre-generees */
export default function chargeurImages({ src, width }: { src: string; width: number }) {
  return imageOptimisee(src, width);
}
