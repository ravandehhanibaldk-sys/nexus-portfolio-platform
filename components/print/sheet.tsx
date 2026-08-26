/**
 * One physical A4 page. `index` is the sheet's position in final document
 * order — the export script reads `data-sheet-index` to interleave the
 * separately-captured portrait and landscape passes back into one PDF
 * (see scripts/export-pdf.mjs). Each Sheet is designed to fill exactly one
 * page; content is curated to fit rather than left to overflow.
 */
export function Sheet({
  index,
  orientation,
  children,
  bg,
}: {
  index: number;
  orientation: "portrait" | "landscape";
  children: React.ReactNode;
  /** Optional full-bleed background color override (e.g. cover, dark spreads). */
  bg?: string;
}) {
  return (
    <section
      className="sheet"
      data-sheet-index={index}
      data-orientation={orientation}
      style={bg ? { background: bg } : undefined}
    >
      {children}
    </section>
  );
}

export function SheetPad({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`sheet-pad ${className}`}>{children}</div>;
}

/**
 * Total sheet count in the current landscape production document
 * (app/print/test-full-landscape-redesign/page.tsx) — used for the
 * "NN / TOTAL" folio number (item 17). Update this if a sheet is ever
 * added or removed from that page.
 */
export const TOTAL_SHEETS = 18;

/** Small running footer — page context, kept quiet. `index` (the same
 * 0-based Sheet index every sheet already receives) renders a subordinate
 * "NN / TOTAL" folio number between left/right, without changing the
 * existing left/right hierarchy — it's the same size/weight as before,
 * the folio is deliberately smaller and more muted. */
export function SheetFooter({
  left,
  right,
  index,
}: {
  left: string;
  right: string;
  index?: number;
}) {
  return (
    <div className="mt-auto pt-4 flex items-baseline justify-between border-t border-divider">
      <span className="text-meta font-body text-neutral tracking-[0.1em] uppercase">{left}</span>
      {index !== undefined ? (
        <span className="text-[9px] font-body text-neutral/50 tracking-[0.1em]">
          {String(index + 1).padStart(2, "0")} / {TOTAL_SHEETS}
        </span>
      ) : null}
      <span className="text-meta font-body text-neutral tracking-[0.1em] uppercase">{right}</span>
    </div>
  );
}
