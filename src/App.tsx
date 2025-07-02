import { Suspense } from "react";
import Landing from "./modules/pages/Landing/Landing";
import NotFound from "./modules/shared/NotFound/NotFound";
import Dashboard from "./modules/pages/Dashboard/Dashboard";
import ProtectedRoute from './modules/shared/ProtectedRoute/ProtectedRoute';
import MasterLayout from "./modules/layouts/MasterLayout.css/MasterLayout";

import AuthLayout from "./modules/layouts/AuthLayout/AuthLayout";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import ResetPassword from "./modules/auth/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import { ChangePassword, ForgetPassword, Login, Register } from "./modules/auth";


function App() {

const routes: RouteObject[] = [
  {
    path: "",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "change-password", element: <ChangePassword /> },

    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MasterLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "landing",
        element: (
          <Suspense fallback={null}>
            <Landing />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  )
}

export default App
