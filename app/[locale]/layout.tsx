import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { LocaleHtmlLang } from "./locale-html-lang";

/**
 * Workstream 3 — locale segment layout. Nested under the true root layout
 * (app/layout.tsx, which still owns the single <html>/<body> and fonts —
 * Next.js requires exactly one root layout for that). `<html lang>` can't
 * be set dynamically from the outer root layout (it has no access to this
 * segment's `locale` param), so it's corrected client-side here via
 * LocaleHtmlLang rather than introducing middleware for a single attribute.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlLang locale={locale as Locale} />
      {children}
    </>
  );
}
