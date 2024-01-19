import React, { useEffect, useState } from "react";
import TitlePage from "../../TitlePage";
import { Phong } from "../../../Services/Phong";
import { useParams } from "react-router-dom";
import { Vitri } from "../../../Services/Vitri";

const RoomLocate = () => {
  const [cityId, setCityId] = useState(null);
  const { cityName } = useParams();

  const [phongThue, setPhongThue] = useState([]);
  const filter = [
    "Loại nơi ở",
    "Giá",
    "Đặt ngay",
    "Phòng và phòng ngủ",
    "Bộ lọc khác",
  ];
  // useEffect(() => {
  //   Vitri.get_vi_tri()
  //     .then((res) => {
  //       const tempData = [...res.data.content];
  //       const data = tempData.filter(
  //         (item) => convertToSlug(item.tinhThanh) === cityName
  //       );
  //       setCityId(data[0].id);
  //       setCityNoSlug(data[0].tinhThanh);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [cityName]);
  useEffect(() => {
    if (cityId !== null) {
      Phong.get_datPhongTheoViTri()
        .then((res) => {
          setPhongThue([...res.data.content]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [cityId]);
  return (
    <>
      <TitlePage title={"bjkdhkdksjdhfkshdfkhsdkjfhksdhfkh"} />
      <div className=""></div>
    </>
  );
};

export default RoomLocate;
