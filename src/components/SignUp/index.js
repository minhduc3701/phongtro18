import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import userLogo from "../../assets/f93e57629c.png";
import background from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";
import firebase from "../../firebase/index";
// import {
//   SIGNUP_USER_SUCCESS,
//   SIGNUP_USER_START,
//   SIGNUP_USER_ERROR,
// } from "../../constants/ActionType";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
};

class SingUp extends React.Component {
  state = {
    loading: false,
  };
  handleSubmit = (values) => {
    this.setState({ loading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.confirm)
      .then((data) => {
        const defaultUser = {
          name: values.user,
          birth: "",
          district: "",
          address: "",
          phone: "",
          gender: "",
          permission: "guest",
          avatar: "",
          rId: "",
          rName: "",
          createdAt: new Date().toISOString(),
          image: [],
          idCard: "",
          deposit: 0,
        };
        firebase
          .firestore()
          .doc(`/users/${data.user.uid}`)
          .set(defaultUser)
          .then((res) => {
            notification.success({ message: "Tạo tài khoản thành công!" });
          });
        firebase.auth().useDeviceLanguage();
        firebase.auth().currentUser.sendEmailVerification();
        this.setState({ loading: false });
      })
      .catch((error) => {
        let err = "";
        if (error.code === "auth/email-already-in-use")
          err = "Địa chỉ email này đã được tồn tại!";
        else err = "Invalid account information";
        notification.error({
          message: err,
        });
        this.setState({ loading: false });
      });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Mật khẩu không khớp! Hãy thử lại");
    } else {
      callback();
    }
  };

  render() {
    return (
      <Fragment>
        <div style={{ height: "100vh" }} className="w-100 pos-rel">
          <img
            className="w-100 h-100 pos-abs"
            style={{ top: 0, left: 0, objectFit: "cover" }}
            src={background}
            alt="bg"
          />
        </div>
        <div
          className="block-w bor-blue-hover p-t-5 pos-abs bor-rad-10 d-flex-i justify-center align-center"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            flexDirection: "column",
            maxWidth: "30em",
            maxHeight: "45em",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={userLogo}
            alt="user-logo"
            className="bor-rad-50"
            style={{ width: "10em", height: "10em" }}
          />
          <h3 className="text-center font-weight-bold">Đăng ký</h3>
          <Form onFinish={this.handleSubmit} style={{ width: "25em" }}>
            <span>Email</span>
            <FormItem
              name="email"
              rules={[
                {
                  required: true,
                  message: "Nhập email",
                },
              ]}
              {...formItemLayout}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Email"
              />
            </FormItem>
            <span>Họ và tên</span>
            <FormItem
              name="user"
              rules={[
                {
                  required: true,
                  message: "Nhập họ và tên",
                },
              ]}
              {...formItemLayout}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Name"
              />
            </FormItem>
            <span>Mật khẩu</span>
            <FormItem
              {...formItemLayout}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu",
                },
                {
                  min: 6,
                  message: "Mật khẩu tối thiểu 6 ký tự",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            </FormItem>
            <span>Xác nhận mật khẩu</span>
            <FormItem
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu xác nhận không chính xác!");
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Confirm Password"
              />
            </FormItem>
            <p className="text-center">
              Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link>
            </p>
            <Button
              type="primary"
              className="w-100 m-v-3"
              style={{ borderRadius: "1em" }}
              size="large"
              htmlType="submit"
              loading={this.state.loading}
            >
              Đăng ký
            </Button>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default SingUp;
