import React from "react";

const TitlePage = ({ title }) => {
  return (
    <>
      <div
        className="w-full relative banner-responsive flex items-center  smm:h-[50vh] md:h-[50vh] lg:h-[30vh]  "
        style={{
          background:
            "url(https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80&#39)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="mask bg-gradient-dark smm:h-[50vh] md:h-[50vh] lg:h-[30vh] "></div>
        <div className="container z-10  flex justify-center">
          <p className=" smm:pt-10 text-white lg:text-3xl md:text-xl smm:text-lg  ">
            {title}
          </p>
        </div>
      </div>
    </>
  );
};

export default TitlePage;
