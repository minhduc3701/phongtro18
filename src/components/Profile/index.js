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
  notification,
  Upload,
} from "antd";
import { UserOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import Loading from "../Loading";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { NumberFormat } from "../../util/NumberFormat";
import firebase from "../../firebase";

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: { xs: 24, sm: 5 },
  wrapperCol: { xs: 24, sm: 19 },
};
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    notification.error({ message: "You can only upload JPG/PNG file!" });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification.error({ message: "Image must smaller than 2MB!" });
  }
  return isJpgOrPng && isLt2M;
}

class Menu extends React.Component {
  state = {
    visible: false,
    preview: null,
    edit: false,
    address: null,
    idCard: null,
    phone: null,
    gender: null,
    loading: false,
    loadingAva: false,
    fileList: [],
    previewImage: "",
    previewTitle: "",
    imageUrl: null,
  };

  handleChangeAva = (info) => {
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    firebase
      .storage()
      .ref(`/${userInfo.id}/${Date.now().toString()}/${info.size}`)
      .put(info)
      .then((res) => {
        firebase
          .storage()
          .ref(res.metadata.fullPath)
          .getDownloadURL()
          .then((url) => {
            firebase
              .firestore()
              .collection("users")
              .doc(userInfo.id)
              .update({
                avatar: url,
              })
              .then((res) => {
                notification.success({
                  message: "Thay đổi ảnh đại diện thành công!",
                });
              })
              .catch((err) => {
                console.log(err);
                notification.error({ message: "Somthing went wrong!!" });
              });
          });
      });
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

  onEdit = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState({
      edit: true,
      fileList: [],
    });
  };

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  onUploadImage = () => {
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    if (this.state.fileList.length > 0) {
      this.state.fileList.forEach((fileItem) => {
        firebase
          .storage()
          .ref(`/${userInfo.id}/${Date.now().toString()}/${fileItem.size}`)
          .put(fileItem.originFileObj)
          .then((res) => {
            firebase
              .storage()
              .ref(res.metadata.fullPath)
              .getDownloadURL()
              .then((url) => {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(userInfo.id)
                  .update({
                    image: firebase.firestore.FieldValue.arrayUnion({
                      url: url,
                      name: fileItem.name,
                    }),
                  })
                  .then((res) => {
                    this.setState({
                      loading: false,
                      edit: false,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    notification.error({ message: "Somthing went wrong!!" });
                  });
              });
          });
      });
    }
  };

  onSentDetail = () => {
    this.onUploadImage();
    this.setState({
      loading: true,
    });
    let newDetail = {
      address: this.state.address,
      idCard: this.state.idCard,
      phone: this.state.phone,
      gender: this.state.gender,
    };
    for (const key in newDetail) {
      if (!newDetail[key]) {
        delete newDetail[key];
      }
    }
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    if (isEmpty(newDetail)) {
      this.setState({
        loading: false,
        edit: false,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(userInfo.id)
        .update(newDetail)
        .then((res) => {
          notification.success({ message: "Chỉnh sửa thông tinh thành công!" });
          this.setState({
            loading: false,
            edit: false,
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((err) => {
          console.log(err);
          notification.error({ message: "Chỉnh sửa thông tinh thất bại!" });
          this.setState({
            loading: false,
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
  };

  onChangeAddress = (e, type) => {
    if (type) {
      this.setState({
        gender: e,
      });
    } else {
      let name = e.target.name;
      let value = e.target.value;
      this.setState({
        [name]: value,
      });
    }
  };

  render() {
    let userDetail = null;
    let billsList = [];
    const { fileList } = this.state;
    const uploadAvaButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

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
              {!this.state.edit ? (
                <Fragment>
                  <div>
                    <Avatar
                      size={84}
                      icon={<UserOutlined />}
                      src={userDetail.avatar}
                    />
                  </div>
                  <div className="p-l-3">
                    <h2>{userDetail.name}</h2>
                    <h4 className="w-150">Địa chỉ: {userDetail.address}</h4>
                  </div>
                </Fragment>
              ) : (
                <Row className="w-100">
                  <Col xl={3} lg={3} md={3} sm={24} xs={24}>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader w-auto-i avatar-circle"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      action={this.handleChangeAva}
                      // onChange={this.handleChangeAva}
                    >
                      {uploadAvaButton}
                    </Upload>
                  </Col>
                  <Col xl={21} lg={21} md={21} sm={24} xs={24}>
                    <div className="p-l-5 ">
                      <h2>{userDetail.name}</h2>
                      <div className="d-flex">
                        <span
                          className="d-flex align-center"
                          style={{ width: 150 }}
                        >
                          {" "}
                          Địa chỉ:
                        </span>{" "}
                        <Input
                          name="address"
                          onChange={this.onChangeAddress}
                          className="w-100"
                          placeholder="Address"
                          defaultValue={userDetail.address}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </div>
            <hr />
            <Row>
              <Col
                // style={{ borderRight: "1px solid #ccc" }}
                className="profile__border-right"
                xl={12}
                lg={12}
                md={24}
                sm={24}
                xs={24}
              >
                {this.state.edit ? (
                  <Form
                    initialValues={{
                      idCard: userDetail.idCard,
                      phone: userDetail.phone,
                      gender: userDetail.gender,
                    }}
                  >
                    <FormItem {...formItemLayout} label="Phòng:">
                      {" "}
                      {userDetail.rName}{" "}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      name="idCard"
                      label="Chứng minh thư:"
                    >
                      <Input
                        name="idCard"
                        placeholder="Id Card"
                        onChange={this.onChangeAddress}
                        style={{ maxWidth: 300 }}
                      />
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      name="phone"
                      label="Số điện thoại:"
                    >
                      <Input
                        name="phone"
                        onChange={this.onChangeAddress}
                        style={{ maxWidth: 300 }}
                        maxLength={20}
                        placeholder="Phone"
                      />
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      name="gender"
                      label="Giới tính:"
                    >
                      <Select
                        name="gender"
                        onChange={(e) => this.onChangeAddress(e, "gender")}
                        placeholder="Gender"
                        style={{ maxWidth: 300 }}
                      >
                        <Option value="Nam">Nam</Option>
                        <Option value="Nữ">Nữ</Option>
                        <Option value="Khác">Khác</Option>
                      </Select>
                    </FormItem>
                    <FormItem {...formItemLayout} label="Tiền cọc:">
                      {NumberFormat(userDetail.deposit)}
                    </FormItem>
                  </Form>
                ) : (
                  <Fragment>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <h4 className="float-r">Phòng:</h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={18}
                        lg={18}
                        md={18}
                        sm={18}
                        xs={18}
                      >
                        <h4>{userDetail.rName}</h4>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <h4 className="float-r text-ellipsis">
                          Chứng minh thư:
                        </h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={18}
                        lg={18}
                        md={18}
                        sm={18}
                        xs={18}
                      >
                        <h4>{userDetail.idCard}</h4>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <h4 className="float-r text-ellipsis">
                          Số điện thoại:
                        </h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={18}
                        lg={18}
                        md={18}
                        sm={18}
                        xs={18}
                      >
                        <h4>{userDetail.phone}</h4>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <h4 className="float-r">Giới tính:</h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={18}
                        lg={18}
                        md={18}
                        sm={18}
                        xs={18}
                      >
                        <h4>{userDetail.gender}</h4>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: 24 }}>
                      <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        <h4 className="float-r">Tiền cọc:</h4>
                      </Col>
                      <Col
                        className="p-l-3"
                        xl={18}
                        lg={18}
                        md={18}
                        sm={18}
                        xs={18}
                      >
                        <h4>{NumberFormat(userDetail.deposit)}</h4>
                      </Col>
                    </Row>
                  </Fragment>
                )}
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <Row>
                  {this.state.edit ? (
                    <Upload
                      listType="picture-card"
                      className="p-3"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                  ) : (
                    userDetail.image.map((item, index) => {
                      return (
                        <Col
                          key={index}
                          className="p-1"
                          xl={6}
                          lg={8}
                          md={8}
                          sm={12}
                          xs={12}
                        >
                          <img
                            onClick={() => this.onPreview(item.url)}
                            style={{ height: "10em" }}
                            className="w-100 h-100 object-fit-cover cursor-pointer"
                            src={item.url}
                            alt={item.name}
                          />
                        </Col>
                      );
                    })
                  )}
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
                scroll={{ x: true }}
                scrollToFirstRowOnChange={true}
              />
            )}
            <div className="d-flex w-100 m-t-3">
              <Button
                htmlType="submit"
                onClick={this.state.edit ? this.onSentDetail : this.onEdit}
                className="m-l-auto"
                type="primary"
                loading={this.state.loading}
              >
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
                alt="preview"
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
