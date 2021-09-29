import { HeaderComponet } from "components/header";
import { ErrorPage2 } from "pages/common_pages/404page2";
import { MyPage } from "pages/user/myPage";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage } from "../pages/common_pages/mainPage";

export const LoggedInRouter = () => {
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
          <Route path="/mypage" exact>
            <MyPage />
          </Route>
          <Route>
            <ErrorPage2 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
