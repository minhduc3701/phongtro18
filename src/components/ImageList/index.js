import React, { Fragment } from "react";
import { Row, Col, Modal } from "antd";
import webLogo from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";

class ImageList extends React.Component {
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
        <h2 className="p-v-4 text-center font-weight-bold text-upper">
          Danh sách hình ảnh
        </h2>
        <div
          className="p-v-4 m-v-5"
          style={{ border: "1px solide black", borderStyle: "double" }}
        >
          <Row>
            <Col className="p-2" xl={6} lg={6} md={12} sm={24} lg={24}>
              <img
                className="w-100 object-fit-cover"
                src={webLogo}
                alt="image"
              />
            </Col>
            <Col className="p-2" xl={6} lg={6} md={12} sm={24} lg={24}>
              <img
                className="w-100 object-fit-cover"
                src={webLogo}
                alt="image"
              />
            </Col>
            <Col className="p-2" xl={6} lg={6} md={12} sm={24} lg={24}>
              <img
                className="w-100 object-fit-cover"
                src={webLogo}
                alt="image"
              />
            </Col>
            <Col className="p-2" xl={6} lg={6} md={12} sm={24} lg={24}>
              <img
                className="w-100 object-fit-cover"
                src={webLogo}
                alt="image"
              />
            </Col>
            <Col className="p-2" xl={6} lg={6} md={12} sm={24} lg={24}>
              <img
                className="w-100 object-fit-cover"
                src={webLogo}
                alt="image"
              />
            </Col>
          </Row>
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
        </div>
      </Fragment>
    );
  }
}

export default ImageList;
