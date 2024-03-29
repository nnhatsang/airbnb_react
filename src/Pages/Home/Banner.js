import React from "react";
import "./Banner.scss";
// import camping from "./../../Assets/Images/undraw_camping_noc8.svg";
import logo from "./../../Assets/Images/airbnb-1.svg";
import videobanner from "./../../Assets/video/VIETNAM - My Home - Masew, MyoMouse, Nguyen Loi.mp4";
import * as camping from "./../../Assets/Animations/logo_animate.json";
import Lottie from "react-lottie";
import posterImage from "./../../Assets/Images/bannerVideo.png";

const Banner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: camping,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="">
        <div
          className="w-full relative banner-responsive flex items-center  smm:h-[50vh] md:h-[60vh] lg:h-[50vh] 2xl:h-[80vh]"
          // style={{
          //   background:
          //     "url(https://i0.wp.com/picjumbo.com/wp-content/uploads/man-camping-in-nature-and-watching-stars-free-photo.jpg?w=2210&quality=70)",
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "cover",
          //   backgroundPosition: "bottom",
          // }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={posterImage} // Thêm Poster Frame tại đây
            style={{
              position: "absolute",
              width: "100%",
              left: "50%",
              top: "50%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              zIndex: "-1",
            }}
          >
            <source src={videobanner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="mask bg-black/70 smm:h-[50vh] md:h-[60vh] lg:h-[50vh] 2xl:h-[80vh] "></div>
          <div className="container z-10 smm:px-20 lg:px-10">
            <div className="grid grid-cols-2">
              <div className="justify-center flex flex-col smm:col-span-2 smm:items-center smm:gap-5 ">
                <div className="flex items-center smm:justify-center">
                  <img src={logo} alt="" className="w-14 mr-5 smm:w-8" />
                  <div className="smm:h-5 smm:flex smm:items-center">
                    <h2 className=" smm:h-full smm:pb-10 lg:pb-6 lg:text-8xl md:text-5xl  smm:text-5xl mb:text-3xl  text-[#FE6B6E] font-bold animate__animated animate__fadeInUp ">
                      airbnb
                    </h2>
                  </div>
                </div>
                <p className="animate__animated animate__fadeInUp animate__delay-1s  text-white lg:text-3xl md:text-xl smm:text-lg smm:flex smm:justify-center ">
                  Belong anywhere
                </p>
              </div>
              <div className="item w-full  flex  justify-center animate__animated animate__fadeInUp animate__delay-2s">
                {/* <div className="smm:hidden w-[800px]">
                  <Lottie options={defaultOptions} />
                </div> */}

                {/* <img src={camping} alt="" className="w-[500px] smm:hidden" /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="image-container" style={{ position: "relative" }}>
          <img
            src="https://i.ibb.co/v4KS2mc/swoosh-hero.png"
            className="w-full banner-responsive circular z-0"
            alt=""
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2, // Đảm bảo rằng layer này ở trên cùng
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Banner;
