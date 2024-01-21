import React, { Children, useEffect, useState } from "react";
import TitlePage from "../TitlePage";
import { Phong } from "../../Services/Phong";
import { useNavigate, useParams } from "react-router-dom";
import { Vitri } from "../../Services/Vitri";

const RoomLocate = () => {
  const [cityId, setCityId] = useState(null);
  const { cityName } = useParams();
  console.log(cityName);
  const navigate = useNavigate();

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
  // Nếu có tham số cityName, thực hiện logic lọc
  if (cityName) {
    // Thực hiện logic lọc dựa trên cityName
    // ...
    return (
      <div>
        <h2>Filtered Rooms in {cityName}</h2>
        {/* Hiển thị danh sách phòng đã lọc */}
      </div>
    );
  } else {
    // Nếu không có tham số, điều hướng đến Route mặc định
    navigate("/listRoom");
  }

  // return (
  //   <>
  //     <TitlePage title={"bjkdhkdksjdhfkshdfkhsdkjfhksdhfkh"} />
  //     <div className=""></div>
  //   </>
  // );
};

export default RoomLocate;
