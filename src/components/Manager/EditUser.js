import React, { Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Select,
  Avatar,
  Form,
  notification,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserById, getRoomDetail, getUser } from "../../appRedux/actions";
import { connect } from "react-redux";
import CircularProgress from "../Loading/index";
import firebase from "../../firebase/index";
import { NumberFormat } from "../../util/NumberFormat";

const { Option } = Select;
const FormItem = Form.Item;

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUserById(props.itemId);
    this.props.getRoomDetail(props.itemId);
    this.state = {
      edit: false,
      pay: false,
      loading: false,
      loadingChange: false,
      user: null,
    };
  }

  onChangeUser = () => {
    if (this.props.userList === null) {
      this.props.getUser();
    }
    this.setState({
      edit: true,
    });
  };

  onPayOpen = () => {
    this.setState({
      pay: true,
    });
  };

  handleCancel = () => {
    this.setState({
      edit: false,
      pay: false,
    });
  };

  handleSubmit = (values) => {
    let user = values.userId === "empty" ? "empty" : JSON.parse(values.userId);
    this.setState({
      loadingChange: true,
    });
    if (
      this.props.roomDetail.status === values.userId &&
      values.userId === "empty"
    ) {
      this.props.getData(false);
      this.setState({
        loadingChange: false,
        user: null,
      });
    } else if (values.userId !== "empty") {
      {
        this.props.roomDetail.status !== "empty" &&
          firebase
            .firestore()
            .collection("users")
            .where("rId", "==", this.props.itemId)
            .update({
              rId: "",
              rName: "",
              permission: "guest",
              deposit: 0,
            });
      }

      firebase
        .firestore()
        .collection("rooms")
        .doc(this.props.itemId)
        .update({
          userId: JSON.parse(values.userId),
          deposit: parseInt(values.deposit),
          motoElec: parseInt(values.motoElec) || 0,
          people: parseInt(values.people),
          status: "hired",
        });
      firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .update({
          rId: this.props.roomDetail.id,
          rName: this.props.roomDetail.name,
          permission: "renter",
          deposit: parseInt(values.deposit),
        })
        .then((res) => {
          notification.success({
            message: "Thay đổi người dùng thành công!",
          });
          this.props.getData(false);
          this.setState({
            loadingChange: false,
            user: null,
          });
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: "Thay đổi người dùng thất bại! Hãy thử lại sau",
          });
          this.setState({
            loadingChange: false,
            user: null,
          });
        });
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(this.props.userDetail.id)
        // .where("rId", "==", this.props.itemId)
        .update({
          rId: "",
          rName: "",
          permission: "guest",
          deposit: 0,
        });
      firebase
        .firestore()
        .collection("rooms")
        .doc(this.props.itemId)
        .update({
          userId: "empty",
          deposit: 0,
          motoElec: 0,
          people: 0,
          status: "empty",
        })
        .then((res) => {
          notification.success({
            message: "Thay đổi người dùng thành công!",
          });
          this.props.getData(false);
          this.setState({
            loadingChange: false,
            user: null,
          });
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: "Thay đổi người dùng thất bại! Hãy thử lại sau",
          });
          this.setState({
            loadingChange: false,
            user: null,
          });
        });
    }
  };
  selectUser = (e) => {
    this.setState({
      user: e,
    });
  };

  render() {
    const onPay = (value) => {
      let payElec =
        (parseInt(value.newElectrict) - this.props.roomDetail.electrict) * 4000;
      this.setState({
        loading: true,
      });
      firebase
        .firestore()
        .collection("rooms")
        .doc(this.props.itemId)
        .update({
          electrict: parseInt(value.newElectrict),
          deposit: 0,
          people: 0,
          status: "empty",
          userId: "empty",
          motoElec: 0,
        });
      firebase
        .firestore()
        .collection("users")
        .doc(this.props.userDetail.id)
        .update({
          rId: "",
          rName: "",
          permission: "guest",
          deposit: 0,
        });
      firebase
        .firestore()
        .collection("bills")
        .add({
          userId: this.props.userDetail.id,
          userName: this.props.userDetail.name,
          roomId: this.props.roomDetail.id,
          nameRoom: this.props.roomDetail.name,
          bill: {
            price: this.props.roomDetail.price,
            water: this.props.roomDetail.water * this.props.roomDetail.people,
            lastElectrict: this.props.roomDetail.electrict,
            newElectrict: parseInt(value.newElectrict),
            internet: this.props.roomDetail.internet,
            motoElec: this.props.roomDetail.motoElec,
            type: "end",
            total:
              this.props.roomDetail.deposit -
              (this.props.roomDetail.water * this.props.roomDetail.people +
                payElec +
                this.props.roomDetail.internet +
                this.props.roomDetail.motoElec * 100000),
          },
          createdAt: new Date().toISOString(),
        })
        .then((res) => {
          notification.success({
            message: "Thanh toán thành công!",
          });
          this.props.getData(false);
          setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 1000);
        });
    };

    return (
      <Fragment>
        {!this.props.loadRoomDetail &&
        !this.props.loadUserDetail &&
        this.props.itemId === this.props.roomDetail.id ? (
          <div>
            <div className="d-flex align-center">
              <Avatar
                shape="square"
                size={84}
                icon={<UserOutlined />}
                src={this.props.userDetail ? this.props.userDetail.avatar : ""}
              />
              <div className="p-l-3">
                <h3>{this.props.roomDetail.name}</h3>
                <h4>
                  Quận huyện :{" "}
                  {this.props.userDetail ? this.props.userDetail.district : ""}
                </h4>
                <h4>Số điện tháng trước : {this.props.roomDetail.electrict}</h4>
              </div>
            </div>
            <ul className="ul-style p-l-5">
              <li className="text-ellipsis-2">
                Địa chỉ:{" "}
                {this.props.userDetail ? this.props.userDetail.address : ""}
              </li>
              <li>
                Số điện thoại:{" "}
                {this.props.userDetail ? this.props.userDetail.phone : ""}
              </li>
              <li>
                Số tiền cọc: {NumberFormat(this.props.roomDetail.deposit)}
              </li>
            </ul>
            {this.state.edit ? (
              <Fragment>
                <hr className="m-v-3" />
                <Form onFinish={this.handleSubmit}>
                  <Row>
                    <Col
                      className="p-r-1"
                      xl={18}
                      lg={18}
                      md={12}
                      sm={12}
                      xs={24}
                    >
                      <span>Người dùng</span>
                      <FormItem
                        name="userId"
                        rules={[
                          {
                            required: true,
                            message: "Chọn người dùng",
                          },
                        ]}
                      >
                        <Select
                          onChange={this.selectUser}
                          placeholder="User"
                          style={{ width: "100%" }}
                        >
                          {this.props.loadUser === false &&
                            this.props.userList.map((item, index) => {
                              return (
                                <Option
                                  key={index}
                                  value={JSON.stringify(item)}
                                >
                                  {item.name}
                                </Option>
                              );
                            })}
                          <Option value="empty">Trống</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col xl={6} lg={6} md={12} sm={12} xs={24}>
                      <span>Xe điện</span>
                      <FormItem
                        name="motoElec"
                        rules={[
                          {
                            required: false,
                            message: "Nhập lượng xe điện",
                          },
                        ]}
                      >
                        <Input
                          type="number"
                          max={9}
                          placeholder="Moto Electrict"
                          disabled={
                            this.state.user && this.state.user !== "empty"
                              ? false
                              : true
                          }
                        />
                      </FormItem>
                    </Col>
                    {this.state.user && this.state.user !== "empty" ? (
                      <Fragment>
                        <Col
                          className="p-r-1"
                          xl={12}
                          lg={12}
                          md={24}
                          sm={24}
                          xs={24}
                        >
                          <span>Số tiền cọc</span>
                          <FormItem
                            name="deposit"
                            rules={[
                              {
                                required: true,
                                message: "Nhập số tiền đặt cọc",
                              },
                            ]}
                          >
                            <Input
                              type="number"
                              placeholder="Deposits"
                              className="w-90"
                            />
                          </FormItem>
                        </Col>
                        <Col
                          className="p-l-1"
                          xl={12}
                          lg={12}
                          md={24}
                          sm={24}
                          xs={24}
                        >
                          <span>Số người</span>
                          <FormItem
                            name="people"
                            rules={[
                              {
                                required: true,
                                message: "Chọn số người",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Total"
                              style={{ width: "100%" }}
                            >
                              <Option value={0}>
                                <UserOutlined /> 0
                              </Option>
                              <Option value={1}>
                                <UserOutlined /> 1
                              </Option>
                              <Option value={2}>
                                <UserOutlined /> 2
                              </Option>
                              <Option value={3}>
                                <UserOutlined /> 3
                              </Option>
                              <Option value={4}>
                                <UserOutlined /> 4
                              </Option>
                            </Select>
                          </FormItem>
                        </Col>
                      </Fragment>
                    ) : null}
                  </Row>
                  <div className="d-flex justify-flex-end">
                    <Button
                      onClick={this.handleCancel}
                      className="m-r-3"
                      htmlType="submit"
                    >
                      Hủy
                    </Button>
                    <Button
                      loading={this.state.loadingChange}
                      type="primary"
                      htmlType="submit"
                    >
                      Xác nhận
                    </Button>
                  </div>
                </Form>
              </Fragment>
            ) : this.state.pay ? (
              <Fragment>
                <hr className="m-v-3" />
                <Form onFinish={onPay}>
                  <FormItem
                    name="newElectrict"
                    rules={[
                      {
                        required: true,
                        message: "Nhập số điện!",
                      },
                    ]}
                    label="Số điện"
                  >
                    <Input placeholder="Electrict" />
                  </FormItem>
                  <FormItem>
                    <div className="d-flex justify-flex-end">
                      <Button onClick={this.handleCancel} className="m-r-3">
                        Hủy
                      </Button>
                      <Button htmlType="submit" type="primary">
                        Xác nhận
                      </Button>
                    </div>
                  </FormItem>
                </Form>
              </Fragment>
            ) : null}
            {!this.state.edit && !this.state.pay && (
              <div className="d-flex justify-flex-end">
                <Button
                  className="m-r-3"
                  onClick={this.onChangeUser}
                  type="danger"
                >
                  Thay đổi
                </Button>
                <Button
                  disabled={
                    this.props.roomDetail.status === "empty" ? true : false
                  }
                  onClick={this.onPayOpen}
                  type="primary"
                >
                  Thanh toán
                </Button>
              </div>
            )}
          </div>
        ) : (
          <CircularProgress />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ room }) => {
  return {
    userDetail: room.userDetail,
    loadUserDetail: room.loadUserDetail,
    roomDetail: room.roomDetail,
    loadRoomDetail: room.loadRoomDetail,
    userList: room.userList,
    loadUser: room.loadUser,
  };
};

export default connect(mapStateToProps, {
  getRoomDetail,
  getUserById,
  getUser,
})(Manager);
