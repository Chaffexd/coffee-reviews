import { AdvancedMarker, APIProvider, InfoWindow, Map } from "@vis.gl/react-google-maps";
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
              <h3 className="font-bold">{selectedCafe.title}</h3>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </>
  );
};

export default GoogleMap;
