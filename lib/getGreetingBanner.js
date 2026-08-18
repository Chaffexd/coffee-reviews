import { client } from "@/lib/contentful";

// The banner is site-wide, but Layout lives in _app, which has no data fetching
// of its own in the Pages Router. So each page fetches the entry in
// getStaticProps and it reaches Layout via pageProps. The alternative — the
// component fetching for itself — would add a request per visitor and put
// content loading inside a presentational component.
//
// Returns null rather than undefined when there is no published banner, since
// getStaticProps props have to be JSON-serialisable.
// next.config.mjs sets defaultLocale: "default", which is a routing locale only
// — Contentful rejects it with "Unknown locale: default". Every page normalises
// it, but they do so in two different ways (some reassign `locale`, the articles
// pages derive `activeLocale`), so this normalises again rather than trusting the
// caller to have done it.
const CONTENTFUL_DEFAULT_LOCALE = "en-GB";

export async function getGreetingBanner(locale) {
  const banners = await client.getEntries({
    content_type: "greetingBanner",
    // Depth 2 resolves the nt_mergetag entries embedded inside message.
    include: 2,
    limit: 1,
    locale:
      !locale || locale === "default" ? CONTENTFUL_DEFAULT_LOCALE : locale,
  });

  return banners.items[0] ?? null;
}
