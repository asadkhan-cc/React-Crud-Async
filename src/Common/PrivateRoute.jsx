import React from "react";
import { Navigate } from "react-router-dom";
import { GetLocalStorage, setLocalStorage } from "./Localstorage";

const PrivateRoute = ({ children }) => {
  const authed = GetLocalStorage("token");
  let asad = setLocalStorage("Message", "Kindly Login!");
  return authed ? children : <Navigate to="/" />;
};

export default PrivateRoute;
