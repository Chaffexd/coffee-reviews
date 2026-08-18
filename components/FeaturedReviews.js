import React from "react";
import ArticleCard from "@/components/ArticleCard";
import { EntryAnalytics, useNinetailed } from "@ninetailed/experience.js-next";

const DEFAULT_EYEBROW = "Featured reviews";

// Props in, JSX out. <Experience> renders this with either the baseline
// featuredReviews entry's fields or a variant's, so it must not fetch or
// derive anything itself — whatever it receives is the resolved variant.
const FeaturedReviews = ({ eyebrow, reviews }) => {
  const { track } = useNinetailed();

  if (!reviews?.length) {
    return null;
  }

  return (
    <div className="w-full px-2 py-12">
      <div className="flex items-baseline justify-between mb-6">
        <span className="text-[12px] tracking-[0.12em] uppercase text-accent-700">
          {eyebrow || DEFAULT_EYEBROW}
        </span>
      </div>
      <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.sys.id}
            className="h-full"
            onClick={() =>
              track("article_click", {
                articleId: review.sys.id,
                articleTitle: review.fields.pageTitle,
              })
            }
          >
            <EntryAnalytics
              id={review.sys.id}
              component={ArticleCard}
              article={review}
              showRegion={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedReviews;

// <Experience>'s default loading component hides the baseline for up to 5
// seconds while the profile resolves, which on a three-card grid is a visible
// hole in the page. These pages are statically generated, so the baseline is
// already in the delivered HTML — showing it immediately and letting a matched
// variant replace it trades a possible swap for no layout shift at all.
//
// Experience calls this with the baseline props plus component, passthroughProps
// and experiences, so those three are peeled off before rendering.
export const RenderBaselineWhileLoading = ({
  component: Component,
  passthroughProps,
  experiences,
  ...baseline
}) => {
  const baselineContent = <Component {...baseline} {...passthroughProps} />;

  if (process.env.NODE_ENV === "production") {
    return baselineContent;
  }

  // Rendering the baseline makes "still resolving" and "resolved to the
  // baseline" pixel-identical, so a selection that never completes — or one
  // silently overridden by a plugin — looks exactly like working software.
  // Outline rather than border, and an absolute label, so nothing reflows and
  // the dev view still matches production layout.
  return (
    <div
      data-nt-state="resolving"
      className="relative outline-dashed outline-2 outline-offset-[-2px] outline-accent/40"
    >
      <span className="absolute right-0 top-0 z-10 bg-accent px-2 py-[2px] font-archivo text-[10px] font-semibold uppercase tracking-[0.1em] text-bg">
        Resolving variant
      </span>
      {baselineContent}
    </div>
  );
};
