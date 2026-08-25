/**
 * Locale primitives with no "server-only" restriction — safe to import
 * from content-schema.ts (used by client components) as well as from
 * server-only lib/i18n.ts.
 */
export const LOCALES = ["en", "da"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Builds a same-page path prefixed for the target locale, e.g. "/da/projects/villa-efe". */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
