import { Form, Input, Modal, Radio, Select, message } from "antd";
import { useEffect, useState } from "react";
import { Admin } from "../../../Services/Admin";

const UserActionButton = ({ userID, renderUserPage }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [user, setUser] = useState(null);
  const [form] = Form.useForm();

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };
  const closeModal = () => {
    setShowConfirmModal(false);
  };

  const deleteUser = () => {
    Admin.deleteUser(user.id)
      .then((response) => {
        message.info(response.data.message);
        closeModal();
        renderUserPage();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Admin.getUserByID(userID)
      .then((response) => {
        setUser(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userID]);

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    const processValues = {
      ...values,
      gender: values.gender === "male" ? true : false,
    };

    Admin.updateUser(processValues)
      .then((response) => {
        message.success(
          `Người dùng ${response.data.content.name} đã được cập nhật thành công.`
        );
        closeUpdateForm();
        renderUserPage();
      })
      .catch((error) => {
        message.error(error.response.data.content);
      });
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
      {showUpdateForm && (
        <Modal
          open={showUpdateForm}
          onCancel={closeUpdateForm}
          centered
          footer={null}
          closable={false}
        >
          <div className="py-5">
            <p className="mb-2 text-lg text-center">Cập nhật người dùng</p>
            {user && (
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
                    label="Mã người dùng"
                    initialValue={user ? user?.id : ""}
                  >
                    <Input
                      name="id"
                      disabled
                      placeholder="Điền tên vào đây..."
                    />
                  </Form.Item>
                  <Form.Item
                    name="name"
                    label="Tên người dùng"
                    initialValue={user ? user?.name : ""}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng ghi họ tên!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input name="name" placeholder="Điền tên vào đây..." />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    initialValue={user ? user?.phone : ""}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input name="phone" placeholder="Điền  số điện thoại..." />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    initialValue={user?.email}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email!",
                      },
                      {
                        type: "email",
                        message: "Không đúng định dạng email!",
                      },
                    ]}
                  >
                    <Input placeholder="example@gmail.com" />
                  </Form.Item>

                  <Form.Item
                    name="gender"
                    label="Giới tính"
                    initialValue={user?.gender ? "male" : "female"}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn giới tính!",
                      },
                    ]}
                  >
                    <Select placeholder="Chọn giới tính">
                      <Select.Option value="male">Nam</Select.Option>
                      <Select.Option value="female">Nữ</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="birthday"
                    label="Ngày sinh"
                    initialValue={user?.birthday}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ngày sinh!",
                      },
                    ]}
                  >
                    <Input placeholder="22/02/2022" />
                  </Form.Item>
                  <Form.Item
                    name="role"
                    label="Chức vụ"
                    initialValue={user?.role}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn chức vụ!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio name="role" value="ADMIN">
                        Admin
                      </Radio>
                      <Radio name="role" value="USER">
                        User
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="flex gap-5 items-center justify-end">
                  <button
                    onClick={closeUpdateForm}
                    className="w-full px-5 py-3 transition-colors duration-150 bg-white text-black border border-black-200 rounded-lg sm:w-auto sm:px-4 sm:py-2"
                  >
                    Huỷ
                  </button>
                  <button className="w-full px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 ">
                    Cập nhật
                  </button>
                </div>
              </Form>
            )}
          </div>
        </Modal>
      )}
      {showConfirmModal && (
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
                Xác nhận xoá người dùng
              </p>
              <p className="text-sm text-gray-700 ">
                Bạn có chắc chắn muốn xoá người dùng{" "}
                <b className="text-primary">{user.name}</b> ? <br />
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
                onClick={deleteUser}
              >
                Xoá
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserActionButton;
