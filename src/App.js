import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MainApp from "./MainApp";

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authUser !== -1 ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

class App extends React.Component {
  render() {
    let authUser = 0;
    const { match } = this.props;
    return (
      <Fragment>
        <Switch>
          <Route exact path={`/`} component={SignIn} />
          <Route exact path={`/signup`} component={SignUp} />
          <RestrictedRoute
            path={`${match.url}`}
            authUser={authUser}
            component={MainApp}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
