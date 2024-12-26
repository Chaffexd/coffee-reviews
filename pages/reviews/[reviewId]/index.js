import { useRouter } from "next/router";
import { client } from "@/lib/contentful";
import { OrbitProgress } from "react-loading-indicators";
import React from "react";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import RichText from "@/components/RichText";

const ReviewDetailPage = ({ reviewPageProps }) => {
  const router = useRouter();

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

  const {
    pageTitle,
    articleIntroSnippet,
    articlePreviewImage,
    storeLocation,
    coffeeRating,
    reviewDate,
    articleContent,
  } = reviewPageProps.fields;

  return (
    <article className="text-xl">
      <div className="mb-20">
        <div className="flex items-center">
          <h1 className="text-7xl mr-8">{pageTitle}</h1>
          <span className="rounded-full bg-yellow-300 h-24 w-24 flex justify-center items-center">
            <p className="font-bold text-4xl">{coffeeRating}</p>
            <span className="text-xs">/ 100</span>
          </span>
        </div>

        <time className="my-4 block">{formatDate(reviewDate)}</time>
        <p className="mb-4">{articleIntroSnippet}</p>
        <Image
          src={`https:${articlePreviewImage.fields.image.fields.file.url}`}
          alt={articlePreviewImage.fields.image.fields.description}
          width={800}
          height={400}
          className="m-auto"
        />
      </div>
      <section className="max-w-4xl m-auto mb-20">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: "100%", height: "500px" }}
            defaultCenter={{
              lat: storeLocation.lat,
              lng: storeLocation.lon,
            }}
            defaultZoom={14}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <Marker
              position={{
                lat: storeLocation.lat,
                lng: storeLocation.lon,
              }}
            />
          </Map>
        </APIProvider>
      </section>
      <section className="mb-20">
        <RichText pageInformation={articleContent} />
      </section>
    </article>
  );
};

export default ReviewDetailPage;

export async function getStaticProps({ locale, params }) {
  if (locale === "default") {
    locale = "en-GB";
  }

  const { reviewId } = params;
  const reviewPage = await client.getEntries({
    content_type: "article",
    include: 5,
    "fields.slug[match]": reviewId,
    locale,
  });

  if (!reviewPage.items.length) {
    return { notFound: true };
  }

  const reviewPageProps = reviewPage.items[0];

  return {
    props: {
      reviewPageProps,
    },
  };
}

export async function getStaticPaths() {
  const articles = await client.getEntries({
    content_type: "article",
  });

  const paths = articles.items.map((article) => ({
    params: { reviewId: article.fields.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}
