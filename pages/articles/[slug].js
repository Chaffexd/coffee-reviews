import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { OrbitProgress } from "react-loading-indicators";
import { IoMdArrowBack } from "react-icons/io";
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
    <article className="min-h-screen max-w-5xl px-4 py-10 sm:px-0">
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
        className="mb-8 inline-flex items-center gap-2 text-lg"
      >
        <IoMdArrowBack />
        Back to articles
      </Link>
      <header className="mb-12 border-b border-stone-200 pb-8">
        <time className="mb-4 block text-lg font-semibold uppercase tracking-[0.2em] text-coffee-medium">
          {formatDate(dateOfPublication)}
        </time>
        <h1 className="text-5xl font-bold leading-tight text-stone-900 sm:text-6xl">
          {title}
        </h1>
      </header>
      <section className="mb-20">
        <RichText pageInformation={body} />
      </section>
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
