import { Carousel } from "@/components/Carousel";
import FeaturedReviews from "@/components/FeaturedReviews";
import RenderBaselineWhileLoading from "@/components/RenderBaselineWhileLoading";
import RichText from "@/components/RichText";
import SeoData from "@/components/SeoData";
import { client } from "@/lib/contentful";
import { getGreetingBanner } from "@/lib/getGreetingBanner";
import { mapEntryExperiences } from "@/lib/experiences";
import Link from "next/link";
import { EntryAnalytics, Experience } from "@ninetailed/experience.js-next";

export default function Home({ landingPageProps }) {
  const {
    carousel,
    landingPageTitle,
    featuredArticles,
    featuredReviewsBlock,
    pageInformation,
    seoMetadata,
  } = landingPageProps.fields;

  const experiences = mapEntryExperiences(featuredReviewsBlock);

  return (
    <section className="w-full">
      <SeoData
        title={seoMetadata.fields.title}
        description={seoMetadata.fields.description}
        image={`https:${seoMetadata.fields.image.fields.image.fields.file.url}`}
        keywords={seoMetadata.fields.keywords}
        url={"https://coffee-reviews-delta.vercel.app/"}
        publishedTime={seoMetadata.sys.publishedAt}
        updatedTime={seoMetadata.sys.updatedAt}
      />

      <div className="grid md:grid-cols-2 border-b-2 border-divider">
        <div className="flex flex-col justify-center gap-5 px-2 py-12 md:py-16">
          <span className="text-[12px] tracking-[0.12em] uppercase text-accent-700">
            Discovering the world, one cup at a time
          </span>
          <h1 className="font-archivo font-extrabold text-[clamp(40px,4.6vw,60px)]">
            {landingPageTitle}
          </h1>
          <p className="max-w-[44ch] text-ink/80">
            We travel to the source, cup with the roasters and farmers behind
            the beans, and write up honest, unranked notes on what actually
            ends up in your mug.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/reviews"
              className="inline-flex bg-accent text-bg px-4 py-2 font-archivo font-semibold hover:bg-accent-600"
            >
              Explore reviews
            </Link>
            <a
              href="#how-we-score"
              className="inline-flex border-2 border-divider px-4 py-2 font-archivo font-semibold"
            >
              How we score
            </a>
          </div>
        </div>
        <div className="border-l-2 border-divider min-h-[440px] overflow-hidden">
          <EntryAnalytics
            id={landingPageProps.sys.id}
            component={Carousel}
            passthroughProps={{ carousel }}
          />
        </div>
      </div>

      {featuredReviewsBlock ? (
        <Experience
          {...featuredReviewsBlock.fields}
          id={featuredReviewsBlock.sys.id}
          component={FeaturedReviews}
          experiences={experiences}
          loadingComponent={RenderBaselineWhileLoading}
          trackClicks
        />
      ) : (
        // Falls back to the original field until the block is linked on the
        // page entry. Clearing featuredReviewsBlock is also the rollback.
        <FeaturedReviews reviews={featuredArticles} />
      )}

      <div id="how-we-score">
        <hr className="h-[2px] bg-divider border-0" />
        <article className="w-full px-2 py-12">
          <RichText pageInformation={pageInformation} />
        </article>
      </div>
    </section>
  );
}

export async function getStaticProps({ locale }) {
  if (locale === "default") {
    locale = "en-GB";
  }

  const landingPage = await client.getEntries({
    content_type: "page",
    include: 10,
    "fields.slug[match]": "/",
    locale,
  });

  const landingPageProps = landingPage.items[0];

  const banner = await getGreetingBanner(locale);

  return {
    props: {
      landingPageProps,
      banner,
    },
    // Without this, experiences attached in Contentful only appear after a
    // redeploy.
    revalidate: 60,
  };
}
