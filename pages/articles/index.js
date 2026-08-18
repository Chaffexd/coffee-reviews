import ContentArticleCard from "@/components/ContentArticleCard";
import SeoData from "@/components/SeoData";
import { getArticles } from "@/lib/articles";
import { currentDateTime } from "@/lib/currentTime";
import { EntryAnalytics, useNinetailed } from "@ninetailed/experience.js-next";
import React from "react";
import { getGreetingBanner } from "@/lib/getGreetingBanner";

const ArticlesPage = ({ articles }) => {
  const { track } = useNinetailed();
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
        <p className="text-accent-700 uppercase tracking-[0.12em] text-[12px] font-semibold">
          Editorial
        </p>
        <h1 className="mt-2 font-archivo font-extrabold text-[clamp(38px,4.4vw,54px)]">
          Articles
        </h1>
        <p className="mt-4 text-ink/70">
          Essays, brewing notes, and longer-form writing from The Coffee Review.
        </p>
      </header>
      {articles.length ? (
        <div>
          {articles.map((article) => (
            <div
              key={article.sys.id}
              onClick={() =>
                track("article_card_click", {
                  articleId: article.sys.id,
                  articleTitle: article.fields.title,
                })
              }
            >
              <EntryAnalytics
                id={article.sys.id}
                component={ContentArticleCard}
                passthroughProps={{ article }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-divider p-10 text-ink/70">
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

  const banner = await getGreetingBanner(activeLocale);

  return {
    props: {
      articles,
      banner,
    },
    revalidate: 60,
  };
}
