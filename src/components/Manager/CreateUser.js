import React, { Fragment } from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  Table,
  Badge,
  Input,
  Popover,
  Checkbox,
  DatePicker,
  Form,
  Upload,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import {
  UploadOutlined,
  EditOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const { Option } = Select;
const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 },
};

class Manager extends React.Component {
  state = {
    fileList: [],
  };

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
    let { fileList } = this.state;
    const props = {
      multiple: false,
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
          fileList: [file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <div className="p-5">
        <Form>
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
                name="district"
                rules={[{ required: true, message: "Nhập Quận huyện" }]}
                label="Quận huyện"
              >
                <Input placeholder="Quận huyện" />
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
              <FormItem {...formItemLayout} name="address" label="Địa chỉ">
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
                <Input type="password" placeholder="Water" />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem {...formItemLayout} name="birth" label="Ngày sinh">
                <DatePicker placeholder="Birth day" style={{ width: "100%" }} />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="confirm"
                rules={[
                  { required: true, message: "Nhập tiền mạng" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Mật khẩu xác nhận không chính xác!"
                      );
                    },
                  }),
                ]}
                label="Xác nhận"
              >
                <Input placeholder="Confirm password" type="password" />
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
              <FormItem name="image" label="Hình ảnh">
                <Upload {...props}>
                  <Button className="m-0-i">
                    <UploadOutlined /> Tải lên
                  </Button>
                </Upload>
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bor-rad-10 float-r"
                >
                  Tạo
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Manager;
