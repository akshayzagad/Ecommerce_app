import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicProtected from "./Protected/PublicProtected";
import AuthLayout from "../app/Layout/AuthLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import MainProtected from "./Protected/MainProtected";
import MainLayout from "../app/Layout/MainLayout";
import HomePage from "../shared/ui/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth, refreshTokenGenrate } from "../features/auth/state/authSlice";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const { isHydrated } = useSelector((state) => state.auth);

  useEffect(() => {
  const hydrateAuth = async () => {
    const refreshResult = await dispatch(refreshTokenGenrate());

    if (refreshTokenGenrate.fulfilled.match(refreshResult)) {
      await dispatch(checkAuth());
    }
  };

  hydrateAuth();
}, [dispatch]);

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

  if (!isHydrated) {
  return <div>Checking authentication...</div>;
}
  return <RouterProvider router={router} />;
};

export default AppRoutes;
