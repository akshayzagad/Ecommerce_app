import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicProtected() {
  const { isAuthenticated, isHydrated } = useSelector(
    (state) => state.auth
  );

  // Wait until authentication checking is finished
  if (!isHydrated) {
    return <div>Checking authentication...</div>;
  }

  // Already logged in
  if (isAuthenticated) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
}