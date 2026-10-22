// The locale list comes from Contentful: next.config.mjs fetches the space's
// locales at build time and inlines them as CONTENTFUL_LOCALES. Next.js fixes
// its routing locales at build time too, so a locale enabled in Contentful goes
// live on the next deploy.
export const contentfulLocales = JSON.parse(
  process.env.CONTENTFUL_LOCALES || "[]",
);

export const defaultLocale = contentfulLocales.find((l) => l.default)?.code;

// next.config.mjs sets defaultLocale: "default", which is a routing locale only
// — Contentful rejects it with "Unknown locale: default".
export function resolveLocale(locale) {
  return !locale || locale === "default" ? defaultLocale : locale;
}

// The region is the last subtag, which also holds for codes with a script
// subtag such as zh-Hant-TW.
function regionOf(code) {
  const region = code.split("-").at(-1);
  return /^[A-Z]{2}$/.test(region) ? region : null;
}

// Regional indicator symbols: "DE" -> 🇩🇪
function flagFor(code) {
  const region = regionOf(code);
  if (!region) {
    return "";
  }
  return String.fromCodePoint(
    ...[...region].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65),
  );
}

export const availableLocales = contentfulLocales.map(({ code, name }) => ({
  locale: code,
  language: `${flagFor(code)} ${name}`.trim(),
}));

// Used by the middleware to pick a locale from the visitor's country. If two
// locales share a region, the first one Contentful lists wins.
export const localesByCountry = contentfulLocales.reduce((map, { code }) => {
  const region = regionOf(code);
  if (region && !map[region]) {
    map[region] = code;
  }
  return map;
}, {});
