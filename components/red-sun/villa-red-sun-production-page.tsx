import { t, type Project } from "@/lib/content-schema";
import { localizedPath, type Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";
import en from "@/dictionaries/en";
import { Hero } from "@/components/project/hero";
import { FinalArchitecture } from "@/components/project/final-architecture";
import { Reflection } from "@/components/project/reflection";
import { ProgressNav } from "@/components/project/progress-nav";
import { BackToPortfolio } from "@/components/project/back-to-portfolio";
import { LanguageSwitcher } from "@/components/project/language-switcher";
import { LightboxProvider } from "@/components/project/lightbox";
import { EditorialText } from "./editorial-text";
import { SiteAnalysisEditorial } from "./site-analysis-editorial";
import { AlternativesEditorial } from "./alternatives-editorial";

/**
 * Villa Red Sun — production page, modernization pass.
 *
 * This is a PARALLEL page shell, not an edit to project-page.tsx. Villa Efe
 * (app/projects/villa-efe/page.tsx) still renders the original ProjectPage
 * unchanged. The reason: several of the components ProjectPage composes
 * (Hero, SiteAnalysis, AlternativesComparator, FinalArchitecture) are
 * SHARED between both projects — editing them directly would have changed
 * Villa Efe's page too, which was explicitly out of scope. Building a
 * second shell was the only way to modernize Red Sun's presentation while
 * leaving Villa Efe's files and rendered output completely untouched.
 *
 * Reused UNMODIFIED (already strong, and/or shared with Villa Efe — safe
 * to import, not safe to edit): Hero, FinalArchitecture, Reflection,
 * ProgressNav, BackToPortfolio, LightboxProvider, and — inside
 * SiteAnalysisEditorial — the Climate Interface component itself (its
 * file, state, and behavior are not touched anywhere in this pass).
 *
 * New for this pass (components/red-sun/): EditorialText (replaces
 * NarrativeTextBlock's centered block with an asymmetric offset column +
 * scroll reveal), SiteAnalysisEditorial (asymmetric image rhythm ahead of
 * the untouched Climate Interface), AlternativesEditorial (continuous
 * B-2/C-1/D evidence sequence instead of the tab-switcher, real data only).
 *
 * Anchor IDs (client-challenge, site, constraints, design-alternatives,
 * final-decision, final-architecture, reflection) are preserved exactly as
 * in project-page.tsx — ProgressNav's jump links depend on them.
 *
 * Workstream 3: accepts `locale`/`dict`, resolved once by the page (Server
 * Component) and threaded down. Section eyebrow index labels ("01 —
 * Client Challenge") are resolved here at the call site via `dict.sections`
 * — EditorialText itself stays a plain presentational component, unaware
 * of locale.
 */
export function VillaRedSunProductionPage({
  project,
  locale = "en",
  dict,
}: {
  project: Project;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const { beats } = project;
  const s = dict?.sections;
  const otherLocale: Locale = locale === "en" ? "da" : "en";

  return (
    <LightboxProvider dict={dict}>
      <BackToPortfolio locale={locale} dict={dict} />
      <LanguageSwitcher dict={dict ?? en} otherLocaleHref={localizedPath(otherLocale, `/projects/${project.id}`)} />
      <ProgressNav dict={dict} />
      <Hero project={project} locale={locale} />

      <div id="client-challenge">
        <EditorialText
          index={s?.clientChallenge ?? "01 — Client Challenge"}
          question={t(beats.clientChallenge.question, locale)}
          text={t(beats.clientChallenge.text, locale)}
        />
      </div>

      {/*
        Site Analysis narrative (heading + image grid) is intentionally not
        rendered for Villa Red Sun (explicit content decision — the section
        heading, wrapper, narrative text, and image grid are dropped). The
        Environmental Diagrams + Climate Interface that also live under this
        anchor are UNRELATED to that decision and continue to render
        unchanged via SiteAnalysisEditorial, which now renders only those.
        Villa Efe's own site-analysis-editorial.tsx is untouched.
      */}
      <div id="site">
        <SiteAnalysisEditorial project={project} locale={locale} dict={dict} />
      </div>

      <div id="constraints">
        <EditorialText
          index={s?.constraints ?? "03 — Constraints"}
          question={t(beats.constraints.question, locale)}
          text={t(beats.constraints.text, locale)}
        />
      </div>

      <div id="design-alternatives">
        <EditorialText
          index={s?.designThinking ?? "04 — Design Thinking"}
          question={t(beats.designThinking.question, locale)}
          text={t(beats.designThinking.text, locale)}
        />
        <AlternativesEditorial project={project} locale={locale} dict={dict} />
      </div>

      {beats.finalDecision.notApplicable ? null : (
        <div id="final-decision">
          <EditorialText
            index={s?.finalDecision ?? "06 — Final Decision"}
            question={t(beats.finalDecision.question, locale)}
            text={t(beats.finalDecision.text, locale)}
            emphasis
          />
        </div>
      )}

      <div id="final-architecture">
        <FinalArchitecture project={project} locale={locale} dict={dict} />
      </div>

      <div id="reflection">
        <Reflection project={project} locale={locale} dict={dict} />
      </div>
    </LightboxProvider>
  );
}
