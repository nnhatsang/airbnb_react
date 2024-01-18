import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { Vitri } from "../../Services/Vitri";
import { TabTitle } from "../../Utils/SetTitle";
import LcateExplore from "./LcateExplore";

const HomePage = () => {
  TabTitle("Airbnb-Nhà nghỉ dưỡng & Căn hộ cao cấp cho thuê");

  const [vitri, setVitri] = useState([]);
  // useEffect(() => {
  //   Vitri.get_vi_tri()
  //     .then((res) => console.log(res.data.content))
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <>
      <Banner />
      <div style={{ zIndex: 999 }}>
        <LcateExplore />
      </div>
    </>
  );
};

export default HomePage;
