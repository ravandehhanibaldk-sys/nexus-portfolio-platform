import type { Metadata } from "next";
import { notFound } from "next/navigation";
import aboutContent from "@/content/about";
import { AboutPage } from "@/components/about/about-page";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = isLocale(locale) ? locale : "en";
  return {
    title: aboutContent.metaTitle[safeLocale],
    description: aboutContent.metaDescription[safeLocale],
  };
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <AboutPage content={aboutContent} locale={locale} dict={dict} />;
}
