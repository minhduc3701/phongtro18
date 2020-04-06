import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Routes from "./Routes";

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
    return (
      <Fragment>
        <Menu />
        <div className="max-w-80 m-auto">{this.showContentMenus(Routes)}</div>
        <Footer />
      </Fragment>
    );
  }
}

export default MainApp;
