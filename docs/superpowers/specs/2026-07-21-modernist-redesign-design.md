# The Coffee Review - Modernist redesign (restyle only)

Date: 2026-07-21
Branch: design-v2

## Goal

Recreate the "Postcards from the Bean" / Modernist visual design (see `design/`) in
the existing Next.js (Pages Router) + Tailwind + Contentful app. This is a
**styling-only** pass.

## Hard constraints

1. **Do not change data fetching.** Every page keeps its current `getStaticProps` /
   `getStaticPaths` and renders only the fields it already fetches. No new Contentful
   queries, no new content types, no new fields on the content model.
2. **Client-side reshaping of already-fetched data is allowed** (sorting, filtering,
   deriving counts, mapping a score to beans) - it does not change fetching.
3. Copy voice: single hyphens only - no em/en dashes.
4. Keep the existing shadcn HSL CSS variables and `components/ui/sheet.js` working
   (MobileNav depends on the sheet).

## Data model (as it actually exists)

- **Reviews** = Contentful `content_type: "article"`. Fields used:
  `pageTitle`, `articleIntroSnippet`, `articlePreviewImage` (nested asset),
  `pagePath` (link w/ slug), `slug`, `storeLocation` (`{ lat, lon }`),
  `coffeeRating` (0-100), `reviewDate`, `articleContent` (rich text), `region`
  (Asia | Europe | North America), `seoMetadata`.
- **Editorial articles** = `content_type: "coffeeArticle"` via `lib/articles.js`.
  Fields: `title`, `slug`, `dateOfPublication`, `body` (rich text), `excerpt`
  (derived). No image field.
- **Landing** = `content_type: "page"`. Fields: `carousel`, `landingPageTitle`,
  `featuredArticles` (review entries), `pageInformation` (rich text), `seoMetadata`.
- **Locales (real, 7):** en-GB, en-US, de-DE, fr-FR, ja-JP, zh-Hant-TW, ko-KR
  (from `lib/locales.js` / `next.config.mjs` i18n). Switching stays on the existing
  next i18n routing.
- **Map:** Google Maps via `@vis.gl/react-google-maps` (`components/GoogleMap.js`).

## Decisions (from brainstorming)

- **Data scope:** Restyle current data only. Design sections that need data a page
  does not already fetch are dropped (see per-page table).
- **Bean rating:** Map `coffeeRating / 20` into the 5-bean glyph row and show the
  derived 0-5 number.
- **World map:** Keep Google Maps; restyle to the Modernist palette with red pins.

## Design system integration

Express Modernist as Tailwind tokens rather than importing the parallel
`.btn`/`.card` class layer:

- Extend `tailwind.config.mjs`:
  - colors: `bg #f3f2f2`, `surface #eae9e9`, `ink #201e1d`, accent ramp
    (`accent` `#ec3013`, `-600 #dd2b0f`, `-700 #ae1800`, `-800 #7c1405`,
    `-100 #fff2ef`), neutral ramp for the map (`#d7d3d3` land), `divider`.
  - fontFamily: `archivo` -> Archivo.
  - keep existing shadcn tokens and `coffee.*` intact.
- `globals.css`: load Archivo (400/600/800), set body to Archivo + `--color-bg`,
  headings weight 800 with tight tracking, themed `:focus-visible` accent ring,
  keep the existing shadcn `@layer base` block untouched.
- Reusable components:
  - `components/BeanRating.js` - row of 5 bean SVGs (`rx 6.5 ry 9.5` rotated 24 deg,
    fill logic: floor = full, `>= .5` = half at .55 opacity, rest outlined) + numeric
    label. Accepts a raw 0-100 rating and divides by 20. Also a `stamp` variant
    (round accent circle) for hero/detail.
  - `components/Steam.js` - animated steam SVG glyph for the wordmark, disabled under
    `prefers-reduced-motion`.

## Per-page scope

| Page | Restyle | Dropped (data not available) |
|---|---|---|
| Nav / Footer / MobileNav / Layout | Sticky 2px-rule nav, Archivo wordmark + steam, accent active link (`aria-current`), locale dropdown (real 7 locales w/ flags), Modernist footer + copy line, page gutters | - |
| Home | Hero (`landingPageTitle` + intro + primary/secondary CTA), restyled carousel, featured-review cards w/ bean rating, `pageInformation` rich text | City index, journal teasers, 4.7 avg stamp |
| Reviews | Kicker + H1, Modernist segmented region filter with per-region counts + "Showing N cafes", review cards w/ beans, sorted by score desc (client-side), restyled pagination | - |
| Review detail | Back link, region kicker + reviewed date, cafe H1, 16:7 hero + bean stamp, rich-text body, sticky sidebar (big score + bean row + "Find it" restyled Google map + location caption) | Standout/Price/Vibe/Would-return list, gallery, website link |
| Articles | "Editorial" kicker + H1 + intro, horizontal Modernist cards (date tag, title, excerpt, "Read complete article ->") | Thumbnail |
| Article detail | Back link, centered measure, "Article" kicker + date, H1, lede (excerpt), rich-text body in a 720px measure | Hero image, "Keep reading" related cards |
| About | Kicker + dynamic H1 (`N places`), restyled Google map (Modernist style + red pins), story copy, 4-col stat ledger (cafes = entries.length, languages = locales.length, continents = distinct regions, 0 sponsored), locale buttons | Beans hero photo |

## Review card (shared: Home + Reviews)

Column card, `surface` fill, 2px divider border, pointer. Hover: `translateY(-4px)`,
shadow-lg, border-color accent, image `scale(1.05)`, title -> accent. Thumb
`aspect-4/3` full-colour cover. Body: region `tag-accent`, `pageTitle` (22px/800),
`BeanRating`, 2-line `articleIntroSnippet` blurb.

## Interaction / behaviour

- Cards, nav, footer, back links use next `<Link>` (locale prefix preserved by i18n).
- Region filter: existing `?region=` query + client-side filter (unchanged logic),
  restyled to the segmented control; counts derived from the already-fetched array.
- Reviews sorted by `coffeeRating` desc client-side before paginating.
- Hover / focus states from the accent ramp; `:focus-visible` 2px accent ring.
- Steam animation 3.4s loop, staggered; off under `prefers-reduced-motion`.
- Responsive: 3-col grids collapse to 1-2 cols; hero + detail grid stack on
  tablet/phone via Tailwind breakpoints.

## Out of scope / follow-ups (user will revisit)

Adding the missing review fields (standout/price/vibe/wouldReturn/url/gallery),
editorial article images, the home city index + journal, and the d3 world map are
all deferred - each becomes additive once the field or query exists.

## Verification

- `npm run build` succeeds.
- `npm run lint` clean (or no new errors).
- Existing tests (`npm test`) still pass (notably `ArticleCard.test.js`).
- Manual: each of the 6 views renders with real Contentful data in `dev`.
