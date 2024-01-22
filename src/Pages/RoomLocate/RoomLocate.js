import React, { Children, useEffect, useState } from "react";
import TitlePage from "../TitlePage";
import { Phong } from "../../Services/Phong";
import { useNavigate, useParams } from "react-router-dom";
import { Vitri } from "../../Services/Vitri";

const RoomLocate = () => {

  const { cityName } = useParams();
  console.log(cityName);
  const navigate = useNavigate();

  const filter = [
    "Loại nơi ở",
    "Giá",
    "Đặt ngay",
    "Phòng và phòng ngủ",
    "Bộ lọc khác",
  ];

    return (
     <>
     <TitlePage title={cityName} />
     </>
    );


 
};

export default RoomLocate;
