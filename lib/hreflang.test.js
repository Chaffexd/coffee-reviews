import {
  hreflangAlternates,
  joinPath,
  localizedUrl,
  siteUrl,
} from "@/lib/hreflang";

describe("joinPath", () => {
  it("joins Contentful slugs whether or not they carry slashes", () => {
    expect(joinPath("reviews", "monmouth-coffee")).toBe(
      "/reviews/monmouth-coffee",
    );
    expect(joinPath("/reviews/", "/monmouth-coffee")).toBe(
      "/reviews/monmouth-coffee",
    );
  });

  it("treats the homepage slug as the root", () => {
    expect(joinPath("/")).toBe("/");
  });
});

describe("localizedUrl", () => {
  it("prefixes the path with the locale", () => {
    expect(localizedUrl("de-DE", "/reviews")).toBe(`${siteUrl}/de-DE/reviews`);
  });

  it("does not leave a trailing slash on the homepage", () => {
    // next.config.mjs sets trailingSlash: false, so /de-DE/ would redirect.
    expect(localizedUrl("de-DE", "/")).toBe(`${siteUrl}/de-DE`);
  });

  it("never produces a /default URL", () => {
    expect(localizedUrl("default", "/about")).toBe(`${siteUrl}/en-GB/about`);
  });
});

describe("hreflangAlternates", () => {
  it("lists every Contentful locale, plus x-default", () => {
    expect(hreflangAlternates("/articles/flat-white")).toEqual([
      { hreflang: "en-GB", href: `${siteUrl}/en-GB/articles/flat-white` },
      { hreflang: "en-US", href: `${siteUrl}/en-US/articles/flat-white` },
      {
        hreflang: "zh-Hant-TW",
        href: `${siteUrl}/zh-Hant-TW/articles/flat-white`,
      },
      { hreflang: "de-DE", href: `${siteUrl}/de-DE/articles/flat-white` },
      { hreflang: "x-default", href: `${siteUrl}/articles/flat-white` },
    ]);
  });

  it("points x-default at the unprefixed homepage", () => {
    // The middleware geo-redirects unprefixed URLs, which is what x-default is
    // for.
    expect(hreflangAlternates("/").at(-1)).toEqual({
      hreflang: "x-default",
      href: `${siteUrl}/`,
    });
  });
});
