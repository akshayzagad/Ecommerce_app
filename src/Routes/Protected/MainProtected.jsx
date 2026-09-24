import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function MainProtected() {
  const { isAuthenticated, isHydrated } = useSelector(
    (state) => state.auth
  );

  // Wait until authentication checking is finished
  if (!isHydrated) {
    return <div>Checking authentication...</div>;
  }

  // Now we know authentication status
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default MainProtected;