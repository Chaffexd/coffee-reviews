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
