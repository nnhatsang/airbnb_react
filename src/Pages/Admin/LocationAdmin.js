import React, { useEffect, useState } from "react";
import { Admin } from "../../Services/Admin";
import { useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";
import { Table } from "antd";

const LocationAdmin = () => {
  const [listLocation, setListLocation] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalRow, setTotalRow] = useState();
  const dispatch = useDispatch();
  const renderLocationPage = (index, searchKeyword = " ") => {
    dispatch(setLoadingOn());
    Admin.getLocationPage(index, searchKeyword)
      .then((res) => {
        setListLocation(res.data.content.data);
        console.log(res.data.content.data);
        setTotalRow(res.data.content.totalRow);
        setTotalPages(
          Math.ceil(res.data.content.totalRow / res.data.content.pageSize)
        );
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    renderLocationPage(1);
  }, []);
  const columns = [
    {
      title: "Nã ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record) => (
        <div className="flex items-center">
          <img src={text} alt={text} className="w-36 h-16 object-cover mr-2" />
          <p>{record.tenViTri}</p>
        </div>
      ),
    },
    {
      title: "Tỉnh thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
      key: "quocGia",
      render: (text) => <p className="underline">{text}</p>,
    },

    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="space-x-3">
          {/* <UserActionButton
             userID={record.id}
             renderUserPage={renderUserPage}
           /> */}
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center mx-auto w-10/12 py-4">
        <h2 className="font-bold text-2xl  mb-5">Quản lý vị trí</h2>
        <button
          className=" px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2"
          // onClick={() => setShowModalCreate(true)}
        >
          + Thêm vị trí mới
        </button>
      </div>
      <Table dataSource={listLocation} columns={columns} pagination={false} />
    </>
  );
};

export default LocationAdmin;
