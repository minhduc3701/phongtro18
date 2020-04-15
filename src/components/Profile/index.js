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
} from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import webLogo from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: { xs: 24, sm: 5 },
  wrapperCol: { xs: 24, sm: 19 },
};

class Menu extends React.Component {
  state = {
    visible: false,
    preview: null,
    edit: false,
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

  onEdit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState({
      edit: true,
    });
  };

  render() {
    const data = [
      {
        id: "sadưe123124a",
        price: 2500,
        water: 80,
        internet: 50,
        motoElec: 100,
        Electrict: 471,
        total: 3684,
      },
    ];

    const columns = [
      {
        title: "Mã",
        dataIndex: "code",
        key: "code",
        render: (key, data) => {
          return (
            <div>
              <div>
                <Badge
                  className="m-b-0-i"
                  count={data.id}
                  style={{ backgroundColor: "#008080", minWidth: 62 }}
                />
                <span className="text-grey d-block">
                  {data.createdAt}
                  {/* {new Date(requests.createAt).toDateString()} */}
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
        render: (key, data) => <span>{data.price}</span>,
      },
      {
        title: "Tiền nước",
        dataIndex: "water",
        key: "water",
        render: (key, data) => <span>{data.water}</span>,
      },
      {
        title: "Tiền mạng",
        dataIndex: "internet",
        key: "internet",
        render: (key, data) => <span>{data.internet}</span>,
      },
      {
        title: "Tiền xe điện",
        dataIndex: "motoElec",
        key: "motoElec",
        render: (key, data) => <span>{data.motoElec}</span>,
      },
      {
        title: "Tiền điện",
        dataIndex: "Electrict",
        key: "Electrict",
        render: (key, data) => <span>{data.Electrict}</span>,
      },
      {
        title: "Tổng",
        dataIndex: "total",
        key: "total",
        render: (key, data) => <span>{data.total}</span>,
      },
    ];

    return (
      <div className="block-no-bor">
        <div className="d-flex align-center">
          <Avatar size={84} icon={<UserOutlined />} />
          {!this.state.edit ? (
            <div className="p-l-5">
              <h2>Tên phòng</h2>
              <h4 className="w-150">Quận huyện: </h4>
              <h4 className="w-150">Địa chỉ: </h4>
            </div>
          ) : (
            <div className="p-l-5 w-100">
              <h2>Tên phòng</h2>
              <div className="d-flex p-b-1">
                <span className="d-flex align-center" style={{ width: 150 }}>
                  Quận huyện:
                </span>{" "}
                <Input className="w-100" placeholder="District" />
              </div>
              <div className="d-flex ">
                <span className="d-flex align-center" style={{ width: 150 }}>
                  {" "}
                  Địa chỉ:
                </span>{" "}
                <Input className="w-100" placeholder="Address" />
              </div>
            </div>
          )}
        </div>
        <hr />
        <Row>
          <Col
            style={{ borderRight: "1px solid #ccc" }}
            xl={12}
            lg={12}
            md={24}
            sm={24}
            xs={24}
          >
            {this.state.edit ? (
              <Form>
                <FormItem {...formItemLayout} label="Phòng:">
                  {" "}
                  T3N{" "}
                </FormItem>
                <FormItem {...formItemLayout} label="Chứng minh thư:">
                  <Input style={{ width: 300 }} placeholder="Id card" />
                </FormItem>
                <FormItem {...formItemLayout} label="Số điện thoại:">
                  <Input
                    style={{ width: 300 }}
                    maxLength={20}
                    placeholder="Phone"
                  />
                </FormItem>
                <FormItem {...formItemLayout} label="Giới tính:">
                  <Select placeholder="Gender" style={{ width: 300 }}>
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                    <Option value="other">Khác</Option>
                  </Select>
                </FormItem>
                <FormItem {...formItemLayout} label="Tiền cọc:">
                  2.000 đ
                </FormItem>
              </Form>
            ) : (
              <Fragment>
                <Row style={{ marginBottom: 24 }}>
                  <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                    <h4 className="float-r">Phòng:</h4>
                  </Col>
                  <Col
                    className="p-l-3"
                    xl={19}
                    lg={19}
                    md={19}
                    sm={19}
                    xs={24}
                  >
                    <h4>T3N</h4>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 24 }}>
                  <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                    <h4 className="float-r">Chứng minh thư:</h4>
                  </Col>
                  <Col
                    className="p-l-3"
                    xl={19}
                    lg={19}
                    md={19}
                    sm={19}
                    xs={24}
                  >
                    <h4>013306482</h4>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 24 }}>
                  <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                    <h4 className="float-r">Số điện thoại:</h4>
                  </Col>
                  <Col
                    className="p-l-3"
                    xl={19}
                    lg={19}
                    md={19}
                    sm={19}
                    xs={24}
                  >
                    <h4>0888 272332</h4>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 24 }}>
                  <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                    <h4 className="float-r">Giới tính:</h4>
                  </Col>
                  <Col
                    className="p-l-3"
                    xl={19}
                    lg={19}
                    md={19}
                    sm={19}
                    xs={24}
                  >
                    <h4>Nam</h4>
                  </Col>
                </Row>
                <Row style={{ marginBottom: 24 }}>
                  <Col xl={5} lg={5} md={5} sm={5} xs={24}>
                    <h4 className="float-r">Tiền cọc:</h4>
                  </Col>
                  <Col
                    className="p-l-3"
                    xl={19}
                    lg={19}
                    md={19}
                    sm={19}
                    xs={24}
                  >
                    <h4>2.000 đ</h4>
                  </Col>
                </Row>
              </Fragment>
            )}
          </Col>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Row>
              <Col className="p-h-1" xl={8} lg={12} md={12} sm={24} xs={24}>
                <img
                  className="w-100 h-100 object-fit-cover"
                  src={webLogo}
                  alt="image"
                />
              </Col>
              <Col className="p-h-1" xl={8} lg={12} md={12} sm={24} xs={24}>
                <img
                  className="w-100 h-100 object-fit-cover"
                  src={webLogo}
                  alt=""
                />
              </Col>
              <Col className="p-h-1" xl={8} lg={12} md={12} sm={24} xs={24}>
                <img
                  className="w-100 h-100 object-fit-cover"
                  src={webLogo}
                  alt=""
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <h3>Hóa đơn: </h3>
        <Table
          dataSource={data}
          columns={columns}
          bordered={true}
          rowKey={(date) => data.id}
        />
        <div className="d-flex w-100">
          <Button onClick={this.onEdit} className="m-l-auto" type="primary">
            {this.state.edit ? "Lưu" : "Chỉnh sửa"}
          </Button>
        </div>
        <Modal
          onCancel={this.handleCancel}
          visible={this.state.visible}
          footer={null}
        >
          <img src={this.state.preview} alt="preview-image" />
        </Modal>
      </div>
    );
  }
}

export default Menu;
