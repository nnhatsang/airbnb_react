import React, { useEffect, useState } from "react";
import { Admin } from "../../Services/Admin";
import { useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";
import { Form, Input, Modal, Pagination, Table, message } from "antd";
import LocationActionButton from "../../Components/Admin/Edit/LocationActionButton";

const LocationAdmin = () => {
  const [listLocation, setListLocation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalRow, setTotalRow] = useState();
  const dispatch = useDispatch();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [form] = Form.useForm();
  const [isSelectedPhoto, setIsSelectedPhoto] = useState(false);
  const [errHinhAnh, setErrHinhAnh] = useState(null);

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
    // Gọi API với từ khóa tìm kiếm
    renderLocationPage(1, e.target.value);
  };

  const handleChangeHinhAnh = (evt) => {
    let files = evt.target.files;
    let f = files[0];

    // show preview
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = function (oFREvent) {
      document.getElementById("showHinhVitri").src = oFREvent.target.result;
    };

    setIsSelectedPhoto(true);
    setErrHinhAnh(null);
  };
  const renderLocationPage = (index, searchKeyword = " ") => {
    dispatch(setLoadingOn());
    Admin.getLocationPage(index, searchKeyword)
      .then((res) => {
        setListLocation(res.data.content.data);
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
  const handlePageChange = (page) => {
    setCurrentPage(page);
    renderLocationPage(page);
  };
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
          <LocationActionButton
            locatID={record.id}
            renderLocaPage={renderLocationPage}
          />
        </div>
      ),
    },
  ];
  const onFinishFailed = (errorInfo) => {
    if (!isSelectedPhoto) {
      setErrHinhAnh("Vui lòng chọn hình ảnh!");
    }
    console.error("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    if (!isSelectedPhoto) {
      setErrHinhAnh("Vui lòng chọn hình ảnh!");
      return;
    }

    Admin.createLocation(values)
      .then((response) => {
        const mess = response.data.message;
        const { id } = response.data.content;

        // upload hinh
        const input = document.querySelector("#hinhAnhVitri");
        var dataPhoto = new FormData();
        dataPhoto.append("formFile", input.files[0]);

        Admin.uploadPhotoLocation(id, dataPhoto)
          .then((res) => {
            message.success(mess);
            closeModal();
            renderLocationPage();
          })

          .catch((error) => {
            Admin.deleteLocation(id);
            message.error(error.response.data.content);
            renderLocationPage();
          });
      })
      .catch((error) => {
        message.error(error.response.data.content);
      });
  };
  const closeModal = () => {
    setShowModalCreate(false);
  };
  return (
    <>
      <div className="flex justify-between items-center mx-auto w-10/12 py-4">
        <h2 className="font-bold text-2xl  mb-5">Quản lý vị trí</h2>
        <button
          className=" px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2"
          onClick={() => setShowModalCreate(true)}
        >
          + Thêm vị trí mới
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
      <Table dataSource={listLocation} columns={columns} pagination={false} />
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
          <p className="mb-2 text-lg font-semibold text-gray-700 ">
            Thêm vị trí mới
          </p>

          <div className="">
            <div className="mb-5">
              <p>Thêm hình</p>

              <img id="showHinhVitri" className=" rounded-[5px]" />

              {!isSelectedPhoto ? (
                <label
                  htmlFor="hinhAnhVitri"
                  className="w-[50px] h-[50px] border-[1px] border-primary rounded-[3px] block text-center leading-[50px] cursor-pointer"
                >
                  +
                </label>
              ) : (
                <label
                  htmlFor="hinhAnhVitri"
                  className=" bg-gray-300 rounded-[3px] px-3  mt-2 inline-block cursor-pointer"
                >
                  Change
                </label>
              )}
              <input
                type="file"
                id="hinhAnhVitri"
                name="hinhAnhVitri"
                className="hidden"
                onChange={handleChangeHinhAnh}
              />
              {errHinhAnh && (
                <p className="text-[14px] text-primary">{errHinhAnh}</p>
              )}
            </div>
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="grid grid-cols-1 ">
              <Form.Item
                name="tenViTri"
                label="Tên vị trí"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên vị trí!",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Điền tên vị trí vào đây..." />
              </Form.Item>
              <Form.Item
                label="Tỉnh thành"
                name="tinhThanh"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tỉnh thành!",
                  },
                ]}
              >
                <Input placeholder="Nhập Tỉnh thành vào đây" />
              </Form.Item>

              <Form.Item
                label="Quốc gia"
                name="quocGia"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Quốc gia!",
                  },
                ]}
              >
                <Input placeholder="Nhập Quốc gia vào đây" />
              </Form.Item>
            </div>
            <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50  mt-5">
              <button
                onClick={closeModal}
                className="w-full px-5 py-3 transition-colors duration-150 bg-white text-black border border-black-200 rounded-lg sm:w-auto sm:px-4 sm:py-2"
              >
                Huỷ
              </button>
              <button className="w-full px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 ">
                Thêm mới
              </button>
            </footer>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default LocationAdmin;
