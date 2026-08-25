"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/** Corrects the root <html lang> to match the active locale segment. */
export function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
