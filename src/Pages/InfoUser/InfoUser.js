import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Skeleton,
  message,
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "../../Services/Auth";
import { Phong } from "../../Services/Phong";
import { Vitri } from "../../Services/Vitri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import TitlePage from "../TitlePage";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";
import { API } from "../../Services/configServ";
import { setLogin } from "../../Redux/UserSlice";
import { userLocalStorage } from "../../Utils/Local";
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import RoomsLocate from "../../Components/RoomsLocate/RoomsLocate";
import viVN from "antd/lib/locale/vi_VN"; // Import ngôn ngữ tiếng Việt
import moment from "moment";
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const InfoUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const { user } = useSelector((state) => {
    return state.UserSlice;
  });
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userBookedPlaces, setUserBookedPlaces] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const fetchUser = () => {
    dispatch(setLoadingOn());
    if (user != null) {
      Auth.get_infoUser(user.id)
        .then((res) => {
          setUserInfo(res.data.content);
          //   console.log(res.data.content);
          dispatch(setLoadingOff());
        })
        .catch((err) => console.log(err));
    } else {
      nav("/");
    }
  };
  const getUserBookedPlaces = async (id) => {
    try {
      const userBookedPlacesResponse = await Auth.get_booked_byUser(user.id);
      const promises = userBookedPlacesResponse.data.content.map(
        async (item) => {
          const { ngayDen, ngayDi, soLuongKhach } = item;

          try {
            const roomResponse = await Phong.get_idPhong(item.maPhong);
            const room = roomResponse.data.content;

            try {
              const locationResponse = await Vitri.get_idViTri(room.maViTri);
              const location = locationResponse.data.content;

              return {
                ...room,
                tinhThanh: location.tinhThanh,
                ngayDen,
                ngayDi,
                soLuongKhach,
              };
            } catch (locationError) {
              console.error(locationError);
              return null;
            }
          } catch (roomError) {
            console.error(`Error fetching room: ${roomError.message}`);
            return null;
          }
        }
      );

      const transformedData = await Promise.all(promises);
      const userBookedPlaces = transformedData.filter((data) => data !== null);

      setUserBookedPlaces(userBookedPlaces);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUser();
      getUserBookedPlaces(user.id);
    } else {
      nav("/");
    }
  }, []);

  // Kiểm tra điều kiện và điều hướng ở đây nếu cần
  const [original, setOriginal] = useState("");
  const [file, setFile] = useState("");
  const onImageError = (e) => {
    e.target.src = "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";
  };
  const UploadAva = () => {
    setIsModalOpen(false);
    const formData = new FormData();
    formData.append("formFile", original);
    API.post("/api/users/upload-avatar", formData, {
      headers: { token: user.token },
    })
      .then((res) => {
        message.success("Cập nhật avatar thành công!");
        fetchUser(user.id);
        dispatch(setLogin({ ...user, avatar: res.data.content.avatar }));
        userLocalStorage.set({ ...user, avatar: res.data.content.avatar });
      })
      .catch((err) => {
        message.error(
          err.response.data.content.replace(/^\w/, (c) => c.toUpperCase())
        );
      });
  };
  return (
    <>
      <div className="uppercase">
        <TitlePage title={`Thông tin người dùng ${userInfo.name}`} />
      </div>
      <div className="container grid lg:flex gap-10 py-5">
        <Card className="basis-auto h-[500px] block lg:sticky top-0 lg:top-20">
          <div className="space-y-3">
            <img
              className="mx-auto w-36 h-36 object-cover rounded-full"
              alt=""
              src={
                userInfo.avatar !== ""
                  ? userInfo.avatar
                  : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              }
            />
            <div className="w-full flex justify-center">
              <button
                className="mx-auto w-auto underline font-bold text-sm"
                onClick={showModal}
              >
                Cập nhật ảnh
              </button>
              {isModalOpen && (
                <Modal
                  open={isModalOpen}
                  onCancel={showModal}
                  footer={null}
                  centered
                >
                  <div className="space-y-6">
                    <h5 className="text-center capitalize text-sm font-bold">
                      Thay đổi ảnh đại diện
                    </h5>
                    <img
                      className="mx-auto w-24 h-24 object-cover rounded-full"
                      src={file}
                      onError={onImageError}
                    />
                    <div className="flex flex-col gap-5 justify-center items-center">
                      <Input
                        type="file"
                        onChange={(e) => {
                          setOriginal(e.target.files[0]);
                          setFile(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                      <button
                        className="py-2 px-5 bg-main text-white rounded-md hover:bg-opacity-70 duration-500"
                        onClick={() => {
                          UploadAva();
                        }}
                      >
                        Upload Avatar
                      </button>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
          <div className="space-y-6 mt-3">
            <div className="flex justify-start items-center gap-3">
              <img
                className="w-6"
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/5972/5972778.png"
              />
              <p className="font-bold text-xl">Xác minh danh tính</p>
            </div>
            <p className="text-justify">
              Xác minh danh tính của bạn với huy hiệu xác minh danh tính.
            </p>
            <Button>Nhận huy hiệu</Button>
            <div className="w-full h-px bg-gray-300"></div>
            <p className="text-xl font-bold uppercase">
              {userInfo.name} đã xác nhận
            </p>
            <p className="space-x-3">
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span>Địa chỉ email</span>
            </p>
          </div>
        </Card>
        <div className="basis-9/12 space-y-3">
          <p className="font-bold text-xl">
            Xin chào, tôi là <span className="capitalize">{userInfo.name}</span>
          </p>
          <p className="text-gray-500 text-sm">Bắt đầu tham gia vào {2023}</p>

          <ConfigProvider locale={viVN} button={{ className: "bg-blue-500" }}>
            <ModalForm
              submitter={{
                // Configure the button text
                searchConfig: {
                  resetText: "Reset",
                  submitText: "Cập nhật",
                },
                // Configure the properties of the button
                resetButtonProps: {
                  style: {
                    // Hide the reset button
                    display: "none",
                  },
                },
                submitButtonProps: {},
              }}
              title="Chỉnh sửa hồ sơ"
              trigger={
                <button
                  className="w-auto underline font-bold text-sm"
                  onClick={() => {
                    form.setFieldsValue({
                      ...userInfo,
                      gender: userInfo.gender ? "nam" : "nu",
                    });
                  }}
                >
                  Chỉnh sửa hồ sơ
                </button>
              }
              form={form}
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
                onCancel: () => {},
              }}
              submitTimeout={2000}
              onFinish={async (values) => {
                // const birthdayValue =
                //   typeof values.birthday === "Invalid Date" &&
                //   moment(values.birthday, "DD-MM-YYYY", true).isValid()
                //     ? values.birthday
                //     : moment().format("DD-MM-YYYY");
                const data = {
                  ...values,
                  gender: values.gender === "nam",
                  // birthday: birthdayValue,
                };
                await waitTime(2000);
                API.put(`/api/users/${user.id}`, { ...data })
                  .then(() => {
                    dispatch(setLogin({ ...user, ...data }));
                    userLocalStorage.set({ ...user, ...data });
                    message.success(`Cập nhật thông tin thành công`);
                    fetchUser(user.id);
                  })
                  .catch((err) => {
                    message.error(err.response.data);
                  });
                return true;
              }}
            >
              <ProForm.Group>
                <ProFormText
                  width="md"
                  name="email"
                  label="Email"
                  // readonly
                  placeholder="vidu@gmail.com"
                  rules={[
                    {
                      type: "email",
                      message: "Email không hợp lệ!",
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name="name"
                  label="Họ tên"
                  placeholder="Nguyễn Văn A"
                  tooltip="Tên trên giấy tờ hợp lệ của bạn"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ tên!",
                    },
                    {
                      pattern: new RegExp(/^[\p{L}\s'-]+$/u),
                      message: "Họ tên không hợp lệ!",
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name="phone"
                  label="Số điện thoại"
                  placeholder="0903 123 123"
                  rules={[
                    {
                      pattern: new RegExp(/^0(?!0)\d{9}$/g),
                      message: "Sai định dạng số điện thoại!",
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                />
                <ProFormDatePicker
                  width="md"
                  name="birthday"
                  label="Ngày sinh"
                  format="DD-MM-YYYY"
                  placeholder="Chọn ngày sinh"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày sinh!",
                    },
                  ]}
                />
                <ProFormSelect
                  request={async () => [
                    {
                      value: "nam",
                      label: "Nam",
                    },
                    {
                      value: "nu",
                      label: "Nữ",
                    },
                  ]}
                  width="md"
                  name="gender"
                  label="Giới tính"
                  placeholder="Chọn giới tính"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giới tính",
                    },
                  ]}
                />
              </ProForm.Group>
            </ModalForm>
          </ConfigProvider>
          <h1 className="font-bold text-2xl">Phòng đã thuê</h1>
          {userBookedPlaces === null ? (
            <div className="space-y-3">
              <LoadingUserPlaces />
              <div className="hidden lg:block">
                <LoadingUserPlaces />
              </div>
            </div>
          ) : userBookedPlaces.length === 0 ? (
            <p>Bạn chưa đặt phòng nào.</p>
          ) : (
            <div className="space-y-6">
              {userBookedPlaces.map((item, index) => (
                <RoomsLocate item={item} city={item.tinhThanh} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoUser;

const LoadingUserPlaces = () => (
  <div className="flex grid-cols-2 h-[210px] gap-3">
    <div className="basis-5/12">
      <Skeleton className="w-full h-full rounded-lg" />
    </div>
    <div className="basis-7/12 space-y-3">
      {Array.from({ length: 3 }).map((_, indexChild) => (
        <div key={indexChild}>
          <Skeleton height={30} className="w-full rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);
