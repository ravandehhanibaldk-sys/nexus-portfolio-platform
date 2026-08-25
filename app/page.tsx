import { redirect } from "next/navigation";

/**
 * Workstream 3: the canonical home is now `/en` (English default) /
 * `/da` (Danish). This bare route preserves the pre-i18n URL rather than
 * breaking it — a redirect to the new canonical location, per the
 * execution pack's explicit "clean migration/redirect strategy" allowance.
 */
export default function RootRedirect() {
  redirect("/en");
}
