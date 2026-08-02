import Image from "next/image";
import Link from "next/link";
import { imagePath } from "@/lib/utils";
import villaRedSun from "@/content/projects/villa-red-sun";
import villaEfe from "@/content/projects/villa-efe";
import type { Project } from "@/lib/content-schema";

/**
 * Home / Index (Section 09.1). One entry per project (Section 22.3,
 * Portfolio-Level Map) — each project card reuses the exact same block
 * (image + title + typology + thesis), so adding Project 03 later is
 * just another entry in this array, not a layout change.
 */
const projects: Project[] = [villaRedSun, villaEfe];

export default function Home() {
  return (
    <main className="min-h-svh flex flex-col justify-center px-6 py-16 md:py-24 max-w-5xl mx-auto">
      <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-3">
        Hanibal Ravandeh — Architectural Portfolio
      </p>
      <h1 className="font-display text-h1 md:text-display text-ink mb-12 leading-[1.05] max-w-3xl">
        Selected Work
      </h1>

      <div className="flex flex-col">
        {projects.map((project) => {
          const cover = project.beats.finalArchitecture.assets.find(
            (a) => a.category === "exterior"
          );

          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group block border-t border-divider py-8 first:pt-8 last:pb-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 items-start">
                <div className="relative w-full aspect-[16/9] bg-paper-dark overflow-hidden">
                  {cover ? (
                    <Image
                      src={imagePath(project.id, cover.src)}
                      alt={cover.alt}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-editorial)] group-hover:scale-[1.02]"
                    />
                  ) : null}
                </div>
                <div>
                  <h2 className="font-display text-h2 text-ink mb-3">
                    {project.name}
                  </h2>
                  <p className="text-caption font-body text-neutral mb-4">
                    {project.typology}
                  </p>
                  <p className="prose-narrative text-body font-body text-ink/80 leading-relaxed">
                    {project.thesisSentence}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
