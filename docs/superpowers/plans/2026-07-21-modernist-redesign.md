# Modernist Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle all six views of The Coffee Review to the Modernist "Postcards from the Bean" design using the existing data, without touching data fetching.

**Architecture:** Express Modernist as Tailwind tokens (colours, Archivo font, zero radius) plus a small `globals.css` base layer, then restyle each page/component with Tailwind utilities. Two new presentational components - `BeanRating` and `Steam`. Every `getStaticProps`/`getStaticPaths` stays byte-for-byte unchanged.

**Tech Stack:** Next.js 16 (Pages Router), React 19, Tailwind 3, Contentful SDK, `@vis.gl/react-google-maps`, Jest + Testing Library.

## Global Constraints

- Do NOT edit any `getStaticProps`, `getStaticPaths`, `getArticles`, or `lib/contentful` fetching logic. Reshaping already-fetched data client-side (sort/filter/derive/map-to-beans) is allowed.
- No new Contentful content types or fields.
- Copy: single hyphens only - no em/en dashes.
- Keep the existing shadcn HSL variables and `@layer base` block in `globals.css`; keep `components/ui/sheet.js` working.
- Design tokens are verbatim from `design/design-system/styles.css`: bg `#f3f2f2`, surface `#eae9e9`, ink `#201e1d`, accent `#ec3013` (600 `#dd2b0f`, 700 `#ae1800`, 800 `#7c1405`, 100 `#fff2ef`), neutral land `#d7d3d3`, divider `color-mix(in srgb, #201e1d 40%, transparent)`. Radius 0 everywhere. Archivo 400/600/800.
- Reference: `design/Coffee Review.dc.html` (structure/behaviour), `design/screenshots/*.png` (look).

---

### Task 1: Design tokens + global base

**Files:**
- Modify: `tailwind.config.mjs`
- Modify: `styles/globals.css`

**Interfaces:**
- Produces: Tailwind colour tokens `bg`, `surface`, `ink`, `divider`, `accent` (+ `accent-600/700/800/100`), `land`; `font-archivo`; class `.steam-rise` keyframes; `.pc-card` hover helpers are NOT global (done per-component).

- [ ] **Step 1: Extend the Tailwind theme.** In `tailwind.config.mjs`, inside `theme.extend.colors`, add alongside `coffee`:

```js
bg: "#f3f2f2",
surface: "#eae9e9",
ink: "#201e1d",
divider: "rgba(32,30,29,0.4)",
land: "#d7d3d3",
accent: {
  DEFAULT: "#ec3013",
  100: "#fff2ef",
  600: "#dd2b0f",
  700: "#ae1800",
  800: "#7c1405",
},
```

Note: `accent` becomes an object, overriding the shadcn `accent` token. VERIFIED SAFE: no component uses `bg-accent`/`text-accent-foreground`/`border-accent` classes anywhere, and `ui/sheet.js` uses only `background`/`secondary` tokens. Keep `foreground: "hsl(var(--accent-foreground))"` inside the object anyway for belt-and-braces. Also add under `theme.extend`:

```js
fontFamily: {
  archivo: ['Archivo', 'system-ui', 'sans-serif'],
},
```

- [ ] **Step 2: Add Archivo + Modernist base to `globals.css`.** After the existing `@tailwind` lines and the embla/gm rules, add (do NOT remove the shadcn `@layer base` blocks):

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&display=swap');

