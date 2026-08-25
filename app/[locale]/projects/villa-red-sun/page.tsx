import type { Metadata } from "next";
import { notFound } from "next/navigation";
import villaRedSun from "@/content/projects/villa-red-sun";
import { VillaRedSunProductionPage } from "@/components/red-sun/villa-red-sun-production-page";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { t } from "@/lib/content-schema";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  return {
    title: `${villaRedSun.name} — Hanibal Ravandeh`,
    description: t(villaRedSun.thesisSentence, safeLocale),
  };
}

export default async function VillaRedSunPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <VillaRedSunProductionPage project={villaRedSun} locale={locale} dict={dict} />;
}
