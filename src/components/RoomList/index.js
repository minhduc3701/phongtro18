import React from "react";
import { Row, Col } from "antd";
import RoomItem from "./RoomItem";
import { getRoomAllList } from "../../appRedux/actions";
import Loading from "../Loading";
import { connect } from "react-redux";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.props.getRoomAllList();
  }
  render() {
    return (
      <div className="p-v-5">
        {!this.props.loadRoomList ? (
          <Row>
            {this.props.roomList.map((item, index) => {
              return (
                <Col
                  key={index}
                  className="p-h-2"
                  xl={12}
                  lg={12}
                  md={24}
                  sm={24}
                  xs={24}
                >
                  <RoomItem data={item} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ room }) => {
  return {
    roomList: room.roomList,
    loadRoomList: room.loadRoomList,
  };
};

export default connect(mapStateToProps, { getRoomAllList })(Menu);
