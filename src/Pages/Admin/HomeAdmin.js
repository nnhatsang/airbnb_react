import React, { useEffect, useState } from "react";
import { Admin } from "../../Services/Admin";
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Radio,
  Select,
  Table,
  message,
} from "antd";
import moment from "moment";
import UserActionButton from "../../Components/Admin/Edit/UserActionButton";
import { useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/SpinnerSlice";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRow, setTotalRow] = useState();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  // Bỏ thêm tham số, sử dụng useEffect để quản lý loading

 const [isFirstLoad, setIsFirstLoad] = useState(true); // Thêm trạng thái để theo dõi lần tải trang đầu tiên

 const getCurrentSearchKeyword = () => searchKeyword;

 const handleSearchInputChange = (e) => {
   const keyword = e.target.value;
   setSearchKeyword(keyword);
 };

 const renderUserPage = (index = 1, searchKeyword) => {
   if (isFirstLoad) {
     dispatch(setLoadingOn()); // Chỉ set loading khi đây là lần tải trang đầu tiên
   }

   Admin.getUsersPage(index, searchKeyword || getCurrentSearchKeyword())
     .then((res) => {
       setListUser(res.data.content.data);
       setTotalRow(res.data.content.totalRow);
       setTotalPages(
         Math.ceil(res.data.content.totalRow / res.data.content.pageSize)
       );
     })
     .catch((err) => {
       console.log(err);
     })
     .finally(() => {
       if (isFirstLoad) {
         dispatch(setLoadingOff());
         setIsFirstLoad(false); // Cập nhật trạng thái sau khi đã tải xong lần đầu
       }
     });
 };

 useEffect(() => {
   renderUserPage(1, searchKeyword);
   // Lần đầu tiên useEffect được gọi, isFirstLoad sẽ đảm bảo setLoading được gọi
 }, [searchKeyword]);

 const handlePageChange = (page) => {
   setCurrentPage(page);
   renderUserPage(page, searchKeyword);
   // Không cần cập nhật trạng thái isLoading ở đây
 };

  const columns = [
    {
      title: "Nã ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id, // Sắp xếp theo ID
    },
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={
              record.avatar !== ""
                ? record.avatar
                : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            }
            alt={text}
            className="w-10 h-10 rounded-full mr-2"
          />

          <p className="font-bold uppercase">{text}</p>
        </div>
      ),
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text, record) => {
        return moment(text, ["DD/MM/YYYY", "YYYY-MM-DD"]).isValid() ? (
          <p>
            {moment(text, ["DD/MM/YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY")}
          </p>
        ) : (
          <p>Invalid Date</p>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <p className="underline">{text}</p>,
    },
    {
      title: "Người dùng",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <p
          className="font-bold "
          style={{
            color: text === "USER" ? "green" : "red",
          }}
        >
          {text}
        </p>
      ),
      filters: [
        { text: "ADMIN", value: "ADMIN" },
        { text: "USER", value: "USER" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="space-x-3">
          <UserActionButton
            userID={record.id}
            renderUserPage={renderUserPage}
          />
        </div>
      ),
    },
  ];
  const onFinish = (values) => {
    const processValues = {
      ...values,
      gender: values.gender === "male" ? true : false,
    };

    Admin.createNewUser(processValues)
      .then((result) => {
        message.success(
          `Người dùng ${result.data.content.name} đã được thêm thành công.`
        );
        setShowModalCreate(false);
        // load lai du lieu moi
        Admin.getUsersPage(1)
          .then((res) => {
            renderUserPage(1);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };
  return (
    <>
      <div className="flex justify-between items-center mx-auto w-10/12 py-4 gap-10">
        <h2 className="font-bold text-2xl  mb-5">Quản lý User</h2>

        <button
          className=" px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2"
          onClick={() => setShowModalCreate(true)}
        >
          + Thêm người dùng
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
        dataSource={listUser}
        columns={columns}
        pagination={false}
        onChange={(pagination, filters, sorter) => {
          // Gọi hàm để tải lại dữ liệu với tham số sắp xếp từ sorter
          // Ví dụ: fetchSortedData(sorter.field, sorter.order)
        }}
      />
      <div className="mb-5"></div>
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
      <div className="py-3 pb-10"></div>
      <Modal
        open={showModalCreate}
        onCancel={() => {
          setShowModalCreate(false);
        }}
        footer={null}
        centered
        closable={false}
      >
        <div className="mt-4 mb-6">
          <p className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Thêm người dùng
          </p>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <Form.Item
                name="name"
                label="Tên người dùng"
                tooltip="Họ tên của bạn"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng ghi họ tên!",
                    whitespace: true,
                  },
                  {
                    pattern: new RegExp(/^[\p{L}\s'-]+$/u),
                    message: "Họ tên nhập chưa đúng!",
                  },
                ]}
              >
                <Input placeholder="Điền tên vào đây..." />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
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
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    pattern: new RegExp(/^0(?!0)\d{9}$/g),
                    message: "Không đúng định dạng số điện thoại!",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input placeholder="0903 123 123" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải có tối thiểu 6 kí tự!",
                  },
                ]}
              >
                <Input.Password placeholder="********" />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Giới tính"
                a
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
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày sinh!",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="Chọn ngày sinh"
                  format="DD/MM/YYYY"
                />
              </Form.Item>
              <Form.Item
                name="role"
                label="Chức vụ"
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
              {" "}
              <button
                onClick={() => setShowModalCreate(false)}
                className="w-full px-5 py-3 transition-colors duration-150 bg-white text-black border border-black-200 rounded-lg sm:w-auto sm:px-4 sm:py-2"
              >
                Huỷ
              </button>
              <button className="w-full px-5 py-3 text-white transition-colors duration-150 bg-main border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 ">
                Thêm người dùng
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default HomeAdmin;
