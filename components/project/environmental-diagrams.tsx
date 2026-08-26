"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInlineSvgLoader, wireHeading, wireNth, wireText } from "@/lib/svg-wiring";
import en from "@/dictionaries/en";
import { SolarPath, SolarMetrics, SolarReading } from "./solar-diagram";
import { WindFlow, WindExposure, PrevailingSector, EnvironmentalDisclosure, WindEnvelopeReading } from "./wind-diagram";
import type { ClimateInstrument } from "@/lib/content-schema";
import type { Locale } from "@/lib/locale";
import type { Dictionary } from "@/dictionaries/en";
import styles from "./environmental-diagrams.module.css";

const EASE = [0.2, 0, 0, 1] as const;
const MONTH_IDS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const CARD = "border border-divider bg-paper";

/**
 * ENVIRONMENTAL-DIAGRAMS-FINAL-WIRING-PASS-V2.md, Component 04 — mechanical
 * data binding onto public/diagrams/04-month-season-selector.svg, replacing
 * the previous hand-built month-tab row. `month-track` and the fixed
 * `season-*` markers are left exactly as delivered; only each month's own
 * `-selected`/`-node` visual state is toggled, and click/keyboard
 * interaction is wired onto the delivered `month-{mon}` groups so the
 * existing behavior (click, ArrowRight/Left, Home, End) is fully preserved
 * on the new artwork.
 */
