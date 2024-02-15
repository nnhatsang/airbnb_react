import { Form, Input, Modal, Select, Switch, message } from "antd";
import React, { useEffect, useState } from "react";
import { Admin } from "../../../Services/Admin";

const RoomActionsButton = ({ roomID, renderRoomPage, locations }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [room, setRoom] = useState(null);

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };
  const closeModal = () => {
    setShowConfirmModal(false);
  };
  useEffect(() => {
    Admin.get_idPhong(roomID)
      .then((response) => {
        setRoom(response.data.content);
        // console.log(location);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [roomID]);

  const deleteRoom = () => {
    Admin.deleteRoom(roomID)
      .then((response) => {
        message.info(response.data.message);
        closeModal();
        renderRoomPage();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   update
  const [form] = Form.useForm();
  const [isChange, setIsChange] = useState(false);
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const handleChangeHinhPhong = (evt) => {
    let files = evt.target.files;
    let f = files[0];

    // show preview
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = function (oFREvent) {
      document.getElementById("showHinhPhongUpdate").src =
        oFREvent.target.result;
    };
    setIsChange(true);
  };
  const onFinish = (room) => {
    if (isChange) {
      // upload hinh
      const input = document.querySelector("#hinhPhong");
      var dataPhoto = new FormData();
      dataPhoto.append("formFile", input.files[0]);

      Admin.uploadPhotoRoom(room.id, dataPhoto)
        .then((res) => {
          const processValues = {
            ...room,
            banUi: room.banLa,
            hinhAnh: res.data.content.hinhAnh,
          };

          Admin.updateRoom(processValues)
            .then((result) => {
              message.success(result.data.message);
              setIsChange(false);
              closeUpdateForm();
              renderRoomPage();
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          message.error(error.response.data.content);
        });
    } else {
      const processValues = {
        ...room,
        banUi: room.banLa,
      };

      Admin.updateRoom(processValues)
        .then((result) => {
          message.success(result.data.message);
          closeUpdateForm();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="flex">
        <button
          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary rounded-lg focus:outline-none focus:shadow-outline-gray"
          aria-label="Actions"
          onClick={() => setShowUpdateForm(!showUpdateForm)}
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
        <button
          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary rounded-lg focus:outline-none focus:shadow-outline-gray"
          aria-label="Delete"
          onClick={() => setShowConfirmModal(!showConfirmModal)}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <Modal
        open={showConfirmModal}
        onCancel={closeModal}
        centered
        footer={null}
        closable={false}
      >
        <div className="">
          <div className="mt-4 mb-6">
            <p className="mb-2 text-lg font-bold text-center text-gray-700">
              Xác nhận xoá Phòng
            </p>
            <p className="text-sm text-gray-700 ">
              Bạn có chắc chắn muốn xoá phòng ở{" "}
              <b className="text-primary">{room?.tenPhong}</b> ? <br />
              <i>
                Thao tác tiếp theo <b>không</b> thể hoàn tác.
              </i>
            </p>
          </div>
          <div className="flex gap-5 items-center justify-end">
            {" "}
            <button
              onClick={closeModal}
              className="w-full px-5 py-3 transition-colors duration-150 bg-white text-black border border-black-200 rounded-lg sm:w-auto sm:px-4 sm:py-2"
            >
              Huỷ
            </button>
            <button
              className="w-full px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 "
              onClick={deleteRoom}
            >
              Xoá
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={showUpdateForm}
        onCancel={closeUpdateForm}
        centered
        footer={null}
        // closable={false}
      >
        <div className="mt-4 mb-6">
          <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Cập nhật phòng thuê
          </p>

          <div className="mb-10">
            <img
              src={room?.hinhAnh}
              className="h-[200px] w-full object-cover rounded-[3px]"
              alt="hinh anh phong thue"
              id="showHinhPhongUpdate"
            />

            <div>
              <label
                htmlFor="hinhPhong"
                className=" bg-gray-300 rounded-[3px] px-3 inline-block cursor-pointer hover:text-white hover:bg-slate-500 mt-3"
              >
                Change
              </label>
              <Input
                type="file"
                name="hinhPhong"
                id="hinhPhong"
                className="hidden"
                onChange={handleChangeHinhPhong}
              />
            </div>
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
                name="id"
                label="Mã phòng thuê"
                initialValue={room?.id}
              >
                <Input name="id" disabled placeholder="Điền tên vào đây..." />
              </Form.Item>
              <Form.Item
                name="tenPhong"
                label="Tên phòng thuê"
                initialValue={room?.tenPhong}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng ghi tên phòng thuê!",
                    whitespace: true,
                  },
                ]}
              >
                <Input name="tenPhong" placeholder="Điền tên vào đây..." />
              </Form.Item>

              <Form.Item
                name="moTa"
                label="Mô tả"
                initialValue={room?.moTa}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Mô tả!",
                    whitespace: true,
                  },
                ]}
              >
                <Input name="moTa" placeholder="Điền Mô tả..." />
              </Form.Item>

              <Form.Item
                name="maViTri"
                label="Vị trí"
                initialValue={room?.maViTri}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Vị trí!",
                  },
                ]}
              >
                <Select placeholder="Chọn Vị trí">
                  {locations?.map((item, index) => {
                    return (
                      <Select.Option value={item.id} key={index}>
                        {item.tenViTri}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Số khách"
                name="khach"
                initialValue={room?.khach}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số khách!",
                  },
                ]}
              >
                <Input name="khach" type="number" placeholder="2" />
              </Form.Item>
              <Form.Item
                label="Số phòng ngủ"
                name="phongNgu"
                initialValue={room?.phongNgu}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số phòng ngủ!",
                  },
                ]}
              >
                <Input name="phongNgu" type="number" placeholder="2" />
              </Form.Item>

              <Form.Item
                label="Số giường"
                name="giuong"
                initialValue={room?.giuong}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số giường!",
                  },
                ]}
              >
                <Input name="giuong" type="number" placeholder="2" />
              </Form.Item>

              <Form.Item
                label="Số phòng tắm"
                name="phongTam"
                initialValue={room?.phongTam}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số phòng tắm!",
                  },
                ]}
              >
                <Input name="phongTam" type="number" placeholder="2" />
              </Form.Item>

              <Form.Item
                label="Giá phòng"
                name="giaTien"
                initialValue={room?.giaTien}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá phòng!",
                  },
                ]}
              >
                <Input name="giaTien" type="number" placeholder="Đơn vị $" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Form.Item
                name="mayGiat"
                label="Máy giặt"
                initialValue={room?.mayGiat}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Máy giặt!",
                  },
                ]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="banLa"
                label="Bàn là"
                initialValue={room?.banLa}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Bàn là!",
                  },
                ]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="tivi"
                label="Tivi"
                initialValue={room?.tivi}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Tivi!",
                  },
                ]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="dieuHoa"
                label="Điều hoà"
                initialValue={room?.dieuHoa}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Điều hoà!",
                  },
                ]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="wifi"
                label="Wifi"
                initialValue={room?.wifi}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Wifi!",
                  },
                ]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="bep"
                label="Bếp"
                initialValue={room?.bep}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Bếp!",
                  },
                ]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="doXe"
                label="Đỗ xe"
                initialValue={room?.doXe}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Đỗ xe!",
                  },
                ]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="hoBoi"
                label="Hồ bơi"
                initialValue={room?.hoBoi}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn Hồ bơi!",
                  },
                ]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>
            <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800 mt-5">
              <button
                onClick={closeUpdateForm}
                className="w-full px-5 py-3 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
              >
                Huỷ
              </button>
              <button className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-primary hover:bg-primary-dark focus:outline-none focus:shadow-outline-purple">
                Cập nhật
              </button>
            </footer>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default RoomActionsButton;
