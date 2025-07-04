import React from "react";
import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../../../interfaces/ProtectedRoutes/ProtectedRouteProps";
import { useAuth } from "../../../contexts/AuthContext";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "user") {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default ProtectedRoute;