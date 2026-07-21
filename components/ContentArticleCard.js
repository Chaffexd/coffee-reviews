import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import React from "react";

const ContentArticleCard = ({ article }) => {
  const { title, slug, dateOfPublication, excerpt } = article.fields;

  return (
    <Link
      href={`/articles/${slug}`}
      className="group block border-t-2 border-divider py-8 hover:text-accent transition-colors"
    >
      <span className="inline-flex text-[11px] px-2.5 py-[3px] bg-[#f8f4f4] text-ink/70">
        {formatDate(dateOfPublication)}
      </span>
      <h2 className="mt-3 font-archivo font-extrabold text-[28px] group-hover:text-accent">
        {title}
      </h2>
      {excerpt ? (
        <p className="max-w-[60ch] text-ink/70 mt-2">
          {excerpt.length > 260 ? `${excerpt.slice(0, 257)}...` : excerpt}
        </p>
      ) : null}
      <div className="mt-4 text-accent font-semibold">
        Read complete article -&gt;
      </div>
    </Link>
  );
};

export default ContentArticleCard;
