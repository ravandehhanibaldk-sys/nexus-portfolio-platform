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
