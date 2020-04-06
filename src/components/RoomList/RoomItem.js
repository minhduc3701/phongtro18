import React from "react";
import { Button } from "antd";
import webLogo from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";

class Menu extends React.Component {
  render() {
    return (
      <div className="block d-flex-i align-center">
        <img
          style={{ width: "15em" }}
          className="bor-rad-10"
          src={webLogo}
          alt="room"
        />
        <div className="p-l-3">
          <h2>Tên phòng</h2>
          <h4>Mô tả</h4>
          <h4>
            Tình trạng: <span className="color-danger"> Đã thuê </span>
          </h4>
        </div>
        <Button type="primary" size="large" className="m-l-auto">
          Chi tiết
        </Button>
      </div>
    );
  }
}

export default Menu;
