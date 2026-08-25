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

/** Small running footer — page context, kept quiet. */
export function SheetFooter({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <div className="mt-auto pt-4 flex items-baseline justify-between border-t border-divider">
      <span className="text-meta font-body text-neutral tracking-[0.1em] uppercase">{left}</span>
      <span className="text-meta font-body text-neutral tracking-[0.1em] uppercase">{right}</span>
    </div>
  );
}
