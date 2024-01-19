import { Route, Routes } from "react-router-dom";
import UserTemplate from "./Template/UserTemplate/UserTemplate";
import "animate.css";
import HomePage from "./Pages/Home/HomePage";
import { Suspense } from "react";
import Loading from "./Components/Loading/Loading";
import "swiper/css";
import RoomLocate from "./Pages/Home/RoomLocate/RoomLocate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="roomsCity" element={<RoomLocate />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
