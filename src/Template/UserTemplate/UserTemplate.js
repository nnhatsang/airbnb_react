import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
// import FilterNav from "../../Components/FilterNav/FilterNav";
import { useSelector } from "react-redux";
import Loading from "./../../Components/Loading/Loading";

const UserTemplate = () => {
  const { isLoading } = useSelector((state) => state.SpinnerSlice);

  console.log(isLoading);
  return (
    <>
      {isLoading ? <Loading /> : null}

      <>
        <Header />
       
        <Outlet />
        <Footer />
      </>
    </>
  );
};

export default UserTemplate;
