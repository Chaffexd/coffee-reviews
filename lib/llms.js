import { client } from "@/lib/contentful";
import { getArticleBySlug, getArticles } from "@/lib/articles";
import { joinPath, localizedUrl } from "@/lib/hreflang";
import {
  formatFrontMatter,
  formatLlmsTxt,
  truncate,
} from "@/lib/llmsTxt";
import { contentfulLocales, defaultLocale } from "@/lib/locales";
import { richTextToMarkdown } from "@/lib/richTextToMarkdown";

// The site-specific half of llms.txt: which content types become pages, where
// they live and how they are described. Reviews use the "article" content type;
// articles use "coffeeArticle".
const reviewContentType = "article";

// The locale comes from a URL anyone can type, so only locales Contentful
// serves get through; anything else would fail with "Unknown locale".
export function pickLocale(requested) {
  return contentfulLocales.some(({ code }) => code === requested)
    ? requested
    : defaultLocale;
}

export function reviewPath(review) {
  return joinPath(
    review.fields.pagePath?.fields?.slug ?? "reviews",
    review.fields.slug,
  );
}

export function articlePath(article) {
  return joinPath("articles", article.fields.slug);
}

export async function getReviews({ locale }) {
  const response = await client.getEntries({
    content_type: reviewContentType,
    // pagePath and seoMetadata are one level down.
    include: 2,
    locale,
    limit: 1000,
    order: "-fields.reviewDate",
  });

  return response.items;
}

export async function getReviewBySlug({ locale, slug }) {
  const response = await client.getEntries({
    content_type: reviewContentType,
    include: 10,
    locale,
    "fields.slug": slug,
    limit: 1,
  });

  return response.items[0] ?? null;
}

export function reviewToMarkdown(review, locale) {
  const {
    pageTitle,
    articleIntroSnippet,
    coffeeRating,
    reviewDate,
    region,
    storeLocation,
    articleContent,
  } = review.fields;

  const facts = [
    coffeeRating != null && `- Rating: ${coffeeRating}/100`,
    region && `- Region: ${region}`,
    reviewDate && `- Reviewed: ${reviewDate.slice(0, 10)}`,
    storeLocation && `- Location: ${storeLocation.lat}, ${storeLocation.lon}`,
  ].filter(Boolean);

  return [
    formatFrontMatter({
      title: pageTitle,
      url: localizedUrl(locale, reviewPath(review)),
      locale,
      reviewed: reviewDate,
      updated: review.sys.updatedAt,
    }),
    `# ${pageTitle}`,
    articleIntroSnippet && `> ${articleIntroSnippet}`,
    facts.join("\n"),
    richTextToMarkdown(articleContent),
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function articleToMarkdown(article, locale) {
  const { title, dateOfPublication, body } = article.fields;

  return [
    formatFrontMatter({
      title,
      url: localizedUrl(locale, articlePath(article)),
      locale,
      published: dateOfPublication,
      updated: article.sys.updatedAt,
    }),
    `# ${title}`,
    richTextToMarkdown(body),
  ]
    .filter(Boolean)
    .join("\n\n");
}

// Rating and region lead: they are what a model is most likely asked about.
// llmSummary is optional (migrations/003) and written for exactly this line.
function describeReview(review) {
  const { llmSummary, seoMetadata, articleIntroSnippet, coffeeRating, region } =
    review.fields;
  const facts = [coffeeRating != null && `${coffeeRating}/100`, region]
    .filter(Boolean)
    .join(", ");
  const summary = truncate(
    llmSummary || seoMetadata?.fields?.description || articleIntroSnippet,
  );

  return [facts, summary].filter(Boolean).join(". ");
}

// Links point at the .md copy of each page, as the spec recommends.
const markdownUrl = (locale, path) => `${localizedUrl(locale, path)}.md`;

export async function buildLlmsTxt({ locale }) {
  const [reviews, articles] = await Promise.all([
    getReviews({ locale }),
    getArticles({ locale }),
  ]);

  return formatLlmsTxt({
    name: "The Coffee Review",
    summary:
      "Independent reviews of coffee shops, each scored out of 100, plus articles on brewing and coffee culture.",
    details:
      "Every link points to a Markdown copy of the page. Content is published from Contentful and refreshed every few minutes.",
    sections: [
      {
        title: "Reviews",
        links: reviews.map((review) => ({
          title: review.fields.pageTitle,
          url: markdownUrl(locale, reviewPath(review)),
          description: describeReview(review),
        })),
      },
      {
        title: "Articles",
        links: articles.map((article) => ({
          title: article.fields.title,
          url: markdownUrl(locale, articlePath(article)),
          description: truncate(
            article.fields.llmSummary || article.fields.excerpt,
          ),
        })),
      },
      {
        title: "Optional",
        links: [
          {
            title: "About",
            url: localizedUrl(locale, "/about"),
            description: "Who writes the reviews and how they are scored",
          },
        ],
      },
    ],
  });
}

// Each page's front matter marks where the next one starts.
export async function buildLlmsFullTxt({ locale }) {
  const [reviews, articles] = await Promise.all([
    getReviews({ locale }),
    getArticles({ locale }),
  ]);

  return [
    ...reviews.map((review) => reviewToMarkdown(review, locale)),
    ...articles.map((article) => articleToMarkdown(article, locale)),
  ].join("\n\n");
}

const pageBuilders = {
  reviews: async (slug, locale) => {
    const review = await getReviewBySlug({ locale, slug });
    return (
      review && {
        markdown: reviewToMarkdown(review, locale),
        path: reviewPath(review),
      }
    );
  },
  articles: async (slug, locale) => {
    const article = await getArticleBySlug({ locale, slug });
    return (
      article && {
        markdown: articleToMarkdown(article, locale),
        path: articlePath(article),
      }
    );
  },
};

// Returns null for an unknown section or slug, so the route can 404.
export async function buildPageMarkdown({ section, slug, locale }) {
  const build = pageBuilders[section];
  return build ? ((await build(slug, locale)) ?? null) : null;
}
