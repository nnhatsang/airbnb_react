import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import $ from "jquery"; // Import jQuery
import "./Header.scss";
import { Modal, message } from "antd";
import { Auth } from "../../Services/Auth";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setLocal, userLocalStorage } from "../../Utils/Local";
import { setUser } from "../../Redux/UserSlice";
import * as Yup from "yup";

const Header = () => {
  const { user } = useSelector((state) => state.UserSlice);
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuLogin, setIsMenuLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // login
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offset = 100; // Điều kiện cuộn xuống (tùy chọn)

      // if (window.innerWidth > 768) {
      if (scrollPosition > offset) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
      // }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup để tránh memory leak khi component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    console.log(isUserMenuOpen);
  };
  const toggleLogin = () => {
    setIsMenuLogin(!isMenuLogin);
  };
  const toggleModalLogin = () => {
    setShowLogin(!showLogin);
    setIsMenuLogin(false);
  };
  const toggleModalSignUp = () => {
    setShowSignUp(!showSignUp);
    // setIsMenuLogin(false);
  };

  const additionalClass = scrolling
    ? "costum-navbar text-black "
    : "text-white";
  const menuClass = isMenuOpen
    ? "animate__animated animate__fadeInDown  "
    : " hidden";
  // login

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        console.log(values);
        Auth.post_login(values)
          .then((res) => {
            // console.log(res);
            message.success("Đăng nhập thành công");
            // messageApi.open({
            //   type: "success",
            //   content: "Đăng nhập thành công",
            // });
            userLocalStorage.set(res.data.content);
            dispatch(setUser(res.data.content));
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((err) => {
            // message.error("Thất bại");
            // messageApi.open({
            //   type: "error",
            //   content: err.response.data.content,
            // });
            //
            message.error(err.response.data.content);

            // console.log(err);
          });
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Vui lòng không bỏ trống"),
        password: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  // render login user
  const renderUser = () => {
    if (user) {
      return (
        <>
          <button
            type="button"
            className="flex   rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 hover:font-bold duration-300"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={toggleUserMenu}
          >
            <span className="sr-only">Open user menu</span>

            <img
              className="w-8 h-8 rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="user photo"
            />
            <span className=" ml-3  leading-7 ">{user.user.name}</span>
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
                {user.user.name}
              </span>
              <span className="block text-sm  text-gray-500 truncate ">
                {user.user.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                  Earnings
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("user_info");
                    message.success("Đăng xuất thành công!");
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }}
                  className="block rounded px-4 w-full py-2 text-sm text-left text-red-800 hover:bg-red-100 "
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <button
            className=" text-sm bg-main py-2 px-5 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 font-bold"
            onClick={toggleLogin}
          >
            Login
          </button>
        </>
      );
    }
  };
  return (
    <>
      {/* {contextHolder} */}

      <nav
        className={`bg-transparent z-[990] py-5 fixed w-full nav-menu ${additionalClass} duration-500 smm:bg-black   lg:bg-transparent`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <NavLink
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="./airbnb.png" className="h-8" alt="Airbnb Logo" />
            <span className="self-center text-2xl font-semi font-bold whitespace-nowrap  text-[#FE6B6E] duration-500 hover:text-rose-600">
              airbnb
            </span>
          </NavLink>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            <div
              className={`absolute z-[999] my-4 text-base right-2/4  list-none bg-white divide-y divide-gray-100 rounded-lg shadow ${
                isMenuLogin
                  ? "animate__animated animate__fadeInDown top-8"
                  : "hidden"
              }`}
              id="user-dropdown"
            >
              <div className="px-3 w-40 py-3  space-x-5 mx-auto">
                <ul
                  className="py-2 space-y-2"
                  aria-labelledby="user-menu-button"
                >
                  <li>
                    <button
                      onClick={toggleModalLogin}
                      className="block text-center px-5 w-full rounded py-2 text-sm text-gray-700 hover:bg-gray-300 "
                    >
                      Đăng nhập
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={toggleModalSignUp}
                      className="block text-center px-5 w-full rounded py-2 text-sm text-gray-700 hover:bg-gray-300 "
                    >
                      Đăng ký
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            {renderUser()}

            {/* Dropdown menu */}

            <button
              data-collapse-toggle="navbar-user"
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center w-full md:flex md:w-auto md:order-1 ${menuClass} duration-500`}
          >
            <ul className="menu-phone flex flex-col font-medium p-4 md:p-0 mt-4 border  border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive, isPending }) => {
                    return isActive
                      ? "text-[#FE6B6E] smm:px-3 smm:py-2 smm:block "
                      : "";
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about"}
                  className="block py-2 px-3  rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:hover:text-blue-700 md:p-0 duration-300"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/services"}
                  className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:hover:text-blue-700 md:p-0 duration-300"
                >
                  Services
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:hover:text-blue-700 md:p-0 duration-300 "
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3  rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:hover:text-blue-700 md:p-0 duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* login */}
      <Modal
        // title="Đăng nhập"
        open={showLogin}
        onCancel={toggleModalLogin}
        footer={null}
        centered
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="font-bold text-3xl text-center">Đăng nhập Airbnb</h2>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Tài khoản
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Vui lòng nhập tài khoản"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Vui lòng nhập mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password ? (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            ) : null}
          </div>
          <div className="flex  justify-end">
            <button
              type="submit"
              className="py-2 px-5 bg-black text-white rounded-md hover:bg-opacity-70 duration-500"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </Modal>
      {/* signUp */}
      <Modal
        open={showSignUp}
        onCancel={toggleModalSignUp}
        // footer={null}
        centered
      >
        <h1>kún</h1>
      </Modal>
    </>
  );
};

export default Header;
