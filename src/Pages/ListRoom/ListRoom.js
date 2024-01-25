import React, { useEffect, useState } from "react";
import FilterNav from "../../Components/FilterNav/FilterNav";
import TitlePage from "../TitlePage";
import CardList from "./../../Components/CardList/CardList";
import { Phong } from "../../Services/Phong";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";
import dayjs from "dayjs";

const ListRoom = () => {
  const { dateRange, locateAt } = useSelector((state) => {
    return state.UserSlice;
  });
  const [listRoom, setListRoom] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingOn());
    Phong.get_listPhong()
      .then((res) => {
        setListRoom(res.data.content);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoadingOff());
      });
  }, []);
  const filter = [
    "Loại nơi ở",
    "Giá",
    "Đặt ngay",
    "Phòng và phòng ngủ",
    "Bộ lọc khác",
  ];
  console.log(listRoom);
  return (
    <>
    
      <TitlePage title={"Danh sách phòng hiện tại"} />
      <FilterNav />
      <>
      
        <div className="container mt-5 py-5">
          <p className="mb-5 font-bold">
            Có {listRoom.length ?? 0} chỗ ở tại {locateAt} •{" "}
            {dayjs(dateRange[0].startDate).format("DD/MM/YYYY")} –{" "}
            {dayjs(dateRange[0].endDate).format("DD/MM/YYYY")}
          </p>
          <div className="grid lg:grid-cols-3 2xl:grid-cols-5 md:grid-cols-3 smm:grid-cols-1 gap-5">
            {listRoom.length > 0 ? (
              listRoom.map((i, d) => (
                <CardList
                  tenPhong={i.tenPhong}
                  hinhAnh={i.hinhAnh}
                  giaTien={i.giaTien}
                  moTa={i.moTa}
                  id={i.id}
                />
              ))
            ) : (
              <div className="col-span-5">
                <h1 className=" text-center text-md">
                  Hiện tại không thể tìm thấy phòng bạn cần tìm
                </h1>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default ListRoom;
