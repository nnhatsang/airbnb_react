import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Phong } from "../../Services/Phong";
import { Vitri } from "./../../Services/Vitri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import { Image } from "antd";
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { TabTitle } from "../../Utils/SetTitle";
import TitlePage from "../TitlePage";
const RoomDetail = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  const [avgRate, setAvgRate] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const getIdRoom = await Phong.get_idPhong(roomId);
        const getCommentRoom = await Phong.get_binhLuan(roomId);
        const getCityNation = await Vitri.get_idViTri(
          getIdRoom.data.content.maViTri
        );
        const tempData = {
          ...getIdRoom.data.content,
          tinhThanh: getCityNation.data.content.tinhThanh,
          quocGia: getCityNation.data.content.quocGia,
          listComment: getCommentRoom.data.content.reverse(),
        };
        console.log(tempData);
        setRoom(tempData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  TabTitle(`${room.tenPhong}`);
  const fecthDataComment = async () => {
    try {
      const CommentRespone = await Phong.get_binhLuan(roomId);
      const reversedComments = CommentRespone.data.content.reverse();
      setRoom((prevRoom) => ({
        ...prevRoom,
        listComment: reversedComments,
      }));

      const { RateTotal, CountComment } = reversedComments.reduce(
        (accumulator, item) => ({
          RateTotal: accumulator.RateTotal + item.saoBinhLuan,
          CountComment: accumulator.CountComment + 1,
        }),
        { RateTotal: 0, CountComment: 0 }
      );
      const trungBinhRating = (RateTotal / CountComment).toFixed(2);

      setAvgRate(trungBinhRating);

      console.log(reversedComments);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(room.listComment.length());
  return (
    <>
      <TitlePage />
      <div className="container  py-5 space-y-5">
        <h2 className=" font-bold text-2xl "> {room.tenPhong}</h2>
        <div className="grid grid-cols-1 gap-5 items-center justify-start md:flex">
          <div className="grid md:flex gap-x-6 gap-y-3">
            <div className="flex gap-x-5">
              {/* {room.danhSachBinhLuan.length > 0 && (
                <ShowRating trungBinhRating={trungBinhRating} binhLuanRef={binhLuanRef} ratingLength={room.danhSachBinhLuan.length} />
              )}
              <span className='space-x-2'>
                <FontAwesomeIcon className='w-4 h-4 text-[#FF5A5F]' icon={faAward} />
                <span className='text-gray-600'>Chủ nhà siêu cấp</span>
              </span>
            </div>
            <Link
              className='underline cursor-pointer text-gray-600 hover:text-[#FF5A5F] duration-300'
              to={`/roombycity/${convertToSlug(room.tinhThanh)}`}
            >
              {room.tinhThanh}, {room.quocGia}
            </Link> */}
            </div>
            <div className="flex justify-between md:block space-x-6"></div>
          </div>
        </div>
        <div className="w-full">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <SwiperSlide key={index}>
                <Image src={room.hinhAnh} alt="" width="100%" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
