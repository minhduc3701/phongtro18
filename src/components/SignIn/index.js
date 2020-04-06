import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Form, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import userLogo from "../../assets/f93e57629c.png";
import background from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
};

class SignIn extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
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
          <Form onSubmit={this.handleSubmit} style={{ width: "25em" }}>
            <span>Tên đăng nhập</span>
            <FormItem
              name="user"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
              ]}
              {...formItemLayout}
            >
              {/* <FormItem {...formItemLayout} label="Tên đăng nhập"> */}
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Email"
              />
            </FormItem>
            <span className="d-flex justify-between">
              <span>Mật khẩu</span>
              <Link>Quên mật khẩu</Link>
            </span>
            <FormItem
              {...formItemLayout}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
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
            >
              Đăng nhập
            </Button>
          </Form>

          <Row className="p-t-5">
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <div className="block m-0 cursor-pointer d-flex-i justify-center align-center">
                <GoogleOutlined
                  style={{ fontSize: "1.8em", paddingRight: "1em" }}
                />{" "}
                <span>Đăng nhập bằng Google</span>
              </div>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <div className="block m-0 cursor-pointer d-flex-i justify-center align-center">
                <FacebookOutlined
                  style={{ fontSize: "1.8em", paddingRight: "1em" }}
                />{" "}
                <span>Đăng nhập bằng Facebook</span>
              </div>
            </Col>
          </Row>
          <Link
            to="/signup"
            className="m-l-auto p-t-3"
            style={{ textDecoration: "underline" }}
          >
            Đăng ký
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default SignIn;
