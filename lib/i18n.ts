import "server-only";
import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/locale";

export * from "@/lib/locale";

/**
 * Workstream 3 — Bilingual / i18n architecture.
 * Two production locales: English (default) and Danish. Centralized
 * dictionary lookup (execution pack Workstream 3, Phase A) — components
 * never hardcode English/Danish strings themselves; they receive a
 * resolved `dict` (or `locale`) from their page and read from it.
 *
 * Server-only: dictionaries are dynamically imported and resolved once per
 * request in a Server Component page, then passed down as a plain-data
 * prop (no functions on it — see lib/i18n-format.ts) to client components.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en").then((m) => m.default),
  da: () => import("@/dictionaries/da").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
