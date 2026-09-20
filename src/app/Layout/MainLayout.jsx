import React from "react";
import { Outlet } from "react-router";
import HomePage from "../../shared/ui/HomePage";

const MainLayout = () => {
  return (
    <div className="p-2">
      <HomePage />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;