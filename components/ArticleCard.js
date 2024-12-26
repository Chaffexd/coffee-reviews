import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleCard = ({ article }) => {
  const { articleIntroSnippet, pageTitle, articlePreviewImage, pagePath, slug } =
    article.fields;
    
  return (
    <Link
      href={`${pagePath.fields.slug}/${slug}`}
      className="bg-sky-400 flex flex-col items-center w-[330px] my-8 rounded-t-xl hover:-translate-y-2 transition-transform transform"
    >
      <Image
        src={`https:${articlePreviewImage.fields.image.fields.file.url}`}
        alt={articlePreviewImage.fields.image.fields.description}
        width={100}
        height={100}
        className="w-full rounded-t-xl max-h-56 object-fit h-full"
      />
      <div className="p-8 text-center ">
        <h3 className="text-white font-bold text-2xl">{pageTitle}</h3>
        <p>{articleIntroSnippet}</p>
      </div>
    </Link>
  );
};

export default ArticleCard;
