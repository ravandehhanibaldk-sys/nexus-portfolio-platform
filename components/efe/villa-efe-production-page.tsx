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
import { Frame } from "@/components/project/frame";
import { EditorialText } from "./editorial-text";
import { SiteAnalysisEditorial } from "./site-analysis-editorial";
import { LevelsEditorial } from "./levels-editorial";

/**
 * Villa Efe — production page, Phase 1 modernization.
 *
 * Mirrors components/red-sun/villa-red-sun-production-page.tsx exactly in
 * pattern, but is a wholly separate implementation — nothing here imports
 * from components/red-sun/, per the execution brief's explicit instruction
 * to keep the two project-scoped trees independent.
 *
 * Reused UNMODIFIED (shared with Villa Red Sun — safe to import, not safe
 * to edit): Hero, FinalArchitecture, Reflection, ProgressNav,
 * BackToPortfolio, LightboxProvider, and — inside SiteAnalysisEditorial —
 * the Climate Interface component itself.
 *
 * New for this pass (components/efe/): EditorialText, SiteAnalysisEditorial,
 * LevelsEditorial (four equal-weight levels — Basement/Ground/First/Roof —
 * replacing the tab-switcher; structurally different from Red Sun's
 * asymmetric B-2/C-1/D treatment because Efe's real data has no "selected"
 * level to weight differently).
 *
 * Anchor IDs match project-page.tsx exactly — ProgressNav's jump links
 * depend on them.
 *
 * Workstream 3: accepts `locale`/`dict`; unlike Villa Red Sun, Efe's Site
 * beat (heading + image grid) still renders in full — only Red Sun's was
 * removed, per that project-specific content decision.
 */
export function VillaEfeProductionPage({
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

      {beats.site.notApplicable ? null : (
        <div id="site">
          <EditorialText
            index={s?.site ?? "02 — Site"}
            question={t(beats.site.question, locale)}
            text={t(beats.site.text, locale)}
          />
          <SiteAnalysisEditorial project={project} locale={locale} dict={dict} />
        </div>
      )}

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
        {beats.designThinking.assets.length > 0 ? (
          <div className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-start-2 md:col-span-9 lg:col-start-3 lg:col-span-8">
                {beats.designThinking.assets.map((asset, i) => (
                  <Frame
                    key={asset.src}
                    projectId={project.id}
                    asset={asset}
                    gallery={beats.designThinking.assets}
                    index={i}
                    locale={locale}
                    dict={dict}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
        <LevelsEditorial project={project} locale={locale} dict={dict} />
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
