import React from "react";
import { Row, Col, Button } from "antd";
import RoomItem from "./RoomItem";
import webLogo from "../../assets/hiking-mountain-hike-climber-adventure-tourist-1433419-pxhere.com.jpg";

class Menu extends React.Component {
  render() {
    return (
      <div className="p-v-5">
        <Row>
          <Col className="p-h-2" xl={12} lg={12} md={24} sm={24} xs={24}>
            <RoomItem />
          </Col>
          <Col className="p-h-2" xl={12} lg={12} md={24} sm={24} xs={24}>
            <RoomItem />
          </Col>
          <Col className="p-h-2" xl={12} lg={12} md={24} sm={24} xs={24}>
            <RoomItem />
          </Col>
          <Col className="p-h-2" xl={12} lg={12} md={24} sm={24} xs={24}>
            <RoomItem />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Menu;
