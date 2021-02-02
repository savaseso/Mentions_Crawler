import React, { useState,useEffect, createContext } from "react";
import { useForm } from "./hooks/useForm";
// Create Context Object
export const Context = createContext();

export const ContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("")
  const [companies, setCompanies] = useState([])

  const checkLoginStatus = async () => {
    const response = await fetch("http://localhost:3001/isUserAuth", {
      credentials: "include",
    });
    const result = await response.json();

    setIsLoggedIn(result.success);

  };
  const getUserData = async () => {
    const response = await fetch("http://localhost:3001/userData", {
      credentials: "include",
    });
    const result = await response.json();
    console.log(result)
     setEmail(result.data.email)
    setCompanies(result.data.company); 
  };

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
    checkLoginStatus,
    getUserData,
    email,
    setEmail,
    companies,
    setCompanies,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
