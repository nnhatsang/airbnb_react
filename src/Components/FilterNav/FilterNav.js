import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Vitri } from "../../Services/Vitri";

const FilterNav = () => {
  const [extendSearchBar, setExtendSearchBar] = useState(false);
  const overlayRef = useRef(null);
  const [showSearchLocation, setShowSearchLocation] = useState(false);
  const [showSearchDateRange, setShowSearchDateRange] = useState(false);
  const [showSearchGuests, setShowSearchGuests] = useState(false);
  const [div2Visible, setDiv2Visible] = useState(true);

  const location = useLocation();

  const handleClickOutside = (event) => {
    if (overlayRef.current && overlayRef.current.contains(event.target)) {
      setExtendSearchBar(false);
      setShowSearchLocation(false);
      setShowSearchDateRange(false);
      setShowSearchGuests(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [extendSearchBar]);

   const [vitri, setVitri] = useState([]);
   useEffect(() => {
     Vitri.get_vi_tri()
       .then((res) => setVitri(res.data.content))
       .catch((err) => console.log(err));
   }, []);
  return (
    <>
     
    </>
  );
};

export default FilterNav;
