import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./context";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./routes/routes";


function App() {
  const { isLoggedIn,checkLoginStatus } = useContext(Context);

  useEffect(() => {
    //check if user is authenticated
    checkLoginStatus();
  }, [isLoggedIn]); 
  return (
    <React.Fragment>
        {isLoggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </React.Fragment>
   )
 
}
export default App;
