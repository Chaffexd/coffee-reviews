import ArticleCard from "@/components/ArticleCard";
import { Carousel } from "@/components/Carousel";
import RichText from "@/components/RichText";
import { client } from "@/lib/contentful";

export default function Home({ landingPageProps }) {
  console.log("Landing Page entry =", landingPageProps);

  const { carousel, landingPageTitle, featuredArticles, pageInformation } =
    landingPageProps.fields;

  return (
    <section>
      <h1 className="text-bold text-8xl italic mb-8">{landingPageTitle}</h1>
      <Carousel carousel={carousel} />
      <div className="mt-8 w-full">
        <h2 className="text-2xl text-bold">
          Some of our featured reviews and articles
        </h2>
        {featuredArticles.map((article) => (
          <ArticleCard article={article} key={article.sys.id} />
        ))}
      </div>
      <article className="w-full my-8">
        <RichText pageInformation={pageInformation} />
      </article>
    </section>
  );
}

export async function getStaticProps() {
  const landingPage = await client.getEntries({
    content_type: "page",
    include: 5,
    "fields.slug[match]": "/",
  });

  const landingPageProps = landingPage.items[0];

  return {
    props: {
      landingPageProps,
    },
  };
}
