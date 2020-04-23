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
  Checkbox,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserById, getRoomDetail, getUser } from "../../appRedux/actions";
import { connect } from "react-redux";
import CircularProgress from "../Loading/index";
import firebase from "../../firebase/index";

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

  render() {
    const onPay = (value) => {
      this.setState({
        loading: true,
      });
      firebase
        .firestore()
        .collection("rooms")
        .doc(this.props.itemId)
        .update({
          electric: parseInt(value.newElectric),
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
            water: this.props.roomDetail.water * this.props.roomDetail.people,
            lastElectric: this.props.roomDetail.electric,
            newElectric: parseInt(value.newElectric),
            internet: this.props.roomDetail.internet,
            motoElec: this.props.roomDetail.motoElec,
            type: "end",
            total:
              this.props.roomDetail.deposit -
              (this.props.roomDetail.water * this.props.roomDetail.people +
                (parseInt(value.newElectric) - this.props.roomDetail.electric) *
                  4 +
                this.props.roomDetail.internet +
                this.props.roomDetail.motoElec),
            createdAt: new Date().toISOString(),
          },
        })
        .then((res) => {
          notification.success({
            message: "Thanh toán thành công!",
          });
          this.props.getData(false);
          this.setState({
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
          });
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
                src={this.props.userDetail.address.avatar}
              />
              <div className="p-l-3">
                <h3>{this.props.roomDetail.name}</h3>
                <h4>Quận huyện : {this.props.userDetail.district}</h4>
                <h4>Số điện tháng trước : {this.props.roomDetail.electric}</h4>
              </div>
            </div>
            <ul className="ul-style p-l-5">
              <li className="text-ellipsis-2">
                Địa chỉ: {this.props.userDetail.address}
              </li>
              <li>Số điện thoại: {this.props.userDetail.phone}</li>
              <li>Số tiền cọc: {this.props.roomDetail.deposit}</li>
            </ul>
            {this.state.edit ? (
              <Fragment>
                <hr className="m-v-3" />
                <Form onFinish={this.handleSubmit}>
                  {/* <span>Người dùng</span>
                  <FormItem
                    name="userId"
                    rules={[
                      {
                        required: true,
                        message: "Chọn người dùng",
                      },
                    ]}
                  >
                    <Select placeholder="Người dùng" style={{ width: "100%" }}>
                      {this.props.loadUser === false &&
                        this.props.userList.map((item, index) => {
                          return (
                            <Option key={index} value={JSON.stringify(item)}>
                              {item.name}
                            </Option>
                          );
                        })}
                      <Option value="empty">Trống</Option>
                    </Select>
                  </FormItem> */}
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
                          placeholder="Người dùng"
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
                      <FormItem name="motoElec">
                        <Checkbox />
                      </FormItem>
                    </Col>
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
                        <Select placeholder="Total" style={{ width: "100%" }}>
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
                  </Row>
                  <div className="d-flex justify-flex-end">
                    <Button
                      onClick={this.handleCancel}
                      className="m-r-3"
                      htmlType="submit"
                    >
                      Hủy
                    </Button>
                    <Button type="primary" htmlType="submit">
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
                    name="newElectric"
                    rules={[
                      {
                        required: true,
                        message: "Nhập số điện!",
                      },
                    ]}
                    label="Số điện"
                  >
                    <Input placeholder="Electric" />
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
                <Button onClick={this.onPayOpen} type="primary">
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
