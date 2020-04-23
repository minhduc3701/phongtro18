import React from "react";
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
import { UploadOutlined } from "@ant-design/icons";
import firebase from "../../firebase/index";
import { getUser } from "../../appRedux/actions";
import { connect } from "react-redux";

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
    this.state = {
      fileList: [],
      uploadImage: 0,
      loading: false,
    };
  }

  handleSubmit = (values) => {
    this.setState({
      loading: true,
    });
    firebase
      .firestore()
      .collection("rooms")
      .add({
        name: values.name,
        acreage: values.acreage,
        toilet: values.toilet,
        item: values.item,
        image: [],
        status: values.user === "empty" ? "empty" : "hired",
        detail: values.detail,
        createdAt: new Date().toISOString(),
        userId: values.user === "empty" ? "empty" : JSON.parse(values.user),
        price: parseInt(values.price),
        motoElec: parseInt(values.motoElec),
        water: parseInt(values.water),
        internet: parseInt(values.internet),
        deposit: 0,
        people: 0,
        electric: 0,
      })
      .then((res) => {
        this.state.fileList.forEach((fileItem) => {
          firebase
            .storage()
            .ref(`/${res.id}/${Date.now().toString()}`)
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
                      .doc(res.id)
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
                          this.props.getData(false);
                          notification.success({
                            message: "Tạo phòng thành công!",
                          });
                        }
                      });
                  });
              }
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { fileList } = this.state;
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
    return (
      <div className="p-5">
        <Form onFinish={this.handleSubmit}>
          <Row>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="name"
                rules={[{ required: true, message: "Nhập tên phòng" }]}
                label="Tên"
              >
                <Input placeholder="Name" className="w-90" />
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
                label="Giá"
              >
                <Input placeholder="Price" />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="motoElec"
                rules={[{ required: true, message: "Nhập giá xe điện" }]}
                label="Xe điện"
              >
                <Input placeholder="Moto Electrict" />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="water"
                rules={[{ required: true, message: "Nhập tiền nước" }]}
                label="Nước"
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
                label="Mạng"
              >
                <Input placeholder="Internet" />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="user"
                rules={[{ required: true, message: "Chọn người dùng" }]}
                label="User"
              >
                <Select placeholder="User" style={{ width: "100%" }}>
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
                  <Option value="electricWaterHeater">Bình nóng lạnh</Option>
                </Select>
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem
                name="image"
                rules={[
                  {
                    required: true,
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
              </FormItem>
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            className="bor-rad-10 float-r"
            loading={this.state.loading}
          >
            Tạo
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ room }) => {
  return {
    userList: room.userList,
    loadUser: room.loadUser,
  };
};

export default connect(mapStateToProps, { getUser })(Manager);
