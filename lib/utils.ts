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
 * PDF print route only — public/images-print/ holds a downsampled/JPEG
 * re-encode of every source PNG (scripts/prepare-print-assets.mjs), since
 * the site's originals are ~3-4MB each and a naive embed of ~30 of them
 * inflated a 15-page draft PDF to 136MB. Never used by the live website.
 */
export function printImagePath(projectId: string, src: string) {
  const withoutExt = src.replace(/\.png$/i, "");
  return `/images-print/${projectId}/${withoutExt}.jpg`;
}
