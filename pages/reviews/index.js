import ArticleCard from "@/components/ArticleCard";
import SeoData from "@/components/SeoData";
import { client } from "@/lib/contentful";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ReviewsPage = ({ reviewsProps }) => {
  const router = useRouter();
  const { region } = router.query;
  const [filteredReviews, setFilteredReviews] = useState(reviewsProps);

  if (router.isFallback) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <OrbitProgress
          variant="track-disc"
          color="#2b86b9"
          size="medium"
          text=""
        />
      </div>
    );
  }

  useEffect(() => {
    if (region) {
      if (region === "all") {
        setFilteredReviews(reviewsProps);
      } else {
        const filtered = reviewsProps.filter(
          (review) =>
            review.fields.region.toLowerCase() === region.toLowerCase()
        );
        setFilteredReviews(filtered);
      }
    } else {
      setFilteredReviews(reviewsProps);
    }
  }, [region, reviewsProps]);

  const handleFilter = (selectedRegion) => {
    router.push({
      pathname: router.pathname,
      query: { region: selectedRegion.toLowerCase().replace(" ", "-") },
    });
  };

  return (
    <section className="min-h-screen">
      <SeoData 
        title={"The Coffee Review | Reviews"}
        description={"The Coffee Review | The page dedicated to see all of our reviews"}
        image={``}
        keywords={"Coffee, Artisan, Beans, Brew"}
        url={"https://coffee-reviews-delta.vercel.app/reviews"}
        publishedTime={""}
        updatedTime={""}
      />
      <h1 className="text-6xl">All Reviews</h1>
      <div className="w-full flex justify-between my-10">
        <button
          className="bg-slate-100 hover:bg-slate-200 p-4 rounded-xl w-60 font-bold hover:-translate-y-2 transition-transform transform"
          onClick={() => handleFilter("all")}
          value={"all"}
        >
          All Reviews
        </button>
        <button
          className="bg-slate-100 hover:bg-slate-200 p-4 rounded-xl w-60 font-bold hover:-translate-y-2 transition-transform transform"
          onClick={() => handleFilter("asia")}
          value={"asia"}
        >
          Asia
        </button>
        <button
          className="bg-slate-100 hover:bg-slate-200 p-4 rounded-xl w-60 font-bold hover:-translate-y-2 transition-transform transform"
          onClick={() => handleFilter("europe")}
          value={"europe"}
        >
          Europe
        </button>
        <button
          className="bg-slate-100 hover:bg-slate-200 p-4 rounded-xl w-60 font-bold hover:-translate-y-2 transition-transform transform"
          onClick={() => handleFilter("north-america")}
          value={"north-america"}
        >
          North America
        </button>
      </div>
      <div className="flex w-full flex-wrap gap-4 justify-between">
        {filteredReviews.map((review) => (
          <ArticleCard article={review} key={review.sys.id} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsPage;

export async function getStaticProps({ locale }) {
  if (locale === "default") {
    locale = "en-GB";
  }

  const allReviews = await client.getEntries({
    content_type: "article",
    include: 5,
    locale,
    order: "-sys.createdAt",
  });

  if (!allReviews.items.length) {
    return { notFound: true };
  }

  const reviewsProps = allReviews.items;

  return {
    props: {
      reviewsProps,
    },
  };
}
