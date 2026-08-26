import { z } from "zod";

/**
 * Task C — site-level personal About content. Separate from the project
 * content model (lib/content-schema.ts / content/projects/*.ts) since About
 * is about the portfolio owner, not a project — see MASTER-ADDENDUM-FINAL-V5.md,
 * "ABOUT ROUTE IDENTITY — CRITICAL DISTINCTION".
 *
 * SOURCE DISCIPLINE: the English text below is the canonical copy supplied
 * and explicitly approved for this implementation — transcribed verbatim,
 * not rewritten. It separates VERIFIED FACT (name, years of experience,
 * software, the 15-month Danish construction-site period, language levels —
 * all cross-checked against ABOUT-SOURCE-MATERIAL-RECONSTRUCTED.md) from
 * EDITORIAL SYNTHESIS (the IDEA↔SITE framing and the central thesis, which
 * that source document explicitly flags as derived from Villa Red Sun's
 * project evidence, not a recovered personal-interview transcript). Nothing
 * below claims to be a verbatim quote from an interview that was never
 * completed. No certifications, awards, clients, employers, or numerical
 * claims beyond what's explicitly listed in the source material were added.
 *
 * DANISH: full AI-drafted translation, preserving the English meaning and
 * register (no absolute claims — "always"/"every project"/"never" — beyond
 * what the English source itself states; the central thesis stays framed as
 * a personal working principle, not a universal claim). Reviewed and
 * corrected for natural Danish phrasing/grammar in a later pass (see
 * ARCHITECTURE_DECISIONS.md) — the internal QA notice that previously
 * flagged this text as machine-translated/pending-review has been removed
 * from production output now that the review has happened.
 */
const localizedString = z.object({ en: z.string(), da: z.string() });
export type LocalizedString = z.infer<typeof localizedString>;

const aboutSection = z.object({
  heading: localizedString.optional(),
  paragraphs: z.array(localizedString),
  pullQuote: localizedString.optional(),
  cycle: localizedString.optional(),
});

export const aboutSchema = z.object({
  metaTitle: localizedString,
  metaDescription: localizedString,
  pageHeading: localizedString,
  shortTeaser: localizedString,
  sections: z.array(aboutSection),
});

export type AboutContent = z.infer<typeof aboutSchema>;

