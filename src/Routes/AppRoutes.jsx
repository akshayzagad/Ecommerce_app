import { createBrowserRouter } from "react-router-dom";
import PublicProtected from "./Protected/PublicProtected";
import AuthLayout from "../app/Layout/AuthLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import MainProtected from "./Protected/MainProtected";
import MainLayout from "../app/Layout/MainLayout";
import HomePage from "../shared/ui/HomePage";

let router = createBrowserRouter([
  {
    path: "/",
    element: <PublicProtected />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    path: "main",
    element: <MainProtected />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [{ path: "", element: <HomePage /> }],
      },
    ],
  },
]);

export default router;
