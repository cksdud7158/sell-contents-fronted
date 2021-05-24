import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import { LoggedInRouter } from "../routers/logged-in-router";
import { LoggedOutRouter } from "../routers/logged-out-router";
import { HeaderComponet } from "../components/header";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div className="h-screen">
      <div className="absolute w-full">
        <HeaderComponet temp="11"></HeaderComponet>
      </div>
      <div className="h-full pt-14">
        {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
      </div>
    </div>
  );
};
