import { APIProvider, InfoWindow, Map, Marker } from "@vis.gl/react-google-maps";
import React from "react";

const GoogleMap = ({ selectedCafe, setSelectedCafe, visitedCafes }) => {
  return (
    <>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "500px" }}
          defaultCenter={{
            lat: 45.559322,
            lng: -2.924647,
          }}
          defaultZoom={2.1}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          zoomControl={true}
          mapTypeId="roadmap"
          styles={[
            { elementType: "geometry", stylers: [{ color: "#eae9e9" }] },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#d7d3d3" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#eae9e9" }],
            },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            { featureType: "road", stylers: [{ visibility: "off" }] },
            { featureType: "transit", stylers: [{ visibility: "off" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#7d7979" }],
            },
          ]}
        >
          {visitedCafes.map((location, index) => (
            <Marker
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
              <h3 className="font-bold">{selectedCafe.title}</h3>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </>
  );
};

export default GoogleMap;
