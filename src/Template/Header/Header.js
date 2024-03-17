import React, { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import $ from "jquery"; // Import jQuery
import "./Header.scss";
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  message,
} from "antd";
import { Auth } from "../../Services/Auth";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setLocal, userLocalStorage } from "../../Utils/Local";
import { setLogin } from "../../Redux/UserSlice";
import * as Yup from "yup";
import viVN from "antd/lib/locale/vi_VN"; // Import ngôn ngữ tiếng Việt
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import FilterNav from "../../Components/FilterNav/FilterNav";

import logo from "./../../Assets/Images/airbnb-1.svg";
const validationSchemas = {
  login: Yup.object({
    email: Yup.string()
      .required("Vui lòng không bỏ trống")
      .email("Vui lòng nhập đúng định dạng email"),
    password: Yup.string().required("Vui lòng không bỏ trống"),
  }),
  signup: Yup.object({
    email: Yup.string()
      .required("Vui lòng không bỏ trống")
      .email("Vui lòng nhập đúng định dạng email"),
    password: Yup.string().required("Vui lòng không bỏ trống"),
    name: Yup.string().required("Vui lòng không bỏ trống"),
    phone: Yup.string()
      .required("Vui lòng không bỏ trống")
      .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
    birthday: Yup.string().required("Vui lòng chọn ngày sinh"),
    gender: Yup.string().required("Vui lòng chọn giới tính"),
  }),
};

