import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
// import FilterNav from "../../Components/FilterNav/FilterNav";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./../../Components/Loading/Loading";
import { setLoadingOff } from "../../Redux/SpinnerSlice";

const UserTemplate = () => {
  const { isLoading } = useSelector((state) => state.SpinnerSlice);
  const dispatch = useDispatch();
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
