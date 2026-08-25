import type { Metadata } from "next";
import { notFound } from "next/navigation";
import villaEfe from "@/content/projects/villa-efe";
import { VillaEfeProductionPage } from "@/components/efe/villa-efe-production-page";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { t } from "@/lib/content-schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  return {
    title: `${villaEfe.name} — Hanibal Ravandeh`,
    description: t(villaEfe.thesisSentence, safeLocale),
  };
}

export default async function VillaEfePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <VillaEfeProductionPage project={villaEfe} locale={locale} dict={dict} />;
}
