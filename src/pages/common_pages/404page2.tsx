import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "apollo";
import React from "react";

export const ErrorPage2 = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <div className="w-full h-screen bg-red-200">
      <h1>ErrorPage</h1>
      <div>로그인 된곳</div>
    </div>
  );
};
