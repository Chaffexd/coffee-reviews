import { localizedUrl } from "@/lib/hreflang";
import { buildPageMarkdown, pickLocale } from "@/lib/llms";

// Serves /reviews/{slug}.md and /articles/{slug}.md, with or without a locale
// prefix, through the rewrites in next.config.mjs.
export default async function handler(req, res) {
  const { section, slug } = req.query;
  const locale = pickLocale(req.query.locale);
  const page = await buildPageMarkdown({ section, slug, locale });

  if (!page) {
    res.status(404).send("Not found");
    return;
  }

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=86400",
  );
  // Points search engines at the HTML page, so the .md copy isn't treated as
  // duplicate content.
  res.setHeader(
    "Link",
    `<${localizedUrl(locale, page.path)}>; rel="canonical"`,
  );
  res.status(200).send(page.markdown);
}
