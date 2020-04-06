import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./components/Menu";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Routes from "./Routes";

class App extends React.Component {
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
        <Router>
          <Switch>
            <Route exact path={`/signin`} component={SignIn} />
            <Route exact path={`/signup`} component={SignUp} />
          </Switch>
          {/* <Menu /> */}
          {this.showContentMenus(Routes)}
        </Router>
      </Fragment>
    );
  }
}

export default App;
