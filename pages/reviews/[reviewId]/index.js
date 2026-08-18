import { useRouter } from "next/router";
import { client } from "@/lib/contentful";
import { getGreetingBanner } from "@/lib/getGreetingBanner";
import { OrbitProgress } from "react-loading-indicators";
import React, { useState } from "react";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import RichText from "@/components/RichText";
import SeoData from "@/components/SeoData";
import { CiShare1 } from "react-icons/ci";
import Link from "next/link";
import { EntryAnalytics, useNinetailed } from "@ninetailed/experience.js-next";
import BeanRating, { StampScore, beanScore } from "@/components/BeanRating";

const ReviewDetailContent = ({ reviewPageProps }) => {
  const router = useRouter();
  const { track } = useNinetailed();
  const [copied, setCopied] = useState(false);

  const copyLinkToClipboard = () => {
    const url = `${window.location.origin}${router.asPath}`;

    track("review_shared", {
      reviewId: reviewPageProps.sys.id,
      reviewTitle: pageTitle,
    });

    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const {
    pageTitle,
    articleIntroSnippet,
    articlePreviewImage,
    storeLocation,
    coffeeRating,
    reviewDate,
    articleContent,
    region,
    seoMetadata,
  } = reviewPageProps?.fields;

  return (
    <article className="px-4 sm:px-0 pb-20">
      <SeoData
        title={`${seoMetadata.fields.title} | The Coffee Review`}
        description={seoMetadata.fields.description}
        image={`https:${seoMetadata.fields.image.fields.image.fields.file.url}`}
        keywords={seoMetadata.fields.keywords}
        url={"https://coffee-reviews-delta.vercel.app" + router.asPath}
        publishedTime={seoMetadata.sys.publishedAt}
        updatedTime={seoMetadata.sys.updatedAt}
      />

      <Link
        href={"/reviews"}
        className="inline-block mb-8 text-accent text-[14px] font-semibold"
      >
        &lt;- All reviews
      </Link>

      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-accent-700 uppercase tracking-[0.12em] text-[12px] font-semibold">
            {region ? `${region} · ` : ""}Reviewed <time dateTime={reviewDate}>{formatDate(reviewDate)}</time>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyLinkToClipboard}
              className="flex items-center gap-1 text-accent text-[13px] font-semibold hover:cursor-pointer"
            >
              <CiShare1 />
              Share
            </button>
            {copied && (
              <span className="text-[12px] text-ink/60">Copied!</span>
            )}
          </div>
        </div>
        <h1 className="font-archivo font-extrabold text-[clamp(40px,4.6vw,64px)] mt-3">
          {pageTitle}
        </h1>
        {articleIntroSnippet && (
          <p className="mt-3 max-w-[64ch] text-ink/80 text-[17px]">
            {articleIntroSnippet}
          </p>
        )}
      </div>

      <div className="relative aspect-[16/7] border-2 border-divider overflow-hidden mb-11">
        <Image
          src={`https:${articlePreviewImage.fields.image.fields.file.url}`}
          alt={articlePreviewImage.fields.image.fields.description}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-6 right-6">
          <StampScore rating={coffeeRating} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-11">
        <div className="max-w-[64ch] text-[16.5px] leading-[1.7]">
          <RichText pageInformation={articleContent} />
        </div>

        <aside className="lg:sticky lg:top-20 h-fit bg-surface border-2 border-divider p-[22px]">
          <div className="pb-5 mb-5 border-b-2 border-divider">
            <div className="flex items-baseline gap-2">
              <span className="text-[40px] text-accent font-archivo font-extrabold">
                {beanScore(coffeeRating).toFixed(1)}
              </span>
              <span className="text-[13px] text-ink/70">out of 5 beans</span>
            </div>
            <BeanRating
              rating={coffeeRating}
              showValue={false}
              size={20}
              className="mt-2"
            />
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.12em] text-accent-700 font-semibold mb-2">
              Find it
            </p>
            <div className="h-[150px] border-2 border-divider overflow-hidden">
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <Map
                  style={{ width: "100%", height: "100%" }}
                  defaultCenter={{
                    lat: storeLocation.lat,
                    lng: storeLocation.lon,
                  }}
                  defaultZoom={13}
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                  zoomControl={true}
                  mapTypeId="roadmap"
                >
                  <Marker
                    position={{
                      lat: storeLocation.lat,
                      lng: storeLocation.lon,
                    }}
                  />
                </Map>
              </APIProvider>
            </div>
            <p className="mt-2 text-[13px] text-ink/70">
              {region || "Approximate location"}
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
};

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

  return (
    <EntryAnalytics
      id={reviewPageProps.sys.id}
      component={ReviewDetailContent}
      passthroughProps={{ reviewPageProps }}
    />
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
    include: 10,
    "fields.slug[match]": reviewId,
    locale,
  });

  if (!reviewPage) {
    return { notFound: true };
  }

  const reviewPageProps = reviewPage.items[0];

  const banner = await getGreetingBanner(locale);

  return {
    props: {
      reviewPageProps,
      banner,
    },
    // Review pages had no revalidate, so an edited review body — a merge tag
    // added to it, say — would not appear until the next deploy. articles/[slug]
    // already regenerates on this interval.
    revalidate: 60,
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