@layer base {
  body {
    font-family: Archivo, system-ui, sans-serif;
    background: #f3f2f2;
    color: #201e1d;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: Archivo, system-ui, sans-serif;
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.08;
  }
  :focus-visible {
    outline: 2px solid #ec3013;
    outline-offset: 2px;
  }
  ::selection { background: rgba(236,48,19,0.3); }
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes steamRise {
    0% { opacity: 0; transform: translateY(2px) scaleY(0.8); }
    35% { opacity: 0.7; }
    100% { opacity: 0; transform: translateY(-6px) scaleY(1.2); }
  }
  .steam-path { animation: steamRise 3.4s ease-in-out infinite; }
  .steam-path:nth-child(2) { animation-delay: 0.6s; }
  .steam-path:nth-child(3) { animation-delay: 1.2s; }
}
```

Note the `body { font-family: Arial }` rule already in the file will be overridden by the `@layer base` body rule (base layer wins over plain rules is NOT guaranteed - so instead EDIT the existing `body { font-family: Arial, Helvetica, sans-serif; }` rule to use Archivo, and set its background/color to the Modernist values, rather than adding a competing rule).

- [ ] **Step 3: Verify build.** Run: `npm run build`. Expected: compiles with no Tailwind/CSS errors.

- [ ] **Step 4: Commit.**

```bash
git add tailwind.config.mjs styles/globals.css
git commit -m "feat: add Modernist design tokens and base styles"
```

---

### Task 2: BeanRating component (TDD)

**Files:**
- Create: `components/BeanRating.js`
- Create: `components/BeanRating.test.js`

**Interfaces:**
- Produces: `default export BeanRating({ rating, max = 100, size = 16, showValue = true, className })` - renders a row of 5 bean SVGs from `score = rating / max * 5`, plus a numeric label of `score` to one decimal. Also `export function beanScore(rating, max = 100)` returning the clamped 0-5 float, and `export function StampScore({ rating, max = 100, size = 88 })` for the round accent stamp.

- [ ] **Step 1: Write the failing test** in `components/BeanRating.test.js`:

```js
import { render, screen } from "@testing-library/react";
import BeanRating, { beanScore } from "@/components/BeanRating";

describe("beanScore", () => {
  it("maps a 0-100 rating to a 0-5 score", () => {
    expect(beanScore(100)).toBe(5);
    expect(beanScore(92)).toBeCloseTo(4.6);
    expect(beanScore(0)).toBe(0);
  });
  it("clamps out-of-range input", () => {
    expect(beanScore(140)).toBe(5);
    expect(beanScore(-10)).toBe(0);
  });
});

