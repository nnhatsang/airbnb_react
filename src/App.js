import { Route, Routes } from "react-router-dom";
import UserTemplate from "./Template/UserTemplate/UserTemplate";
import "animate.css";
import HomePage from "./Pages/Home/HomePage";
import { Suspense } from "react";
import Loading from "./Components/Loading/Loading";
import "swiper/css";
import RoomLocate from "./Pages/RoomLocate/RoomLocate";
import ListRoom from "./Pages/ListRoom/ListRoom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import AOS from "aos";
import "aos/dist/aos.css";
function App() {
  AOS.init();
  return (
    <>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="rooms/:cityName" element={<RoomLocate />} />
          <Route path="rooms" element={<ListRoom />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