const Header = () => {
  const { user } = useSelector((state) => state.UserSlice);
  // const user = userLocalStorage.get();

  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuLogin, setIsMenuLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // mode
  const [mode, setMode] = useState("login"); // "login" hoặc "signup"

  // login
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // signUp

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
  };
  const toggleLogin = () => {
    setIsMenuLogin(!isMenuLogin);
  };
  const toggleModalLogin = () => {
    resetForm();
    setMode("login");
    setShowLogin(!showLogin);
    setIsMenuLogin(false);
  };
  const toggleModalSignUp = () => {
    resetForm();
    setMode("signup");
    setShowSignUp(!showSignUp);
    setIsMenuLogin(false);
  };

  const additionalClass = scrolling
    ? "costum-navbar text-black "
    : "text-white";
  const menuClass = isMenuOpen
    ? "animate__animated animate__fadeInDown  "
    : " hidden";
  // login

  const onImageError = (e) => {
    e.target.src = "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";
  };
  const location = useLocation();
  // console.log(location);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
    },

    onSubmit: (values) => {
      switch (mode) {
        case "login": {
          Auth.post_login(values)
            .then((res) => {
              message.success("Đăng nhập thành công");
              // messageApi.open({
              //   type: "success",
              //   content: "Đăng nhập thành công",
              // });
              const data = {
                ...res.data.content.user,
                token: res.data.content.token,
              };
              dispatch(setLogin({ ...data }));
              userLocalStorage.set({ ...data });
              toggleModalLogin();

              setTimeout(() => {
                navigate(location.pathname);
              }, 1000);
            })
            .catch((err) => {
              message.error(err.response.data.content);
            });
          resetForm();
          break;
        }
        case "signup": {
          const processValues = {
            ...values,
            gender: values.gender === "male" ? true : false,
          };

          // console.log(mode);
          Auth.post_signup(processValues)
            .then((res) => {
              // console.log(res);

              message.success("Đăng ký thành công");
              toggleModalLogin();
            })
            .catch((err) => {
              // console.log(err.response.data.content);
              message.error(err.response.data.content);
            });
          resetForm();
          break;
        }
        default:
          // console.log(mode);
          return null;
      }
    },

    validationSchema:
      mode === "signup" ? validationSchemas.signup : validationSchemas.login,
  });

  // render login user
  const renderUser = () => {
    if (user) {
      return (
        <>
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
              src={user.avatar}
              onError={onImageError}
            />
            <span className=" ml-3 smm:text-white leading-7 uppercase ">
              {user.name}
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
              <span className="block text-sm text-gray-900 ">{user.name}</span>
              <span className="block text-sm  text-gray-500 truncate ">
                {user.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <NavLink
                  to={"/info-user"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  onClick={toggleUserMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              {user.role === "ADMIN" && (
                <li>
                  <NavLink
                    to={"/admin"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 underline"
                    onClick={toggleUserMenu}
                  >
                    To page Admin
                  </NavLink>
                </li>
              )}

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
                    userLocalStorage.remove();
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
            className=" text-sm bg-main  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 font-bold duration-300 hover:scale-105 hover:bg-white hover:text-white"
            onClick={toggleLogin}
          >
            <img
              className="h-10"
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            />
          </button>
        </>
      );
    }
  };

  const { roomId } = useParams();
  const handleToggleToSignUp = (e) => {
    e.preventDefault(); // Ngăn chặn form được submit
    toggleModalLogin(); // Đóng modal đăng nhập
    toggleModalSignUp(); // Mở modal đăng ký
    // Lưu ý: Không gọi handleSubmit hoặc bất kỳ hàm nào khác có thể kích hoạt validation tại đây.
  };
  return (
    <>
      <nav
        className={`bg-transparent z-[990] py-5 fixed w-full nav-menu ${additionalClass} duration-500 smm:bg-black  ${
          roomId && location.pathname.includes("/room-detail/")
            ? "md:bg-white md:text-black"
            : "lg:bg-transparent"
        } `}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <NavLink
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Airbnb Logo" />
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
            <ul className="menu-phone flex flex-col font-medium p-4 md:p-0 mt-4 border smm:text-white border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive, isPending }) => {
                    return isActive
                      ? "text-[#FE6B6E] smm:px-3 smm:py-2 smm:block "
                      : "block py-2 px-3  rounded hover:bg-gray-100 hover:text-main md:hover:bg-transparent  md:p-0 duration-300";
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  // to={"/about"}
                  className="block py-2 px-3  rounded hover:bg-gray-100 hover:text-main md:hover:bg-transparent  md:p-0 duration-300"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  // to={"/listroom"}
                  className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-main md:hover:bg-transparent  md:p-0 duration-300"
                >
                  Services
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-main md:hover:bg-transparent  md:p-0 duration-300 "
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3  rounded hover:bg-gray-100 hover:text-main md:hover:bg-transparent  md:p-0 duration-300"
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
              Email
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // Thực hiện hành động đăng nhập ở đây, có thể gọi hàm handleSubmit
                  handleSubmit();
                }
              }}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // Thực hiện hành động đăng nhập ở đây, có thể gọi hàm handleSubmit
                  handleSubmit();
                }
              }}
            />
            {errors.password && touched.password ? (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            ) : null}
          </div>
          <div className="flex  justify-end">
            <button
              className="py-2 px-5 bg-main text-white rounded-md hover:bg-opacity-70 duration-500"
              onClick={handleToggleToSignUp}
            >
              Đăng ký
            </button>
            <button
              type="submit"
              className="py-2 px-5 bg-black ml-5 text-white rounded-md hover:bg-opacity-70 duration-500"
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
        footer={null}
        centered
      >
        <ConfigProvider locale={viVN}>
          <Form layout="vertical" className="space-y-5" onFinish={handleSubmit}>
            <h2 className="font-bold text-3xl text-center">
              Đăng ký tài khoản Airbnb
            </h2>
            <div className="">
              <FormItem
                label={
                  <span className="block  text-sm font-medium text-gray-900">
                    Name
                  </span>
                }
                name="name"
                validateStatus={errors.name && touched.name ? "error" : ""}
                help={errors.name && touched.name && errors.name}
              >
                <Input
                  name="name"
                  className="p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Điền tên vào đây..."
                />
              </FormItem>
              <FormItem
                label={
                  <span className="block  text-sm font-medium text-gray-900">
                    Email
                  </span>
                }
                name="email"
                validateStatus={errors.email && touched.email ? "error" : ""}
                help={errors.email && touched.email && errors.email}
              >
                <Input
                  className="p-2"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Điền tên vào đây..."
                />
              </FormItem>
              <FormItem
                label={
                  <span className="block  text-sm font-medium text-gray-900">
                    Password
                  </span>
                }
                name="password"
                validateStatus={
                  errors.password && touched.password ? "error" : ""
                }
                help={errors.password && touched.password && errors.password}
              >
                <Input.Password
                  className="p-2"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Điền mật khẩu...."
                />
              </FormItem>
              <FormItem
                label={
                  <span className="block  text-sm font-medium text-gray-900">
                    Phone number
                  </span>
                }
                name="phone"
                validateStatus={errors.phone && touched.phone ? "error" : ""}
                help={errors.phone && touched.phone && errors.phone}
              >
                <Input
                  className="p-2"
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  placeholder="Điền số điện thoại...."
                />
              </FormItem>
              <div className="flex gap-5">
                <FormItem
                  label={
                    <span className="block  text-sm font-medium text-gray-900">
                      Birthday
                    </span>
                  }
                  name="birthday"
                  validateStatus={
                    errors.birthday && touched.birthday ? "error" : ""
                  }
                  help={errors.birthday && touched.birthday && errors.birthday}
                >
                  <DatePicker
                    className="p-2"
                    placement={"topRight"}
                    name="birthday"
                    // onChange={handleChange}
                    onChange={(date, dateString) => {
                      setFieldValue("birthday", date);
                    }}
                    changeOnBlur={handleBlur}
                    value={values.birthday ? dayjs(values.birthday) : ""}
                    placeholder="Chọn ngày sinh"
                    format="DD/MM/YYYY"
                  />
                </FormItem>
                <FormItem
                  label={
                    <span className="block text-sm font-medium text-gray-900">
                      Gender
                    </span>
                  }
                  name="gender" // Đặt name cho FormItem
                  validateStatus={
                    errors.gender && touched.gender ? "error" : ""
                  }
                  help={errors.gender && touched.gender && errors.gender}
                >
                  <Select
                    size="large"
                    name="gender" // Đặt name cho Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    placeholder="Chọn giới tính"
                  >
                    <Select.Option value="male">Nam</Select.Option>
                    <Select.Option value="female">Nữ</Select.Option>
                  </Select>
                </FormItem>
              </div>
            </div>
            <div className="mt-9">
              <button
                onClick={() => setMode("signup")}
                type="submit"
                className="cursor-pointer text-white w-full bg-main hover:bg-pink-700 duration-300 px-6 py-2 rounded-lg"
              >
                Đăng ký
              </button>
            </div>
          </Form>
        </ConfigProvider>
      </Modal>
    </>
  );
};

export default Header;
