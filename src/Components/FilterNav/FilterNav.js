import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setDateRange, setLocatedAt, setNumPeop } from "../../Redux/UserSlice";
import { Vitri } from "../../Services/Vitri";
import convertToSlug from "../../Utils/convertToSlug";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";

const FilterNav = () => {
  const { locatedAt, dateRange, numPeop } = useSelector(
    (state) => state.UserSlice
  );
  const navigate = useNavigate();
  // const location = useLocation();

  // console.log(location);
  const [showSearchLocation, setShowSearchLocation] = useState(false);
  const [showSearchDateRange, setShowSearchDateRange] = useState(false);
  const [showSearchGuests, setShowSearchGuests] = useState(false);
  const overlayRef = useRef(null);
  const handleClickOutside = (event) => {
    if (overlayRef.current && overlayRef.current.contains(event.target)) {
      setShowSearchLocation(false);
      setShowSearchDateRange(false);
      setShowSearchGuests(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    dispatch(setLoadingOn());
    Vitri.get_vitri_phanTrang()
      .then((res) => {
        setCities(res.data.content.data);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        console.error(err);
        dispatch(setLoadingOff());
      });
  }, []);
  const dispatch = useDispatch();
  const filter = [
    "Loại nơi ở",
    "Giá",
    "Đặt ngay",
    "Phòng và phòng ngủ",
    "Bộ lọc khác",
  ];
  const options = {
    rangeColors: ["#e0565b"],
    minDate: new Date(),
  };
  return (
    <>
      <div className="container py-10 relative ">
        {showSearchLocation && (
          <div className="absolute w-[1/2]  top-[70px] left-0 z-50 bg-white rounded-lg p-6 border-2 border-gray-300 overflow-y-auto overscroll-y-auto cursor-auto max-h-[calc(800px-250px)]">
            <h1 className="font-bold text-md mb-6">Tìm kiếm địa điểm</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                className="text-center cursor-pointer"
                onClick={() => {
                  dispatch(setLocatedAt(""));
                  setShowSearchLocation(false);
                }}
              >
                {" "}
                <div className="">
                  <img
                    className="w-20  h-20 object-cover rounded-lg border-2 group-hover:border-gray-600 duration-300"
                    src="https://www.app-premantura.com/wp-content/themes/elemin/themify/img/non-skin.gif"
                    alt=""
                  />
                </div>
                None
              </div>

              {cities?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    dispatch(setLocatedAt(item.tinhThanh));
                    setShowSearchLocation(false);
                  }}
                  className=" cursor-pointer flex flex-col items-center justify-center"
                >
                  <div>
                    <img
                      className="w-20  h-20 object-cover rounded-lg border-2 group-hover:border-gray-600 duration-300"
                      alt=""
                      src={item.hinhAnh}
                    />
                  </div>
                  <p className="h-12">{item.tinhThanh}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-12 smm:grid-cols-1 border-2 border-gray-300 md:rounded-full">
          <div
            className="col-span-3  flex-1 px-6 py-3 flex flex-col justify-center items-center cursor-pointer "
            onClick={() => {
              setShowSearchLocation(true);
              setShowSearchDateRange(false);
              setShowSearchGuests(false);
            }}
          >
            <p className="text-sm">Địa điểm</p>
            <p
              className={`text-sm ${
                !locatedAt ? "text-gray-400" : "font-bold"
              }`}
            >
              {locatedAt ? locatedAt : "Bạn sắp đi đâu?"}
            </p>
            <div className="smm:border-b md:hidden smm:border-gray-400 smm:w-9/12 py-2"></div>
          </div>

          <div className="col-span-1 smm:hidden flex justify-center">
            <div className="my-3 border-l border-gray-400"></div>
          </div>

          <div
            className="col-span-4 flex-1 smm:h-16 p-3 flex flex-col justify-center items-center cursor-pointer relative"
            onClick={() => {
              setShowSearchLocation(false);
              setShowSearchDateRange(true);
              setShowSearchGuests(false);
            }}
          >
            <p>
              {dayjs(dateRange[0]?.startDate).format("DD/MM/YYYY")} –{" "}
              {dayjs(dateRange[0]?.endDate).format("DD/MM/YYYY")}
            </p>
            <div className="smm:border-b md:hidden smm:border-gray-400 smm:w-9/12 py-2"></div>

            {showSearchDateRange && (
              <div
                className="absolute z-10 top-[70px] left-1/2 transform -translate-x-1/2 bg-white rounded-lg border-2 border-gray-300 overflow-y-auto cursor-auto overflow-hidden"
                style={{ overscrollBehavior: "none" }}
              >
                <DateRangePicker
                  onChange={(item) => dispatch(setDateRange([item.selection]))}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={dateRange}
                  direction="horizontal"
                  className="p-6 flex max-h-[calc(100vh-250px)] smm:w-[300px] overflow-auto"
                  {...options}
                />
              </div>
            )}
          </div>

          <div className="col-span-1 flex smm:hidden justify-center">
            <div className="my-3 border-l border-gray-400"></div>
          </div>

          <div
            onClick={() => {
              setShowSearchLocation(false);
              setShowSearchDateRange(false);
              setShowSearchGuests(true);
            }}
            className="col-span-3 flex-1 p-3 flex justify-center items-center cursor-pointer relative gap-3"
          >
            <p>Thêm khách</p>
            <div
              className="bg-main ml-5 hover:bg-[#9e3e4e] duration-300 text-white rounded-full p-2 flex justify-center items-center"
              onClick={() => {
                if (locatedAt) {
                  navigate(`/rooms/${convertToSlug(locatedAt)}`);
                  setShowSearchGuests(false);
                  setShowSearchLocation(false);
                  setShowSearchDateRange(false);
                } else {
                  navigate(`/rooms`);
                  setShowSearchGuests(false);
                  setShowSearchLocation(false);
                  setShowSearchDateRange(false);
                }
              }}
            >
              <SearchOutlined className=" h-3 w-3" />
            </div>
            {showSearchGuests && (
              <div className="z-10 absolute w-[300px] top-[70px] right-0 bg-white rounded-full px-6 py-3 border-2 border-gray-300 overflow-y-auto overscroll-y-auto cursor-auto flex justify-between items-center">
                <div className="text-md">Khách</div>
                <div className="flex justify-between items-center gap-3">
                  <button
                    onClick={() => dispatch(setNumPeop(numPeop - 1))}
                    className={`font-bold w-6 h-6 text-white bg-[#FF5A5F] hover:bg-[#9e3e4e] rounded-full duration-300 flex items-center justify-center ${
                      numPeop === 1 && "cursor-not-allowed opacity-50"
                    }`}
                    disabled={numPeop === 1}
                  >
                    <div>-</div>
                  </button>
                  <div className="text-md">{numPeop}</div>
                  <button
                    onClick={() => dispatch(setNumPeop(numPeop + 1))}
                    className="font-bold w-6 h-6 text-white bg-[#FF5A5F] hover:bg-[#9e3e4e] rounded-full duration-300 flex items-center justify-center"
                  >
                    <div>+</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" mt-10 flex flex-wrap justify-center gap-3">
          {filter.map((item, index) => (
            <button
              className="rounded-lg  text-md bg-white text-black border border-gray-300 hover:border-gray-900 duration-300 px-6 py-2"
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterNav;
