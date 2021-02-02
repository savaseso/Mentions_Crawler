import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import DashBoard from "../pages/DashBoard";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Default from "../pages/Default";

export const AuthenticatedRoutes = (props) => {
  return (
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/settings" component={Settings} />
        <Route component={Default} />
      </Switch>
  );
};

export const UnauthenticatedRoutes = (props) => {

  return (
      <Switch>
        <Redirect exact from="/" to="/signup" />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route component={Default} />
      </Switch>
  );
};
