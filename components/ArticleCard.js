import Image from "next/image";
import Link from "next/link";
import React from "react";
import BeanRating from "@/components/BeanRating";

const ArticleCard = ({ article }) => {

  const {
    articleIntroSnippet,
    pageTitle,
    articlePreviewImage,
    pagePath,
    slug,
    region,
    coffeeRating,
  } = article.fields;

  return (
    <Link
      href={`${pagePath.fields.slug}/${slug}`}
      className="group flex flex-col bg-surface border-2 border-divider rounded-none transition hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,43,43,0.22)] hover:border-accent"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={`https:${articlePreviewImage.fields.image.fields.file.url}`}
          alt={articlePreviewImage.fields.image.fields.description}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-105"
        />
      </div>
      <div className="p-[18px]">
        {region && (
          <span className="inline-flex text-[11px] px-2.5 py-[3px] bg-accent-100 text-accent-800">
            {region}
          </span>
        )}
        <h3 className="font-archivo font-extrabold text-[22px] group-hover:text-accent">
          {pageTitle}
        </h3>
        {coffeeRating != null && <BeanRating rating={coffeeRating} />}
        <p
          className="text-[13px] text-ink/70 line-clamp-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {articleIntroSnippet}
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
