import React,{ useContext } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import Main from './pages/Main'
import { theme } from "./themes/theme";

import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Context } from "./context";


function App() {
  const [count] = useContext(Context);
  console.log(count)
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={Main} /> */}
       
        <Route exact path="/">
               <Redirect to="/signup" /> 
        </Route>
        <Route path="/signup"  component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
