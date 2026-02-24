export const locales = ["en", "cs"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/**
 * Return the translated string from a translations record.
 * Falls back to the raw key if not found.
 */
export function t(translations: Record<string, string>, key: string): string {
  return translations[key] ?? key;
}

/**
 * Extract the locale prefix from a URL pathname.
 * e.g. "/cs/about" -> "cs", "/en/" -> "en", "/" -> "en"
 */
export function getLocaleFromUrl(url: URL): Locale {
  const segment = url.pathname.split("/")[1] as Locale;
  return locales.includes(segment) ? segment : defaultLocale;
}
