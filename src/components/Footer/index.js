import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import webLogo from "../../assets/motel18-ver2-min.png";

class Menu extends React.Component {
  render() {
    return (
      <footer
        // style={{
        //   width: "100%",
        //   height: "8em",
        // }}
        className="d-flex align-center footer"
      >
        <Row className="w-80 m-auto">
          <Col className="block-center" xl={8} lg={8} md={12} sm={12} xs={12}>
            <Link to="/">
              <img
                src={webLogo}
                style={{ maxHeight: "8em" }}
                className="logo-foter"
                alt="phong-tro-18"
              />
            </Link>
          </Col>
          <Col className="block-center" xl={16} lg={16} md={12} sm={12} xs={12}>
            <ul className="ul-style ">
              <li className="p-b-3 ">
                <h3 className="font-weight-bold text-white">
                  Địa chỉ: Số 18 ngách 7 ngõ 260 Phố chợ Khâm Thiên, Đống Đa, Hà
                  nội
                </h3>
              </li>
              <li className="p-b-3 ">
                <h3 className="font-weight-bold text-white">
                  Liên hệ: 038 9870074 - 088 8272332
                </h3>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Menu;
