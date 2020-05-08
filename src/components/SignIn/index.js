import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form, Input, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import userLogo from "../../assets/f93e57629c.png";
import background from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";
import firebase from "../../firebase/index";
import Loading from "../Loading";

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

  componentWillMount() {
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified && userInfo) {
        this.props.history.push("/home");
        this.setState({
          checkUser: true,
        });
      } else {
        this.setState({
          checkUser: true,
        });
      }
    });
  }

  handleSubmit = (values) => {
    this.setState({ loading: true });
    localStorage.clear();
    firebase
      .auth()
      .signInWithEmailAndPassword(values.user, values.password)
      .then((data) => {
        console.log(data);
        if (data.user.emailVerified) {
          document.cookie = `user_id=${data.user.uid}`;
          localStorage.setItem("uid", data.user.uid);
          data.user.getIdToken().then((idToken) => {
            document.cookie = `token=${idToken}`;
          });
          this.props.history.push("/home");
        } else {
          notification.error({
            message: "Tài khoản chưa được kích hoạt! Hãy kiểm tra email",
          });
          firebase.auth().useDeviceLanguage();
          firebase.auth().currentUser.sendEmailVerification();
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password")
          notification.error({
            message: "Sai tài khoản hoặc mật khẩu!",
          });
        else if (err.code === "auth/user-not-found")
          notification.error({
            message: "Tài khoản của bạn không tồn tại!",
          });
        else
          notification.error({
            message: "Lỗi không xác định!",
          });
        this.setState({ loading: false });
      });
  };

  signInWithGG = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    firebase.auth().useDeviceLanguage();
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        let token = result.credential.accessToken;
        let user = result.user;
        if (user) {
          document.cookie = `user_id=${user.uid}`;
          localStorage.setItem("uid", user.uid);
          document.cookie = `token=${token}`;
          this.props.history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  signInWithFB = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("email");
    firebase.auth().useDeviceLanguage();
    provider.setCustomParameters({
      display: "popup",
    });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        let token = result.credential.accessToken;
        let user = result.user;
        console.log(token);
        console.log(user);
        if (user) {
          document.cookie = `user_id=${user.uid}`;
          localStorage.setItem("uid", user.uid);
          document.cookie = `token=${token}`;
          this.props.history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <Fragment>
        {this.state.checkUser ? (
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
                maxHeight: "40em",
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
              <h3 className="text-center font-weight-bold p-b-2">Đăng nhập</h3>
              <Form onFinish={this.handleSubmit} style={{ width: "25em" }}>
                <span>Tên đăng nhập</span>
                <FormItem
                  name="user"
                  rules={[
                    {
                      required: true,
                      message: "Tên đăng nhập không được bỏ trống!",
                    },
                  ]}
                  {...formItemLayout}
                >
                  {/* <FormItem {...formItemLayout} label="Tên đăng nhập"> */}
                  <Input
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Email"
                  />
                </FormItem>
                <span className="d-flex justify-between">
                  <span>Mật khẩu</span>
                  <Link to="/forgot-password">Quên mật khẩu</Link>
                </span>
                <FormItem
                  {...formItemLayout}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Mật khẩu không được bỏ trống!",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                </FormItem>
                <Button
                  type="primary"
                  className="w-100 p-t-3"
                  style={{ borderRadius: "1em" }}
                  size="large"
                  htmlType="submit"
                  loading={this.state.loading}
                >
                  Đăng nhập
                </Button>
              </Form>

              <Row className="p-t-5">
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <div
                    onClick={this.signInWithGG}
                    className="block m-0 cursor-pointer d-flex-i justify-center align-center"
                  >
                    <GoogleOutlined
                      style={{ fontSize: "1.8em", paddingRight: "1em" }}
                    />{" "}
                    <span>Đăng nhập bằng Google</span>
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <div
                    onClick={this.signInWithFB}
                    className="block m-0 cursor-pointer d-flex-i justify-center align-center"
                  >
                    <FacebookOutlined
                      style={{ fontSize: "1.8em", paddingRight: "1em" }}
                    />{" "}
                    <span>Đăng nhập bằng Facebook</span>
                  </div>
                </Col>
              </Row>
              <Link to="/signup" className="m-l-auto p-t-3">
                Đăng ký
              </Link>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default SignIn;
