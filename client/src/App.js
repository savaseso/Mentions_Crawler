import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import { Context } from "./context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes/routes";

import NavBar from "./components/NavBar";

function App() {
  const { isLoggedIn, checkLoginStatus } = useContext(Context);

  useEffect(() => {
    //check if user is authenticated
    checkLoginStatus();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar />
        {isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
      </BrowserRouter>
    </React.Fragment>
  );
}
export default App;
