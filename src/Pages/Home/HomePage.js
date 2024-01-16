import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { Vitri } from "../../Services/Vitri";

const HomePage = () => {
  const [vitri, setVitri] = useState([]);
  useEffect(() => {
    Vitri.get_vi_tri()
      .then((res) => console.log(res.data.content))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Banner />
    </>
  );
};

export default HomePage;
