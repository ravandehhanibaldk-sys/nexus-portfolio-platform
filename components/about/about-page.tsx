import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { AboutContent } from "@/content/about";
import type { Locale } from "@/lib/locale";
import { localizedPath } from "@/lib/locale";
import { LanguageSwitcher } from "@/components/project/language-switcher";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Task C — About: architecture + verified content foundation. A functional,
 * content-complete first implementation using only the existing Visual DNA
 * (Fraunces + Inter, the same section/paragraph/pull-quote tokens already
 * used by EditorialText and Reflection) — not a bespoke new design system.
 */
export function AboutPage({
  content,
  locale,
  dict,
}: {
  content: AboutContent;
  locale: Locale;
  dict: Dictionary;
}) {
  const otherLocale: Locale = locale === "en" ? "da" : "en";

  return (
    <main className="min-h-svh bg-paper">
      <Link
        href={localizedPath(locale, "/")}
        className="group fixed top-4 left-4 md:top-6 md:left-6 z-40 inline-flex items-center gap-2 rounded-full bg-paper/90 backdrop-blur-sm border border-divider pl-3 pr-4 py-2 text-meta font-body text-ink shadow-sm transition-colors duration-[var(--duration-base)] hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        <ArrowLeft size={16} strokeWidth={1.75} className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-editorial)] group-hover:-translate-x-0.5" />
        {dict.common.backToPortfolio}
      </Link>
      <LanguageSwitcher dict={dict} otherLocaleHref={localizedPath(otherLocale, "/about")} />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24 md:pt-36 md:pb-32">
        <p className="text-meta font-body text-accent tracking-[0.15em] uppercase mb-4">
          {content.pageHeading[locale]}
        </p>

        {content.sections.map((section, i) => (
          <div key={i} className={i === 0 ? "mb-16" : "mb-16 pt-16 border-t border-divider"}>
            {section.heading ? (
              <h2 className="font-display text-h1 text-ink mb-8 leading-tight">
                {section.heading[locale]}
              </h2>
            ) : null}

            <div className={i === 0 ? "flex flex-col sm:flex-row gap-6 sm:gap-10" : ""}>
              {i === 0 ? (
                <div className="shrink-0 relative w-32 sm:w-40 aspect-[4/5] border border-divider bg-paper overflow-hidden">
                  <Image
                    src="/images/about/hanibal-ravandeh.jpg"
                    alt={locale === "en" ? "Portrait of Hanibal Ravandeh" : "Portræt af Hanibal Ravandeh"}
                    fill
                    sizes="(min-width: 640px) 160px, 128px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="flex flex-col gap-5">
                {section.paragraphs.map((p, pi) => (
                  <p key={pi} className="prose-narrative text-body font-body text-ink/85 leading-relaxed">
                    {p[locale]}
                  </p>
                ))}
              </div>
            </div>

            {section.cycle ? (
              <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2">
                {section.cycle[locale].split(" → ").flatMap((word, wi, words) => {
                  const isInput = wi < 4;
                  const nodes = [
                    <span
                      key={`w-${wi}`}
                      className={
                        isInput
                          ? "text-meta font-body text-neutral tracking-[0.1em] uppercase"
                          : "text-caption font-body text-ink tracking-[0.1em] uppercase"
                      }
                    >
                      {word}
                    </span>,
                  ];
                  if (wi < words.length - 1) {
                    nodes.push(
                      <span key={`a-${wi}`} className="text-meta font-body text-neutral/40" aria-hidden="true">
                        →
                      </span>
                    );
                  }
                  return nodes;
                })}
              </div>
            ) : null}

            {section.pullQuote ? (
              <blockquote className="mt-8 border-l-2 border-accent pl-6">
                <p className="font-display text-h2 text-ink leading-snug">
                  &ldquo;{section.pullQuote[locale]}&rdquo;
                </p>
              </blockquote>
            ) : null}
          </div>
        ))}

        <div className="mt-16 pt-16 border-t border-divider flex flex-wrap gap-x-6 gap-y-2 text-meta font-body text-neutral tracking-[0.05em]">
          <a href="mailto:ravandeh.hanibal.dk@gmail.com" className="hover:text-ink transition-colors duration-[var(--duration-base)]">
            ravandeh.hanibal.dk@gmail.com
          </a>
          <a href="https://linkedin.com/in/hanibal-ravandeh" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors duration-[var(--duration-base)]">
            linkedin.com/in/hanibal-ravandeh
          </a>
          <a href="https://behance.net/hanibalravandeh" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors duration-[var(--duration-base)]">
            behance.net/hanibalravandeh
          </a>
        </div>
      </div>
    </main>
  );
}
