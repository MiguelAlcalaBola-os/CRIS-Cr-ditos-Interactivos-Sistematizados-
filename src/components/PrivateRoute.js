import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({
  isAllowed,
  redirectTo,
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={"/Login"} />;
  }
  return children ? children : <Outlet />;
};