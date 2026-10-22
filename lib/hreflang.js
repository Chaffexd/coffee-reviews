import { contentfulLocales, resolveLocale } from "@/lib/locales";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://coffee-reviews-delta.vercel.app";

// Builds a locale-less path from Contentful slugs, which may or may not carry
// slashes ("reviews", "/", "monmouth-coffee").
export function joinPath(...segments) {
  const parts = segments
    .flatMap((segment) => String(segment).split("/"))
    .filter(Boolean);
  return `/${parts.join("/")}`;
}

// trailingSlash is false in next.config.mjs, so the homepage is /de-DE, not
// /de-DE/.
export function localizedUrl(locale, path) {
  return `${siteUrl}/${resolveLocale(locale)}${path === "/" ? "" : path}`;
}

// Every page lists every locale, itself included. Slugs aren't localized, so
// only the prefix differs. x-default is the unprefixed URL, which the
// middleware geo-redirects to a locale.
export function hreflangAlternates(path) {
  return [
    ...contentfulLocales.map(({ code }) => ({
      hreflang: code,
      href: localizedUrl(code, path),
    })),
    { hreflang: "x-default", href: `${siteUrl}${path}` },
  ];
}
