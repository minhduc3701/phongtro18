import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Routes from "./Routes";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import firebase from "./firebase/index";
import Loading from "./components/Loading";

class MainApp extends React.Component {
  showContentMenus = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          ></Route>
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  render() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var id = document.cookie.match(
          `(^|;) ? user_id = ([^;]*)(;|$)`
          // "(^|;) ?" + "user_id" + "=([^;]*)(;|$)"
        ) || [""];
        let uid = id[2] || "null";
        if (user.uid !== uid) {
          firebase.auth().signOut();
          localStorage.clear();
          document.cookie =
            "b2b_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;domain=http://localhost:3000";
          document.cookie =
            "user_id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;domain=http://localhost:3000";
          window.location.href = "http://localhost:3000/";
        }
      } else {
        localStorage.clear();
        firebase.auth().signOut();
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          let eqPos = cookie.indexOf("=");
          let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie =
            name +
            "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=http://localhost:3000;path=/";
        }
        localStorage.clear();
        window.location.href = "http://localhost:3000/";
      }
    });
    isLoaded(this.props.userApp) &&
      localStorage.setItem(
        "user_info",
        JSON.stringify({
          id: this.props.userApp[0].id,
          name: this.props.userApp[0].name,
          address: this.props.userApp[0].address,
          avatar: this.props.userApp[0].avatar,
          birth: this.props.userApp[0].birth,
          district: this.props.userApp[0].district,
          electrict: this.props.userApp[0].electrict,
          gender: this.props.userApp[0].gender,
          image: this.props.userApp[0].image,
          phone: this.props.userApp[0].phone,
          rId: this.props.userApp[0].rId,
          rName: this.props.userApp[0].rName,
          permission: this.props.userApp[0].permission,
        })
      );

    return !isLoaded(this.props.userApp) ? (
      <Loading />
    ) : (
      <Fragment>
        <Menu data={this.props} />
        <div className="max-w-80 m-auto" style={{ minHeight: "80vh" }}>
          {this.showContentMenus(Routes)}
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  const { userApp } = firestore.ordered;
  return { userApp };
};

export default compose(
  firestoreConnect((props) => {
    return [
      {
        collection: "users",
        doc: localStorage.getItem("uid"),
        storeAs: "userApp",
      },
    ];
  }),
  connect(mapStateToProps, null)
)(MainApp);
