import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase-app/firebase-config";

const { createContext, useContext, useState } = require("react");

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("AuthContext must be used within AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
