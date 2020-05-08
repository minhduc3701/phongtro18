import React, { Fragment } from "react";
import { Row, Col, Modal } from "antd";
import { getImageList } from "../../appRedux/actions";
import { connect } from "react-redux";
import Loading from "../Loading";

class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.props.getImageList();
    this.state = {
      previewImage: null,
      previewVisible: false,
    };
  }

  onPreview = (photo) => {
    this.setState({
      previewImage: photo,
      previewVisible: true,
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    return (
      <Fragment>
        <h2 className="p-v-4 text-center font-weight-bold text-upper">
          Danh sách hình ảnh
        </h2>
        {!this.props.loadImageList ? (
          <div
            className="p-v-4 m-v-5"
            style={{ border: "1px solide black", borderStyle: "double" }}
          >
            <Row>
              {this.props.imageList &&
                this.props.imageList.map((item, index) => {
                  return item.image.map((image, index) => {
                    return (
                      <Col
                        key={index}
                        className="p-2"
                        xl={6}
                        lg={6}
                        md={12}
                        sm={12}
                        xs={24}
                      >
                        <img
                          onClick={() => this.onPreview(image.url)}
                          className="w-100 object-fit-cover cursor-pointer"
                          style={{ height: "16em" }}
                          src={image.url}
                          alt={image.name}
                        />
                        <p className="text-center m-b-0 text-ellipsis">
                          {image.name}
                        </p>
                      </Col>
                    );
                  });
                })}
            </Row>
            <Modal
              visible={this.state.previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img
                src={this.state.previewImage}
                alt="preview"
                style={{ width: "100%" }}
              />
            </Modal>
          </div>
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ room }) => {
  return {
    imageList: room.imageList,
    loadImageList: room.loadImageList,
  };
};

export default connect(mapStateToProps, { getImageList })(ImageList);
