import React from "react";
import { Button } from "antd";
import webLogo from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <div className="block d-flex-i align-center">
        <img
          style={{ width: "15em" }}
          className="bor-rad-10"
          src={data.image[0].url}
          alt={data.image[0].name}
        />
        <div className="p-l-3 w-100">
          <h2>{data.name}</h2>
          <h4 className="text-ellipsis-2">{data.detail}</h4>
          <h4>
            Tình trạng:{" "}
            <span
              className={
                data.status === "empty" ? "color-success" : "color-danger"
              }
            >
              {data.status === "empty" ? "Trống" : "Đã thuê"}
            </span>
          </h4>
          <Link className="float-r" to={`/room/${data.id}`}>
            <Button type="primary">Chi tiết</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Menu;
