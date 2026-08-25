import Link from "next/link";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Fixed top-right locale switch, mirroring BackToPortfolio's fixed
 * top-left position. `otherLocaleHref` is the same page in the other
 * locale — each page computes it directly from its own known path shape
 * (Workstream 3, Phase A: "locale switch preserving current page where
 * possible").
 */
export function LanguageSwitcher({
  dict,
  otherLocaleHref,
}: {
  dict: Dictionary;
  otherLocaleHref: string;
}) {
  return (
    <Link
      href={otherLocaleHref}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-40 inline-flex items-center gap-2 rounded-full bg-paper/90 backdrop-blur-sm border border-divider px-4 py-2 text-meta font-body text-ink shadow-sm transition-colors duration-[var(--duration-base)] hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      {dict.common.switchLanguage}
    </Link>
  );
}
