import { useNinetailed } from "@ninetailed/experience.js-next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleCard = ({ article }) => {
  const { track } = useNinetailed();
  const {
    articleIntroSnippet,
    pageTitle,
    articlePreviewImage,
    pagePath,
    slug,
  } = article.fields;

  return (
    <Link
      href={`${pagePath.fields.slug}/${slug}`}
      className="bg-coffee-medium flex flex-col items-center w-[330px] my-8 rounded-t-xl hover:-translate-y-2 transition-transform transform"
      onClick={() => {
        track(pageTitle);
      }}
    >
      <Image
        src={`https:${articlePreviewImage.fields.image.fields.file.url}`}
        alt={articlePreviewImage.fields.image.fields.description}
        width={100}
        height={100}
        className="w-full rounded-t-xl max-h-56 object-fit h-full"
      />
      <div className="p-8 text-center ">
        <h3 className="text-coffee-creamLight font-bold text-2xl">
          {pageTitle}
        </h3>
        <p className="text-coffee-creamDark text-lg">
          {articleIntroSnippet.length > 90
            ? `${articleIntroSnippet.substring(0, 90)}...`
            : articleIntroSnippet}
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
