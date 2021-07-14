import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage } from "../pages/common_pages/mainPage";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
};
