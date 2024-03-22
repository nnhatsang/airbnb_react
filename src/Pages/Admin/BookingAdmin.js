import { Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Admin } from "../../Services/Admin";
import moment from "moment";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Booking = () => {
  const [bookings, setBookings] = useState(null);
  const data = [];
  const columns = [
    {
      title: "Mã đặt phòng",
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      key: "maPhong",
      fixed: "left",
    },

    {
      title: "Mã người dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      fixed: "left",
    },

    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      fixed: "left",
    },
    {
      title: "Ngày đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      fixed: "left",
    },
    {
      title: "Số khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
      fixed: "left",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      fixed: "left",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      fixed: "right",
    },
  ];
  const fetchBooking = () => {
    Admin.getAllBookings()
      .then((res) => {
        setBookings(res.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBooking();
  }, []);
  bookings?.map((item, index) => {
    data.push({
      key: index,
      id: item.id,
      maPhong: item.maPhong,
      maNguoiDung: item.maNguoiDung,
      ngayDen: moment(item.ngayDen).format("DD/MM/YYYY"),
      ngayDi: moment(item.ngayDi).format("DD/MM/YYYY"),
      trangThai: moment(item.ngayDi).isBefore(new Date()) ? (
        // <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
        //   Hết Hạn
        // </span>
        <FontAwesomeIcon className="w-5 h-5 text-red-800" icon={faBan} />
      ) : (
        // <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
        //   Còn Hạn
        // </span>
        <FontAwesomeIcon className="w-4 h-4 text-main" icon={faCheck} />
      ),
      soLuongKhach: item.soLuongKhach,
      action: (
        <div className="flex">
          <button
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary rounded-lg dark:text-primary-dark focus:outline-none focus:shadow-outline-gray"
            aria-label="Edit"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
            </svg>
          </button>
          {/* <DeleteBookingButton booking={item} fetchBooking={fetchBooking} /> */}
        </div>
      ),
    });
  });
  return (
    <>
      <div className="flex justify-between items-center mx-auto w-10/12 py-4 gap-10">
        <h2 className="font-bold text-2xl  mb-5">Quản lý Booking</h2>

        {/* <button
          className=" px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2"
          // onClick={() => setShowModalCreate(true)}
        >
          + Đặt Phòng
        </button> */}
      </div>
      <div className="">
        <Input
          className="p-2 mb-5"
          placeholder="Nhập từ khóa tìm kiếm..."
          // onChange={handleSearchInputChange}
          // value={searchKeyword}
        />
      </div>
      <Table columns={columns} dataSource={data} />;
    </>
  );
};

export default Booking;
