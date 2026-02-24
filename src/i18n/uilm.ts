import type { Locale } from "./ui";
import en from "./translations/en.json";
import cs from "./translations/cs.json";

const localFallback: Record<Locale, Record<string, string>> = { en, cs };

const cultureMap: Record<Locale, string> = {
  en: "en-US",
  cs: "cs-CZ",
};

/** In-memory cache: locale -> { data, expiry } */
const cache = new Map<
  string,
  { data: Record<string, string>; expiry: number }
>();

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const API_KEY = "P43335b928ba643959d9755c542239a1d";
const API_BASE = "https://api.seliseblocks.com";

/**
 * Fetch translations for a locale from the UILM API (server-side).
 * Returns cached result if fresh, otherwise fetches from API.
 * Falls back to local JSON files if the API is unreachable.
 */
export async function fetchTranslations(
  locale: Locale,
  { skipCache = false }: { skipCache?: boolean } = {}
): Promise<Record<string, string>> {
  // Return from cache if still valid (unless bypass requested via ?nocache)
  if (!skipCache) {
    const cached = cache.get(locale);
    if (cached && Date.now() < cached.expiry) {
      return cached.data;
    }
  }

  try {
    const culture = cultureMap[locale] ?? "en-US";
    const params = new URLSearchParams({
      Language: culture,
      ModuleName: "common",
      ProjectKey: API_KEY,
    });

    const url = `${API_BASE}/uilm/v1/Key/GetUilmFile?${params.toString()}`;

    const res = await fetch(url, {
      headers: { "x-blocks-key": API_KEY },
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) {
      throw new Error(`UILM API responded with ${res.status}`);
    }

    const data = (await res.json()) as Record<string, string>;

    // Merge: API values override local fallback so new keys from local are preserved
    const merged = { ...localFallback[locale], ...data };

    cache.set(locale, { data: merged, expiry: Date.now() + CACHE_TTL_MS });
    return merged;
  } catch {
    // API unreachable — use local fallback
    return localFallback[locale] ?? localFallback.en;
  }
}
