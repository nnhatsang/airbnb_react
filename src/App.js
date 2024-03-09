import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Route, Routes } from "react-router-dom";
import "swiper/css";
import ScrollToTop from "./Components/ScrollToTop";
import HomeAdmin from "./Pages/Admin/HomeAdmin";
import HomePage from "./Pages/Home/HomePage";
import InfoUser from "./Pages/InfoUser/InfoUser";
import ListRoom from "./Pages/ListRoom/ListRoom";
import PageNotFound from "./Pages/PageNotFound";
import RoomDetail from "./Pages/RoomDetail/RoomDetail";
import RoomLocate from "./Pages/RoomLocate/RoomLocate";
import AdminTemplate from "./Template/AdminTemplate";
import UserTemplate from "./Template/UserTemplate/UserTemplate";
import LocationAdmin from "./Pages/Admin/LocationAdmin";
import RoomAdmin from "./Pages/Admin/RoomAdmin";

import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";
function App() {
  AOS.init();
  return (
    <>
      <ScrollToTop />
      <ConfigProvider locale={viVN}>
        <Routes>
          <Route path="/" element={<UserTemplate />}>
            <Route index element={<HomePage />} />
            <Route path="rooms" element={<ListRoom />} />
            <Route path="info-user" element={<InfoUser />} />
            <Route path="rooms/:cityName" element={<RoomLocate />} />
            <Route path="room-detail/:roomId" element={<RoomDetail />} />
          </Route>
          <Route path="admin" element={<AdminTemplate />}>
            <Route index element={<HomeAdmin />} />
            <Route path="location" element={<LocationAdmin />} />
            <Route path="room" element={<RoomAdmin />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
