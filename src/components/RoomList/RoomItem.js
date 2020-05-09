import React from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <div className="block" style={{ backgroundColor: "#fff" }}>
        <Row>
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            <img
              style={{ height: "12em" }}
              className="bor-rad-10 w-100 object-fit-cover"
              src={data.image[0].url}
              alt={data.image[0].name}
            />
          </Col>
          <Col
            xl={12}
            lg={12}
            md={24}
            sm={24}
            xs={24}
            className="d-flex-i justify-center flex-direction-column"
          >
            <div className="p-l-3">
              <h2>{data.name}</h2>
              <h4 className="text-ellipsis-2">{data.detail}</h4>
              <h4>
                Tình trạng:{" "}
                <span
                  className={
                    data.status === "empty" ? "color-success" : "color-danger"
                  }
                >
                  {data.status === "empty" ? "Trống" : "Đã thuê"}
                </span>
              </h4>
            </div>
          </Col>
          <Col
            className="d-flex-i justify-flex-end flex-direction-column align-end"
            xl={4}
            lg={4}
            md={24}
            sm={24}
            xs={24}
          >
            <Link to={`/room/${data.id}`}>
              <Button type="primary">Chi tiết</Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Menu;
