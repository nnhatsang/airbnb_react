import React, { useState } from "react";
import PrivateRoute from "./PrivateRoute";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminTemplate = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <PrivateRoute>
      <Layout className="min-h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical pt-5" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            className="space-y-5"
            items={[
              {
                key: "/admin",
                icon: <UserOutlined />,
                label: <Link to={"/admin"}>Quản lý người dùng</Link>,
              },
              {
                key: "/admin/user_manage",
                icon: (
                  <FontAwesomeIcon icon="fa-solid fa-location-crosshairs" />
                ),
                label: <Link to={"/admin/user_manage"}>Quản lý phim</Link>,
              },

              {
                key: "/admin/room_manage",
                icon: <UploadOutlined />,
                label: <Link to={"/admin/room_manage"}>Quản lý Room</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="mb:overflow-scroll">
              <div className="mb:w-[75rem]">
                <Outlet />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>{" "}
    </PrivateRoute>
  );
};

export default AdminTemplate;
