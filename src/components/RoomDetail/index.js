import React, { Fragment } from "react";
import { Row, Col, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getRoomDetail } from "../../appRedux/actions";
import { connect } from "react-redux";
import Loading from "../Loading";
import { NumberFormat } from "../../util/NumberFormat";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.props.getRoomDetail(props.match.params.id);
    this.state = {
      previewImage: null,
      previewVisible: false,
    };
  }

  onPreview = (photo) => {
    this.setState({
      previewImage: photo,
      previewVisible: true,
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  textItem = (value) => {
    switch (value) {
      case "cushion":
        return "Đệm";

      case "wardrobe":
        return "Tủ quần áo";

      case "table":
        return "Bàn";

      case "shelve":
        return "Kệ";

      case "airCondition":
        return "Điều hòa";

      default:
        return "Bình nóng lạnh";
    }
  };

  render() {
    let { roomDetail } = this.props;
    return (
      <Fragment>
        {!this.props.loadRoomDetail ? (
          <div className="p-b-5">
            <img
              style={{ maxHeight: "40em" }}
              className="w-100 p-b-5 h-100 object-fit-cover"
              src={roomDetail.image[0].url}
              alt={roomDetail.name}
            />
            <div className="d-flex justify-between align-center">
              <div>
                <h2 className="font-weight-bold">{roomDetail.name}</h2>
                <h4>Diện tích: {roomDetail.acreage}</h4>
                <h4>
                  Địa chỉ: Số 18 ngách 7 ngõ 260 Phố chợ Khâm thiên, Đống Đa, Hà
                  Nội
                </h4>
              </div>
              <h1
                className={
                  roomDetail.status === "empty"
                    ? "color-success"
                    : "color-danger"
                }
              >
                {roomDetail.status === "empty" ? "Phòng trống" : "Hết phòng"}
              </h1>
            </div>
            <hr />
            <h2 className="font-weight-bold">Mô tả</h2>
            <h4>{roomDetail.detail}</h4>
            <h2 className="font-weight-bold m-t-3">Vật dụng</h2>
            <Row>
              {roomDetail.item.map((item, index) => {
                return (
                  <Col key={index} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <h4>
                      <CheckCircleOutlined /> {this.textItem(item)}
                    </h4>
                  </Col>
                );
              })}
            </Row>
            <h2 className="font-weight-bold m-t-3">Giá</h2>
            <ul>
              <li>
                <h4>
                  Giá phòng: {NumberFormat(roomDetail.price)}
                  /tháng
                </h4>
              </li>
              <li>
                <h4>Giá nước: {NumberFormat(roomDetail.water)}/người</h4>
              </li>
              <li>
                <h4>
                  Giá điện: 4.000{" "}
                  <span style={{ textDecoration: "underline" }}>đ</span>/số
                </h4>
              </li>
              <li>
                <h4>Giá internet: {NumberFormat(roomDetail.internet)}/phòng</h4>
              </li>
              <li>
                <h4>
                  Giá xe điện: 100.000{" "}
                  <span style={{ textDecoration: "underline" }}>đ</span>/xe
                </h4>
              </li>
            </ul>

            <hr />
            <Row>
              {roomDetail.image.map((item, index) => {
                return (
                  <Col
                    key={index}
                    className="p-1"
                    xl={6}
                    lg={6}
                    md={16}
                    sm={24}
                    xs={24}
                  >
                    <img
                      onClick={() => this.onPreview(item.url)}
                      className="w-100 object-fit-cover cursor-pointer"
                      style={{ height: "20em" }}
                      src={item.url}
                      alt={item.name}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        ) : (
          <Loading />
        )}
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            src={this.state.previewImage}
            alt="preview"
            style={{ width: "100%" }}
          />
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ room }) => {
  return {
    roomDetail: room.roomDetail,
    loadRoomDetail: room.loadRoomDetail,
  };
};

export default connect(mapStateToProps, { getRoomDetail })(Menu);
