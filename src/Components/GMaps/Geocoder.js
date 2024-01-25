// Geocoder.js
import React, { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import axios from "axios";

const Geocoder = ({ searchTerm: searchTermFromProps }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Set searchTerm to the value from props
    if (searchTermFromProps) {
      setSearchTerm(searchTermFromProps);
    }
  }, [searchTermFromProps]);

  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;

      searchByCoordinates(lat, lng);
    },
  });

  const searchByCoordinates = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const { display_name } = response.data;
      //   alert(`Địa danh tại vị trí này: ${display_name}`);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        map.flyTo([lat, lon], 13, { duration: 1 });
      } else {
        alert("Không tìm thấy địa danh.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  useEffect(() => {
    // console.log("searchTerm:", searchTerm);
    // ...
  }, [searchTerm]);

  return (
    <div>
      <input
        className="z-10 mb-20"
        type="text"
        placeholder="Nhập tên địa danh"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Tìm Kiếm</button>
    </div>
  );
};

export default Geocoder;
