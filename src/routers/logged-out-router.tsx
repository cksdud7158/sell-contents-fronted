import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "../pages/user/login";

export const LoggedOutRouter = () => {
  // Switch : route 하나만 임포트할 수 있게 해주는 것
  return (
    // <Router>
    //   <Switch>
    //     <Route path="/create-account">
    //       <CreateAccount />
    //     </Route>
    //     <Route path="/" exact>
    //       <Login />
    //     </Route>
    //     <Route>
    //       <NotFound />
    //     </Route>
    //   </Switch>
    // </Router>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