describe("BeanRating", () => {
  it("renders 5 bean glyphs and the numeric value", () => {
    render(<BeanRating rating={92} />);
    expect(screen.getAllByTestId("bean")).toHaveLength(5);
    expect(screen.getByText("4.6")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL.** Run: `npm test -- BeanRating`. Expected: FAIL (module not found).

- [ ] **Step 3: Implement `components/BeanRating.js`:**

```js
import React from "react";

export function beanScore(rating, max = 100) {
  const raw = (Number(rating) || 0) / max * 5;
  return Math.max(0, Math.min(5, Math.round(raw * 10) / 10));
}

function Bean({ variant, size }) {
  // variant: "full" | "half" | "empty"
  const opacity = variant === "half" ? 0.55 : variant === "empty" ? 0.32 : 1;
  const fill = variant === "empty" ? "none" : "currentColor";
  const stroke = variant === "empty" ? "currentColor" : "none";
  return (
    <svg data-testid="bean" width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <g transform="rotate(24 8 8)">
        <ellipse cx="8" cy="8" rx="6.5" ry="9.5" fill={fill} stroke={stroke}
          strokeWidth="1.6" opacity={opacity} />
        {variant !== "empty" && (
          <path d="M8 -1 C6 4, 6 12, 8 17" stroke="#f3f2f2" strokeWidth="1" fill="none" opacity={opacity} />
        )}
      </g>
    </svg>
  );
}

export default function BeanRating({ rating, max = 100, size = 16, showValue = true, className = "" }) {
  const score = beanScore(rating, max);
  const full = Math.floor(score);
  const hasHalf = score - full >= 0.5;
  const beans = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) beans.push("full");
    else if (i === full && hasHalf) beans.push("half");
    else beans.push("empty");
  }
  return (
    <span className={`inline-flex items-center gap-[3px] text-accent ${className}`}>
      {beans.map((v, i) => <Bean key={i} variant={v} size={size} />)}
      {showValue && (
        <span className="ml-[5px] font-archivo font-extrabold text-ink text-[13px]">
          {score.toFixed(1)}
        </span>
      )}
    </span>
  );
}

export function StampScore({ rating, max = 100, size = 88 }) {
  const score = beanScore(rating, max);
  return (
    <span
      className="inline-flex flex-col items-center justify-center bg-accent text-bg font-archivo font-extrabold"
      style={{ width: size, height: size, borderRadius: "50%" }}
    >
      <span style={{ fontSize: size * 0.34, lineHeight: 1 }}>{score.toFixed(1)}</span>
      <span style={{ fontSize: size * 0.11, letterSpacing: "0.12em" }}>BEAN SCORE</span>
    </span>
  );
}
```

- [ ] **Step 4: Run tests, expect PASS.** Run: `npm test -- BeanRating`. Expected: all pass.

- [ ] **Step 5: Commit.**

```bash
git add components/BeanRating.js components/BeanRating.test.js
git commit -m "feat: add BeanRating signature component"
```

---

### Task 3: Steam wordmark glyph

**Files:**
- Create: `components/Steam.js`

**Interfaces:**
- Produces: `default export Steam({ className })` - inline SVG of 3 rising steam strokes using `.steam-path` (from Task 1). Decorative (`aria-hidden`).

- [ ] **Step 1: Implement `components/Steam.js`:**

```js
import React from "react";

export default function Steam({ className = "" }) {
  return (
    <svg className={className} width="20" height="22" viewBox="0 0 20 22" aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path className="steam-path" d="M6 8 C4 6, 8 4, 6 2" />
        <path className="steam-path" d="M10 8 C8 6, 12 4, 10 2" />
        <path className="steam-path" d="M14 8 C12 6, 16 4, 14 2" />
      </g>
      <rect x="3" y="9" width="12" height="9" fill="currentColor" />
      <path d="M15 10 h2 a2 2 0 0 1 0 4 h-2" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify build.** Run: `npm run build`. Expected: compiles.

- [ ] **Step 3: Commit.**

```bash
git add components/Steam.js
git commit -m "feat: add animated steam wordmark glyph"
```

---

### Task 4: Navbar + LocaleSelector

**Files:**
- Modify: `components/Navbar.js`
- Modify: `components/LocaleSelector.js`

**Interfaces:**
- Consumes: `Steam` (Task 3), `availableLocales` from `lib/locales.js` (unchanged).

- [ ] **Step 1: Restyle `Navbar.js`.** Sticky bar, `bg-bg`, `border-b-2 border-divider`, padding `py-4 px-[clamp(24px,4vw,56px)]`, `z-40`. Brand = `Link` to `/` with `Steam` glyph + "The Coffee Review" in `font-archivo font-extrabold text-[19px]`, `mr-auto`. Links Reviews/Articles/About: `text-[14px] font-semibold`, `hover:text-accent`; add `aria-current="page"` when `useRouter().pathname` matches (`/reviews`, `/articles`, `/about`) and colour it `text-accent`. Keep `<MobileNav />` before the desktop `<nav>`. Keep `<LocaleDropdown />` at far right. Use `text-accent` via the `accent.DEFAULT` token.

- [ ] **Step 2: Restyle `LocaleSelector.js`** to show the current flag + code and Modernist framing. Keep all router/state logic unchanged. Minimum: style the `<select>` as `border-2 border-divider bg-bg px-3 py-1.5 text-[14px] font-semibold rounded-none hover:border-accent cursor-pointer`. (Keeping the native select preserves the existing behaviour; a custom dropdown is optional polish, not required.)

- [ ] **Step 3: Verify render.** Run: `npm run dev`, load `/`. Expected: sticky Modernist nav, animated steam, active link accent, locale select works and switches locale.

- [ ] **Step 4: Commit.**

```bash
git add components/Navbar.js components/LocaleSelector.js
git commit -m "feat: Modernist navbar and locale selector"
```

---

### Task 5: Footer + MobileNav + Layout gutters

**Files:**
- Modify: `components/Footer.js`
- Modify: `components/MobileNav.js`
- Modify: `components/Layout.js`

- [ ] **Step 1: Restyle `Footer.js`.** `border-t-2 border-divider`, padding `py-8 px-[clamp(24px,4vw,56px)]`. Row: wordmark "The Coffee Review" (`font-archivo font-extrabold`) left, links Reviews/Articles/About, and a muted `text-[12px]` line: `(c) 2026 The Coffee Review - @ShaneChaffe - Unbiased since day one`. Make it visible on mobile too (remove `invisible`).

- [ ] **Step 2: Read `components/MobileNav.js`** and restyle the trigger + sheet content to Modernist (accent links, Archivo, 2px rules) without changing the `ui/sheet` mechanics.

- [ ] **Step 3: Update `Layout.js`** container. Replace `sm:px-56 max-w-screen-2xl` main with a Modernist gutter: `max-w-[1200px] mx-auto px-[clamp(24px,4vw,56px)]`. Keep Navbar/Footer outside the padded main so their own full-width rules span the viewport.

- [ ] **Step 4: Verify render** at desktop + mobile widths. Run: `npm run dev`. Expected: footer + mobile nav match Modernist; content gutters consistent.

- [ ] **Step 5: Commit.**

```bash
git add components/Footer.js components/MobileNav.js components/Layout.js
git commit -m "feat: Modernist footer, mobile nav, layout gutters"
```

---

### Task 6: Review card (ArticleCard) - keep test green

**Files:**
- Modify: `components/ArticleCard.js`
- Verify: `components/ArticleCard.test.js` (do not change unless needed)

**Interfaces:**
- Consumes: `BeanRating` (Task 2). Reads `article.fields`: `pageTitle`, `articleIntroSnippet`, `articlePreviewImage`, `pagePath`, `slug`, `region`, `coffeeRating`.
- Produces: must still render one `<img>` and one `<h3>` (test contract).

- [ ] **Step 1: Restyle `ArticleCard.js`** as `.pc-card`. Root `Link` (keep `href={`${pagePath.fields.slug}/${slug}`}`): `group flex flex-col bg-surface border-2 border-divider rounded-none transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,43,43,0.22)] hover:border-accent`. Thumb wrapper `aspect-[4/3] overflow-hidden`; keep `<Image>` (now `fill` or width/height) `className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-105"`. Body `p-[18px]`: a `region` tag (`inline-flex text-[11px] px-2.5 py-[3px] bg-accent-100 text-accent-800`), `<h3 className="font-archivo font-extrabold text-[22px] group-hover:text-accent">{pageTitle}</h3>`, `<BeanRating rating={coffeeRating} />`, and a 2-line clamp blurb (`text-[13px] text-ink/70 line-clamp-2`) of `articleIntroSnippet`.

- [ ] **Step 2: Run the existing test.** Run: `npm test -- ArticleCard`. Expected: PASS (img + h3 present). If it fails, adjust markup (not the test) to restore an `<img>` and level-3 heading.

- [ ] **Step 3: Commit.**

```bash
git add components/ArticleCard.js
git commit -m "feat: Modernist review card with bean rating"
```

---

### Task 7: Home page

**Files:**
- Modify: `pages/index.js` (JSX/markup only - NOT `getStaticProps`)
- Modify: `components/Carousel.js` (styling only, if needed)

**Interfaces:**
- Consumes: existing `landingPageProps.fields` = `{ carousel, landingPageTitle, featuredArticles, pageInformation, seoMetadata }`; `ArticleCard` (Task 6); `RichText`.

- [ ] **Step 1: Restyle the Home JSX.** Keep `SeoData`, `EntryAnalytics`, `track`, `getStaticProps` exactly. Build:
  - Hero: 2-col grid `border-b-2 border-divider`. Left: kicker `text-[12px] tracking-[0.12em] uppercase text-accent-700` "Discovering the world, one cup at a time"; `<h1 className="font-archivo font-extrabold text-[clamp(40px,4.6vw,60px)]">{landingPageTitle}</h1>`; intro paragraph `max-w-[44ch] text-ink/80`; button row - primary `Link` to `/reviews` styled `bg-accent text-bg px-4 py-2 hover:bg-accent-600` "Explore reviews ->" and a secondary `border-2 border-divider px-4 py-2` "How we score". Right cell: `border-l-2 border-divider min-h-[440px] overflow-hidden` containing the restyled `Carousel`.
  - Featured reviews: kicker row "Featured reviews"; grid `grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3` of the existing `featuredArticles.map(...)` (keep the `EntryAnalytics`/`track` wrapper); each renders the new `ArticleCard`.
  - `pageInformation`: keep `<RichText />`, wrap in a section with a top `hr` (`h-[2px] bg-divider`).
  - Remove the old `text-8xl italic` h1 styling.

- [ ] **Step 2: Restyle `Carousel.js`** to remove rounded corners / match Modernist (2px border, full-bleed cover images). Styling only; keep embla logic.

- [ ] **Step 3: Verify render.** Run: `npm run dev`, load `/`. Expected: Modernist hero + featured cards with beans; carousel works.

- [ ] **Step 4: Commit.**

```bash
git add pages/index.js components/Carousel.js
git commit -m "feat: Modernist home page"
```

---

### Task 8: Reviews listing + RegionFilter

**Files:**
- Modify: `pages/reviews/index.js` (markup + client-side sort only - NOT `getStaticProps`)
- Modify: `components/RegionFilter.js`
- Modify: `components/PaginationButton.js`

**Interfaces:**
- Consumes: `reviewsProps` (array of review entries), existing region-filter logic, `ArticleCard`.

- [ ] **Step 1: Sort by score desc (client-side).** In `pages/reviews/index.js`, after `filteredReviews` is derived, sort a copy by `coffeeRating` desc before paginating - e.g. compute `const sorted = [...filteredReviews].sort((a,b) => (b.fields.coffeeRating||0) - (a.fields.coffeeRating||0));` and slice `sorted` for `currentReivews`. Do not touch `getStaticProps`.

- [ ] **Step 2: Restyle header + count.** Kicker "Every cup, scored" + `<h1>All Reviews</h1>` (`text-[clamp(38px,4.4vw,54px)]`). Add a right-aligned live count `Showing {filteredReviews.length} cafes`.

- [ ] **Step 3: Restyle `RegionFilter.js` as a segmented control.** Replace the 4 pill buttons with one `inline-flex border-2 border-divider rounded-none` group; each option `px-3 py-[7px] text-[13px] border-l border-divider first:border-l-0`; the active region gets `bg-accent text-bg`. Show a per-region count next to each label. The component must accept the counts + active region; compute counts in the page from `reviewsProps` (`All`, and `region === "Asia"|"Europe"|"North America"`) and pass them down, plus the current `router.query.region`. Keep `handleFilter` behaviour (router push with `?region=`).

- [ ] **Step 4: Restyle `PaginationButton.js`** to Modernist (bordered square buttons, active = accent fill). Keep logic.

- [ ] **Step 5: Verify render.** Run: `npm run dev`, load `/reviews`. Expected: segmented filter with counts, grid sorted high-to-low, pagination works, count updates on filter.

- [ ] **Step 6: Commit.**

```bash
git add pages/reviews/index.js components/RegionFilter.js components/PaginationButton.js
git commit -m "feat: Modernist reviews listing, segmented filter, score sort"
```

---

### Task 9: Review detail + Find-it map

**Files:**
- Modify: `pages/reviews/[reviewId]/index.js` (markup only - NOT `getStaticProps`/`getStaticPaths`)

**Interfaces:**
- Consumes: `reviewPageProps.fields` = `{ pageTitle, articleIntroSnippet, articlePreviewImage, storeLocation, coffeeRating, reviewDate, articleContent, region, seoMetadata }`; `StampScore` + `BeanRating` (Task 2); existing `APIProvider`/`Map`/`Marker`.

- [ ] **Step 1: Restyle the detail JSX** (keep `SeoData`, `EntryAnalytics`, copy-link logic, `formatDate`, all fetching):
  - "<- All reviews" `Link` to `/reviews`, `text-accent text-[14px] font-semibold`.
  - Meta: region kicker (`text-accent-700 uppercase tracking-[0.12em] text-[12px]`) + `Reviewed {formatDate(reviewDate)}`. `<h1>{pageTitle}</h1>` `text-[clamp(40px,4.6vw,64px)]`.
  - Hero: `aspect-[16/7] border-2 border-divider overflow-hidden` with the `<Image>` cover, and `StampScore rating={coffeeRating}` absolutely placed bottom-right (`absolute bottom-6 right-6`).
  - Body grid `lg:grid-cols-[1fr_320px] gap-11`: left `<RichText pageInformation={articleContent} />` in `max-w-[64ch] text-[16.5px] leading-[1.7]`; right sticky sidebar `lg:sticky lg:top-20 bg-surface border-2 border-divider p-[22px]`: big score `text-[40px] text-accent` + "out of 5 beans" + `<BeanRating rating={coffeeRating} showValue={false} size={20} />` under a 2px bottom rule; then the "Find it" block = the existing Google `Map` (restyle wrapper to `h-[150px] border-2 border-divider`, keep `APIProvider`/`Marker` and `storeLocation.lat/lon`) + a location caption. Drop the Standout/Price/Vibe/Would-return dl and the gallery (no data).
  - Keep the copy-link share affordance, restyled.

- [ ] **Step 2: Verify render.** Run: `npm run dev`, open a review. Expected: Modernist detail, bean stamp on hero, sticky sidebar with beans + small map, body reads well.

- [ ] **Step 3: Commit.**

```bash
git add "pages/reviews/[reviewId]/index.js"
git commit -m "feat: Modernist review detail with bean stamp and find-it map"
```

---

### Task 10: Editorial article card + Articles listing

**Files:**
- Modify: `components/ContentArticleCard.js`
- Modify: `pages/articles/index.js` (markup only)

**Interfaces:**
- Consumes: `article.fields` = `{ title, slug, dateOfPublication, excerpt }`; `formatDate`.

- [ ] **Step 1: Restyle `ContentArticleCard.js`** as a horizontal Modernist editorial card: root `Link` `group block border-t-2 border-divider py-8 hover:text-accent`; a `tag-neutral` date chip (`bg-neutral-100`-equivalent `#f8f4f4` -> use `bg-[#f8f4f4] text-ink/70 text-[11px] px-2.5 py-[3px]`); `<h2 className="font-archivo font-extrabold text-[28px] group-hover:text-accent">{title}</h2>`; excerpt `max-w-[60ch] text-ink/70`; "Read complete article ->" `text-accent font-semibold`. No thumbnail (no image field).

- [ ] **Step 2: Restyle `pages/articles/index.js` header** to kicker "Editorial" + `<h1>Articles</h1>` + intro, and render the list as a vertical stack (`div` with the `ContentArticleCard`s, first item top rule). Keep `getStaticProps`, `EntryAnalytics`, `track`, empty-state.

- [ ] **Step 3: Verify render.** Run: `npm run dev`, load `/articles`. Expected: Modernist editorial list, hover accent, dates as chips.

- [ ] **Step 4: Commit.**

```bash
git add components/ContentArticleCard.js pages/articles/index.js
git commit -m "feat: Modernist articles listing and editorial card"
```

---

### Task 11: Article detail

**Files:**
- Modify: `pages/articles/[slug].js` (markup only - NOT fetching)

**Interfaces:**
- Consumes: `article.fields` = `{ title, dateOfPublication, body, excerpt }`; `RichText`, `formatDate`.

- [ ] **Step 1: Restyle the article detail JSX.** Keep `SeoData`, `EntryAnalytics`, fetching. Centered column `max-w-[760px] mx-auto`: "<- All articles" `Link` (`text-accent`); "Article" kicker + `formatDate(dateOfPublication)`; `<h1>{title}</h1>` `text-[clamp(36px,4.4vw,56px)]`; lede `text-[18px] text-ink/70` from `excerpt` (only if present); `<RichText pageInformation={body} />` in a `max-w-[720px]` measure; a closing `hr`. Drop the hero image and related cards.

- [ ] **Step 2: Verify render.** Run: `npm run dev`, open an article. Expected: clean centered Modernist article.

- [ ] **Step 3: Commit.**

```bash
git add "pages/articles/[slug].js"
git commit -m "feat: Modernist article detail"
```

---

### Task 12: About page + map restyle

**Files:**
- Modify: `pages/about/index.js` (markup + client-side derive only - NOT `getStaticProps`)
- Modify: `components/GoogleMap.js` (styling only)

**Interfaces:**
- Consumes: `aboutPageProps` (array of review entries w/ `storeLocation`, `pageTitle`, `region`), `availableLocales` from `lib/locales.js`, existing `GoogleMap`.

- [ ] **Step 1: Restyle the About JSX.** Keep fetching + `visitedCafes` derivation + `useState`. Add: kicker "The story" + `<h1>So far we've been to {aboutPageProps.length} places!</h1>` (`text-[clamp(44px,6vw,84px)] max-w-[16ch]`). Wrap `GoogleMap` in a `border-2 border-divider bg-surface p-2` frame with a kicker "Every cafe we've reviewed, mapped". Restyle the story paragraph to a `max-w-[720px]` measure. Add a 4-col stat ledger between 2px rules: `{aboutPageProps.length}` Cafes reviewed / `{availableLocales.length}` Languages / `{new Set(aboutPageProps.map(c => c.fields.region)).size}` Continents / `0` Sponsored posts - numbers `text-[44px] font-extrabold text-accent`. Add a locale section: heading "Seven locales, one obsession." + buttons for each `availableLocales` entry (reuse the flag labels), each a `Link`/button switching locale via router (mirror `LocaleSelector` behaviour) styled `border-2 border-divider px-3 py-2 hover:border-accent`.

- [ ] **Step 2: Restyle `GoogleMap.js`** to the Modernist palette. Add a `styles` map option (muted greys: water `#eae9e9`, landscape `#d7d3d3`, hide POIs/labels lightly) via the `Map` `styles` prop, and red markers. Keep all props/logic (`selectedCafe`, `setSelectedCafe`, `visitedCafes`, InfoWindow) unchanged.

- [ ] **Step 3: Verify render.** Run: `npm run dev`, load `/about`. Expected: big H1, framed muted map with red pins, stat ledger, locale buttons switch locale.

- [ ] **Step 4: Commit.**

```bash
git add pages/about/index.js components/GoogleMap.js
git commit -m "feat: Modernist about page, stat ledger, restyled map"
```

---

### Task 13: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Lint.** Run: `npm run lint`. Expected: no new errors.
- [ ] **Step 2: Tests.** Run: `npm test`. Expected: all pass (BeanRating + ArticleCard).
- [ ] **Step 3: Build.** Run: `npm run build`. Expected: succeeds.
- [ ] **Step 4: Manual pass** in `npm run dev`: `/`, `/reviews`, a review, `/articles`, an article, `/about` - confirm each matches its `design/screenshots/*.png` closely, locale switch works, region filter + sort work, no console errors.
- [ ] **Step 5: Confirm no data-fetching diffs.** Run: `git diff main -- '**/getStaticProps' ` is not meaningful; instead run `git log --oneline` and manually confirm no `getStaticProps`/`getStaticPaths`/`lib/*` fetching bodies changed (`git diff main -- lib/ pages/ | grep -A3 getStaticProps`). Expected: only markup/styling changed.

---

## Self-Review Notes

- Spec coverage: every "Restyle" cell in the spec table maps to Tasks 4-12; tokens/components to Tasks 1-3; verification to Task 13. Dropped items are explicitly dropped, not forgotten.
- The one genuine risk is the Tailwind `accent` token colliding with the shadcn `accent`; Task 1 Step 1 addresses it by keeping `foreground` and confirming `ui/sheet.js` does not use `bg-accent`.
- `ArticleCard` test contract (img + h3) is preserved by Task 6.
