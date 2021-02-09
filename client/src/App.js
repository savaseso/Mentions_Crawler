import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import { Context } from "./context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes/routes";
import { ContextProvider } from "./context";
import NavBar from "./components/NavBar";

function App() {
  const { isLoggedIn, checkLoginStatus } = useContext(Context);

  useEffect(() => {
    //check if user is authenticated
    checkLoginStatus();
  }, [isLoggedIn]);
  return (
    <ContextProvider>
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          {isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
        </BrowserRouter>
      </React.Fragment>
    </ContextProvider>
  );
}
export default App;
