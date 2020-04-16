import React, { Fragment } from "react";
import { Row, Col, Modal, Button, Table, Badge, Popover } from "antd";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Bill from "./Bill";
import CreateRoom from "./CreateRoom";
import EditRoom from "./EditRoom";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";

class Manager extends React.Component {
  state = {
    previewImage: null,
    previewVisible: false,
    visibleCreate: false,
    visibleBill: false,
    visibleEdit: false,
    visibleUser: false,
    visibleEditUser: false,
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
  handleCancel = () =>
    this.setState({
      previewVisible: false,
      visibleBill: false,
      visibleEdit: false,
      visibleCreate: false,
      visibleUser: false,
      visibleEditUser: false,
    });

  onGetData = (value) => {
    this.setState({
      previewVisible: false,
      visibleBill: false,
      visibleEdit: false,
      visibleCreate: false,
      visibleUser: false,
      visibleEditUser: false,
    });
  };

  render() {
    const actionMenu = (
      <ul className="ul-style">
        <li onClick={this.onOpenEditUser} className="p-v-1-i cursor-pointer">
          <EditOutlined className="p-r-1" /> Chỉnh sửa người dùng
        </li>
        <li className="p-v-1-i cursor-pointer">
          <Link style={{ color: "red" }}>
            <DeleteOutlined className="p-r-1" />
            Xóa
          </Link>
        </li>
      </ul>
    );

    const data = [
      {
        id: "231j3i12",
        userId: "21312412ẻuoaưi",
        userName: "Nguyễn Đức",
        roomId: "918230192jăhea",
        nameRoom: "T3N",
        bill: {
          water: 180,
          lastElectrict: 3201,
          newElectrict: 4919,
          internet: 50,
          motoElec: 0,
        },
        month: 4,
        year: 2020,
        createdAt: "123123",
      },
    ];

    const columns = [
      {
        title: "Mã",
        dataIndex: "code",
        key: "code",
        render: (key, data) => {
          return (
            <div>
              <div>
                <Badge
                  className="m-b-0-i"
                  count={data.id}
                  style={{ backgroundColor: "#008080", minWidth: 62 }}
                />
                <span className="text-grey d-block">
                  {data.createdAt}
                  {/* {new Date(requests.createAt).toDateString()} */}
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
        render: (key, data) => (
          <Fragment>
            <Link>
              <span className="text-ellipsis-2">{data.nameRoom}</span>
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
              <ProfileOutlined /> {data.userName}
            </div>
          </Fragment>
        ),
      },
      {
        title: "Tổng bill",
        dataIndex: "total",
        key: "total",
        render: (key, data) => {
          return <span>{data.bill.newElectrict}</span>;
        },
      },
      {
        title: "Số điện",
        dataIndex: "electric",
        key: "electric",
        render: (key, data) => {
          return <span>{data.bill.lastElectrict}</span>;
        },
      },
      {
        title: "Thao tác",
        dataIndex: "action",
        key: "action",
        render: (key, data) => {
          return (
            <span>
              <Popover
                placement="bottomLeft"
                trigger="click"
                content={actionMenu}
              >
                <Button>Action</Button>
              </Popover>
            </span>
          );
        },
      },
    ];

    return (
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
              onClick={this.onOpenEdit}
              className="m-h-3 bor-rad-10"
              style={{ width: "12em" }}
            >
              {" "}
              Chỉnh sửa phòng{" "}
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
          dataSource={data}
          bordered={true}
          columns={columns}
          rowKey={(data) => data.id}
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
          title="Sửa phòng"
          visible={this.state.visibleEdit}
          footer={null}
          onCancel={this.handleCancel}
        >
          <EditRoom />
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
          <EditUser />
        </Modal>
      </div>
    );
  }
}

export default Manager;
