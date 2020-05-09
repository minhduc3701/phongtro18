import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Popover, Dropdown, Menu, Row, Col } from "antd";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import webLogo from "../../assets/motel18-ver2.png";
import firebase from "../../firebase";

class MenuHeader extends React.Component {
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          let eqPos = cookie.indexOf("=");
          let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        localStorage.clear();
        this.props.data.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    const userMenu = (
      <ul className="ul-style">
        <li className="p-v-1-i cursor-pointer">
          <Link to="/profile" className="text-grey-i">
            <UserOutlined className="p-r-1" />
            Hồ sơ cá nhân
          </Link>
        </li>
        <li
          onClick={this.signOut}
          className="p-v-1-i cursor-pointer color-danger"
        >
          <PoweroffOutlined className="p-r-1" />
          Đăng xuất
        </li>
      </ul>
    );

    const subMenu = (
      <Menu className="sub-menu-hover">
        <Menu.Item key="0" className="sub-menu-hover">
          <Link
            to="/home"
            style={{ fontSize: "1.2em" }}
            className="text-grey menu-hover text-upper h-100 p-h-3 font-weight-bold gx-link"
          >
            Trang chủ
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link
            to="/room-list"
            style={{ fontSize: "1.2em" }}
            className="text-grey menu-hover text-upper h-100 p-h-3 font-weight-bold gx-link"
          >
            Danh sách phòng
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link
            to="/image-list"
            style={{ fontSize: "1.2em" }}
            className="text-grey menu-hover text-upper h-100 p-h-3 font-weight-bold gx-link"
          >
            Hình ảnh
          </Link>
        </Menu.Item>
        {userInfo.permission === "admin" && (
          <Menu.Item key="4">
            <Link
              to="/management"
              style={{ fontSize: "1.2em" }}
              className="text-grey menu-hover text-upper h-100 p-h-3 font-weight-bold gx-link"
            >
              Quản lý
            </Link>
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <div
        style={{
          width: "100%",
          borderBottom: "3px solid #f2af58",
          height: "6em",
          backgroundColor: "#2C3E50",
        }}
        className="d-flex align-center"
      >
        <header className="d-flex justify-between w-80 m-auto align-center">
          <Row className="w-100">
            <Col xl={20} lg={20} md={20} sm={20} xs={20}>
              <div className="d-flex align-center">
                <Dropdown overlay={subMenu} trigger={["click"]}>
                  <div className="sub-menu m-r-3 cursor-pointer">
                    <div
                      style={{
                        background: "black",
                        width: 13,
                        height: 2,
                        marginBottom: 2,
                      }}
                    ></div>
                    <div
                      style={{
                        background: "black",
                        width: 13,
                        height: 2,
                        marginBottom: 2,
                      }}
                    ></div>
                    <div
                      style={{
                        background: "black",
                        width: 13,
                        height: 2,
                        marginBottom: 2,
                      }}
                    ></div>
                  </div>
                </Dropdown>
                <Link
                  to="/home"
                  className="d-flex align-center"
                  style={{ paddingRight: "5em" }}
                >
                  <img
                    style={{ width: "5em", paddingRight: "1em" }}
                    src={webLogo}
                    alt="motel18"
                  />
                  <h2
                    className="font-weight-bold text-upper m-0"
                    style={{ color: "#f2af58" }}
                  >
                    Phòng trọ 18
                  </h2>
                </Link>
                <div className="menu-items">
                  <Link
                    to="/home"
                    style={{ fontSize: "1.2em", color: "#fff" }}
                    className="text-upper h-100 p-h-3 font-weight-bold gx-link"
                  >
                    Trang chủ
                  </Link>
                  <Link
                    to="/room-list"
                    style={{ fontSize: "1.2em", color: "#fff" }}
                    className="text-upper h-100 p-h-3 font-weight-bold gx-link"
                  >
                    Danh sách phòng
                  </Link>
                  <Link
                    to="/image-list"
                    style={{ fontSize: "1.2em", color: "#fff" }}
                    className="text-upper h-100 p-h-3 font-weight-bold gx-link"
                  >
                    Hình ảnh
                  </Link>
                  {userInfo.permission === "admin" && (
                    <Link
                      to="/management"
                      style={{ fontSize: "1.2em", color: "#fff" }}
                      className="text-upper h-100 p-h-3 font-weight-bold gx-link"
                    >
                      Quản lý
                    </Link>
                  )}
                </div>
              </div>
            </Col>
            <Col
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={4}
              className="d-flex-i justify-flex-end"
            >
              <Popover
                placement="bottomRight"
                content={userMenu}
                trigger="click"
              >
                <Avatar
                  className="cursor-pointer"
                  size={50}
                  icon={<UserOutlined />}
                  alt="logo-user"
                  src={userInfo.avatar}
                />
              </Popover>
            </Col>
          </Row>
        </header>
      </div>
    );
  }
}

export default MenuHeader;
