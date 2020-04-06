import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
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
          <Form onSubmit={this.handleSubmit} style={{ width: "25em" }}>
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
              Bạn đã có tài khoản? <Link to="/signin">Đăng nhập</Link>
            </p>
            <Button
              type="primary"
              className="w-100 m-v-3"
              style={{ borderRadius: "1em" }}
              size="large"
              htmlType="submit"
            >
              Đăng ký
            </Button>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default SignIn;
