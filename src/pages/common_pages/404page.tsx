import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "apollo";
import React from "react";

export const ErrorPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <div className="w-full h-screen bg-red-200">
      <h1>ErrorPage</h1>
      {isLoggedIn ? <div>로그인됨</div> : <div>로그인 안됨</div>}
    </div>
  );
};
