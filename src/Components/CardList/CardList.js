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
  return (
    <>
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
            >
              {Array.from({ length: 5 }, (_, index) => (
                <SwiperSlide key={index}>
                  <img className="swiper-image" src={hinhAnh} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </Link>
        }
      >
        <Link to={""}>
          <Meta
            title={
              <div>
                <span>{tenPhong}</span>
              </div>
            }
            description={
              <>
                <div className=" space-y-5">
                  <div className="flex justify-between">
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      {giaTien}$
                    </span>{" "}
                    <span className="text-black">
                      5 /
                      <StarFilled
                        style={{ color: "black", marginLeft: "5px" }}
                      />
                    </span>
                  </div>
                  <div className=" text-justify line-clamp-3">{moTa}</div>
                </div>
              </>
            }
          />
        </Link>
      </Card>
    </>
  );
};

export default CardList;
