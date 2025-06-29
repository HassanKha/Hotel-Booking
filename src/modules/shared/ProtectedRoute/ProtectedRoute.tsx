import React from "react";
import { Outlet } from "react-router-dom";
import type { ProtectedRouteProps } from "../../../interfaces/ProtectedRoutes/ProtectedRouteProps";


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {


  return children ?? <Outlet />;
};
export default ProtectedRoute;