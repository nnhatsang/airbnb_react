import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import {
  faCalendarCheck,
  faLocationCrosshairs,
  faLocationPin,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Loading from "../Components/Loading/Loading";
import { userLocalStorage } from "../Utils/Local";

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const { isLoading } = useSelector((state) => state.SpinnerSlice);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.UserSlice);
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    // console.log(isUserMenuOpen);
  };
  const location = useLocation();

  return (
    <>
      {isLoading ? <Loading /> : null}
      <PrivateRoute>
        <Layout className="min-h-screen">
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="md" // Chỉ định điểm giữa hiển thị và ẩn menu trên màn hình di động
            collapsedWidth="0" // Thiết lập chiều rộng của menu khi bị thu gọn
            style={{ background: "#FE6B6E" }} // Thiết lập màu nền cho Sider
          >
            <div className="demo-logo-vertical pt-5" />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              // defaultSelectedKeys={["/admin"]}
              className="space-y-5"
              style={{ background: "#FE6B6E" }} // Thiết lập màu nền cho Sider
            >
              <Menu.Item key="/admin" icon={<UserOutlined />}>
                <Link to={"/admin"}>Quản lý người dùng</Link>
              </Menu.Item>
              <Menu.Item
                key="/admin/location"
                icon={<FontAwesomeIcon icon={faLocationPin} />}
              >
                <Link to={"/admin/location"}>Quản lý vị trí</Link>
              </Menu.Item>
              <Menu.Item
                key="/admin/room"
                icon={<FontAwesomeIcon icon={faShop} />}
              >
                <Link to={"/admin/room"}>Quản lý Room</Link>
              </Menu.Item>
              <Menu.Item
                key="/admin/ticket"
                icon={<FontAwesomeIcon icon={faCalendarCheck} />}
              >
                <Link to={"/admin/ticket"}>Quản lý Booking</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: "#FE6B6E", // Bạn có thể thay đổi màu nền này theo mong muốn
              }}
            >
              <div className="flex justify-between items-center">
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={toggleCollapsed}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                    padding: 0,
                    background: "#FE6B6E", // Thiết lập màu nền cho Header
                  }}
                />
                <div className="mr-10 relative">
                  <button
                    type="button"
                    className="flex items-center  font-bold rounded-full md:me-0 focus:ring-4 px-1 focus:ring-gray-300 hover:underline duration-300"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                    onClick={toggleUserMenu}
                  >
                    <span className="sr-only">Open user menu</span>

                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={
                        user?.avatar !== ""
                          ? user?.avatar
                          : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                      }
                    />
                    <span className=" ml-3 smm:text-white leading-7 uppercase ">
                      {user?.name}
                    </span>
                  </button>
                  <div
                    className={`absolute z-[999] my-4 text-base right-2/4  list-none bg-white divide-y divide-gray-100 rounded-lg shadow ${
                      isUserMenuOpen
                        ? "animate__animated animate__fadeInDown top-8"
                        : "hidden"
                    }`}
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 ">
                        {user?.name}
                      </span>
                      <span className="block text-sm  text-gray-500 truncate ">
                        {user?.email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <NavLink
                          to={"/info-user"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      {/* {user.role === "ADMIN" && (
                        <li>
                          <NavLink
                            to={"/admin"}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 underline"
                          >
                            To page Admin
                          </NavLink>
                        </li>
                      )} */}

                      {/* <li>
                        <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Settings
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                          Earnings
                        </NavLink>
                      </li> */}
                      <li>
                        <button
                          onClick={() => {
                            userLocalStorage.remove();
                            message.success("Đăng xuất thành công!");
                            setTimeout(() => {
                              window.location.href = "/";
                            }, 1000);
                          }}
                          className="block rounded px-4 w-full py-2 text-sm text-left text-red-800 hover:bg-red-100 "
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Header>
            <Content
              style={{
                margin: "24px 15px 400px",
                padding: 5,
                minHeight: 280,
              }}
            >
              <div className="mb:overflow-scroll">
                <div className="mb:w-[70rem]">
                  <Outlet />
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </PrivateRoute>
    </>
  );
};

export default AdminTemplate;
