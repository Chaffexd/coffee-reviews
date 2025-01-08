import ArticleCard from "@/components/ArticleCard";
import PaginationButton from "@/components/PaginationButton";
import RegionFilter from "@/components/RegionFilter";
import SeoData from "@/components/SeoData";
import { client } from "@/lib/contentful";
import { currentDateTime } from "@/lib/currentTime";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ReviewsPage = ({ reviewsProps }) => {
  const router = useRouter();
  const { region } = router.query;
  const [filteredReviews, setFilteredReviews] = useState(reviewsProps);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 9;
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

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
    setCurrentPage(1); // reset to first page on region change
  }, [region, reviewsProps]);

  const handleFilter = (selectedRegion) => {
    router.push({
      pathname: router.pathname,
      query: { region: selectedRegion.toLowerCase().replace(" ", "-") },
    });
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReivews = filteredReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="min-h-screen px-4 sm:px-0">
      <SeoData
        title={"The Coffee Review | Reviews"}
        description={
          "The Coffee Review | The page dedicated to see all of our reviews"
        }
        image={`https://images.ctfassets.net/a3pray39687x/2m1ScDXR0vQSXMYT4kpTCH/545ca0d879fc2f50d1e4c1c56f3e870a/pexels-chevanon-324028.jpg`}
        keywords={"Coffee, Artisan, Beans, Brew"}
        url={"https://coffee-reviews-delta.vercel.app/reviews"}
        publishedTime={currentDateTime}
        updatedTime={currentDateTime}
      />
      
      <h1 className="text-6xl">All Reviews</h1>
      <div className="w-full flex justify-between my-6 gap-2 sm:gap-0 sm:my-10">
        <RegionFilter handleFilter={handleFilter} />
      </div>
      <div className="flex w-full flex-wrap gap-4 justify-center sm:justify-between">
        {currentReivews.map((review) => (
          <ArticleCard article={review} key={review.sys.id} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 mb-14 space-x-2">
          <PaginationButton totalPages={totalPages} currentPage={currentPage} />
        </div>
      )}
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
