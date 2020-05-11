import React from "react";
import { Row, Col } from "antd";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import image1 from "../../assets/2-people-with-posters-vector-min.jpg";
import image2 from "../../assets/20190502_093905_4352542_0-min.jpg";
import image3 from "../../assets/a5884193881166612c87006037b801db-min.jpg";
import image4 from "../../assets/map-min.jpg";
import image5 from "../../assets/60023608_2407862295939930_1750004065640644608_o-min.jpg";
import image6 from "../../assets/23755198_1697584746967692_8729631740302018788_n-min.jpg";
import imageHead from "../../assets/83049376_2895136440545844_6377501413462769664_o-min.jpg";

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
          <h2 className="text-center">Liên hệ: 0888 272332</h2>
          <h3 className="text-center">Email: minh.duc.3701@gmail.com</h3>
        </div>
        <div>
          <img
            style={{ maxHeight: "40em" }}
            className="w-100 h-100 object-fit-cover"
            src={imageHead}
            alt="phong-tro-18"
          />
        </div>
        <div className=" p-v-5">
          <Row>
            <Col className="p-3" xl={12} lg={12} md={24} sm={24} xs={24}>
              <img
                src={image6}
                alt="phong-tro-18"
                style={{ height: "100%", maxHeight: "22em" }}
                className="w-100 object-fit-cover"
              />
              <h2 className="text-center">
                <CheckCircleOutlined style={{ color: "#1daf1d" }} /> Phòng khép
                kín sạch sẽ
              </h2>
            </Col>
            <Col className="p-3" xl={12} lg={12} md={24} sm={24} xs={24}>
              <img
                src={image2}
                alt="phong-tro-18"
                style={{ height: "100%", maxHeight: "22em" }}
                className="w-100 object-fit-cover"
              />
              <h2 className="text-center">
                <CheckCircleOutlined style={{ color: "#1daf1d" }} /> Khu vực gần
                chợ thuận tiện sinh hoạt
              </h2>
            </Col>
            <Col className="p-3" xl={12} lg={12} md={24} sm={24} xs={24}>
              <img
                src={image5}
                alt="phong-tro-18"
                style={{ height: "100%", maxHeight: "22em" }}
                className="w-100 object-fit-cover"
              />
              <h2 className="text-center">
                <CheckCircleOutlined style={{ color: "#1daf1d" }} /> Có tủ quần
                áo, đệm, giường hộp... tùy theo từng phòng
              </h2>
            </Col>
            <Col className="p-3" xl={12} lg={12} md={24} sm={24} xs={24}>
              <img
                src={image3}
                alt="phong-tro-18"
                style={{ height: "100%", maxHeight: "22em" }}
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
                src={image1}
                alt="phong-tro-18"
                className="w-100 object-fit-cover"
                style={{ height: "100%", maxHeight: "22em" }}
              />
              <h2 className="text-center font-weight-bold">
                <InfoCircleOutlined style={{ color: "#c10000" }} /> Phòng chỉ
                dành cho 1 - 2 người{" "}
                <InfoCircleOutlined style={{ color: "#c10000" }} />
              </h2>
            </Col>
            <Col className="p-3" xl={16} lg={16} md={24} sm={24} xs={24}>
              <img
                src={image4}
                alt="phong-tro-18"
                className="w-100 object-fit-cover"
                style={{ height: "100%", maxHeight: "22em" }}
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
