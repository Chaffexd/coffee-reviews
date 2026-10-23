import { buildLlmsFullTxt, buildLlmsTxt, pickLocale } from "@/lib/llms";

// Serves /llms.txt and /llms-full.txt through the rewrites in next.config.mjs.
// Built per request and cached at the CDN, so a publish in Contentful shows up
// within minutes without a deploy.
export default async function handler(req, res) {
  const locale = pickLocale(req.query.locale);
  const body = req.query.full
    ? await buildLlmsFullTxt({ locale })
    : await buildLlmsTxt({ locale });

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=86400",
  );
  res.status(200).send(body);
}
