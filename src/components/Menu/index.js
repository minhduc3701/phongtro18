import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Popover } from "antd";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import webLogo from "../../assets/motel18-ver2.png";

class Menu extends React.Component {
  render() {
    const userMenu = (
      <ul className="ul-style">
        <li className="p-v-1-i cursor-pointer">
          <Link className="text-grey">
            <UserOutlined className="p-r-1" />
            Hồ sơ cá nhân
          </Link>
        </li>
        <li className="p-v-1-i cursor-pointer">
          <Link style={{ color: "red" }}>
            <PoweroffOutlined className="p-r-1" />
            Đăng xuất
          </Link>
        </li>
      </ul>
    );

    return (
      <div
        style={{
          backgroundColor: "black",
          height: "8em",
          width: "100%",
          borderBottom: "3px solid #f2af58"
        }}
        className="d-flex align-center"
      >
        <header className="d-flex justify-between w-80 m-auto align-center">
          <div>
            <Link className="p-r-3" to="/">
              <img style={{ width: "5em" }} src={webLogo} alt="motel18" />
            </Link>
            <Link
              style={{ fontSize: "1.2em" }}
              className="text-white p-r-3 font-weight-bold gx-link"
            >
              Trang chủ
            </Link>
            <Link
              style={{ fontSize: "1.2em" }}
              className="text-white p-r-3 font-weight-bold gx-link"
            >
              Danh sách phòng
            </Link>
            <Link
              style={{ fontSize: "1.2em" }}
              className="text-white p-r-3 font-weight-bold gx-link"
            >
              Hình ảnh
            </Link>
            <Link
              style={{ fontSize: "1.2em" }}
              className="text-white p-r-3 font-weight-bold gx-link"
            >
              Quản lý
            </Link>
          </div>
          <Popover placement="bottomRight" content={userMenu} trigger="click">
            <Avatar
              className="cursor-pointer"
              size={50}
              icon={<UserOutlined />}
              alt="logo-user"
            />
          </Popover>
        </header>
      </div>
    );
  }
}

export default Menu;
