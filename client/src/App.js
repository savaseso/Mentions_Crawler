import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Context } from "./context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes/routes";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import NavBar from "./components/NavBar";

 
function App() {
  const { isLoggedIn, checkLoginStatus,getUserData,email,companies } = useContext(Context);


  useEffect(() => {
    //check if user is authenticated
    checkLoginStatus();
    if(isLoggedIn){
      getUserData();
    }
  }, [isLoggedIn]);
  console.log(companies)
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          {isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
        </BrowserRouter>
      </React.Fragment>
    </MuiThemeProvider>
  );
}
export default App;
