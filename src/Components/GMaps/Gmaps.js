import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Geocoder from "./Geocoder";

const Gmaps = ({ place: searchTermFromParent }) => {
  const mapStyles = {
    width: "100%",
    height: "400px",
  };
  const position = [51.505, -0.09]; // Ví dụ vị trí tại London

  return (
    <>
      <MapContainer
        center={[18.6835, 105.48575]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <div className="mb-10">
          <Geocoder searchTerm={searchTermFromParent} />{" "}
        </div>
      </MapContainer>
    </>
  );
};

export default Gmaps;
