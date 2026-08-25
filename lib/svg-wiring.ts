"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * ENVIRONMENTAL-DIAGRAMS-FINAL-WIRING-PASS-V2.md, Section 3: the approved
 * production SVGs must be DOM-addressable at runtime, not rasterized or
 * used via <img>/background-image. This fetches the raw SVG markup (served
 * as a static asset from public/diagrams/, copied byte-for-byte from the
 * read-only source package) and injects it into a container div, then
 * hands the caller a scoped container ref to wire documented IDs against.
 *
 * Scoped per-instance querying (container.querySelector, never global
 * document.getElementById) is deliberate: several of the delivered SVGs
 * reuse the same internal IDs (e.g. "building-mass", "north-indicator"
 * appear in multiple files, and twin/single variants of the same
 * component share every ID) — multiple instances render on one page
 * simultaneously, so a page-global ID lookup would collide. This satisfies
 * the brief's own "or an equivalent React/SVG DOM reference" allowance.
 */
/**
 * Fetches and injects raw SVG markup into an already-created container ref
 * (the ref itself must come from a direct `useRef()` call in the calling
 * component — passed in as a parameter here, not created/returned by this
 * hook — so the caller's `ref={containerRef}` JSX usage is directly
 * traceable back to its `useRef()` origin).
 */
export function useInlineSvgLoader(containerRef: RefObject<HTMLDivElement | null>, url: string): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((r) => r.text())
      .then((markup) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = markup;
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
    // Each caller in this app uses a URL that is constant for the lifetime
    // of the mounted component (the twin/single variant is derived once
    // from the project's own title), so a URL change mid-mount never
    // actually occurs — `loaded` intentionally isn't reset to false here,
    // avoiding a synchronous setState-at-effect-start pattern for no real
    // behavioral benefit in this app's actual usage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return loaded;
}

function find(container: HTMLElement | null, id: string) {
  return container?.querySelector<SVGElement>(`#${CSS.escape(id)}`) ?? null;
}

/** Plain textContent replacement on a documented value slot. */
export function wireText(container: HTMLElement | null, id: string, value: string) {
  const el = find(container, id);
  if (el) el.textContent = value;
}

/** Show/hide a documented optional element/group — used whenever the real
 * project data does not support a given slot (per the brief's Section 8:
 * "hide the corresponding optional element/group — do not invent a
 * value"), rather than leaving a placeholder or fabricating content. */
export function wireHidden(container: HTMLElement | null, id: string, hidden: boolean) {
  const el = find(container, id);
  if (el) el.style.display = hidden ? "none" : "";
}

export function wireAttr(container: HTMLElement | null, id: string, attr: string, value: string) {
  const el = find(container, id);
  if (el) el.setAttribute(attr, value);
}

export function wireTransform(container: HTMLElement | null, id: string, transform: string) {
  wireAttr(container, id, "transform", transform);
}

/**
 * Word-wraps `text` into an SVG <text> element as <tspan> lines, replacing
 * whatever tspan structure the placeholder shipped with. Used only for
 * documented textContent slots (08's `interpretive-paragraph`, 09's
 * `wind-envelope-paragraph`) whose real, data-derived sentence is longer
 * than the delivered 2-line placeholder and would otherwise overflow the
 * artwork's fixed width — this reflows the same text element's rendering,
 * it does not add new artwork.
 */
/**
 * ENVIRONMENTAL-DIAGRAMS-RENDERING-COMPLETION-V1.md, Priority 1, Case D:
 * `08-solar-architectural-reading.svg` and `09-wind-envelope-reading.svg`
 * both ship a literal, un-expanded template placeholder — the text
 * `{massing("building-mass", "twin", x=…, y=…)}` — where their own
 * `building-mass` illustration should be. Confirmed by direct DOM
 * inspection: that exact string is present as a raw, unparsed text node,
 * not a CSS/viewBox clipping issue and not a partial-import bug.
 *
 * This is not fixable by "wiring" alone in the literal sense (the content
 * doesn't exist to bind to) — but the package's own README explicitly
 * describes `building-mass` as "a reusable twin-volume massing group" used
 * identically across 01/02/03. Reusing that already-approved, unmodified
 * fragment here — verbatim, not redrawn — is the one wiring-level action
 * that fills the gap without inventing new geometry: it is literally the
 * same artwork the package already ships, placed where its own broken
 * template call says it belongs.
 */
export function fillMassingPlaceholder(
  sourceContainer: HTMLElement | null,
  targetContainer: HTMLElement | null,
  targetGroupId: string,
  anchorX: number,
  anchorY: number,
  scale: number
) {
  const targetGroup = find(targetContainer, targetGroupId);
  if (!targetGroup) return;
  if (targetGroup.querySelector("#building-mass")) return; // already filled

  // Remove the broken placeholder text node(s) — never left visible as
  // stray literal `{massing(...)}` text, and never mistaken for real
  // artwork once replaced.
  Array.from(targetGroup.childNodes).forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE && /massing\(/.test(n.textContent ?? "")) {
      targetGroup.removeChild(n);
    }
  });

  const sourceMassing = sourceContainer?.querySelector<SVGGraphicsElement>("#building-mass");
  if (!sourceMassing) return;
  const bbox = sourceMassing.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  const clone = sourceMassing.cloneNode(true) as SVGElement;
  const dx = anchorX - cx * scale;
  const dy = anchorY - cy * scale;
  clone.setAttribute("transform", `translate(${dx.toFixed(1)} ${dy.toFixed(1)}) scale(${scale})`);
  targetGroup.appendChild(clone);
}

export function wireWrappedText(container: HTMLElement | null, id: string, text: string, maxChars = 40, lineHeight = 25) {
  const el = find(container, id);
  if (!el) return;
  const x = el.getAttribute("x") ?? "0";
  while (el.firstChild) el.removeChild(el.firstChild);
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const next = current ? `${current} ${w}` : w;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = w;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  lines.forEach((line, i) => {
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.setAttribute("x", x);
    tspan.setAttribute("dy", i === 0 ? "0" : String(lineHeight));
    tspan.textContent = line;
    el.appendChild(tspan);
  });
}
