import ArticleCard from "@/components/ArticleCard";
import { Carousel } from "@/components/Carousel";
import RichText from "@/components/RichText";
import SeoData from "@/components/SeoData";
import { client } from "@/lib/contentful";

export default function Home({ landingPageProps }) {
  const {
    carousel,
    landingPageTitle,
    featuredArticles,
    pageInformation,
    seoMetadata,
  } = landingPageProps.fields;

  return (
    <section className="m-auto flex justify-center flex-col px-2">
      <SeoData
        title={seoMetadata.fields.title}
        description={seoMetadata.fields.description}
        image={`https:${seoMetadata.fields.image.fields.image.fields.file.url}`}
        keywords={seoMetadata.fields.keywords}
        url={"https://coffee-reviews-delta.vercel.app/"}
        publishedTime={seoMetadata.sys.publishedAt}
        updatedTime={seoMetadata.sys.updatedAt}
      />
      <h1 className="text-bold text-8xl italic mt-4 mb-12">
        {landingPageTitle}
      </h1>
      <Carousel carousel={carousel} />
      <div className="mt-8 w-full">
        <h2 className="text-3xl text-bold my-12">
          Some of our featured reviews and articles
        </h2>
        <div className="flex w-full gap-6 justify-center sm:justify-between flex-wrap">
          {featuredArticles.map((article) => (
            <ArticleCard article={article} key={article.sys.id} />
          ))}
        </div>
      </div>
      <article className="w-full my-8">
        <RichText pageInformation={pageInformation} />
      </article>
    </section>
  );
}

export async function getStaticProps({ locale }) {
  if (locale === "default") {
    locale = "en-GB";
  }

  const landingPage = await client.getEntries({
    content_type: "page",
    include: 5,
    "fields.slug[match]": "/",
    locale,
  });

  const landingPageProps = landingPage.items[0];

  return {
    props: {
      landingPageProps,
    },
  };
}
