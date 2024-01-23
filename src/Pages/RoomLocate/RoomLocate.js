import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";
import { Phong } from "../../Services/Phong";
import { Vitri } from "../../Services/Vitri";
import convertDeleteSlug from "../../Utils/convertDeleteSlug";
import convertToSlug from "../../Utils/convertToSlug";
import TitlePage from "../TitlePage";
import { setLocatedAt } from "../../Redux/UserSlice";
import Loading from "../../Components/Loading/Loading";
import moment from "moment";
import RoomsLocate from "../../Components/RoomsLocate/RoomsLocate";

const RoomLocate = () => {
  const dispatch = useDispatch();
  const { cityName } = useParams();
  const [cityId, setCityId] = useState(null);
  const [roomCity, setRoomCity] = useState([]);
  const [cityNoSlug, setCityNoSlug] = useState(null);
  const { dateRange } = useSelector((state) => state.UserSlice);
  useEffect(() => {
    dispatch(setLoadingOn());
    Vitri.get_vi_tri()
      .then((res) => {
        const tempData = [...res.data.content];
        const data = tempData.filter(
          (item) => convertToSlug(item.tinhThanh) === cityName
        );
        setCityId(data[0].id);
        setCityNoSlug(data[0].tinhThanh);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        console.error(err);
        dispatch(setLoadingOff());
      });
  }, []);
  useEffect(() => {
    if (cityId !== null) {
      dispatch(setLoadingOn());

      Phong.get_datPhongTheoViTri(cityId)
        .then((res) => {
          setRoomCity(res.data.content);
          dispatch(setLoadingOff());
        })
        .catch((err) => {
          console.error(err);
          // dispatch(setLoadingOff());
        });
    }
  }, [cityId]);
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
              <div className="flex flex-wrap gap-3">
                {filter.map((item, index) => (
                  <button
                    className="rounded-lg text-md bg-white text-black border border-gray-300 hover:border-gray-900 duration-300 px-6 py-2"
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <RoomsLocate />
              {/* <div className="space-y-6">
                {roomCity.map((item, index) => (
                  <ListRooms key={index} item={item} cityNoSlug={cityNoSlug} />
                ))}
              </div> */}
            </>
          )}
        </div>
        {/* <div className="h-screen w-full block sticky top-28 mt-16">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?q=${cityNoSlug}&key=${
              import.meta.env.VITE_MAP_API_KEY
            }`}
            width="100%"
            height="550px"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => handleLoadMap()}
            className={`${mapMounted ? "block" : "hidden"} rounded-lg`}
          ></iframe>
          {!mapMounted && <Skeleton height={550} className="rounded-lg" />}
        </div> */}
      </div>
    </>
  );
};

export default RoomLocate;
