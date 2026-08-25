/**
 * Plain string-template interpolation for dictionary values containing
 * `{token}` placeholders (see dictionaries/en.ts, dictionaries/da.ts).
 * Deliberately NOT closures stored on the dictionary objects themselves —
 * dictionaries must stay plain serializable data so they can be passed as
 * props from Server Components into "use client" components. Safe to
 * import from both server and client modules (no "server-only" marker).
 */
export function formatDict(template: string, vars: Record<string, string>): string {
  const replaced = template.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match);
  return replaced.charAt(0).toUpperCase() + replaced.slice(1);
}
