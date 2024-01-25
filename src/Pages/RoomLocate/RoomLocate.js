import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Gmaps from "../../Components/GMaps/Gmaps";
import RoomsLocate from "../../Components/RoomsLocate/RoomsLocate";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";
import { Phong } from "../../Services/Phong";
import { Vitri } from "../../Services/Vitri";
import convertDeleteSlug from "../../Utils/convertDeleteSlug";
import convertToSlug from "../../Utils/convertToSlug";
import TitlePage from "../TitlePage";
import FilterNav from "./../../Components/FilterNav/FilterNav";

const RoomLocate = () => {
  const { dateRange } = useSelector((state) => state.UserSlice);
  const dispatch = useDispatch();
  const { cityName } = useParams();
  const [roomCity, setRoomCity] = useState([]);
  const [cityNoSlug, setCityNoSlug] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoadingOn());
      try {
        // Lấy thông tin địa điểm
        const viTriRes = await Vitri.get_vi_tri();
        const tempData = [...viTriRes.data.content];
        const data = tempData.filter(
          (item) => convertToSlug(item.tinhThanh) === cityName
        );
        setCityNoSlug(data[0].tinhThanh);

        // Lấy danh sách phòng theo địa điểm
        const phongRes = await Phong.get_datPhongTheoViTri(data[0].id);
        setRoomCity(phongRes.data.content);
        // console.log(phongRes.data.content);
        dispatch(setLoadingOff());
      } catch (err) {
        console.error(err);
        dispatch(setLoadingOff());
      }
    };

    fetchData();
  }, []);

  const filter = [
    "Loại nơi ở",
    "Giá",
    "Đặt ngay",
    "Phòng và phòng ngủ",
    "Bộ lọc khác",
  ];

  return (
    <>
      {roomCity.length > 0 ? (
        <TitlePage title={cityNoSlug} />
      ) : (
        <TitlePage
          title={`Không tìm thấy phòng phù hợp cho bạn tại ${convertDeleteSlug(
            cityName
          )} !!!`}
        />
      )}
      <FilterNav />
      <div className="mx-auto container grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="py-12 space-y-3 h-auto">
          {roomCity.length > 0 && (
            <>
              <p>
                Có {roomCity.length ?? 0} chỗ ở tại {cityNoSlug} •{" "}
                {moment(dateRange[0].startDate).format("DD/MM/YYYY")} –{" "}
                {moment(dateRange[0].endDate).format("DD/MM/YYYY")}
              </p>
              <h1 className="font-bold text-3xl text-black">
                Chỗ ở tại khu vực bản đồ đã chọn
              </h1>
              {/* <div className="flex flex-wrap gap-3">
                {filter.map((item, index) => (
                  <button
                    className="rounded-lg text-md bg-white text-black border border-gray-300 hover:border-gray-900 duration-300 px-6 py-2"
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div> */}
              <div className="space-y-6">
                {roomCity?.map((i, index) => (
                  <RoomsLocate item={i} city={cityNoSlug} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="h-screen w-full block sticky top-28 mt-16">
          <Gmaps place={cityNoSlug} />
          {/* <iframe
            src={`https://www.google.com/maps/embed/v1/place?q=${cityNoSlug}&key=AIzaSyB-M500zF9hEI3OoOPyK_dVHfWDyZcx5fI`}
            width="100%"
            height="550px"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => handleLoadMap()}
            className={`${mapMounted ? "block" : "hidden"} rounded-lg`}
          ></iframe> */}
          {/* {!mapMounted && <Skeleton height={550} className="rounded-lg" />} */}
        </div>
      </div>
    </>
  );
};

export default RoomLocate;
