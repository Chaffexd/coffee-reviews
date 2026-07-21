import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { OrbitProgress } from "react-loading-indicators";
import RichText from "@/components/RichText";
import SeoData from "@/components/SeoData";
import {
  extractArticlePreview,
  getArticleBySlug,
  getArticles,
} from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import { EntryAnalytics } from "@ninetailed/experience.js-next";

const ArticleDetailContent = ({ article }) => {
  const router = useRouter();
  const { title, dateOfPublication, body, excerpt } = article.fields;

  return (
    <article className="min-h-screen max-w-[760px] mx-auto px-4 py-10 sm:px-0">
      <SeoData
        title={`${title} | The Coffee Review`}
        description={excerpt || extractArticlePreview(body)}
        image="https://images.ctfassets.net/a3pray39687x/2m1ScDXR0vQSXMYT4kpTCH/545ca0d879fc2f50d1e4c1c56f3e870a/pexels-chevanon-324028.jpg"
        keywords={`Coffee, Article, ${title}`}
        url={`https://coffee-reviews-delta.vercel.app${router.asPath}`}
        publishedTime={dateOfPublication}
        updatedTime={article.sys.updatedAt}
      />
      <Link
        href="/articles"
        className="inline-block mb-8 text-accent text-[14px] font-semibold"
      >
        &lt;- All articles
      </Link>

      <header className="mb-11 pb-8 border-b-2 border-divider">
        <p className="text-accent-700 uppercase tracking-[0.12em] text-[12px] font-semibold">
          Article &middot; <time dateTime={dateOfPublication}>{formatDate(dateOfPublication)}</time>
        </p>
        <h1 className="font-archivo font-extrabold text-[clamp(36px,4.4vw,56px)] mt-3">
          {title}
        </h1>
        {excerpt && (
          <p className="mt-4 text-[18px] text-ink/70">{excerpt}</p>
        )}
      </header>

      <div className="max-w-[720px] text-[16.5px] leading-[1.7]">
        <RichText pageInformation={body} />
      </div>

      <hr className="h-[2px] bg-divider border-0 mt-12" />
    </article>
  );
};

const ArticleDetailPage = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
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
      id={article.sys.id}
      component={ArticleDetailContent}
      passthroughProps={{ article }}
    />
  );
};

export default ArticleDetailPage;

export async function getStaticProps({ locale, params }) {
  const activeLocale = locale === "default" ? "en-GB" : locale;
  const article = await getArticleBySlug({
    locale: activeLocale,
    slug: params.slug,
  });

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const articles = await getArticles({ locale: "en-GB" });

  return {
    paths: articles.map((article) => ({
      params: { slug: article.fields.slug },
    })),
    fallback: true,
  };
}
