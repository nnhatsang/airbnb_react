import React from "react";
import "./Banner.scss";
import camping from "./../../Assets/Images/undraw_camping_noc8.svg";
import logo from "./../../Assets/Images/airbnb-1.svg";

const Banner = () => {
  return (
    <>
      <div className="">
        <div
          className="w-full relative banner-responsive flex items-center  smm:h-[50vh] md:h-[50vh] lg:h-[50vh] 2xl:h-[80vh]"
          style={{
            background:
              "url(https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80&#39)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "80%",
          }}
        >
          <div className="mask bg-gradient-dark smm:h-[50vh] md:h-[50vh] lg:h-[50vh] 2xl:h-[80vh] "></div>
          <div className="container z-10 smm:px-20 lg:px-10">
            <div className="grid grid-cols-2">
              <div className="justify-center flex flex-col smm:col-span-2 smm:items-center smm:gap-5 ">
                <div className="flex items-center smm:justify-center">
                  <img src={logo} alt="" className="w-14 mr-5 smm:w-8" />
                  <div className="smm:h-5 smm:flex smm:items-center">
                    <h2 className=" smm:h-full smm:pb-10 lg:pb-6 lg:text-8xl md:text-5xl  smm:text-5xl mb:text-3xl  text-[#FE6B6E] font-bold animate__animated animate__fadeInUp smm:h-full">
                      airbnb
                    </h2>
                  </div>
                </div>
                <p className="animate__animated animate__fadeInUp animate__delay-1s md:text-xl text-white lg:text-3xl md:text-xl smm:text-lg smm:flex smm:justify-center ">
                  Belong anywhere
                </p>
              </div>
              <div className="item w-full  flex  justify-center animate__animated animate__fadeInUp animate__delay-3s">
                <img src={camping} alt="" className="w-[500px] smm:hidden" />
              </div>
            </div>
          </div>
        </div>
        <img
          src="https://i.ibb.co/v4KS2mc/swoosh-hero.png"
          class="banner-responsive circular w-full absolute z-0"
        />
      </div>
    </>
  );
};

export default Banner;
