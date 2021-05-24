import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HeaderComponet } from "../components/header";
import { CreateAccount } from "../pages/user/createAccount";
import { FindUserInfo } from "../pages/user/findUserInfo";
import { Login } from "../pages/user/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/find-user-info">
          <FindUserInfo />
        </Route>
      </Switch>
    </Router>
  );
};
