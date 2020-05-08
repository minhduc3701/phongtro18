import React, { Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  Upload,
  Select,
  notification,
} from "antd";
import {
  UploadOutlined,
  PictureTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import firebase from "../../firebase/index";
import { getUser, getRoomDetail } from "../../appRedux/actions";
import { connect } from "react-redux";
import CircularProgress from "../Loading/index";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { Option } = Select;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 },
};

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUser();
    // this.props.getRoomDetail(props.itemId);
    this.state = {
      fileList: [],
      uploadImage: 0,
      loading: false,
      imageList: null,
    };
  }

  componentWillUnmount() {
    this.setState({
      loading: false,
      fileList: [],
    });
  }

  handleUploadImage = () => {
    this.setState({
      loading: true,
    });
    this.state.fileList.length > 0 &&
      this.state.fileList.forEach((fileItem) => {
        firebase
          .storage()
          .ref(
            `/${this.props.itemId}/${Date.now().toString()}/${fileItem.size}`
          )
          .put(fileItem)
          .then((ress) => {
            if (ress) {
              firebase
                .storage()
                .ref(ress.metadata.fullPath)
                .getDownloadURL()
                .then((url) => {
                  firebase
                    .firestore()
                    .collection("rooms")
                    .doc(this.props.itemId)
                    .update({
                      image: firebase.firestore.FieldValue.arrayUnion({
                        url: url,
                        name: fileItem.name,
                      }),
                    })
                    .then((res) => {
                      this.setState({
                        uploadImage: this.state.uploadImage + 1,
                      });
                      if (
                        this.state.uploadImage === this.state.fileList.length
                      ) {
                        this.setState({
                          loading: false,
                          fileList: [],
                        });
                        this.props.getData(false);
                        notification.success({
                          message: "Cập nhật phòng thành công!",
                        });
                      }
                    });
                });
            }
          });
      });
  };

  onDeleteImage = (item, index) => {
    let newList = this.props.roomDetail.image.slice(index, 1);
    if (this.props.roomDetail.image.length > 1) {
      firebase
        .firestore()
        .collection("rooms")
        .doc(this.props.itemId)
        .update({ image: firebase.firestore.FieldValue.arrayRemove(item) })
        .then((res) => {
          this.setState({
            imageList: newList,
          });
        });
    } else {
      notification.error({
        message: "Xóa hình ảnh thất bại!",
        description: "Phòng yêu cầu tối thiểu 01 hình ảnh mô tả",
      });
    }
  };

  onError = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    let { fileList } = this.state;
    let roomDetail = null;
    const props = {
      multiple: true,
      listType: "picture",
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    isLoaded(this.props.Detail) &&
      this.props.Detail.forEach((doc) => {
        roomDetail = {
          id: doc.id,
          name: doc.name,
          acreage: doc.acreage,
          price: doc.price,
          motoElec: doc.motoElec,
          water: doc.water,
          toilet: doc.toilet,
          internet: doc.internet,
          userId: doc.userId,
          detail: doc.detail,
          item: doc.item,
          image: doc.image,
          status: doc.status,
          people: doc.people,
          createdAt: doc.createdAt,
        };
      });
    const handleSubmit = (values) => {
      this.setState({
        loading: true,
      });
      firebase
        .firestore()
        .collection("rooms")
        .doc(this.props.itemId)
        .update({
          name: values.name,
          acreage: values.acreage,
          toilet: values.toilet,
          item: values.item,
          detail: values.detail,
          price: values.price,
          water: values.water,
          internet: values.internet,
        })
        .then((res) => {
          if (this.state.fileList.length < 1) {
            this.setState({
              loading: false,
              fileList: [],
            });
            this.props.getData(false);
            notification.success({
              message: "Cập nhật phòng thành công!",
            });
          }
        });
    };
    return (
      <Fragment>
        {isLoaded(this.props.Detail) && roomDetail.id === this.props.itemId ? (
          <div className="p-5">
            <Form
              onFinish={handleSubmit}
              onFinishFailed={this.onError}
              initialValues={{
                name: roomDetail.name,
                acreage: roomDetail.acreage,
                toilet: roomDetail.toilet,
                item: roomDetail.item,
                detail: roomDetail.detail,
                price: roomDetail.price,
                water: roomDetail.water,
                internet: roomDetail.internet,
              }}
            >
              <Row>
                <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    name="name"
                    rules={[{ required: true, message: "Nhập tên phòng" }]}
                    label="Tên phòng"
                  >
                    <Input placeholder="Name" />
                  </FormItem>
                </Col>
                <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    name="acreage"
                    rules={[{ required: true, message: "Nhập diện tích" }]}
                    label="Diện tích"
                  >
                    <Input placeholder="Acreage" />
                  </FormItem>
                </Col>
                <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    name="price"
                    rules={[{ required: true, message: "Nhập giá phòng" }]}
                    label="Giá phòng"
                  >
                    <Input placeholder="Price" />
                  </FormItem>
                </Col>
                <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    name="water"
                    rules={[{ required: true, message: "Nhập tiền nước" }]}
                    label="Giá nước"
                  >
                    <Input placeholder="Water" />
                  </FormItem>
                </Col>
                <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    name="toilet"
                    rules={[{ required: true, message: "Chọn nhà vệ sinh" }]}
                    label="Vệ sinh"
                  >
                    <Select placeholder="Toilet" style={{ width: "100%" }}>
                      <Option value={true}>Gồm nhà vệ sinh</Option>
                      <Option value={false}>Không bao gồm nhà vệ sinh</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    name="internet"
                    rules={[{ required: true, message: "Nhập tiền mạng" }]}
                    label="Tiền mạng"
                  >
                    <Input placeholder="Internet" />
                  </FormItem>
                </Col>
                <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    name="detail"
                    rules={[{ required: true, message: "Nhập mô tả" }]}
                    label="Mô tả"
                  >
                    <TextArea rows={5} placeholder="Introduction" />
                  </FormItem>
                </Col>
                <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    name="item"
                    rules={[{ required: true, message: "Chọn người dùng" }]}
                    label="Vật dụng"
                  >
                    <Select
                      mode="multiple"
                      placeholder="User"
                      style={{ width: "100%" }}
                    >
                      <Option value="cushion">Đệm</Option>
                      <Option value="wardrobe">Tủ quần áo</Option>
                      <Option value="table">Bàn</Option>
                      <Option value="shelve">Kệ</Option>
                      <Option value="airCondition">Điều hòa</Option>
                      <Option value="electrictWaterHeater">
                        Bình nóng lạnh
                      </Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col className="p-h-1" xl={24} lg={24} md={24} sm={24} xs={24}>
                  <FormItem
                    // name="image"
                    rules={[
                      {
                        required: false,
                        message: "Tải lên ảnh mô tả",
                      },
                    ]}
                    label="Hình ảnh"
                  >
                    <Upload {...props}>
                      <Button className="m-0-i">
                        <UploadOutlined /> Tải lên
                      </Button>
                    </Upload>
                    {roomDetail &&
                      roomDetail.image.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="block m-b-0 padding-picture-item d-flex-i align-center justify-between"
                            style={{
                              marginTop: 8,
                              fontSize: "1.9em",
                              opacity: "0.7",
                              borderColor: "#d9d9d9",
                            }}
                          >
                            <div className="d-flex-i align-center">
                              <PictureTwoTone
                                className="block-center"
                                style={{ width: 48, height: 48 }}
                              />{" "}
                              <span
                                style={{
                                  fontSize: 14,
                                  color: "black",
                                }}
                              >
                                {item.name}
                              </span>
                            </div>
                            <DeleteOutlined
                              style={{
                                fontSize: 14,
                                color: "rgba(0, 0, 0, 0.65)",
                              }}
                              onClick={() => this.onDeleteImage(item, index)}
                            />
                          </div>
                        );
                      })}
                  </FormItem>
                </Col>
              </Row>
              <div className="d-flex justify-flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bor-rad-10"
                  loading={this.state.loading}
                  onClick={this.handleUploadImage}
                >
                  Sửa
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <CircularProgress />
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = ({ room, firestore }) => {
  return {
    userList: room.userList,
    loadUser: room.loadUser,
    roomDetail: room.roomDetail,
    loadRoomDetail: room.loadRoomDetail,
    Detail: firestore.ordered.Detail,
  };
};

export default compose(
  firestoreConnect((props) => {
    return [
      {
        collection: "rooms",
        doc: props.itemId,
        storeAs: "Detail",
      },
    ];
  }),
  connect(mapStateToProps, { getUser, getRoomDetail })
)(Manager);
