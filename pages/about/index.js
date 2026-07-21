import GoogleMap from "@/components/GoogleMap";
import SeoData from "@/components/SeoData";
import { client } from "@/lib/contentful";
import { availableLocales } from "@/lib/locales";
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

  const continentsCount = new Set(
    aboutPageProps.map((c) => c.fields.region).filter(Boolean)
  ).size;

  const handleLocaleSwitch = (locale) => {
    router.push(router.asPath, router.asPath, { locale });
  };

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

      <p className="text-accent-700 uppercase tracking-[0.12em] text-[12px] font-semibold mt-10">
        The story
      </p>
      <h1 className="font-archivo font-extrabold text-[clamp(44px,6vw,84px)] max-w-[16ch]">
        So far we have been to {aboutPageProps.length} places!
      </h1>

      <section className="mb-12 mt-10 w-full">
        <p className="text-accent-700 uppercase tracking-[0.12em] text-[12px] font-semibold mb-2">
          Every cafe we&apos;ve reviewed, mapped
        </p>
        <div className="border-2 border-divider bg-surface p-2">
          <GoogleMap
            selectedCafe={selectedCafe}
            setSelectedCafe={setSelectedCafe}
            visitedCafes={visitedCafes}
          />
        </div>

        <p className="mt-8 w-full text-ink/80">
          Thanks for taking the time to check out the site, what started as a
          hobby project that was solely for testing out how to properly follow
          one of many localisation patterns turned out to be a passion project
          about coffee instead. The whole idea is to document quality coffee
          around the world based on what I visit and it&apos;s available in 7
          locales in total, isn&apos;t that great?
        </p>

        <div className="border-y-2 border-divider py-8 my-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="font-archivo font-extrabold text-[44px] text-accent">
              {aboutPageProps.length}
            </p>
            <p className="text-[13px] text-ink/70">Cafes reviewed</p>
          </div>
          <div>
            <p className="font-archivo font-extrabold text-[44px] text-accent">
              {availableLocales.length}
            </p>
            <p className="text-[13px] text-ink/70">Languages</p>
          </div>
          <div>
            <p className="font-archivo font-extrabold text-[44px] text-accent">
              {continentsCount}
            </p>
            <p className="text-[13px] text-ink/70">Continents</p>
          </div>
          <div>
            <p className="font-archivo font-extrabold text-[44px] text-accent">
              0
            </p>
            <p className="text-[13px] text-ink/70">Sponsored posts</p>
          </div>
        </div>

        <div>
          <h2 className="font-archivo font-extrabold text-[28px] mb-4">
            Seven locales, one obsession.
          </h2>
          <div className="flex flex-wrap gap-3">
            {availableLocales.map((loc) => (
              <button
                key={loc.locale}
                type="button"
                onClick={() => handleLocaleSwitch(loc.locale)}
                className="border-2 border-divider px-3 py-2 hover:border-accent text-[14px] font-semibold"
              >
                {loc.language}
              </button>
            ))}
          </div>
        </div>
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
