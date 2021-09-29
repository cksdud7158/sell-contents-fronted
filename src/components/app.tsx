import { useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { isLoggedInVar } from "../apollo";
import { LoggedInRouter } from "../routers/logged-in-router";
import { LoggedOutRouter } from "../routers/logged-out-router";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div className="h-screen">
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </div>
  );
};
