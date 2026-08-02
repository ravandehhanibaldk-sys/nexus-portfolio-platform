"use client";

import Image from "next/image";
import { imagePath } from "@/lib/utils";
import type { ProjectAsset } from "@/lib/content-schema";
import { useLightbox } from "./lightbox";

/**
 * Shared image primitive used by Plan (19.5), SectionDrawing (19.6), Diagram (19.7),
 * RenderGallery (19.8), and SiteAnalysis (19.3).
 *
 * Section 20.2.1 — never stretch. Source assets are already pre-processed to an
 * exact 1920x1080 (16:9) canvas (Section 20.1), so object-cover at a 16:9
 * container is lossless: it can never crop or distort, because the source
 * ratio and the container ratio are identical by construction.
 *
 * Every Frame is clickable, opening the sitewide lightbox scoped to its own
 * `gallery` (the sibling images of its section) starting at `index` — left/
 * right navigation inside the lightbox stays within that same group.
 */
export function Frame({
  projectId,
  asset,
  priority = false,
  sizes = "100vw",
  gallery,
  index = 0,
}: {
  projectId: string;
  asset: ProjectAsset;
  priority?: boolean;
  sizes?: string;
  /** Sibling images this Frame belongs to, for lightbox prev/next. Defaults to just this asset. */
  gallery?: ProjectAsset[];
  index?: number;
}) {
  const { open } = useLightbox();

  return (
    <figure className="w-full">
      <button
        type="button"
        onClick={() => open(projectId, gallery ?? [asset], gallery ? index : 0)}
        aria-label={`View larger: ${asset.alt}`}
        className="group relative block w-full aspect-[16/9] bg-neutral/10 overflow-hidden cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <Image
          src={imagePath(projectId, asset.src)}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
        />
      </button>
      {asset.caption ? (
        <figcaption className="mt-2 text-meta text-neutral font-body">
          {asset.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
