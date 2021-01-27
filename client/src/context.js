import React, { useState, createContext } from "react";

// Create Context Object
export const Context = createContext();

export const ContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const contextValue = {
    isLoggedIn,
    setIsLoggedIn
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};