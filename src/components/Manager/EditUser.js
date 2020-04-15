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
  Select,
  Avatar,
  Form,
} from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";

const { Option } = Select;
const FormItem = Form.Item;

class Manager extends React.Component {
  state = {
    edit: false,
  };

  handleEdit = () => {
    this.setState({
      edit: true,
    });
  };

  handleCancel = () => {
    this.setState({
      edit: false,
    });
  };

  render() {
    return (
      <div>
        <h2 className="text-center font-weight-bold text-upper">
          Thay đổi người dùng
        </h2>
        <div className="d-flex align-center">
          <Avatar shape="square" size={84} icon={<UserOutlined />} />
          <div className="p-l-3">
            <h3>Tên phòng</h3>
            <h4>District</h4>
            <h4>Room : T3N</h4>
          </div>
        </div>
        <ul className="ul-style p-l-5">
          <li>Địa chỉ: </li>
          <li>Số điện thoại: </li>
          <li>Số tiền cọc: </li>
        </ul>
        <hr className="m-v-3" />
        <Form>
          <span>Người dùng</span>
          <FormItem
            name="user"
            rules={[
              {
                required: true,
                message: "Chọn người dùng",
              },
            ]}
          >
            <Select placeholder="Người dùng" style={{ width: "100%" }}>
              <Option value="Admin">Admin</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </FormItem>
          <Row>
            <Col className="p-r-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <span>Số tiền cọc</span>
              <FormItem
                name="deposits"
                rules={[
                  {
                    required: true,
                    message: "Nhập số tiền đặt cọc",
                  },
                ]}
              >
                <Input type="number" placeholder="Deposits" className="w-90" />
              </FormItem>
            </Col>
            <Col className="p-l-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <span>Số người</span>
              <FormItem
                name="total"
                rules={[
                  {
                    required: true,
                    message: "Chọn số người",
                  },
                ]}
              >
                <Select placeholder="Total" style={{ width: "100%" }}>
                  <Option value={1}>
                    <UserOutlined /> 1
                  </Option>
                  <Option value={2}>
                    <UserOutlined /> 2
                  </Option>
                  <Option value={3}>
                    <UserOutlined /> 3
                  </Option>
                  <Option value={4}>
                    <UserOutlined /> 4
                  </Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <div className="d-flex justify-flex-end">
            <Button type="primary" htmlType="submit">
              Thanh toán
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Manager;
