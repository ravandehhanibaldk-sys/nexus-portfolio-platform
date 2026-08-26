import Link from "next/link";
import { notFound } from "next/navigation";
import { t, type Project } from "@/lib/content-schema";
import { getDictionary, isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/project/language-switcher";
import { ProjectCardMedia } from "@/components/project/project-card-media";
import { HeroIntro } from "@/components/motion-experiment/hero-intro";
import villaRedSun from "@/content/projects/villa-red-sun";
import villaEfe from "@/content/projects/villa-efe";

/**
 * Home / Index (Section 09.1). One entry per project (Section 22.3,
 * Portfolio-Level Map) — each project card reuses the exact same block
 * (image + title + typology + thesis), so adding Project 03 later is
 * just another entry in this array, not a layout change.
 *
 * Workstream 3: locale-aware home, at the canonical `/[locale]` route.
 * Task C: About entry added at the lower-right of the Selected Work
 * composition, per the user's stated preferred placement.
 */
const projects: Project[] = [villaRedSun, villaEfe];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const otherLocale: Locale = locale === "en" ? "da" : "en";

  return (
    <main className="min-h-svh">
      <LanguageSwitcher dict={dict} otherLocaleHref={localizedPath(otherLocale, "/")} />

      {/* Motion experiment (experiment/motion-redesign branch only) — see
          components/motion-experiment/README.md. Replaces the plain
          eyebrow + <h1> with the same two strings inside an animated dark
          hero. Content below (project cards, About link) is unchanged. */}
      <HeroIntro eyebrow={dict.home.eyebrow} title={dict.home.title} />

      <div className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="flex flex-col">
          {projects.map((project) => {
            const cover = project.beats.finalArchitecture.assets.find(
              (a) => a.category === "exterior"
            );

            return (
              <Link
                key={project.id}
                href={localizedPath(locale, `/projects/${project.id}`)}
                className="group block border-t border-divider py-8 first:pt-8 last:pb-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 items-start">
                  <div className="relative w-full aspect-[16/9] bg-paper-dark overflow-hidden">
                    {cover ? (
                      <ProjectCardMedia
                        projectId={project.id}
                        heroVideo={project.heroVideo}
                        imageSrc={cover.src}
                        alt={t(cover.alt, locale)}
                      />
                    ) : null}
                  </div>
                  <div>
                    <h2 className="font-display text-h2 text-ink mb-3">
                      {project.name}
                    </h2>
                    <p className="text-caption font-body text-neutral mb-4">
                      {t(project.typology, locale)}
                    </p>
                    <p className="prose-narrative text-body font-body text-ink/80 leading-relaxed">
                      {t(project.thesisSentence, locale)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 flex justify-end">
          <Link
            href={localizedPath(locale, "/about")}
            className="inline-flex items-center gap-2 text-meta font-body text-neutral tracking-[0.1em] uppercase border-b border-divider pb-1 transition-colors duration-[var(--duration-base)] hover:text-ink hover:border-accent"
          >
            {dict.home.aboutLinkLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
