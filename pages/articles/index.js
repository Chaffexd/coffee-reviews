import ContentArticleCard from "@/components/ContentArticleCard";
import SeoData from "@/components/SeoData";
import { getArticles } from "@/lib/articles";
import { currentDateTime } from "@/lib/currentTime";
import { EntryAnalytics } from "@ninetailed/experience.js-next";
import React from "react";

const ArticlesPage = ({ articles }) => {
  return (
    <section className="min-h-screen px-4 py-10 sm:px-0">
      <SeoData
        title="The Coffee Review | Articles"
        description="Browse every editorial article published on The Coffee Review."
        image="https://images.ctfassets.net/a3pray39687x/2m1ScDXR0vQSXMYT4kpTCH/545ca0d879fc2f50d1e4c1c56f3e870a/pexels-chevanon-324028.jpg"
        keywords="Coffee, Articles, Guides, Editorial"
        url="https://coffee-reviews-delta.vercel.app/articles"
        publishedTime={currentDateTime}
        updatedTime={currentDateTime}
      />
      <header className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-coffee-medium">
          Editorial
        </p>
        <h1 className="text-5xl font-bold text-stone-900 sm:text-6xl">
          Articles
        </h1>
        <p className="mt-4 text-xl text-stone-700">
          Essays, brewing notes, and longer-form writing from The Coffee Review.
        </p>
      </header>
      {articles.length ? (
        <div className="grid gap-8">
          {articles.map((article) => (
            <EntryAnalytics
              key={article.sys.id}
              id={article.sys.id}
              component={ContentArticleCard}
              passthroughProps={{ article }}
            />
          ))}
        </div>
      ) : (
        <div className="border-4 border-dashed border-stone-300 px-6 py-10 text-xl text-stone-700">
          No articles were written, tis a sad day.
        </div>
      )}
    </section>
  );
};

export default ArticlesPage;

export async function getStaticProps({ locale }) {
  const activeLocale = locale === "default" ? "en-GB" : locale;
  const articles = await getArticles({ locale: activeLocale });

  return {
    props: {
      articles,
    },
    revalidate: 60,
  };
}
