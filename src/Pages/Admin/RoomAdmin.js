import React, { useEffect, useState } from "react";
import { Admin } from "../../Services/Admin";
import { useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";
import { Input, Pagination, Table } from "antd";
import { Vitri } from "../../Services/Vitri";

const RoomAdmin = () => {
  const [listRoom, setListRoom] = useState([]);
  const [locations, setLocations] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalRow, setTotalRow] = useState();

  const dispatch = useDispatch();
  const renderRoomPage = (index, searchKeyword = " ") => {
    dispatch(setLoadingOn());
    Admin.getRoomPage(index, searchKeyword)
      .then((res) => {
        setListRoom(res.data.content.data);
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
  const fetchLocation = () => {
    Vitri.get_vi_tri()
      .then((res) => setLocations(res.data.content))
      .catch((err) => console.log(err));
  };
  /* {
      id: 1,
      tenPhong: 'NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!',
      khach: 3,
      phongNgu: 1,
      giuong: 1,
      phongTam: 1,
      moTa: 'Tự nhận phòng\r\n' +
        'Tự nhận phòng bằng khóa thông minh.\r\n' +
        'Dinh Long là Chủ nhà siêu cấp\r\n' +
        'Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.',
      giaTien: 28,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: false,
      wifi: true,
      bep: false,
      doXe: true,
      hoBoi: true,
      banUi: true,
      maViTri: 1,
      hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg'
    }, */
  useEffect(() => {
    renderRoomPage(1);
    fetchLocation();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    renderRoomPage(page);
  };
  const mapMaViTriToTenViTri = (maViTri, locations) => {
    const location = locations.find((item) => item.id === maViTri);
    return location ? location.tenViTri : "";
  };
  const columns = [
    {
      title: "Nã ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Phòng",
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
      dataIndex: "maViTri",
      key: "maViTri",
      render: (text, record) => (
        <p>{mapMaViTriToTenViTri(record.maViTri, locations)}</p>
      ),
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
          {/* <LocationActionButton
            locatID={record.id}
            renderLocaPage={renderLocationPage}
          /> */}
        </div>
      ),
    },
  ];
  const handleRowClick = (record) => {
    // Thực hiện các thao tác trước khi điều hướng, nếu cần

    // Sau đó điều hướng đến trang mong muốn, ví dụ '/room-details'
    // Bạn có thể thay đổi '/room-details' thành đường dẫn mà bạn muốn
    // <Link to={`/room-details/${record.id}`}>
    //   {/* Bạn có thể đặt nội dung của Link ở đây, ví dụ: */}
    //   <p>{record.maViTri}</p>
    // </Link>;
  };
  return (
    <>
      <div className="flex justify-between items-center mx-auto w-10/12 py-4">
        <h2 className="font-bold text-2xl  mb-5">Quản lý phòng</h2>
        <button
          className=" px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2"
          // onClick={() => setShowModalCreate(true)}
        >
          + Thêm phòng mới
        </button>
      </div>
      <div className="">
        <Input
          className="p-2 mb-5"
          placeholder="Nhập từ khóa tìm kiếm..."
          // onChange={handleSearchInputChange}
          // value={searchKeyword}
        />
      </div>
      <Table
        dataSource={listRoom}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        columns={columns}
        pagination={false}
      />
      <div className="py-2"></div>
      <Pagination
        current={currentPage}
        pageSize={10}
        total={totalRow}
        onChange={handlePageChange}
        showSizeChanger={false}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </>
  );
};

export default RoomAdmin;
