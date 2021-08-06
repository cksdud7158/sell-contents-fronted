import { HeaderComponet } from "components/header";
import { MainPage } from "pages/common_pages/mainPage";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SignUp1 } from "../pages/user/sign-up1";
import { SignUp2 } from "../pages/user/sign-up2";
import { FindUserInfo } from "../pages/user/findUserInfo";
import { Login } from "../pages/user/login";
import { ErrorPage } from "pages/common_pages/404page";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Route
        render={({ location }) => {
          return (
            <>
              <div className="w-full bg-white border-b-2 border-gray-200">
                <HeaderComponet></HeaderComponet>
              </div>
            </>
          );
        }}
      ></Route>

      <div className="overflow-auto h-withoutHeader">
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign-up-1">
            <SignUp1 />
          </Route>
          <Route path="/sign-up-2">
            <SignUp2 />
          </Route>
          <Route path="/find-user-info">
            <FindUserInfo />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
