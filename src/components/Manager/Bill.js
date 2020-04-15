import React, { Fragment } from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  Table,
  Badge,
  Input,
  Popover,
  Checkbox,
} from "antd";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

class Manager extends React.Component {
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
    const actionMenu = (
      <ul className="ul-style">
        <li className="p-v-1-i cursor-pointer">
          <Link className="text-grey-i">
            <EditOutlined className="p-r-1" /> Chỉnh sửa người dùng
          </Link>
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
        title: "Tên phòng",
        dataIndex: "name",
        key: "name",
        // width: "40%",
        render: (key, data) => (
          <Fragment>
            <span className="text-ellipsis-2">{data.nameRoom}</span>
            <div
              className="gx-manage-margin"
              style={{
                marginTop: 5,
                fontStyle: "italic",
                color: "gray",
                fontSize: "0.8em",
              }}
            ></div>
          </Fragment>
        ),
      },
      {
        title: "Tiền phòng",
        dataIndex: "price",
        key: "price",
        render: (key, data) => {
          return <span>{data.price}</span>;
        },
      },
      {
        title: "Tiền nước",
        dataIndex: "price",
        key: "price",
        render: (key, data) => {
          return <span>{data.water}</span>;
        },
      },
      {
        title: "Tiền mạng",
        dataIndex: "internet",
        key: "internet",
        render: (key, data) => {
          return <span>{data.internet}</span>;
        },
      },
      {
        title: "Số điện tháng trước",
        dataIndex: "lastElectric",
        key: "lastElectric",
        render: (key, data) => {
          return <span>{data.lastElectric}</span>;
        },
      },
      {
        title: "Xe điện",
        dataIndex: "motoElec",
        key: "motoElec",
        render: (key, data) => {
          return <Checkbox />;
        },
      },

      {
        title: "Số điện mới",
        dataIndex: "newElectic",
        key: "newElectic",
        render: (key, data) => {
          return (
            <span>
              <Input
                style={{ border: 0 }}
                className="border-none"
                placeholder="Số điện mới"
              />
            </span>
          );
        },
      },
    ];

    return (
      <Table
        bordered={true}
        columns={columns}
        dataSource={data}
        rowKey={(data) => data.id}
      />
    );
  }
}

export default Manager;
