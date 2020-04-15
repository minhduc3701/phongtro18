import React, { Fragment } from "react";
import { Row, Col, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import webLogo from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";

class Menu extends React.Component {
  state = {
    previewImage: null,
    previewVisible: false,
  };

  onPreview = (photo) => {
    this.setState({
      previewImage: photo,
      previewVisible: true,
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    return (
      <Fragment>
        <div className="p-b-5">
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
          <h2 className="font-weight-bold">Mô tả</h2>
          <h4>Chi tiết</h4>
          <h2 className="font-weight-bold">Vật dụng</h2>
          <Row>
            <Col xl={12} lg={12} md={12} sm={24} lg={24}>
              <h4>
                <CheckCircleOutlined /> Giường
              </h4>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} lg={24}>
              <h4>
                <CheckCircleOutlined /> Giường
              </h4>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} lg={24}>
              <h4>
                <CheckCircleOutlined /> Giường
              </h4>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} lg={24}>
              <h4>
                <CheckCircleOutlined /> Giường
              </h4>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} lg={24}>
              <h4>
                <CheckCircleOutlined /> Giường
              </h4>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} lg={24}>
              <h4>
                <CheckCircleOutlined /> Giường
              </h4>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className="p-1" xl={6} lg={6} md={16} sm={24} lg={24}>
              <img
                className="w-100 object-fit-cover"
                src={webLogo}
                alt="room-image"
              />
            </Col>
            <Col className="p-1" xl={6} lg={6} md={16} sm={24} lg={24}>
              <img
                className="w-100 object-fit-cover"
                src={webLogo}
                alt="room-image"
              />
            </Col>
            <Col className="p-1" xl={6} lg={6} md={16} sm={24} lg={24}>
              <img
                className="w-100 object-fit-cover"
                src={webLogo}
                alt="room-image"
              />
            </Col>
            <Col className="p-1" xl={6} lg={6} md={16} sm={24} lg={24}>
              <img
                className="w-100 object-fit-cover"
                src={webLogo}
                alt="room-image"
              />
            </Col>
          </Row>
        </div>
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          style={{ marginTop: -90 }}
        >
          <img
            src={this.state.previewImage}
            alt="image-preview"
            style={{ width: "100%" }}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default Menu;
