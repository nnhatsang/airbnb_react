import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import "./CardList.scss";

const CardList = ({ images, price, rating, tieude }) => {
  return (
    <>
      <Card
        bordered={false}
        className="cursor-pointer border-none drop-shadow-none shadow-none"
        style={{
          width: 290,
        }}
        cover={
          <Link to={"/detail"}>
            <Swiper
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className=""
            >
              <SwiperSlide>
                <img className="w-full h-full" src={images} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full" src={images} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full" src={images} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full" src={images} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full" src={images} alt="" />
              </SwiperSlide>
            </Swiper>
          </Link>
        }
      >
        <Link to={"detail"}>
          <Meta
            title={`${tieude}    Rating: ${rating} stars`}
            description={`Price: ${price} per night`}
          />
        </Link>
      </Card>
    </>
  );
};

export default CardList;