export function EnvironmentalDiagrams({
  data,
  locale = "en",
  dict,
}: {
  data: ClimateInstrument;
  locale?: Locale;
  dict?: Dictionary;
}) {
  const [selected, setSelected] = useState(0);
  const selectedRef = useRef(0);
  const focusPendingRef = useRef(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const selectorLoaded = useInlineSvgLoader(selectorRef, "/diagrams/04-month-season-selector.svg");

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const goTo = (index: number, focusAfter = false) => {
    const next = ((index % 12) + 12) % 12;
    focusPendingRef.current = focusAfter;
    setSelected(next);
  };

  // Attach interaction once per SVG load — roving-tabindex tablist pattern,
  // matching Climate Interface's own existing month scrubber.
  useEffect(() => {
    if (!selectorLoaded) return;
    const c = selectorRef.current;
    if (!c) return;

    const cleanups: Array<() => void> = [];
    MONTH_IDS.forEach((id, i) => {
      const group = c.querySelector<SVGGElement>(`#month-${id}`);
      if (!group) return;
      group.setAttribute("role", "tab");
      group.setAttribute("tabindex", i === selectedRef.current ? "0" : "-1");
      group.setAttribute("aria-selected", i === selectedRef.current ? "true" : "false");
      group.style.cursor = "pointer";
      group.style.outline = "none";

      const onClick = () => goTo(i, false);
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goTo(i + 1, true);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goTo(i - 1, true);
        } else if (e.key === "Home") {
          e.preventDefault();
          goTo(0, true);
        } else if (e.key === "End") {
          e.preventDefault();
          goTo(11, true);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goTo(i, false);
        }
      };
      group.addEventListener("click", onClick);
      group.addEventListener("keydown", onKeyDown);
      cleanups.push(() => {
        group.removeEventListener("click", onClick);
        group.removeEventListener("keydown", onKeyDown);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [selectorLoaded]);

  // ENVIRONMENTAL-DIAGRAMS-RENDERING-COMPLETION-V1.md, Priority 2: 04's own
  // artwork includes a `month-state-guide` legend (DEFAULT/HOVER/SELECTED
  // example swatches, `translate(70 330)` with r=7 circles and 11px text —
  // visible content roughly y=320-340) — genuinely dev-reference content,
  // not needed in production, and disproportionately tall relative to the
  // information it carries. The lowest real content above it is the
  // month-node row (track at y=250, selected-ring outer radius 16, label
  // text at y=220) — bottom edge ~266. Cropping the *live, injected* SVG's
  // own viewBox to `0 0 1200 285` keeps a small margin below the nodes
  // while fully excluding the legend, without touching the source file or
  // any path/color/shape. Preserved from the previous pass — this fix is
  // unrelated to the structural layout work in this pass.
  useEffect(() => {
    if (!selectorLoaded) return;
    const svg = selectorRef.current?.querySelector("svg");
    svg?.setAttribute("viewBox", "0 0 1200 285");
  }, [selectorLoaded]);

  // Heading translation (item 5) — see wireHeading's doc comment in
  // lib/svg-wiring.ts. `dict` has no default param on this component
  // (unlike solar-diagram.tsx/wind-diagram.tsx), so fall back to `en`
  // explicitly rather than risk an unguarded dict?.climate access.
  useEffect(() => {
    if (!selectorLoaded) return;
    const d = dict ?? en;
    wireHeading(selectorRef.current, d.climate.monthSeasonSelectorHeading);
    // Item 5 — 04's own subtitle ("SEMANTIC VISUAL STATES · ...", `text.
    // label`, no id) and its 12 month labels (these already carry ids,
    // `month-{id}-label`, so wired directly via wireText rather than
    // wireNth). The month-state-guide legend (DEFAULT/HOVER/SELECTED) is
    // deliberately left untranslated — it sits outside the `0 0 1200 285`
    // viewBox crop applied below and is never actually visible.
    wireNth(selectorRef.current, "text.label", 0, d.climate.monthSeasonSelectorSubtitle.toUpperCase());
    const MONTH_ABBR_EN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    MONTH_IDS.forEach((id, i) => {
      const enKey = MONTH_ABBR_EN[i]!;
      wireText(selectorRef.current, `month-${id}-label`, d.climate.monthAbbrev[enKey] ?? enKey);
    });
  }, [selectorLoaded, dict]);

  // Visual selected-state + roving tabindex — re-runs whenever `selected`
  // changes, independent of the listener-attachment effect above.
  useEffect(() => {
    if (!selectorLoaded) return;
    const c = selectorRef.current;
    if (!c) return;
    MONTH_IDS.forEach((id, i) => {
      const group = c.querySelector<SVGGElement>(`#month-${id}`);
      const selectedCircle = c.querySelector<SVGCircleElement>(`#month-${id}-selected`);
      const node = c.querySelector<SVGCircleElement>(`#month-${id}-node`);
      const isSelected = i === selected;
      if (group) {
        group.setAttribute("aria-selected", isSelected ? "true" : "false");
        group.setAttribute("tabindex", isSelected ? "0" : "-1");
      }
      if (selectedCircle) selectedCircle.setAttribute("opacity", isSelected ? "1" : "0");
      if (node) node.setAttribute("fill", isSelected ? "#4f89c7" : "#b9bdc0");
      if (isSelected && focusPendingRef.current) {
        group?.focus();
      }
    });
    focusPendingRef.current = false;
  }, [selected, selectorLoaded]);

  // ENVIRONMENTAL-DIAGRAMS-STRUCTURAL-LAYOUT-FIX.md, Section 2 — the real
  // width constraint is the shared `<section className="max-w-6xl
  // mx-auto ...">` in the per-project site-analysis-editorial.tsx (1152px,
  // measured live). For Villa Efe that section also wraps unrelated
  // site-plan image content, so its own max-width can't be widened without
  // affecting that gallery. This breaks out to the viewport at `lg:` only
  // (mobile untouched), then re-centers to a wider reading width — scoped
  // entirely to this component's own wrapper. Widened from a fixed 1600px
  // to 1800px (FINAL-STRUCTURAL-LAYOUT-FIX pass): below 1800px viewport
  // width this is a no-op (still capped to the viewport, same as before),
  // it only gives large monitors more of their own width instead of
  // leaving it unused on either side.
  return (
    <div className="mb-10 lg:w-screen lg:mx-[calc(50%-50vw)]">
      <div className="lg:mx-auto lg:max-w-[1800px] lg:px-10">
        <p className="text-meta font-body text-neutral tracking-[0.15em] uppercase mb-3">
          {dict?.sections.environmentalDiagrams ?? "Environmental Diagrams"}
        </p>

        <div className={`${CARD} mb-4`}>
          <div ref={selectorRef} className="[&_svg]:w-full [&_svg]:h-auto" role="tablist" aria-label="Select month" />
        </div>

        {/* FINAL-STRUCTURAL-LAYOUT-FIX pass — replaces the previous
            row-locked `grid-template-areas` layout (environmental-diagrams
            .module.css). That layout paired Solar/Wind cells into shared
            row tracks; because Wind Exposure is far taller than its
            row-2 partner (the compact Solar daylight/altitude/sunrise/
            sunset strip), the shared row track expanded to match Wind's
            height, leaving a large dead gap inside the Solar column
            between Metrics and Reading — the actual cause of the reported
            "Solar column finishes too early / Wind column too tall"
            imbalance, not a width problem. It also forced Row 4
            (Prevailing Sector) into the "Solar" position, since Solar has
            3 components and Wind has 5.
            Fix: two independent flex columns, each stacking only its own
            cards (no shared row height with the other side). Solar stays
            permanently left, Wind permanently right; each column is only
            as tall as its own content, so the Solar column is now shorter
            but fully dense — no internal gap — instead of tall-with-a-hole.
            Mobile (no `lg:` prefix) stacks both columns in document order:
            all Solar cards, then all Wind cards — a deliberate change from
            the previous interleaved mobile order, so mobile and desktop
            now group content the same way; nothing else about mobile
            layout changed. */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className={styles.columns}
        >
          <div className={styles.column}>
            <div className={`${CARD} ${styles.card}`}>
              <SolarPath data={data} selectedIndex={selected} locale={locale} dict={dict} />
            </div>
            <div className={`${CARD} ${styles.card}`}>
              <SolarMetrics data={data} selectedIndex={selected} locale={locale} dict={dict} />
            </div>
            <div className={`${CARD} ${styles.card}`}>
              <SolarReading data={data} selectedIndex={selected} locale={locale} dict={dict} />
            </div>
            {/* Column-balance fix (M1): every "full illustration" card
                (01/02/03/08/09/06/07) renders at ~495-499px regardless of
                which side it's on — only 05's own 1200x300 viewBox makes
                it short (~197px). With 3 cards left / 5 right, columns
                measured 1223px vs 2543px live — a ~1320px gap, a large
                empty region under the left column on both projects.
                Moving exactly one full-height card re-balances to
                ~1734px vs ~2032px (~298px gap) — moving two overshoots
                the other way. Environmental Disclosure was chosen because
                it's a closing/caveats card, not an analytical diagram —
                it reads naturally as a final item in either column,
                unlike Prevailing Sector's own compass visualization,
                which stays grouped with the other illustrated diagrams.
                Nothing about the card's own content, wiring, or the
                "ENVIRONMENTAL DIAGRAMS" single unified instrument framing
                changes — this is a placement-only move. */}
            <div className={`${CARD} ${styles.card}`}>
              <EnvironmentalDisclosure data={data} selectedIndex={selected} locale={locale} dict={dict} />
            </div>
          </div>
          <div className={styles.column}>
            <div className={`${CARD} ${styles.card}`}>
              <WindFlow data={data} selectedIndex={selected} locale={locale} dict={dict} />
            </div>
            <div className={`${CARD} ${styles.card}`}>
              <WindExposure data={data} selectedIndex={selected} locale={locale} dict={dict} />
            </div>
            <div className={`${CARD} ${styles.card}`}>
              <WindEnvelopeReading data={data} selectedIndex={selected} locale={locale} dict={dict} />
            </div>
            <div className={`${CARD} ${styles.card}`}>
              <PrevailingSector data={data} selectedIndex={selected} locale={locale} dict={dict} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
