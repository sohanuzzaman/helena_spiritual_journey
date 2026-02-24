import { defineMiddleware } from "astro:middleware";
import { locales, defaultLocale, type Locale } from "./i18n/ui";

/** Parse the `lang_pref` cookie from a raw Cookie header. */
function getCookieLocale(cookieHeader: string | null): Locale | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)lang_pref=(\w+)/);
  if (!match) return null;
  const value = match[1] as Locale;
  return locales.includes(value) ? value : null;
}

/** Return the first site-supported locale from the Accept-Language header. */
function getAcceptLanguageLocale(header: string | null): Locale | null {
  if (!header) return null;

  // Parse entries like "cs-CZ,cs;q=0.9,en;q=0.8"
  const entries = header.split(",").map((part) => {
    const [lang, qPart] = part.trim().split(";");
    const q = qPart ? parseFloat(qPart.replace(/\s*q\s*=\s*/, "")) : 1;
    // Normalize to base language code (e.g. "cs-CZ" → "cs")
    const base = lang.trim().split("-")[0].toLowerCase();
    return { base, q };
  });

  // Sort by quality descending
  entries.sort((a, b) => b.q - a.q);

  for (const { base } of entries) {
    if (locales.includes(base as Locale)) {
      return base as Locale;
    }
  }
  return null;
}

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Only intercept the bare root path
  if (pathname !== "/") {
    return next();
  }

  const headers = context.request.headers;

  // 1. Explicit user preference cookie
  const cookieLocale = getCookieLocale(headers.get("cookie"));
  if (cookieLocale) {
    return context.redirect(`/${cookieLocale}/`, 302);
  }

  // 2. Cloudflare geo — CZ or SK → Czech
  const cf = (context.locals as any).runtime?.cf;
  const country = cf?.country as string | undefined;
  if (country === "CZ" || country === "SK") {
    return context.redirect("/cs/", 302);
  }

  // 3. Accept-Language header
  const acceptLocale = getAcceptLanguageLocale(headers.get("accept-language"));
  if (acceptLocale) {
    return context.redirect(`/${acceptLocale}/`, 302);
  }

  // 4. Default
  return context.redirect(`/${defaultLocale}/`, 302);
});
