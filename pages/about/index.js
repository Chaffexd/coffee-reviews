import GoogleMap from "@/components/GoogleMap";
import SeoData from "@/components/SeoData";
import { client } from "@/lib/contentful";
import {
  APIProvider,
  Map,
  InfoWindow,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

const AboutPage = ({ aboutPageProps }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <OrbitProgress
          variant="track-disc"
          color="#2b86b9"
          size="medium"
          text=""
        />
      </div>
    );
  }

  const { seoMetadata } = aboutPageProps[0].fields;

  const visitedCafes = aboutPageProps.map((cafe) => ({
    ...cafe.fields.storeLocation,
    title: cafe.fields.pageTitle,
  }));

  const [selectedCafe, setSelectedCafe] = useState(null);

  return (
    <article className="w-full px-4 sm:px-0">
      <SeoData
        title={"The Coffee Review | About"}
        description={
          "The Coffee Review | The page dedicated to know more about our coffee journey"
        }
        image={`https://images.ctfassets.net/a3pray39687x/2m1ScDXR0vQSXMYT4kpTCH/545ca0d879fc2f50d1e4c1c56f3e870a/pexels-chevanon-324028.jpg`}
        keywords={"Coffee, Artisan, Beans, Brew"}
        url={"https://coffee-reviews-delta.vercel.app/about"}
        publishedTime={seoMetadata.sys.publishedAt}
        updatedTime={seoMetadata.sys.updatedAt}
      />
      <h1 className="text-4xl">
        So far we have been to{" "}
        <span className="font-bold">{aboutPageProps.length}</span> places!{" "}
      </h1>
      <section className="mb-12 mt-10 w-full">
        <GoogleMap
          selectedCafe={selectedCafe}
          setSelectedCafe={setSelectedCafe}
          visitedCafes={visitedCafes}
        />
      </section>
    </article>
  );
};

export default AboutPage;

export async function getStaticProps({ locale }) {
  if (locale === "default") {
    locale = "en-GB";
  }

  const aboutPage = await client.getEntries({
    content_type: "article",
    include: 5,
    locale,
  });

  const aboutPageProps = aboutPage.items;

  return {
    props: {
      aboutPageProps,
    },
  };
}
