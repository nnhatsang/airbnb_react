import { StarFilled } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { Link } from "react-router-dom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./CardList.scss";

const CardList = ({ hinhAnh, giaTien, tenPhong, moTa, id }) => {
  const createRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const createRandomStar = (min, max) => {
    return Math.floor(Math.random() * (max - min) * 100) / 100 + min;
  };
  return (
    <>
      <Link to={`/detail/${id}`}>
        <Card
          bordered={false}
          className="cursor-pointer border-none drop-shadow-none shadow-none"
          data-aos="zoom-in"
          // style={{
          //   width: "full",

          // }}
          cover={
            <Link to={`/detail/${id}`}>
              <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="roomSwiper relative"
              >
                <button className="absolute top-3 left-3 z-30">
                  <div className="rounded-full px-3 py-2 bg-white/90  duration-200 guest_favo">
                    Guest favorite
                  </div>
                </button>
                {Array.from({ length: 5 }, (_, index) => (
                  <SwiperSlide key={index}>
                    <img className="swiper-image" src={hinhAnh} alt="" />
                  </SwiperSlide>
                ))}
                <button className="absolute top-3 right-3 z-30">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      display: "block",
                      fill: "rgba(0, 0, 0, 0.5)",
                      height: "24px",
                      width: "24px",
                      stroke: "#fff",
                      strokeWidth: 2,
                      overflow: "hidden",
                    }}
                  >
                    <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                  </svg>
                </button>
              </Swiper>
            </Link>
          }
        >
          {/* <Link to={""}> */}
          <Meta
            title={
              <div className="flex justify-between">
                <span className="truncate capitalize">{tenPhong}</span>
                <span className=" ml-2 text-black text-[12px] pt-1">
                  <StarFilled style={{ color: "black", marginRight: "5px" }} />
                  {createRandomStar(1, 5).toFixed(2)}
                </span>
              </div>
            }
            description={
              <>
                <div className=" ">
                  <div className="">
                    <p className="text-gray-500">
                      {createRandomNumber(2, 10000)} kilometers aways
                    </p>
                    <p className="text-gray-500">
                      Ngày {createRandomNumber(1, 30)} - Ngày{" "}
                      {createRandomNumber(1, 30)} tháng{" "}
                      {createRandomNumber(1, 12)}
                    </p>
                  </div>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    ${giaTien} <span className="font-thin">night</span>
                  </span>{" "}
                </div>
              </>
            }
          />
          {/* </Link> */}
        </Card>
      </Link>
    </>
  );
};

export default CardList;
