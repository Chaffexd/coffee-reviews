import {
  availableLocales,
  contentfulLocales,
  defaultLocale,
  localesByCountry,
  resolveLocale,
} from "@/lib/locales";

// jest.setup.js stands in for next.config.mjs and provides CONTENTFUL_LOCALES.

describe("locales", () => {
  it("reads the list next.config.mjs fetched from Contentful", () => {
    expect(contentfulLocales.map((l) => l.code)).toEqual([
      "en-GB",
      "en-US",
      "zh-Hant-TW",
      "de-DE",
    ]);
  });

  it("takes the default from the locale Contentful marks as default", () => {
    expect(defaultLocale).toBe("en-GB");
  });

  it("translates the routing-only 'default' locale", () => {
    // Contentful answers "Unknown locale: default".
    expect(resolveLocale("default")).toBe("en-GB");
  });

  it("falls back when no locale is given at all", () => {
    expect(resolveLocale(undefined)).toBe("en-GB");
  });

  it("passes a real locale straight through", () => {
    expect(resolveLocale("de-DE")).toBe("de-DE");
  });

  it("labels each locale with its Contentful name and a flag", () => {
    expect(availableLocales).toContainEqual({
      locale: "de-DE",
      language: "🇩🇪 German (Germany)",
    });
  });

  it("finds the region even when the code has a script subtag", () => {
    expect(availableLocales).toContainEqual({
      locale: "zh-Hant-TW",
      language: "🇹🇼 Chinese (Traditional, Taiwan)",
    });
    expect(localesByCountry.TW).toBe("zh-Hant-TW");
  });

  it("maps countries to locales for the middleware's geo-redirect", () => {
    expect(localesByCountry).toEqual({
      GB: "en-GB",
      US: "en-US",
      TW: "zh-Hant-TW",
      DE: "de-DE",
    });
  });
});
