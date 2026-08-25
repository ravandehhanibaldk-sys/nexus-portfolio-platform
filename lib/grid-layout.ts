/**
 * Balanced-row distribution for a variable-count image grid (the Plans
 * Grid, Final Architecture / Section Locator). Given `count` items and a
 * `maxColumns` cap, returns how many items belong in each row, most-even
 * distribution first — never a naive `ceil(count / rows)` applied
 * uniformly, which produces an isolated final item (e.g. 13 at maxColumns
 * 4 would wrongly yield 4+4+4+1 instead of the balanced 4+3+3+3).
 *
 * Pure and count/column-driven only — no project-specific branching, so
 * the same function serves any project regardless of how many plan images
 * it has (Workstream 2 visual-polish pass, Issue 3).
 */
export function computeBalancedRows(count: number, maxColumns: number): number[] {
  if (count <= 0) return [];
  const cols = Math.max(1, Math.floor(maxColumns));
  const rows = Math.ceil(count / cols);
  const base = Math.floor(count / rows);
  const remainder = count % rows;
  return Array.from({ length: rows }, (_, r) => base + (r < remainder ? 1 : 0));
}

/**
 * Splits an ordered array into rows per `computeBalancedRows`, preserving
 * the original left-to-right, top-to-bottom authored order.
 */
export function groupIntoBalancedRows<T>(items: T[], maxColumns: number): T[][] {
  const rowSizes = computeBalancedRows(items.length, maxColumns);
  const rows: T[][] = [];
  let cursor = 0;
  for (const size of rowSizes) {
    rows.push(items.slice(cursor, cursor + size));
    cursor += size;
  }
  return rows;
}
