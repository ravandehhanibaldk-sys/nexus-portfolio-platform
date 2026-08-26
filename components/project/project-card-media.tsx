"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { imagePath, optimizedImagePath, videoPath } from "@/lib/utils";

/**
 * Homepage project-card media — video-with-image-fallback, same behavior
 * as components/project/hero.tsx (autoplay/muted/loop/playsInline, poster
 * fallback, error fallback, prefers-reduced-motion guard) but implemented
 * as its own small component rather than by modifying hero.tsx.
 *
 * MASTER-EXECUTION-TASK-FINAL.md, Part B: the project-page Hero
 * implementation is explicitly closed and must not be touched or
 * refactored to share code with this. This duplicates a small amount of
 * render-branch logic (not the imagePath/videoPath resolution itself,
 * which is reused) as a direct, disclosed consequence of that constraint.
 */
export function ProjectCardMedia({
  projectId,
  heroVideo,
  imageSrc,
  alt,
}: {
  projectId: string;
  heroVideo?: string;
  imageSrc: string;
  alt: string;
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion() === true;
  const showVideo = Boolean(heroVideo) && !videoFailed && !prefersReducedMotion;

  if (showVideo) {
    return (
      <video
        key={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={optimizedImagePath(projectId, imageSrc, 1920)}
        onError={() => setVideoFailed(true)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
      >
        <source src={videoPath(projectId, heroVideo!)} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={imagePath(projectId, imageSrc)}
      alt={alt}
      fill
      sizes="(min-width: 768px) 60vw, 100vw"
      className="object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
    />
  );
}
