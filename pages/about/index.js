import { client } from "@/lib/contentful";
import { APIProvider, Map, InfoWindow, AdvancedMarker } from "@vis.gl/react-google-maps";
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

  const visitedCafes = aboutPageProps.map((cafe) => ({
    ...cafe.fields.storeLocation,
    title: cafe.fields.pageTitle,
  }));

  const [selectedCafe, setSelectedCafe] = useState(null);

  return (
    <article className="w-full">
      <h1 className="text-4xl">
        So far we have been to{" "}
        <span className="font-bold">{aboutPageProps.length}</span> places!{" "}
      </h1>
      <section className="max-w-4xl m-auto my-12">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: "100%", height: "500px" }}
            defaultCenter={{
              lat: 54.559322,
              lng: -2.924647,
            }}
            defaultZoom={2.1}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            zoomControl={true}
            mapTypeId="roadmap"
            mapId="Coffee-Locations"
          >
            {visitedCafes.map((location, index) => (
              <AdvancedMarker
                key={index}
                position={{
                  lat: location.lat,
                  lng: location.lon,
                }}
                onClick={() => setSelectedCafe(location)}
              />
            ))}
            {selectedCafe && (
              <InfoWindow
                position={{ lat: selectedCafe.lat, lng: selectedCafe.lon }}
                onCloseClick={() => setSelectedCafe(null)}
              >
                <div>
                  <h3 className="font-bold">{selectedCafe.title}</h3>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
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
