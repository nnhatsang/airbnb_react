import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="container py-12  h-screen  flex justify-center  items-center space-y-9">
        <div className="space-y-9">
          <p className="text-black font-bold text-xl">
            Chúng tôi dường như không thể tìm thấy trang bạn đang tìm kiếm
          </p>
          <div className="space-y-3">
            <p>Dưới đây là một số đường dẫn của website:</p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-bold text-black underline cursor-pointer"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <a className="font-bold text-black underline cursor-pointer">
                  Đi du lịch trên Airbnb
                </a>
              </li>
              <li>
                <a className="font-bold text-black underline cursor-pointer">
                  Làm chủ nhà trên Airbnb
                </a>
              </li>
              <li>
                <a className="font-bold text-black underline cursor-pointer">
                  Uy tín & An toàn
                </a>
              </li>
              <li>
                <a className="font-bold text-black underline cursor-pointer">
                  Sơ đồ trang web
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center">
            <svg
              width="100"
              height="100"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14z" />
              <path
                d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12z"
                fill="#FFF"
                fill-rule="nonzero"
              />
              <path
                d="M8.16 7.184c.519-.37.904-.857 1.07-1.477.384-1.427-.619-2.897-2.246-2.897-.732 0-1.327.26-1.766.692a2.163 2.163 0 0 0-.509.743.75.75 0 0 0 1.4.54.78.78 0 0 1 .16-.213c.168-.165.39-.262.715-.262.597 0 .936.496.798 1.007-.067.249-.235.462-.492.644-.231.165-.47.264-.601.3a.75.75 0 0 0-.556.724v1.421a.75.75 0 0 0 1.5 0v-.909c.168-.082.346-.185.526-.313z"
                fill-rule="nonzero"
              />
              <ellipse cx="6.889" cy="10.634" rx="1" ry="1" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
