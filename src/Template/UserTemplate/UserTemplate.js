import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import FilterNav from "../../Components/FilterNav/FilterNav";

const UserTemplate = () => {
  return (
    <>
      <Header />
      <FilterNav />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserTemplate;