const about: AboutContent = {
  metaTitle: { en: "About — Hanibal Ravandeh", da: "Om — Hanibal Ravandeh" },
  metaDescription: {
    en: "I work between ideas and evidence.",
    da: "Jeg arbejder i spændingsfeltet mellem idé og evidens.",
  },
  pageHeading: { en: "About", da: "Om" },
  shortTeaser: {
    en: "I work between ideas and evidence.\n\nI study the site, test serious alternatives, and use visualization and BIM to make architectural decisions visible.\n\nI trust the first idea enough to fight for it — but not enough to stop testing it.",
    da: "Jeg arbejder i spændingsfeltet mellem idé og evidens.\n\nJeg undersøger grunden, afprøver seriøse alternativer og bruger visualisering og BIM til at gøre arkitektoniske beslutninger synlige.\n\nJeg har tillid nok til den første idé til at kæmpe for den — men ikke nok til at holde op med at afprøve den.",
  },
  sections: [
    {
      paragraphs: [
        { en: "I work between ideas and evidence.", da: "Jeg arbejder i spændingsfeltet mellem idé og evidens." },
        {
          en: "I am an Architectural Designer, focused on residential renovation, extension, and new-build design, with more than 13 years of experience working across architectural visualization, BIM, and design development.",
          da: "Jeg er Architectural Designer med fokus på boligrenovering, tilbygning og nybyggeri, med mere end 13 års erfaring inden for arkitektonisk visualisering, BIM og designudvikling.",
        },
        { en: "My approach begins before the model.", da: "Min tilgang begynder før modellen." },
        {
          en: "I study the site, its constraints, its surroundings, and the conditions that can shape a project. Then I test ideas against those conditions rather than assuming that the first answer is the right one.",
          da: "Jeg undersøger grunden, dens begrænsninger, dens omgivelser og de forhold, der kan forme et projekt. Derefter afprøver jeg idéer mod disse forhold i stedet for at antage, at det første svar er det rigtige.",
        },
      ],
    },
    {
      heading: { en: "Idea ↔ Site", da: "Idé ↔ grund" },
      paragraphs: [
        {
          en: "I don't see an architectural idea and its site as separate steps.",
          da: "Jeg betragter ikke en arkitektonisk idé og dens grund som adskilte trin.",
        },
        { en: "The site can challenge the idea.", da: "Grunden kan udfordre idéen." },
        { en: "The idea can reveal something new about the site.", da: "Idéen kan afsløre noget nyt om grunden." },
        { en: "That tension is where the work begins.", da: "Den spænding er, hvor arbejdet begynder." },
        {
          en: "I develop alternatives seriously enough that each one can be judged on its own merits. Iteration is not about producing more options for the sake of it. It is about making the alternatives concrete enough to compare, test, and eventually defend a decision with evidence.",
          da: "Jeg udvikler alternativer seriøst nok til, at hvert enkelt kan bedømmes på sine egne præmisser. Iteration handler ikke om at producere flere muligheder for deres egen skyld. Det handler om at gøre alternativerne konkrete nok til at sammenligne, teste og til sidst forsvare en beslutning med evidens.",
        },
        { en: "The principle behind this process is simple:", da: "Princippet bag denne proces er enkelt:" },
      ],
      pullQuote: {
        en: "I trust the first idea enough to fight for it — but not enough to stop testing it.",
        da: "Jeg har tillid nok til den første idé til at kæmpe for den — men ikke nok til at holde op med at afprøve den.",
      },
    },
    {
      heading: { en: "From Idea to Evidence", da: "Fra idé til evidens" },
      paragraphs: [
        { en: "A project often moves through a cycle:", da: "Et projekt bevæger sig ofte gennem en cyklus:" },
      ],
      cycle: {
        en: "IDEA → SITE → TENSION → ITERATION → EVIDENCE → DECISION → REALIZATION → REFLECTION",
        da: "IDÉ → GRUND → SPÆNDING → ITERATION → EVIDENS → BESLUTNING → REALISERING → REFLEKSION",
      },
    },
    {
      paragraphs: [
        {
          en: "The important part is not the number of iterations. It is what each iteration makes possible: a clearer comparison, a stronger decision, or evidence that an assumption needs to change.",
          da: "Det vigtige er ikke antallet af iterationer. Det er, hvad hver iteration gør muligt: en klarere sammenligning, en stærkere beslutning, eller evidens for, at en antagelse skal ændres.",
        },
        {
          en: "On Villa Red Sun, for example, multiple design proposals were developed and compared before the final direction was selected. The more complex solution was not chosen simply because it was more ambitious. It had to demonstrate better functionality, spatial quality, and architectural identity than the simpler alternatives.",
          da: "På Villa Red Sun blev der for eksempel udviklet og sammenlignet flere designforslag, før den endelige retning blev valgt. Den mere komplekse løsning blev ikke valgt, blot fordi den var mere ambitiøs. Den skulle dokumentere bedre funktionalitet, rumlig kvalitet og arkitektonisk identitet end de simplere alternativer.",
        },
      ],
    },
    {
      heading: { en: "How I Work", da: "Sådan arbejder jeg" },
      paragraphs: [
        {
          en: "I use visualization and BIM not simply as production tools, but as ways of making architectural decisions visible.",
          da: "Jeg bruger visualisering og BIM ikke blot som produktionsværktøjer, men som måder at gøre arkitektoniske beslutninger synlige på.",
        },
        {
          en: "My technical practice includes 3ds Max, V-Ray, Corona Renderer, AutoCAD, Revit, and Unreal Engine.",
          da: "Min tekniske praksis omfatter 3ds Max, V-Ray, Corona Renderer, AutoCAD, Revit og Unreal Engine.",
        },
        {
          en: "I also deliberately spent 15 months working hands-on within a Danish construction-site environment, using that experience to understand building culture and construction from closer to the physical reality of a project.",
          da: "Jeg har desuden bevidst tilbragt 15 måneder med praktisk arbejde i et dansk byggepladsmiljø for at forstå byggekultur og konstruktion tættere på et projekts fysiske virkelighed.",
        },
        {
          en: "The goal is not to make an image look convincing while the underlying idea remains unresolved.",
          da: "Målet er ikke at få et billede til at se overbevisende ud, mens den underliggende idé forbliver uafklaret.",
        },
        {
          en: "The goal is to make the architecture clear enough to question, compare, communicate, and ultimately build.",
          da: "Målet er at gøre arkitekturen klar nok til at blive udfordret, sammenlignet, kommunikeret og til sidst bygget.",
        },
      ],
    },
    {
      heading: { en: "Beyond the Image", da: "Ud over billedet" },
      paragraphs: [
        {
          en: "I am interested in the point where visual communication becomes architectural evidence.",
          da: "Jeg interesserer mig for det punkt, hvor visuel kommunikation bliver til arkitektonisk evidens.",
        },
        {
          en: "A successful visualization should do more than present a finished idea. It should help reveal why the idea exists, what it responds to, what alternatives were considered, and why the final decision is worth defending.",
          da: "En vellykket visualisering bør gøre mere end at præsentere en færdig idé. Den bør hjælpe med at afsløre, hvorfor idéen findes, hvad den svarer på, hvilke alternativer der blev overvejet, og hvorfor den endelige beslutning er værd at forsvare.",
        },
        {
          en: "That is where visualization, BIM, site understanding, and design thinking meet.",
          da: "Det er der, hvor visualisering, BIM, stedsforståelse og designtænkning mødes.",
        },
      ],
    },
  ],
};

export default aboutSchema.parse(about);
