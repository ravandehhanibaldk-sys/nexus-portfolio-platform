import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Section 20.1 — all project imagery lives under /public/images/<project-id>/. */
export function imagePath(projectId: string, src: string) {
  return `/images/${projectId}/${src}`;
}

/** All project hero video lives under /public/videos/<project-id>/. */
export function videoPath(projectId: string, src: string) {
  return `/videos/${projectId}/${src}`;
}

/**
 * A native <video poster> attribute can't use the <Image> component (no
 * responsive srcset/sizes support), so it was pointing straight at the
 * raw ~2-4MB source PNG — on a throttled connection the poster (and any
 * frame behind it, before the video itself buffers) could take upwards
 * of a minute to paint, reading as a blank/broken card rather than a
 * slow-loading one. This builds the same Next.js Image-Optimization-API
 * URL `next/image` generates internally (re-encoded to avif/webp at
 * quality 75), so the poster gets the same size/format win as every
 * other image on the site. `width` should be the source image's native
 * width (or larger) so Next never upscales past it.
 */
export function optimizedImagePath(projectId: string, src: string, width: number, quality = 75) {
  return `/_next/image?url=${encodeURIComponent(imagePath(projectId, src))}&w=${width}&q=${quality}`;
}

/**
 * PDF print route only — public/images-print/ holds a downsampled/JPEG
 * re-encode of every source PNG (scripts/prepare-print-assets.mjs), since
 * the site's originals are ~3-4MB each and a naive embed of ~30 of them
 * inflated a 15-page draft PDF to 136MB. Never used by the live website.
 */
export function printImagePath(projectId: string, src: string) {
  const withoutExt = src.replace(/\.png$/i, "");
  return `/images-print/${projectId}/${withoutExt}.jpg`;
}
