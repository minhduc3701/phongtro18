import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import webLogo from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";

class Menu extends React.Component {
  render() {
    return (
      <div>
        <div className="p-v-5">
          <h1 className="text-center font-weight-bold">
            Cho thuê phòng trọ khép kín
          </h1>
          <h3 className="text-center">
            Địa chỉ: Số 18 ngách 7 ngõ 260 Phố chợ Khâm Thiên, Đống Đa, Hà nội
          </h3>
          <h2 className="text-center">Liên hệ: 038 9870074 - 088 8272332</h2>
        </div>
        <div>
          <img
            style={{ maxHeight: "40em" }}
            className="w-100 h-100 object-fit-cover"
            src={webLogo}
            alt="phong-tro-18"
          />
        </div>
        <div className=" p-v-5">
          <Row>
            <Col className="p-3" xl={12} lg={12} md={24} sm={24} xs={24}>
              <img
                src={webLogo}
                alt="phong-tro-18"
                className="w-100 object-fit-cover"
              />
              <h2 className="text-center">
                <CheckCircleOutlined style={{ color: "#1daf1d" }} /> Phòng khép
                kín sạch sẽ
              </h2>
            </Col>
            <Col className="p-3" xl={12} lg={12} md={24} sm={24} xs={24}>
              <img
                src={webLogo}
                alt="phong-tro-18"
                className="w-100 object-fit-cover"
              />
              <h2 className="text-center">
                <CheckCircleOutlined style={{ color: "#1daf1d" }} /> Khu vực gần
                chợ thuận tiện sinh hoạt
              </h2>
            </Col>
            <Col className="p-3" xl={12} lg={12} md={24} sm={24} xs={24}>
              <img
                src={webLogo}
                alt="phong-tro-18"
                className="w-100 object-fit-cover"
              />
              <h2 className="text-center">
                <CheckCircleOutlined style={{ color: "#1daf1d" }} /> Có tủ quần
                áo, đệm, giường hộp... tùy theo từng phòng
              </h2>
            </Col>
            <Col className="p-3" xl={12} lg={12} md={24} sm={24} xs={24}>
              <img
                src={webLogo}
                alt="phong-tro-18"
                className="w-100 object-fit-cover"
              />
              <h2 className="text-center">
                <CheckCircleOutlined style={{ color: "#1daf1d" }} /> Đầy đủ điều
                hòa, nóng lạnh, Chỗ để xem miễn phí
              </h2>
            </Col>
          </Row>
          <Row className="p-t-5">
            <Col className="p-3" xl={8} lg={8} md={24} sm={24} xs={24}>
              <img
                src={webLogo}
                alt="phong-tro-18"
                className="w-100 object-fit-cover"
                style={{ maxHeight: "22em" }}
              />
              <h2 className="text-center font-weight-bold">
                <InfoCircleOutlined style={{ color: "#c10000" }} /> Phòng chỉ
                dành cho 1 - 2 người{" "}
                <InfoCircleOutlined style={{ color: "#c10000" }} />
              </h2>
            </Col>
            <Col className="p-3" xl={16} lg={16} md={24} sm={24} xs={24}>
              <img
                src={webLogo}
                alt="phong-tro-18"
                className="w-100 object-fit-cover"
                style={{ maxHeight: "22em" }}
              />
              <h2 className="text-center font-weight-bold">
                Khu vực trung tâm - Thuận tiện đi lại
              </h2>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Menu;
