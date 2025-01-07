import Head from "next/head";
import React from "react";

const SeoData = ({
  title,
  description,
  image,
  keywords,
  url,
  publishedTime,
  updatedTime,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="google-site-verification"
          content="RkE8h0M6DiqVPCqWJXfMZwbv7w8Y97GC-Nz4C1vOxrM"
        />
        <meta name="description" content={description} key={"desc"} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta
          property="og:site_name"
          content={"Coffee Reviews | Shane Chaffe"}
        />
        <meta property="og:title" content={title} />
        <meta name="og:title" content={title} />
        <meta property="og:site_name" content="Coffee Reviews"/>
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://images.ctfassets.net/a3pray39687x/2m1ScDXR0vQSXMYT4kpTCH/545ca0d879fc2f50d1e4c1c56f3e870a/pexels-chevanon-324028.jpg"/>
        <meta property="og:image:alt" content={title} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={publishedTime} />
        <meta property="article:modified_time" content={updatedTime} />
      </Head>
    </>
  );
};

export default SeoData;
