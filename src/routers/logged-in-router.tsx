import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MyPage } from "../pages/user/myPage";

export const LoggedInRouter = () => {
  return (
    <Router>
      <MyPage />
    </Router>
  );
};
