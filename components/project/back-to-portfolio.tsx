import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Permanent return-to-home affordance for every project page. Fixed at the
 * top-left, above the Hero (19.1) rather than inside it, so it never
 * competes with the Hero's own text — a light, translucent pill reads
 * clearly over both the dark Hero photo and the paper-toned body sections
 * beneath it as the reader scrolls.
 */
export function BackToPortfolio() {
  return (
    <Link
      href="/"
      className="group fixed top-4 left-4 md:top-6 md:left-6 z-40 inline-flex items-center gap-2 rounded-full bg-paper/90 backdrop-blur-sm border border-divider pl-3 pr-4 py-2 text-meta font-body text-ink shadow-sm transition-colors duration-[var(--duration-base)] hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <ArrowLeft
        size={16}
        strokeWidth={1.75}
        className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-editorial)] group-hover:-translate-x-0.5"
      />
      Back to Portfolio
    </Link>
  );
}
