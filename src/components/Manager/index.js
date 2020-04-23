import React, { Fragment } from "react";
import { Row, Col, Modal, Button, Table, Badge, Popover } from "antd";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  ProfileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Bill from "./Bill";
import CreateRoom from "./CreateRoom";
import EditRoom from "./EditRoom";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import { connect } from "react-redux";
import CircularProgress from "../Loading/index";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

class Manager extends React.Component {
  state = {
    previewImage: null,
    previewVisible: false,
    visibleCreate: false,
    visibleBill: false,
    visibleEdit: false,
    visibleUser: false,
    visibleEditUser: false,
    itemId: null,
  };

  onOpenBill = () => {
    this.setState({
      visibleBill: true,
    });
  };
  onOpenCreate = () => {
    this.setState({
      visibleCreate: true,
    });
  };
  onOpenEdit = () => {
    this.setState({
      visibleEdit: true,
    });
  };
  onEditItem = (id) => {
    this.setState({
      itemId: id,
    });
  };
  onOpenUser = () => {
    this.setState({
      visibleUser: true,
    });
  };
  onOpenEditUser = () => {
    this.setState({
      visibleEditUser: true,
    });
  };

  onPreview = (photo) => {
    this.setState({
      previewImage: photo,
      previewVisible: true,
    });
  };
  handleCancel = () => {
    this.setState({
      previewVisible: false,
      visibleBill: false,
      visibleEdit: false,
      visibleCreate: false,
      visibleUser: false,
      visibleEditUser: false,
    });
  };

  onGetData = (value) => {
    this.setState({
      previewVisible: false,
      visibleBill: false,
      visibleEdit: false,
      visibleCreate: false,
      visibleUser: false,
      visibleEditUser: false,
      itemId: null,
    });
  };

  render() {
    let requests = [];
    isLoaded(this.props.roomList) &&
      this.props.roomList.forEach((doc) => {
        requests.push({
          id: doc.id,
          name: doc.name,
          userId: doc.userId,
          status: doc.status,
          people: doc.people,
          electric: doc.electric,
          createdAt: doc.createdAt,
        });
      });

    const columns = [
      {
        title: "Mã",
        dataIndex: "code",
        key: "code",
        render: (key, requests) => {
          return (
            <div>
              <div>
                <Badge
                  className="m-b-0-i"
                  count={requests.id}
                  style={{ backgroundColor: "#008080", minWidth: 62 }}
                />
                <span className="text-grey d-block">
                  {new Date(requests.createdAt).toDateString()}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        title: "Tên phòng",
        dataIndex: "name",
        key: "name",
        // width: "40%",
        render: (key, requests) => (
          <Fragment>
            <Link to={`/room/${requests.id}`}>
              <span>{requests.name}</span>
            </Link>
            <div
              className="gx-manage-margin"
              style={{
                marginTop: 5,
                fontStyle: "italic",
                color: "gray",
                fontSize: "0.8em",
              }}
            >
              <ProfileOutlined /> {requests.userId.name || "Trống"}
            </div>
          </Fragment>
        ),
      },
      {
        title: "Số người",
        dataIndex: "total",
        key: "total",
        render: (key, requests) => {
          return <span>{requests.people}</span>;
        },
      },
      {
        title: "Số điện",
        dataIndex: "electric",
        key: "electric",
        render: (key, requests) => {
          return <span>{requests.electric}</span>;
        },
      },
      {
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        render: (key, requests) => {
          const actionMenu = (
            <ul className="ul-style">
              <li
                onClick={this.onOpenEditUser}
                className="p-v-1-i cursor-pointer"
              >
                <EditOutlined className="p-r-1" /> Chỉnh sửa người dùng
              </li>
              {/* <Link to={`/room-edit/${requests.id}`}> */}
              <li
                onClick={() => this.onOpenEdit()}
                className="p-v-1-i cursor-pointer"
                style={{ color: "rgba(0, 0, 0, 0.65)" }}
              >
                <HomeOutlined className="p-r-1" /> Chỉnh sửa phòng
              </li>
              {/* </Link> */}
              <li className="p-v-1-i cursor-pointer">
                <Link style={{ color: "red" }}>
                  <DeleteOutlined className="p-r-1" />
                  Xóa
                </Link>
              </li>
            </ul>
          );
          return (
            <Fragment>
              <span onClick={() => this.onEditItem(requests.id)}>
                <Popover
                  placement="bottomLeft"
                  trigger="click"
                  content={actionMenu}
                >
                  <Button>Action</Button>
                </Popover>
              </span>
            </Fragment>
          );
        },
      },
    ];

    return (
      <Fragment>
        {!isLoaded(this.props.roomList) ? (
          <CircularProgress />
        ) : (
          <div style={{ padding: "5em 0" }}>
            <Row>
              <Col className="p-3" xl={18} lg={18} md={24} sm={24} lg={24}>
                <Button
                  className="m-h-3 bor-rad-10"
                  style={{
                    width: "12em",
                    backgroundColor: "#1daf1d",
                    color: "white",
                  }}
                  onClick={this.onOpenBill}
                >
                  {" "}
                  Tính Bill{" "}
                </Button>
                <Button
                  onClick={this.onOpenCreate}
                  className="m-h-3 bor-rad-10"
                  style={{ width: "12em" }}
                >
                  {" "}
                  Tạo phòng{" "}
                </Button>
                <Button
                  onClick={this.onOpenUser}
                  className="m-h-3 bor-rad-10"
                  style={{ width: "12em" }}
                >
                  {" "}
                  Tạo user{" "}
                </Button>
              </Col>
            </Row>
            <Table
              dataSource={requests}
              bordered={true}
              columns={columns}
              rowKey={(requests) => requests.id}
            />
            <Modal
              width="60em"
              title="Tính bill"
              visible={this.state.visibleBill}
              footer={null}
              onCancel={this.handleCancel}
            >
              <Bill />
            </Modal>
            <Modal
              width="60em"
              title="Tạo phòng"
              visible={this.state.visibleCreate}
              footer={null}
              onCancel={this.handleCancel}
            >
              <CreateRoom getData={this.onGetData} />
            </Modal>

            <Modal
              width="60em"
              title="Tạo người dùng"
              visible={this.state.visibleUser}
              footer={null}
              onCancel={this.handleCancel}
            >
              <CreateUser />
            </Modal>
            <Modal
              title="Chỉnh sửa người dùng"
              visible={this.state.visibleEditUser}
              footer={null}
              onCancel={this.handleCancel}
            >
              <EditUser itemId={this.state.itemId} getData={this.onGetData} />
            </Modal>
            <Modal
              width="60em"
              title="Sửa phòng"
              visible={this.state.visibleEdit}
              footer={null}
              onCancel={this.handleCancel}
            >
              <EditRoom itemId={this.state.itemId} getData={this.onGetData} />
            </Modal>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    roomList: firestore.ordered.roomList,
  };
};

export default compose(
  firestoreConnect((props) => {
    return [
      {
        collection: "rooms",
        storeAs: "roomList",
      },
    ];
  }),
  connect(mapStateToProps, null)
)(Manager);
