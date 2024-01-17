import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Vitri } from "../../Services/Vitri";

const FilterNav = () => {
  const [extendSearchBar, setExtendSearchBar] = useState(false);
  const overlayRef = useRef(null);
  const [showSearchLocation, setShowSearchLocation] = useState(false);
  const [showSearchDateRange, setShowSearchDateRange] = useState(false);
  const [showSearchGuests, setShowSearchGuests] = useState(false);
  const [div2Visible, setDiv2Visible] = useState(true);

  const location = useLocation();

  const handleClickOutside = (event) => {
    if (overlayRef.current && overlayRef.current.contains(event.target)) {
      setExtendSearchBar(false);
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
  }, [extendSearchBar]);

   const [vitri, setVitri] = useState([]);
   useEffect(() => {
     Vitri.get_vi_tri()
       .then((res) => setVitri(res.data.content))
       .catch((err) => console.log(err));
   }, []);
  return (
    <>
      <div className="hidden lg:block bg-white w-1/2 rounded-full border-[1px] border-gray-300 relative">
        {showSearchLocation && (
          <div className="absolute w-[500px] top-[70px] left-0 bg-white rounded-lg p-6 border-2 border-gray-300 overflow-y-auto overscroll-y-auto cursor-auto max-h-[calc(100vh-250px)]">
            <h1 className="font-bold text-md mb-6">Tìm kiếm địa điểm</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {vitri.map((item, index) => (
                <div
                  key={index}
                //   onClick={() => {
                //     dispatch(setDiaDiem(item.tinhThanh));
                //     setShowSearchLocation(false);
                //     setShowSearchDateRange(true);
                //   }}
                  className="space-y-1 group cursor-pointer"
                >
                  <div>
                    <img
                      className="w-full h-20 object-cover rounded-lg border-2 group-hover:border-gray-600 duration-300"
                      alt=""
                      src={item.hinhAnh}
                    />
                  </div>
                  <p>{item.tinhThanh}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* <div className="flex">
          <div
            onClick={() => {
              setShowSearchLocation(true);
              setShowSearchDateRange(false);
              setShowSearchGuests(false);
            }}
            className="flex-1 px-6 py-3 flex justify-start items-center cursor-pointer"
          >
            <div>
              <p className="text-sm">Địa điểm</p>
              <p
                className={`text-sm ${
                  !diaDiem ? "text-gray-400" : "font-bold"
                }`}
              >
                {diaDiem ? diaDiem : "Bạn sắp đi đâu?"}
              </p>
            </div>
          </div>
          <div className="my-3 border-l border-gray-400"></div>
          <div
            onClick={() => {
              setShowSearchLocation(false);
              setShowSearchDateRange(true);
              setShowSearchGuests(false);
            }}
            className="flex-1 p-3 flex justify-center items-center cursor-pointer relative"
          >
            <p>
              {moment(dateRange[0].startDate).format("DD/MM/YYYY")} –{" "}
              {moment(dateRange[0].endDate).format("DD/MM/YYYY")}
            </p>
            {showSearchDateRange && (
              <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2 bg-white rounded-lg border-2 border-gray-300 overflow-y-auto overscroll-y-auto cursor-auto">
                <DateRangePicker
                  onChange={(item) => dispatch(setDateRange([item.selection]))}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={dateRange}
                  direction="horizontal"
                  className="p-6 flex max-h-[calc(100vh-250px)] overflow-auto overscroll-auto"
                />
              </div>
            )}
          </div>
          <div className="my-3 border-l border-gray-400"></div>
          <div
            onClick={() => {
              setShowSearchLocation(false);
              setShowSearchDateRange(false);
              setShowSearchGuests(true);
            }}
            className="flex-1 p-3 flex justify-between items-center cursor-pointer relative gap-3"
          >
            <p>Thêm khách</p>
            <div
              className="bg-[#FF5A5F] hover:bg-[#9e3e4e] duration-300 text-white rounded-full p-2 flex justify-center items-center"
              onClick={() => {
                if (diaDiem) {
                  navigate(`/roombycity/${convertToSlug(diaDiem)}`);
                  setExtendSearchBar(false);
                  setShowSearchGuests(false);
                  setShowSearchLocation(false);
                  setShowSearchDateRange(false);
                }
              }}
            >
              <FontAwesomeIcon className="h-3 w-3" icon={faSearch} />
            </div>
            {showSearchGuests && (
              <div className="absolute w-[300px] top-[70px] right-0 bg-white rounded-full px-6 py-3 border-2 border-gray-300 overflow-y-auto overscroll-y-auto cursor-auto flex justify-between items-center">
                <div className="text-md">Khách</div>
                <div className="flex justify-between items-center gap-3">
                  <button
                    onClick={() => dispatch(setSoNguoi(soNguoi - 1))}
                    className={`font-bold w-6 h-6 text-white bg-[#FF5A5F] hover:bg-[#9e3e4e] rounded-full duration-300 flex items-center justify-center ${
                      soNguoi === 1 && "cursor-not-allowed opacity-50"
                    }`}
                    disabled={soNguoi === 1}
                  >
                    <div>-</div>
                  </button>
                  <div className="text-md">{soNguoi}</div>
                  <button
                    onClick={() => dispatch(setSoNguoi(soNguoi + 1))}
                    className="font-bold w-6 h-6 text-white bg-[#FF5A5F] hover:bg-[#9e3e4e] rounded-full duration-300 flex items-center justify-center"
                  >
                    <div>+</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default FilterNav;
