import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import React from "react";

const ContentArticleCard = ({ article }) => {
  const { title, slug, dateOfPublication, excerpt } = article.fields;

  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex h-full flex-col justify-between border-4 border-stone-300 bg-white p-6 transition-colors hover:border-coffee-medium sm:p-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-coffee-medium">
            Article
          </p>
          <h2 className="text-3xl font-bold leading-tight text-stone-800 sm:text-5xl">
            {title}
          </h2>
        </div>
        <time className="shrink-0 text-lg font-semibold text-stone-700 sm:text-2xl">
          {formatDate(dateOfPublication)}
        </time>
      </div>
      {excerpt ? (
        <p className="mt-10 max-w-5xl text-xl leading-relaxed text-stone-800 sm:text-3xl">
          {excerpt.length > 260 ? `${excerpt.slice(0, 257)}...` : excerpt}
        </p>
      ) : null}
      <div className="mt-10 text-2xl font-bold text-coffee-medium transition-transform group-hover:translate-x-1">
        Read Complete Article &gt;
      </div>
    </Link>
  );
};

export default ContentArticleCard;
