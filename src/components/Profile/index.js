import React, { Fragment } from "react";
import {
  Row,
  Col,
  Avatar,
  Badge,
  Input,
  Select,
  Button,
  Table,
  Modal,
  Form,
} from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import webLogo from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";
import { connect } from "react-redux";
import Loading from "../Loading";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { NumberFormat } from "../../util/NumberFormat";

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: { xs: 24, sm: 5 },
  wrapperCol: { xs: 24, sm: 19 },
};

class Menu extends React.Component {
  state = {
    visible: false,
    preview: null,
    edit: false,
  };

  onPreview = (image) => {
    this.setState({
      visible: true,
      preview: image,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  onEdit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState({
      edit: true,
    });
  };

  render() {
    let userDetail = null;
    let billsList = [];

    isLoaded(this.props.userDetail) &&
      this.props.userDetail.forEach((doc) => {
        userDetail = {
          id: doc.id,
          name: doc.name,
          address: doc.address,
          avatar: doc.avatar,
          birth: doc.birth,
          gender: doc.gender,
          image: doc.image,
          permission: doc.permission,
          phone: doc.phone,
          rId: doc.rId,
          rName: doc.rName,
          deposit: doc.deposit,
          idCard: doc.idCard,
        };
      });

    isLoaded(this.props.billsList) &&
      this.props.billsList.forEach((doc) => {
        billsList.push({
          id: doc.id,
          internet: doc.bill.internet,
          lastElectrict: doc.bill.lastElectrict,
          newElectrict: doc.bill.newElectrict,
          motoElec: doc.bill.motoElec,
          water: doc.bill.water,
          total: doc.bill.total,
          price: doc.bill.price,
          createdAt: doc.createdAt,
        });
      });

    const columns = [
      {
        title: "Mã",
        dataIndex: "code",
        key: "code",
        render: (key, billsList) => {
          return (
            <div>
              <div>
                <Badge
                  className="m-b-0-i"
                  count={billsList.id}
                  style={{ backgroundColor: "#008080", minWidth: 62 }}
                />
                <span className="text-grey d-block">
                  {new Date(billsList.createdAt).toDateString()}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        title: "Tiền phòng",
        dataIndex: "price",
        key: "price",
        render: (key, billsList) => (
          <span>{NumberFormat(billsList.price)}</span>
        ),
      },
      {
        title: "Tiền nước",
        dataIndex: "water",
        key: "water",
        render: (key, billsList) => (
          <span>{NumberFormat(billsList.water)}</span>
        ),
      },
      {
        title: "Tiền mạng",
        dataIndex: "internet",
        key: "internet",
        render: (key, billsList) => (
          <span>{NumberFormat(billsList.internet)}</span>
        ),
      },
      {
        title: "Tiền xe điện",
        dataIndex: "motoElec",
        key: "motoElec",
        render: (key, billsList) => (
          <span>{NumberFormat(billsList.motoElec)}</span>
        ),
      },
      {
        title: "Tiền điện",
        dataIndex: "Electrict",
        key: "Electrict",
        render: (key, billsList) => (
          <span>
            {NumberFormat(
              (billsList.newElectrict - billsList.lastElectrict) * 4000
            )}
          </span>
        ),
      },
      {
        title: "Tổng",
        dataIndex: "total",
        key: "total",
        render: (key, billsList) => (
          <span>{NumberFormat(billsList.total)}</span>
        ),
      },
    ];

    return (
      <Fragment>
        {!isLoaded(this.props.userDetail) ? (
          <Loading />
        ) : (
          <div className="block-no-bor">
            <div className="d-flex align-center">
              <Avatar
                size={84}
                icon={<UserOutlined />}
                src={userDetail.avatar}
              />
              {!this.state.edit ? (
                <div className="p-l-5">
                  <h2>{userDetail.name}</h2>
                  <h4 className="w-150">Địa chỉ: {userDetail.address}</h4>
                </div>
              ) : (
                <div className="p-l-5 w-100">
                  <h2>{userDetail.rName}</h2>
                  <div className="d-flex ">
                    <span
                      className="d-flex align-center"
                      style={{ width: 150 }}
                    >
                      {" "}
                      Địa chỉ:
                    </span>{" "}
                    <Input className="w-100" placeholder="Address" />
                  </div>
                </div>
              )}
            </div>
            <hr />
            <Row>
              <Col
                style={{ borderRight: "1px solid #ccc" }}
                xl={12}
                lg={12}
                md={24}
                sm={24}
                xs={24}
              >
                {this.state.edit ? (
                  <Form>
                    <FormItem {...formItemLayout} label="Phòng:">
                      {" "}
                      {userDetail.rName}{" "}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Chứng minh thư:">
                      <Input style={{ width: 300 }} placeholder="Id card" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Số điện thoại:">
                      <Input
                        style={{ width: 300 }}
                        maxLength={20}
                        placeholder="Phone"
                      />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Giới tính:">
                      <Select placeholder="Gender" style={{ width: 300 }}>
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="other">Khác</Option>
                      </Select>
                    </FormItem>
                    <FormItem {...formItemLayout} label="Tiền cọc:">
                      {NumberFormat(userDetail.deposit)}
                    </FormItem>
                  </Form>
                ) : (
                  <Fragment>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                        <h4 className="float-r">Phòng:</h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={19}
                        lg={19}
                        md={19}
                        sm={19}
                        xs={24}
                      >
                        <h4>{userDetail.rName}</h4>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                        <h4 className="float-r">Chứng minh thư:</h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={19}
                        lg={19}
                        md={19}
                        sm={19}
                        xs={24}
                      >
                        <h4>{userDetail.idCard}</h4>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                        <h4 className="float-r">Số điện thoại:</h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={19}
                        lg={19}
                        md={19}
                        sm={19}
                        xs={24}
                      >
                        <h4>{userDetail.phone}</h4>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                        <h4 className="float-r">Giới tính:</h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={19}
                        lg={19}
                        md={19}
                        sm={19}
                        xs={24}
                      >
                        <h4>{userDetail.gender}</h4>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                        <h4 className="float-r">Tiền cọc:</h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={19}
                        lg={19}
                        md={19}
                        sm={19}
                        xs={24}
                      >
                        <h4>{NumberFormat(userDetail.deposit)}</h4>
                      </Col>
                    </Row>
                  </Fragment>
                )}
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Row>
                  {userDetail.image.map((item, index) => {
                    return (
                      <Col
                        key={index}
                        className="p-h-1"
                        xl={8}
                        lg={12}
                        md={12}
                        sm={24}
                        xs={24}
                      >
                        <img
                          onClick={() => this.onPreview(item.url)}
                          className="w-100 h-100 object-fit-cover"
                          src={item.url}
                          alt={item.name}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <hr />
            <h3>Hóa đơn: </h3>
            {!isLoaded(this.props.billsList) &&
            !isLoaded(this.props.userDetail) ? (
              <Loading />
            ) : (
              <Table
                dataSource={billsList}
                columns={columns}
                bordered={true}
                rowKey={(billsList) => billsList.id}
              />
            )}
            <div className="d-flex w-100">
              <Button onClick={this.onEdit} className="m-l-auto" type="primary">
                {this.state.edit ? "Lưu" : "Chỉnh sửa"}
              </Button>
            </div>
            <Modal
              onCancel={this.handleCancel}
              visible={this.state.visible}
              footer={null}
            >
              <img
                style={{ width: "100%" }}
                src={this.state.preview}
                alt="preview-image"
              />
            </Modal>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    userDetail: firestore.ordered.userDetail,
    billsList: firestore.ordered.billsList,
  };
};

export default compose(
  firestoreConnect((props) => {
    let uid = localStorage.getItem("uid");
    return [
      {
        collection: "users",
        doc: uid,
        storeAs: "userDetail",
      },
      {
        collection: "bills",
        where: ["userId", "==", uid],
        storeAs: "billsList",
      },
    ];
  }),
  connect(mapStateToProps, null)
)(Menu);
