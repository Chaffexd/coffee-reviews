import { client } from "@/lib/contentful";
import { siteUrl } from "@/lib/hreflang";
import {
  buildLlmsTxt,
  buildPageMarkdown,
  pickLocale,
  reviewToMarkdown,
} from "@/lib/llms";

jest.mock("@/lib/contentful", () => ({
  client: { getEntries: jest.fn() },
}));

const review = {
  sys: { updatedAt: "2026-09-01T10:00:00.000Z" },
  fields: {
    pageTitle: "Monmouth Coffee",
    slug: "monmouth-coffee",
    pagePath: { fields: { slug: "reviews" } },
    articleIntroSnippet: "A queue worth joining.",
    coffeeRating: 92,
    region: "London",
    reviewDate: "2026-08-20T00:00:00.000Z",
    storeLocation: { lat: 51.505, lon: -0.091 },
    seoMetadata: { fields: { description: "Single-origin pour-over." } },
    articleContent: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          data: {},
          content: [{ nodeType: "text", value: "Great.", marks: [], data: {} }],
        },
      ],
    },
  },
};

const article = {
  sys: { updatedAt: "2026-09-02T10:00:00.000Z" },
  fields: {
    title: "Pour-over basics",
    slug: "pour-over",
    dateOfPublication: "2026-07-01",
    body: "Grind, bloom, pour.",
  },
};

// Reviews and articles are both fetched through getEntries.
const respondWith = ({ reviews = [], articles = [] }) =>
  client.getEntries.mockImplementation(async ({ content_type }) => ({
    items: content_type === "article" ? reviews : articles,
  }));

beforeEach(() => jest.clearAllMocks());

describe("pickLocale", () => {
  it("keeps a locale Contentful serves", () => {
    expect(pickLocale("de-DE")).toBe("de-DE");
  });

  it("falls back to the default for anything else", () => {
    // The locale comes from the URL, so it can be anything.
    expect(pickLocale("reviews")).toBe("en-GB");
    expect(pickLocale(undefined)).toBe("en-GB");
  });
});

describe("reviewToMarkdown", () => {
  it("leads with front matter pointing at the canonical page", () => {
    const markdown = reviewToMarkdown(review, "en-GB");

    expect(markdown.startsWith("---\n")).toBe(true);
    expect(markdown).toContain(
      `url: "${siteUrl}/en-GB/reviews/monmouth-coffee"`,
    );
  });

  it("writes the review's facts as plain text", () => {
    const markdown = reviewToMarkdown(review, "en-GB");

    expect(markdown).toContain("# Monmouth Coffee");
    expect(markdown).toContain("> A queue worth joining.");
    expect(markdown).toContain("- Rating: 92/100");
    expect(markdown).toContain("- Region: London");
    expect(markdown).toContain("- Reviewed: 2026-08-20");
    expect(markdown).toContain("- Location: 51.505, -0.091");
    expect(markdown.endsWith("Great.")).toBe(true);
  });
});

describe("buildLlmsTxt", () => {
  it("links every review and article to its Markdown copy", async () => {
    respondWith({ reviews: [review], articles: [article] });

    const output = await buildLlmsTxt({ locale: "en-GB" });

    expect(output.startsWith("# The Coffee Review\n\n> ")).toBe(true);
    expect(output).toContain(
      `- [Monmouth Coffee](${siteUrl}/en-GB/reviews/monmouth-coffee.md): 92/100, London. Single-origin pour-over.`,
    );
    expect(output).toContain(
      `- [Pour-over basics](${siteUrl}/en-GB/articles/pour-over.md)`,
    );
    expect(output).toContain("## Optional");
  });

  it("prefers the editor's llmSummary when there is one", async () => {
    respondWith({
      reviews: [
        { ...review, fields: { ...review.fields, llmSummary: "Written for agents." } },
      ],
    });

    expect(await buildLlmsTxt({ locale: "en-GB" })).toContain(
      "92/100, London. Written for agents.",
    );
  });

  it("asks Contentful for more than the default 100 entries", async () => {
    respondWith({});

    await buildLlmsTxt({ locale: "en-GB" });

    for (const [query] of client.getEntries.mock.calls) {
      expect(query.limit).toBeGreaterThan(100);
    }
  });
});

describe("buildPageMarkdown", () => {
  it("returns the Markdown and canonical path for a review", async () => {
    respondWith({ reviews: [review] });

    const page = await buildPageMarkdown({
      section: "reviews",
      slug: "monmouth-coffee",
      locale: "en-GB",
    });

    expect(page.path).toBe("/reviews/monmouth-coffee");
    expect(page.markdown).toContain("# Monmouth Coffee");
    // An exact match, unlike the [match] search the review page uses.
    expect(client.getEntries.mock.calls[0][0]["fields.slug"]).toBe(
      "monmouth-coffee",
    );
  });

  it("returns null for a slug Contentful doesn't have", async () => {
    respondWith({});

    expect(
      await buildPageMarkdown({ section: "articles", slug: "nope", locale: "en-GB" }),
    ).toBeNull();
  });

  it("returns null for a section it doesn't serve", async () => {
    expect(
      await buildPageMarkdown({ section: "about", slug: "x", locale: "en-GB" }),
    ).toBeNull();
    expect(client.getEntries).not.toHaveBeenCalled();
  });
});
