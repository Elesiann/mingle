import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || "";

const Map: React.FC = () => {
  const mapStyles = {
    height: "100%",
    width: "100%"
  };

  const defaultCenter = {
    lat: -34.397,
    lng: 150.644
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={defaultCenter}
        zoom={10}
      />
    </LoadScript>
  );
};

export default Map;
