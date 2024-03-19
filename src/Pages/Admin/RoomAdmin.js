import React, { useEffect, useState } from "react";
import { Admin } from "../../Services/Admin";
import { useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";
import {
  Form,
  Input,
  Modal,
  Pagination,
  Popover,
  Select,
  Switch,
  Table,
  message,
} from "antd";
import { Vitri } from "../../Services/Vitri";
import { Link } from "react-router-dom";
import "./RoomAdmin.scss";
import RoomActionsButton from "../../Components/Admin/Edit/RoomActionsButton";

const RoomAdmin = () => {
  const [listRoom, setListRoom] = useState([]);
  const [locations, setLocations] = useState(null);
  const [showModalCreate, setShowModalCreate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalRow, setTotalRow] = useState();
  const getCurrentSearchKeyword = () => searchKeyword;
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Thêm trạng thái để theo dõi lần tải trang đầu tiên
  const handleSearchInputChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  };
  const dispatch = useDispatch();
  const renderRoomPage = (index = 1, searchKeyword) => {
    if (isFirstLoad) {
      dispatch(setLoadingOn()); // Chỉ set loading khi đây là lần tải trang đầu tiên
    }
    Admin.getRoomPage(index, searchKeyword || getCurrentSearchKeyword())
      .then((res) => {
        setListRoom(res.data.content.data);
        // console.log(res.data.content.data);
        setTotalRow(res.data.content.totalRow);
        setTotalPages(
          Math.ceil(res.data.content.totalRow / res.data.content.pageSize)
        );
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (isFirstLoad) {
          dispatch(setLoadingOff());
          setIsFirstLoad(false);
        }
      });
  };

  const fetchLocation = () => {
    Vitri.get_vi_tri()
      .then((res) => setLocations(res.data.content))
      .catch((err) => console.log(err));
  };
  //  add image
  const [form] = Form.useForm();

  const [isSelectedPhoto, setIsSelectedPhoto] = useState(false);
  const [errHinhAnh, setErrHinhAnh] = useState(null);

  const handleChangeHinhAnh = (evt) => {
    let files = evt.target.files;
    let f = files[0];

    // show preview
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = function (oFREvent) {
      document.getElementById("showHinhPhong").src = oFREvent.target.result;
    };

    setIsSelectedPhoto(true);
    setErrHinhAnh(null);
  };

  const onFinishFailed = (errorInfo) => {
    if (!isSelectedPhoto) {
      setErrHinhAnh("Vui lòng chọn hình ảnh!");
    }
    console.error("Failed:", errorInfo);
  };

  useEffect(() => {
    fetchLocation();
    renderRoomPage(1, searchKeyword);
  }, [searchKeyword]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    renderRoomPage(page, searchKeyword);
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
          <p>{record.tenPhong}</p>
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
      title: "Thông tin",
      dataIndex: "thong tin",
      key: "thong tin",
      render: (text, record) => (
        <Popover
          content={
            <>
              <Link to={`/room-detail/${record.id}`}>
                Thông tin chi tiết phòng ${record.tenPhong}
              </Link>
            </>
          }
          // title={`Thông tin chi tiết phòng ${record.tenPhong}`}
          trigger="hover"
        >
          <div className="info-icon">
            <p className="underline">Chi tiết</p>
          </div>
        </Popover>
      ),
    },

    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="space-x-3">
          <RoomActionsButton
            roomID={record.id}
            renderRoomPage={renderRoomPage}
            locations={locations}
          />
        </div>
      ),
    },
  ];

  const closeModal = () => {
    setShowModalCreate(false);
  };
  const onFinish = (values) => {
    if (!isSelectedPhoto) {
      setErrHinhAnh("Vui lòng chọn hình ảnh!");
      return;
    }

    const processData = { ...values, banUi: values.banLa };
    Admin.createRoom(processData)
      .then((response) => {
        const mess = response.data.message;
        const { id } = response.data.content;

        // upload hinh
        const input = document.querySelector("#hinhAnh");

        var dataPhoto = new FormData();
        dataPhoto.append("formFile", input.files[0]);

        Admin.uploadPhotoRoom(id, dataPhoto)
          .then((res) => {
            message.success(mess);
            closeModal();
          })

          .catch((error) => {
            Admin.deleteRoom(id);
            message.error(error.response.data.content);
          });
      })
      .catch((error) => {
        message.error(error.response.data.content);
      });
  };

  return (
    <>
      <div className="flex justify-between items-center mx-auto w-10/12 py-4">
        <h2 className="font-bold text-2xl  mb-5">Quản lý phòng</h2>
        <button
          className=" px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2"
          onClick={() => setShowModalCreate(true)}
        >
          + Thêm phòng mới
        </button>
      </div>
      <div className="">
        <Input
          className="p-2 mb-5"
          placeholder="Nhập từ khóa tìm kiếm..."
          onChange={handleSearchInputChange}
          value={searchKeyword}
        />
      </div>
      <Table
        dataSource={listRoom}
        // onRow={(record) => ({
        //   onClick: () => handleRowClick(record),
        // })}
        columns={columns}
        pagination={false}
        className="table-hoverable" // Áp dụng class CSS
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
      <Modal
        open={showModalCreate}
        onCancel={() => {
          setShowModalCreate(false);
        }}
        footer={null}
        centered
        // closable={false}
      >
        <div className="mt-4 mb-6">
          <p className="mb-4 text-lg font-semibold text-black dark:text-gray-300">
            Thêm phòng thuê
          </p>

          <div className="mb-5">
            <p>Thêm hình phòng</p>

            <img id="showHinhPhong" className=" rounded-[5px]" />

            {!isSelectedPhoto ? (
              <label
                htmlFor="hinhAnh"
                className="w-[50px] h-[50px] border-[1px] border-primary rounded-[3px] block text-center leading-[50px] cursor-pointer"
              >
                +
              </label>
            ) : (
              <label
                htmlFor="hinhAnh"
                className=" bg-gray-300 rounded-[3px] px-3  mt-2 inline-block cursor-pointer"
              >
                change
              </label>
            )}
            <input
              type="file"
              id="hinhAnh"
              name="hinhAnh"
              className="hidden"
              onChange={handleChangeHinhAnh}
            />
            {errHinhAnh && (
              <p className="text-[14px] text-primary">{errHinhAnh}</p>
            )}
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <Form.Item
                name="tenPhong"
                label="Tên phòng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên phòng!",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Điền tên phòng vào đây..." />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="moTa"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả!",
                  },
                ]}
              >
                <Input placeholder="Nhập mô tả vào đây" />
              </Form.Item>

              <Form.Item
                name="maViTri"
                label="Vị trí"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Vị trí!",
                  },
                ]}
              >
                <Select placeholder="Chọn Vị trí" className="group">
                  {locations?.map((location, index) => {
                    return (
                      <Select.Option value={location.id} key={index}>
                        <div className="flex items-center">
                          <img
                            src={location.hinhAnh}
                            className="w-[30px] h-[30px] rounded-[3px] mr-2"
                            alt="hinh vi tri"
                          />
                          <p className="h-[25px] leading-[25px] ">
                            {location.tenViTri}
                          </p>
                        </div>
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="khach"
                label="Số khách"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số khách!",
                  },
                ]}
              >
                <Input type="number" placeholder="2" min={1} />
              </Form.Item>

              <Form.Item
                name="phongNgu"
                label="Số phòng ngủ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số phòng ngủ!",
                  },
                ]}
              >
                <Input type="number" placeholder="1" min={1} />
              </Form.Item>
              <Form.Item
                name="giuong"
                label="Số giường ngủ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số giường ngủ!",
                  },
                ]}
              >
                <Input type="number" placeholder="1" min={1} />
              </Form.Item>

              <Form.Item
                name="phongTam"
                label="Số phòng tắm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số phòng tắm!",
                  },
                ]}
              >
                <Input type="number" placeholder="1" min={1} />
              </Form.Item>

              <Form.Item
                name="giaTien"
                label="Giá phòng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá phòng!",
                  },
                ]}
              >
                <Input type="number" placeholder="Đơn vị $" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3  gap-3">
              <Form.Item
                name="mayGiat"
                label="Máy giặt"
                valuePropName="checked"
                initialValue={true} // Giá trị mặc định khi chưa chọn

                // rules={[
                //   {
                //     required: true,
                //     message: "Vui lòng chọn!",
                //   },
                // ]}
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>

              {/* Bàn Là */}
              <Form.Item
                name="banLa"
                label="Bàn Là"
                valuePropName="checked"
                initialValue={true}
                // rules={[
                //   {
                //     required: true,
                //     message: "Vui lòng chọn!",
                //   },
                // ]}
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>

              {/* Tivi */}
              <Form.Item
                name="tivi"
                label="Tivi"
                valuePropName="checked"
                initialValue={true}
                // rules={[
                //   {
                //     required: true,
                //     message: "Vui lòng chọn!",
                //   },
                // ]}
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>

              {/* Điều hòa */}
              <Form.Item
                name="dieuHoa"
                label="Điều hòa"
                valuePropName="checked"
                initialValue={true}
                // rules={[
                //   {
                //     required: true,
                //     message: "Vui lòng chọn!",
                //   },
                // ]}
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>

              {/* Wifi */}
              <Form.Item
                name="wifi"
                label="Wifi"
                valuePropName="checked"
                initialValue={true}
                // rules={[
                //   {
                //     required: true,
                //     message: "Vui lòng chọn!",
                //   },
                // ]}
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>

              {/* Bếp */}
              <Form.Item
                name="bep"
                label="Bếp"
                valuePropName="checked"
                initialValue={true}
                // rules={[
                //   {
                //     required: true,
                //     message: "Vui lòng chọn!",
                //   },
                // ]}
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>

              {/* Đỗ xe */}
              <Form.Item
                name="doXe"
                label="Đỗ xe"
                valuePropName="checked"
                initialValue={true}
                // rules={[
                //   {
                //     required: true,
                //     message: "Vui lòng chọn!",
                //   },
                // ]}
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>

              {/* Hồ bơi */}
              <Form.Item
                name="hoBoi"
                label="Hồ bơi"
                valuePropName="checked"
                initialValue={true}
                // rules={[
                //   {
                //     required: true,
                //     message: "Vui lòng chọn!",
                //   },
                // ]}
              >
                <Switch checkedChildren="Có" unCheckedChildren="Không" />
              </Form.Item>
            </div>
            <div className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50">
              <button
                onClick={closeModal}
                className="w-full px-5 py-3 transition-colors duration-150 bg-white text-black border border-black-200 rounded-lg sm:w-auto sm:px-4 sm:py-2"
              >
                Huỷ
              </button>
              <button className="w-full px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 ">
                Thêm mới
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default RoomAdmin;
