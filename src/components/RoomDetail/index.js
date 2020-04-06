import React, { Fragment } from "react";
import { Row, Col } from "antd";
import webLogo from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";

class Menu extends React.Component {
  render() {
    return (
      <Fragment>
        <div>
          <img
            style={{ maxHeight: "40em" }}
            className="w-100 p-b-5 h-100 object-fit-cover"
            src={webLogo}
            alt="phong-tro-18"
          />
          <div className="d-flex justify-between align-center">
            <div>
              <h2 className="font-weight-bold">Tên phòng</h2>
              <h4>Diện tích:</h4>
              <h4>
                Địa chỉ: Số 18 ngách 7 ngõ 260 Phố chợ Khâm thiên, Đống Đa, Hà
                Nội
              </h4>
            </div>
            <h1 className="color-danger">Hết phòng</h1>
          </div>
          <hr />
        </div>
      </Fragment>
    );
  }
}

export default Menu;
