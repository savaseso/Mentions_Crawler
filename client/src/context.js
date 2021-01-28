import React, { useState, createContext } from "react";
import { useEffect } from "react";
// Create Context Object
export const Context = createContext();

export const ContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    const response = await fetch("http://localhost:3001/isUserAuth", {
      credentials: "include",
    });
    const result = await response.json();
    if (result.success) {
      setIsLoggedIn(true);
    } else if (!result.success) {
      setIsLoggedIn(false);
    }
  };

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    checkLoginStatus,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
