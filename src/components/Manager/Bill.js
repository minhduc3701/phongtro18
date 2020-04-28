import React, { Fragment } from "react";
import { Table, Input, Button, notification } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getRoomList } from "../../appRedux/actions";
import { connect } from "react-redux";
import CircularProgress from "../Loading/index";
import firebase from "../../firebase/index";

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.props.getRoomList();
    this.state = {
      previewImage: null,
      previewVisible: false,
      loading: false,
      room: [],
      countRoom: 0,
    };
  }

  onPreview = (photo) => {
    this.setState({
      previewImage: photo,
      previewVisible: true,
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  onChangeInput = (e, id) => {
    let roomList = this.props.roomList;
    if (this.state.room.length < 1) {
      this.setState({
        room: this.props.roomList,
      });
    }
    for (let i = 0; i < roomList.length; i++) {
      if (roomList[i].id === id) {
        roomList[i]["newElectrict"] = parseInt(e.target.value);
      }
    }
    this.setState({
      room: roomList,
    });
  };

  onFinishBill = () => {
    let fill = true;
    this.setState({
      loading: true,
    });
    let roomList = this.state.room;
    for (let i = 0; i < roomList.length; i++) {
      if (roomList[i].newElectrict === undefined) {
        fill = false;
      }
    }
    {
      this.state.room.length > 0 && fill
        ? this.state.room.forEach((room) => {
            firebase
              .firestore()
              .collection("bills")
              .add({
                userId: room.userId.id,
                userName: room.userId.name,
                roomId: room.id,
                nameRoom: room.name,
                bill: {
                  water: room.water * room.people,
                  lastElectrict: room.electrict,
                  newElectrict: parseInt(room.newElectrict),
                  internet: room.internet,
                  motoElec: room.motoElec,
                  type: "month",
                  total:
                    room.price +
                    room.water * room.people +
                    room.internet +
                    room.motoElec * 100000 +
                    (parseInt(room.newElectrict) - room.electrict) * 4000,
                },
                createdAt: new Date().toLocaleDateString(),
              });
            firebase
              .firestore()
              .collection("rooms")
              .doc(room.id)
              .update({
                electrict: parseInt(room.newElectrict),
              })
              .then((res) => {
                this.setState({
                  countRoom: this.state.countRoom + 1,
                });
                if (this.state.countRoom === this.state.room.length) {
                  this.props.getData(false);
                  this.setState({
                    loading: false,
                  });
                  notification.success({ message: "Thanh toán thành công!" });
                }
              });
          })
        : setTimeout(() => {
            this.setState({ loading: false });
            notification.error({
              message: "Thất bại!",
              description:
                "Nhập đẩy đủ số điện mới cho các phòng trước khi hoàn thiện!",
            });
          }, 1000);
    }
  };

  render() {
    const columns = [
      {
        title: "Tên phòng",
        dataIndex: "name",
        key: "name",
        // width: "40%",
        render: (key, roomList) => (
          <span className="text-ellipsis-2">{roomList.name}</span>
        ),
      },
      {
        title: "Tiền phòng",
        dataIndex: "price",
        key: "price",
        render: (key, roomList) => {
          return <span>{roomList.price}</span>;
        },
      },
      {
        title: "Tiền nước",
        dataIndex: "price",
        key: "price",
        render: (key, roomList) => {
          return <span>{roomList.water}</span>;
        },
      },
      {
        title: "Tiền mạng",
        dataIndex: "internet",
        key: "internet",
        render: (key, roomList) => {
          return <span>{roomList.internet}</span>;
        },
      },
      {
        title: "Số điện tháng trước",
        dataIndex: "lastElectric",
        key: "lastElectric",
        render: (key, roomList) => {
          return <span>{roomList.electrict}</span>;
        },
      },
      {
        title: "Xe điện",
        dataIndex: "motoElec",
        key: "motoElec",
        render: (key, roomList) => {
          return <span>{roomList.motoElec}</span>;
        },
      },

      {
        title: "Số điện mới",
        dataIndex: "newElectic",
        key: "newElectic",
        render: (key, roomList) => {
          return (
            <span>
              <Input
                style={{ border: 0 }}
                className="border-none"
                placeholder="Số điện mới"
                type="number"
                onChange={(e) => this.onChangeInput(e, roomList.id)}
              />
            </span>
          );
        },
      },
    ];

    return (
      <Fragment>
        {!this.props.loadRoomList ? (
          <Fragment>
            <Table
              bordered={true}
              columns={columns}
              dataSource={this.props.roomList}
              rowKey={(roomList) => roomList.id}
            />
            <div className="d-flex justify-flex-end p-v-3">
              <Button
                loading={this.state.loading}
                type="primary"
                onClick={this.onFinishBill}
              >
                Hoàn thành
              </Button>
            </div>
          </Fragment>
        ) : (
          <CircularProgress />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ room }) => {
  return {
    roomList: room.roomList,
    loadRoomList: room.loadRoomList,
  };
};

export default connect(mapStateToProps, { getRoomList })(Manager);
