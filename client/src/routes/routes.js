import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import DashBoard from "../pages/DashBoard";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "../themes/theme";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export const AuthenticatedRoutes = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/dashboard" component={DashBoard} />
          <Redirect from="/" to="/dashboard" />
          {/*           <Route exact path="/settings" component={Settings} />
           */}
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export const UnauthenticatedRoutes = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Redirect to="/signup" />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};
