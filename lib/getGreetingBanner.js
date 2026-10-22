import { client } from "@/lib/contentful";
import { resolveLocale } from "@/lib/locales";

// The entry the site renders. This has to be pinned to an id, because
// personalization variants are entries of the *same* content type — so
// "the greetingBanner entry" stops being a meaningful phrase the moment the
// first variant exists. Filtering by content type alone previously returned an
// arbitrary one of five, which meant the banner rendered a variant directly and
// no personalization ran at all.
//
// Entry ids survive environment clones, so this holds across environments. The
// env var is there if you ever need to point a preview environment elsewhere.
const SITE_WIDE_BANNER_ID =
  process.env.NEXT_PUBLIC_GREETING_BANNER_ID ?? "4eJEG3bwVZg41uvS4h9L4C";

// The banner is site-wide, but Layout lives in _app, which has no data fetching
// of its own in the Pages Router. So each page fetches the entry in
// getStaticProps and it reaches Layout via pageProps. The alternative — the
// component fetching for itself — would add a request per visitor and put
// content loading inside a presentational component.
//
// Returns null rather than undefined when there is no published banner, since
// getStaticProps props have to be JSON-serialisable.
export async function getGreetingBanner(locale) {
  const banners = await client.getEntries({
    content_type: "greetingBanner",
    "sys.id": SITE_WIDE_BANNER_ID,
    // banner -> nt_experiences -> nt_variants -> a variant's message -> the
    // nt_mergetag embedded in it is four levels, and the audience sits at two.
    // Too shallow and the variants arrive as unresolvable links, get filtered
    // out, and the baseline renders with no clue why.
    include: 5,
    limit: 1,
    // Normalised here too rather than trusting every caller to have done it.
    locale: resolveLocale(locale),
  });

  return banners.items[0] ?? null;
}
