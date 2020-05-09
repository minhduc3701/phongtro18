import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import background from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com-min.jpg";
import firebase from "../../firebase/index";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
};

class SignIn extends React.Component {
  state = {
    loading: false,
    checkUser: false,
  };

  handleSubmit = (values) => {
    this.setState({ loading: true });
    let actionCodeSetting = {
      url: "http://cv-phongtro18.freevnn.com/",
      handleCodeInApp: true,
    };
    firebase.auth().useDeviceLanguage();
    firebase
      .auth()
      .sendPasswordResetEmail(values.email, actionCodeSetting)
      .then((res) => {
        this.setState({
          loading: false,
        });
        notification.success({
          message: "Yêu cầu tìm lại mật khẩu của bạn đã được gửi đến Email",
        });
      })
      .catch((err) => {
        let mess = "";
        let title = "";
        switch (err.code) {
          case "auth/invalid-email":
            title = "Email không đúng!";
            mess =
              "Email bạn nhập không đúng hoặc Email chưa được đăng ký trên Travel Connect";
            break;

          default:
            title = "Email người dùng không tồn tại!";
            mess =
              "Email bạn nhập không đúng hoặc Email chưa được đăng ký trên Travel Connect";
        }
        notification.error({
          message: title,
          description: mess,
        });
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <Fragment>
        <div>
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
              maxHeight: "20em",
              width: "100%",
              height: "100%",
            }}
          >
            <h1 className="text-center font-weight-bold p-b-2">
              Tìm lại mật khẩu
            </h1>
            <Form onFinish={this.handleSubmit} style={{ width: "25em" }}>
              <span>Email đăng ký tài khoản</span>
              <FormItem
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Nhập email của bạn",
                  },
                ]}
                {...formItemLayout}
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Email"
                />
              </FormItem>

              <div className="d-flex justify-flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="m-r-3"
                  loading={this.state.loading}
                >
                  Tìm kiếm
                </Button>
                <Link to="/">
                  <Button>Hủy</Button>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SignIn;
