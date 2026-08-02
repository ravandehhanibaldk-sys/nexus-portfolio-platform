import type { Project } from "@/lib/content-schema";
import { Hero } from "@/components/project/hero";
import { NarrativeTextBlock } from "@/components/project/narrative-text-block";
import { SiteAnalysis } from "@/components/project/site-analysis";
import { AlternativesComparator } from "@/components/project/alternatives-comparator";
import { FinalArchitecture } from "@/components/project/final-architecture";
import { Reflection } from "@/components/project/reflection";
import { ProgressNav } from "@/components/project/progress-nav";
import { BackToPortfolio } from "@/components/project/back-to-portfolio";
import { LightboxProvider } from "@/components/project/lightbox";

/**
 * The eight-beat Storytelling Framework (Section 12), assembled in order.
 * Shared by every project route (Section 21.2, Reusability Test) — a new
 * project is added by populating the Project Template (21), not by
 * duplicating this page shell.
 *
 * Section 09.2 — linear-first; ProgressNav is the secondary jump affordance.
 * Design Thinking and Design Alternatives (beats 04/05) share one scroll
 * anchor since the Comparator is the visual continuation of the Design
 * Thinking text, not a separate topic (Section 11.2).
 */
export function ProjectPage({ project }: { project: Project }) {
  const { beats } = project;

  return (
    <LightboxProvider>
      <BackToPortfolio />
      <ProgressNav />
      <Hero project={project} />

      <div id="client-challenge">
        <NarrativeTextBlock
          index="01 — Client Challenge"
          question={beats.clientChallenge.question}
          text={beats.clientChallenge.text}
        />
      </div>

      {beats.site.notApplicable ? null : (
        <div id="site">
          <NarrativeTextBlock
            index="02 — Site"
            question={beats.site.question}
            text={beats.site.text}
          />
          <SiteAnalysis project={project} />
        </div>
      )}

      <div id="constraints">
        <NarrativeTextBlock
          index="03 — Constraints"
          question={beats.constraints.question}
          text={beats.constraints.text}
        />
      </div>

      <div id="design-alternatives">
        <NarrativeTextBlock
          index="04 — Design Thinking"
          question={beats.designThinking.question}
          text={beats.designThinking.text}
        />
        <AlternativesComparator project={project} />
      </div>

      {beats.finalDecision.notApplicable ? null : (
        <div id="final-decision">
          <NarrativeTextBlock
            index="06 — Final Decision"
            question={beats.finalDecision.question}
            text={beats.finalDecision.text}
          />
        </div>
      )}

      <div id="final-architecture">
        <FinalArchitecture project={project} />
      </div>

      <div id="reflection">
        <Reflection project={project} />
      </div>
    </LightboxProvider>
  );
}
