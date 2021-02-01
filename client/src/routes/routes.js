import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import DashBoard from "../pages/DashBoard";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "../themes/theme";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Default from "../pages/Default";

export const AuthenticatedRoutes = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/settings" component={Settings} />
        <Route component={Default} />
      </Switch>
    </MuiThemeProvider>
  );
};

export const UnauthenticatedRoutes = (props) => {

  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Redirect exact from="/" to="/signup" />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route component={Default} />
      </Switch>
    </MuiThemeProvider>
  );
};