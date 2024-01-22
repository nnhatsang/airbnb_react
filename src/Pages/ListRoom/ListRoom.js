import React, { useEffect, useState } from "react";
import FilterNav from "../../Components/FilterNav/FilterNav";
import TitlePage from "../TitlePage";
import CardList from "./../../Components/CardList/CardList";
import { Phong } from "../../Services/Phong";
import { useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";

const ListRoom = () => {
  const [listRoom, setListRoom] = useState([]);
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(setLoadingOn());
    Phong.get_listPhong()
      .then((res) => {
        setListRoom(res.data.content);
        dispacth(setLoadingOff());
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(listRoom);
  return (
    <>
      <TitlePage title={"List room"} />
      <FilterNav />
      <>
        <div className="container py-5">
          <div className="grid lg:grid-cols-5 md:col-span-4 smm:grid-cols-1 gap-10">
            <CardList />
          </div>
        </div>
      </>
    </>
  );
};

export default ListRoom;
