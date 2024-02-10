import { Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { Admin } from "../../../Services/Admin";

const LocationActionButton = ({ locatID, renderLocaPage }) => {
  console.log(locatID);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [form] = Form.useForm();
  const [location, setLocation] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const handleChangeHinhVitri = (evt) => {
    let files = evt.target.files;
    let f = files[0];

    // show preview
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = function (oFREvent) {
      document.getElementById("showHinhVitriUpdate").src =
        oFREvent.target.result;
    };
    setIsChange(true);
  };
  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };
  const closeModal = () => {
    setShowConfirmModal(false);
  };
  const deleteLocation = () => {
    Admin.deleteLocation(locatID)
      .then((response) => {
        message.info(response.data.message);
        closeModal();
        renderLocaPage();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    Admin.getLocationByID(locatID)
      .then((response) => {
        setLocation(response.data.content);
        // console.log(location);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [locatID]);
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
  const onFinish = (value) => {
    if (isChange) {
      // upload hinh
      const input = document.querySelector("#hinhVitriUpdate");
      var dataPhoto = new FormData();
      dataPhoto.append("formFile", input.files[0]);

      Admin.uploadPhotoLocation(location.id, dataPhoto)
        .then((res) => {
          const processValues = {
            ...value,
            hinhAnh: res.data.content.hinhAnh,
          };

          Admin.updateLocation(processValues)
            .then((result) => {
              message.success(result.data.message);
              setIsChange(false);
              closeUpdateForm();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          message.error(error.response.data.content);
        });
    } else {
      Admin.updateLocation({ ...value, hinhAnh: location.hinhAnh })
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
          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary rounded-lg dark:text-primary-dark focus:outline-none focus:shadow-outline-gray"
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
          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-primary rounded-lg dark:text-primary-dark focus:outline-none focus:shadow-outline-gray"
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
              Xác nhận xoá Vị trí
            </p>
            <p className="text-sm text-gray-700 ">
              Bạn có chắc chắn muốn xoá vị trí tại{" "}
              <b className="text-primary">{location?.tenViTri}</b> ở{" "}
              {location?.tinhThanh}? <br />
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
              onClick={deleteLocation}
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
        closable={false}
      >
        <div
          className="w-full px-6 py-4 overflow-scroll max-h-[70vh] bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
          role="dialog"
          id="modal"
        >
          <header className="flex justify-end">
            <button
              className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
              aria-label="close"
              onClick={closeUpdateForm}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </header>
          <div className="mt-4 mb-6">
            <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Cập nhật vị trí
            </p>

            <div className="mb-10">
              <img
                src={location?.hinhAnh}
                className="h-[200px] w-full object-cover rounded-[3px]"
                alt="hinh anh phong thue"
                id="showHinhVitriUpdate"
              />

              <div>
                <label
                  htmlFor="hinhVitriUpdate"
                  className=" bg-gray-300 rounded-[3px] px-3 inline-block cursor-pointer hover:text-white hover:bg-slate-500 mt-3"
                >
                  Change
                </label>
                <input
                  type="file"
                  name="hinhVitriUpdate"
                  id="hinhVitriUpdate"
                  className="hidden"
                  onChange={handleChangeHinhVitri}
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
              <div className="grid grid-cols-1">
                <Form.Item
                  name="id"
                  label="Mã vị trí"
                  initialValue={location?.id}
                >
                  <Input name="id" disabled placeholder="Điền tên vào đây..." />
                </Form.Item>
                <Form.Item
                  name="tenViTri"
                  label="Tên vị trí"
                  initialValue={location?.tenViTri}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng ghi tên vị trí!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="tenViTri"
                    placeholder="Điền tên vị trí vào đây..."
                  />
                </Form.Item>

                <Form.Item
                  name="tinhThanh"
                  label="Tên tỉnh thành"
                  initialValue={location?.tinhThanh}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng ghi tên tỉnh thành!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="tinhThanh"
                    placeholder="Điền tên tỉnh thành vào đây..."
                  />
                </Form.Item>

                <Form.Item
                  name="quocGia"
                  label="Tên quốc gia"
                  initialValue={location?.quocGia}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng ghi tên quốc gia!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name="quocGia"
                    placeholder="Điền tên quốc gia vào đây..."
                  />
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
        </div>
      </Modal>
    </>
  );
};

export default LocationActionButton;
