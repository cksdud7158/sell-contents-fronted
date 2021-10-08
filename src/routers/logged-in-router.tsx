import { useQuery } from "@apollo/client";
import { HeaderComponet } from "components/header";
import { ErrorPage2 } from "pages/common_pages/404page2";
import { TestPage } from "pages/test";
import { MyPage } from "pages/user/myPage";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { me } from "__generated__/me";
import { MainPage } from "../pages/common_pages/mainPage";
import gql from "graphql-tag";

export const LoggedInRouter = () => {
  const ME_QUERY = gql`
    query me {
      me {
        email
        nickName
      }
    }
  `;

  const { data } = useQuery<me>(ME_QUERY);

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
          <Route path="/" exact component={MainPage} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/test" component={TestPage} />
          <Redirect from="/login" to="/"></Redirect>
          <Route component={ErrorPage2} />
        </Switch>
      </div>
    </Router>
  );
};
