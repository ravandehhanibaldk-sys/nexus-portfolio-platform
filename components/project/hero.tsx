"use client";

import { useState } from "react";
import Image from "next/image";
import { imagePath, videoPath } from "@/lib/utils";
import type { Project } from "@/lib/content-schema";

/**
 * Component 19.1 — Hero. Governs the 5-second checkpoint (Section 08):
 * "This looks calm, confident, and professional." No competing navigation
 * chrome. The thesis sentence (Section 11.1) is rendered here, first.
 *
 * Each project may supply a `heroVideo` (autoplay/muted/loop/playsInline,
 * cover-fit) for a richer opening moment. If it's absent, or fails to load
 * at runtime, the Hero falls back to the same static exterior image used
 * elsewhere — the reader never sees a broken or empty Hero.
 */
export function Hero({ project }: { project: Project }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const heroAsset = project.beats.finalArchitecture.assets.find(
    (a) => a.category === "exterior"
  );
  const showVideo = Boolean(project.heroVideo) && !videoFailed;

  return (
    <section className="relative w-full h-[100svh] bg-paper-dark text-ink-dark">
      {showVideo ? (
        <video
          key={project.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroAsset ? imagePath(project.id, heroAsset.src) : undefined}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoPath(project.id, project.heroVideo!)} type="video/mp4" />
        </video>
      ) : heroAsset ? (
        <Image
          src={imagePath(project.id, heroAsset.src)}
          alt={heroAsset.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <p className="text-meta uppercase tracking-[0.2em] text-white/70 font-body mb-4">
          {project.typology}
        </p>
        <h1 className="font-display text-h1 md:text-display leading-[1.05] text-white max-w-4xl">
          {project.name}
        </h1>
        <p className="mt-6 text-body md:text-h2 leading-snug text-white/90 font-body max-w-3xl prose-narrative">
          {project.thesisSentence}
        </p>
      </div>
    </section>
  );
}
