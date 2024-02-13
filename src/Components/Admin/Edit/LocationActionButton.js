import { Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { Admin } from "../../../Services/Admin";
import { useDispatch } from "react-redux";
import { setLoadingOff } from "../../../Redux/SpinnerSlice";

const LocationActionButton = ({ locatID, renderLocaPage }) => {
  // console.log(locatID);
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
        dispatch(setLoadingOff());
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
  const dispatch = useDispatch();
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
              renderLocaPage();
              dispatch(setLoadingOff());
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
        // closable={false}
      >
        <div className="py-5">
          <p className="mb-2 text-lg text-center font-bold ">Cập nhật vị trí</p>
          <div className="space-y-5">
            <img
              src={location?.hinhAnh}
              className="h-[200px] w-full object-cover rounded-[3px]"
              alt="hinh anh phong thue"
              id="showHinhVitriUpdate"
            />

            <div className=" space-y-5">
              <label
                htmlFor="hinhVitriUpdate"
                className=" bg-gray-300 px-5 py-2 rounded-lg duration-200 inline-block cursor-pointer hover:text-white hover:bg-slate-500 "
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
            <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50  mt-5">
              <button
                onClick={closeUpdateForm}
                className="w-full px-5 py-3 transition-colors duration-150 bg-white text-black border border-black-200 rounded-lg sm:w-auto sm:px-4 sm:py-2"
              >
                Huỷ
              </button>
              <button className="w-full px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 ">
                Cập nhật
              </button>
            </footer>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default LocationActionButton;
