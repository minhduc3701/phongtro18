import React from "react";
import {
  Row,
  Col,
  Button,
  Input,
  DatePicker,
  Form,
  Upload,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import firebase from "../../firebase/index";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 },
};

class Manager extends React.Component {
  state = {
    fileList: [],
    birth: null,
    loading: false,
    id: null,
  };

  onDestinationChange = (e, id) => {
    this.setState({ district: e });
  };

  handleChange = (district) => {
    this.setState({ district });
  };

  handleSubmit = (values) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((data) => {
        const defaultUser = {
          name: values.name,
          birth: this.state.birth || "",
          district: values.address,
          address: values.address,
          phone: values.phone,
          gender: "",
          permission: "guest",
          avatar: "",
          rId: "",
          rName: "",
          createdAt: new Date().toISOString(),
          image: [],
        };
        firebase
          .firestore()
          .doc(`/users/${data.user.uid}`)
          .set(defaultUser)
          .then((res) => {
            console.log(res);
            notification.success("Tạo tài khoản thành công!");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        let err = "";
        if (error.code === "auth/email-already-in-use")
          err = "Địa chỉ email này đã được tồn tại!";
        else err = "Invalid account information";
        notification.error({
          message: err,
        });
      });
  };

  onPickDate = (date, dateString) => {
    this.setState({
      birth: dateString,
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
                name="email"
                rules={[
                  { required: true, message: "Nhập email đăng nhập" },
                  { type: "email", message: "Email định dạng không đúng" },
                ]}
                label="Email"
              >
                <Input placeholder="Email" />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="address"
                rules={[{ required: true, message: "Nhập họ và tên" }]}
                label="Địa chỉ"
              >
                <Input placeholder="Address" />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="password"
                rules={[
                  { required: true, message: "Nhập mật khẩu" },
                  {
                    min: 6,
                    message: "Mật khẩu tối thiểu là 6 ký tự",
                  },
                ]}
                label="Mật khẩu"
              >
                <Input type="password" placeholder="Password" />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="phone"
                rules={[{ required: true, message: "Nhập số điện thoại" }]}
                label="Điện thoại"
              >
                <Input placeholder="Phone number" />
              </FormItem>
            </Col>

            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="name"
                rules={[{ required: true, message: "Nhập họ và tên" }]}
                label="Họ tên"
              >
                <Input placeholder="Name" />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem {...formItemLayout} name="birth" label="Ngày sinh">
                <DatePicker
                  onChange={this.onPickDate}
                  placeholder="Birth day"
                  style={{ width: "100%" }}
                />
              </FormItem>
            </Col>

            <Col className="p-h-1" xl={24} lg={24} md={24} sm={24} xs={24}>
              <FormItem name="image" label="Hình ảnh">
                <Upload {...props}>
                  <Button className="m-0-i">
                    <UploadOutlined /> Tải lên
                  </Button>
                </Upload>
              </FormItem>
            </Col>
            <div className="d-flex justify-flex-end w-100">
              <Button
                loading={this.state.loading}
                type="primary"
                htmlType="submit"
                className="bor-rad-10"
              >
                Tạo
              </Button>
            </div>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Manager;
