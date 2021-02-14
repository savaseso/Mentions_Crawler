import React, { useEffect, useState, createContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [companies, setCompanies] = useState([]);
  const [platform, setPlatform] = useState({
    reddit: true,
    twitter: false,
    news: false,
  });

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("http://localhost:3001/isUserAuth", {
        credentials: "include",
      });
      const result = await response.json();

      setIsLoggedIn(result.success);
      setPending(false);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    window.location.reload();
  };

  const getUserData = async () => {
    const response = await fetch("http://localhost:3001/userData", {
      credentials: "include",
    });
    const result = await response.json();
    const { success, data } = result;

    if (success) {
      setCurrentUser(data);
      setEmail(data.email);
      setCompanies(data.companies);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    getUserData();
  }, [isLoggedIn]);

  if (pending) {
    return <CircularProgress />; //need to style it
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        pending,
        currentUser,
        email,
        setEmail,
        companies,
        setCompanies,
        platform,
        setPlatform,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
