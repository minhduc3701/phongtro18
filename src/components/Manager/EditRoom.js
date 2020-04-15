import React, { Fragment } from "react";
import { Row, Col, Button, Input, Form, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

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
                name="name"
                rules={[{ required: true, message: "Nhập tên phòng" }]}
                label="Tên phòng"
              >
                <Input placeholder="Name" />
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
                label="Giá phòng"
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
                label="Giá nước"
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
                label="Tiền mạng"
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
                  <Option value={true}>Gồm nhà vệ sinh</Option>
                  <Option value={false}>Không bao gồm nhà vệ sinh</Option>
                </Select>
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
              <FormItem
                {...formItemLayout}
                name="intro"
                rules={[{ required: true, message: "Nhập mô tả" }]}
                label="Mô tả"
              >
                <TextArea rows={5} placeholder="Introduction" />
              </FormItem>
            </Col>
            <Col className="p-h-1" xl={12} lg={12} md={24} sm={24} xs={24}>
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
          >
            Sửa
          </Button>
        </Form>
      </div>
    );
  }
}

export default Manager;
